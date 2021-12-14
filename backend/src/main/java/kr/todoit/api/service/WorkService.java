package kr.todoit.api.service;

import kr.todoit.api.domain.User;
import kr.todoit.api.domain.Work;
import kr.todoit.api.domain.WorkGroup;
import kr.todoit.api.domain.Workspace;
import kr.todoit.api.dto.WorkCreateRequest;
import kr.todoit.api.dto.WorkFindResponse;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import kr.todoit.api.mapper.WorkMapper;
import kr.todoit.api.repository.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class WorkService {

    private WorkRepository workRepository;
    private WorkspaceRepository workspaceRepository;
    private WorkGroupRepository workGroupRepository;
    private UserRepository userRepository;
    private WorkMapper workMapper;

    public List<HashMap<String, Object>> findWorksByWorkspaceId(Long workspaceId) {
        System.out.println(workspaceId);
        List<HashMap<String, Object>> _works = workMapper.findWorkByWorkspaceIdAndGroupByWorkId(workspaceId);
//        List<WorkGroup> workGroups = workGroupRepository.findByWorkspaceId(workspaceId);
//        for (WorkGroup workGroup : workGroups) {
//            HashMap<String, Object> _work = new HashMap<>();
//            _work.put("id", workGroup.getWork().getId());
//            _work.put("title", workGroup.getWork().getTitle());
//            _work.put("content", workGroup.getWork().getContent());
//            _work.put("startDate", workGroup.getWork().getStartDate());
//            _work.put("endDate", workGroup.getWork().getEndDate());
//            _work.put("themeColor", workGroup.getWork().getThemeColor());
//            _work.put("isFinished", workGroup.getWork().getIsFinished());
//            _works.add(_work);
//        }
        return _works;
    }

    public void create(WorkCreateRequest workCreateRequest) {
        Workspace workspace = workspaceRepository.findOneById(workCreateRequest.getWorkspaceId());
        if (workspace == null) {
            throw new CustomException(DefaultExceptionType.NOT_FOUND_WORKSPACE);
        }
        Work work = workCreateRequest.toWork();
        workRepository.save(work);

        for (Long userId : workCreateRequest.getUsers()) {
            User user = userRepository.findUserById(userId);
            if (user == null) {
                throw new CustomException(DefaultExceptionType.NOT_FOUND_USER);
            }
            System.out.println(user);

            WorkGroup workGroup = WorkGroup.builder()
                    .user(user)
                    .work(work)
                    .workspace(workspace)
                    .build();
            workGroupRepository.save(workGroup);
        }
    }
}
