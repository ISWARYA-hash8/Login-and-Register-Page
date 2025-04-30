import Register from "./Pages/RegisterPage";
import {BrowserRouter,Route,Routes} from 'react-router-dom';






function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path ="/register"      element ={<Register/>}/>
        <Route path ="/dashboard"      element ={<h1>dashboard page</h1>}/>
        <Route path ="/"      element ={<h1>Home</h1>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
};

export default App;
