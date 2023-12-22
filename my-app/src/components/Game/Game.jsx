import React, {isValidElement, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {io} from "socket.io-client";
import {Button, Form, Header, Input, Menu} from "semantic-ui-react";
import {Board} from "../Board/Board.jsx";
import {Deck} from "../Deck/Deck.jsx";
import axios from "axios";


export const Game = () => {

    let user = useSelector(state => state.userReducer.authUser);
    const [usersConnected, setUsersConnected] = useState([])
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(undefined)
    const [chatUser, setChatUser] = useState(null)
    const [currentMsg, setCurrentMsg] = useState("")
    const [partyState, setPartyState] = useState("En attente d'invitation")
    const [gameUser, setGameUser] = useState(null)
    const [deckCards, setDeckCards] = useState([])
    const [boardCards, setBoardCards] = useState([[],[]])

    useEffect(()=>{
        const URL = 'http://localhost:8011/';
        const socketTmp = io(URL, {
            query: {
                id: user.id
            }
        }, );
        socketTmp.on('receive message', receiveMessage);
        socketTmp.on('reception users', receiveUsers);
        socketTmp.on('receive invitation', receiveInvitation);
        socketTmp.on('invit rep', receiveInvitationResponse);
        socketTmp.on('give cards', getCards)
        socketTmp.emit('refresh users')
        setSocket(socketTmp)

    },[]);

    const receiveMessage = (msg) => {
        console.log(msg)
        setMessages( previous => [...previous,  msg])

    }

    const receiveUsers = (users) => {
        console.log("Mise à jour des utilisateurs")
        setUsersConnected(users)
        console.log("Done")

    }
    const receiveInvitation = (invitation) => {
        console.log(invitation)
        setGameUser(invitation.user2)
        setPartyState("Invitation reçue")
        console.log("Invitation reçue de", invitation.user2)
    }
    const receiveInvitationResponse = (reponse) => {
        console.log(reponse)
        if (reponse.ans) {
            setPartyState("Partie en cours")
            fetchBeginCards()
        } else {
            setPartyState("En attente d'invitation")
        }
    }

    const getCards = (cards) => {
        setDeckCards(cards)
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
        socket.emit('send message', {emet: [user.id, user.surName], mess:currentMsg, dest: chatUser.id})
        setMessages(previous => [...previous, {emet: [user.id, "moi"], mess:currentMsg, dest: chatUser.id}])
    }

    function  sendInvitation() {
        socket.emit('send message', {emet: [user.id, user.surName], mess: null, dest: chatUser.id})
        console.log("Invitaion envoyée à", chatUser)
        setGameUser(chatUser)
        setPartyState("Invitation envoyée")
    }
    function sendResponse(reponse) {
        socket.emit('invitation response', {answer: reponse, dest: [gameUser.id, gameUser.surName], emet: user});
        if (reponse) {
            setPartyState("Partie en cours")
            fetchBeginCards()
        } else {
            setPartyState("En attente d'invitation")
        }
    }

    const fetchCard = async (cardId) => {
        try {
            const response = await axios.get(`http://localhost:8083/card/${cardId}`);
            console.log(response.data)
            return response.data;

        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des données:', error);
        }
    };

    const fetchBeginCards = async () => {
        if (user !== null) {
            setDeckCards( await Promise.all(user.cardList.map(cardId => fetchCard(cardId))));
        }
    }

    function loadDisplayGame() {
        let display = <div></div>;
        switch (partyState) {
            case "En attente d'invitation" :
                display = <div>
                <Button type='submit' onClick={sendInvitation}>Inviter ce joueur à jouer ! </Button>
                </div>;
                break;
            case "Invitation envoyée":

                display = <div>
                    <Button type='submit' onClick={sendInvitation}>Inviter ce joueur à jouer ! </Button>
                    Invitation envoyée à {gameUser.surName}
                </div>;
                break;
            case "Invitation reçue":
                display = <div>
                    Invitation reçue de {gameUser.surName}
                    <Button type={"button"} onClick={() => sendResponse(true)}>Accepter</Button>
                    <Button type={"button"} onClick={() => sendResponse(false)}>Refuser</Button>
                </div>
                break;
            case "Partie en cours":
                display =<div>
                    <div>Partie en cours</div>
                </div>
                break;
        }

        return display;
    }

    let display_messages = messages.map((message) => <div>{message.emet[1]} : {message.mess}</div>)
    let display_users = usersConnected.map((user) => <Menu.Item onClick={() => changeChatUser(user.id)} key={user.id}>{user.surName}</Menu.Item>)
    let displayGame = loadDisplayGame()

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
                <Button type='submit' onClick={sendMsg}>Envoyer le message</Button>
            </Form>

        </div>
        <div>
            {display_messages}
        </div>
        <div>
            {displayGame}
        </div>
        <Board cards={boardCards}></Board>
        <Deck cards={deckCards}></Deck>

        

    </div>
    )
}