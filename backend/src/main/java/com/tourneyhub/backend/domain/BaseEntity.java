package com.tourneyhub.backend.domain;

import jakarta.persistence.*;

@MappedSuperclass
public class BaseEntity {

    protected static final String URL_REGEX = (
            "^(?:https?|ftp)://(?:www\\.)?[a-z0-9-]+(?:\\.[a-z0-9-]+)+\\S*/i$"
    );

    protected static final String POS_NUM_REGEX = "^/d+$";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
}
