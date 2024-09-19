package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.Tournament;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentRepository extends CrudRepository<Tournament, Long> {}
