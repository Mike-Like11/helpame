import React, {useEffect, useState} from "react";
import '../Css/Login.css';
import axios from "axios";
import avatar from "../Assets/userProfile.png"
import {
    Button, Card,
    Col,
    Container,
    Form,
    FormControl, Image,
    InputGroup,
    Modal,
    Row, Stack
} from "react-bootstrap";
function MyVerticallyCenteredModalUser(props) {
    const [user, setUser] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [passportData, setPassportData] = useState("");
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUser(response.data);
                setUserName(response.data.username);
                setEmail(response.data.email);
                setAge(response.data.age);
                setFirstName(response.data.firstname);
                setLastName(response.data.lastname);
                setMiddleName(response.data.middlename);
                setPassportData(response.data.passportdata);
                setPassword(response.data.password);
                setPhone(response.data.phone);
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    const updateUser =  async  () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            const body = {
                id:user.id,
                username: userName,
                password: password,
                passportdata: passportData,
                firstname: firstName,
                middlename: middleName,
                lastname: lastName,
                age: age,
                phone: phone,
                email: email
            };
            await axios.post("http://localhost:8080/api/user/info", body, {headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUser(response.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновление личных данных
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Введите ваши новые данные</h4>
                <Container>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="basic-url">Имя</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url" aria-describedby="basic-addon3" value = {firstName} onChange={e => setFirstName(e.target.value)}/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Отчетство</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3"  value = {middleName} onChange={e => setMiddleName(e.target.value)}/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Возраст</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {age} onChange={e => setAge(e.target.value)}/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Почта</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {email} onChange={e => setEmail(e.target.value)}/>
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Label htmlFor="basic-url">Фамилия</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url" aria-describedby="basic-addon3" value = {lastName} onChange={e => setLastName(e.target.value)}/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url4">Паспортные данные</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url4" aria-describedby="basic-addon3" value = {passportData} onChange={e => setPassportData(e.target.value)}/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Телефон</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {phone}  onChange={e => setPhone(e.target.value)}/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => updateUser()}>
                    Подтвердить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
const UserProfile = () => {
    const [user, setUser] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUser(response.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return(
        <Container  className="mb-3 mt-3">
            <Row  className="mb-3 mt-3">
                <Col>
                    <Card className="d-flex flex-column align-items-center text-center login">
                        <Image src={avatar} roundedCircle width={150} height={150}/>
                        <Card.Body>
                            <Stack gap={1}>
                                <Row>
                                    <Col>
                                        <Button variant="info" style={{height: "100%"}}>Создать резюме</Button>
                                    </Col>
                                    <Col>
                                    <Button variant="dark">Создать задание</Button>
                                     </Col>
                                </Row>
                                <Button variant="danger">Выйти</Button>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Col>
                <Col  className="login">
                    <Row>
                        <h1 className="text-center">Информация о пользователе</h1>
                        <Col>
                            <Form.Label htmlFor="basic-url">Имя</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url" aria-describedby="basic-addon3" value = {user.firstname} disabled/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Отчетство</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3" t value = {user.middlename} disabled/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Возраст</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {user.age} disabled/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Почта</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {user.email} disabled/>
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Label htmlFor="basic-url">Фамилия</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url" aria-describedby="basic-addon3" value = {user.lastname} disabled/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url4">Город проживания</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url4" aria-describedby="basic-addon3" value = {user.city} disabled/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Номер телефона</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {user.phone} disabled/>
                            </InputGroup>
                        </Col>
                        <Button variant="dark" size="sm" onClick={() => setModalShow(true)}>Редактировать</Button>
                        <MyVerticallyCenteredModalUser user={user}
                                                       show={modalShow}
                                                       onHide={() => setModalShow(false)}/>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default UserProfile;