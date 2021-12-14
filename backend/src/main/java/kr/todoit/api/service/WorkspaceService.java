package kr.todoit.api.service;

import kr.todoit.api.domain.User;
import kr.todoit.api.domain.Workspace;
import kr.todoit.api.domain.WorkspaceGroup;
import kr.todoit.api.domain.WorkspaceGroupRoleCategory;
import kr.todoit.api.dto.WorkspaceCreateRequest;
import kr.todoit.api.dto.WorkspaceFindResponse;
import kr.todoit.api.dto.WorkspaceUpdateRequest;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import kr.todoit.api.repository.WorkspaceGroupRepository;
import kr.todoit.api.repository.WorkspaceGroupRoleCategoryRepository;
import kr.todoit.api.repository.WorkspaceRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class WorkspaceService {

    private WorkspaceRepository workspaceRepository;
    private WorkspaceGroupRepository workspaceGroupRepository;
    private WorkspaceGroupRoleCategoryRepository workspaceGroupRoleCategoryRepository;
    private UserService userService;

    public WorkspaceFindResponse findWorkspacesByUser(User user){
        List<WorkspaceGroup> workspaceGroups = workspaceGroupRepository.findAllByUser(user);
        return WorkspaceFindResponse.of(workspaceGroups);
    }

    public WorkspaceFindResponse findWorkspacesByUserId(Long id){
        List<WorkspaceGroup> workspaceGroups = workspaceGroupRepository.findAllByUserId(id);
        return WorkspaceFindResponse.of(workspaceGroups);
    }

    public WorkspaceFindResponse createWorkspace(WorkspaceCreateRequest workspaceCreateRequest) {
        // workspace 생성
        String randomCode = UUID.randomUUID().toString();
        Workspace workspace = workspaceCreateRequest.toWorkspace(randomCode);
        workspaceRepository.save(workspace);

        User user =  userService.findUserById(workspaceCreateRequest.getUserId());
        WorkspaceGroupRoleCategory workspaceGroupRoleCategory = workspaceGroupRoleCategoryRepository.findOneById(1L);

        WorkspaceGroup workspaceGroup = workspaceCreateRequest.toWorkspaceGroup(user, workspace, workspaceGroupRoleCategory);
        workspaceGroupRepository.save(workspaceGroup);

        // workspace 리스트 뿌리기
        return findWorkspacesByUser(user);
    }

    public void update(WorkspaceUpdateRequest workspaceUpdateRequest) {
        Workspace workspace = workspaceRepository.findOneById(workspaceUpdateRequest.getWorkspaceId());
        if(workspace == null){
            throw new CustomException(DefaultExceptionType.NOT_FOUND_WORKSPACE);
        }
        workspace.setName(workspaceUpdateRequest.getWorkspaceName());
    }

    public void deleteById(Long id) {
        workspaceGroupRepository.deleteByWorkspaceId(id);
        workspaceRepository.deleteById(id);
    }
}
