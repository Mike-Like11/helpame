import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Container, Row, Stack, Form} from 'react-bootstrap';
import validator from 'validator'
import '../Css/Login.css';
function Registartion(){

    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        } else {
            // No errors! Put any logic here for the form submission!
            console.log(form)
            alert('Thank you for your feedback!')
        }
    }

    const findFormErrors = () => {
        const {  email, password, passwordConfirm, firstName, lastName, middleName, age, phone, city   } = form
        const newErrors = {}
        if ( !email || email === '' ) newErrors.email = 'Пожалуйста заполните данное поле'
        else if ( !validator.isEmail(email) ) newErrors.email = 'Пожалуйста заполните данное поле'
        if ( !passwordConfirm || passwordConfirm === '' || passwordConfirm.length > 6) newErrors.passwordConfirm = 'select a food!'
        if ( !age || age > 8 || age < 150 ) newErrors.rating = 'must assign a rating between 1 and 5!'

        return newErrors
    }

    return (
    <Container style={{marginTop: '50px'}}>
        <Row className="justify-content-center" md="auto" xs="auto" xl="auto">
            <Col md="auto" xs="auto">
                <div  className="login">
                    <Stack gap={3} >
                        <h1 className="text-center mt-5">Создайте аккаунт</h1>
                        <Form className="mt-5" onSubmit={handleSubmit} >
                            <Stack gap={3}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label >Почта</Form.Label>
                                        <Form.Control type="email"
                                                      placeholder="Введите вашу почту"
                                                      isInvalid={errors.email }
                                                      onChange={ e => setField('email', e.target.value) } />
                                        <Form.Control.Feedback type='invalid'>{ errors.email }</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label >Пароль</Form.Label>
                                        <Form.Control type="password"
                                                      placeholder="не менее 6 символов"
                                                      isInvalid={errors.password }
                                                      onChange={ e => setField('password', e.target.value) } />
                                        <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Повторите пароль</Form.Label>
                                        <Form.Control type="password"
                                                      placeholder="Повторите пароль"
                                                      isInvalid={errors.passwordConfirm }
                                                      onChange={ e => setField('passwordConfirm', e.target.value) } />
                                        <Form.Control.Feedback type="invalid">
                                            Пароли не совпадают
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label >Имя</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="Введите ваше имя"
                                                      isInvalid={errors.firstName }
                                                      onChange={ e => setField('firstName', e.target.value) } />
                                        <Form.Control.Feedback type="invalid">
                                            Пожалуйста заполните данное поле
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label >Фамилия</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="введите вашу фамилию"
                                                      isInvalid={errors.lastName }
                                                      onChange={ e => setField('lastName', e.target.value) }  />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Отчество</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="введите ваше отчетство"
                                                      isInvalid={errors.middleName }
                                                      onChange={ e => setField('middleName', e.target.value) } />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.middleName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label >Возраст</Form.Label>
                                        <Form.Control type="number"
                                                      placeholder="Введите ваш возраст"
                                                      isInvalid={errors.age }
                                                      onChange={ e => setField('age', e.target.value) }  />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.age}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label >Номер телефона</Form.Label>
                                        <Form.Control type="number"
                                                      placeholder="Введите ваш номер"
                                                      isInvalid={errors.phone }
                                                      onChange={ e => setField('phone', e.target.value) }  />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="validationCustom05">
                                        <Form.Label>Ваш город</Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="Введите название города"
                                                      isInvalid={errors.city }
                                                      onChange={ e => setField('city', e.target.value) }  />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.city}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                {/*<Row className="mb-3">*/}
                                {/*    <Form.Group controlId="formFile" className="mb-3">*/}
                                {/*        <Form.Label>Ваше изображение</Form.Label>*/}
                                {/*        <Form.Control type="file"*/}
                                {/*                      accept="image/*"*/}
                                {/*            //value={avatar}*/}
                                {/*                      onChange={e => setAvatar(e.target.files[0])}*/}
                                {/*                      required*/}
                                {/*        />*/}
                                {/*    </Form.Group>*/}
                                {/*</Row>*/}
                                {/*{avatar && (*/}
                                {/*    <div>*/}
                                {/*        <img*/}
                                {/*            src={URL.createObjectURL(avatar)}*/}
                                {/*            alt="Thumb"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                <Button className="btn btn-success"  type="submit">Создать аккаунт</Button>
                            </Stack>
                        </Form>
                        <Link to="/login" className="text-center">Уже есть аккаунт?</Link>
                    </Stack>
                </div>
            </Col>
        </Row>
    </Container>

    )
}
export default Registartion;
// const [password, setPassword] = useState("");
// const [lastName, setLastName] = useState("");
// const [firstName, setFirstName] = useState("");
// const [passwordConfirm, setPasswordConfirm] = useState("");
// const [middleName, setMiddleName] = useState("");
// const [email, setEmail] = useState("");
// const [age, setAge] = useState("");
// const [phone, setPhone] = useState("");
// const [city, setCity] = useState("");
// const [validated, setValidated] = useState(false);
// const [emailError, setEmailError] = useState('')
// const [passError, setPassError] = useState(true)
// const [avatar, setAvatar] = useState()
// const validateEmail = (e) => {
//     var email = e.target.value
//     if (validator.isEmail(email)) {
//         setEmail(email)
//         setEmailError('')
//     } else {
//         setEmail(email)
//
//     }
// }
// const validatePasswordConfirm = (e) => {
//     var pasCon = e.target.value
//     console.log(passError)
//     if (password === pasCon) {
//         setPasswordConfirm(pasCon)
//         setPassError(false)
//     } else {
//         setPasswordConfirm(pasCon)
//         setPassError(true)
//
//     }
// }
// const onSubmitLogin = async e => {
//     const form = e.currentTarget;
//     console.log(form.checkValidity())
//     if (form.checkValidity() === false && emailError!=='' && !passError) {
//         e.preventDefault();
//         e.stopPropagation();
//     }
//     else {
//         e.preventDefault();
//         try {
//             const body = {
//                 password: password,
//                 firstname: firstName,
//                 middlename: middleName,
//                 lastname: lastName,
//                 age: age,
//                 phone: phone,
//                 email: email,
//                 passwordConfirm: passwordConfirm,
//                 city:city,
//                 avatar:avatar
//             };
//             console.log(body)
//             //await axios.post("/api/auth/registration", body);
//             //navigate("/login")
//         } catch (err) {
//             console.error(err.message);
//         }
//     }
//     setValidated(true);
// };
// return(

// );