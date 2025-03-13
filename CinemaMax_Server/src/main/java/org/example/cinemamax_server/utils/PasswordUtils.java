package org.example.cinemamax_server.utils;

import java.security.SecureRandom;

public class PasswordUtils {

    // Dải ký tự bao gồm chữ cái in hoa, in thường, số và ký tự đặc biệt
    private static final String UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";
    private static final String SPECIAL_CHARACTERS = "!@#$%^&*()-_=+[]{}|;:',.<>?/";

    private static final int PASSWORD_LENGTH = 12;
    private static final SecureRandom random = new SecureRandom();

    public static String generateRandomPassword() {
        // StringBuilder để tạo mật khẩu
        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);

        // Đảm bảo có ít nhất một ký tự in hoa, in thường, số và ký tự đặc biệt
        password.append(UPPERCASE_CHARACTERS.charAt(random.nextInt(UPPERCASE_CHARACTERS.length())));  // Chữ in hoa
        password.append(LOWERCASE_CHARACTERS.charAt(random.nextInt(LOWERCASE_CHARACTERS.length())));  // Chữ in thường
        password.append(DIGITS.charAt(random.nextInt(DIGITS.length())));  // Số
        password.append(SPECIAL_CHARACTERS.charAt(random.nextInt(SPECIAL_CHARACTERS.length())));  // Ký tự đặc biệt

        // Sau đó thêm các ký tự ngẫu nhiên còn lại vào mật khẩu để đủ độ dài
        String allCharacters = UPPERCASE_CHARACTERS + LOWERCASE_CHARACTERS + DIGITS + SPECIAL_CHARACTERS;
        for (int i = password.length(); i < PASSWORD_LENGTH; i++) {
            int randomIndex = random.nextInt(allCharacters.length());
            password.append(allCharacters.charAt(randomIndex));
        }

        // Trộn mật khẩu để không có thứ tự cố định
        String passwordString = password.toString();
        StringBuilder shuffledPassword = new StringBuilder(PASSWORD_LENGTH);
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            int randomIndex = random.nextInt(passwordString.length());
            shuffledPassword.append(passwordString.charAt(randomIndex));
            passwordString = passwordString.substring(0, randomIndex) + passwordString.substring(randomIndex + 1);
        }

        return shuffledPassword.toString();
    }
}
