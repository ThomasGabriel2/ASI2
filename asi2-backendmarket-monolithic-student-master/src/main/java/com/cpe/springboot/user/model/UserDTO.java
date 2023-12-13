package com.cpe.springboot.user.model;

import com.cpe.springboot.card.model.CardModel;

import java.util.HashSet;
import java.util.Set;

public class UserDTO {

	private Integer id;
	private String login;
	private String pwd;
	private float account;
	private String lastName;
	private String surName;
	private String email;
	private Set<Integer> cardList = new HashSet<>();

	public UserDTO(){
	}

	public UserDTO(UserModel user) {
		this.setId(user.getId());
		this.setLogin(user.getLogin());
		this.setPwd(user.getPwd());
		this.setAccount(user.getAccount());
		this.setLastName(user.getLastName());
		this.setSurName(user.getSurName());
		this.setEmail(user.getEmail());
		for (CardModel card : user.getCardList()) {
			this.getCardList().add(card.getId());
		}
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public Set<Integer> getCardList() {
		return cardList;
	}

	public void setCardList(Set<Integer> cardList) {
		this.cardList = cardList;
	}

	public float getAccount() {
		return account;
	}

	public void setAccount(float account) {
		this.account = account;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSurName() {
		return surName;
	}

	public void setSurName(String surName) {
		this.surName = surName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
