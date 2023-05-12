import { Avatar, Button, IconButton, Table, TableCaption, Tbody, Td, Th, Thead, Tr, Modal, ModalOverlay } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import './home.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { AddUser } from "./AddUser";


export const Home = () => {

    const [userData, setUserData] = useState([]);
    const [showAddUserModal, setShowAddUserModal] = useState(false); 

    const { userId } = useContext(AuthContext);

    const navigate = useNavigate();

    const getUserData = () => {
        fetch(`https://adobe-backend-5yry.onrender.com/users`)
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(err => console.log(err.message));
    }

    useEffect(() => {
        if(userId){
            getUserData()
        }
    }, [userId]);

    const closeAddUserModal = () => {
        setShowAddUserModal(false)
    }

    return !userId? <h1>Loading...</h1> : <div className="home-container">
        <Modal isOpen={showAddUserModal} onClose={closeAddUserModal}>
            <ModalOverlay/>
            <AddUser />
        </Modal>

        <div className="filter-sort-container">
            <span><Button mt={'10'} backgroundColor={'green.300'} onClick={() => setShowAddUserModal(true)}>Add New User</Button> </span>
            <Button mt={'10'} color={'black'} backgroundColor={'peachpuff'} onClick={() => navigate('/')}>Home</Button>
        </div>

        <Table variant='simple'>
            <TableCaption placement="top" >Users Data</TableCaption>

            <Thead>
                <Tr>
                    <Th>Display Picture</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Bio</Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                    userData.length === 0 ? <Tr><Td>No Data Found</Td></Tr> :
                        userData.map(user => <Tr key={user._id} className="user-table-row" onClick={() => navigate(`/users/${user._id}`)}>
                            <Td><Avatar src={''} name={user.name} /></Td>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.bio}</Td>
                            <Td> <IconButton
                                onClick={() => {navigate(`/users/${user._id}`)}}
                                variant='ghost'
                                colorScheme='gray'
                                aria-label='See menu'
                                icon={<ExternalLinkIcon />} 
                            /></Td>
                        </Tr>)
                }
            </Tbody>

        </Table>
    </div>
}