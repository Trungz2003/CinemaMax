package org.example.cinemamax_server.service;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public boolean deleteVideoByUrl(String videoUrl) {
        try {
            String publicId = extractPublicId(videoUrl);
            if (publicId == null) {
                System.out.println("Không tìm thấy public_id hợp lệ trong URL.");
                return false;
            }

            Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "video"));

            System.out.println("Kết quả xóa: " + result);
            return "ok".equals(result.get("result"));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean deleteImageByUrl(String imageUrl) {
        try {
            String publicId = extractPublicId(imageUrl);
            if (publicId == null) {
                System.out.println("Không tìm thấy public_id hợp lệ trong URL.");
                return false;
            }

            // Xóa ảnh (thay "video" thành "image")
            Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "image"));

            System.out.println("Kết quả xóa: " + result);
            return "ok".equals(result.get("result"));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private String extractPublicId(String videoUrl) {
        Pattern pattern = Pattern.compile("/upload/(v\\d+/)?([^\\.]+)");
        Matcher matcher = pattern.matcher(videoUrl);
        if (matcher.find()) {
            return matcher.group(2);
        }
        return null;
    }
}
