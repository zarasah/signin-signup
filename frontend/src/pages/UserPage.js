import { useNavigate } from 'react-router-dom';
import logout from '../api/logout';

export default function UserPage() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    function handleClick() {
        const sessionToken = localStorage.getItem('sessionToken')
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        logout(sessionToken);
        navigate('/');
    }
    
    return (
        <div>
            <h1>Hello, {username}</h1>
            <button onClick={handleClick}>Log out</button>
        </div>
    )
}