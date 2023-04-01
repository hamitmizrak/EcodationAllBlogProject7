package com.hamitmizrak.bussiness.dto;

import com.hamitmizrak.annotation.UserRegisterUniqueEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.Date;

//DTO ==> validation
public class UserRegisterDto {

    //ID
    private Long id;

    //USERNAME
    @NotNull(message = "{register.username.validation.constraints.NotNull.message}")
    private String username;

    //EMAIL
    @NotNull(message = "{register.email.validation.constraints.NotNull.message}")
    @Email
    @Size(max = 200)
    @UserRegisterUniqueEmail
    private String email;

    //PASSWORD
    @NotNull(message = "{register.password.validation.constraints.NotNull.message}")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).*$", message = "{register.password.pattern.validation.constraints.NotNull.message}")
    @Size(min =7,max=30 )
    private String password;

    //Kullanıcı aktif mi pasif mi
    private boolean isActive=false;

    //Sistem tarihi almak
    private Date createdDate;
}
