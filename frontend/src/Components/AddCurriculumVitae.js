import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Container, Row, Stack, Form} from 'react-bootstrap';
import validator from 'validator'
import '../Css/Login.css';
function AddCurriculumVitae(){

    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})

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
                const body = {
                    experience: form.experience,
                    preferences: form.preferences,
                    favoriteAnimals: form.favoriteAnimals.split(', ')
                };
                let token = JSON.parse(localStorage.getItem("user"));
                console.log({
                    workerInfo: body
                })
                await axios.post("http://localhost:8080/api/user/worker",
                    body,{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }});
                navigate("/tasks")
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const findFormErrors = () => {
        const {  experience, preferences, favoriteAnimals} = form
        const newErrors = {}
        if ( !experience || experience === '' ) newErrors.experience = 'Пожалуйста заполните данное поле'
        if ( !preferences|| preferences === '') newErrors.preferences = 'Пароль должен быть больше 6 символов'
        if (!favoriteAnimals || favoriteAnimals === '') newErrors.favoriteAnimals = 'Пожалуйста заполните данное поле'
        return newErrors
    }

    return (
        <Container style={{marginTop: '20px'}}>
            <Row className="justify-content-center" md="auto" xs="auto" xl="auto">
                <Col md="auto" xs="auto">
                    <div  className="login">
                        <Stack gap={1} >
                            <h1 className="text-center mt-1">Создайте резюме</h1>
                            <Form className="mt-1" onSubmit={handleSubmit} noValidate >
                                <Stack gap={1}>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label >Опыт работы</Form.Label>
                                            <Form.Control type="text" as="textarea"
                                                          rows="5"
                                                          placeholder="Введите ваш опыт работы"
                                                          isInvalid={errors.experience }
                                                          onChange={ e => {
                                                              setField('experience', e.target.value)
                                                          } } />
                                            <Form.Control.Feedback type='invalid'>{ errors.experience }</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label >Предпочтения по  выполнению заданий</Form.Label>
                                            <Form.Control type="text" as="textarea"
                                                          rows="3"
                                                          placeholder="Введите ваши предпочтения"
                                                          isInvalid={errors.preferences }
                                                          onChange={ e => setField('preferences', e.target.value) } />
                                            <Form.Control.Feedback type="invalid">
                                                Пожалуйста заполните данное поле
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label >Ваши любимые животные через запятую с маленькой буквы</Form.Label>
                                            <Form.Control type="text"
                                                          rows="2"
                                                          placeholder="Перечислите ваши любимые животные"
                                                          isInvalid={errors.favoriteAnimals}
                                                          onChange={ e => setField('favoriteAnimals', e.target.value) }  />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.favoriteAnimals}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button className="btn btn-warning"  type="submit">Стать работником</Button>
                                </Stack>
                            </Form>
                        </Stack>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}
export default AddCurriculumVitae;