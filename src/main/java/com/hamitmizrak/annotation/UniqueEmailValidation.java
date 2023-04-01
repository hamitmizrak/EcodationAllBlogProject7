package com.hamitmizrak.annotation;

import com.hamitmizrak.data.entity.UserRegisterEntity;
import com.hamitmizrak.data.repository.IUserRegisterRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

//lombok
@RequiredArgsConstructor
public class UniqueEmailValidation implements ConstraintValidator<UserRegisterUniqueEmail, String> {

    //1.YOL
    //@Autowired
    //IUserRegisterRepository iUserRegisterRepository;

    //2.YOL ==> Constructor Injection
   /* public UniqueEmailValidation(IUserRegisterRepository iUserRegisterRepository) {
        this.iUserRegisterRepository = iUserRegisterRepository;
    }*/

    //3.YOL ==> Lombok
    final IUserRegisterRepository iUserRegisterRepository;

    //Email addresinde database böyle bir email var mı yok mu
    public boolean isValid(String email, ConstraintValidatorContext context) {
        UserRegisterEntity userRegisterEntity = iUserRegisterRepository.findByEmail(email);
        //eğer bu email database varsa return false
        if (userRegisterEntity != null){
            return false;
        }
        return true;
    }
}
