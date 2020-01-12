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
import com.ls.myschool.dto.student.Student;
import com.ls.myschool.dto.student.StudentResponse;
import com.ls.myschool.dto.student.StudentsResponse;
import com.ls.myschool.service.ScStudentService;

@RestController
@RequestMapping("/students")
public class ScStudentController {

	@Autowired
	private ScStudentService studentService;

	@GetMapping
	public StudentsResponse findAllStudents() {
		return studentService.findAllStudents();
	}

	@GetMapping(value = "/{id}")
	public StudentResponse findStudent(@PathVariable("id") Long id) {
		return studentService.findStudent(id);
	}

	@PostMapping
	public ActionResponse createStudent(@RequestBody Student student) {
		return studentService.createOrUpdateStudent(student, null);
	}

	@PutMapping(value = "/{id}")
	public ActionResponse updateStudent(@RequestBody Student student, @PathVariable("id") Long id) {
		return studentService.createOrUpdateStudent(student, id);
	}

	@DeleteMapping(value = "/{id}")
	public ActionResponse deleteStudent(@PathVariable("id") Long id) {
		return studentService.deleteStudent(id);
	}
}
