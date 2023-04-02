package com.hamitmizrak.controller;

import com.hamitmizrak.bussiness.dto.UserRegisterDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface IUserRegisterApi {

    //PROFILE
    public String getProfile(String name);

    //Header Information
    public void getAllHeaderData(Map<String,String> headers);

    //App Information
    ResponseEntity<?> getAppInformation(HttpServletRequest request, HttpServletResponse response);

    //SpeedData

    //ROOT
    public String getRoot();


    //CREATE
    public ResponseEntity<UserRegisterDto> createRegister(UserRegisterDto userRegisterDto);

    //LIST
    public ResponseEntity<List<UserRegisterDto>> getAllRegisters();

    //FIND
    public ResponseEntity<?>  getFindByRegister(Long id);

    //DELETE
    public ResponseEntity<Map<String,Boolean>>  deleteRegister(Long id);

    //UPDATE
    public ResponseEntity<UserRegisterDto>  updateRegister(Long id,UserRegisterDto userRegisterDto);
}
