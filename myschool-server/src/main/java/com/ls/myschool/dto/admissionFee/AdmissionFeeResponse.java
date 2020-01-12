package com.ls.myschool.dto.admissionFee;

import com.ls.myschool.dto.ApiMessage;

public class AdmissionFeeResponse {

	private Admission data;

	private ApiMessage apiMessage;

	public Admission getData() {
		return data;
	}

	public void setData(Admission data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}

}
