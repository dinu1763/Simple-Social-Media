import { Button, Heading,  Modal, ModalOverlay } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams  } from "react-router-dom";
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

export const PostDetails = () => {
    const {id} = useParams();
    const [postData, setPostData] = useState([]);
    const [form, setForm] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);

    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

        const getPostDetails = () => {
        fetch(`https://adobe-backend-5yry.onrender.com/posts/${id}`)
        .then(res => res.json())
            .then((data) => {
                setPostData(data)
                setForm(data)
            })
            .catch(err => console.log(err.message));
    }

    const handleFormChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

        const handleEditPost = () => {
        if(!form.content ||!userId) {
            alert('Invalid Opertion (Fill all required fields)')
            return;
        }

        let payload = {
            user_id: userId,
            content: form.content,
        }

        fetch(`https://adobe-backend-5yry.onrender.com/posts/${id}`, {
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
                setForm(data)
                setPostData(data)
                navigate(`/`)
            }
        }).catch(err => { console.log(err.message) });
    }

    useEffect(() => {
        getPostDetails()
        console.log(postData);
    }, []);

    return <div className="post-details-container">
                <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Content</FormLabel>
                        <Input name="content" placeholder='Content' value={form.content} onChange={handleFormChange} />
                    </FormControl>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleEditPost}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <div className="post-basic-details-container">
            <h1>Post Created Sucessfully.</h1>
            <br/>
            <Heading as='h1' >{postData.content}</Heading>
        </div>
            <Button mt={'10'} onClick={() => navigate('/')}>Go Home</Button>
    </div>
}