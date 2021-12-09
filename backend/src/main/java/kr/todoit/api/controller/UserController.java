package kr.todoit.api.controller;

import kr.todoit.api.dto.UserInfoResponse;
import kr.todoit.api.dto.UserLoginRequest;
import kr.todoit.api.dto.UserTokenResponse;
import kr.todoit.api.dto.WorkspaceFindResponse;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import kr.todoit.api.exception.ValidExceptionType;
import kr.todoit.api.service.TokenService;
import kr.todoit.api.service.UserService;
import kr.todoit.api.service.WorkspaceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@Slf4j
public class UserController {

    private UserService userService;
    private WorkspaceService workspaceService;

    @PostMapping("/login-by-oauth")
    public ResponseEntity<Map<String, Object>> loginByOauth(@Valid UserLoginRequest userLoginRequest, BindingResult bindingResult) {
        log.info("POST/users");
        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));

        UserTokenResponse userTokenResponse = userService.loginByOauth(userLoginRequest);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "로그인이 정상적으로 처리되었습니다.");
        response.put("statusCode", 200);
        response.put("act", userTokenResponse.getActInfo());
        return responseTokens(userTokenResponse, response);
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<Map<String, Object>> refreshToken(@CookieValue(name = "rft", required = false) String refreshToken) {
        log.info("GET/users/refresh-token");
        System.out.println(refreshToken);

        if (refreshToken == null) {
            log.info("쿠키 확인 -> 저장된 토큰 없음( 로그인 하지 않은 유저 )");
            throw new CustomException(DefaultExceptionType.NOT_FOUND_USER);
        }
        UserTokenResponse userTokenResponse = userService.verifyTokenThenGetTokens(refreshToken);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "토큰이 재발급되었습니다.");
        response.put("statusCode", 200);
        response.put("act", userTokenResponse.getActInfo());
        return responseTokens(userTokenResponse, response);
    }

    @GetMapping("/refresh-token-test/{id}")
    public ResponseEntity<Map<String, Object>> refreshTokenTest(@PathVariable Long id) {
        log.info("GET/users/refresh-token-test");
        UserTokenResponse userTokenResponse = userService.verifyTokenThenGetTokensTest(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "토큰이 재발급되었습니다.");
        response.put("statusCode", 200);
        response.put("act", userTokenResponse.getActInfo());
        return responseTokens(userTokenResponse, response);
    }

    private ResponseEntity<Map<String, Object>> responseTokens(UserTokenResponse userTokenResponse, Map<String, Object> response) {
        final Long time = 3600 * 24 * 14L;
        ResponseCookie responseCookie = ResponseCookie.from("rft", userTokenResponse.getRftInfo().get("token").toString())
//                .httpOnly(true)
                .path("/")
                .maxAge(time)
                .sameSite("Strict")
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> show(@PathVariable Long id, HttpServletRequest servletRequest) {
        log.info("GET/users/:id");
        System.out.println(id);
        System.out.println(servletRequest.getAttribute("id").toString());
        TokenService.isMatched(id, Long.parseLong(servletRequest.getAttribute("id").toString()));

        UserInfoResponse userInfoResponse = userService.getUserInfo(id);
        WorkspaceFindResponse workspaceFindResponse = workspaceService.findWorkspacesByUserId(id);
        userInfoResponse.setWorkspaces(workspaceFindResponse.getWorkspaces());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "회원 데이터를 정상적으로 전달하였습니다.");
        response.put("statusCode", 200);
        response.put("user", userInfoResponse);
        return ResponseEntity.ok().body(response);
    }
}
