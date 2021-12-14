package kr.todoit.api.repository;

import kr.todoit.api.domain.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    Workspace findOneById(Long workspaceId);

    Workspace findOneByCode(String workspaceCode);
}
