import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import axios from "axios";
import {Button, Col, Container, Form, Modal, Row, Stack} from "react-bootstrap";

const UpdateUser = (props) => {
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
                    password: form.password,
                    firstName: form.firstName,
                    middleName: form.middleName,
                    lastName: form.lastName,
                    age: form.age,
                    phone: form.phone,
                    email: form.email,
                    city: form.city,
                    telegram: form.telegram ? form.telegram : false,
                    viber: form.viber ? form.viber : false,
                    whatsApp: form.whatsApp ? form.whatsApp : false,
                    avatar: form.avatar
                };
                await axios.post("http://localhost:8080/api/user/info",
                    body,{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user"))}`
                        }
                    }).then((response)=>{ props.onHide() });
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const findFormErrors = () => {
        const {  email, password, passwordConfirm, firstName, lastName, middleName, age, phone, city   } = form
        const newErrors = {}
        if ( !email || email === '' ) newErrors.email = '???????????????????? ?????????????????? ???????????? ????????'
        else if ( !validator.isEmail(email) ) newErrors.email = '?????????? ???????????? ?????????????????? ?????????????????????? ???????????? "@"'
        if ( !passwordConfirm || passwordConfirm === '' || passwordConfirm.length <= 6) newErrors.passwordConfirm = '???????????? ???????????? ???????? ???????????? 6 ????????????????'
        else if (passwordConfirm !== password) newErrors.passwordConfirm = '???????????? ???? ??????????????????'
        if ( !password || password === '' || password.length <= 6) newErrors.password = '???????????? ???????????? ???????? ???????????? 6 ????????????????'
        if ( !age || age === ''|| age < 8 || age > 150 ) newErrors.age = '???????????????????? ?????????????????? ???????????? ????????'
        if (!firstName || firstName === '') newErrors.firstName = '???????????????????? ?????????????????? ???????????? ????????'
        if (!middleName || middleName === '') newErrors.middleName = '???????????????????? ?????????????????? ???????????? ????????'
        if (!lastName || lastName === '') newErrors.lastName = '???????????????????? ?????????????????? ???????????? ????????'
        if (!city || city === '') newErrors.city = '???????????????????? ?????????????????? ???????????? ????????'
        if (!phone || phone === '') newErrors.phone = '???????????????????? ?????????????????? ???????????? ????????'
        return newErrors
    }
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/auth/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                    console.log(response.data);
                setForm({
                    city: response.data.fullUserInfo.city,
                    email: response.data.email,
                    firstName: response.data.shortUserInfo.firstName,
                    lastName: response.data.shortUserInfo.lastName,
                    age: response.data.fullUserInfo.age,
                    middleName: response.data.fullUserInfo.middleName,
                    phone: response.data.shortUserInfo.phone,
                    whatsApp: response.data.fullUserInfo.whatsApp,
                    telegram: response.data.fullUserInfo.telegram,
                    viber: response.data.fullUserInfo.viber,
                })
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
            <Form className="mt-1" onSubmit={handleSubmit} noValidate >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        ???????????????????? ???????????? ????????????
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>?????????????? ???????? ?????????? ????????????</h4>
                    <Container>
                        <Stack gap={1}>
                            <Row className="mb-2">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label >??????????</Form.Label>
                                    <Form.Control type="email"
                                                  placeholder="?????????????? ???????? ??????????"
                                                  value={form.email}
                                                  isInvalid={errors.email }
                                                  onChange={ e => {
                                                      setField('email', e.target.value)
                                                  } } />
                                    <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label >????????????</Form.Label>
                                    <Form.Control type="password"
                                                  placeholder="???? ?????????? 6 ????????????????"
                                                  isInvalid={errors.password }
                                                  onChange={ e => setField('password', e.target.value) } />
                                    <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>?????????????????? ????????????</Form.Label>
                                    <Form.Control type="password"
                                                  placeholder="?????????????????? ????????????"
                                                  isInvalid={errors.passwordConfirm }
                                                  onChange={ e => setField('passwordConfirm', e.target.value) } />
                                    <Form.Control.Feedback type="invalid">
                                        ???????????? ???? ??????????????????
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label >??????</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="?????????????? ???????? ??????"
                                                  isInvalid={errors.firstName }
                                                  value={form.firstName}
                                                  onChange={ e => setField('firstName', e.target.value) } />
                                    <Form.Control.Feedback type="invalid">
                                        ???????????????????? ?????????????????? ???????????? ????????
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label >??????????????</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="?????????????? ???????? ??????????????"
                                                  isInvalid={errors.lastName }
                                                  value={form.lastName}
                                                  onChange={ e => setField('lastName', e.target.value) }  />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>????????????????</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="?????????????? ???????? ??????????????????"
                                                  isInvalid={errors.middleName }
                                                  value={form.middleName}
                                                  onChange={ e => setField('middleName', e.target.value) } />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.middleName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label >??????????????</Form.Label>
                                    <Form.Control type="number"
                                                  placeholder="?????????????? ?????? ??????????????"
                                                  isInvalid={errors.age }
                                                  value={form.age}
                                                  onChange={ e => setField('age', e.target.value) }  />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.age}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label >?????????? ????????????????</Form.Label>
                                    <Form.Control type="number"
                                                  placeholder="?????????????? ?????? ??????????"
                                                  isInvalid={errors.phone }
                                                  value={form.phone}
                                                  onChange={ e => setField('phone', e.target.value) }  />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="validationCustom05">
                                    <Form.Label>?????? ??????????</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="?????????????? ???????????????? ????????????"
                                                  isInvalid={errors.city }
                                                  value={form.city}
                                                  onChange={ e => setField('city', e.target.value) }  />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Label>???????????????? ???????????????? ?????????? ?? ????????</Form.Label>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Check
                                        label="telegram"
                                        defaultChecked={form.whatsApp}
                                        onChange={ e => setField('telegram', e.target.checked) }  />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Check
                                        label="whatsApp"
                                        defaultChecked={form.whatsApp}
                                        onChange={ e => setField('whatsApp', e.target.checked) }  />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Check
                                        label="viber"
                                        defaultChecked={form.viber}
                                        onChange={ e => setField('viber', e.target.checked) }  />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>???????? ?????????? ??????????????????????</Form.Label>
                                    <Form.Control type="file"
                                                  accept="image/*"
                                                  onChange={e => setField('avatar', e.target.files[0]) }
                                    />
                                </Form.Group>
                            </Row>
                            {form.avatar && (
                                <Row>
                                    <img
                                        src={URL.createObjectURL(form.avatar)}
                                        alt="Thumb"
                                    />
                                </Row>
                            )}
                        </Stack>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">
                        ??????????????????????
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
export default UpdateUser;