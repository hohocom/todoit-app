package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class WorkUpdateDateRequest {
    private Long workId;
    private Long userId;
    private String startDate;
    private String endDate;
}
