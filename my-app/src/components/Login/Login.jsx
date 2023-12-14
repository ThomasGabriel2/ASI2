import { useState } from 'react';
import { Form, Header,Button } from 'semantic-ui-react'
import axios from "axios";

export const Login = () =>{
    const [currentUser,setCurrentUser]= useState({
        login:"",
        pwd:"",
    });

    async function submitOrder(data) {
        try {
            const response = await axios.post('http://tp.cpe.fr:8083/auth', {
                username: currentUser.login,
                password: currentUser.pwd,
            });
            console.log("Autghentification réussie ID :", response.data)
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
