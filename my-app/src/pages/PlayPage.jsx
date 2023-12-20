import {Chat} from "../components/Chat/Chat.jsx";
import {Container} from "semantic-ui-react";
import React from "react";
import {useSelector} from "react-redux";

export const PlayPage = () => {
    let user = useSelector(state => state.userReducer.authUser);
    return (
        <div>
        {user ? (
                <Chat/>
            ) : (
                <div>
                    Vous devez vous connecter pour jouer.
                </div>

            )
        }
        </div>
    )
}