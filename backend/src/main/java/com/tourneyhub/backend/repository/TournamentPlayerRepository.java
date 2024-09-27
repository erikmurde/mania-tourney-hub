package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.TournamentPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentPlayerRepository extends JpaRepository<TournamentPlayer, Long> {}
