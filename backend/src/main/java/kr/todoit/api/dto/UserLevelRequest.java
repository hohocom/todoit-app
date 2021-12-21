package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class UserLevelRequest {
    @NotBlank(message = "회원 아이디는 필수값입니다.")
    private Long id;
    @NotBlank(message = "경험치는 필수값입니다.")
    private Short exp;
}
