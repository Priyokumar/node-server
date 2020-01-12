package com.ls.myschool.service;

import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ls.myschool.dto.ActionResponse;
import com.ls.myschool.dto.ApiUtil;
import com.ls.myschool.dto.admissionFee.Admission;
import com.ls.myschool.dto.admissionFee.AdmissionFeeResponse;
import com.ls.myschool.dto.admissionFee.AdmissionFeesResponse;
import com.ls.myschool.dto.admissionFee.Fee;
import com.ls.myschool.dto.admissionFee.FeesResponse;
import com.ls.myschool.dto.admissionFee.StudentBasicDetail;
import com.ls.myschool.dto.error.InternalServerException;
import com.ls.myschool.dto.error.NotFoundException;
import com.ls.myschool.entity.admissionfee.ScAdmission;
import com.ls.myschool.entity.admissionfee.ScFee;
import com.ls.myschool.entity.maintenance.ScMaintenanceAdmissionFee;
import com.ls.myschool.entity.student.ScStudent;
import com.ls.myschool.service.common.CommonService;
import com.ls.myschool.util.ScDateUtil;
import com.ls.myschool.util.ScUtil;
import com.ls.myschool.vo.ApiMessageType;
import com.ls.myschool.vo.FeeStatus;
import com.ls.myschool.vo.RefType;

@Service
public class ScAdmissionFeeService {

	@Autowired
	private CommonService commonService;

	@Autowired
	private ScMaintAdmissionFeeService maintAdmissionFeeService;

