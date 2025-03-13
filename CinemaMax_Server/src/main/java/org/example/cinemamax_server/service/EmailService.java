package org.example.cinemamax_server.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.List;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String text) {
        // Tạo một MimeMessage để gửi email với định dạng HTML
        MimeMessage message = mailSender.createMimeMessage();
        try {
            // Sử dụng MimeMessageHelper để hỗ trợ cấu hình email dễ dàng hơn
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);  // Địa chỉ email người nhận
            helper.setSubject(subject);  // Tiêu đề email
            helper.setText(text, true);  // Nội dung email với định dạng HTML (true)
            helper.setFrom("StreamPhim@gmail.com", "StreamPhim Team");  // Địa chỉ email người gửi (thay thế bằng email thật)
            mailSender.send(message);  // Gửi email
        } catch (MessagingException e) {
            e.printStackTrace();  // Xử lý lỗi nếu có
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendEmails(List<String> toList, String subject, String text) {
        if (toList.isEmpty()) return; // Nếu không có email nào, thoát luôn

        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toList.toArray(new String[0])); // Gửi đến nhiều email
            helper.setSubject(subject);
            helper.setText(text, true); // Nội dung HTML
            helper.setFrom("StreamPhim@gmail.com", "StreamPhim Team");

            mailSender.send(message); // Gửi email
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }
}
