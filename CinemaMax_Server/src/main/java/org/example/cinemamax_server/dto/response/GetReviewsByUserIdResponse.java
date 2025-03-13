package org.example.cinemamax_server.dto.response;

import java.time.LocalDate;

public interface GetReviewsByUserIdResponse {
    Long getId();            // ID của phim
    String getTitle();       // Tên phim
    String getActor();       // Diễn viên
    String getContent();     // Nội dung đánh giá
    Float getRating();       // Điểm đánh giá trung bình
    LocalDate getReleaseDate(); // Ngày phát hành
}

