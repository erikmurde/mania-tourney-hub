package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {

    Optional<Country> findByName(String name);

    Country findByIso2(String iso2);
}
