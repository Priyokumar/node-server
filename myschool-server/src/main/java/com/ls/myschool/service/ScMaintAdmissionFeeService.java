package com.ls.myschool.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ls.myschool.dto.ActionResponse;
import com.ls.myschool.dto.ApiUtil;
import com.ls.myschool.dto.error.NotFoundException;
import com.ls.myschool.dto.maintenance.MaintAdmissionFeeResponse;
import com.ls.myschool.dto.maintenance.MaintAdmissionFeeYearlyResponse;
import com.ls.myschool.dto.maintenance.MaintAdmissionFeesYearlyResponse;
import com.ls.myschool.dto.maintenance.MaintenanceAdmissionFee;
import com.ls.myschool.dto.maintenance.MaintenanceAdmissionFeeYearly;
import com.ls.myschool.entity.maintenance.ScMaintenanceAdmissionFee;
import com.ls.myschool.entity.maintenance.ScMaintenanceAdmissionFeeYearly;
import com.ls.myschool.service.common.CommonService;
import com.ls.myschool.util.ScUtil;
import com.ls.myschool.vo.FieldType;
import com.ls.myschool.vo.Filter;
import com.ls.myschool.vo.Operator;

@Service
public class ScMaintAdmissionFeeService {

	@Autowired
	private CommonService commonService;

