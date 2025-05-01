import './LoginPage.css'
import { useState} from 'react';
import { LoginAPI } from '../services/Api';
import { storeUserData } from '../services/storage';
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate } from 'react-router-dom';
export default function LoginPage () {
   
    const initialStateErrors = {email:{required :false},
   
 password : {required :false},
 custom_error : null 

};
  const [errors,setErrors]=useState(initialStateErrors);

  const[loading,setLoading]= useState (false);



  const [inputs,setInputs] = useState({
    email : "",
    password:""
   }) 
   const handleInputs = (event) =>{
    setInputs ({
       ...inputs, [event.target.name] : event.target.value
    })
 
   }


 const handleSubmit = (event) =>{
           event.preventDefault();
           let errors = initialStateErrors;
           let haserror = false;
          
           if(inputs.email === ""){
            errors.email.required =true;
            haserror=true;
        }
        if(inputs.password === ""){
         errors.password.required =true;
         haserror=true;
     }
     if(haserror!=true){
      //sending API request
      LoginAPI(inputs).then((response)=>{
         console.log(response);
         storeUserData(response?.data?.idToken);

      }).catch((err)=>{
         if(err.code = "ERR_BAD_REQUEST"){
            setErrors({...errors,custom_error:"Invalid credentials"})
         }
      }).finally(()=>{
         setLoading(false);
      })

      setLoading(true);
     }





     setErrors({...errors});
  }


   if(isAuthenticated()){
   //redirect user to dsshboaed page
   return <Navigate to ="/dashboard"/>


  }





    return (
        <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Login Now</h2>
                        <form  onSubmit = {handleSubmit} className="login-form" action="">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                            <input type="email"  className="form-control" 
                           onChange={handleInputs} name="email"  id="" placeholder="email"  />
                            {
                           errors.email.required ? <span className="text-danger" >
                            email is required.
                        </span>:null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                            <input  className="form-control" onChange={handleInputs} type="password"  name="password" placeholder="password" id="" />
                            {
                           errors.password.required ? <span className="text-danger" >
                            Password is required.
                        </span>:null}
                        </div>
                        <div className="form-group">
                            <div  className="text-center">
                            {loading ? <div className="spinner-border text-primary " role="status">
                            <span className="sr-only">{loading}</span>
                          </div> :null}
                            </div>
                            {
                           errors.custom_error  ? <span className="text-danger" >
                           (<p>{errors.custom_error}</p>)
                        </span> :null
                        }
                            <input  type="submit" className="btn btn-login float-right" disabled={loading} value="Login"/>
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Create new account ? Please <Link to = "/register">Register</Link>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}