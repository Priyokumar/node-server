package com.ls.myschool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ls.myschool.dto.ActionResponse;
import com.ls.myschool.dto.security.ChangePassword;
import com.ls.myschool.dto.security.Login;
import com.ls.myschool.dto.security.LoginResponse;
import com.ls.myschool.dto.security.RolesResponse;
import com.ls.myschool.service.ScSecurityService;

@RestController
@RequestMapping("/security")
public class ScSecurityController {

	@Autowired
	private ScSecurityService securityService;

	@PostMapping(value = "/login")
	public LoginResponse login(@RequestBody Login login) {
		return securityService.login(login);
	}

	@GetMapping(value = "/{id}/logout")
	public ActionResponse logout(@PathVariable("id") Long id) {
		return securityService.logout(id);
	}

	@PostMapping(value = "/change-password")
	public ActionResponse changePassword(@RequestBody ChangePassword changePassword) {
		return securityService.changePassword(changePassword);
	}
	
	@GetMapping(value = "/{userId}/roles")
	public RolesResponse roles(@PathVariable("userId") Long userId) {
		return securityService.roles(userId);
	}
}
