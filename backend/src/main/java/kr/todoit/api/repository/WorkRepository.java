package kr.todoit.api.repository;

import kr.todoit.api.domain.Work;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkRepository extends JpaRepository<Work, Long> {
    List<Work> findByWorkspaceId(Long workspaceId);
}
