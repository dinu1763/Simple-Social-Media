import { Avatar, Button, Heading, Modal, ModalOverlay } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import {
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { AuthContext } from "../context/AuthContext";

export const UserDetails = () => {
    const {id} = useParams();
    const [userData, setUserData] = useState();
    const [form, setForm] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);

    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const getUserDetails = () => {
        fetch(`https://adobe-backend-5yry.onrender.com/users/${id}`)
        .then(res => res.json())
            .then((data) => {
                setUserData(data)
                setForm(data)
            })
            .catch(err => console.log(err.message));
    }

    const handleFormChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleDeleteUser = (_id) => {
        fetch(`https://adobe-backend-5yry.onrender.com/users/${_id}`, {
            method:'DELETE'
        }).then(res => res.json())
        .then(data => {
            getUserDetails();
            navigate('/users')
        }).catch(err => {console.log(err.message);})
    }

    const handleEditUser = () => {
        if(!form.name || !form.email ||!userId) {
            alert('Invalid Opertion (Fill all required fields)')
            return;
        }

        let payload = {
            name: form.name,
            email: form.email,
            bio: form.bio
        }

        fetch(`https://adobe-backend-5yry.onrender.com/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            if(data.status === 'failed') {
                console.log('failed');
                return;
            }else{
                getUserDetails();
                navigate(`/users`)
            }
        }).catch(err => { console.log(err.message) });
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return !userData ? <h1>Invalid User Id</h1> : <div className="user-details-container">
        <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit User</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input name="name" placeholder='Name' value={form.name} onChange={handleFormChange} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Email' value={form.email} name='email' onChange={handleFormChange} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Bio</FormLabel>
                        <Input placeholder='Bio' value={form.bio} name='bio' onChange={handleFormChange} />
                    </FormControl>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleEditUser}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <div className="user-basic-details-container">
            <Avatar
                borderRadius='full'
                boxSize='150px'
                alt={userData.name}
            />
            <Heading as='h1' >{userData.name}</Heading>
            <Heading size='sm'>Email: {userData.email}</Heading>
            <Heading size='sm'>Bio: {userData.bio}</Heading>
            <Button onClick={() => setShowEditModal(true)}>Edit Details</Button>
            <Button m={'5'} color={'red'} onClick={() => handleDeleteUser(userData._id)}>Delete User</Button>
        </div>
        <Button mt={'50'} onClick={() => {navigate(`/users/`)}}>Back</Button>
    </div>
}