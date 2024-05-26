import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import AddRoom from '../pages/Dashboard/AddRoom/AddRoom'
import Statistics from '../pages/Dashboard/Statistics/Statistics'
import MyListing from '../pages/Dashboard/MyListing/MyListing'
import Profile from '../pages/Profile/Profile'
import ManageUsers from '../pages/Dashboard/ManageUser/ManageUsers'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <PrivateRoute><RoomDetails /></PrivateRoute>,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Statistics />
      },
      {
        path: 'add-room',
        element: <AddRoom />
      },
      {
        path: 'manage-users',
        element: <ManageUsers />
      },
      {
        path: 'my-listings',
        element: <MyListing />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
