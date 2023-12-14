import React from "react";
import {Dropdown, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {update_auth_user} from "../../slices/userSlice.jsx";

export const Navbar = () => {
    let user = useSelector(state => state.userReducer.authUser);
    const dispatch = useDispatch();
    const disconnect = () => {
        dispatch(update_auth_user(null))
    }

    return (
        <Menu>
            <Menu.Item>
                <NavLink to="/" name={"navbar"}>Home</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/store" name={"navbar"}>Magasin</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/inventory" name={"navbar"}>Inventaire</NavLink>
            </Menu.Item>
            <Menu.Menu position="right">
                {user ? (
                    <Dropdown item text={`Bienvenue, ${user.surname}`}>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <NavLink to="/profile">Profil</NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={disconnect}>
                                Se déconnecter
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <>
                        <Menu.Item>
                            <NavLink to="/signup" name={"navbar"}>S'enregistrer</NavLink>
                        </Menu.Item>
                        <Menu.Item>
                            <NavLink to="/login" name={"navbar"}>S'identifier</NavLink>
                        </Menu.Item>
                    </>
                )}
            </Menu.Menu>
        </Menu>
    )
}