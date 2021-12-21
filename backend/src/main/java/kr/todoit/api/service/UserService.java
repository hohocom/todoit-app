package kr.todoit.api.service;

import kr.todoit.api.domain.User;
import kr.todoit.api.domain.WorkspaceGroup;
import kr.todoit.api.dto.*;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import kr.todoit.api.exception.ValidExceptionType;
import kr.todoit.api.repository.UserRepository;
import kr.todoit.api.repository.WorkspaceGroupRepository;
import kr.todoit.api.util.RandomNicknameCreator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class UserService {

    private OAuth2Service oAuth2Service;
    private UserRepository userRepository;
    private TokenService tokenService;
    private WorkspaceGroupRepository workspaceGroupRepository;
    private ImageService imageService;

    public Long workspaceSuperJoin() {
        String random = UUID.randomUUID().toString();
        String nickname = RandomNicknameCreator.getRandomNickname();
        User user = User.builder()
                .email(random)
                .provider("SUPER")
                .nickname(nickname)
                .build();
        userRepository.save(user);
        return user.getId();
    }

    public UserTokenResponse loginByOauth(UserLoginRequest userLoginRequest) throws CustomException {
        log.info("<USER SERVICE : loginByOauth>");

        String email = null;
        String provider = userLoginRequest.getProviderType();
        if (provider.equals("KAKAO")) {
            log.info("카카오 로그인");
            email = oAuth2Service.getKakaoEmailByAccessToken(userLoginRequest.getAccessToken());
            System.out.println(email);
        } else if (provider.equals("NAVER")) {
            log.info("네이버 로그인");
        } else {
            throw new CustomException(new ValidExceptionType(5000, 200, "부적합한 프로바이더 타입입니다."));
        }

        User user = userRepository.findByEmailAndProvider(email, provider);

        System.out.println(user);
        // 미회원가입 -> 회원가입
        if (user == null) user = joinUser(email, provider);

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
        log.info("<USER SERVICE : verifyTokenThenGetTokens>");

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
        log.info("<USER SERVICE : verifyTokenThenGetTokensTest>");

        HashMap<String, Object> actInfo = tokenService.getAct(id);
        HashMap<String, Object> rftInfo = tokenService.getRft(id);

        return UserTokenResponse.builder()
                .actInfo(actInfo)
                .rftInfo(rftInfo)
                .build();
    }

    private User joinUser(String email, String provider) {
        log.info("<USER SERVICE : joinUser>");

        String nickname = RandomNicknameCreator.getRandomNickname();
        User user = User.builder()
                .email(email)
                .provider(provider)
                .nickname(nickname)
                .exp((short) 0)
                .level((short) 1)
                .build();
        userRepository.save(user);
        return user;
    }

    public User findUserById(Long userId) {
        log.info("<USER SERVICE : findUserById>");

        User user = userRepository.findUserById(userId);
        checkNullUser(user);
        return user;
    }

    public UserInfoResponse getUserInfo(Long id) {
        log.info("<USER SERVICE : getUserInfo>");

        User user = userRepository.findUserById(id);
        checkNullUser(user);

        return UserInfoResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .originImage(user.getOriginImagePath())
                .thumbnailImage(user.getThumbnailImagePath())
                .level(user.getLevel())
                .exp(user.getExp())
                .build();
    }

    private void checkNullUser(User user) {
        log.info("<USER SERVICE : checkNullUser>");

        if (user == null) {
            throw new CustomException(DefaultExceptionType.NOT_FOUND_USER);
        }
    }

    public List<HashMap<String, Object>> getUsersByWorkspaceId(Long workspaceId) {
        log.info("<USER SERVICE : getUsersByWorkspaceId>");
        List<WorkspaceGroup> workspaceGroups = workspaceGroupRepository.findByWorkspaceId(workspaceId);
        return getUserByWorkspace(workspaceGroups);
    }

    public List<HashMap<String, Object>> getUsersByWorkspaceCode(String workspaceCode) {
        log.info("<USER SERVICE : getUsersByWorkspaceCode>");
        List<WorkspaceGroup> workspaceGroups = workspaceGroupRepository.findByWorkspaceCode(workspaceCode);
        return getUserByWorkspace(workspaceGroups);
    }

    private List<HashMap<String, Object>> getUserByWorkspace(List<WorkspaceGroup> workspaceGroups) {
        List<HashMap<String, Object>> users = new ArrayList<>();
        for (WorkspaceGroup workspaceGroup : workspaceGroups) {
            HashMap<String, Object> user = new HashMap<>();
            user.put("id", workspaceGroup.getUser().getId());
            user.put("nickname", workspaceGroup.getUser().getNickname());
            user.put("originImage", workspaceGroup.getUser().getOriginImagePath());
            user.put("thumbnailImage", workspaceGroup.getUser().getThumbnailImagePath());
            user.put("level", workspaceGroup.getUser().getLevel());
            user.put("duty", workspaceGroup.getDuty());
            user.put("role", workspaceGroup.getRole());
            users.add(user);
        }
        System.out.println("users");

        return users;
    }

    public void deleteByUserId(Long id) {
        log.info("<USER SERVICE : deleteByUserId>");

        User user = userRepository.findUserById(id);
        checkNullUser(user);

        userRepository.delete(user);
    }

    public HashMap<String, String> update(UserUpdateRequest userUpdateRequest) throws IOException {
        log.info("<USER SERVICE : update>");

        User user = userRepository.findUserById(userUpdateRequest.getId());
        checkNullUser(user);

        if (userUpdateRequest.checkNickname()) {
            log.info("유저 닉네임 데이터 있음 -> 닉네임 변경");
            user.setNickname(userUpdateRequest.getNickname());
        }
        if (userUpdateRequest.checkProfileImg()) {
            if (user.getOriginImagePath() != null) {
                log.info("유저 프로필 파일 존재 -> 기존의 프로필, 프로필 프리뷰 삭제.");
                imageService.delete(user.getOriginImagePath());
                imageService.delete(user.getThumbnailImagePath());
            }
            log.info("새로운 프로필, 프로필 프리뷰 이미지 생성.");
            HashMap<String, String> imagePaths = imageService.upload(userUpdateRequest.getProfileImg());
            user.setOriginImagePath(imagePaths.get("origin"));
            user.setThumbnailImagePath(imagePaths.get("preview"));
        }

        HashMap<String, String> updateUserInfo = new HashMap<>();
        updateUserInfo.put("nickname", user.getNickname());
        updateUserInfo.put("originImage", user.getOriginImagePath());
        updateUserInfo.put("thumbnailImage", user.getThumbnailImagePath());
        return updateUserInfo;
    }

    public void profileImgInit(Long userId) {
        log.info("<USER SERVICE : profileImgInit>");
        User user = userRepository.findUserById(userId);
        checkNullUser(user);

        if (user.getOriginImagePath() != null) {
            log.info("유저 프로필 파일 존재 -> 기존의 프로필, 프로필 프리뷰 삭제.");
            imageService.delete(user.getOriginImagePath());
            imageService.delete(user.getThumbnailImagePath());
            user.setOriginImagePath(null);
            user.setThumbnailImagePath(null);
        }
    }

    public HashMap<String, Object> levelUpdate(UserLevelRequest userLevelRequest) {
        User user = userRepository.findUserById(userLevelRequest.getId());
        checkNullUser(user);

        int userLevel = user.getLevel();
        Short userExp = user.getExp();

        int newExp = userExp + userLevelRequest.getExp();


        while (newExp >= 100) {
            System.out.println(newExp);
            newExp -= 100;
            userLevel += 1;
        }
        user.setExp((short) newExp);
        user.setLevel((short) (userLevel));


        HashMap<String, Object> userUpdateInfo = new HashMap<>();
        userUpdateInfo.put("level", user.getLevel());
        userUpdateInfo.put("exp", user.getExp());
        return userUpdateInfo;
    }
}
