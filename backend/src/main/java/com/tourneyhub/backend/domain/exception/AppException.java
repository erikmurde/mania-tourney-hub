package com.tourneyhub.backend.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AppException extends RuntimeException {

    private final String message;

    private final HttpStatus httpStatus;
}
