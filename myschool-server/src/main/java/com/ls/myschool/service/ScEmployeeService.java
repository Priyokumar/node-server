package com.ls.myschool.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ls.myschool.dto.ActionResponse;
import com.ls.myschool.dto.ApiUtil;
import com.ls.myschool.dto.Document;
import com.ls.myschool.dto.DocumentBody;
import com.ls.myschool.dto.employee.AcademicBackground;
import com.ls.myschool.dto.employee.Address;
import com.ls.myschool.dto.employee.Employee;
import com.ls.myschool.dto.employee.EmployeeHistory;
import com.ls.myschool.dto.employee.EmployeeResponse;
import com.ls.myschool.dto.employee.EmployeesResponse;
import com.ls.myschool.dto.employee.PersonalInfo;
import com.ls.myschool.dto.error.InternalServerException;
import com.ls.myschool.dto.error.NotFoundException;
import com.ls.myschool.entity.ScDocument;
import com.ls.myschool.entity.employee.ScAcademicBackground;
import com.ls.myschool.entity.employee.ScAddress;
import com.ls.myschool.entity.employee.ScEmployee;
import com.ls.myschool.entity.employee.ScEmployeeHistory;
import com.ls.myschool.entity.employee.ScEmployeeSalary;
import com.ls.myschool.entity.employee.ScPersonalInfo;
import com.ls.myschool.service.common.CommonService;
import com.ls.myschool.util.ScDateUtil;
import com.ls.myschool.util.ScUtil;
import com.ls.myschool.vo.FieldType;
import com.ls.myschool.vo.Filter;
import com.ls.myschool.vo.Operator;

@Service
public class ScEmployeeService {

	@Autowired
	private CommonService commonService;

	@Autowired
	private ScTempUploadService tempUploadService;

