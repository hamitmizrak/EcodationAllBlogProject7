package com.hamitmizrak.data.entity;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.Id;

//lombok
@Data

//Entity
@Entity
@Table(name = "user_register")
public class UserRegisterEntity extends  BaseEntity{

    //String => columnDefinition = "varchar(255) default 'adınızı girmediniz'"
    //INT    => columnDefinition = "integer default 44"
    @Column(name ="user_name",columnDefinition = "varchar(255) default 'adınızı girmediniz'")
    private String username;

    //@Column(name ="user_email",unique = true)
    @Column(name ="user_email")
    private String email;

    @Column(name ="user_password",columnDefinition = "varchar(255) default 'Hm123456@'")
    private String password;

    @Column(name ="is_active",columnDefinition = "boolean default false")
    private boolean isActive=false;
}
