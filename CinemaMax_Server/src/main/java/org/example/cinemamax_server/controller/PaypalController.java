package org.example.cinemamax_server.controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.dto.request.PaymentRequestDTO;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.dto.response.PaymentResponse;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.service.PaypalService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DecimalFormat;

@RestController
@RequestMapping("/api/paypal")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaypalController {
    PaypalService paypalService;

    @PostMapping("/pay")
    public ApiResponse<String> processPayment(@RequestBody PaymentRequestDTO paymentRequest) {
        try {
            // Tách tên gói và giá tiền từ chuỗi đầu vào
            String[] parts = paymentRequest.getPackageName().split(" - \\$", 2);
            if (parts.length < 2) {
                throw new AppException(ErrorCode.INVALID_PACKAGE_FORMAT);
            }
            String planName = parts[0];
            double amount = Double.parseDouble(parts[1]);

            // Định dạng số tiền về đúng chuẩn PayPal (2 số thập phân, dấu chấm)
            String formattedAmount = String.format("%.2f", amount).replace(",", ".");

            Payment payment = paypalService.createPaymentWithPayPal(
                    paymentRequest.getEmail(),
                    planName,
                    Double.parseDouble(formattedAmount),
                    "USD", // Currency
                    "paypal", // Payment method
                    "sale", // Intent
                    "Payment for: " + paymentRequest.getName() + " - " + paymentRequest.getEmail() + " - " + planName + " - " + amount, // Description
                    "http://localhost:8081/api/paypal/cancel", // Cancel URL
                    "http://localhost:8081/api/paypal/success" // Success URL
            );

            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    return ApiResponse.<String>builder()
                            .result(link.getHref())
                            .build();
                }
            }

            throw new AppException(ErrorCode.PAYMENT_APPROVAL_URL_NOT_FOUND);
        }  catch (NumberFormatException e) {
            throw new AppException(ErrorCode.INVALID_AMOUNT_FORMAT);
        } catch (PayPalRESTException e) {
            throw new AppException(ErrorCode.PAYPAL_ERROR);
        }
    }

    @GetMapping("/success")
    public void executePayment(@RequestParam String paymentId,
                               @RequestParam(name = "PayerID") String payerId,
                               HttpServletResponse response) {
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);

            if (payment == null || !"approved".equalsIgnoreCase(payment.getState())) {
                throw new AppException(ErrorCode.PAYMENT_EXECUTION_FAILED);
            }

            // Chuyển hướng về trang Home với trạng thái thành công và paymentId
            response.sendRedirect("http://127.0.0.1:5173/?success");
        } catch (PayPalRESTException | IOException e) {
            try {
                // Chuyển hướng về Home với trạng thái thất bại
                response.sendRedirect("http://127.0.0.1:5173/?failed");
            } catch (IOException ex) {
                throw new AppException(ErrorCode.PAYPAL_ERROR);
            }
        }
    }

}
