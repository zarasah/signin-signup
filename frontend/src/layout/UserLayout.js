import { Outlet, Navigate } from 'react-router-dom';

export default function UserLayout() {
    const jwt = localStorage.getItem('jwt')
    
    if (jwt) {
        return (
            <Outlet />            
        )
    } else {
        return <Navigate to="/" replace={true} />
    }
}