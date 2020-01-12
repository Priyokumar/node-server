package com.ls.myschool.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ls.myschool.dto.ActionResponse;
import com.ls.myschool.dto.ApiUtil;
import com.ls.myschool.dto.employee.Address;
import com.ls.myschool.dto.error.NotFoundException;
import com.ls.myschool.dto.student.Student;
import com.ls.myschool.dto.student.StudentGuardian;
import com.ls.myschool.dto.student.StudentResponse;
import com.ls.myschool.dto.student.StudentsResponse;
import com.ls.myschool.entity.employee.ScAddress;
import com.ls.myschool.entity.student.ScStudent;
import com.ls.myschool.entity.student.ScStudentGuardian;
import com.ls.myschool.service.common.CommonService;
import com.ls.myschool.util.ScDateUtil;
import com.ls.myschool.util.ScUtil;

@Service
public class ScStudentService {

	@Autowired
	private CommonService commonService;

	public StudentsResponse findAllStudents() {

		StudentsResponse res = new StudentsResponse();

		List<ScStudent> students = commonService.findAll(ScStudent.class);
		if (!ScUtil.isAllPresent(students))
			throw new NotFoundException("No Students can be found !");

		List<Student> dtoStudents = new ArrayList<>();
		students.forEach(student -> {
			dtoStudents.add(setStudentToDto(student));
		});

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoStudents);
		return res;
	}

	public StudentResponse findStudent(Long id) {

		StudentResponse res = new StudentResponse();
		ScStudent student = commonService.findById(id, ScStudent.class);

		if (!ScUtil.isAllPresent(student))
			throw new NotFoundException("No Student can be found !");

		Student studentDto = setStudentToDto(student);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(studentDto);

		return res;
	}

	public ActionResponse createOrUpdateStudent(Student dtoStudent, Long id) {

		ActionResponse res = new ActionResponse();

		ScStudent student = setDtoToStudent(dtoStudent, id);

		commonService.save(student);

		String message = "";
		if (ScUtil.isAllPresent(id)) {
			message = "Successfully updated the student registration's data";
			res.setApiMessage(ApiUtil.okMessage(message));
		} else {
			message = "Successfully created a student registration";
			res.setApiMessage(ApiUtil.createdMessage(message));
			res.setActionMessage(message);
		}

		return res;
	}

	public ActionResponse deleteStudent(Long id) {

		ActionResponse res = new ActionResponse();

		ScStudent student = commonService.findById(id, ScStudent.class);

		if (!ScUtil.isAllPresent(student))
			throw new NotFoundException("No student can be found !");

		commonService.delete(student);

		res.setActionMessage("Student has been deleted successfully");
		res.setApiMessage(ApiUtil.okMessage("Student has been deleted successfully"));
		return res;
	}

	public Student setStudentToDto(ScStudent student) {

		Student studentDto = new Student();

		studentDto.setRegistrationDate(ScDateUtil.dateToString(student.getRegistrationDate()));
		studentDto.setRegistrationNo(student.getRegistrationNo());
		studentDto.setRegistrationStatus(student.getRegistrationStatus());

		studentDto.setAge(student.getAge());
		studentDto.setDob(ScDateUtil.dateToString(student.getDob()));
		studentDto.setFirstName(student.getFirstName());
		studentDto.setId(student.getId());
		studentDto.setJoiningDate(ScDateUtil.dateToString(student.getJoiningDate()));
		studentDto.setLastName(student.getLastName());
		studentDto.setMiddleName(student.getMiddleName());
		studentDto.setRollNo(student.getRollNo());
		studentDto.setStandard(student.getStandard());
		studentDto.setBloodGroup(student.getBloodGroup());
		studentDto.setCommunity(student.getCommunity());
		studentDto.setGender(student.getGender());
		studentDto.setNationality(student.getNationality());
		studentDto.setPhysicallyChallenged(student.getPhysicallyChallenged());
		studentDto.setReligion(student.getReligion());
		studentDto.setSameAsPermAddr(student.getSameAsPermAddr());

		ScAddress permanentAddress = student.getPermanentAddress();
		if (ScUtil.isAllPresent(permanentAddress)) {
			Address permAddDto = new Address();
			permAddDto.setCountry(permanentAddress.getCountry());
			permAddDto.setDistrict(permanentAddress.getDistrict());
			permAddDto.setFirstLine(permanentAddress.getFirstLine());
			permAddDto.setId(permanentAddress.getId());
			permAddDto.setSecondLine(permanentAddress.getSecondLine());
			permAddDto.setState(permanentAddress.getState());
			studentDto.setPermanentAddress(permAddDto);
		}

		ScAddress correspondentAddress = student.getCorrespondentAddress();
		if (ScUtil.isAllPresent(correspondentAddress)) {
			Address corrAddrDto = new Address();
			corrAddrDto.setCountry(correspondentAddress.getCountry());
			corrAddrDto.setDistrict(correspondentAddress.getDistrict());
			corrAddrDto.setFirstLine(correspondentAddress.getFirstLine());
			corrAddrDto.setId(correspondentAddress.getId());
			corrAddrDto.setSecondLine(correspondentAddress.getSecondLine());
			corrAddrDto.setState(correspondentAddress.getState());
			studentDto.setCorrespondentAddress(corrAddrDto);
		}

		ScStudentGuardian fatherInfo = student.getFatherInfo();
		if (ScUtil.isAllPresent(fatherInfo)) {
			StudentGuardian fatherDto = new StudentGuardian();
			fatherDto.setContactNo(fatherInfo.getContactNo());
			fatherDto.setDob(ScDateUtil.dateToString(fatherInfo.getDob()));
			fatherDto.setId(fatherInfo.getId());
			fatherDto.setName(fatherInfo.getName());
			studentDto.setFatherInfo(fatherDto);
		}

		ScStudentGuardian motherInfo = student.getMotherInfo();
		if (ScUtil.isAllPresent(motherInfo)) {
			StudentGuardian motherInfoDto = new StudentGuardian();
			motherInfoDto.setContactNo(fatherInfo.getContactNo());
			motherInfoDto.setDob(ScDateUtil.dateToString(fatherInfo.getDob()));
			motherInfoDto.setId(fatherInfo.getId());
			motherInfoDto.setName(fatherInfo.getName());
			studentDto.setMotherInfo(motherInfoDto);
		}

		ScStudentGuardian guardianInfo = student.getGuardianInfo();
		if (ScUtil.isAllPresent(guardianInfo)) {
			StudentGuardian guardianInfoDto = new StudentGuardian();
			guardianInfoDto.setContactNo(fatherInfo.getContactNo());
			guardianInfoDto.setDob(ScDateUtil.dateToString(fatherInfo.getDob()));
			guardianInfoDto.setId(fatherInfo.getId());
			guardianInfoDto.setName(fatherInfo.getName());
			studentDto.setGuardianInfo(guardianInfoDto);
		}

		return studentDto;
	}

	public ScStudent setDtoToStudent(Student studentDto, Long id) {

		ScStudent student = new ScStudent();

		if (ScUtil.isAllPresent(id))
			student = commonService.findById(id, ScStudent.class);

		if (!ScUtil.isAllPresent(student))
			throw new NotFoundException("No student can be found !");

		if (ScUtil.isAllPresent(student.getId())) {
			student.setRegistrationStatus(studentDto.getRegistrationStatus());
		} else {
			student.setRegistrationNo(ScUtil.getGeneratedNumber("REG"));
			student.setRegistrationStatus("SUBMITTED");
			student.setRegistrationDate(new Date());
		}

		student.setDob(ScDateUtil.stringToDate(studentDto.getDob()));
		student.setFirstName(studentDto.getFirstName());
		student.setId(studentDto.getId());
		student.setJoiningDate(ScDateUtil.stringToDate(studentDto.getJoiningDate()));
		student.setLastName(studentDto.getLastName());
		student.setMiddleName(studentDto.getMiddleName());
		student.setRollNo(studentDto.getRollNo());
		student.setStandard(studentDto.getStandard());
		student.setReligion(studentDto.getReligion());

		student.setBloodGroup(studentDto.getBloodGroup());
		student.setCommunity(studentDto.getCommunity());
		student.setGender(studentDto.getGender());
		student.setNationality(studentDto.getNationality());
		student.setPhysicallyChallenged(studentDto.getPhysicallyChallenged());
		
		student.setSameAsPermAddr(studentDto.getSameAsPermAddr());

		Address permAddDto = studentDto.getPermanentAddress();
		if (ScUtil.isAllPresent(permAddDto)) {

			ScAddress permanentAddress = new ScAddress();
			if (ScUtil.isAllPresent(student.getPermanentAddress()))
				permanentAddress = student.getPermanentAddress();
			permanentAddress.setCountry(permAddDto.getCountry());
			permanentAddress.setDistrict(permAddDto.getDistrict());
			permanentAddress.setFirstLine(permAddDto.getFirstLine());
			//permanentAddress.setId(permAddDto.getId());
			permanentAddress.setSecondLine(permAddDto.getSecondLine());
			permanentAddress.setState(permAddDto.getState());

			if (!ScUtil.isAllPresent(student.getPermanentAddress()))
				student.setPermanentAddress(permanentAddress);
		}

		Address corrAddrDto = studentDto.getCorrespondentAddress();
		if (ScUtil.isAllPresent(corrAddrDto)) {

			ScAddress correspondentAddress = new ScAddress();
			if (ScUtil.isAllPresent(student.getCorrespondentAddress()))
				correspondentAddress = student.getCorrespondentAddress();
			correspondentAddress.setCountry(corrAddrDto.getCountry());
			correspondentAddress.setDistrict(corrAddrDto.getDistrict());
			correspondentAddress.setFirstLine(corrAddrDto.getFirstLine());
			//correspondentAddress.setId(corrAddrDto.getId());
			correspondentAddress.setSecondLine(corrAddrDto.getSecondLine());
			correspondentAddress.setState(corrAddrDto.getState());

			if (!ScUtil.isAllPresent(student.getCorrespondentAddress()))
				student.setCorrespondentAddress(correspondentAddress);
		}

		StudentGuardian fatherInfoDto = studentDto.getFatherInfo();
		if (ScUtil.isAllPresent(fatherInfoDto)) {

			ScStudentGuardian guardian = new ScStudentGuardian();
			if (ScUtil.isAllPresent(student.getFatherInfo()))
				guardian = student.getFatherInfo();
			guardian.setContactNo(fatherInfoDto.getContactNo());
			guardian.setDob(ScDateUtil.stringToDate(fatherInfoDto.getDob()));
			// guardian.setId(fatherInfoDto.getId());
			guardian.setName(fatherInfoDto.getName());
			guardian.setRelationship(fatherInfoDto.getRelationship());

			if (!ScUtil.isAllPresent(student.getFatherInfo()))
				student.setFatherInfo(guardian);
		}

		StudentGuardian motherInfoDto = studentDto.getMotherInfo();
		if (ScUtil.isAllPresent(motherInfoDto)) {

			ScStudentGuardian guardian = new ScStudentGuardian();
			if (ScUtil.isAllPresent(student.getMotherInfo()))
				guardian = student.getMotherInfo();
			guardian.setContactNo(motherInfoDto.getContactNo());
			guardian.setDob(ScDateUtil.stringToDate(motherInfoDto.getDob()));
			// guardian.setId(motherInfoDto.getId());
			guardian.setName(motherInfoDto.getName());
			guardian.setRelationship(motherInfoDto.getRelationship());

			if (!ScUtil.isAllPresent(student.getMotherInfo()))
				student.setMotherInfo(guardian);
		}

		StudentGuardian guardianInfoDto = studentDto.getGuardianInfo();
		if (ScUtil.isAllPresent(guardianInfoDto)) {

			ScStudentGuardian guardian = new ScStudentGuardian();
			if (ScUtil.isAllPresent(student.getGuardianInfo()))
				guardian = student.getGuardianInfo();
			guardian.setContactNo(guardianInfoDto.getContactNo());
			guardian.setDob(ScDateUtil.stringToDate(guardianInfoDto.getDob()));
			// guardian.setId(guardianInfoDto.getId());
			guardian.setName(guardianInfoDto.getName());
			guardian.setRelationship(guardianInfoDto.getRelationship());

			if (!ScUtil.isAllPresent(student.getGuardianInfo()))
				student.setGuardianInfo(guardian);
		}

		return student;
	}

}
