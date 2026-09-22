package com.renewbook.renewbook.repository;

import com.renewbook.renewbook.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Long> {

}