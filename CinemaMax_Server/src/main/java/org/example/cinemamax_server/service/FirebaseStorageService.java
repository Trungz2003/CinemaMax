package org.example.cinemamax_server.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.io.FileInputStream;
import java.io.IOException;

@Service
@Slf4j
public class FirebaseStorageService {

    private final Storage storage;
    private final String bucketName = "streamphim-a02d9.appspot.com"; // Thay bằng bucket của bạn

    public FirebaseStorageService() throws IOException {
        // Chỉ khởi tạo Firebase nếu chưa có app nào
        if (FirebaseApp.getApps().isEmpty()) {
            FileInputStream serviceAccount =
                    new FileInputStream("src/main/java/org/example/cinemamax_server/configuration/streamphim-a02d9-firebase-adminsdk-fbsvc-fa9ab58d8e.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setStorageBucket(bucketName)
                    .build();

            FirebaseApp.initializeApp(options);
        }

        this.storage = StorageOptions.getDefaultInstance().getService();
    }

    public boolean deleteImage(String imageUrl) {
        try {
            String fileName = extractFileName(imageUrl);
            if (fileName == null) return false;

            BlobId blobId = BlobId.of(bucketName, fileName);
            boolean deleted = storage.delete(blobId);

            if (deleted) {
                log.info("✅ Đã xóa ảnh: " + fileName);
            } else {
                log.warn("❌ Ảnh không tồn tại hoặc đã bị xóa trước đó: " + fileName);
            }

            return deleted;
        } catch (Exception e) {
            log.error("❌ Lỗi khi xóa ảnh", e);
            return false;
        }
    }

    private String extractFileName(String imageUrl) {
        try {
            return imageUrl.split(bucketName + "/")[1].split("\\?")[0]; // Lấy phần sau bucket
        } catch (Exception e) {
            log.error("❌ Không thể trích xuất tên file từ URL: " + imageUrl);
            return null;
        }
    }
}

