package com.tourneyhub.backend.repository;

import com.tourneyhub.backend.domain.Country;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends CrudRepository<Country, Long> {

    Country findByIso2(String iso2);
}
