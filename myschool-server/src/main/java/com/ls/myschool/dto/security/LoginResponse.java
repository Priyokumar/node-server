package com.ls.myschool.dto.security;

import com.ls.myschool.dto.ApiMessage;
import com.ls.myschool.dto.user.User;

public class LoginResponse {

	private User data;

	private ApiMessage apiMessage;

	public User getData() {
		return data;
	}

	public void setData(User data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
