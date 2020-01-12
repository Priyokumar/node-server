package com.ls.myschool.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ls.myschool.dto.ActionResponse;
import com.ls.myschool.dto.ApiMessage;
import com.ls.myschool.dto.ApiUtil;
import com.ls.myschool.dto.error.InternalServerException;
import com.ls.myschool.dto.error.NotFoundException;
import com.ls.myschool.dto.security.ChangePassword;
import com.ls.myschool.dto.security.Login;
import com.ls.myschool.dto.security.LoginResponse;
import com.ls.myschool.dto.security.RolesResponse;
import com.ls.myschool.dto.user.Menu;
import com.ls.myschool.dto.user.Role;
import com.ls.myschool.dto.user.SubMenu;
import com.ls.myschool.dto.user.User;
import com.ls.myschool.entity.user.SCUserRole;
import com.ls.myschool.entity.user.ScMenu;
import com.ls.myschool.entity.user.ScRole;
import com.ls.myschool.entity.user.ScSubMenu;
import com.ls.myschool.entity.user.ScUser;
import com.ls.myschool.entity.user.ScUserAudit;
import com.ls.myschool.service.common.CommonService;
import com.ls.myschool.util.ScUtil;
import com.ls.myschool.vo.ActionType;
import com.ls.myschool.vo.ApiMessageType;
import com.ls.myschool.vo.FieldType;
import com.ls.myschool.vo.Filter;
import com.ls.myschool.vo.Operator;

@Service
public class ScSecurityService {

	@Autowired
	private CommonService commonService;

	@Autowired
	private ScUserService userService;

	public LoginResponse login(Login login) {

		LoginResponse res = new LoginResponse();

		String password = login.getPassword();
		String username = login.getUserName();

		if (!ScUtil.isAllPresent(password, username))
			throw new InternalServerException(ApiMessageType.INSUFFICIENT_DATA);

		ScUser user = findUserByUserName(username);

		if (!ScUtil.isAllPresent(user))
			throw new NotFoundException(ApiMessageType.USER_NOT_FOUND);

		if (!user.getPassword().equals(password))
			throw new InternalServerException(ApiMessageType.INVALID_CREDENTIAL);

		addUserAudit(ActionType.USER_LOGIN, "User login", user);

		User dtoUser = userService.setUserToDto(user);

		res.setData(dtoUser);
		res.setApiMessage(ApiUtil.okMessage("Successfully login"));
		return res;
	}

	public ActionResponse logout(Long id) {

		ActionResponse res = new ActionResponse();

		ScUser user = commonService.findById(id, ScUser.class);
		if (!ScUtil.isAllPresent(user))
			throw new NotFoundException(ApiMessageType.USER_NOT_FOUND);

		addUserAudit(ActionType.USER_LOGOUT, "User logout", user);
		res.setApiMessage(ApiUtil.okMessage("Successfully logout"));
		res.setActionMessage("Successfully logout");

		return res;
	}

	public ActionResponse changePassword(ChangePassword changePassword) {

		ActionResponse res = new ActionResponse();

		String newPassword = changePassword.getNewPassword();
		String confirmPassword = changePassword.getConfirmPassword();
		String username = changePassword.getUserName();

		if (!ScUtil.isAllPresent(newPassword, confirmPassword, username))
			throw new InternalServerException(ApiMessageType.INSUFFICIENT_DATA);

		if (!newPassword.equals(confirmPassword))
			throw new InternalServerException(ApiMessageType.PASSWORD_MISMATCH);

		ScUser user = findUserByUserName(username);
		if (!ScUtil.isAllPresent(user))
			throw new NotFoundException(ApiMessageType.USER_NOT_FOUND);

		user.setPassword(newPassword);
		commonService.save(user);

		addUserAudit(ActionType.CHANGE_PASSWORD, "Change password", user);
		res.setApiMessage(ApiUtil.okMessage("Password has been changed successfully"));
		res.setActionMessage("Password has been changed successfully");
		return res;
	}

	public ScUser findUserByUserName(String username) {

		List<Filter> filters = Arrays.asList(new Filter("userName", Operator.EQUAL, FieldType.STRING, username));
		ScUser user = commonService.findOne(filters, ScUser.class);
		return user;

	}

	public void addUserAudit(String actionType, String action, ScUser user) {

		ScUserAudit userAudit = new ScUserAudit();

		userAudit.setAction(action);
		userAudit.setActionType(actionType);
		userAudit.setActionDate(new Date());
		userAudit.setUser(user);

		commonService.save(userAudit);

	}

	public RolesResponse roles(Long userId) {

		RolesResponse res = new RolesResponse();

		ScUser user = commonService.findById(userId, ScUser.class);

		if (!ScUtil.isAllPresent(user))
			throw new NotFoundException("No users can be found !");

		List<SCUserRole> userRoles = user.getUserRoles();

		if (!ScUtil.isAllPresent(userRoles)) {
			res.setApiMessage(
					new ApiMessage(true, HttpStatus.NOT_FOUND.value(), "No role found", HttpStatus.NOT_FOUND.name()));
			res.setData(new ArrayList<>());
		}

		List<Role> dtoRoles = new ArrayList<>();
		userRoles.forEach(userRole -> {

			Role dtoRole = new Role();
			ScRole role = userRole.getRole();

			if (ScUtil.isAllPresent(role)) {
				dtoRole.setId(role.getId());
				dtoRole.setName(role.getName());

				List<ScMenu> menus = role.getMenus();
				if (ScUtil.isAllPresent(menus)) {

					List<Menu> dtoMenus = new ArrayList<>();
					menus.forEach(menu -> {

						Menu dtoMenu = new Menu();

						dtoMenu.setHasSubmenu(menu.getHasSubmenu());
						dtoMenu.setIcon(menu.getIcon());
						dtoMenu.setId(menu.getId());
						dtoMenu.setOrder(menu.getOrder());
						dtoMenu.setPath(menu.getPath());
						dtoMenu.setTitle(menu.getTitle());
						dtoMenus.add(dtoMenu);

						List<ScSubMenu> subMenus = menu.getSubMenus();
						if (ScUtil.isAllPresent(subMenus)) {

							List<SubMenu> dtoSubMenus = new ArrayList<>();

							subMenus.forEach(subMenu -> {

								SubMenu dtoSubMenu = new SubMenu();

								dtoSubMenu.setIcon(subMenu.getIcon());
								dtoSubMenu.setId(subMenu.getId());
								dtoSubMenu.setOrder(subMenu.getOrder());
								dtoSubMenu.setPath(subMenu.getPath());
								dtoSubMenu.setTitle(subMenu.getTitle());

								dtoSubMenus.add(dtoSubMenu);
							});

							dtoMenu.setSubmenu(dtoSubMenus);
						}
					});
					dtoRole.setMenus(dtoMenus);
				}
			}
			dtoRoles.add(dtoRole);
		});
		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoRoles);
		return res;
	}

}
