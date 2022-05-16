import {useEffect} from "react";
import React, {useState} from "react";
import axios from "axios";
import {Button, Container, Row, Table} from "react-bootstrap";
import {FullscreenControl, GeolocationControl, Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";

const Admin = () =>{
    const [tasks, setTasks] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [users, setUsers] = useState([]);
    const getTasks = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/admin/tasks",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setTasks(response.data);
            })
        } catch (err) {
        }
    };
    const getWorkers = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/admin/workers",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setWorkers(response.data);
            })
        } catch (err) {
        }
    };
    const getUsers = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/admin/users",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUsers(response.data);
            })
        } catch (err) {
        }
    };
    useEffect(() => {
        getTasks();
        getUsers();
        getWorkers();
    }, [])
    return(
        <Container className="mt-4">
            {tasks.length > 0 &&
                <Row>
                    <Table striped bordered hover responsive style={{padding:'30',background:"white",margin:'30'}}>
                        <thead>
                        <tr>
                            <th><h4 className="mid">ID задания</h4></th>
                            <th><h4 className="mid">Название</h4></th>
                            <th><h4 className="mid">Описание</h4></th>
                            <th><h4 className="mid">Время</h4></th>
                            <th><h4 className="mid">Местоположение</h4></th>
                            <th><h4 className="mid">Дата создания</h4></th>
                            <th><h4 className="mid"></h4></th>
                            <th><h4 className="mid"></h4></th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map(task => (
                            <tr key={task.strId}>
                                <td>{task.strId}</td>
                                <td>{task.taskInfo.name}</td>
                                <td>{task.taskInfo.description}</td>
                                <td>{task.taskInfo.dateOfPerformance + ' '+ task.taskInfo.timeOfPerformance}</td>
                                <td>
                                    <YMaps>
                                        <Map state={{ center: [task.taskInfo.coordinates.latitude,task.taskInfo.coordinates.longitude], zoom: 12}} width={"100%"}>
                                            <Placemark geometry={[task.taskInfo.coordinates.latitude,task.taskInfo.coordinates.longitude]} />
                                            <ZoomControl />
                                            <FullscreenControl />
                                            <GeolocationControl />
                                        </Map>
                                    </YMaps>
                                </td>
                                <td>{task.dateOfCreation}</td>
                                <td>
                                    <Button className="btn btn-warning">Редактировать</Button>
                                </td>
                                <td>
                                    <Button className="btn btn-danger">Удалить</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Row>
            }
            {workers.length > 0 &&
                <Row>
                    <Table striped bordered hover responsive style={{padding:'30',background:"white",margin:'30'}}>
                        <thead>
                        <tr>
                            <th><h4 className="mid">ID работника</h4></th>
                            <th><h4 className="mid">Имя и фамилия</h4></th>
                            <th><h4 className="mid">Опыт работы</h4></th>
                            <th><h4 className="mid">Предпочтения по работе</h4></th>
                            <th><h4 className="mid">Любимые животные</h4></th>
                            <th><h4 className="mid">Рейтинг</h4></th>
                            <th><h4 className="mid"></h4></th>
                            <th><h4 className="mid"></h4></th>
                        </tr>
                        </thead>
                        <tbody>
                        {workers.map(worker => (
                            <tr key={worker.strId}>
                                <td>{worker.strId}</td>
                                <td>{worker.shortUserInfo.firstName+' '+worker.shortUserInfo.lastName}</td>
                                <td>{worker.workerInfo.experience}</td>
                                <td>{worker.workerInfo.preferences}</td>
                                <td>
                                    {worker.workerInfo.favoriteAnimals.join(', ')}
                                </td>
                                <td>{worker.rating}</td>
                                <td>
                                    <Button className="btn btn-warning">Редактировать</Button>
                                </td>
                                <td>
                                    <Button className="btn btn-danger">Удалить</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Row>
            }
            {
                users.length > 0 &&
                <Row>
                    <Table striped bordered hover responsive style={{padding:'30',background:"white",margin:'30'}}>
                        <thead>
                        <tr>
                            <th><h4 className="mid">ФИО пользователя</h4></th>
                            <th><h4 className="mid">Почта</h4></th>
                            <th><h4 className="mid">Роли</h4></th>
                            <th><h4 className="mid">Город</h4></th>
                            <th><h4 className="mid">Возраст</h4></th>
                            <th><h4 className="mid"></h4></th>
                            <th><h4 className="mid"></h4></th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.shortUserInfo.lastName}>
                                <td>{user.shortUserInfo.firstName+' '+user.shortUserInfo.lastName+ ' '+user.fullUserInfo.middleName}</td>
                                <td>{user.email}</td>
                                <td>{user.roles.join(', ')}</td>
                                <td>
                                    {user.fullUserInfo.city}
                                </td>
                                <td>{user.fullUserInfo.age}</td>
                                <td>
                                    <Button className="btn btn-warning">Редактировать</Button>
                                </td>
                                <td>
                                    <Button className="btn btn-danger">Удалить</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Row>

            }
        </Container>
    )
}
export default Admin;