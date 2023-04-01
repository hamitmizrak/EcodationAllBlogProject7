package com.hamitmizrak.annotation;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(
        validatedBy = {UniqueEmailValidation.class}
)
public @interface UserRegisterUniqueEmail {
    String message() default "{register.email.unique.validation.constraints.NotNull.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
