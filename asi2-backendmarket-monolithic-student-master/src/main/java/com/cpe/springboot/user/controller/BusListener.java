package com.cpe.springboot.user.controller;

import com.cpe.springboot.user.model.Action;
import com.cpe.springboot.user.model.UserDTOFlag;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.TextMessage;
import java.io.IOException;
@Component
public class BusListener {
    @Autowired
    JmsTemplate jmsTemplate;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    UserService userService;

    private void doReceive(TextMessage message) {
        try {
            String clazz = message.getStringProperty("ObjectType");
            Object o = objectMapper.readValue(message.getText(), Class.forName(clazz));
            System.out.println(o);
            if (o instanceof UserDTOFlag) {
                UserDTOFlag user = (UserDTOFlag) o;
                if (user.getAction()== Action.ADD){userService.addUserDb(user);
                System.out.println("auuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");}
                else if (user.getAction()== Action.UPDATE){userService.updateUserDB(user);}
            }
            else if (o instanceof String){
                userService.deleteUserDB((String)o);
            }

            System.out.println("[BUSLISTENER] [CHANNEL RESULT_BUS_MNG] RECEIVED String MSG=["+message.getText()+"]");
        } catch (IOException | JMSException | ClassNotFoundException  e) {
            throw new RuntimeException(e);
        }
    }

    @JmsListener(destination = "RESULT_BUS_MNG", containerFactory = "queueConnectionFactory")
    public void receiveMessageResult(TextMessage message) {
        doReceive(message);
    }



}


