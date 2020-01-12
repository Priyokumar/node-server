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
import com.ls.myschool.dto.employee.Staff;
import com.ls.myschool.dto.employee.StaffResponse;
import com.ls.myschool.dto.employee.StaffsResponse;
import com.ls.myschool.service.ScStaffService;

@RestController
@RequestMapping("/staff")
public class ScStaffController {

	@Autowired
	private ScStaffService scStaffService;

	@GetMapping
	public StaffsResponse findAllStaff() {
		return scStaffService.findAllStaff();
	}

	@GetMapping(value = "/{id}")
	public StaffResponse findStaff(@PathVariable("id") Long id) {
		return scStaffService.findStaff(id);
	}

	@PostMapping
	public ActionResponse createStaff(@RequestBody Staff staff) {
		return scStaffService.createOrUpdateStaff(staff, null);
	}

	@PutMapping(value = "/{id}")
	public ActionResponse updateStaff(@RequestBody Staff staff, @PathVariable("id") Long id) {
		return scStaffService.createOrUpdateStaff(staff, id);
	}

	@DeleteMapping(value = "/{id}")
	public ActionResponse deleteStaff(@PathVariable("id") Long id) {
		return scStaffService.deleteStaff(id);
	}
}
