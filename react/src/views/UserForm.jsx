/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const UserForm = () => {
  const {setNotification} = useStateContext();
  const navigate = useNavigate();
  const {id} = useParams();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    // id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  if(id){
    const fetchUser = async()=> {
      setLoading(true);
      try{
        const data = await axiosClient.get(`/users/${id}`)
        console.log(data);
        setUser(data.data);
        // console.log(user);
      }
      catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    useEffect(()=>{
      fetchUser();
    },[])

  }

  const submit = (e) => {
    e.preventDefault();
    if(user.id) {     //update
      const updateUser = async ()=>{
        try {
          await axiosClient.put(`/users/${user.id}`, user);

           //To show updated successfully notification
          setNotification("User was successfully updated");
          navigate('/users');

        } catch (error) {
          console.log(error);
          if (error.response.status === 422) {
            setErrors(error.response.data.errors)
          }
        }
      }
      updateUser();
    } else{     //create
      const createUser = async ()=>{
        try {
          await axiosClient.post(`/users`, user);
          // console.log(user);

           //To show created successfully notification
           setNotification("User was successfully created");

          navigate('/users');
        } catch (error) {
          console.log(error);
          if (error.response.status === 422) {
            setErrors(error.response.data.errors)
          }
        }
      }
      createUser();
    }
  }
  return (
    <div>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">Loading ...</div>
        )}
        {
          JSON.stringify(errors) !== "{}" ?
          <div className="alert">
            {Object.keys(errors).map((item, index)=>(
              <p key={index}>{errors[item][0]}</p>
            ))}
          </div>
          : <div style={{"display":"none"}}></div>
        }
        {
          !loading &&
          <form onSubmit={submit}>
            <input value={user.name} onChange={ev=>setUser({...user,name: ev.target.value})} type="text" placeholder="Name" />
            <input value={user.email} onChange={ev=>setUser({...user,email: ev.target.value})} type="email" placeholder="Email" />
            <input onChange={ev=>setUser({...user,password: ev.target.value})} type="password" placeholder="Password" />
            <input onChange={ev=>setUser({...user,password_confirmation: ev.target.value})} type="password" placeholder="Confirm Password" />
            <button className="btn">Save</button>
          </form>
        }
      </div>
    </div>
  )
}

export default UserForm
