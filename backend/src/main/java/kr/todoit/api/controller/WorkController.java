package kr.todoit.api.controller;

import kr.todoit.api.dto.UserInfoResponse;
import kr.todoit.api.dto.WorkCreateRequest;
import kr.todoit.api.dto.WorkspaceFindResponse;
import kr.todoit.api.service.TokenService;
import kr.todoit.api.service.WorkService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
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
    public ResponseEntity<Map<String, Object>> index(@RequestParam Long workspaceId) {
        System.out.println("요청 옴");
//        TokenService.isMatched(id, Long.parseLong(servletRequest.getAttribute("id").toString()));

        List<HashMap<String, Object>> works = workService.findWorksByWorkspaceId(workspaceId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "작업일정 조회");
        response.put("statusCode", 200);
        response.put("works", works);
        return ResponseEntity.ok().body(response);
    }

    @MessageMapping("/hello")
    @SendTo("/topics/sendTo")
    public List<HashMap<String, Object>> socketIndex(@RequestBody Long workspaceId) {
        System.out.println(workspaceId);
//        TokenService.isMatched(id, Long.parseLong(servletRequest.getAttribute("id").toString()));
        return workService.findWorksByWorkspaceId(workspaceId);
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> create(@Valid WorkCreateRequest workCreateRequest, HttpServletRequest servletRequest) {
        log.info("POST/works");
//        TokenService.isMatched(id, Long.parseLong(servletRequest.getAttribute("id").toString()));
        System.out.println(workCreateRequest);
        workService.create(workCreateRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "작업일정을 생성하였습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().body(response);
    }
}
