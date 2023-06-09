package com.hamitmizrak;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import java.util.TimeZone;


// Mongo aktif etmek ici
// @EnableMongoRepositories

// auditorAware icin
// @EnableJpaAuditing(auditorAwareRef = "auditorAware")

// Aspect aktif etmek icin
// @EnableAspectJAutoProxy(proxyTargetClass = true)

// Asenkron açmak icin
// @EnableAsync

// Spring Boot Cache mekanizmasını aktif ediyorum
// @EnableCaching

//SECURITY EXCLUDE
@SpringBootApplication(exclude = {
        SecurityAutoConfiguration.class,
        //org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
        //org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration.class
}
)
//@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAwareMethod")

//SCAN
@EntityScan(basePackages = "com.hamitmizrak.data.entity") //Entity bulamadığı zaman
@EnableJpaRepositories(basePackages ="com.hamitmizrak.data.repository" ) //Repository bulamadığı zaman
public class EcodationAllBlogProject7Application {

    @PostConstruct
    public void init(){
        TimeZone.setDefault(TimeZone.getTimeZone("IST"));
    }

    //PSVM
    public static void main(String[] args) {
        // devtools active isActive
        // System.setProperty("spring.devtools.restart.enabled","true");

        //Disables headless JOptionPane
        System.setProperty("java.awt.headless", "false");

        //PSVM
        SpringApplication.run(EcodationAllBlogProject7Application.class, args);
    }
}
