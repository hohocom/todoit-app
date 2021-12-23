package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class WorkFinishedRequest {
    @NotNull(message = "일정 아이디는 필수값입니다.")
    private Long workId;
    @NotNull(message = "유저 아이디는 필수값입니다.")
    private Long userId;
    @NotNull(message = "일정 상태는 필수값입니다.")
    private Byte result;
}
