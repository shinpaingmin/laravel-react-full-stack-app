import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
  const [errors, setErrors] = useState({});
    const {setUser, setToken} = useStateContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    const onSubmit = (e) => {
        e.preventDefault();
        //payload object
        const payload = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }

        const sendPayload = async () => {
          try {
            const data = await axiosClient.post('/login', payload);    //return promise object
              console.log(data);
              setUser(data.data.user);  //name & email
              setToken(data.data.token);
          } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
              if(error.response.data.errors) {
                setErrors(error.response.data.errors)
              } else {
                setErrors({
                  email: [error.response.data.message]
                });
              }
            }
          }
      }
      sendPayload();
    }
  return (
    <div className="login-signup-form animated fadeInDown">
        <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className="title">
                    Login into your account
                </h1>
                {
                  JSON.stringify(errors) !== "{}" ?
                  <div className="alert">
                    {Object.keys(errors).map((item, index)=>(
                      <p key={index}>{errors[item][0]}</p>
                    ))}
                  </div>
                  : <div style={{"display":"none"}}></div>
                }
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <button className="btn btn-block">Login</button>
                <p className="message">
                    Not Registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Login
