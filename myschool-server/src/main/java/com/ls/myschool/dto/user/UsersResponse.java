package com.ls.myschool.dto.user;

import java.util.List;

import com.ls.myschool.dto.ApiMessage;

public class UsersResponse {

	private List<User> data;

	private ApiMessage apiMessage;

	public List<User> getData() {
		return data;
	}

	public void setData(List<User> data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
