import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Alert, Button, Card, Col, Image, NavLink, Row} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {FaHouseUser, FaPhone, FaTelegram, FaUserCheck, FaUserCircle, FaViber, FaWhatsapp} from "react-icons/fa";
import {List} from "react-content-loader";

const MyTasks = () =>{
    const [tasks, setTasks] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const navigate = useNavigate();
    const [worker, setWorker] = useState(null);
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
            console.error(err.message);
        }
    };
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
    useEffect(() => {
        getTasks();
        getWorker();
    }, []);
    return(
        <div>
            {(worker) !== null &&
                <Row className="p-4">
                    <Col>
                <h1 className="text-center">Ваши задания</h1>
                    {tasks.length < 1 ? <Col><List foregroundColor="white"/> <List foregroundColor="white"/></Col> :

                tasks.map(task => (
                <Card className="task p-4">
                <Row xxl className="text-center">
                <Col>
                <h3 style={{textAlign: "center"}}
                onClick={() => navigate(`/tasks/${task.strId}`, {state: {task: task}})}>{task.taskInfo.name}</h3>
                </Col>
            {((task.worker && (JSON.stringify(task.worker) !== JSON.stringify(worker)))) &&
                <Col sm={6}>
                <Alert variant="danger">Для данного задания уже найден другой исполнитель</Alert>
                </Col>
            }
            {(JSON.stringify(task.worker) === JSON.stringify(worker)) &&
                <Col sm={6}>
                <Alert variant="success">Заказчик выбрал вас исполнителем!</Alert>
                </Col>
            }
            {!task.worker &&
                <Col sm={6}>
                <Alert variant="warning">Пользователь еще не выбрал исполнителя, ожидайте</Alert>
                </Col>
            }
                </Row>
                <Row className="text-center">
                </Row>
                </Card>
                ))
            }
                    </Col>

                        {worker &&
                            <Col>
                            <h1 className="text-center">Информация о работнике</h1>
                            <Card className="task p-4">
                                <h4 style={{fontWeight: "bold"}}>Опыт работы</h4>
                                <h5 style={{textAlign: "left"}}>{worker.workerInfo.experience}</h5>
                                <h4 style={{fontWeight: "bold"}}>Предпочтения о работе</h4>
                                <h5 style={{textAlign: "left"}}>{worker.workerInfo.preferences}</h5>
                                <h4 style={{fontWeight: "bold"}}>Категории животных, с которыми работает</h4>
                                <h5 style={{textAlign: "left"}}>{worker.workerInfo.favoriteAnimals}</h5>
                            </Card>
                            </Col>
                        }
                </Row>
            }
        </div>
    )
}
export default MyTasks;