package kr.todoit.api.repository;

import kr.todoit.api.domain.WorkGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkGroupRepository extends JpaRepository<WorkGroup, Long> {
}
