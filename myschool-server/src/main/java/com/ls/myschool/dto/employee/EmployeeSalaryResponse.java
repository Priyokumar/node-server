package com.ls.myschool.dto.employee;

import com.ls.myschool.dto.ApiMessage;

public class EmployeeSalaryResponse {

	private EmployeeSalary data;

	private ApiMessage apiMessage;

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

	public EmployeeSalary getData() {
		return data;
	}

	public void setData(EmployeeSalary data) {
		this.data = data;
	}

}
