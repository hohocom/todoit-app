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
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Column(length = 50, nullable = false, unique = true)
    private String email;

    @Column(length = 20, nullable = false)
    private String nickname;

    @Column(length = 200)
    private String originImagePath;

    @Column(length = 200)
    private String thumbnailImagePath;

    @Builder
    public User(Long id, String email, String nickname, String originImagePath, String thumbnailImagePath) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.originImagePath = originImagePath;
        this.thumbnailImagePath = thumbnailImagePath;
    }
}
