package kr.todoit.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.BindException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionController extends RuntimeException{



//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<?> customExceptionHandler(CustomException e) {
//        System.out.println("익셉션 컨트롤러");
//        System.out.println(e.getMessage());
//        return null;
//    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customExceptionHandler(CustomException e) {
        System.out.println("-----Custom Err Message------");
//        System.out.println(e.getExceptionType());
//        System.out.println(e.getErrorMessage());
//        System.out.println(e.getErrorCode());
//        System.out.println(e.getHttpStatus());
//
//        Map<String, Object> error = new HashMap<>();
//        String message = e.getErrorMessage() != null ? e.getErrorMessage() : "요청을 처리하지 못하였습니다.";
//        error.put("type", e.getExceptionType());
//        error.put("message", message);
//        error.put("errorCode", e.getErrorCode());
//        error.put("statusCode", e.getHttpStatus());
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("error", error);
//        return ResponseEntity.ok().body(response);
        return null;
    }
}
