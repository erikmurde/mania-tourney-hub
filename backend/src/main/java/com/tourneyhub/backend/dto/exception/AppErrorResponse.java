package com.tourneyhub.backend.dto.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AppErrorResponse {

    private Integer statusCode;

    private String message;
}