	public MaintAdmissionFeesYearlyResponse findAllMaintAdmissionFees() {

		MaintAdmissionFeesYearlyResponse res = new MaintAdmissionFeesYearlyResponse();

		List<ScMaintenanceAdmissionFeeYearly> maintAdmissionFeesYearly = commonService
				.findAll(ScMaintenanceAdmissionFeeYearly.class);
		if (!ScUtil.isAllPresent(maintAdmissionFeesYearly))
			throw new NotFoundException("No Admisions Maintenance can be found !");

		List<MaintenanceAdmissionFeeYearly> dtoMaintAdmissionFeesYearly = new ArrayList<>();
		maintAdmissionFeesYearly.forEach(maintAdmissionFeeYearly -> {
			MaintenanceAdmissionFeeYearly dtoMaintAdmissionFee = setMaintAdmissionFeeToDto(maintAdmissionFeeYearly);
			dtoMaintAdmissionFeesYearly.add(dtoMaintAdmissionFee);
		});

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoMaintAdmissionFeesYearly);
		return res;
	}

	public MaintAdmissionFeeYearlyResponse findMaintAdmissionFee(Long id) {

		MaintAdmissionFeeYearlyResponse res = new MaintAdmissionFeeYearlyResponse();

		ScMaintenanceAdmissionFeeYearly manageAdmissionFeeYearly = commonService.findById(id,
				ScMaintenanceAdmissionFeeYearly.class);

		if (!ScUtil.isAllPresent(manageAdmissionFeeYearly))
			throw new NotFoundException("No manageAdmissionFeeYearly can be found !");

		MaintenanceAdmissionFeeYearly setMaintAdmissionFeeYearlyToDto = setMaintAdmissionFeeToDto(
				manageAdmissionFeeYearly);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(setMaintAdmissionFeeYearlyToDto);

		return res;
	}

	public ActionResponse createOrUpdateMaintAdmissionFee(MaintenanceAdmissionFeeYearly maintAdmissionFeeYearlyDto,
			Long id) {

		ActionResponse res = new ActionResponse();
		ScMaintenanceAdmissionFeeYearly maintAdmissionFeeYearly = new ScMaintenanceAdmissionFeeYearly();

		if (ScUtil.isAllPresent(id))
			maintAdmissionFeeYearly = commonService.findById(id, ScMaintenanceAdmissionFeeYearly.class);

		if (!ScUtil.isAllPresent(maintAdmissionFeeYearly))
			throw new NotFoundException("No manage admission fee can be found !");

		dtoToMaintAdmissionFee(maintAdmissionFeeYearlyDto, maintAdmissionFeeYearly);

		commonService.save(maintAdmissionFeeYearly);
		String message = "";
		if (ScUtil.isAllPresent(id)) {
			message = "Successfully updated the manage admission fee's data";
			res.setApiMessage(ApiUtil.okMessage(message));
		} else {
			message = "Successfully created a manage admission fee";
			res.setApiMessage(ApiUtil.createdMessage(message));
			res.setActionMessage(message);
		}
		return res;
	}

	public ActionResponse deleteMaintAdmissionFee(Long id) {

		ActionResponse res = new ActionResponse();

		ScMaintenanceAdmissionFeeYearly maintAdmissionFeeYearly = commonService.findById(id, ScMaintenanceAdmissionFeeYearly.class);

		if (!ScUtil.isAllPresent(maintAdmissionFeeYearly))
			throw new NotFoundException("No Maintenance AdmissionFee can be found !");

		commonService.delete(maintAdmissionFeeYearly);

		res.setActionMessage("Maintenance Admission has been deleted successfully");
		res.setApiMessage(ApiUtil.okMessage("Maintenance Admission has been deleted successfully"));
		return res;
	}

	private MaintenanceAdmissionFeeYearly setMaintAdmissionFeeToDto(
			ScMaintenanceAdmissionFeeYearly manageAdmissionFeeYearly) {

		MaintenanceAdmissionFeeYearly manageAdmFeeDtoYearly = new MaintenanceAdmissionFeeYearly();

		manageAdmFeeDtoYearly.setId(manageAdmissionFeeYearly.getId());
		manageAdmFeeDtoYearly.setYear(manageAdmissionFeeYearly.getYear());

		List<ScMaintenanceAdmissionFee> maintenanceAdmissionFees = manageAdmissionFeeYearly
				.getMaintenanceAdmissionFees();
		if (ScUtil.isAllPresent(maintenanceAdmissionFees)) {

			List<MaintenanceAdmissionFee> maintenanceAdmissionFeesDto = new ArrayList<>();
			maintenanceAdmissionFees.forEach(maintenanceAdmissionFee -> {

				MaintenanceAdmissionFee manageAdmFeeDto = maintAdmissionFeeToDto(maintenanceAdmissionFee);
				maintenanceAdmissionFeesDto.add(manageAdmFeeDto);

			});
			manageAdmFeeDtoYearly.setMaintenanceAdmissionFees(maintenanceAdmissionFeesDto);
		}
		return manageAdmFeeDtoYearly;
	}

	private MaintenanceAdmissionFee maintAdmissionFeeToDto(ScMaintenanceAdmissionFee maintenanceAdmissionFee) {
		MaintenanceAdmissionFee manageAdmFeeDto = new MaintenanceAdmissionFee();
		manageAdmFeeDto.setYear(maintenanceAdmissionFee.getYear());
		manageAdmFeeDto.setAdmissionAmount(maintenanceAdmissionFee.getAdmissionAmount());
		manageAdmFeeDto.setFeeAmount(maintenanceAdmissionFee.getFeeAmount());
		manageAdmFeeDto.setId(maintenanceAdmissionFee.getId());
		manageAdmFeeDto.setStandard(maintenanceAdmissionFee.getStandard());
		return manageAdmFeeDto;
	}

	private void dtoToMaintAdmissionFee(MaintenanceAdmissionFeeYearly maintenanceAdmissionFeeYearlyDto,
			ScMaintenanceAdmissionFeeYearly maintenanceAdmissionFeeYearly) {

		maintenanceAdmissionFeeYearly.setId(maintenanceAdmissionFeeYearlyDto.getId());
		maintenanceAdmissionFeeYearly.setYear(maintenanceAdmissionFeeYearlyDto.getYear());

		List<MaintenanceAdmissionFee> maintenanceAdmissionFeesDto = maintenanceAdmissionFeeYearlyDto
				.getMaintenanceAdmissionFees();
		if (!ScUtil.isAllPresent(maintenanceAdmissionFeesDto))
			return;

		List<ScMaintenanceAdmissionFee> maintenanceAdmissionFees = new ArrayList<>();
		maintenanceAdmissionFeesDto.forEach(maintenanceAdmissionFeeDto -> {

			ScMaintenanceAdmissionFee maintenanceAdmissionFee = new ScMaintenanceAdmissionFee();
			maintenanceAdmissionFee.setYear(maintenanceAdmissionFeeDto.getYear());
			maintenanceAdmissionFee.setAdmissionAmount(maintenanceAdmissionFeeDto.getAdmissionAmount());
			maintenanceAdmissionFee.setFeeAmount(maintenanceAdmissionFeeDto.getFeeAmount());
			maintenanceAdmissionFee.setStandard(maintenanceAdmissionFeeDto.getStandard());
			maintenanceAdmissionFee.setMaintenanceAdmissionFeeYearly(maintenanceAdmissionFeeYearly);
			maintenanceAdmissionFees.add(maintenanceAdmissionFee);
		});
		maintenanceAdmissionFeeYearly.getMaintenanceAdmissionFees().clear();
		maintenanceAdmissionFeeYearly.getMaintenanceAdmissionFees().addAll(maintenanceAdmissionFees);
	}

	public MaintAdmissionFeeResponse findMaintAdmissionFeeByStandard(String standard, String year) {

		MaintAdmissionFeeResponse res = new MaintAdmissionFeeResponse();

		ScMaintenanceAdmissionFee maintenanceAdmissionFee = getMaintAdmissionFeeByStandard(standard, year);

		MaintenanceAdmissionFee manageAdmFeeDto = maintAdmissionFeeToDto(maintenanceAdmissionFee);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(manageAdmFeeDto);

		return res;
	}

	public ScMaintenanceAdmissionFee getMaintAdmissionFeeByStandard(String standard, String year) {

		List<Filter> filters = new ArrayList<>();
		filters.add(new Filter("year", Operator.EQUAL, FieldType.STRING, year));

		ScMaintenanceAdmissionFeeYearly maintenanceAdmissionFeeYearly = commonService.findOne(filters,
				ScMaintenanceAdmissionFeeYearly.class);

		List<ScMaintenanceAdmissionFee> maintenanceAdmissionFees = maintenanceAdmissionFeeYearly
				.getMaintenanceAdmissionFees();
		if (!ScUtil.isAllPresent(maintenanceAdmissionFees))
			return null;

		maintenanceAdmissionFees = maintenanceAdmissionFees.stream().filter(maintenanceAdmissionFee -> {
			return maintenanceAdmissionFee.getStandard().equals(standard);
		}).collect(Collectors.toList());

		if (!ScUtil.isAllPresent(maintenanceAdmissionFees))
			return null;

		return maintenanceAdmissionFees.get(0);
	}

}
