import React, {useEffect, useState} from "react";
import '../Css/Login.css';
import axios from "axios";
import avatar from "../Assets/userProfile.png"
import {
    Alert,
    Button, Card,
    Col,
    Container,
    Form,
    FormControl, Image,
    InputGroup,
    Modal, NavLink,
    Row, Spinner, Stack
} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import validator from "validator";
import AddReview from "./AddReview";
import {FullscreenControl, GeolocationControl, Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import ReactStars from "react-rating-stars-component";
import {FaHouseUser, FaLine, FaPhone, FaTelegram, FaUserCheck, FaUserCircle, FaViber, FaWhatsapp} from "react-icons/fa";
import {List} from "react-content-loader";
import MyTasks from "./MyTasks";
import MyRunningTasks from "./MyRunningTasks";
import UpdateUser from "./UpdateUser";

const UserProfile = () => {
    const [user, setUser] = useState("");
    const [modalShow, setModalShow] = React.useState(false);
    const [ loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState([]);
    const [worker, setWorker] = useState(null);
    const navigate = useNavigate();
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUser(response.data);
                setLoading(false)
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

        }
    };
    useEffect(() => {
        getUser();
        getWorker();
    }, []);
    return(
        <Container  className="mb-3 mt-3">
            <Row  className="mb-3 mt-3">
                <Col>
                    <Card className="d-flex flex-column align-items-center text-center login m-4">
                        {loading ? <Spinner animation="border" className="p-4" style={{ width: '200', height: '200' }}/> :  <Image src={user.shortUserInfo.avatarUrl} roundedCircle width={200} height={200}/>}
                        <Card.Body>
                            <Row>
                                    {
                                        !worker &&
                                            <Col>
                                                <Button variant="info" style={{height: "100%"}} onClick={()=>{navigate("/create_cv")}}>Создать резюме</Button>
                                            </Col>
                                    }
                                        <Col>
                                        <Button variant="dark" onClick={() => navigate("/new_task")}>Создать задание</Button>
                                        </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                {user &&
                    <Col>
                        <Card className="d-flex flex-column align-items-center login">
                            <Row>
                                <h1 className="text-center">Информация о пользователе</h1>
                                <Col>
                                    <Form.Label htmlFor="basic-url">Имя</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder="Ваше имя" value = {user.shortUserInfo.firstName} disabled/>
                                    </InputGroup>
                                    <Form.Label htmlFor="basic-url2">Отчетство</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl id="basic-url2" aria-describedby="basic-addon3" placeholder="Ваше отчество" value = {user.fullUserInfo.middleName} disabled/>
                                    </InputGroup>
                                    <Form.Label htmlFor="basic-url2">Возраст</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl id="basic-url2" aria-describedby="basic-addon3" placeholder="Ваш возраст" value = {user.fullUserInfo.age} disabled/>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <Form.Label htmlFor="basic-url">Фамилия</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder="Ваша фамилия" value = {user.shortUserInfo.lastName} disabled/>
                                    </InputGroup>
                                    <Form.Label htmlFor="basic-url4">Город проживания</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl id="basic-url4" aria-describedby="basic-addon3" placeholder="Ваш город" value = {user.fullUserInfo.city} disabled/>
                                    </InputGroup>
                                    <Form.Label htmlFor="basic-url2">Номер телефона</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl id="basic-url2" aria-describedby="basic-addon3" placeholder="Ваш номер телефона" value = {user.shortUserInfo.phone} disabled/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Button variant="dark" className="justify-content-center" onClick={() => setModalShow(true)}>Редактировать</Button>
                            </Row>
                            <UpdateUser
                                show={modalShow}
                                onHide={() => setModalShow(false)}/>
                        </Card>
                    </Col>
                }
            </Row>
            <MyTasks/>
            <MyRunningTasks/>
        </Container>
    )
}
export default UserProfile;