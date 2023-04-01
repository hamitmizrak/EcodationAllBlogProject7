package com.hamitmizrak.bussiness.services.impl;

import com.hamitmizrak.bean.ModelMapperBean;
import com.hamitmizrak.bean.PasswordEncoderBean;
import com.hamitmizrak.bussiness.dto.UserRegisterDto;
import com.hamitmizrak.bussiness.services.IUserRegisterService;
import com.hamitmizrak.data.entity.UserRegisterEntity;
import com.hamitmizrak.data.repository.IUserRegisterRepository;
import com.hamitmizrak.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

//lombok
@RequiredArgsConstructor
@Log4j2
//SneakyThrows

//Service: Asıl iş yükünü yapan class
@Service
public class UserRegisterServiceImpl implements IUserRegisterService {
    private final IUserRegisterRepository iUserRegisterRepository;

    //Injection
    private final IUserRegisterService iUserRegisterService;
    private final ModelMapperBean modelMapperBean;
    private final PasswordEncoderBean passwordEncoderBean;

    // MODEL MAPPER
    @Override
    public UserRegisterDto EntityToDto(UserRegisterEntity userRegisterEntity) {
        return modelMapperBean.modelMapperMethod().map(userRegisterEntity, UserRegisterDto.class);
    }

    @Override
    public UserRegisterEntity DtoToEntity(UserRegisterDto userRegisterDto) {
        return modelMapperBean.modelMapperMethod().map(userRegisterDto, UserRegisterEntity.class);
    }

    // CREATE
    @Transactional //create delete update (manipulation)
    @Override
    public UserRegisterDto createRegister(UserRegisterDto userRegisterDto) {
        //eğer objenin içi doluysa
        if (userRegisterDto != null) {
            //sifreyi masklemek
            userRegisterDto.setPassword(passwordEncoderBean.passwordEncoderMethod().encode(userRegisterDto.getPassword()));
            UserRegisterEntity entityMapper = DtoToEntity(userRegisterDto);
            UserRegisterEntity userRegisterEntity = iUserRegisterRepository.save(entityMapper);
            //ID dönsün
            userRegisterDto.setId(userRegisterEntity.getId());
        }
        return userRegisterDto;
    }

    // LIST
    // @Transactional: select ve list için yazmama gerek yok
    @Override
    public List<UserRegisterDto> getAllRegisters() {
        Iterable<UserRegisterEntity> entityList = iUserRegisterRepository.findAll();
        //Entity Listesi , Dto Listesine cevir
        List<UserRegisterDto> dtoList = new ArrayList<>();
        for (UserRegisterEntity temp : entityList) {
            UserRegisterDto userRegisterDto = EntityToDto(temp);
            dtoList.add(userRegisterDto);
        }
        return dtoList;
    }

    // FIND
    // @Transactional: select ve list için yazmama gerek yok
    @Override
    public UserRegisterDto getFindByRegister(Long id, UserRegisterDto userRegisterDto) {
        //1.YOL
      /*
        Optional<UserRegisterEntity> findEntity= iUserRegisterRepository.findById(id);
        //Model Mapper
       UserRegisterDto findDto= EntityToDto(findEntity.get());
        // findEntity.isPresent() VEYA findEntity!=null
        if(findEntity.isPresent()){
            return findDto;
        }
        */

        //2.YOL
        UserRegisterEntity findEntity = iUserRegisterRepository.findById(id)
                //Lambda expression
                .orElseThrow(() -> new ResourceNotFoundException(id + " nolu id bulunamadı"));
        //Model Mapper
        UserRegisterDto findDto = EntityToDto(findEntity);
        return findDto;
    }

    // DELETE
    @Transactional
    @Override
    public UserRegisterDto deleteRegister(Long id) {
        UserRegisterEntity findEntity = iUserRegisterRepository.findById(id)
                //Lambda expression
                .orElseThrow(() -> new ResourceNotFoundException(id + " nolu id bulunamadı"));
        //Obje doluysa silsin
        if(findEntity!=null){
            iUserRegisterRepository.delete(findEntity);
        }
        //Model Mapper
        UserRegisterDto findDto = EntityToDto(findEntity);
        return findDto;
    }

    //UPDATE
    @Transactional
    @Override
    public UserRegisterDto updateRegister(Long id,UserRegisterDto userRegisterDto) {
        UserRegisterEntity findEntity = iUserRegisterRepository.findById(id)
                //Lambda expression
                .orElseThrow(() -> new ResourceNotFoundException(id + " nolu id bulunamadı"));
        //Obje doluysa silsin
        if(findEntity!=null){
            findEntity.setUsername(userRegisterDto.getUsername());
            findEntity.setEmail(userRegisterDto.getEmail());
            findEntity.setActive(userRegisterDto.isActive());
            findEntity.setPassword(passwordEncoderBean.passwordEncoderMethod().encode(findEntity.getPassword()));
            iUserRegisterRepository.save(findEntity);
        }
        //Model Mapper
        UserRegisterDto findDto = EntityToDto(findEntity);
        return findDto;
    }
}
