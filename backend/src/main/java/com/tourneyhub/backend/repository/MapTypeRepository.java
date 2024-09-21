package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.MapType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapTypeRepository extends JpaRepository<MapType, Long> {}
