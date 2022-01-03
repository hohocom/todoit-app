package kr.todoit.api.service;

import kr.todoit.api.domain.User;
import kr.todoit.api.domain.Work;
import kr.todoit.api.domain.WorkGroup;
import kr.todoit.api.domain.Workspace;
import kr.todoit.api.dto.*;
import kr.todoit.api.exception.CustomException;
import kr.todoit.api.exception.DefaultExceptionType;
import kr.todoit.api.mapper.WorkMapper;
import kr.todoit.api.repository.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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

    public List<WorkFindResponse> findWorksByOptions(WorkFindRequest workFindRequest) {
        return workMapper.findWorksByOptions(workFindRequest);
    }

    public List<WorkFindResponse> create(WorkCreateRequest workCreateRequest) throws ParseException {
        Workspace workspace = workspaceRepository.findOneById(workCreateRequest.getWorkspaceId());
        WorkFindRequest workFindRequest = new WorkFindRequest();

        if (workspace == null)
            throw new CustomException(DefaultExceptionType.NOT_FOUND_WORKSPACE);

        Work work = workCreateRequest.toWork();
        workRepository.save(work);

        for (Long userId : workCreateRequest.getUsers()) {
            User user = userRepository.findUserById(userId);
            if (user == null)
                throw new CustomException(DefaultExceptionType.NOT_FOUND_USER);

            // SET LEVEL
            int userLevel = user.getLevel();
            Short userExp = user.getExp();
            int newExp = userExp + (100 / userLevel);
            while (newExp >= 100) {
                System.out.println(newExp);
                newExp -= 100;
                userLevel += 1;
            }
            user.setExp((short) newExp);
            user.setLevel((short) (userLevel));
            // SET LEVEL

            WorkGroup workGroup = WorkGroup.builder()
                    .user(user)
                    .work(work)
                    .workspace(workspace)
                    .build();
            workGroupRepository.save(workGroup);
            workFindRequest.setWorkspaceId(workGroup.getWorkspace().getId());
        }

        return workMapper.findWorksByOptions(workFindRequest);
    }

    public void update(WorkUpdateRequest workUpdateRequest) {
        Work work = workRepository.findWorkById(workUpdateRequest.getWorkId());
        if (work == null) throw new CustomException(DefaultExceptionType.NOT_FOUND_WORK);

        work.setTitle(workUpdateRequest.getTitle());
        work.setStartDate(workUpdateRequest.getStartDate());

        if (workUpdateRequest.getThemeColor() != null)
            work.setThemeColor(workUpdateRequest.getThemeColor());
        if (workUpdateRequest.getContent() != null)
            work.setContent(workUpdateRequest.getContent());
        if (workUpdateRequest.getEndDate() != null)
            work.setEndDate(workUpdateRequest.getEndDate());
    }

    public void update(WorkFinishedRequest workFinishedRequest) throws ParseException {
        Work work = workRepository.findWorkById(workFinishedRequest.getWorkId());
        work.setIsFinished(workFinishedRequest.getResult());
        List<WorkGroup> workGroups = workGroupRepository.findWorkGroupByWork(work);

//        SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd");
//        Date start = format.parse(work.getStartDate());
//        Date end = format.parse(work.getEndDate());
//        Long subtractTime = end.getTime() - start.getTime();
//        int rageNum = (int) (subtractTime /86400000);
//        rageNum *= 100;

        if(workFinishedRequest.getResult() == 1){
            for (WorkGroup workGroup : workGroups) {
                User user = workGroup.getUser();
                // SET LEVEL
                int userLevel = user.getLevel();
                Short userExp = user.getExp();
                int newExp = userExp + (100 / userLevel);
                while (newExp >= 100) {
                    System.out.println(newExp);
                    newExp -= 100;
                    userLevel += 1;
                }
                user.setExp((short) newExp);
                user.setLevel((short) (userLevel));
                // SET LEVEL
            }
        }
    }

    public void updateDate(WorkUpdateDateRequest workUpdateDateRequest, Long loginUserId) {
        List<WorkGroup> workGroups =  workGroupRepository.findByWorkIdAndUserId(workUpdateDateRequest.getWorkId(), workUpdateDateRequest.getUserId());

        boolean result = false;
        for (WorkGroup workGroup : workGroups) {
            if (workGroup.getUser().getId() == loginUserId) {
                result = true;
            }
        }
        if (!result) throw new CustomException(DefaultExceptionType.AUTHENTICATE_NOT_MATCH);

        Work work = workRepository.findWorkById(workUpdateDateRequest.getWorkId());
        work.setStartDate(workUpdateDateRequest.getStartDate());
        work.setEndDate(workUpdateDateRequest.getEndDate());
    }

    public void delete(Long workId) {
        workRepository.deleteById(workId);
    }
}
