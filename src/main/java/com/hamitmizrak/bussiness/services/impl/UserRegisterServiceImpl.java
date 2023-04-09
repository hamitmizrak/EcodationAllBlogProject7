package com.hamitmizrak.bussiness.services.impl;

import com.hamitmizrak.bean.ModelMapperBean;
import com.hamitmizrak.bean.PasswordEncoderBean;
import com.hamitmizrak.bussiness.dto.UserRegisterDto;
import com.hamitmizrak.bussiness.services.IUserRegisterService;
import com.hamitmizrak.data.entity.UserRegisterEntity;
import com.hamitmizrak.data.repository.IUserRegisterRepository;
import com.hamitmizrak.exception.ResourceNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

//lombok 2410 > 2739
@RequiredArgsConstructor
@Log4j2
//SneakyThrows

//Service: Asıl iş yükünü yapan class
@Service
public class UserRegisterServiceImpl implements IUserRegisterService {
    //Injection
    private final IUserRegisterRepository iUserRegisterRepository;
    private final ModelMapperBean modelMapperBean;
    private final PasswordEncoderBean passwordEncoderBean;

    //PROFILE
    @Override
    public String getProfile(String name) {
        return null;
    }

    //Header Information
    @Override
    public void getAllHeaderData(Map<String, String> headers) {

    }

    //App Information
    @Override
    public void getAppInformation(HttpServletRequest request, HttpServletResponse response) {

    }

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
            userRegisterDto.setPasswd(passwordEncoderBean.passwordEncoderMethod().encode(userRegisterDto.getPasswd()));
            UserRegisterEntity entityMapper = DtoToEntity(userRegisterDto);
            System.out.println(entityMapper.getCheck());
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
    public UserRegisterDto getFindByRegister(Long id) {
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
    public Map<String,Boolean>  deleteRegister(Long id) {
        UserRegisterEntity findEntity = iUserRegisterRepository.findById(id)
                //Lambda expression
                .orElseThrow(() -> new ResourceNotFoundException(id + " nolu id bulunamadı"));
        //Obje doluysa silsin
        Map<String,Boolean> deleteResponse=new LinkedHashMap<>();
        if(findEntity!=null){
            iUserRegisterRepository.delete(findEntity);
            deleteResponse.put("Silindi",Boolean.TRUE);
        }
        //Model Mapper: eğer aşağıdaki Object döndürmek istersen
        //UserRegisterDto findDto = EntityToDto(findEntity);
        return deleteResponse;
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
            findEntity.setUname(userRegisterDto.getUname());
            findEntity.setEmail(userRegisterDto.getEmail());
            findEntity.setCheck(userRegisterDto.getCheck());
            findEntity.setPasswd(passwordEncoderBean.passwordEncoderMethod().encode(findEntity.getPasswd()));
            iUserRegisterRepository.save(findEntity);
        }
        //Model Mapper
        UserRegisterDto findDto = EntityToDto(findEntity);
        return findDto;
    }
}
