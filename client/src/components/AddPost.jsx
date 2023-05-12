import { useContext, useState, React, useRef, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useDisclosure,
  ModalCloseButton,
  Card, CardHeader, CardBody, CardFooter, Flex, Avatar,Box, Text, IconButton

} from '@chakra-ui/react'
import { EditIcon, DeleteIcon} from '@chakra-ui/icons'
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import './addPost.css';

let initData = {
    content: '',
    likes: 0
}

export const AddPost = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [postData, setPostData] = useState([])
    const [form, setForm] = useState([initData]);
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const getAllPosts = () => {
        fetch(`https://adobe-backend-5yry.onrender.com/posts`)
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

    const handleLike = (id) => {
        fetch(`https://adobe-backend-5yry.onrender.com/posts/${id}/like`, {
            method: 'POST', 
        }).then(res => res.json())
        .then(data => {
            getAllPosts()
            setForm(data);
        }).catch(err => {console.log(err.message)});
    }

    const handleDislike = (id) => {
        fetch(`https://adobe-backend-5yry.onrender.com/posts/${id}/unlike`, {
            method: 'POST', 
        }).then(res => res.json())
        .then(data => {
            getAllPosts()
            setForm(data);
        }).catch(err => {console.log(err.message)});
    }

    const handleDeletePost = (id) => {
        fetch(`https://adobe-backend-5yry.onrender.com/posts/${id}`, {
        method: 'DELETE', 
        }).then(res => res.json())
        .then(data => {
            getAllPosts()
            setForm(data);
        }).catch(err => {console.log(err.message)});
    }

    const handleAddPost = () => {
            if(!form.content || !userId){
                alert('Invalid Opertion (Fill all required fields)')
                return;
            }
            let payload = {
                content: form.content,
                user_id: userId
            }

            fetch('https://adobe-backend-5yry.onrender.com/posts', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type':'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                    if (data.status === 'failed') {
                        console.log('failed');
                        return;
                    } else {
                        console.log(data);
                        setForm({ ...data, data })
                        navigate(`/posts/${data._id}`);
                    }
                }).catch(err => { console.log(err.message) });
    }
    useEffect(() => {
        getAllPosts();
        console.log(postData);
    }, [postData.likes]);

  return (
        <>
        <br />
      <Button backgroundColor={"green.500"} onClick={onOpen}>Create Post</Button>
      <br/>
      <br/>
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create your social media post</ModalHeader>
            <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Content</FormLabel>
                        <Input name="content" ref={initialRef} placeholder='Type your Content' onChange={handleFormChange} />
                    </FormControl>
                </ModalBody>

            <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleAddPost}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>

        {postData?.map((data) => (
            <Card className="card" maxW='md' key={data._id}>
            <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar
                        borderRadius='full'
                        boxSize='45px'
                        alt={'User'}
                    />
                    <Box>
                    <Heading size='xs'>Users</Heading>
                    </Box>
                </Flex>

                <IconButton
                    onClick={() => handleDeletePost(data._id)}
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='See menu'
                    icon={<DeleteIcon />} 
                />
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                <strong>{data.content}</strong>
                </Text>
            </CardBody>


            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                '& > button': {
                    minW: '136px',
                },
                }}
            >
                <Button flex='1' variant='ghost' onClick={() => handleLike(data._id)}>
                Like
                </Button>
                <span>{data.likes}</span>
                <Button flex='1' variant='ghost' onClick={() => handleDislike(data._id)}>
                Dislike
                </Button>

            </CardFooter>
            </Card>
            ))}
    </>
  )
}

