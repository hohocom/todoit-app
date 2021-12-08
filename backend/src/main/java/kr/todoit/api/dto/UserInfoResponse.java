package kr.todoit.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;

@Getter
@Setter
public class UserInfoResponse {
    private Long id;
    private String email;
    private String nickname;
    private String originImage;
    private String thumbnailImage;
    private List<HashMap<String, Object>> workspaces;

    @Builder
    public UserInfoResponse(Long id, String email, String nickname, String originImage, String thumbnailImage, List<HashMap<String, Object>> workspaces) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.originImage = originImage;
        this.thumbnailImage = thumbnailImage;
        this.workspaces = workspaces;
    }
}
