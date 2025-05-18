package org.example.cinemamax_server.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(500, "ngoại lệ chưa được phân loại", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED(409, "username đã tồn tại", HttpStatus.CONFLICT),
    USER_ID_EXISTED(404, "user không tồn tại", HttpStatus.BAD_REQUEST),
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
    USER_NOT_EXISTED(405, "User không tồn tại!", HttpStatus.NOT_FOUND),
    EMAIL_ALREADY_EXISTS(409, "email đã tồn tại", HttpStatus.CONFLICT),
    USER_NOT_ACTIVATED(403, "Tài khoản chưa được kích hoạt", HttpStatus.FORBIDDEN),
    EMAIL_REGISTERED_WITH_SYSTEM(400, "Email đã được đăng ký với phương thức hệ thống", HttpStatus.BAD_REQUEST),
    NOT_FOUND(404, "Không tìm thấy thể loại nào", HttpStatus.NOT_FOUND),
    INVALID_USER_ID(400, "Id không hợp lệ", HttpStatus.BAD_REQUEST),
    ID_NOT_EXISTED(404, "Id không tồn tại", HttpStatus.NOT_FOUND),
    MOVIE_NOT_EXISTED(405, "Movie không tồn tại!", HttpStatus.NOT_FOUND),
    ROLE_NOT_FOUND(404, "Role not existed", HttpStatus.NOT_FOUND),
    SUBSCRIPTION_NOT_FOUND(404, "Subscription không tồn tại!", HttpStatus.NOT_FOUND),
    INCORRECT_PASSWORD(400, "Mật khẩu cũ không đúng!", HttpStatus.BAD_REQUEST),
    ACCOUNT_IS_NOT_SYSTEM_ACCOUNT(400, "This account is not a system account and cannot change the password", HttpStatus.BAD_REQUEST),
    GENRES_IS_NOT(400, "Không tìm thấy thể loại với ID!", HttpStatus.NOT_FOUND),
    EMAIL_NOT_MATCH(400, "Email không trùng khớp!", HttpStatus.BAD_REQUEST),
    ACCOUNT_LOCKED(403, "Tài khoản của bạn đã bị khóa!", HttpStatus.FORBIDDEN),
    SUBSCRIPTION_EXPIRED(403, "Gói đăng ký của bạn đã hết hạn!", HttpStatus.FORBIDDEN),
    SUBSCRIPTION_NOT_ACTIVE(403, "Tài khoản của bạn chưa được kích hoạt gói đăng kí!", HttpStatus.FORBIDDEN),
    SUBSCRIPTION_CANCELLED(403, "Gói đăng ký của bạn đã bị hủy!", HttpStatus.FORBIDDEN),
    ALREADY_RATED(400, "Bạn đã đánh giá bộ phim này trước đó!", HttpStatus.BAD_REQUEST),
    INVALID_PACKAGE_FORMAT(400, "Định dạng gói không hợp lệ!", HttpStatus.BAD_REQUEST),
    PAYMENT_NOT_FOUND(404, "Không tìm thấy giao dịch thanh toán!", HttpStatus.NOT_FOUND),
    PAYMENT_EXECUTION_FAILED(500, "Thực hiện thanh toán thất bại!", HttpStatus.INTERNAL_SERVER_ERROR),
    PAYPAL_ERROR(500, "Lỗi xảy ra khi xử lý với PayPal!", HttpStatus.INTERNAL_SERVER_ERROR),
    PAYMENT_APPROVAL_URL_NOT_FOUND(404, "Không tìm thấy URL phê duyệt thanh toán!", HttpStatus.NOT_FOUND),
    INVALID_AMOUNT_FORMAT(400, "Định dạng số tiền không hợp lệ!", HttpStatus.BAD_REQUEST),
    PAYMENT_REJECTED(400, "Thanh toán bị từ chối!", HttpStatus.BAD_REQUEST),
    MOVIE_NOT_RELEASED(400, "Phim chưa được công chiếu!", HttpStatus.BAD_REQUEST),
    EMAIL_SEND_FAILED(500, "Không thể gửi email!", HttpStatus.INTERNAL_SERVER_ERROR),
    AUTH_FAILED(401, "Tài khoản hoặc mật khẩu không chính xác", HttpStatus.UNAUTHORIZED);

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
