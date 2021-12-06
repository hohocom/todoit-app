package kr.todoit.api.controller;

import kr.todoit.api.dto.UserLoginRequest;
import kr.todoit.api.dto.UserLoginResponse;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.ValidExceptionType;
import kr.todoit.api.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@Slf4j
public class UserController {

    private UserService userService;


    @PostMapping("/login-by-oauth")
    public ResponseEntity<Map<String, Object>> loginByOauth(@Valid UserLoginRequest userLoginRequest, BindingResult bindingResult) {
        log.info("POST/users");
        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));

        UserLoginResponse userLoginResponse = userService.loginByOauth(userLoginRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","로그인이 정상적으로 처리되었습니다.");
        response.put("statusCode", 200);
        response.put("act", userLoginResponse.getActInfo());
        final Long time = 3600 * 24 * 14L;
        ResponseCookie responseCookie = ResponseCookie.from("rft", userLoginResponse.getRftInfo().get("token").toString())
                .httpOnly(true)
                .path("/")
                .maxAge(time)
                .sameSite("Strict")
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(response);
    }
}
