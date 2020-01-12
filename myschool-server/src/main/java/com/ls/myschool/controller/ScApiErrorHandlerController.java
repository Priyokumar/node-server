package com.ls.myschool.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.ls.myschool.dto.error.BadRequestException;
import com.ls.myschool.dto.error.ErrorDetails;
import com.ls.myschool.dto.error.InternalServerException;
import com.ls.myschool.dto.error.NotFoundException;

@ControllerAdvice
@RestController
public class ScApiErrorHandlerController extends ResponseEntityExceptionHandler {

	@ExceptionHandler(NotFoundException.class)
	public final ResponseEntity<ErrorDetails> handleNotFoundException(NotFoundException ex, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(ex.getCode(), ex.getDetail(), ex.getStatus());
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(InternalServerException.class)
	public final ResponseEntity<ErrorDetails> handleInternalServerErrorException(InternalServerException ex,
			WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(ex.getCode(), ex.getDetail(), ex.getStatus());
		return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(BadRequestException.class)
	public final ResponseEntity<ErrorDetails> handleBadRequestException(BadRequestException ex,
			WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(ex.getCode(), ex.getDetail(), ex.getStatus());
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}

}
