package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class WorkFindRequest {
    private Long workspaceId;
    private String workspaceCode;
}
