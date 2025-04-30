//import react from "react";
import { RegisterAPI } from '../services/Api';
import { isAuthenticated } from '../services/Auth';
import { storeUserData } from '../services/storage';
import './RegisterPage.css'
import react , {useState} from 'react';
import {Navigate} from 'react-router-dom';
const Register = () =>{

     const initialStateErrors = {email:{required :false},
     name :{required : false},
  password : {required :false},
  custom_error : null 

};
   const [errors,setErrors]=useState(initialStateErrors);

  const[loading,setLoading]= useState (false);

  const handleSubmit = (event) =>{
           event.preventDefault();
           let errors = initialStateErrors;
           let haserror = false;
           if(inputs.name == ""){
               errors.name.required =true;
               haserror=true;
           }
           if(inputs.email == ""){
            errors.email.required =true;
            haserror=true;
        }
        if(inputs.password == ""){
         errors.password.required =true;
         haserror=true;
     }
     if(haserror!=true){
      //sending API request
      RegisterAPI(inputs).then((response)=>{
         console.log(response);
         storeUserData(response?.data?.idToken);

      }).catch((err)=>{
         if(err?.response?.data?.error?.message=="EMAIL_EXISTS"){
            setErrors({...errors,custom_error:"Already this email has been registered"})

         }
         else if(String(err.response.data.error.message).includes('WEAK_PASSWORD') ){
            setErrors({...errors,custom_error:"Passowrd should be 6 characters"})
         }
      }).finally(()=>{
         setLoading(false);
      })

      setLoading(true);
     }





     setErrors(errors);
  }




 const [inputs,setInputs] = useState({
   email : "",
   password:"",
   name : ""
  })
  const handleInputs = (event) =>{
   setInputs ({
      ...inputs, [event.target.name] : event.target.value
   })

  }

  if(isAuthenticated()){
   //redirect user to dsshboaed page
   return <Navigate to ="/dashboard"/>


  }


 

    return (
        <section className="register-block">
            <div className="container">
               <div className="row ">
                  <div className="col register-sec">
                     <h2 className="text-center">Register Now</h2>
                     <form onSubmit={handleSubmit} className="register-form" action="" >
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
          
                        <input type="text" className="form-control" onChange = {handleInputs}  name="name" id=""  />
                        {
                           errors.name.required ? <span className="text-danger" >
                            Name is required.
                        </span>:null}
                     </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
          
                        <input type="text"  className="form-control" onChange = {handleInputs}  name="email" id=""   />
                        {
                           errors.email.required?<span className="text-danger" >
                            Email is required.
                        </span> :null}
                     </div>
                     <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                        <input  className="form-control" type="password" onChange = {handleInputs}  name="password" id="" />
                        {
                           errors.password.required  ?<span className="text-danger" >
                            Password is required.
                        </span> :null}
                     </div>
                     <div className="form-group">
          
                     {
                           errors.custom_error  ? <span className="text-danger" >
                           (<p>{errors.custom_error}</p>)
                        </span> :null
                        }
                        <div  className="text-center">
                          {loading ? <div className="spinner-border text-primary " role="status">
                            <span className="sr-only">{loading}</span>
                          </div> :null}
                        </div>
          
                        <input type="submit" className="btn btn-login float-right" disabled={loading}  value="Register"/>
                     </div>
                     <div className="clearfix"></div>
                     <div className="form-group">
                       Already have account ? Please <a href="#">Login</a>
                     </div>
          
          
                     </form>
          
          
                  </div>
          
               </div>
          
          
            </div>
        </section>
    )
}
export default Register;