import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();

  //get users
  const fetchUsers = async()=>{
    setLoading(true);
    try {
      const data = await axiosClient.get('/users');
      console.log(data);
      setUsers(data.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchUsers();
  }, [])

  const onDelete = (u) => {
    if(!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete(`/users/${u.id}`)
        .then(()=>{

          // getUsers()
          fetchUsers();

          //delete notification
          setNotification('User was successfully deleted');
        })
  }
  return (
    <div>
      <div style={{'display':'flex', 'justifyContent':'space-between', 'alignItems':'center'}}>
        <h1>Users</h1>
        <Link to='/users/new' className="btn-add">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {
            loading === true?
            <tbody>
              <tr>
                <td colSpan='5' className="text-center">
                  Loading
                </td>
              </tr>
            </tbody>
            :
            <tbody>
            {
              users.map(u=>(
                <tr key={u}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
                    &nbsp;
                    <button onClick={()=>onDelete(u)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
          }

        </table>
      </div>
    </div>
  )
}

export default Users
