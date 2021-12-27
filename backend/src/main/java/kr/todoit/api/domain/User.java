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

    @Column(length = 50, nullable = false)
    private String email;

    @Column(length = 20, nullable = false)
    private String provider;

    @Column(length = 20, nullable = false)
    private String nickname;

    private Short level;

    private Short exp;

    @Column(length = 200)
    private String originImagePath;

    @Column(length = 200)
    private String thumbnailImagePath;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Builder
    public User(Long id, String email, String provider, String nickname, Short level, Short exp, String originImagePath, String thumbnailImagePath) {
        this.id = id;
        this.email = email;
        this.provider = provider;
        this.nickname = nickname;
        this.level = level;
        this.exp = exp;
        this.originImagePath = originImagePath;
        this.thumbnailImagePath = thumbnailImagePath;
    }
}
