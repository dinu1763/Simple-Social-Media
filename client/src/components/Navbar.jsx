import { Avatar, Button, Menu, MenuButton } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './navbar.css'

export const Navbar = () => {
    const { userId } = useContext(AuthContext);
    const [userName, setUserName] = useState('Kelcie Gerlack');
    const navigate = useNavigate();

    const fetchUserDetails = () => {
        fetch(`https://adobe-backend-5yry.onrender.com/users/${userId}`)
        .then(res => res.json())
        .then(data => {
            setUserName(data.name);
        })
    }

    useEffect(() => {
        console.log(userId);
        if(userId) {
            fetchUserDetails();
        }
    }, [userId])

    return <div className="navbar-container">
        <Link to='/'>Simple Social Media</Link>
    {
        <Menu>
                <MenuButton ml={'900'}>
                    <Avatar name={userName} size='sm' mr='10px' />
                    {userName}
                </MenuButton>
        </Menu>
    }
        
    </div>
}