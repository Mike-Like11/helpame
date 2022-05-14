import {Button, Card, Col, Image, NavLink, Row} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {FaHouseUser, FaPhone, FaTelegram, FaUserCheck, FaUserCircle, FaViber, FaWhatsapp} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const MyTasks = () =>{
    const [tasks, setTasks] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const navigate = useNavigate();
    const getTasks = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/tasks",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setTasks(response.data);
            })
        } catch (err) {
        }
    };
    const chooseWorker = async (worker,task) => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.post(`http://localhost:8080/api/user/tasks/${task.strId}`, worker.strId,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}
        ).then((response) => {
                getTasks();
            })
        } catch (err) {
        }
    };
    useEffect(() => {
        getTasks();
    }, []);
    return(
        <Row>
            <h1 className="text-center">Ваши задания</h1>
            {tasks.map(task => (
                <Col>
                    <Row className="login">
                        <Card.Header>
                            <h1>{task.taskInfo.name}</h1>
                        </Card.Header>
                        {!task.worker &&
                            <Row className="p-4">
                                <h3>Откликнувшиеся работники</h3>
                                {task.workerInfoList.map(worker => (
                                    <Col>
                                        <Card className="task">
                                            <Row>
                                                <Col sm={3}>
                                                    <Image src={worker.personalInfo.avatarUrl} roundedCircle width={50}
                                                           height={50}/>
                                                </Col>
                                                <Col sm={5}>
                                                    <u><NavLink
                                                        onClick={() => navigate(`/workers/${worker.strId}`, {state: {worker: worker}})}>
                                                        <h5 style={{
                                                            fontWeight: "bold",
                                                            fontStyle: "italic",
                                                            color: "black"
                                                        }}>{worker.personalInfo.firstName + ' ' + worker.personalInfo.lastName}</h5>
                                                    </NavLink></u>
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
                                                <Col sm={3} className="text-center"
                                                     onClick={() => chooseWorker(worker, task)}><Button
                                                    variant="outline-success"><FaUserCheck size="25"/><h5>Выбрать</h5>
                                                </Button></Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        }
                        {task.worker &&
                            <Row className="p-4">
                                <h3>Связь с исполнителем</h3>
                                <Card className="task mt-4 p-4">
                                    <Row className="p-1 align-content-center justify-content-center text-center">
                                        <Col className="align-content-center justify-content-center">
                                            <FaUserCircle size="40" color="#fed053"/>
                                        </Col>
                                        <Col>
                                            <h5 style={{fontWeight: "bold"}}>{task.userInfo.firstName+ ' '+ task.userInfo.lastName}</h5>
                                        </Col>
                                    </Row>
                                    <Row className="p-1 align-content-center justify-content-center text-center">
                                        <Col className="align-content-center justify-content-center">
                                            <FaHouseUser size="40"/>
                                        </Col>
                                        <Col>
                                            <h5 style={{fontWeight: "bold", color: "red"}}>{task.userInfo.city}</h5>
                                        </Col>
                                    </Row>
                                    <Row className="p-2 align-content-center justify-content-center text-center">
                                        <Col>
                                            <FaPhone  color="#fed053" size="40"/>
                                        </Col>
                                        <Col>
                                            <h5   style={{fontWeight: "bold"}}>{task.userInfo.phone}</h5>
                                        </Col>
                                    </Row>
                                    <Row className="text-center">
                                        {task.userInfo.whatsApp &&
                                            <Col>
                                                <FaWhatsapp color="green"  size="50" />
                                            </Col>
                                        }
                                        {task.userInfo.viber &&
                                            <Col>
                                                <FaViber color="purple" size="50"/>
                                            </Col>
                                        }
                                        {task.userInfo.telegram &&
                                            <Col>
                                                <FaTelegram color="#0088cc" className="ms-auto" size="50"/>
                                            </Col>

                                        }
                                    </Row>
                                </Card>
                            </Row>
                        }
                        <Card.Footer>
                            <Row className="text-center">
                                {!task.worker &&
                                    <Col>
                                        <Button variant="danger" className="justify-content-center" onClick={() => setModalShow(true)}>Удалить</Button>
                                    </Col>
                                }
                                {task.worker &&
                                    <Col>
                                        <Button variant="success" className="justify-content-center" onClick={() => setModalShow(true)}>Завершить</Button>
                                    </Col>
                                }
                            </Row>
                        </Card.Footer>
                    </Row>
                </Col>
            ))}
        </Row>
    )
}
export default MyTasks;