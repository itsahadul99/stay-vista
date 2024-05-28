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
import AdminRoute from './AdminRoute'
import HostRoute from './HostRoute'
import MyBookings from '../pages/Dashboard/MyBookings/MyBookings'
import ManageBookings from '../pages/Dashboard/ManageBooking/ManageBookings'

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
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute><Statistics /></PrivateRoute>
      },
      // admin route
      {
        path: 'manage-users',
        element: <PrivateRoute><AdminRoute><ManageUsers /></AdminRoute></PrivateRoute>
      },
      // host route
      {
        path: 'add-room',
        element: <PrivateRoute><HostRoute><AddRoom /></HostRoute></PrivateRoute>
      },
      {
        path: 'my-listings',
        element: <PrivateRoute><MyListing /></PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      // guest route
      {
        path: 'myBookings',
        element: <PrivateRoute><MyBookings /></PrivateRoute>
      },
      {
        path: 'manageBookings',
        element: <PrivateRoute><HostRoute><ManageBookings /></HostRoute></PrivateRoute>
      },
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
