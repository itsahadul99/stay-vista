
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const HostRoute = ({children}) => {
    const [role, isLoading] = useRole()
    if (isLoading) return <LoadingSpinner />
    if (role === 'host') return children;
    <Navigate to='/dashboard'></Navigate>
};

export default HostRoute;