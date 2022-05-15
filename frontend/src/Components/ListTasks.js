import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import React from "react";
import {FullscreenControl, GeolocationControl, Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import {useNavigate} from "react-router-dom";
import { List } from 'react-content-loader'

const ListTasks =() =>{
    const [ tasks, setTasks ] = useState([])
    const [allTasks, setAllTasks] = useState([])
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [loading, setLoading] = useState(false);
    const getTasks = async () => {
        try {
            await axios.get("http://localhost:8080/api/tasks", ).then((response) => {
                setTasks(response.data);
                setAllTasks(response.data)
                setLoading(true)
            })
        } catch (err) {
        }
    }
    function filterName(name) {
        if(name === ""){
            if(searchDate === ""){
                setTasks(allTasks)
            }
            else{
                setTasks(allTasks.filter(task => task.taskInfo.dateOfPerformance === searchDate))
            }
        }
        else{
            if(searchDate === ""){
                setTasks(allTasks.filter(task => task.taskInfo.name.toLowerCase().includes(name.toLowerCase())))
            }
            else{
                setTasks(allTasks.filter(task => task.taskInfo.dateOfPerformance === searchDate && task.taskInfo.name.toLowerCase().includes(name.toLowerCase())))
            }
        }
    }
    function filterDate(date) {
        if(date === ""){
            if(searchName === "") {
                setTasks(allTasks)
            }
            else{
                setTasks(allTasks.filter(task => task.taskInfo.dateOfPerformance === searchDate && task.taskInfo.name.toLowerCase().includes(searchName.toLowerCase())))
            }
        }
        else{
            if(searchName === "") {
                setTasks(allTasks.filter(task => task.taskInfo.dateOfPerformance === date))
            }
            setTasks(allTasks.filter(task => task.taskInfo.dateOfPerformance === date && task.taskInfo.name.toLowerCase().includes(searchName.toLowerCase())))
        }
    }
    useEffect(() => {
        getTasks()
    },[])
    return(
        <Container>
            <Row className="p-4">
            <Card className="task text-center">
                <h3 style={{fontWeight: "bold", fontStyle: "italic"}}>Поиск заданий</h3>
                <Row>
                <Col>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label >Название</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Введите название"
                                  onChange={ e => {
                                      setSearchName(e.target.value)
                                      filterName(e.target.value)
                                  } } />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label >Дата выполнения</Form.Label>
                    <Form.Control type="date"
                                  placeholder="Введите название"
                                  onChange={ e => {
                                      setSearchDate(e.target.value)
                                      filterDate(e.target.value)
                                  } } />
                </Form.Group>
                </Col>
                </Row>
            </Card>
            </Row>
            <Row  className="mb-3 mt-3 g-2">
                    {(tasks.length < 1 && !loading)? <Col><List foregroundColor="white"/> <List foregroundColor="white"/></Col> :

                            tasks.map(task => (
                                <Col>
                                <Card className="task" onClick={() => navigate(`/tasks/${task.strId}`, {state: {task: task}})}>
                                    <Row xxl>
                                        <Col sm={2}>
                                            <Image src={task.shortUserInfo.avatarUrl} roundedCircle width={100}
                                                   height={100}/>
                                        </Col>
                                        <Col sm={6}>
                                            <h3 style={{textAlign: "center"}}>{task.taskInfo.name}</h3>
                                            <h5 style={{textAlign: "left"}}>{task.taskInfo.description}</h5>
                                        </Col>
                                        <Col sm={4}>
                                            <YMaps>
                                                <Map state={{
                                                    center: [task.taskInfo.coordinates.latitude, task.taskInfo.coordinates.longitude],
                                                    zoom: 9
                                                }} width={"100%"} height={"100%"}>
                                                    <Placemark
                                                        geometry={[task.taskInfo.coordinates.latitude, task.taskInfo.coordinates.longitude]}/>
                                                    <ZoomControl/>
                                                    <FullscreenControl/>
                                                    <GeolocationControl/>
                                                </Map>
                                            </YMaps>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p style={{
                                                fontWeight: "bold",
                                                fontStyle: "italic"
                                            }}>{task.shortUserInfo.lastName + ' ' + task.shortUserInfo.firstName}</p>
                                        </Col>
                                        <Col>
                                            <p style={{
                                                textAlign: "right",
                                                fontWeight: "bold",
                                                fontStyle: "italic"
                                            }}>{task.taskInfo.dateOfPerformance + ' ' + task.taskInfo.timeOfPerformance}</p>
                                        </Col>
                                    </Row>
                                </Card>
                                </Col>
                            ))
                    }
            </Row>
        </Container>
    )
 }
 export default ListTasks;