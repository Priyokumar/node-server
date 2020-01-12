package com.ls.myschool.dto.employee;

import com.ls.myschool.dto.ApiMessage;

public class StaffResponse {

	private Staff data;

	private ApiMessage apiMessage;

	public Staff getData() {
		return data;
	}

	public void setData(Staff data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
