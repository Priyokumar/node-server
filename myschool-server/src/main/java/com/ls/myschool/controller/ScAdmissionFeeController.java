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
import com.ls.myschool.dto.admissionFee.Admission;
import com.ls.myschool.dto.admissionFee.AdmissionFeeResponse;
import com.ls.myschool.dto.admissionFee.AdmissionFeesResponse;
import com.ls.myschool.dto.admissionFee.FeesResponse;
import com.ls.myschool.service.ScAdmissionFeeService;

@RestController
@RequestMapping("/admission-fees")
public class ScAdmissionFeeController {

	@Autowired
	private ScAdmissionFeeService admissionFeeService;

	@GetMapping
	private AdmissionFeesResponse findAllAdmissionFee() {
		return admissionFeeService.findAllAdmissionFee();
	}

	@GetMapping(value = "/{id}")
	private AdmissionFeeResponse findAdmissionFee(@PathVariable("id") Long id) {
		return admissionFeeService.findAdmissionFee(id);
	}

	@PostMapping
	private ActionResponse createAdmissionFee(@RequestBody Admission admission) {
		return admissionFeeService.createOrUpdateAdmissionFee(admission, null);
	}

	@PutMapping(value = "/{id}")
	private ActionResponse updateAdmissionFee(@RequestBody Admission admission, @PathVariable("id") Long id) {
		return admissionFeeService.createOrUpdateAdmissionFee(admission, id);
	}

	@DeleteMapping(value = "/{id}")
	private ActionResponse deleteAdmissionFee(@PathVariable("id") Long id) {
		return admissionFeeService.deleteAdmissionFee(id);
	}

	@GetMapping(value = "fees/{standard}/{year}")
	private FeesResponse findFeesByStandard(@PathVariable("standard") String standard, @PathVariable("year") String year) {
		return admissionFeeService.findFeesByStandard(standard, year);
	}

}
