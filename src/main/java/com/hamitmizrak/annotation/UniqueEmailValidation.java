package com.hamitmizrak.annotation;

import com.hamitmizrak.bussiness.dto.UserRegisterDto;
import com.hamitmizrak.data.entity.UserRegisterEntity;
import com.hamitmizrak.data.repository.IUserRegisterRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

//lombok
//@RequiredArgsConstructor
@NoArgsConstructor
public class UniqueEmailValidation implements ConstraintValidator<UserRegisterUniqueEmail, String> {

    private String data="";
    public String result(String requestData){
        data=requestData;
        return data;
    }

    //1.YOL
    @Autowired
    IUserRegisterRepository iUserRegisterRepository;

    //2.YOL ==> Constructor Injection
   /* public UniqueEmailValidation(IUserRegisterRepository iUserRegisterRepository) {
        this.iUserRegisterRepository = iUserRegisterRepository;
    }*/

    //3.YOL ==> Lombok
  // private final  IUserRegisterRepository iUserRegisterRepository;

    public UniqueEmailValidation(IUserRegisterRepository iUserRegisterRepository) {
        this.iUserRegisterRepository = iUserRegisterRepository;
    }
    //final UserRegisterDto userRegisterDto;

    //Email addresinde database böyle bir email var mı yok mu
    public boolean isValid(String email, ConstraintValidatorContext context) {
        UserRegisterEntity userRegisterEntity = iUserRegisterRepository.findByEmail(email);
        System.out.println("Deneme 44");
        System.out.println(userRegisterEntity);
        //eğer bu email database varsa return false
        //System.out.println("Bilmem:"+userRegisterDto.isUpdate());
        if (userRegisterEntity != null ){
            return false;
        }
        return true;
    }
}
