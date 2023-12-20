import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {io} from "socket.io-client";
import {Button} from "semantic-ui-react";


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


    let display_messages = messages.map((message) => <div>{message}</div>)
    let display_users = usersConnected.map((user) => <li>{user}</li>)

    return (
    <div>
        <p>Votre ID unique est : <span id="uniqueId">{user.id}</span></p>
        <div>
            <div id="connectedUsers">
                <h2>Users connected:</h2>
                <ul id="users">
                    {display_users}
                </ul>
                <Button type='submit' onClick={refreshUsers}>Submit</Button>
            </div>
        </div>
        {display_messages}
    </div>
    )
}