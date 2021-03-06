import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Form, Image, Row, Stack} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {FullscreenControl, GeolocationControl, Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import {
    FaCity, FaHouseUser,
    FaMandalorian, FaPeopleArrows,
    FaPersonBooth,
    FaPhone,
    FaTelegram,
    FaUserCircle,
    FaViber,
    FaWhatsapp
} from "react-icons/fa";
const TaskFullInfo =(props) =>{
    const id = useParams()
    let token = JSON.parse(localStorage.getItem("user"));
    const task =  useLocation().state.task
    let navigate = useNavigate();
    const [worker, setWorker] = useState(null);
    const [userFullInfo, setUserFullInfo] = useState(null);
    const handleSubmit = async e => {
        await axios.get(`http://localhost:8080/api/tasks/${task.strId}/respond`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            navigate("/profile")
        })
    }
    const getWorker = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/worker",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setWorker(response.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            console.log(task.taskInfo)
            await axios.post("http://localhost:8080/api/user_full_info",
                task.shortUserInfo
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
   useEffect(()=>{getWorker();getUser();},[])
    return(
        <Container>
            <Row  className="mb-3 mt-3">
                <Col sm={5}>
                    <Row>
                        <Card className="task p-4">
                            <YMaps>
                                <Map state={{ center: [task.taskInfo.coordinates.latitude,task.taskInfo.coordinates.longitude], zoom: 12}} width={"100%"}>
                                    <Placemark geometry={[task.taskInfo.coordinates.latitude,task.taskInfo.coordinates.longitude]} />
                                    <ZoomControl />
                                    <FullscreenControl />
                                    <GeolocationControl />
                                </Map>
                            </YMaps>
                        </Card>
                    </Row>
                    <Row>
                        {worker &&
                            <Card className="task mt-4 p-4">
                                <Row className="p-1 align-content-center justify-content-center text-center">
                                    <Col className="align-content-center justify-content-center">
                                        <FaUserCircle size="40" color="#fed053"/>
                                    </Col>
                                    <Col>
                                        <h5 style={{fontWeight: "bold"}}>{task.shortUserInfo.firstName + ' ' + task.shortUserInfo.lastName}</h5>
                                    </Col>
                                </Row>
                                {userFullInfo &&
                                    <div>
                                        <Row className="p-1 align-content-center justify-content-center text-center">
                                            <Col className="align-content-center justify-content-center">
                                                <FaHouseUser size="40"/>
                                            </Col>
                                            <Col>
                                                <h5 style={{fontWeight: "bold", color: "red"}}>{userFullInfo.city}</h5>
                                            </Col>
                                        </Row>
                                        <Row className="p-2 align-content-center justify-content-center text-center">
                                            <Col>
                                                <FaPhone color="#fed053" size="40"/>
                                            </Col>
                                            <Col>
                                                <h5 style={{fontWeight: "bold"}}>{task.shortUserInfo.phone}</h5>
                                            </Col>
                                        </Row>
                                        <Row className="text-center">
                                            {userFullInfo.whatsApp &&
                                                <Col>
                                                    <FaWhatsapp color="green" size="50"/>
                                                </Col>
                                            }
                                            {userFullInfo.viber &&
                                                <Col>
                                                    <FaViber color="purple" size="50"/>
                                                </Col>
                                            }
                                            {userFullInfo.telegram &&
                                                <Col>
                                                    <FaTelegram color="#0088cc" className="ms-auto" size="50"/>
                                                </Col>

                                            }
                                        </Row>
                                    </div>
                                }
                            </Card>
                        }
                    </Row>
                </Col>
                <Col>

                </Col>
                <Col sm={6}>

                        <Row>
                            <Card className="task p-4">
                                <h2 className="text-center">???????????????????? ?? ??????????????</h2>
                                <h4 style={{fontWeight: "bold"}}>????????????????</h4>
                                <h5 style={{textAlign: "left"}}>{task.taskInfo.name}</h5>
                                <h4 style={{fontWeight: "bold"}}>????????????????</h4>
                                <h5 style={{textAlign: "left"}}>{task.taskInfo.description}</h5>
                                <h4 style={{fontWeight: "bold"}}>???????? ???????????????????? ??????????????</h4>
                                <h5 style={{textAlign: "left"}}>{task.taskInfo.dateOfPerformance + ' ' + task.taskInfo.timeOfPerformance}</h5>
                                {(token  && (!task.workerInfoList.includes(worker)) && worker) &&
                                    <Button className="btn btn-warning" type="submit" onClick={()=> handleSubmit()}>????????????????????????</Button>
                                }
                            </Card>
                        </Row>

                </Col>
            </Row>
        </Container>
    )
}
export default TaskFullInfo;