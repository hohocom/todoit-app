package kr.todoit.api.controller;

import kr.todoit.api.dto.*;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import kr.todoit.api.exception.ValidExceptionType;
import kr.todoit.api.service.TokenService;
import kr.todoit.api.service.WorkService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/works")
@AllArgsConstructor
@Slf4j
public class WorkController {

    private WorkService workService;

    @GetMapping("")
    public ResponseEntity<Map<Object, Object>> index(@RequestParam Long workspaceId) {
        log.info("[일정 목록 요청중..]");

        List<WorkFindResponse> works = workService.findWorksByWorkspaceId(workspaceId);
        Map<Object, Object> response = new HashMap<>();
        response.put("message", "작업일정 조회");
        response.put("statusCode", 200);
        response.put("works", works);
        return ResponseEntity.ok().body(response);
    }

    @MessageMapping("/getWorks")
    @SendTo("/topics/sendTo")
    public List<WorkFindResponse> socketIndex(@RequestBody Long workspaceId) {
        log.info("[소캣으로 일정 목록 요청중..]");

        return workService.findWorksByWorkspaceId(workspaceId);
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> create(
            @Valid WorkCreateRequest workCreateRequest,
            BindingResult bindingResult,
            HttpServletRequest servletRequest) throws ParseException {
        log.info("[일정 생성 요청중..]");

        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));

        boolean result = false;
        for(Long userId : workCreateRequest.getUsers()){
            if(userId == Long.parseLong(servletRequest.getAttribute("id").toString())){
                result = true;
            }
        }
        if(!result) throw new CustomException(DefaultExceptionType.AUTHENTICATE_NOT_MATCH);

        workService.create(workCreateRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "작업일정을 생성하였습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{workId}")
    public ResponseEntity<Map<String, Object>> update(
            @Valid WorkUpdateRequest workUpdateRequest,
            BindingResult bindingResult,
            HttpServletRequest servletRequest) throws ParseException {
        log.info("[일정 수정 요청중..]");

        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));

        boolean result = false;
        for (Long userId : workUpdateRequest.getUsers()) {
            if (userId == Long.parseLong(servletRequest.getAttribute("id").toString())) {
                result = true;
            }
        }
        if (!result) throw new CustomException(DefaultExceptionType.AUTHENTICATE_NOT_MATCH);

        workService.update(workUpdateRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "작업일정을 수정하였습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{workId}/finished")
    public ResponseEntity<Map<String, Object>> updateFinished(
            @Valid WorkFinishedRequest workFinishedRequest,
            BindingResult bindingResult,
            HttpServletRequest servletRequest) throws ParseException {
        log.info("[일정 상태 수정 요청중..]");

        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));

        TokenService.isMatched(workFinishedRequest.getUserId(), Long.parseLong(servletRequest.getAttribute("id").toString()));

        workService.update(workFinishedRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "작업일정을 수정하였습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{workId}")
    public ResponseEntity<Map<String, Object>> delete(
            @Valid WorkDeleteRequest workDeleteRequest,
            BindingResult bindingResult,
            HttpServletRequest servletRequest) throws ParseException {
        log.info("[일정 삭제 요청중..]");

        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));

        TokenService.isMatched(workDeleteRequest.getUserId(), Long.parseLong(servletRequest.getAttribute("id").toString()));

        workService.delete(workDeleteRequest.getWorkId());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "작업일정을 삭제하였습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().body(response);
    }
}
