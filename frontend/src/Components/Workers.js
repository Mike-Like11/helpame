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
                setWorkers(response.data);
            })
        } catch (err) {
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

                </Col>
                <Col sm={4}>
                    {workers.map(worker => (
                        <Card className="task" onClick={()=>navigate(`/workers/${worker.strId}`,{state:{worker: worker}})}>
                            <Row xxl>
                                <Col sm={4}>
                                    <Image src={worker.shortUserInfo.avatarUrl} roundedCircle width={100} height={100}/>
                                </Col>
                                <Col sm={8}>
                                    <h3 style={{fontWeight: "bold", fontStyle: "italic"}}>{worker.shortUserInfo.firstName+ ' ' + worker.shortUserInfo.lastName}</h3>
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
                            <h5 style={{textAlign: "left"}}>{worker.workerInfo.favoriteAnimals.join(', ')}</h5>
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