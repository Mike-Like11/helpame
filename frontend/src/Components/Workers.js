import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import React from "react";
import {FullscreenControl, GeolocationControl, Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import ReactStars from "react-rating-stars-component";
import {useNavigate} from "react-router-dom";

const Workers =() =>{
    const [ workers, setWorkers ] = useState([])
    const getTasks = async () => {
        try {
            await axios.get("http://localhost:8080/api/workers", ).then((response) => {
                console.log(response.data);
                setWorkers(response.data);
            })
        } catch (err) {
            console.log("dasdsadasd");
            console.error(err.message);
        }
    }
    let navigate = useNavigate();
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
                <Col sm={4}>
                    {workers.map(worker => (
                        <Card className="task" onClick={()=>navigate(`/workers/${worker.strId}`,{state:{worker: worker}})}>
                            <Row xxl>
                                <Col sm={4}>
                                    <Image src={worker.personalInfo.avatarUrl} roundedCircle width={100} height={100}/>
                                </Col>
                                <Col sm={8}>
                                    <h3 style={{fontWeight: "bold", fontStyle: "italic"}}>{worker.personalInfo.firstName+ ' ' + worker.personalInfo.lastName}</h3>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={worker.rating}
                                        edit={false}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                    />
                                </Col>
                            </Row>
                            <h5 style={{textAlign: "left"}}>{worker.workerInfo.favoriteAnimals}</h5>
                            <Row>
                            </Row>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}
export default Workers;