package com.hamitmizrak.bussiness.services;

import com.hamitmizrak.bussiness.dto.UserRegisterDto;
import com.hamitmizrak.data.entity.UserRegisterEntity;

import java.util.List;

public interface IUserRegisterService {

    //MODEL MAPPER
    public UserRegisterDto EntityToDto( UserRegisterEntity userRegisterEntity  );
    public UserRegisterEntity DtoToEntity(UserRegisterDto userRegisterDto);

    //CREATE
    public UserRegisterDto createRegister(UserRegisterDto userRegisterDto);

    //LIST
    public List<UserRegisterDto>  getAllRegisters();

    //FIND
    public UserRegisterDto  getFindByRegister(Long id,UserRegisterDto userRegisterDto);

    //DELETE
    public UserRegisterDto  deleteRegister(Long id);

    //UPDATE
    public UserRegisterDto  updateRegister(Long id,UserRegisterDto userRegisterDto);


}
