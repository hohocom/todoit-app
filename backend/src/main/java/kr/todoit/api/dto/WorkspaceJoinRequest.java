package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class WorkspaceJoinRequest {
    @NotNull(message = "워크스페이스 코드는 필수값입니다.")
    private String workspaceCode;
    @NotBlank(message = "가입자 번호는 필수값입니다.")
    private Long joinUserId;
}
