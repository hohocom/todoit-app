package kr.todoit.api.controller;

import kr.todoit.api.dto.*;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.ValidExceptionType;
import kr.todoit.api.service.TokenService;
import kr.todoit.api.service.WorkspaceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/workspaces")
@AllArgsConstructor
@Slf4j
public class WorkspaceController {

    private WorkspaceService workspaceService;

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> index(@Valid @RequestParam WorkspaceFindRequest workspaceFindRequest, BindingResult bindingResult, HttpServletRequest servletRequest) {
        log.info("GET/workspaces?userId=");
        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));

        TokenService.isMatched(workspaceFindRequest.getUserId(), Long.parseLong(servletRequest.getAttribute("id").toString()));

        WorkspaceFindResponse workspaceFindResponse = workspaceService.findWorkspacesByUserId(workspaceFindRequest.getUserId());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "워크스페이스가 생성되었습니다.");
        response.put("statusCode", 200);
        response.put("workspaces", workspaceFindResponse.getWorkspaces());
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> create(@Valid WorkspaceCreateRequest workspaceCreateRequest, BindingResult bindingResult, HttpServletRequest servletRequest) {
        log.info("CREATE/workspaces");
        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));

        TokenService.isMatched(workspaceCreateRequest.getUserId(), Long.parseLong(servletRequest.getAttribute("id").toString()));

        WorkspaceFindResponse workspaceFindResponse = workspaceService.createWorkspace(workspaceCreateRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "워크스페이스가 생성되었습니다.");
        response.put("statusCode", 200);
        response.put("workspaces", workspaceFindResponse.getWorkspaces());
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{workspaceId}")
    public ResponseEntity<Map<String, Object>> update(@Valid WorkspaceUpdateRequest workspaceUpdateRequest, BindingResult bindingResult, HttpServletRequest servletRequest) {
        log.info("PUT/workspaces/:workspaceId");
        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));

        TokenService.isMatched(workspaceUpdateRequest.getUserId(), Long.parseLong(servletRequest.getAttribute("id").toString()));

        workspaceService.update(workspaceUpdateRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "워크스페이스가 수정되었습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{workspaceId}")
    public ResponseEntity<Map<String, Object>> delete(WorkspaceDeleteRequest workspaceDeleteRequest, BindingResult bindingResult, HttpServletRequest servletRequest) {
        log.info("DELETE/workspaces/:workspaceId");
        if (bindingResult.hasErrors())
            throw new CustomException(new ValidExceptionType(5000, 200, bindingResult.getFieldError().getDefaultMessage()));

        TokenService.isMatched(workspaceDeleteRequest.getUserId(), Long.parseLong(servletRequest.getAttribute("id").toString()));

        workspaceService.deleteById(workspaceDeleteRequest.getWorkspaceId());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "워크스페이스가 삭제되었습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().body(response);
    }
}
