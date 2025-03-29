package org.example.cinemamax_server.service;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.dto.request.PaymentRequestDTO;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.entity.Payments;
import org.example.cinemamax_server.entity.Subscriptions;
import org.example.cinemamax_server.entity.User;
import org.example.cinemamax_server.entity.UserSubscriptions;
import org.example.cinemamax_server.enums.PaymentStatus;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.repository.PaymentsRepository;
import org.example.cinemamax_server.repository.SubscriptionsRepository;
import org.example.cinemamax_server.repository.UserRepository;
import org.example.cinemamax_server.repository.UserSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaypalService{
    APIContext apiContext;
    UserRepository userRepository;
    SubscriptionsRepository subscriptionsRepository;
    PaymentsRepository paymentsRepository;
    UserSubscriptionRepository userSubscriptionRepository;

    public Payment createPaymentWithPayPal(
            String email,
            String planName,
            Double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelUrl,
            String successUrl) throws PayPalRESTException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(String.format(Locale.US, "%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method.toUpperCase());

        Payment payment = new Payment();
        payment.setIntent(intent.toUpperCase());
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        // 🔹 **Gọi PayPal API để tạo thanh toán**
        Payment createdPayment = payment.create(apiContext);
        String paymentId = createdPayment.getId(); // Lấy paymentId từ PayPal

        // 🔹 **Lưu vào DB với paymentId**
        Payments newPayment = Payments.builder()
                .user(user)
                .subscription(subscriptionsRepository.findByName(planName)
                        .orElseThrow(() -> new AppException(ErrorCode.SUBSCRIPTION_NOT_FOUND)))
                .paymentMethod("PayPal")
                .paymentStatus(PaymentStatus.PENDING)
                .transactionId(paymentId)  // Lưu paymentId vào transactionId
                .amount(total)
                .paymentDate(LocalDateTime.now())
                .build();

        paymentsRepository.save(newPayment);

        return createdPayment; // Trả về thông tin thanh toán PayPal
    }


    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);

        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);

        // 🔹 **Thực hiện thanh toán với PayPal**
        Payment executedPayment = payment.execute(apiContext, paymentExecution);

        // 🔹 **Kiểm tra nếu thanh toán bị từ chối thì báo lỗi**
        String paymentState = executedPayment.getState().toLowerCase();
        if (paymentState.equals("failed") || paymentState.equals("denied") || paymentState.equals("canceled")) {
            throw new AppException(ErrorCode.PAYMENT_REJECTED);
        }

        // 🔹 **Lấy transactionId từ PayPal response**
        String transactionId = executedPayment.getTransactions().get(0)
                .getRelatedResources().get(0).getSale().getId();

        // 🔹 **Tìm payment trong database bằng transactionId**
        Payments userPayment = paymentsRepository.findByTransactionId(paymentId)
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_NOT_FOUND));

        // 🔹 **Cập nhật trạng thái thanh toán**
        userPayment.setPaymentStatus(PaymentStatus.COMPLETED);
        userPayment.setTransactionId(transactionId);
        paymentsRepository.save(userPayment);

        // 🔹 **Lấy subscriptionId từ payments**
        Long subscriptionId = userPayment.getSubscription().getId();

        // 🔹 **Tìm subscription trong database**
        Subscriptions subscription = subscriptionsRepository.findById(subscriptionId)
                .orElseThrow(() -> new AppException(ErrorCode.SUBSCRIPTION_NOT_FOUND));

        // 🔹 **Tìm gói đăng ký của user**
        User user = userPayment.getUser();

        UserSubscriptions userSubscription = userSubscriptionRepository
                .findByUserId(user.getId())
                .orElse(null);

        if (userSubscription == null) {
            // 🔹 **Chưa có, tạo mới**
            userSubscription = UserSubscriptions.builder()
                    .user(user)
                    .subscription(subscription)
                    .startDate(LocalDateTime.now())
                    .endDate(LocalDateTime.now().plusDays(subscription.getDuration()))
                    .status(UserSubscriptions.Status.ACTIVE)
                    .build();
        } else {
            // 🔹 **Có rồi, cập nhật**
            userSubscription.setSubscription(subscription);
            userSubscription.setStartDate(LocalDateTime.now());
            userSubscription.setEndDate(LocalDateTime.now().plusDays(subscription.getDuration()));
            userSubscription.setStatus(UserSubscriptions.Status.ACTIVE);
        }

        userSubscriptionRepository.save(userSubscription);

        return executedPayment;
    }


}
