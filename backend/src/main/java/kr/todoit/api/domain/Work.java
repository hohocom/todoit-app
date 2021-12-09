package kr.todoit.api.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "works")
@NoArgsConstructor
@Getter
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Column(length = 50)
    private String title;

    @Column(columnDefinition = "text")
    private String content;

    private String themeColor;

    @Column(nullable = false)
    private String startDate;

    private String endDate;

    @Column(length = 1, columnDefinition = "int default 0")
    private Byte isFinished;


    @Builder
    public Work(Long id, Workspace workspace, String title, String content, String themeColor, String startDate, String endDate, Byte isFinished) {
        this.id = id;
        this.workspace = workspace;
        this.title = title;
        this.content = content;
        this.themeColor = themeColor;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isFinished = isFinished;
    }
}
