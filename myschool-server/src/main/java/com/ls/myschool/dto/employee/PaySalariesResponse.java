package com.ls.myschool.dto.employee;

import java.util.List;

import com.ls.myschool.dto.ApiMessage;

public class PaySalariesResponse {

	private List<PaySalary> data;

	private ApiMessage apiMessage;

	public List<PaySalary> getData() {
		return data;
	}

	public void setData(List<PaySalary> data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
