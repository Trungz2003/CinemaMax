package org.example.cinemamax_server.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.example.cinemamax_server.dto.request.ContactRequest;
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

    public void sendContactEmail(ContactRequest request) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo("quangtrunghytq203@gmail.com"); // Email nhận thông báo
        helper.setSubject(request.getSubject());

        String emailContent = """
            <h3>Bạn có một tin nhắn mới từ người dùng!</h3>
            <p><b>Tên:</b> %s</p>
            <p><b>Email:</b> %s</p>
            <p><b>Nội dung:</b></p>
            <p>%s</p>
        """.formatted(request.getName(), request.getEmail(), request.getMessage());

        helper.setText(emailContent, true);
        mailSender.send(message);
    }
}
