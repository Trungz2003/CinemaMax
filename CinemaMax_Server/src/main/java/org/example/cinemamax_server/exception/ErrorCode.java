package org.example.cinemamax_server.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(500, "ngoại lệ chưa được phân loại", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED(409, "username đã tồn tại", HttpStatus.CONFLICT),
    USER_ID_EXISTED(404, "user không tồn tại", HttpStatus.BAD_REQUEST),
    USER_ID_EMPTY(400, "chua truyen id", HttpStatus.BAD_REQUEST),
    INVALID_KEY(400, "key không hợp lệ", HttpStatus.BAD_REQUEST),
    RESOURCE_NOT_ALLOWED(405, "Không được phép truy cập", HttpStatus.NOT_FOUND),
    ENDPOINT_NOT_FOUND(404, "endpoint không hợp lệ", HttpStatus.NOT_FOUND),
    USERNAME_INVALID(400, "username phai du {min} ky tu tro len", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(400, "password phai du {min} ky tu tro len", HttpStatus.BAD_REQUEST),
    PASSWORD_NULL_OR_EMPTY(400, "chưa nhập id", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(401, "token không hợp lệ", HttpStatus.UNAUTHORIZED),
    INVALID_DOB(400, "Tuổi của bạn phải ít nhất là {min}", HttpStatus.BAD_REQUEST),
    UNAUTHORIZED(1008, "user không có quyền truy cập", HttpStatus.FORBIDDEN),
    DATA_NOT_COMPLETE(400, "Dữ liệu không đầy đủ", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(405, "User not existed", HttpStatus.NOT_FOUND),
    EMAIL_ALREADY_EXISTS(409, "email already exists", HttpStatus.CONFLICT),
    USER_NOT_ACTIVATED(403, "Tài khoản chưa được kích hoạt", HttpStatus.FORBIDDEN),
    EMAIL_REGISTERED_WITH_SYSTEM(400, "Email đã được đăng ký với phương thức hệ thống", HttpStatus.BAD_REQUEST),
    NOT_FOUND(404, "Không tìm thấy thể loại nào", HttpStatus.NOT_FOUND),
    INVALID_USER_ID(400, "Id không hợp lệ", HttpStatus.BAD_REQUEST),
    ID_NOT_EXISTED(404, "Id không tồn tại", HttpStatus.NOT_FOUND),
    MOVIE_NOT_EXISTED(405, "Movie not existed", HttpStatus.NOT_FOUND),
    ROLE_NOT_FOUND(404, "Role not existed", HttpStatus.NOT_FOUND),
    SUBSCRIPTION_NOT_FOUND(404, "Subscription not existed", HttpStatus.NOT_FOUND),
    INCORRECT_PASSWORD(400, "Mật khẩu cũ không đúng!", HttpStatus.BAD_REQUEST),
    ACCOUNT_IS_NOT_SYSTEM_ACCOUNT(400, "This account is not a system account and cannot change the password", HttpStatus.BAD_REQUEST),
    GENRES_IS_NOT(400, "Không tìm thấy thể loại với ID!", HttpStatus.NOT_FOUND)
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
