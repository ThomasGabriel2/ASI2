package com.cpe.springboot.user.controller;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserDTOFlag;
import com.cpe.springboot.user.model.UserModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import javax.jms.TextMessage;

@Service
public class BusEmitter<T> {
    @Autowired
    JmsTemplate jmsTemplate;
    @Autowired
    ObjectMapper objectMapper;
    @Value("${spring.activemq.name}")
    private String activeMQBusName;

    private T nature;

    private void sendUser(UserDTOFlag user) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+user+"] to Bus=["+activeMQBusName+"]");

        jmsTemplate.send(activeMQBusName, s -> {
            try {
                TextMessage msg = s.createTextMessage(objectMapper.writeValueAsString(user));
                msg.setStringProperty("Content-Type", "application/json");
                msg.setStringProperty("ObjectType", user.getClass().getCanonicalName());
                return msg;
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });}

    private void sendId(String id) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+id+"] to Bus=["+activeMQBusName+"]");

        jmsTemplate.send(activeMQBusName, s -> {
            try {
                TextMessage msg = s.createTextMessage(objectMapper.writeValueAsString(id));
                msg.setStringProperty("Content-Type", "application/json");
                msg.setStringProperty("ObjectType", id.getClass().getCanonicalName());
                return msg;
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        });}

    public void sendMsg(T objet){
        if (objet instanceof UserDTOFlag){sendUser((UserDTOFlag) objet);}
        else if (objet instanceof String){sendId((String) objet);}
    }
}
