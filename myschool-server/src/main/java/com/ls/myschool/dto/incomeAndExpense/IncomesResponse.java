package com.ls.myschool.dto.incomeAndExpense;

import java.util.List;

import com.ls.myschool.dto.ApiMessage;

public class IncomesResponse {

	private List<Income> data;

	private ApiMessage apiMessage;

	public List<Income> getData() {
		return data;
	}

	public void setData(List<Income> data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
