package kr.todoit.api.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;

@Getter
public class UserLoginResponse {
    private HashMap<String, Object> actInfo;
    private HashMap<String, Object> rftInfo;

    @Builder
    public UserLoginResponse(HashMap<String, Object> actInfo, HashMap<String, Object> rftInfo) {
        this.actInfo = actInfo;
        this.rftInfo = rftInfo;
    }
}
