import Register from "./Pages/RegisterPage";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path ="/register"      element ={<Register/>}/>
        <Route path ="/login"      element ={<LoginPage/>}/>

        <Route path ="/dashboard"      element ={<Dashboard/>}/>
        <Route path ="/"      element ={<h1>home</h1>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
};

export default App;
