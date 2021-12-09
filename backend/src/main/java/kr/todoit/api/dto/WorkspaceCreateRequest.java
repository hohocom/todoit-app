package kr.todoit.api.dto;

import kr.todoit.api.domain.User;
import kr.todoit.api.domain.Workspace;
import kr.todoit.api.domain.WorkspaceGroup;
import kr.todoit.api.domain.WorkspaceGroupRoleCategory;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class WorkspaceCreateRequest {
    @NotNull(message = "회원번호는 필수값입니다.")
    private Long userId;
    @NotBlank(message = "워크스페이스 이름은 필수값입니다.")
    private String name;

    public Workspace toWorkspace(String randomCode) {
        return Workspace.builder()
                .name(this.name)
                .code(randomCode)
                .build();
    }

    public WorkspaceGroup toWorkspaceGroup(User user, Workspace workspace, WorkspaceGroupRoleCategory workspaceGroupRoleCategory) {
        return WorkspaceGroup.builder()
                .user(user)
                .workspace(workspace)
                .workspaceGroupRoleCategory(workspaceGroupRoleCategory)
                .build();
    }
}
