package com.hamitmizrak.bean;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

//PasswordEncoder: Kullanıcı Bilgilerini maskelemek
@Configuration
public class PasswordEncoderBean {

    @Bean
    public PasswordEncoder passwordEncoderMethod(){
        return  new BCryptPasswordEncoder();
    }
}
