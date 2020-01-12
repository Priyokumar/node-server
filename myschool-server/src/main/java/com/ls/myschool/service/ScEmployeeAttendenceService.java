package com.ls.myschool.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ls.myschool.dto.ActionResponse;
import com.ls.myschool.dto.ApiUtil;
import com.ls.myschool.dto.employee.EmployeeAttendence;
import com.ls.myschool.dto.employee.EmployeeAttendenceResponse;
import com.ls.myschool.dto.employee.EmployeeAttendencesResponse;
import com.ls.myschool.dto.error.NotFoundException;
import com.ls.myschool.entity.employee.ScEmployee;
import com.ls.myschool.entity.employee.ScEmployeeAttendence;
import com.ls.myschool.service.common.CommonService;
import com.ls.myschool.util.ScDateUtil;
import com.ls.myschool.util.ScUtil;

@Service
public class ScEmployeeAttendenceService {

	@Autowired
	private CommonService commonService;

	@Autowired
	private ScEmployeeService employeeService;

	public EmployeeAttendencesResponse findAllEmployeeAttendence() {

		EmployeeAttendencesResponse res = new EmployeeAttendencesResponse();

		List<ScEmployeeAttendence> employeeAttendences = commonService.findAll(EmployeeAttendence.class);
		if (!ScUtil.isAllPresent(employeeAttendences))
			throw new NotFoundException("No employee attendence  can be found !");

		List<EmployeeAttendence> dtoEmployeeAttendences = new ArrayList<>();
		employeeAttendences.forEach(employeeAttendence -> {
			EmployeeAttendence dtoEmployeeAttendence = setEmployeeAttendenceToDto(employeeAttendence);
			dtoEmployeeAttendences.add(dtoEmployeeAttendence);
		});

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoEmployeeAttendences);
		return res;
	}

	private EmployeeAttendence setEmployeeAttendenceToDto(ScEmployeeAttendence employeeAttendence) {

		EmployeeAttendence dtoEmployeeAttendence = new EmployeeAttendence();

		dtoEmployeeAttendence.setAttDate(ScDateUtil.dateToString(employeeAttendence.getAttDate()));
		dtoEmployeeAttendence.setId(employeeAttendence.getId());
		dtoEmployeeAttendence.setRecordAudit(ScUtil.recordAuditToDto(employeeAttendence.getRecordAudit()));
		dtoEmployeeAttendence.setEmployees(employeeService.setEmployeesToDto(employeeAttendence.getEmployees()));

		return dtoEmployeeAttendence;
	}

	public EmployeeAttendenceResponse findEmployeeAttendence(Long id) {

		EmployeeAttendenceResponse res = new EmployeeAttendenceResponse();

		ScEmployeeAttendence employeeAttendence = commonService.findById(id, EmployeeAttendence.class);

		if (!ScUtil.isAllPresent(employeeAttendence))
			throw new NotFoundException("No employee attendence can be found !");

		EmployeeAttendence dtoEmployeeAttendence = setEmployeeAttendenceToDto(employeeAttendence);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoEmployeeAttendence);

		return res;
	}

	public ActionResponse createOrUpdateEmployeeAttendence(EmployeeAttendence dtoEmployeeAttendence, Long id) {

		ActionResponse res = new ActionResponse();

		ScEmployeeAttendence employeeAttendence = setDtoToEmployeeAttendence(dtoEmployeeAttendence, id);

		commonService.save(employeeAttendence);

		String message = "";
		if (ScUtil.isAllPresent(id)) {
			message = "Successfully updated employee attendence data";
			res.setApiMessage(ApiUtil.okMessage(message));
		} else {
			message = "Successfully created an employee attendence";
			res.setApiMessage(ApiUtil.createdMessage(message));
			res.setActionMessage(message);
		}

		return res;
	}

	private ScEmployeeAttendence setDtoToEmployeeAttendence(EmployeeAttendence dtoEmployeeAttendence, Long id) {

		ScEmployeeAttendence employeeAttendence = new ScEmployeeAttendence();

		employeeAttendence.setAttDate(ScDateUtil.stringToDate(dtoEmployeeAttendence.getAttDate()));
		employeeAttendence.setId(employeeAttendence.getId());
		employeeAttendence.setRecordAudit(ScUtil.recordAudit(null, id)); // TODO

		if (ScUtil.isAllPresent(dtoEmployeeAttendence.getEmployees())) {

			List<ScEmployee> employees = new ArrayList<>();
			dtoEmployeeAttendence.getEmployees().forEach(dtoEmployee -> {

				if (ScUtil.isAllPresent(dtoEmployee.getId())) {

					ScEmployee employee = commonService.findById(dtoEmployee.getId(), ScEmployee.class);
					employees.add(employee);
				}
			});
			employeeAttendence.setEmployees(employees);
		}
		return employeeAttendence;
	}

	public ActionResponse deleteEmployeeAttendence(Long id) {

		ActionResponse res = new ActionResponse();

		ScEmployeeAttendence employeeAttendence = commonService.findById(id, ScEmployeeAttendence.class);

		if (!ScUtil.isAllPresent(employeeAttendence))
			throw new NotFoundException("No employee attendence can be found !");

		commonService.delete(employeeAttendence);

		res.setActionMessage("Employee attendence has been deleted successfully");
		res.setApiMessage(ApiUtil.okMessage("Employee attendence  has been deleted successfully"));
		return res;
	}

}
