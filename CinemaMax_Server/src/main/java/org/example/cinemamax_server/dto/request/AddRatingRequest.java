package org.example.cinemamax_server.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.validation.constraints.*;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddRatingRequest {

    @NotBlank(message = "Tiêu đề không được để trống")
    String title;

    @NotBlank(message = "Nội dung không được để trống")
    String content;

    @NotNull(message = "Đánh giá không được để trống")
    @Min(value = 1, message = "Rating phải từ 1 đến 10")
    @Max(value = 10, message = "Rating phải từ 1 đến 10")
    Float rating;
}
