package com.hamitmizrak.data.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

//lombok
@Data

//Entity
@Entity
@Table(name = "user_register")
public class UserRegisterEntity extends  BaseEntity{

    private String username;
    private String email;
    private String password;
}
