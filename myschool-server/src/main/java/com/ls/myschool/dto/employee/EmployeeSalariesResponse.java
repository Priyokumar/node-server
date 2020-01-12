package com.ls.myschool.dto.employee;

import java.util.List;

import com.ls.myschool.dto.ApiMessage;

public class EmployeeSalariesResponse {

	private List<EmployeeSalary> data;

	private ApiMessage apiMessage;

	public List<EmployeeSalary> getData() {
		return data;
	}

	public void setData(List<EmployeeSalary> data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
