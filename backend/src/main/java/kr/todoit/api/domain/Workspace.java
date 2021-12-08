package kr.todoit.api.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "workspaces")
@Getter
@Setter
@NoArgsConstructor
public class Workspace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 50, nullable = false)
    private String code;

    @Builder
    public Workspace(Long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }
}
