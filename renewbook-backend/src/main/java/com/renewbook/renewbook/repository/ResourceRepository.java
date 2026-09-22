package com.renewbook.renewbook.repository;

import com.renewbook.renewbook.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

}