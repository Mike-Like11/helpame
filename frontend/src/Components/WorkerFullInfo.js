import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {useLocation, useParams} from "react-router-dom";
import {FaTelegram, FaViber, FaWhatsapp} from "react-icons/fa";

const WorkerFullInfo =(props) =>{
    const [ workers, setWorkers ] = useState([])
    const id = useParams()
    const worker =  useLocation().state.worker
    const [userFullInfo, setUserFullInfo] = useState(null);
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.post("http://localhost:8080/api/user_full_info",
                worker.shortUserInfo
                ,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ).then((response) => {
                setUserFullInfo(response.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(()=>{getUser();},[])
    return(
        <Container>
            <Row  className="mb-3 mt-3">
                <Col sm={4}>
                    <Row>
                    <Card className="task p-4">
                        <Image src={worker.shortUserInfo.avatarUrl} roundedCircle/>
                        <h3 style={{fontWeight: "bold", fontStyle: "italic", textAlign: "center"}}>{worker.shortUserInfo.firstName+ ' ' + worker.shortUserInfo.lastName}</h3>
                        <Row className="text-center">
                            <Col>
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
                            <Col>
                                {worker.reviews.length + ' отзывов'}
                            </Col>
                        </Row>
                    </Card>
                    </Row>
                    {userFullInfo &&
                        <Row>
                            <Card className="task mt-4 p-4">
                                <Row>
                                    <Col>
                                        <h5>Город:</h5>
                                    </Col>
                                    <Col>
                                        <h5 style={{fontWeight: "bold"}}>{userFullInfo.city}</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h5>Номер телефона:</h5>
                                    </Col>
                                    <Col>
                                        <h5 style={{fontWeight: "bold"}}>{worker.shortUserInfo.phone}</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    {userFullInfo.whatsApp &&
                                        <Col className="justify-content-center">
                                            <FaWhatsapp color="green" size="50" className="justify-content-center"/>
                                        </Col>
                                    }
                                    {userFullInfo.viber &&
                                        <Col>
                                            <FaViber color="purple" size="50"/>
                                        </Col>
                                    }
                                    {userFullInfo.telegram &&
                                        <Col>
                                            <FaTelegram color="#0088cc" size="50"/>
                                        </Col>
                                    }
                                </Row>
                            </Card>
                        </Row>
                    }

                </Col>
                <Col sm={8}>
                    <Row className="p-4">
                        <Card className="task p-4">
                            <h2 className="text-center">Информация о работнике</h2>
                            <h4 style={{fontWeight: "bold"}}>Опыт работы</h4>
                            <h5 style={{textAlign: "left"}}>{worker.workerInfo.experience}</h5>
                            <h4 style={{fontWeight: "bold"}}>Предпочтения о работе</h4>
                            <h5 style={{textAlign: "left"}}>{worker.workerInfo.preferences}</h5>
                            <h4 style={{fontWeight: "bold"}}>Категории животных, с которыми работает</h4>
                            <h5 style={{textAlign: "left"}}>{worker.workerInfo.favoriteAnimals}</h5>
                        </Card>
                        {worker.reviews &&
                            <Card className="task mt-2">
                                <h2 className="text-center">Отзывы</h2>
                                {worker.reviews.map(review => (
                                    <Row xxl>
                                        <Col sm={2}>
                                            <Image src={review.personalInfo.avatarUrl} roundedCircle width={100} height={100}/>
                                        </Col>
                                        <Col sm={7}>
                                            <h4 style={{fontWeight: "bold",textAlign: "left"}}>{review.personalInfo.firstName+ ' ' + review.personalInfo.lastName}</h4>
                                            <h5>{review.message}</h5>
                                        </Col>
                                        <Col sm={3}>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={review.rating}
                                                edit={false}
                                                emptyIcon={<i className="far fa-star"></i>}
                                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                fullIcon={<i className="fa fa-star"></i>}
                                                activeColor="#ffd700"
                                            />
                                        </Col>
                                    </Row>
                                ))}
                            </Card>
                        }

                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default WorkerFullInfo;