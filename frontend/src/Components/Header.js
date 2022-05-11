import {NavLink, useNavigate} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import '../Css/Login.css';
function Header(){
    let navigate = useNavigate();
    return(
        <header className='header header'  style={{backgroundColor: "white", fontFamily: "cursive"}}>
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Nav.Link as={NavLink} className="navLink" to="/" style={{color:'#fed053'}}><h1>HELPAME</h1></Nav.Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} className="navLink" to="/tasks" style={({ isActive }) =>
                                isActive
                                    ? {
                                        color: '#fff',
                                        background: '#fed053',
                                        borderRadius: '10px'
                                    }
                                    : { color: 'black'}}
                            ><h4  style={{fontWeight:"bold", fontFamily:"MyFont3"}}>Задания</h4></Nav.Link>
                            <Nav.Link as={NavLink} className="navLink" to="/workers" style={({ isActive }) =>
                                isActive
                                    ? {
                                        color: '#fff',
                                        background: '#fed053',
                                        borderRadius: '10px'
                                    }
                                    : { color: 'black'}}
                            ><h4  style={{fontWeight:"bold", fontFamily:"MyFont3"}}>Работники</h4></Nav.Link>
                        </Nav>
                        {localStorage.getItem("user") === null &&
                            <Nav>
                                <Nav.Link as={NavLink} className="navLink" to="/login" style={({ isActive }) =>
                                    isActive
                                        ? {
                                            color: '#fff',
                                            background: 'black',
                                            borderRadius: '10px'
                                        }
                                        : { color: 'black'}}
                                ><h4  style={{fontWeight:"bold", fontFamily:"MyFont3"}}>Войти</h4></Nav.Link>
                                {/*<Nav.Link as={NavLink} className="navLink" to="/registration" style={({ isActive }) =>*/}
                                {/*    isActive*/}
                                {/*        ? {*/}
                                {/*            color: '#fff',*/}
                                {/*            background: '#fed053'*/}
                                {/*        }*/}
                                {/*        : { color: 'black'}}*/}
                                {/*><h4 style={{fontWeight:"bold", fontFamily:"MyFont3"}}>Регистрация</h4></Nav.Link>*/}
                            </Nav>
                        }
                        {localStorage.getItem("user") !== null &&
                            <Nav>
                                <Nav.Link as={NavLink} className="navLink" to="/profile" style={({ isActive }) =>
                                    isActive
                                        ? {
                                            color: '#fff',
                                            background: '#fed053',
                                            borderRadius: '10px'
                                        }
                                        : { color: 'black'}}
                                ><h3>Личный кабинет</h3></Nav.Link>
                                <Nav.Link as={NavLink} className="navLink" onClick={()=>{localStorage.clear(); navigate("/login")}} to="/login" style={({ isActive }) =>
                                    isActive
                                        ? {
                                            color: '#fff',
                                            background: 'orange',
                                            borderRadius: '10px'
                                        }
                                        : { color: 'red'}}
                                ><h3>Выйти</h3></Nav.Link>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
export default Header;