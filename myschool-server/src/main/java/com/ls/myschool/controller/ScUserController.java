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
import com.ls.myschool.dto.user.User;
import com.ls.myschool.dto.user.UserResponse;
import com.ls.myschool.dto.user.UsersResponse;
import com.ls.myschool.service.ScUserService;

@RestController
@RequestMapping("/users")
public class ScUserController {

	@Autowired
	private ScUserService userService;

	@GetMapping
	public UsersResponse findAllUser() {
		return userService.findAllUsers();
	}

	@PostMapping
	public ActionResponse createUser(@RequestBody User user) {
		return userService.createOrUpdateUser(user, null);
	}

	@GetMapping(value = "/{id}")
	public UserResponse findUser(@PathVariable("id") Long id) {
		return userService.findUser(id);
	}

	@PutMapping(value = "/{id}")
	public ActionResponse updateUser(@RequestBody User user, @PathVariable("id") Long id) {
		return userService.createOrUpdateUser(user, id);
	}

	@DeleteMapping(value = "/{id}")
	public ActionResponse deleteUser(@PathVariable("id") Long id) {
		return userService.deleteUser(id);
	}
}
