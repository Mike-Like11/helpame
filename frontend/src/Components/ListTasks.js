import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import React from "react";
import {FullscreenControl, GeolocationControl, Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";

const ListTasks =() =>{
    const [ tasks, setTasks ] = useState([])
    const getTasks = async () => {
        try {
            await axios.get("http://localhost:8080/api/tasks", ).then((response) => {
                console.log(response.data);
                setTasks(response.data);
            })
        } catch (err) {
            console.log("dasdsadasd");
            console.error(err.message);
        }
    }
    useEffect(() => {
        getTasks()
    },[])
    return(
        <Container>
            <Row  className="mb-3 mt-3">
                <Col sm={4}>
                    <Card className="task">
                        <h3 style={{fontWeight: "bold", fontStyle: "italic"}}>Поиск заданий</h3>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label >Название</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Введите название"
                                          onChange={ e => {
                                              console.log(e.target.value)
                                          } } />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label >Дата выполнения</Form.Label>
                            <Form.Control type="date"
                                          placeholder="Введите название"
                                          onChange={ e => {
                                              console.log(e.target.value)
                                          } } />
                        </Form.Group>
                    </Card>
                </Col>
                <Col sm={8}>
                        {tasks.map(task => (
                                <Card className="task">
                                    <Row xxl>
                                    <Col sm={2}>
                                        <Image src={task.userInfo.avatarUrl} roundedCircle width={100} height={100}/>
                                    </Col>
                                    <Col sm={6}>
                                        <h3 style={{textAlign: "center"}}>{task.taskInfo.name}</h3>
                                        <h5 style={{textAlign: "left"}}>{task.taskInfo.description}</h5>
                                    </Col>
                                    <Col sm={4}>
                                        <YMaps>
                                            <Map state={{ center: [task.taskInfo.coordinates.latitude,task.taskInfo.coordinates.longitude], zoom: 9}} width={"100%"} height={"100%"}>
                                                <Placemark geometry={[task.taskInfo.coordinates.latitude,task.taskInfo.coordinates.longitude]} />
                                                <ZoomControl />
                                                <FullscreenControl />
                                                <GeolocationControl />
                                            </Map>
                                        </YMaps>
                                    </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p style={{fontWeight: "bold", fontStyle: "italic"}}>{task.userInfo.lastName+ ' ' + task.userInfo.firstName}</p>
                                            </Col>
                                        <Col>
                                            <p style={{textAlign: "right", fontWeight: "bold", fontStyle: "italic"}} >{task.taskInfo.dateOfPerformance+ ' ' + task.taskInfo.timeOfPerformance}</p>
                                        </Col>
                                    </Row>
                                </Card>
                        ))}
                </Col>
            </Row>
        </Container>
    )
 }
 export default ListTasks;