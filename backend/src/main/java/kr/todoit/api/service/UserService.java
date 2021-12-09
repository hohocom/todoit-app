package kr.todoit.api.service;

import kr.todoit.api.domain.User;
import kr.todoit.api.dto.UserInfoResponse;
import kr.todoit.api.dto.UserLoginRequest;
import kr.todoit.api.dto.UserTokenResponse;
import kr.todoit.api.dto.WorkspaceFindResponse;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import kr.todoit.api.exception.ValidExceptionType;
import kr.todoit.api.repository.UserRepository;
import kr.todoit.api.util.RandomNicknameCreator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class UserService {

    private OAuth2Service oAuth2Service;
    private UserRepository userRepository;
    private TokenService tokenService;

    public UserTokenResponse loginByOauth(UserLoginRequest userLoginRequest) throws CustomException {
        String email = null;
        if (userLoginRequest.getProviderType().equals("KAKAO")) {
            log.info("카카오 로그인");
            email = oAuth2Service.getKakaoEmailByAccessToken(userLoginRequest.getAccessToken());
            System.out.println(email);
        } else if (userLoginRequest.getProviderType().equals("NAVER")) {
            log.info("네이버 로그인");
        } else {
            throw new CustomException(new ValidExceptionType(5000, 200, "부적합한 프로바이더 타입입니다."));
        }

        User user = userRepository.findByEmail(email);

        System.out.println(user);
        // 미회원가입 -> 회원가입
        if (user == null) user = joinUser(email);

        System.out.println(user);
        // 로그인 처리(토큰 발급)
        log.info("자동로그인 진행 -> 토큰 발급");
        HashMap<String, Object> actInfo = tokenService.getAct(user.getId());
        HashMap<String, Object> rftInfo = tokenService.getRft(user.getId());

        return UserTokenResponse.builder()
                .actInfo(actInfo)
                .rftInfo(rftInfo)
                .build();
    }

    public UserTokenResponse verifyTokenThenGetTokens(String token) {
        HashMap<String, Object> tokenInfo = tokenService.verifyToken(token);
        System.out.println(tokenInfo);
        User user = userRepository.findUserById(Long.valueOf(tokenInfo.get("id").toString()));

        checkNullUser(user);

        HashMap<String, Object> actInfo = tokenService.getAct(Long.valueOf(tokenInfo.get("id").toString()));
        HashMap<String, Object> rftInfo = tokenService.getRft(Long.valueOf(tokenInfo.get("id").toString()));

        return UserTokenResponse.builder()
                .actInfo(actInfo)
                .rftInfo(rftInfo)
                .build();
    }

    public UserTokenResponse verifyTokenThenGetTokensTest(Long id) {
        HashMap<String, Object> actInfo = tokenService.getAct(id);
        HashMap<String, Object> rftInfo = tokenService.getRft(id);

        return UserTokenResponse.builder()
                .actInfo(actInfo)
                .rftInfo(rftInfo)
                .build();
    }

    private User joinUser(String email) {
        log.info("회원가입 진행");
        String nickname = RandomNicknameCreator.getRandomNickname();
        User user = User.builder()
                .email(email)
                .nickname(nickname)
                .build();
        userRepository.save(user);
        return user;
    }

    public User findUserById(Long userId) {
        User user = userRepository.findUserById(userId);
        checkNullUser(user);
        return user;
    }

    public UserInfoResponse getUserInfo(Long id) {
        User user = userRepository.findUserById(id);
        checkNullUser(user);

        return UserInfoResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .originImage(user.getOriginImagePath())
                .thumbnailImage(user.getThumbnailImagePath())
                .build();
    }

    private void checkNullUser(User user) {
        if (user == null) {
            throw new CustomException(DefaultExceptionType.NOT_FOUND_USER);
        }
    }
}
