import { useState } from 'react';
import { Form, Header,Button } from 'semantic-ui-react'
import axios from "axios";
import { useDispatch} from "react-redux";
import {update_auth_user} from "../../slices/userSlice.jsx";
import {useNavigate} from "react-router-dom";


export const Login = () =>{
    const [currentUser,setCurrentUser]= useState({
        login:"",
        pwd:"",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchUser(id){
        try {
            const response = await axios.get(`http://localhost:8083/user/${id}`)
            return response.data
        } catch (error) {
            console.error("Utilisateur introuvable")
        }
    }

    async function submitOrder(data) {
        try {
            const response = await axios.post('http://localhost:8083/auth', {
                username: currentUser.login,
                password: currentUser.pwd,
            });
            console.log("Autghentification réussie ID :", response.data)
            const user = await fetchUser(response.data)
            dispatch(update_auth_user(user))
            console.log(user)
            navigate("/")
        } catch (error) {
            console.error("Authentifcation échouée");
        }
    }

    function processInput(event, { valueData }){
        const target = event.currentTarget;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setCurrentUser({...currentUser, [name]: value});
    }



    return (
        <Form>
            <Header as='h4' dividing>
                User Login
            </Header>
            <Form.Field>
                <Form.Input label="Login" placeholder="Login" onChange={processInput} name="login" value={currentUser.login}/>
            </Form.Field>
            <Form.Field>
                <Form.Input type="password" label="Pwd"  placeholder="Password" onChange={processInput} name="pwd" value={currentUser.pwd}/>
            </Form.Field>
            <Button type='submit' onClick={submitOrder}>Submit</Button>
        </Form>

    );

}
