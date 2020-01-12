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
import com.ls.myschool.dto.employee.PaySalariesResponse;
import com.ls.myschool.dto.employee.PaySalary;
import com.ls.myschool.dto.employee.PaySalaryResponse;
import com.ls.myschool.service.ScPaySalaryService;

@RestController
@RequestMapping("/pay-salaries")
public class ScPaySalaryController {

	@Autowired
	private ScPaySalaryService paySalaryService;

	@GetMapping
	public PaySalariesResponse findAllPaySalary() {
		return paySalaryService.findAllPaySalary();
	}

	@GetMapping(value = "/{id}")
	public PaySalaryResponse findPaySalary(@PathVariable("id") Long id) {
		return paySalaryService.findPaySalary(id);
	}

	@PostMapping
	public ActionResponse createPaySalary(@RequestBody PaySalary dtoPaySalary) {
		return paySalaryService.createOrUpdatePaySalary(dtoPaySalary, null);
	}

	@PutMapping(value = "/{id}")
	public ActionResponse updatePaySalary(@RequestBody PaySalary dtoPaySalary, @PathVariable("id") Long id) {
		return paySalaryService.createOrUpdatePaySalary(dtoPaySalary, id);
	}

	@DeleteMapping(value = "/{id}")
	public ActionResponse deletePaySalary(@PathVariable("id") Long id) {
		return paySalaryService.deletePaySalary(id);
	}
}
