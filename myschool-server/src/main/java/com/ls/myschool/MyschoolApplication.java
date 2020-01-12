package com.ls.myschool;

import javax.annotation.Resource;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ls.myschool.service.ScTempUploadService;

@SpringBootApplication
public class MyschoolApplication  implements CommandLineRunner {
	
	@Resource
	private ScTempUploadService tempUploadService;

	public static void main(String[] args) {
		SpringApplication.run(MyschoolApplication.class, args);
	}
	
	@Override
	public void run(String... arg) throws Exception {
		/*tempUploadService.deleteAll();
		tempUploadService.init();*/
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
