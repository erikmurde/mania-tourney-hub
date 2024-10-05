package com.tourneyhub.backend.handler;

import com.tourneyhub.backend.domain.exception.AppException;
import com.tourneyhub.backend.dto.exception.AppErrorResponse;
import com.tourneyhub.backend.dto.exception.ValidationErrorResponse;
import lombok.NonNull;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class AppExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            @NonNull HttpHeaders headers,
            @NonNull HttpStatusCode status,
            @NonNull WebRequest request)
    {
        String message = "Failed to validate object";
        List<String> errors = new ArrayList<>();

        for (FieldError error : ex.getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }
        var response = new ValidationErrorResponse(status.value(), message, errors);
        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<AppErrorResponse> handleAppException(AppException ex) {

        var response = new AppErrorResponse(ex.getHttpStatus().value(), ex.getMessage());
        return new ResponseEntity<>(response, ex.getHttpStatus());
    }
}
