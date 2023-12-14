import { useState } from 'react';
import { Form, Header,Button } from 'semantic-ui-react'
import axios from "axios";

export const Signup = () =>{
    const [currentUser,setCurrentUser]= useState({
        login:"",
        pwd:"",
        lastname:"",
        surname:"",
        email:"",
    });

    async function submitOrder() {
        try {
            const response = await axios.post('http://tp.cpe.fr:8083/user', {
                login: currentUser.login,
                pwd: currentUser.pwd,
                surName: currentUser.surname,
                lastName: currentUser.lastname,
                email: currentUser.email
            });
            console.log("Utilisateur ajouté:", response.data)
        } catch (error) {
            console.error("L'utilisateur n'a pas pu être créé");
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
            <Form.Field>
                <Form.Input label="Surname" placeholder="Surname" onChange={processInput} name="surname" value={currentUser.surname} />
            </Form.Field>
            <Form.Field>
                <Form.Input label="Lastname" placeholder="Lastname" onChange={processInput} name="lastname" value={currentUser.lastname} />
            </Form.Field>
            <Form.Field>
                <Form.Input type="email" label="Email" placeholder="Email" onChange={processInput} name="email" value={currentUser.email} />
            </Form.Field>
            <Button type='submit' onClick={submitOrder}>Submit</Button>
        </Form>

    );

}
