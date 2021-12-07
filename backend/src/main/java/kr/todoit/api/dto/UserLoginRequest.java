package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import javax.validation.constraints.NotNull;

@Setter
@Getter
@ToString
public class UserLoginRequest {
    @NotNull(message = "프로바이더타입은 필수값입니다. ex) KAKAO, NAVER")
    private String providerType;
    @NotNull(message = "엑세스토큰은 필수값입니다.")
    private String accessToken;
}
