package kr.todoit.api.controller;

import kr.todoit.api.dto.UserRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/v1/users")
@AllArgsConstructor
public class UserController {

    @PostMapping("")
    public Map<String, Object> join(UserRequest userRequest){
        System.out.println(userRequest);
        return null;
    }
}
