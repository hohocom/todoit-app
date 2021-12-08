package kr.todoit.api.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "workspace_groups")
@Getter
@NoArgsConstructor
public class WorkspaceGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private WorkspaceGroupRoleCategory workspaceGroupRoleCategory;

    @Column(length = 20)
    private String duty;

    @Builder
    public WorkspaceGroup(Long id, Workspace workspace, User user, WorkspaceGroupRoleCategory workspaceGroupRoleCategory, String duty) {
        this.id = id;
        this.workspace = workspace;
        this.user = user;
        this.workspaceGroupRoleCategory = workspaceGroupRoleCategory;
        this.duty = duty;
    }
}
