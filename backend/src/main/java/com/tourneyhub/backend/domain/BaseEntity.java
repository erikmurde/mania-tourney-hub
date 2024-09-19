package com.tourneyhub.backend.domain;

import jakarta.persistence.*;
import lombok.Data;

@MappedSuperclass
@Data
public class BaseEntity {

    protected static final String URL_REGEX = (
            "^(?:(?:https?|ftp):\\/\\/)(?:www\\.)?[a-z0-9-]+(?:\\.[a-z0-9-]+)+[^\\s]*$"
    );

    protected static final String POS_NUM_REGEX = "^/d+$";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
}
