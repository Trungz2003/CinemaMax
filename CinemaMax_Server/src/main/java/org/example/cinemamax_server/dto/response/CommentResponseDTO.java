package org.example.cinemamax_server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentResponseDTO {
    Long commentId;
    String content;
    LocalDateTime createdAt;
    Long userId;
    String userName;
    String userAvatar;
    int likeCount;
    int dislikeCount;
    String userReaction;  // ✅ Thêm trạng thái phản ứng ("LIKE", "DISLIKE" hoặc "NONE")
}
