package com.ls.myschool.dto.employee;

import java.util.List;

import com.ls.myschool.dto.ApiMessage;

public class EmployeeAttendencesResponse {

	private List<EmployeeAttendence> data;

	private ApiMessage apiMessage;

	public List<EmployeeAttendence> getData() {
		return data;
	}

	public void setData(List<EmployeeAttendence> data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
