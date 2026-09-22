package com.renewbook.renewbook.repository;

import com.renewbook.renewbook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}