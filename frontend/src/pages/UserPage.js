import { useNavigate } from 'react-router-dom';

export default function UserPage() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    function handleClick() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        navigate('/');
    }
    
    return (
        <div>
            <h1>Hello, {username}</h1>
            <button onClick={handleClick}>Log out</button>
        </div>
    )
}