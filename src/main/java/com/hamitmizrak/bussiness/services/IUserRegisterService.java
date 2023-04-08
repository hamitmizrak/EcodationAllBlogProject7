package com.hamitmizrak.bussiness.services;

import com.hamitmizrak.bussiness.dto.UserRegisterDto;
import com.hamitmizrak.data.entity.UserRegisterEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;

public interface IUserRegisterService {

    //PROFILE
    public String getProfile(String name);

    //Header Information
    public void getAllHeaderData(Map<String,String> headers);

    //App Information
    ResponseEntity<?> getAppInformation(HttpServletRequest request, HttpServletResponse response);

    //MODEL MAPPER
    public UserRegisterDto EntityToDto( UserRegisterEntity userRegisterEntity  );
    public UserRegisterEntity DtoToEntity(UserRegisterDto userRegisterDto);

    // CREATE
    public UserRegisterDto createRegister(UserRegisterDto userRegisterDto);

    // LIST
    public List<UserRegisterDto>  getAllRegisters();

    // FIND
    public UserRegisterDto  getFindByRegister(Long id);

    // DELETE
    public Map<String,Boolean>  deleteRegister(Long id);

    // UPDATE
    public UserRegisterDto  updateRegister(Long id,UserRegisterDto userRegisterDto);

}
