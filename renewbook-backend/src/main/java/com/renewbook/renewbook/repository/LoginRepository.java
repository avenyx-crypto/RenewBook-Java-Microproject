package com.renewbook.renewbook.repository;

import com.renewbook.renewbook.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Long> {

}