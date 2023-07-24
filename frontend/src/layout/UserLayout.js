import { Outlet, Navigate } from 'react-router-dom';

export default function UserLayout() {
    const sessionToken = localStorage.getItem('sessionToken')
    
    if (sessionToken) {
        return (
            <Outlet />            
        )
    } else {
        return <Navigate to="/" replace={true} />
    }
}