import { createBrowserRouter, Navigate } from 'react-router-dom'
import Main from '../pages/main'
import Home from '../pages/home'
import Mall from '../pages/mall'
import User from '../pages/user'
import PageOne from '../pages/others/pageOne'
import PageTwo from '../pages/others/pageTwo'
import Login from '../pages/login'

const routes = [
    {
        path: '/',
        Component: Main,
        children: [
            {
                path: '/',
                element: <Navigate to='home' repalace /> // 重定向到home页面
            },
            {
                path: 'home',
                Component: Home
            },
            {
                path: 'mall',
                Component: Mall
            },
            {
                path: 'user',
                Component: User
            },
            {
                path: 'other',
                children: [
                    {
                        path: 'PageOne',
                        Component: PageOne
                    },
                    {
                        path: 'PageTwo',
                        Component: PageTwo
                    }
                ]
            }
        ]
    },
    {
        path: "/login",
        Component: Login
    }
]

export default createBrowserRouter(routes)