package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserFindRequest {
    private Long workspaceId;
    private String workspaceCode;
    private String orderType;
    private Long pageNumber;

    public void setPageNumber(Long pageNumber) {
        // 1 : 1 ~ 10
        // 2 : 11 ~ 20
        System.out.println("set page 호출");
        this.pageNumber = ((pageNumber-1) * 10);
    }
}
