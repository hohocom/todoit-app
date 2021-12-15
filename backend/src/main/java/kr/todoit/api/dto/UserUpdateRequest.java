package kr.todoit.api.dto;

import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import kr.todoit.api.exception.ValidExceptionType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
public class UserUpdateRequest {
    private Long id;
    private String nickname;
    private MultipartFile profileImg;

    public boolean checkNickname() {
        if(nickname == null || nickname.equals("") || nickname.equals(" ")){
            return false;
        }
        return true;
    }

    public boolean checkProfileImg(){
        if(profileImg == null){
            return false;
        }
        if(profileImg.isEmpty()){
            return false;
        }
        return true;
    }
}
