import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {io} from "socket.io-client";
import {Button, Menu} from "semantic-ui-react";


export const Chat = () => {

    let user = useSelector(state => state.userReducer.authUser);
    const [usersConnected, setUsersConnected] = useState([])
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(undefined)
    const [chatUser, setChatUser] = useState(undefined)
    const receiveMessage = (msg) => {
        setMessages( previous => [...previous,  msg.mess])
    }

    const receiveUsers = (users) => {
        setUsersConnected(users)

    }

    const changeChatUser= () => {
        setMessages([])
        setChatUser(user)
    }

    useEffect(()=>{
        const URL = 'http://localhost:8011/';
        const socketTmp = io(URL, {
            query: {
                id: user.id
            }
        }, );
        socketTmp.on('receive message', receiveMessage);
        socketTmp.on('reception users', receiveUsers);
        setSocket(socketTmp)
    },[]);


    const refreshUsers = () => {
        console.log(socket)
        socket.emit('refresh users');
    }
    let display_messages = messages.map((message) => <div>{message}</div>)
    let display_users = usersConnected.map((user) => <Menu.Item onClick={changeChatUser(user)} key={user.id}>{user.surName}</Menu.Item>)

    return (
    <div>
        <p>Votre ID unique est : <span id="uniqueId">{user.id}</span></p>
        <Menu   >
            <Menu.Item header>Users</Menu.Item>
            {display_users}
            <Menu.Item position="right">
                <Button type='submit' onClick={refreshUsers}>Refresh</Button>
            </Menu.Item>
        </Menu>
        
        {display_messages}
    </div>
    )
}