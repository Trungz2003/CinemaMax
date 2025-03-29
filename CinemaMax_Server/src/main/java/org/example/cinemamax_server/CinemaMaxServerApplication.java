package org.example.cinemamax_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CinemaMaxServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinemaMaxServerApplication.class, args);
	}

}
