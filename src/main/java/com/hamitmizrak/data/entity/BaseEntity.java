package com.hamitmizrak.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

//lombok
@Data
@NoArgsConstructor
@AllArgsConstructor

//super
@MappedSuperclass

//audit
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {""},allowGetters = true)
abstract   public class BaseEntity {

    //ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",updatable = false,nullable = false)
    private Long id;

    //Tarihi otomatik sisteme ekleme
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date systemCreatedDate;

    //AUDITING
    // Kim ekledi ?
    @Column(name = "created_by")
    @CreatedBy
    private String createdBy;

    // Kim ne zaman ekledi ?
    @Column(name = "created_date")
    @CreatedDate
    private Date createdDate;

    // Kim güncelledi ?
    @Column(name = "update_by")
    @LastModifiedBy
    private String updateBy;

    // Kim ne zaman güncelledi ?
    @Column(name = "update_date")
    @LastModifiedDate
    private Date updateDate;
}
