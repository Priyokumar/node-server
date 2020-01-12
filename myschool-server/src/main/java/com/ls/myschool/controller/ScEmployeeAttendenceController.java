package com.ls.myschool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ls.myschool.dto.ActionResponse;
import com.ls.myschool.dto.employee.EmployeeAttendence;
import com.ls.myschool.dto.employee.EmployeeAttendenceResponse;
import com.ls.myschool.dto.employee.EmployeeAttendencesResponse;
import com.ls.myschool.service.ScEmployeeAttendenceService;

@RestController
@RequestMapping("/employee-attendences")
public class ScEmployeeAttendenceController {

	@Autowired
	private ScEmployeeAttendenceService employeeAttendenceService;

	@GetMapping
	public EmployeeAttendencesResponse findAllEmployeeAttendence() {
		return employeeAttendenceService.findAllEmployeeAttendence();
	}

	@GetMapping(value = "/{id}")
	public EmployeeAttendenceResponse findEmployeeAttendence(@PathVariable("id") Long id) {
		return employeeAttendenceService.findEmployeeAttendence(id);
	}

	@PostMapping
	public ActionResponse createEmployeeAttendence(@RequestBody EmployeeAttendence dtoEmployeeAttendence) {
		return employeeAttendenceService.createOrUpdateEmployeeAttendence(dtoEmployeeAttendence, null);
	}

	@PutMapping(value = "/{id}")
	public ActionResponse updateEmployeeAttendence(@RequestBody EmployeeAttendence dtoEmployeeAttendence,
			@PathVariable("id") Long id) {
		return employeeAttendenceService.createOrUpdateEmployeeAttendence(dtoEmployeeAttendence, id);
	}

	@DeleteMapping(value = "/{id}")
	public ActionResponse deleteEmployeeAttendence(@PathVariable("id") Long id) {
		return employeeAttendenceService.deleteEmployeeAttendence(id);
	}
}
