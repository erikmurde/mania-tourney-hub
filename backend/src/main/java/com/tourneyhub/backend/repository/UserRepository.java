package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByPlayerId(Integer playerId);
}
