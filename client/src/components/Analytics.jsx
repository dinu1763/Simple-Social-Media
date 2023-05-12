import { Avatar, Button, Heading, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Flex, Box} from '@chakra-ui/react'
import { AuthContext } from "../context/AuthContext";

export const Analytics = () => {

    const { userId } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);

    const handleTotalUser = () => {
    fetch('https://adobe-backend-5yry.onrender.com/analytics/users')
    .then(res => res.json())
        .then((data) => {
            console.log(data);
                setUserData(data)
        })
        .catch(err => console.log(err.message));
};

    const handleTopUser = () => {
    fetch('https://adobe-backend-5yry.onrender.com/analytics/users/top-active')
    .then(res => res.json())
        .then((data) => {
            console.log(data);
                setUserData(data)
        })
        .catch(err => console.log(err.message));
};

    const handleTotalPost = () => {
    fetch('https://adobe-backend-5yry.onrender.com/analytics/posts')
    .then(res => res.json())
        .then((data) => {
            console.log(data);
                setUserData(data)
        })
        .catch(err => console.log(err.message));
    }

    const handleTopPost = () => {
    fetch('https://adobe-backend-5yry.onrender.com/analytics/posts/top-liked')
    .then(res => res.json())
        .then((data) => {
            console.log(data);
                setUserData(data)
        })
        .catch(err => console.log(err.message));
    }

useEffect(() => {
}, [setUserData])

    return <div style={{margin:20}} className="analytics">
        <Button onClick={handleTotalUser} m={'5'}>Total User Analytics</Button>
        <Button onClick={handleTopUser} m={'5'}>Top User Analytics</Button>
        <Button onClick={handleTotalPost} m={'5'}>Total Post Analytics</Button>
        <Button onClick={handleTopPost} m={'5'}>Top Post Analytics</Button>

        {userData.totalUsers && <Heading as='h1' >Total Users : {userData.totalUsers}</Heading>}
        
        {userData.count && <Heading as='h1' >Total Number of Posts : {userData.count}</Heading>}

        {!userData.totalUsers && !userData.count && !userData[0]?.user_id &&<> <SimpleGrid spacing={4} ml={'20'} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {userData?.map((data) => (
                <Card key={data._id}>
                    <CardHeader>
                    <Heading size='md'> {data.name}</Heading>
                    </CardHeader>
                    <CardBody>
                    <Text>{data.email}</Text>
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card>
         ))} 
        </SimpleGrid></>}

        {userData[0]?.user_id && userData.map((data) => (
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
                <Text>
                <strong>Total Likes: {data.likes}</strong>
                </Text>
            </CardFooter>
            </Card>
            ))}
    </div>
}