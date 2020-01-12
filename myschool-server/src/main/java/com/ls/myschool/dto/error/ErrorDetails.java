package com.ls.myschool.dto.error;

import com.ls.myschool.dto.ApiMessage;

public class ErrorDetails {

	private ApiMessage apiMessage;

	public ErrorDetails(int code, String detail, String status) {

		apiMessage = new ApiMessage(true, code, detail, status);
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
