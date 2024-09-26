package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {

    Country findByIso2(String iso2);
}
