package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class WorkspaceDeleteRequest {
    @NotNull(message = "회원 번호는 필수값입니다.")
    private Long userId;
    @NotNull(message = "워크스페이스 번호는 필수값입니다.")
    private Long workspaceId;
}
