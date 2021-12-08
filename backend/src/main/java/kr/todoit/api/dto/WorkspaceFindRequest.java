package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class WorkspaceFindRequest {
    @NotNull(message = "회원번호는 필수값입니다.")
    private Long userId;
}
