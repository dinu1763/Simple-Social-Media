import { useContext, useState } from "react";
import {
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,

} from '@chakra-ui/react'
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

let initData = {
    name: '',
    email:'',
    bio:'',
}

export const AddUser = () => {
    const [form, setForm] = useState(initData);
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleAddUser = () => {
        if(!form.name || !form.email || !userId) {
            alert('Invalid Operation fill all required fields');
            return;
        }
        let payload = {
            name: form.name,
            email: form.email,
            bio: form.bio
        }

        fetch('https://adobe-backend-5yry.onrender.com/users', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            if(data.status === 'failed'){
                console.log('failed');
                return;
            } else {
                navigate(`/users/${data._id}`)
            }
        }).catch(err => {console.log(err.message);})
    }

    return <ModalContent>
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton/>
        <ModalBody pb={6}>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input name="name" placeholder="Name" onChange={handleFormChange} />
            </FormControl>

             <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input name="email" placeholder="Email" onChange={handleFormChange} />
            </FormControl>

             <FormControl mt={4}>
                <FormLabel>Bio</FormLabel>
                <Input name="bio" placeholder="Bio" onChange={handleFormChange} />
            </FormControl>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddUser}>
                Save
            </Button>
        </ModalFooter>
    </ModalContent>
}