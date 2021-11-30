package com.example.api.repository;

import com.example.api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    Short countByNickname(String randomNickname);

    User findUserById(Long userId);

    Short countByUserCode(String randomCode);

    User findByUserCode(String userCode);
}
