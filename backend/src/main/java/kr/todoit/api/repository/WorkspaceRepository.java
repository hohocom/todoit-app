package kr.todoit.api.repository;

import kr.todoit.api.domain.User;
import kr.todoit.api.domain.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    Workspace findOneById(Long workspaceId);
}
