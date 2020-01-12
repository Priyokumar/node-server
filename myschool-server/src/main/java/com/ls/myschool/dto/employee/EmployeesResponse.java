package com.ls.myschool.dto.employee;

import java.util.List;

import com.ls.myschool.dto.ApiMessage;

public class EmployeesResponse {

	private List<Employee> data;

	private ApiMessage apiMessage;

	public List<Employee> getData() {
		return data;
	}

	public void setData(List<Employee> data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
