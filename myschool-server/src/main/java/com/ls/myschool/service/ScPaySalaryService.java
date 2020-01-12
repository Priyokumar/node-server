package com.ls.myschool.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ls.myschool.dto.ActionResponse;
import com.ls.myschool.dto.ApiUtil;
import com.ls.myschool.dto.employee.PaySalariesResponse;
import com.ls.myschool.dto.employee.PaySalary;
import com.ls.myschool.dto.employee.PaySalaryResponse;
import com.ls.myschool.dto.error.NotFoundException;
import com.ls.myschool.entity.employee.ScEmployeeSalary;
import com.ls.myschool.entity.employee.ScPaySalary;
import com.ls.myschool.service.common.CommonService;
import com.ls.myschool.util.ScDateUtil;
import com.ls.myschool.util.ScUtil;

@Service
public class ScPaySalaryService {

	@Autowired
	private CommonService commonService;

	@Autowired
	private ScEmployeeSalaryService employeeSalaryService;

	public PaySalariesResponse findAllPaySalary() {

		PaySalariesResponse res = new PaySalariesResponse();

		List<ScPaySalary> paySalaries = commonService.findAll(ScPaySalary.class);
		if (!ScUtil.isAllPresent(paySalaries))
			throw new NotFoundException("No pay salary can be found !");

		List<PaySalary> dtoPaySalaries = new ArrayList<>();
		paySalaries.forEach(paySalary -> {
			PaySalary dtoPaySalary = setPaySalaryToDto(paySalary);
			dtoPaySalaries.add(dtoPaySalary);
		});

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoPaySalaries);
		return res;
	}

	private PaySalary setPaySalaryToDto(ScPaySalary paySalary) {

		PaySalary dtoPaySalary = new PaySalary();

		dtoPaySalary.setId(paySalary.getId());
		dtoPaySalary.setDueAmount(paySalary.getDueAmount());
		dtoPaySalary.setPaidAmount(paySalary.getPaidAmount());
		dtoPaySalary.setPayDate(ScDateUtil.dateToString(paySalary.getPayDate()));
		dtoPaySalary.setEmployeeSalary(employeeSalaryService.setEmployeeSalaryToDto(paySalary.getEmployeeSalary()));

		return dtoPaySalary;
	}

	public PaySalaryResponse findPaySalary(Long id) {

		PaySalaryResponse res = new PaySalaryResponse();

		ScPaySalary paySalary = commonService.findById(id, ScPaySalary.class);

		if (!ScUtil.isAllPresent(paySalary))
			throw new NotFoundException("No pay salary can be found !");

		PaySalary dtoPaySalary = setPaySalaryToDto(paySalary);
		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoPaySalary);

		return res;
	}

	public ActionResponse createOrUpdatePaySalary(PaySalary dtoPaySalary, Long id) {

		ActionResponse res = new ActionResponse();

		ScPaySalary paySalary = setDtoToPaySalary(dtoPaySalary, id);

		commonService.save(paySalary);

		String message = "";
		if (ScUtil.isAllPresent(id)) {
			message = "Successfully updated pay salary data";
			res.setApiMessage(ApiUtil.okMessage(message));
		} else {
			message = "Successfully created a pay salary";
			res.setApiMessage(ApiUtil.createdMessage(message));
			res.setActionMessage(message);
		}

		return res;
	}

	private ScPaySalary setDtoToPaySalary(PaySalary dtoPaySalary, Long id) {

		ScPaySalary paySalary = new ScPaySalary();

		paySalary.setId(dtoPaySalary.getId());
		paySalary.setDueAmount(dtoPaySalary.getDueAmount());
		paySalary.setPaidAmount(dtoPaySalary.getPaidAmount());
		paySalary.setPayDate(ScDateUtil.now());
		paySalary.setRecordAudit(ScUtil.recordAudit(null, id)); // TODO

		if (ScUtil.isAllPresent(dtoPaySalary.getEmployeeSalary(), dtoPaySalary.getEmployeeSalary().getId()))
			paySalary.setEmployeeSalary(
					commonService.findById(dtoPaySalary.getEmployeeSalary().getId(), ScEmployeeSalary.class));

		return paySalary;
	}

	public ActionResponse deletePaySalary(Long id) {

		ActionResponse res = new ActionResponse();

		ScPaySalary paySalary = commonService.findById(id, ScPaySalary.class);

		if (!ScUtil.isAllPresent(paySalary))
			throw new NotFoundException("No pay salary can be found !");

		commonService.delete(paySalary);

		res.setActionMessage("Pay salary has been deleted successfully");
		res.setApiMessage(ApiUtil.okMessage("Pay salary has been deleted successfully"));
		return res;
	}
}
