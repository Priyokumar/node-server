package com.ls.myschool.dto.student;

import java.util.List;

import com.ls.myschool.dto.ApiMessage;

public class StudentClassesReponse {

	private List<StudentClass> data;

	private ApiMessage apiMessage;

	public List<StudentClass> getData() {
		return data;
	}

	public void setData(List<StudentClass> data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
