package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class WorkspaceUpdateRequest {
    @NotNull(message = "회원번호는 필수값입니다.")
    private Long userId;
    @NotNull(message = "워크스페이스번호는 필수값입니다.")
    private Long workspaceId;
    @NotBlank(message = "워크스페이스 이름은 필수값입니다.")
    private String workspaceName;
}
