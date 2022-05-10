import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import "./App.css"
import UserProfile from "./Components/UserProfile";
import AddTask from "./Components/AddTask";
import ListTasks from "./Components/ListTasks";
import AddCurriculumVitae from "./Components/AddCurriculumVitae";
function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <div className="App">
            <Header/>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/tasks" element={<ListTasks/>}/>
                <Route path="/create_cv" element={<AddCurriculumVitae/>}/>
              <Route path="/registration" element={<Registration/>}/>
              <Route path="/profile" element={<UserProfile/>}/>
              <Route path="/new_task" element={<AddTask/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
