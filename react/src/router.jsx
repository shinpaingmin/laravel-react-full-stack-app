import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Users from './views/Users';
import NotFound from './views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Dashboard from './views/Dashboard';
import UserForm from './views/UserForm';

const router = createBrowserRouter([
    //Default Layout
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',  //default route
                element: <Navigate to="/users"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/users/new',
                element: <UserForm key='create'/>
            },
            {
                path: '/users/:id',
                element: <UserForm key='update'/>
            }
        ]
    },
    //Guest Layout
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;
