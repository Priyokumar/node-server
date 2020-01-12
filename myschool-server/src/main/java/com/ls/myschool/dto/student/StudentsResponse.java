package com.ls.myschool.dto.student;

import java.util.List;

import com.ls.myschool.dto.ApiMessage;

public class StudentsResponse {

	private List<Student> data;

	private ApiMessage apiMessage;

	public List<Student> getData() {
		return data;
	}

	public void setData(List<Student> data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
