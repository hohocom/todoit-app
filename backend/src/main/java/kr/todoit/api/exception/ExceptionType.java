package kr.todoit.api.exception;

public interface ExceptionType {
    int getErrorCode();
    int getHttpStatus();
    String getErrorMessage();
}
