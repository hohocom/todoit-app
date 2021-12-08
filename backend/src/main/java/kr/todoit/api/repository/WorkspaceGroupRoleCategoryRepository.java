package kr.todoit.api.repository;

import kr.todoit.api.domain.WorkspaceGroupRoleCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceGroupRoleCategoryRepository extends JpaRepository<WorkspaceGroupRoleCategory, Long> {
    WorkspaceGroupRoleCategory findOneById(long id);
}
