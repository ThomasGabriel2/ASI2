import React, {isValidElement, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {io} from "socket.io-client";
import {Button, Form, Header, Input, Menu} from "semantic-ui-react";


export const Chat = () => {

    let user = useSelector(state => state.userReducer.authUser);
    const [usersConnected, setUsersConnected] = useState([])
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(undefined)
    const [chatUser, setChatUser] = useState(null)
    const [currentMsg, setCurrentMsg] = useState(null)

    const receiveMessage = (msg) => {
        console.log(msg)
        setMessages( previous => [...previous,  msg])

    }

    const receiveUsers = (users) => {
        console.log("Mise à jour des utilisateurs")
        setUsersConnected(users)
        console.log("Done")

    }

    const changeChatUser = (value) => {
        console.log(value)
        let user1 = usersConnected[0];
        for (const user of usersConnected) {
            if (user.id == value) {
                console.log("oui")
                user1 = user
            }
        }
        setMessages([])
        setChatUser(user1)
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
        console.log("Demande de mise à jour des utilisateurs")
        socket.emit('refresh users');
    }

    function processInput(event, { valueData }){
        const target = event.currentTarget;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setCurrentMsg(value);
    }

    function sendMsg() {
        socket.emit('send message', {emet: [user.id, user.surName], mess :currentMsg, dest: chatUser.id})
        setMessages(previous => [...previous, {emet: [user.id, user.surName], mess :currentMsg, dest: chatUser.id}])
    }

    let display_messages = messages.map((message) => <div>{message.emet[1]} : {message.mess}</div>)
    let display_users = usersConnected.map((user) => <Menu.Item onClick={() => changeChatUser(user.id)} key={user.id}>{user.surName}</Menu.Item>)

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
        <div>
            { chatUser ? (
                <div>
                    Vous chattez avec {chatUser.surName}
                </div>
            ) : (
                <div>
                    Veuillez sélectionner un utilisateur pour chatter
                </div>
                )
            }
            <Form>

            <Form.Field>
                <Form.Input placeholder="Message" onChange={processInput} name="message" value={currentMsg}/>
            </Form.Field>

            <Button type='submit' onClick={sendMsg}>Submit</Button>
        </Form>
        </div>



        
        {display_messages}
    </div>
    )
}