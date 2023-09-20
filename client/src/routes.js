const Login = import('./pages/Login')
const Register = import('./pages/Register')
const Home = import('./pages/Home')

export default [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/home",
        element: Home
    }
]