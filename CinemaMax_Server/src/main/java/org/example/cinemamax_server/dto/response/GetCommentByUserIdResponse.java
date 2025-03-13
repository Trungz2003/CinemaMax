package org.example.cinemamax_server.dto.response;

import java.time.LocalDate;

public interface GetCommentByUserIdResponse {
    Long getId();
    String getTitle();
    String getActor();
    String getContent();
    String getThichKhongThich(); // VD: "45/19"
    LocalDate getCreatedAt(); // Chỉ lấy ngày (yyyy-MM-dd)
}

