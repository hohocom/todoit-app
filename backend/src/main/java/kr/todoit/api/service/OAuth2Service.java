package kr.todoit.api.service;

import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class OAuth2Service {

    public String getKakaoEmailByAccessToken(String accessToken) throws CustomException {
        log.info("[ 카카오톡 인증 토큰 ]");
        log.info(accessToken);
        final String KAKAO_VERIFY_URL = "https://kapi.kakao.com/v2/user/me";

        // KAKAO REQUEST
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization","Bearer "+accessToken);
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        HttpEntity entity = new HttpEntity(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> resultMap;
        try{
            resultMap = restTemplate.exchange(KAKAO_VERIFY_URL, HttpMethod.GET, entity, Map.class);
        }catch (HttpClientErrorException e){
            throw new CustomException(DefaultExceptionType.LOGIN_FAILS);
        }

        HashMap<String, Object> kakaoAccount = (HashMap<String, Object>) resultMap.getBody().get("kakao_account");
        String email = kakaoAccount.getOrDefault("email", null).toString();

        if(email == null){
            throw new CustomException(DefaultExceptionType.LOGIN_FAILS);
        }
        // END KAKAO REQUEST

        log.info("카카오 이메일 받기 완료.");
        return kakaoAccount.get("email").toString();
    }
}
