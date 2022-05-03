import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import "./App.css"
function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <div className="App">
            <Header/>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/registration" element={<Registration/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
