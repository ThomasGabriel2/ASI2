import React from "react";
import {Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

export const Navbar = () => {
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
            <Menu.Item>
                <NavLink to="/signup" name={"navbar"}>S'enregistrer</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/login" name={"navbar"}>S'identifier</NavLink>
            </Menu.Item>
        </Menu>
    )
}