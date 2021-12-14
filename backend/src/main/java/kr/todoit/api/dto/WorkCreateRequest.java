package kr.todoit.api.dto;

import kr.todoit.api.domain.User;
import kr.todoit.api.domain.Work;
import kr.todoit.api.domain.Workspace;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@ToString
public class WorkCreateRequest {
    @NotNull(message = "워크스페이스 번호는 필수값입니다.")
    private Long workspaceId;

    @NotBlank(message = "작업 제목은 필수값입니다.")
    private String title;

    @NotBlank(message = "작업 내용은 필수값입니다.")
    private String content;

    @NotBlank(message = "작업 시작일은 필수값입니다.")
    private Timestamp startDate;

    private Timestamp endDate;

    private String themeColor;

    @NotNull(message = "작업 참여자는 필수값입니다.")
    private List<Long> users;

    public Work toWork() {
        return Work.builder()
                .title(this.title)
                .content(this.content)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .themeColor(this.themeColor)
                .build();
    }
}
