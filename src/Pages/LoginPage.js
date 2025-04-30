import './LoginPage.css'
import { useState} from 'react';


export default function LoginPage () {
   
    const initialStateErrors = {email:{required :false},
   
 password : {required :false},
 custom_error : null 

};
  const [errors,setErrors]=useState(initialStateErrors);

  const[loading,setLoading]= useState (false);





    return (
        <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Login Now</h2>
                        <form className="login-form" action="">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                            <input type="email"  className="form-control" name="email"  id="" placeholder="email"  />
                            {
                           errors.email.required ? <span className="text-danger" >
                            email is required.
                        </span>:null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                            <input  className="form-control" type="password"  name="password" placeholder="password" id="" />
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
                            <input  type="submit" className="btn btn-login float-right"  value="Login"/>
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Create new account ? Please <a  href="javascript:void(0);">Register</a>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}