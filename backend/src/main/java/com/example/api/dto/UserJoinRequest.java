package com.example.api.dto;

import com.example.api.domain.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserJoinRequest {
    private String email;
    private String userCode;
    private String provideType;

    public User toUser() {
        return User.builder()
                .email(email)
                .userCode(userCode)
                .nickname("투두잇")
                .build();
    }
}
