package com.hamitmizrak.bussiness.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

//DTO ==> validation
public class UserRegisterDto {

    private Long id;
    @NotNull(message = "{register.username.validation.constraints.NotNull.message}")
    private String username;

    @NotNull(message = "{register.email.validation.constraints.NotNull.message}")
    @Email
    @Size(max = 200)
    private String email;

    @NotNull(message = "{register.password.validation.constraints.NotNull.message}")
    //@Pattern(message = "{register.password.pattern.validation.constraints.NotNull.message}")
    private String password;
}
