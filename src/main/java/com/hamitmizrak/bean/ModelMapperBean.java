package com.hamitmizrak.bean;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//ModelMapper: Dto ile Data arasındaki değiştirme işlemini yapıyor
@Configuration
public class ModelMapperBean {

    @Bean
    public ModelMapper modelMapperMethod(){
        return new ModelMapper();
    }
}
