package com.ls.myschool.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ls.myschool.dto.ActionResponse;
import com.ls.myschool.dto.ApiUtil;
import com.ls.myschool.dto.employee.EmployeeSalariesResponse;
import com.ls.myschool.dto.employee.EmployeeSalary;
import com.ls.myschool.dto.employee.EmployeeSalaryResponse;
import com.ls.myschool.dto.error.NotFoundException;
import com.ls.myschool.entity.employee.ScEmployee;
import com.ls.myschool.entity.employee.ScEmployeeSalary;
import com.ls.myschool.service.common.CommonService;
import com.ls.myschool.util.ScUtil;
import com.ls.myschool.vo.FieldType;
import com.ls.myschool.vo.Filter;
import com.ls.myschool.vo.Operator;

@Service
public class ScEmployeeSalaryService {

	@Autowired
	private CommonService commonService;

	@Autowired
	ScEmployeeService employeeService;

	public EmployeeSalariesResponse findAllEmployeeSalary() {

		EmployeeSalariesResponse res = new EmployeeSalariesResponse();

		List<ScEmployeeSalary> employeeSalaries = commonService.findAll(ScEmployeeSalary.class);
		if (!ScUtil.isAllPresent(employeeSalaries))
			throw new NotFoundException("No employee salaries can be found !");

		List<EmployeeSalary> dtoEmployeeSalaries = new ArrayList<>();
		employeeSalaries.forEach(employeeSalary -> {
			EmployeeSalary dtoEmployeeSalary = setEmployeeSalaryToDto(employeeSalary);
			dtoEmployeeSalaries.add(dtoEmployeeSalary);
		});

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoEmployeeSalaries);
		return res;
	}

	public EmployeeSalary setEmployeeSalaryToDto(ScEmployeeSalary employeeSalary) {

		if (!ScUtil.isAllPresent(employeeSalary))
			return null;

		EmployeeSalary dtoEmployeeSalary = new EmployeeSalary();

		dtoEmployeeSalary.setEmployee(employeeService.setEmployeeToDto(employeeSalary.getEmployee()));
		dtoEmployeeSalary.setId(employeeSalary.getId());
		dtoEmployeeSalary.setSalaryAmount(employeeSalary.getSalaryAmount());

		return dtoEmployeeSalary;
	}

	public EmployeeSalaryResponse findEmployeeSalary(Long id) {

		EmployeeSalaryResponse res = new EmployeeSalaryResponse();

		ScEmployeeSalary employeeSalary = commonService.findById(id, ScEmployeeSalary.class);

		if (!ScUtil.isAllPresent(employeeSalary))
			throw new NotFoundException("No employee salary can be found !");

		EmployeeSalary employeeSalaryDto = setEmployeeSalaryToDto(employeeSalary);
		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(employeeSalaryDto);

		return res;
	}

	public ActionResponse createOrUpdateEmployeeSalary(EmployeeSalary dtoEmployeeSalary, Long id) {

		ActionResponse res = new ActionResponse();

		ScEmployeeSalary employeeSalary = setDtoToEmployeeSalary(dtoEmployeeSalary, id);

		commonService.save(employeeSalary);

		String message = "";
		if (ScUtil.isAllPresent(id)) {
			message = "Successfully updated employee salary data";
			res.setApiMessage(ApiUtil.okMessage(message));
		} else {
			message = "Successfully created a employee salary";
			res.setApiMessage(ApiUtil.createdMessage(message));
			res.setActionMessage(message);
		}

		return res;
	}

	private ScEmployeeSalary setDtoToEmployeeSalary(EmployeeSalary dtoEmployeeSalary, Long id) {

		ScEmployeeSalary employeeSalary = new ScEmployeeSalary();

		employeeSalary.setId(dtoEmployeeSalary.getId());
		employeeSalary.setRecordAudit(ScUtil.recordAudit(null, id)); // TODO
		employeeSalary.setSalaryAmount(dtoEmployeeSalary.getSalaryAmount());

		if (ScUtil.isAllPresent(dtoEmployeeSalary.getEmployee(), dtoEmployeeSalary.getEmployee().getId()))
			employeeSalary
					.setEmployee(commonService.findById(dtoEmployeeSalary.getEmployee().getId(), ScEmployee.class));

		return employeeSalary;
	}

	public ActionResponse deleteEmployeeSalary(Long id) {

		ActionResponse res = new ActionResponse();

		ScEmployeeSalary employeeSalary = commonService.findById(id, ScEmployeeSalary.class);

		if (!ScUtil.isAllPresent(employeeSalary))
			throw new NotFoundException("No employee salary can be found !");

		commonService.delete(employeeSalary);

		res.setActionMessage("EmployeeSalary has been deleted successfully");
		res.setApiMessage(ApiUtil.okMessage("EmployeeSalary has been deleted successfully"));
		return res;
	}

	public ActionResponse updateSalary(EmployeeSalary dtoEmployeeSalary, Long id) {

		ActionResponse res = new ActionResponse();

		ScEmployeeSalary employeeSalary = commonService.findById(id, ScEmployeeSalary.class);

		if (!ScUtil.isAllPresent(employeeSalary))
			throw new NotFoundException("No employee salary can be found !");

		Double salaryAmount = dtoEmployeeSalary.getSalaryAmount();
		employeeSalary.setSalaryAmount(salaryAmount);

		commonService.save(employeeSalary);

		res.setActionMessage("EmployeeSalary has been update successfully");
		res.setApiMessage(ApiUtil.okMessage("EmployeeSalary has been update successfully"));
		return res;
	}

	public EmployeeSalaryResponse findEmployeeSalaryByEmpId(Long empId) {

		EmployeeSalaryResponse res = new EmployeeSalaryResponse();

		List<Filter> filters = new ArrayList<>();
		filters.add(new Filter("employee", Operator.EQUAL, FieldType.NUMBER, empId));
		
		ScEmployeeSalary employeeSalary = commonService.findOne(filters, ScEmployeeSalary.class);

		if (!ScUtil.isAllPresent(employeeSalary))
			throw new NotFoundException("No employee salary can be found !");

		EmployeeSalary employeeSalaryDto = setEmployeeSalaryToDto(employeeSalary);
		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(employeeSalaryDto);

		return res;

	}

}
