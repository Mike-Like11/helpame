import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Container, Row, Stack, Form} from 'react-bootstrap';
import validator from 'validator'
import '../Css/Login.css';
import {
    YMaps,
    Map,
    Placemark,
    ZoomControl,
    FullscreenControl,
    GeolocationControl
} from 'react-yandex-maps';
function AddTask(){

    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})
    const [ coordinate, setCoordinate ] = useState([])
    const [ userInfo, setUserInfo] = useState({})
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            try {
                let token = JSON.parse(localStorage.getItem("user"));
                const body = {
                    name: form.name,
                    description: form.description,
                    dateOfPerformance: form.dateOfPerformance,
                    timeOfPerformance: form.timeOfPerformance,
                    coordinates: {
                        latitude: form.coordinates[0],
                        longitude: form.coordinates[1]
                    }
                };
                await axios.post("http://localhost:8080/api/user/tasks",
                    body,{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }});
                navigate("/profile")
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const findFormErrors = () => {
        const {  name, description, dateOfPerformance, timeOfPerformance, coordinates } = form
        const newErrors = {}
        if ( !name || name === '' ) newErrors.name = 'Пожалуйста заполните данное поле'
        if ( !description || description === '') newErrors.description = 'Пожалуйста заполните данное поле'
        if ( !dateOfPerformance || dateOfPerformance === '') newErrors.dateOfPerformance = 'Пожалуйста заполните данное поле'
        if ( !timeOfPerformance || timeOfPerformance === '') newErrors.timeOfPerformance = 'Пожалуйста заполните данное поле'
        if ( !coordinates || coordinates === []) newErrors.coordinates = 'Пожалуйста заполните данное поле'
        return newErrors
    }
    const getUserInfo = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/auth/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUserInfo(response.data.shortUserInfo);
            })
        } catch (err) {
        }
    };
    useEffect(() => {
        getUserInfo();
    }, []);
    return (
        <Container style={{marginTop: '20px'}}>
            <Row className="justify-content-center" md="auto" xs="auto" xl={12}>
                <Col md="auto" xs="auto" xl={12}>
                    <div  className="login">
                        <Stack gap={1} >
                            <h1 className="text-center mt-1">Создайте задание</h1>
                            <Form className="mt-1" onSubmit={handleSubmit} noValidate >
                                <Stack gap={1}>
                                    <Row>
                                        <Col>
                                            <Row className="mb-2">
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label >Название</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Введите название"
                                                                  isInvalid={errors.name }
                                                                  onChange={ e => {
                                                                      setField('name', e.target.value)
                                                                  } } />
                                                    <Form.Control.Feedback type='invalid'>{ errors.name }</Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-2">

                                                <Form.Group as={Col} controlId="formGridPassword">
                                                    <Form.Label>Детали задания</Form.Label>
                                                    <Form.Control type="text" as="textarea"
                                                                  placeholder="Детали задания"
                                                                  rows="8"
                                                                  isInvalid={errors.description }
                                                                  onChange={ e => setField('' +
                                                                      'description', e.target.value) } />
                                                    <Form.Control.Feedback type="invalid">
                                                        Пароли не совпадают
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row className="mb-2">
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label >Дата выполнения</Form.Label>
                                                    <Form.Control type="date" id="dob" placeholder="Date of Birth"
                                                                  isInvalid={errors.dateOfPerformance }
                                                                  onChange={ e => setField('' +
                                                                      'dateOfPerformance', e.target.value) }/>
                                                    <Form.Control.Feedback type='invalid'>{ errors.dateOfPerformance }</Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridPassword">
                                                    <Form.Label>Время</Form.Label>
                                                    <Form.Control type="time" id="dob" placeholder="Date of Birth"
                                                                  isInvalid={errors.timeOfPerformance }
                                                                  onChange={ e => setField('' +
                                                                      'timeOfPerformance', e.target.value) }/>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.timeOfPerformance}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-2">
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label >Имя</Form.Label>
                                                    <Form.Control type="text" value={userInfo.firstName} disabled/>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label >Фамилия</Form.Label>
                                                    <Form.Control type="text" value={userInfo.lastName} disabled/>
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-2">
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label >Номер телефона</Form.Label>
                                                    <Form.Control type="number" value={userInfo.phone} disabled/>
                                                </Form.Group>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3 justify-content-center">
                                        <Form.Group as={Col} controlId="validationCustom05">
                                            <Form.Label>Местоположение задания</Form.Label>
                                            <Form.Label style={{color: "red"}}>{errors.coordinates}</Form.Label>
                                            <YMaps style={{width:"100%"}} >
                                                <Map state={{ center: [55.75, 37.57], zoom: 9}} width={"100%"} onClick={(e)=>{setField(
                                                    'coordinates', e.get("coords"))}}>
                                                    <Placemark geometry={form.coordinates} />
                                                    <ZoomControl />
                                                    <FullscreenControl />
                                                    <GeolocationControl />
                                                </Map>
                                            </YMaps>
                                        </Form.Group>
                                    </Row>
                                    <Button className="btn btn-success"  type="submit">Создать задание</Button>
                                </Stack>
                            </Form>
                        </Stack>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}
export default AddTask;