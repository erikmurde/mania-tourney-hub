package com.tourneyhub.backend.dto.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ValidationErrorResponse {

    private Integer statusCode;

    private String message;

    private List<String> errors;
}
