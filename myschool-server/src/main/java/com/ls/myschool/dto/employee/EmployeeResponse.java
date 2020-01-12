package com.ls.myschool.dto.employee;

import com.ls.myschool.dto.ApiMessage;

public class EmployeeResponse {

	private Employee data;

	private ApiMessage apiMessage;

	public Employee getData() {
		return data;
	}

	public void setData(Employee data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
