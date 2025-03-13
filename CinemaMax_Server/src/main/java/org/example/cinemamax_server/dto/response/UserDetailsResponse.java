package org.example.cinemamax_server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDetailsResponse {
    GetUserByIdResponse user;
    List<GetReviewsByUserIdResponse> reviews;
    List<GetCommentByUserIdResponse> comments;
}
