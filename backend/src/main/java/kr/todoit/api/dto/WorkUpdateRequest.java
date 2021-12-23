package kr.todoit.api.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@ToString
public class WorkUpdateRequest {
    @NotNull(message = "일정 아이디는 필수값입니다.")
    private Long workId;

    @NotBlank(message = "일정 제목은 필수값입니다.")
    private String title;

    private String content;

    @NotNull(message = "일정 시작일은 필수값입니다.")
    private String startDate;

    private String endDate;

    private String themeColor;

    @NotNull(message = "일정 참여자는 필수값입니다.")
    private List<Long> users;
}
