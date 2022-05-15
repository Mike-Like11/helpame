import {Button, Card, Col, Image, NavLink, Row} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {FaHouseUser, FaPhone, FaTelegram, FaUserCheck, FaUserCircle, FaViber, FaWhatsapp} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import UpdateUser from "./UpdateUser";
import AddReview from "./AddReview";

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
            {tasks.length > 0 &&
                <h1 className="text-center">Ваши задания</h1>
            }
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
                                                    <Image src={worker.shortUserInfo.avatarUrl} roundedCircle width={100}
                                                           height={100}/>
                                                </Col>
                                                <Col sm={5}>
                                                    <u><NavLink
                                                        onClick={() => navigate(`/workers/${worker.strId}`, {state: {worker: worker}})}>
                                                        <h5 style={{
                                                            fontWeight: "bold",
                                                            fontStyle: "italic",
                                                            color: "black"
                                                        }}>{worker.shortUserInfo.firstName + ' ' + worker.shortUserInfo.lastName}</h5>
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
                                            <h5 style={{fontWeight: "bold"}}>{task.worker.shortUserInfo.firstName+ ' '+ task.worker.shortUserInfo.lastName}</h5>
                                        </Col>
                                    </Row>
                                    <Row className="p-2 align-content-center justify-content-center text-center">
                                        <Col>
                                            <FaPhone  color="#fed053" size="40"/>
                                        </Col>
                                        <Col>
                                            <h5   style={{fontWeight: "bold"}}>{task.worker.shortUserInfo.phone}</h5>
                                        </Col>
                                    </Row>
                                </Card>
                            </Row>
                        }
                        <AddReview
                            show={modalShow}
                            worker={task.worker}
                            task={task}
                            onHide={() => {setModalShow(false);getTasks()}}/>
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