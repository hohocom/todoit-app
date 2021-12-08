package kr.todoit.api.dto;

import kr.todoit.api.domain.Workspace;
import kr.todoit.api.domain.WorkspaceGroup;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Getter
public class WorkspaceCreateResponse {
    List<HashMap<String, Object>> workspaces;

    @Builder
    public WorkspaceCreateResponse(List<HashMap<String, Object>> workspaces) {
        this.workspaces = workspaces;
    }

    public static WorkspaceCreateResponse of(List<WorkspaceGroup> workspaceGroups) {

        List<HashMap<String, Object>> _workspaces = new ArrayList<>();
        for(WorkspaceGroup workspaceGroup : workspaceGroups){
            HashMap<String, Object> _workspace = new HashMap<>();
            _workspace.put("id", workspaceGroup.getWorkspace().getId());
            _workspace.put("code", workspaceGroup.getWorkspace().getCode());
            _workspace.put("name", workspaceGroup.getWorkspace().getName());
            _workspaces.add(_workspace);
        }

        return WorkspaceCreateResponse.builder()
                .workspaces(_workspaces)
                .build();
    }
}
