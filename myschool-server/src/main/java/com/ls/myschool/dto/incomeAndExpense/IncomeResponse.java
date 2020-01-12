package com.ls.myschool.dto.incomeAndExpense;

import com.ls.myschool.dto.ApiMessage;

public class IncomeResponse {

	private Income data;

	private ApiMessage apiMessage;

	public Income getData() {
		return data;
	}

	public void setData(Income data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
