package kr.todoit.api.repository;

import kr.todoit.api.domain.User;
import kr.todoit.api.domain.Workspace;
import kr.todoit.api.domain.WorkspaceGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkspaceGroupRepository extends JpaRepository<WorkspaceGroup, Long> {
    List<WorkspaceGroup> findAllByUser(User user);

    List<WorkspaceGroup> findAllByUserId(Long id);

    void deleteByWorkspaceId(Long id);

    List<WorkspaceGroup> findByWorkspaceIdOrderByUserNicknameAsc(Long workspaceId);

    List<WorkspaceGroup> findByWorkspaceCodeOrderByUserNicknameAsc(String workspaceCode);

    WorkspaceGroup findOneByWorkspaceAndUser(Workspace workspace, User user);

}
