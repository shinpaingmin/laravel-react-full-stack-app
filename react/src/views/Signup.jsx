import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
    const [errors, setErrors] = useState({});
    const {setUser, setToken} = useStateContext();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const onSubmit = (e) => {
        e.preventDefault();     //prevent browser refresh
        //payload object
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        // axiosClient.post('/signup', payload)
        //             .then((data)=>{
        //                 console.log(data);
        //             })
        //             .catch(err=>{
        //                 console.log(err);
        //             })
        //             (or)
        const sendPayload = async () => {
            try {
              const data = await axiosClient.post('/signup', payload);    //return promise object
            // console.log(data);
              setUser(data.data.user);  //name & email
              setToken(data.data.token);
            } catch (error) {
              console.log(error);
              if (error.response.status === 422) {
                setErrors(error.response.data.errors)
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
                    Signup for free
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
                <input ref={nameRef} type="text" placeholder="Full Name" />
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                <button className="btn btn-block">Signup</button>
                <p className="message">
                    Already Registered? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Signup