	public EmployeesResponse findAllEmployee() {

		EmployeesResponse res = new EmployeesResponse();

		List<ScEmployee> employees = commonService.findAll(ScEmployee.class);

		if (!ScUtil.isAllPresent(employees))
			throw new NotFoundException("No users can be found !");

		List<Employee> dtoEmployees = setEmployeesToDto(employees);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoEmployees);
		return res;
	}

	public List<Employee> setEmployeesToDto(List<ScEmployee> employees) {

		if (!ScUtil.isAllPresent(employees))
			return null;

		List<Employee> dtoEmployees = new ArrayList<>();
		employees.forEach(employee -> {

			Employee dtoEmployee = setEmployeeToDto(employee);
			dtoEmployees.add(dtoEmployee);

		});
		return dtoEmployees;
	}

	public EmployeeResponse findEmployee(Long id) {

		EmployeeResponse res = new EmployeeResponse();

		ScEmployee employee = commonService.findById(id, ScEmployee.class);

		if (!ScUtil.isAllPresent(employee))
			throw new NotFoundException("No users can be found !");

		Employee dtoUser = setEmployeeToDto(employee);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoUser);

		return res;
	}

	public Employee setEmployeeToDto(ScEmployee employee) {

		if (!ScUtil.isAllPresent(employee))
			return null;

		Employee dtoEmployee = new Employee();

		dtoEmployee.setId(employee.getId());
		dtoEmployee.setProfilePic(setDocDtoDoc(employee.getProfilePic()));
		dtoEmployee.setDesignation(employee.getDesignation());
		dtoEmployee.setDob(ScDateUtil.dateToString(employee.getDob()));
		dtoEmployee.setEmail(employee.getEmail());
		dtoEmployee.setMobileNo(employee.getMobileNo());
		dtoEmployee.setEmployeeType(employee.getEmployeeType());
		dtoEmployee.setFirstName(employee.getFirstName());
		dtoEmployee.setJoiningDate(ScDateUtil.dateToString(employee.getJoiningDate()));
		dtoEmployee.setLastName(employee.getLastName());
		dtoEmployee.setMiddleName(employee.getMiddleName());
		dtoEmployee.setStatus(employee.getStatus());
		dtoEmployee.setGender(employee.getGender());

		ScAddress permanentAddress = employee.getPermanentAddress();
		if (ScUtil.isAllPresent(permanentAddress)) {

			Address permAddDto = new Address();
			permAddDto.setCountry(permanentAddress.getCountry());
			permAddDto.setDistrict(permanentAddress.getDistrict());
			permAddDto.setFirstLine(permanentAddress.getFirstLine());
			permAddDto.setId(permanentAddress.getId());
			permAddDto.setSecondLine(permanentAddress.getSecondLine());
			permAddDto.setState(permanentAddress.getState());
			dtoEmployee.setPermanentAddress(permAddDto);

		}

		ScAddress correspondentAddress = employee.getCorrespondentAddress();
		if (ScUtil.isAllPresent(correspondentAddress)) {

			Address corrAddrDto = new Address();

			corrAddrDto.setCountry(correspondentAddress.getCountry());
			corrAddrDto.setDistrict(correspondentAddress.getDistrict());
			corrAddrDto.setFirstLine(correspondentAddress.getFirstLine());
			corrAddrDto.setId(correspondentAddress.getId());
			corrAddrDto.setSecondLine(correspondentAddress.getSecondLine());
			corrAddrDto.setState(correspondentAddress.getState());

			dtoEmployee.setCorrespondentAddress(corrAddrDto);
		}

		ScPersonalInfo personalInfo = employee.getPersonalInfo();
		if (ScUtil.isAllPresent(personalInfo)) {

			PersonalInfo pcInfoDto = new PersonalInfo();
			
			pcInfoDto.setAadharCardDoc(setDocDtoDoc(personalInfo.getAadharCardDoc()));
			pcInfoDto.setDrivingLicenceDoc(setDocDtoDoc(personalInfo.getDrivingLicenceDoc()));
			pcInfoDto.setPanCardDoc(setDocDtoDoc(personalInfo.getPanCardDoc()));
			pcInfoDto.setVoterIdDoc(setDocDtoDoc(personalInfo.getVoterIdDoc()));
			pcInfoDto.setxCertDoc(setDocDtoDoc(personalInfo.getxCertDoc()));
			pcInfoDto.setxIICertDoc(setDocDtoDoc(personalInfo.getxIICertDoc()));
			pcInfoDto.setGraduationCertDoc(setDocDtoDoc(personalInfo.getGraduationCertDoc()));
			pcInfoDto.setPostGraduationCertDoc(setDocDtoDoc(personalInfo.getPostGraduationCertDoc()));
			
			pcInfoDto.setAadharCard(personalInfo.getAadharCard());
			pcInfoDto.setDrivingLicence(personalInfo.getDrivingLicence());
			pcInfoDto.setId(personalInfo.getId());
			pcInfoDto.setPanCard(personalInfo.getPanCard());
			pcInfoDto.setVoterId(personalInfo.getVoterId());

			dtoEmployee.setPersonalInfo(pcInfoDto);
		}

		ScAcademicBackground highestQualification = employee.getHighestQualification();
		if (ScUtil.isAllPresent(highestQualification)) {

			AcademicBackground acaBg = new AcademicBackground();
			acaBg.setBoard(highestQualification.getBoard());
			acaBg.setId(highestQualification.getId());
			acaBg.setHighestQualification(highestQualification.getHighestQualification());
			acaBg.setName(highestQualification.getName());
			acaBg.setPassOutYear(ScDateUtil.dateToString(highestQualification.getPassOutYear()));
			acaBg.setSchoolInstitue(highestQualification.getSchoolInstitue());
			acaBg.setScore(highestQualification.getScore());
			acaBg.setStartYear(ScDateUtil.dateToString(highestQualification.getStartYear()));

			dtoEmployee.setHighestQualification(acaBg);
		}

		ScEmployeeHistory lastEmployeeHistory = employee.getLastEmployeeHistory();
		if (ScUtil.isAllPresent(lastEmployeeHistory)) {

			EmployeeHistory empHistoryDto = new EmployeeHistory();
			empHistoryDto.setAddress(lastEmployeeHistory.getAddress());
			empHistoryDto.setDesignation(lastEmployeeHistory.getDesignation());
			empHistoryDto.setEmployerName(lastEmployeeHistory.getEmployerName());
			empHistoryDto.setStartDate(ScDateUtil.dateToString(lastEmployeeHistory.getStartDate()));
			empHistoryDto.setId(lastEmployeeHistory.getId());
			empHistoryDto.setEndDate(ScDateUtil.dateToString(lastEmployeeHistory.getEndDate()));

			dtoEmployee.setLastEmployeeHistory(empHistoryDto);
		}

		return dtoEmployee;
	}

	private Document setDocDtoDoc(ScDocument aadharCardDoc) {
		if(ScUtil.isAllPresent(aadharCardDoc)) {
			Document doc = new Document();
			doc.setId(aadharCardDoc.getId());
			String docUrl = "/document/"+doc.getId()+"/view";
			doc.setDocUrl(docUrl);
			return doc;
		}
		return null;
	}

	public ActionResponse createOrUpdateEmployee(Employee employeeDto, Long id) {
		ActionResponse res = new ActionResponse();

		ScEmployee employee = new ScEmployee();

		if (ScUtil.isAllPresent(id))
			employee = commonService.findById(id, ScEmployee.class);

		if (!ScUtil.isAllPresent(employee))
			throw new NotFoundException("No users can be found !");

		employee.setId(employeeDto.getId());
		employee.setDesignation(employeeDto.getDesignation());
		employee.setDob(ScDateUtil.stringToDate(employeeDto.getDob()));
		employee.setEmail(employeeDto.getEmail());
		employee.setMobileNo(employeeDto.getMobileNo());
		employee.setEmployeeType(employeeDto.getEmployeeType());
		employee.setFirstName(employeeDto.getFirstName());
		employee.setJoiningDate(ScDateUtil.stringToDate(employeeDto.getJoiningDate()));
		employee.setLastName(employeeDto.getLastName());
		employee.setMiddleName(employeeDto.getMiddleName());
		employee.setStatus(employeeDto.getStatus());
		employee.setGender(employeeDto.getGender());

		Address permAddDto = employeeDto.getPermanentAddress();
		if (ScUtil.isAllPresent(permAddDto)) {

			ScAddress permanentAddress = new ScAddress();
			permanentAddress.setCountry(permAddDto.getCountry());
			permanentAddress.setDistrict(permAddDto.getDistrict());
			permanentAddress.setFirstLine(permAddDto.getFirstLine());
			permanentAddress.setId(permAddDto.getId());
			permanentAddress.setSecondLine(permAddDto.getSecondLine());
			permanentAddress.setState(permAddDto.getState());
			employee.setPermanentAddress(permanentAddress);

		}

		Address corrAddrDto = employeeDto.getCorrespondentAddress();
		if (ScUtil.isAllPresent(corrAddrDto)) {

			ScAddress correspondentAddress = new ScAddress();
			correspondentAddress.setCountry(corrAddrDto.getCountry());
			correspondentAddress.setDistrict(corrAddrDto.getDistrict());
			correspondentAddress.setFirstLine(corrAddrDto.getFirstLine());
			correspondentAddress.setId(corrAddrDto.getId());
			correspondentAddress.setSecondLine(corrAddrDto.getSecondLine());
			correspondentAddress.setState(corrAddrDto.getState());
			employee.setCorrespondentAddress(correspondentAddress);
		}

		PersonalInfo pcInfoDto = employeeDto.getPersonalInfo();
		if (ScUtil.isAllPresent(pcInfoDto)) {

			
			
			ScPersonalInfo personalInfo = employee.getPersonalInfo();
			
			if (!ScUtil.isAllPresent(personalInfo))
				personalInfo = new ScPersonalInfo();

			personalInfo.setAadharCard(pcInfoDto.getAadharCard());
			personalInfo.setDrivingLicence(pcInfoDto.getDrivingLicence());
			personalInfo.setId(pcInfoDto.getId());
			personalInfo.setPanCard(pcInfoDto.getPanCard());
			personalInfo.setVoterId(pcInfoDto.getVoterId());

			employee.setPersonalInfo(personalInfo);
			employee.getPersonalInfo().setPersonalInfoEmployee(employee);
		}

		EmployeeHistory lastEmployeeHistoryDto = employeeDto.getLastEmployeeHistory();
		if (ScUtil.isAllPresent(lastEmployeeHistoryDto)) {

			ScEmployeeHistory empHistory = new ScEmployeeHistory();
			empHistory.setAddress(lastEmployeeHistoryDto.getAddress());
			empHistory.setDesignation(lastEmployeeHistoryDto.getDesignation());
			empHistory.setEmployerName(lastEmployeeHistoryDto.getEmployerName());
			empHistory.setStartDate(ScDateUtil.stringToDate(lastEmployeeHistoryDto.getStartDate()));
			empHistory.setId(lastEmployeeHistoryDto.getId());
			empHistory.setEndDate(ScDateUtil.stringToDate(lastEmployeeHistoryDto.getEndDate()));

			employee.setLastEmployeeHistory(empHistory);
			employee.getLastEmployeeHistory().setLastEmployeeHistoryEmployee(employee);
		}

		AcademicBackground highestQualificationDto = employeeDto.getHighestQualification();
		if (ScUtil.isAllPresent(highestQualificationDto)) {

			ScAcademicBackground academicBackground = new ScAcademicBackground();
			academicBackground.setBoard(highestQualificationDto.getBoard());
			academicBackground.setId(highestQualificationDto.getId());
			academicBackground.setHighestQualification(highestQualificationDto.getHighestQualification());
			academicBackground.setName(highestQualificationDto.getName());
			academicBackground.setPassOutYear(ScDateUtil.stringToDate(highestQualificationDto.getPassOutYear()));
			academicBackground.setSchoolInstitue(highestQualificationDto.getSchoolInstitue());
			academicBackground.setScore(highestQualificationDto.getScore());
			academicBackground.setStartYear(ScDateUtil.stringToDate(highestQualificationDto.getStartYear()));

			employee.setHighestQualification(academicBackground);
			employee.getHighestQualification().setHighestQualificationEmployee(employee);
		}
		employee = commonService.save(employee);
		createOrUpdateEmployeeSalary(employee);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setActionMessage(employee.getId().toString());
		return res;
	}

	private void createOrUpdateEmployeeSalary(ScEmployee employee) {
		Long empId = employee.getId();

		ArrayList<Filter> filters = new ArrayList<>();
		filters.add(new Filter("employee", Operator.EQUAL, FieldType.NUMBER, empId));

		ScEmployeeSalary employeeSalary = commonService.findOne(filters, ScEmployeeSalary.class);
		if (!ScUtil.isAllPresent(employeeSalary))
			employeeSalary = new ScEmployeeSalary();
		employeeSalary.setEmployee(employee);

		commonService.save(employeeSalary);
	}

	public ActionResponse deleteEmployee(Long id) {
		ActionResponse res = new ActionResponse();

		ScEmployee employee = commonService.findById(id, ScEmployee.class);

		if (!ScUtil.isAllPresent(employee))
			throw new NotFoundException("No users can be found !");

		deleteEmployeeSalary(id);
		commonService.delete(employee);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		return res;
	}

	private void deleteEmployeeSalary(Long id) {
		ArrayList<Filter> filters = new ArrayList<>();
		filters.add(new Filter("employee", Operator.EQUAL, FieldType.NUMBER, id));

		ScEmployeeSalary employeeSalary = commonService.findOne(filters, ScEmployeeSalary.class);
		if (ScUtil.isAllPresent(employeeSalary))
			commonService.delete(employeeSalary);
	}

	public ActionResponse updateDocument(Long id, MultipartFile file, String documentBodyStr) {

		ActionResponse res = new ActionResponse();

		try {
			
			ObjectMapper objMapper = new ObjectMapper();
			DocumentBody documentBody = objMapper.readValue(documentBodyStr, DocumentBody.class);
			
			ScDocument store = tempUploadService.store(file, documentBody, id);
			res.setActionMessage(store.getId().toString());
			
		} catch (Exception e) {
			throw new InternalServerException(e.getMessage());
		}

		res.setApiMessage(ApiUtil.okMessage("Success"));

		return res;
	}

}
