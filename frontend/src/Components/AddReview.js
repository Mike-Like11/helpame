import ReactStars from "react-rating-stars-component";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Modal, Row, Stack} from "react-bootstrap";
import axios from "axios";
function AddReview(props) {
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
                    text: form.text,
                    rating: form.rating
                };
                setForm({})
                props.onHide()
                // await axios.post("http://localhost:8080/api/specialists/props.specialist.id/reviews",
                //     body,);
                //navigate("/login")
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const findFormErrors = () => {
        const {  text, rating   } = form
        const newErrors = {}
        if ( !text || text === '' ) newErrors.text = 'Пожалуйста заполните данное поле'
        if ( !rating || rating === '') newErrors.rating = 'Пожалуйста заполните данное поле'
        return newErrors
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={()=>{
                setForm({})
                props.onHide()
            }
            }
        >
            <Form className="mt-1" onSubmit={handleSubmit} noValidate >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Оставьте отзыв о выполненном задании
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Stack gap={1}>
                            <Row className="mb-2">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label >Ваш отзыв</Form.Label>
                                    <Form.Control type="text" as="textarea"
                                                  placeholder="Введите ваш отзыв"
                                                  rows="5"
                                                  isInvalid={errors.text }
                                                  onChange={ e => {
                                                      setField('text', e.target.value)
                                                  } } />
                                    <Form.Control.Feedback type='invalid'>{ errors.text }</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-2">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <ReactStars
                                        count={5}
                                        onChange={ e => {
                                            setField('rating', e)
                                        } }
                                        size={24}
                                        isHalf={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                    />
                                    {errors.rating}
                                </Form.Group>
                            </Row>
                        </Stack>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
export default AddReview;