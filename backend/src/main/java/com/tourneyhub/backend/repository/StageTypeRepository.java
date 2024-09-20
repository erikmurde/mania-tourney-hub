package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.StageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StageTypeRepository extends JpaRepository<StageType, Long> {

    Optional<StageType> findByName(String name);
}
