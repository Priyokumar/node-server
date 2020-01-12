package com.ls.myschool.dto.student;

import com.ls.myschool.entity.student.ScStudentClass;

public class StudentSubject {

	private Long id;

	private String subjectCode;

	private String subjectName;

	private ScStudentClass standard;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSubjectCode() {
		return subjectCode;
	}

	public void setSubjectCode(String subjectCode) {
		this.subjectCode = subjectCode;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	public ScStudentClass getStandard() {
		return standard;
	}

	public void setStandard(ScStudentClass standard) {
		this.standard = standard;
	}

}
