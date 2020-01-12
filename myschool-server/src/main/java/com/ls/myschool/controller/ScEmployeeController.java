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
import com.ls.myschool.dto.employee.Employee;
import com.ls.myschool.dto.employee.EmployeeResponse;
import com.ls.myschool.dto.employee.EmployeesResponse;
import com.ls.myschool.service.ScEmployeeService;

@RestController
@RequestMapping("/employees")
public class ScEmployeeController {

	@Autowired
	private ScEmployeeService employeeService;

	@GetMapping
	public EmployeesResponse findAllEmployee() {
		return employeeService.findAllEmployee();
	}

	@GetMapping(value = "/{id}")
	public EmployeeResponse findEmployee(@PathVariable("id") Long id) {
		return employeeService.findEmployee(id);
	}

	@PostMapping
	public ActionResponse createEmployee(@RequestBody Employee employee) {
		return employeeService.createOrUpdateEmployee(employee, null);
	}

	@PutMapping(value = "/{id}")
	public ActionResponse updateEmployee(@RequestBody Employee employee, @PathVariable("id") Long id) {
		return employeeService.createOrUpdateEmployee(employee, id);
	}

	@DeleteMapping(value = "/{id}")
	public ActionResponse deleteEmployee(@PathVariable("id") Long id) {
		return employeeService.deleteEmployee(id);
	}



}
