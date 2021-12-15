package kr.todoit.api.controller;

import kr.todoit.api.dto.*;
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
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@Slf4j
public class UserController {

    private UserService userService;
    private WorkspaceService workspaceService;

    @GetMapping("/workspace-super-join/{workspaceCode}")
    public ResponseEntity<Map<String, Object>> superLogin(@PathVariable String workspaceCode) {
        ;
        WorkspaceJoinRequest workspaceJoinRequest = new WorkspaceJoinRequest();
        workspaceJoinRequest.setJoinUserId(userService.workspaceSuperJoin());
        workspaceJoinRequest.setWorkspaceCode(workspaceCode);
        workspaceService.joinWorkspace(workspaceJoinRequest);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "슈퍼 조인");
        response.put("statusCode", 200);
        return ResponseEntity.ok().body(response);
    }

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
                .httpOnly(true)
                .path("/")
                .maxAge(time)
                .sameSite("Strict")
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(response);
    }

    @GetMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout() {
        log.info("GET/users/logout");
        log.info("로그아웃 요청 -> RFT 쿠키 제거");
        ResponseCookie responseCookie = ResponseCookie.from("rft", null)
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "로그아웃이 정상적으로 처리되었습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(response);
    }


    @GetMapping("")
    public ResponseEntity<Map<String, Object>> findByWorkspaceOptions(
            @RequestParam(defaultValue = "", required = false) Long workspaceId,
            @RequestParam(defaultValue = "", required = false) String workspaceCode
    ) {
        log.info("GET/users?workspaceCode&workspaceId");
        System.out.println(workspaceCode);
        System.out.println(workspaceId);

        List<HashMap<String, Object>> users = null;
        if (workspaceId != null) {
            users = userService.getUsersByWorkspaceId(workspaceId);
        } else if (!workspaceCode.equals("")) {
            users = userService.getUsersByWorkspaceCode(workspaceCode);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "회원 데이터 조회.");
        response.put("statusCode", 200);
        response.put("users", users);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> show(@PathVariable Long id, HttpServletRequest servletRequest) {
        log.info("GET/users/:id");

        TokenService.isMatched(id, Long.parseLong(servletRequest.getAttribute("id").toString()));

        UserInfoResponse userInfoResponse = userService.getUserInfo(id);
        WorkspaceFindResponse workspaceFindResponse = workspaceService.findWorkspacesByUserId(id);
        userInfoResponse.setWorkspaces(workspaceFindResponse.getWorkspaces());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "회원 상세 데이터 조회 완료.");
        response.put("statusCode", 200);
        response.put("user", userInfoResponse);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(
            UserUpdateRequest userUpdateRequest,
            BindingResult bindingResult,
            HttpServletRequest servletRequest) throws IOException {
        log.info("PUT/users/:id");
        System.out.println(userUpdateRequest);
        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));
        TokenService.isMatched(userUpdateRequest.getId(), Long.parseLong(servletRequest.getAttribute("id").toString()));

        HashMap<String, String> userInfo = userService.update(userUpdateRequest);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "회원 수정 완료.");
        response.put("statusCode", 200);
        response.put("updateUserInfo", userInfo);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{id}/profile-image-init")
    public ResponseEntity<Map<String, Object>> profileImgInit(@PathVariable Long id,HttpServletRequest servletRequest) throws IOException {
        log.info("PUT/users/:id");

        TokenService.isMatched(id, Long.parseLong(servletRequest.getAttribute("id").toString()));

        userService.profileImgInit(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "회원 프로필 이미지 초기화 완료.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id, HttpServletRequest servletRequest) {
        log.info("DELETE/users/:id");

        TokenService.isMatched(id, Long.parseLong(servletRequest.getAttribute("id").toString()));

        userService.deleteByUserId(id);

        log.info("RFT 쿠키 제거");
        ResponseCookie responseCookie = ResponseCookie.from("rft", null)
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "회원 삭제 완료.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(response);
    }
}
