import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {io} from "socket.io-client";
import {Button, Menu} from "semantic-ui-react";


export const Chat = () => {

    let user = useSelector(state => state.userReducer.authUser);
    const [usersConnected, setUsersConnected] = useState([])
    const [messages, setMessages] = useState([])
    const receiveMessage = (msg) => {
        setMessages( messages + msg.mess)
    }

    const receiveUsers = (users) => {
        setUsersConnected(users)
        console.log(users)

    }

    const URL = 'http://localhost:8011/';
    const socket = io(URL, {
        query: {
            id: user.id
        }
    }, );
    console.log(socket)
    socket.on('receive message', receiveMessage)
    socket.on('reception users', receiveUsers)



    const refreshUsers = () => {
        console.log(socket)
        socket.emit('refresh users');
    }

    refreshUsers()
    let display_messages = messages.map((message) => <div>{message}</div>)
    let display_users = usersConnected.map((user) => <Menu.Item key={user.id}>user.surName</Menu.Item>)

    return (
    <div>
        <p>Votre ID unique est : <span id="uniqueId">{user.id}</span></p>
        <Menu vertical fixed="right">
            <Menu.Item header>Users</Menu.Item>
            {display_users}
            <Menu.Item position={bottom}>
                <Button type='submit' onClick={refreshUsers}>Submit</Button>
            </Menu.Item>

        </Menu>

        {display_messages}
    </div>
    )
}