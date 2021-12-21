package kr.todoit.api.controller;

import kr.todoit.api.dto.UserInfoResponse;
import kr.todoit.api.dto.WorkCreateRequest;
import kr.todoit.api.dto.WorkFindResponse;
import kr.todoit.api.dto.WorkspaceFindResponse;
import kr.todoit.api.exception.CustomException;
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
    public ResponseEntity<Map<String, Object>> create(@Valid WorkCreateRequest workCreateRequest, BindingResult bindingResult, HttpServletRequest servletRequest) throws ParseException {
        log.info("[일정 생성 요청중..]");

        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));
        TokenService.isMatched(workCreateRequest.getUsers().get(0), Long.parseLong(servletRequest.getAttribute("id").toString()));


        workService.create(workCreateRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "작업일정을 생성하였습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().body(response);
    }
}
