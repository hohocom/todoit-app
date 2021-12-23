package kr.todoit.api.service;

import kr.todoit.api.domain.User;
import kr.todoit.api.domain.Work;
import kr.todoit.api.domain.WorkGroup;
import kr.todoit.api.domain.Workspace;
import kr.todoit.api.dto.WorkCreateRequest;
import kr.todoit.api.dto.WorkFindResponse;
import kr.todoit.api.dto.WorkFinishedRequest;
import kr.todoit.api.dto.WorkUpdateRequest;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import kr.todoit.api.mapper.WorkMapper;
import kr.todoit.api.repository.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
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

    public List<WorkFindResponse> findWorksByWorkspaceId(Long workspaceId) {
        System.out.println(workspaceId);
        List<WorkFindResponse> _works = workMapper.findWorkByWorkspaceIdAndGroupByWorkId(workspaceId);
        return _works;
    }

    public void create(WorkCreateRequest workCreateRequest) throws ParseException {
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

    public void update(WorkUpdateRequest workUpdateRequest) {
        Work work = workRepository.findWorkById(workUpdateRequest.getWorkId());
        if(work == null) throw new CustomException(DefaultExceptionType.NOT_FOUND_WORK);

        work.setTitle(workUpdateRequest.getTitle());
        work.setStartDate(workUpdateRequest.getStartDate());

        if(workUpdateRequest.getThemeColor() != null)
            work.setThemeColor(workUpdateRequest.getThemeColor());
        if(workUpdateRequest.getContent() != null)
            work.setContent(workUpdateRequest.getContent());
        if(workUpdateRequest.getEndDate() != null)
            work.setEndDate(workUpdateRequest.getEndDate());
    }

    public void update(WorkFinishedRequest workFinishedRequest){
        Work work = workRepository.findWorkById(workFinishedRequest.getWorkId());
        work.setIsFinished(workFinishedRequest.getResult());
    }

    public void delete(Long workId){
        workRepository.deleteById(workId);
    }
}