	public AdmissionFeesResponse findAllAdmissionFee() {

		AdmissionFeesResponse res = new AdmissionFeesResponse();

		List<ScAdmission> admissions = commonService.findAll(ScAdmission.class);
		if (!ScUtil.isAllPresent(admissions))
			throw new NotFoundException("No Admisions can be found !");

		List<Admission> dtoadmissions = new ArrayList<>();
		admissions.forEach(admission -> {
			Admission dtoAdmission = setAdmissionToDto(admission);
			dtoadmissions.add(dtoAdmission);
		});

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoadmissions);
		return res;
	}

	public AdmissionFeeResponse findAdmissionFee(Long id) {

		AdmissionFeeResponse res = new AdmissionFeeResponse();

		ScAdmission admission = commonService.findById(id, ScAdmission.class);

		if (!ScUtil.isAllPresent(admission))
			throw new NotFoundException("No student can be found !");

		Admission admissionDto = setAdmissionToDto(admission);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(admissionDto);

		return res;
	}

	public ActionResponse createOrUpdateAdmissionFee(Admission admissionDto, Long id) {

		ActionResponse res = new ActionResponse();
		ScAdmission admission = new ScAdmission();

		if (ScUtil.isAllPresent(id))
			admission = commonService.findById(id, ScAdmission.class);

		if (!ScUtil.isAllPresent(admission))
			throw new NotFoundException("No Admission can be found !");

		String academicYear = admissionDto.getAcademicYear();
		admission.setAcademicYear(academicYear);
		admission.setAdmissionAmount(admissionDto.getAdmissionAmount());
		admission.setAdmissionDate(ScDateUtil.now());

		if (!ScUtil.isAllPresent(admission.getId()))
			admission.setAdmissionRefNo(ScUtil.getGeneratedNumber("ADM"));

		admission.setDueAmount(admissionDto.getDueAmount());
		admission.setPaidAmount(admissionDto.getPaidAmount());
		admission.setPromiseToPayDate(ScDateUtil.stringToDate(admissionDto.getPromiseToPayDate()));
		admission.setStandard(admissionDto.getStandard());
		admission.setStatus(admissionDto.getStatus());

		StudentBasicDetail studentDto = admissionDto.getStudent();

		if (!ScUtil.isAllPresent(studentDto) || !ScUtil.isAllPresent(studentDto.getId()))
			throw new InternalServerException(
					ApiMessageType.INSUFFICIENT_DATA + " Student information cannot be found");

		Long studentId = studentDto.getId();
		ScStudent student = commonService.findById(studentId, ScStudent.class);
		admission.setStudent(student);

		if (!ScUtil.isAllPresent(student))
			throw new NotFoundException("No Student can be found !");

		if (!ScUtil.isAllPresent(id)) {
			List<ScFee> fees = generateFees(admissionDto.getStandard(), academicYear);
			admission.setFees(fees);
		}

		commonService.save(admission);
		String message = "";
		if (ScUtil.isAllPresent(id)) {

			message = "Successfully updated the Admission's data";
			res.setApiMessage(ApiUtil.okMessage(message));

		} else {

			message = "Successfully created a Admission";
			res.setApiMessage(ApiUtil.createdMessage(message));
			res.setActionMessage(message);
		}
		return res;
	}

	public ActionResponse deleteAdmissionFee(Long id) {

		ActionResponse res = new ActionResponse();

		ScAdmission admission = commonService.findById(id, ScAdmission.class);

		if (!ScUtil.isAllPresent(admission))
			throw new NotFoundException("No admission can be found !");

		commonService.delete(admission);

		res.setActionMessage("Admission has been deleted successfully");
		res.setApiMessage(ApiUtil.okMessage("Admission has been deleted successfully"));
		return res;
	}

	private Admission setAdmissionToDto(ScAdmission admission) {

		Admission dtoAdmission = new Admission();

		dtoAdmission.setAcademicYear(admission.getAcademicYear());
		dtoAdmission.setAdmissionAmount(admission.getAdmissionAmount());
		dtoAdmission.setAdmissionDate(ScDateUtil.dateToString(admission.getAdmissionDate()));
		dtoAdmission.setAdmissionRefNo(admission.getAdmissionRefNo());
		dtoAdmission.setDueAmount(admission.getDueAmount());
		dtoAdmission.setId(admission.getId());
		dtoAdmission.setPaidAmount(admission.getPaidAmount());
		dtoAdmission.setPromiseToPayDate(ScDateUtil.dateToString(admission.getPromiseToPayDate()));
		dtoAdmission.setStandard(admission.getStandard());
		dtoAdmission.setStatus(admission.getStatus());

		ScStudent student = admission.getStudent();
		if (ScUtil.isAllPresent(student)) {

			StudentBasicDetail studBasicDetail = new StudentBasicDetail();

			studBasicDetail.setRegistrationDate(ScDateUtil.dateToString(student.getRegistrationDate()));
			studBasicDetail.setRegistrationNo(student.getRegistrationNo());
			studBasicDetail.setRegistrationStatus(student.getRegistrationStatus());
			studBasicDetail.setFirstName(student.getFirstName());
			studBasicDetail.setId(student.getId());
			studBasicDetail.setLastName(student.getLastName());
			studBasicDetail.setMiddleName(student.getMiddleName());
			studBasicDetail.setRollNo(student.getRollNo());
			studBasicDetail.setStandard(student.getStandard());
			dtoAdmission.setStudent(studBasicDetail);
		}

		List<ScFee> fees = admission.getFees();
		if (ScUtil.isAllPresent(fees)) {

			List<Fee> dtoFees = new ArrayList<>();

			fees.forEach(fee -> {
				Fee dtoFee = new Fee();
				dtoFee.setActdateOfPayment(ScDateUtil.dateToString(fee.getActdateOfPayment()));
				dtoFee.setAmount(fee.getAmount());
				dtoFee.setExptdateOfPayment(ScDateUtil.dateToString(fee.getExptdateOfPayment()));
				dtoFee.setFeeRefNo(fee.getFeeRefNo());
				dtoFee.setId(fee.getId());
				dtoFee.setMonthOf(fee.getMonthOf());
				dtoFee.setStatus(fee.getStatus());
				dtoFees.add(dtoFee);
			});
			dtoAdmission.setFees(dtoFees);
		}
		return dtoAdmission;
	}

	public List<ScFee> generateFees(String standard,String year) {

		Double feeAmount = 0.0;

		ScMaintenanceAdmissionFee maintAdmissionFeeByStandard = maintAdmissionFeeService
				.getMaintAdmissionFeeByStandard(standard, year);
		if (ScUtil.isAllPresent(maintAdmissionFeeByStandard))
			feeAmount = maintAdmissionFeeByStandard.getFeeAmount();

		List<ScFee> fees = new ArrayList<>();
		Month[] months = Month.values();

		for (int i = 0; i < 12; i++) {

			ScFee fee = new ScFee();

			fee.setAmount(feeAmount);
			fee.setFeeRefNo(ScUtil.getGeneratedNumber(RefType.FEE));

			String date = "01";
			int monthInt = months[i].getValue();
			String month = "";
			if (monthInt < 10)
				month += "0" + monthInt;
			else
				month += monthInt;

			date = month + "/" + date + "/" + year;

			fee.setExptdateOfPayment(ScDateUtil.stringToDate(date));
			fee.setMonthOf(months[i].name());
			fee.setStatus(FeeStatus.NOT_PAID);

			fees.add(fee);
		}
		return fees;
	}

	public FeesResponse findFeesByStandard(String standard, String year) {

		FeesResponse res = new FeesResponse();

		List<ScFee> fees = generateFees(standard, year);
		if (!ScUtil.isAllPresent(fees))
			throw new NotFoundException("No fee can be found !");

		List<Fee> dtoFees = new ArrayList<>();
		fees.forEach(fee -> {
			Fee dtoFee = setFeeToDto(fee);
			dtoFees.add(dtoFee);
		});

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoFees);
		return res;
	}

	private Fee setFeeToDto(ScFee fee) {

		Fee dtoFee = new Fee();
		dtoFee.setActdateOfPayment(ScDateUtil.dateToString(fee.getActdateOfPayment()));
		dtoFee.setAmount(fee.getAmount());
		dtoFee.setExptdateOfPayment(ScDateUtil.dateToString(fee.getExptdateOfPayment()));
		dtoFee.setFeeRefNo(fee.getFeeRefNo());
		dtoFee.setId(fee.getId());
		dtoFee.setMonthOf(fee.getMonthOf());
		dtoFee.setStatus(fee.getStatus());

		return dtoFee;
	}
}
