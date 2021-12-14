package kr.todoit.api.repository;

import kr.todoit.api.domain.WorkGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkGroupRepository extends JpaRepository<WorkGroup, Long> {
    List<WorkGroup> findByWorkspaceId(Long workspaceId);
}
