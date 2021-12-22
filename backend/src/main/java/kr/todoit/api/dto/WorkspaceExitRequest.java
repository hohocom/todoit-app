package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class WorkspaceExitRequest {
    @NotNull(message = "맴버 아이디는 필수값입니다.")
    private Long memberId;
    @NotNull(message = "워크스페이스 아이디는 필수값입니다.")
    private Long workspaceId;
    private Long superMemberId;
}
