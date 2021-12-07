package kr.todoit.api.interceptor;

import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import kr.todoit.api.service.TokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

@Slf4j
public class TokenVerifyInterceptor implements HandlerInterceptor {

    @Autowired
    private TokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("[ 토큰 유효성 검사 인터셉터 ]");
        log.info("Request Method : ");
        log.info(request.getMethod());

        AntPathMatcher matcher = new AntPathMatcher();
        String pattern = "/static/images/**";

        String requestURI = request.getRequestURI();
        if (matcher.match(pattern, requestURI)) {
            return true;
        }

        if(request.getMethod().equals("OPTIONS")){
            log.info("if request options method is options, return true");
            return true;
        }

        String tokenString = request.getHeader("Authorization");
        System.out.println(tokenString);
        if(tokenString == null){
            throw new CustomException(DefaultExceptionType.PERMISSION_NOT_DEFINE);
        }
        String token;

        try{
            token = tokenString.split("bearer ")[1];
        }catch (Exception e){
            throw new CustomException(DefaultExceptionType.PERMISSION_NOT_DEFINE);
        }

        HashMap<String, Object> tokenInfo = tokenService.verifyToken(token);
        request.setAttribute("id", tokenInfo.get("id"));
        return true;
    }
}