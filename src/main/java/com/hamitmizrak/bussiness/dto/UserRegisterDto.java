package com.hamitmizrak.bussiness.dto;
import com.hamitmizrak.annotation.UserRegisterUniqueEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.Date;
//Lombok
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
//DTO ==> validation
public class UserRegisterDto implements Serializable {

    //serileştirme
    public static final long serialVersionUID = 1L;

    // ID
    private Long id;

    // USERNAME
    @NotNull(message = "{register.username.validation.constraints.NotNull.message}")
    private String uname;

    // EMAIL
    @NotNull(message = "{register.email.validation.constraints.NotNull.message}")
    @Email
    @Size(max = 200)
    @UserRegisterUniqueEmail
    private String email;

    private String update;

    // PASSWORD
    // Json create yapıldığı görünmez yapmak için ancak validation sıkıntı oluyor. 404 hatası döner
    // @JsonIgnore yerine @JsonView yazabiliriz.
    @NotNull(message = "{register.password.validation.constraints.NotNull.message}")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).*$", message = "{register.password.pattern.validation.constraints.NotNull.message}")
    @Size(min =7,max=30 )
    private String passwd;

    // Kullanıcı aktif mi pasif mi
    private String check;

    // Sistem tarihi almak
    private Date createdDate;
}
