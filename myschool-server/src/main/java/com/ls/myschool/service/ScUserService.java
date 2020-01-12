package com.ls.myschool.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ls.myschool.dto.ActionResponse;
import com.ls.myschool.dto.ApiMessage;
import com.ls.myschool.dto.ApiUtil;
import com.ls.myschool.dto.error.NotFoundException;
import com.ls.myschool.dto.user.Role;
import com.ls.myschool.dto.user.User;
import com.ls.myschool.dto.user.UserResponse;
import com.ls.myschool.dto.user.UsersResponse;
import com.ls.myschool.entity.user.SCUserRole;
import com.ls.myschool.entity.user.ScRole;
import com.ls.myschool.entity.user.ScUser;
import com.ls.myschool.service.common.CommonService;
import com.ls.myschool.util.ScUtil;
import com.ls.myschool.vo.FieldType;
import com.ls.myschool.vo.Filter;
import com.ls.myschool.vo.Operator;

@Service
public class ScUserService {

	@Autowired
	private CommonService commonService;

	public UsersResponse findAllUsers() {

		UsersResponse res = new UsersResponse();

		List<ScUser> users = commonService.findAll(ScUser.class);

		if (!ScUtil.isAllPresent(users))
			throw new NotFoundException("No users can be found !");

		List<User> dtoUsers = new ArrayList<>();
		users.forEach(user -> {

			User dtoUser = setUserToDto(user);
			dtoUsers.add(dtoUser);

		});

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoUsers);
		return res;
	}

	public UserResponse findUser(Long id) {

		UserResponse res = new UserResponse();

		ScUser user = commonService.findById(id, ScUser.class);

		if (!ScUtil.isAllPresent(user))
			throw new NotFoundException("No users can be found !");

		User dtoUser = setUserToDto(user);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoUser);

		return res;
	}

	public User setUserToDto(ScUser user) {
		User dtoUser = new User();

		dtoUser.setEmail(user.getEmail());
		dtoUser.setFirstName(user.getFirstName());
		dtoUser.setId(user.getId());
		dtoUser.setLastName(user.getLastName());
		dtoUser.setLinkedId(user.getLinkedId());
		dtoUser.setMobile(user.getMobile());
		dtoUser.setUserName(user.getUserName());
		dtoUser.setPassword(user.getPassword());

		List<SCUserRole> userRoles = user.getUserRoles();
		if (ScUtil.isAllPresent(userRoles)) {

			List<Role> dtoRoles = new ArrayList<>();
			userRoles.forEach(userRole -> {

				Role dtoRole = new Role();
				ScRole role = userRole.getRole();

				if (role != null) {
					dtoRole.setId(role.getId());
					dtoRole.setName(role.getName());
				}
				dtoRoles.add(dtoRole);
			});
			dtoUser.setRoles(dtoRoles);

		}
		return dtoUser;
	}

	public ActionResponse createOrUpdateUser(User apiUser, Long id) {

		ActionResponse res = new ActionResponse();

		ScUser user = new ScUser();

		if (ScUtil.isAllPresent(id))
			user = commonService.findById(id, ScUser.class);

		if (!ScUtil.isAllPresent(user))
			throw new NotFoundException("No users can be found !");

		Long linkedId = apiUser.getLinkedId();
		List<ScUser> users = commonService.find(Arrays.asList(new Filter("linkedId",Operator.EQUAL,FieldType.NUMBER, linkedId)), ScUser.class);

		if (ScUtil.isAllPresent(users) && !ScUtil.isAllPresent(id)) {
			ApiMessage apiMessage = new ApiMessage(true, HttpStatus.INTERNAL_SERVER_ERROR.value(),
					"Existing user has been created", HttpStatus.INTERNAL_SERVER_ERROR.name());
			res.setActionMessage("Existing user has been created");
			res.setApiMessage(apiMessage);
			return res;
		}

		user.setLinkedId(apiUser.getLinkedId());
		user.setEmail(apiUser.getEmail());
		user.setFirstName(apiUser.getFirstName());
		user.setLastName(apiUser.getLastName());
		user.setMobile(apiUser.getMobile());
		user.setUserName(apiUser.getUserName());
		user.setPassword("admin");

		if (ScUtil.isAllPresent(apiUser.getRoles())) {

			List<SCUserRole> userRoles = new ArrayList<>();
			for (Role apiRoles : apiUser.getRoles()) {

				ScRole role = commonService.findById(apiRoles.getId(), ScRole.class);
				SCUserRole userRole = new SCUserRole();
				userRole.setRole(role);
				userRole.setUser(user);
				userRoles.add(userRole);

			}
			if (ScUtil.isAllPresent(user.getUserRoles()))
				user.getUserRoles().clear();
			user.getUserRoles().addAll(userRoles);
		}
		commonService.save(user);

		String message = "";
		if (ScUtil.isAllPresent(id)) {
			message = "Successfully updated the user's data";
			res.setApiMessage(ApiUtil.createdMessage(message));
		} else {
			message = "Successfully created a user";
			res.setApiMessage(ApiUtil.okMessage(message));
			res.setActionMessage(message);
		}

		return res;
	}

	public ActionResponse deleteUser(Long id) {

		ActionResponse res = new ActionResponse();

		ScUser user = commonService.findById(id, ScUser.class);

		if (!ScUtil.isAllPresent(user))
			throw new NotFoundException("No users can be found !");

		commonService.delete(user);

		res.setApiMessage(ApiUtil.okMessage("Successfully deleted"));
		return res;
	}

}
