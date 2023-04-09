package com.hamitmizrak.data.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

//lombok
@Data

//Entity
@Entity
@Table(name = "user_register")
public class UserRegisterEntity extends BaseEntity implements Serializable {
    //serileştirme
    public static final long serialVersionUID = 1L;

    //String => columnDefinition = "varchar(255) default 'adınızı girmediniz'"
    //INT    => columnDefinition = "integer default 44"
    @Column(name = "user_name", columnDefinition = "varchar(255) default 'adınızı girmediniz'")
    private String uname;

    //@Column(name ="user_email",unique = true)
    @Column(name = "user_email")
    private String email;

    @Column(name = "user_password", columnDefinition = "varchar(255) default 'Hm123456@'")
    private String passwd;

    @Column(name = "is_check", columnDefinition = "boolean default false")
    private String check;
}
