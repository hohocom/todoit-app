package kr.todoit.api.service;

import io.jsonwebtoken.*;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;

@Slf4j
@Service
public class TokenService {

    @Value("${custom.secret}")
    private String secret;

    private final String ISSUER = "todo-it";

    public HashMap<String, Object> getAct(Long userId) throws CustomException {
        Date now = new Date();
        String accessToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer(ISSUER)
                .setSubject("act")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + Duration.ofHours(2).toMillis()))
                .claim("id", userId)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();

        return verifyToken(accessToken);
    }

    public HashMap<String, Object> getRft(Long userId) throws CustomException {
        Date now = new Date();
        String refreshToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer(ISSUER)
                .setSubject("rft")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + Duration.ofDays(14).toMillis()))
                .claim("id", userId)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();

        return verifyToken(refreshToken);
    }

    public static void isMatched(Long userId, Long tokenUserId) throws CustomException {
        if(userId != tokenUserId){
            log.info("일치하지 않은 유저");
            throw new CustomException(DefaultExceptionType.NOT_FOUND_USER);
        }
    }

    public HashMap<String, Object> verifyToken(String token) throws CustomException {
        try{
            Claims data = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
            System.out.println(data);
            HashMap<String, Object> info = new HashMap<>();
            info.put("token", token);
            info.put("iss", data.get("iss").toString());
            info.put("sub", data.get("sub").toString());
            info.put("id", Long.parseLong(data.get("id").toString()));
            info.put("exp", Long.parseLong(data.get("exp").toString()) );
            info.put("iat", Long.parseLong(data.get("iat").toString()) );

            return info;
        }catch(ExpiredJwtException e){
            log.info("토큰 만료됨");
            System.out.println(e.getMessage());
            throw new CustomException(DefaultExceptionType.EXPIRED_TOKEN);
        }catch(Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(DefaultExceptionType.NOT_MATCHED_TOKEN);
        }
    }
}
