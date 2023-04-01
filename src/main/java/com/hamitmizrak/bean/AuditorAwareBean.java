package com.hamitmizrak.bean;

import com.hamitmizrak.audit.AuditorAwareImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

//AuditorAware: Sistemdeki kullanıcı loglama yapacak
@Configuration
public class AuditorAwareBean {

    @Bean
    public AuditorAware auditorAwareMethod(){
        return new AuditorAwareImpl();
    }
}
