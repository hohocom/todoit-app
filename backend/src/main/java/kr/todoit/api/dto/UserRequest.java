package kr.todoit.api.dto;

import kr.todoit.api.controller.CustomException;
import kr.todoit.api.controller.ExceptionType;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.net.BindException;

@Getter
@ToString
public class UserRequest {
    private Long id;
    private String email;
    private String nickname;


    public void setEmail(String email) throws CustomException {
        System.out.println(email);
        if(email == null || email.equals("")){
            System.out.println("에러발생");
            throw new CustomException(ExceptionType.NOT_FOUND_USER);
        }
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
