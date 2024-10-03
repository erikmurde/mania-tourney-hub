package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.BeatmapType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeatmapTypeRepository extends JpaRepository<BeatmapType, Long> {}
