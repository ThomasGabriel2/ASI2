package com.cpe.springboot.user.model;

import com.cpe.springboot.card.model.CardModel;
import com.sun.net.httpserver.Authenticator;

import java.util.HashSet;
import java.util.Set;


public class UserDTOFlag {
    private Flag flag;

    private Action action;
    private UserDTO userDTO;
    public UserDTOFlag(Flag flag, Action action, UserDTO user) {
        this.flag=flag;
        this.userDTO=user;
        this.action=action;
    }

    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public Flag getFlag() {
        return flag;
    }

    public void setFlag(Flag flag) {
        this.flag = flag;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }
}

