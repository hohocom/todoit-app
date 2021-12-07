package kr.todoit.api.service;

import kr.todoit.api.domain.User;
import kr.todoit.api.dto.UserLoginRequest;
import kr.todoit.api.dto.UserLoginResponse;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.ValidExceptionType;
import kr.todoit.api.repository.UserRepository;
import kr.todoit.api.util.RandomNicknameCreator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.HashMap;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class UserService {

    private OAuth2Service oAuth2Service;
    private UserRepository userRepository;
    private TokenService tokenService;

    public UserLoginResponse loginByOauth(UserLoginRequest userLoginRequest) throws CustomException {
        String email = null;
        if (userLoginRequest.getProviderType().equals("KAKAO")) {
            log.info("카카오 로그인");
            email = oAuth2Service.getKakaoEmailByAccessToken(userLoginRequest.getAccessToken());
        } else if (userLoginRequest.getProviderType().equals("NAVER")) {
            log.info("네이버 로그인");
        } else {
            throw new CustomException(new ValidExceptionType(5000, 200, "부적합한 프로바이더 타입입니다."));
        }

        User user = userRepository.findByEmail(email);

        // 미회원가입 -> 회원가입
        if (user == null) joinUser(email);

        // 로그인 처리(토큰 발급)
        log.info("자동로그인 진행 -> 토큰 발급");
        HashMap<String, Object> actInfo = tokenService.getAct(user.getId());
        HashMap<String, Object> rftInfo = tokenService.getRft(user.getId());

        return UserLoginResponse.builder()
                .actInfo(actInfo)
                .rftInfo(rftInfo)
                .build();
    }

    private void joinUser(String email) {
        String nickname = RandomNicknameCreator.getRandomNickname();
        User user = User.builder()
                .email(email)
                .nickname(nickname)
                .build();
        userRepository.save(user);
    }
}
