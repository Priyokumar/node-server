package com.ls.myschool.dto.maintenance;

import com.ls.myschool.dto.ApiMessage;

public class MaintAdmissionFeeResponse {

	private MaintenanceAdmissionFee data;

	private ApiMessage apiMessage;

	public MaintenanceAdmissionFee getData() {
		return data;
	}

	public void setData(MaintenanceAdmissionFee data) {
		this.data = data;
	}

	public ApiMessage getApiMessage() {
		return apiMessage;
	}

	public void setApiMessage(ApiMessage apiMessage) {
		this.apiMessage = apiMessage;
	}
	
	
}
