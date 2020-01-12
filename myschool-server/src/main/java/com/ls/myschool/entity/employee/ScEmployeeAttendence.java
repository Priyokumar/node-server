package com.ls.myschool.entity.employee;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name = "SC_EMPLOYEE_ATTENDENCE")
public class ScEmployeeAttendence implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "SC_ID")
	private Long id;

	@Embedded
	private ScRecordAudit recordAudit = new ScRecordAudit();

	@Column(name = "att_date")
	private Date attDate;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "SC_EMPLOYEE_ATTENDENCE_REF", joinColumns = {
			@JoinColumn(name = "EMPLOYEE_ATTD_ID", referencedColumnName = "SC_ID") }, inverseJoinColumns = {
					@JoinColumn(name = "EMPLOYEE_ID", referencedColumnName = "SC_ID") })
	@Fetch(value = FetchMode.SUBSELECT)
	private List<ScEmployee> employees = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ScRecordAudit getRecordAudit() {
		return recordAudit;
	}

	public void setRecordAudit(ScRecordAudit recordAudit) {
		this.recordAudit = recordAudit;
	}

	public Date getAttDate() {
		return attDate;
	}

	public void setAttDate(Date attDate) {
		this.attDate = attDate;
	}

	public List<ScEmployee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<ScEmployee> employees) {
		this.employees = employees;
	}

}
