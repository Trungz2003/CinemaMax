package org.example.cinemamax_server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//@FieldDefaults(level = AccessLevel.PRIVATE)
public interface UserSummaryResponse {
    Long getId();
    String getName();
    String getEmail();
    String getUsername();
    String getStatus();
    LocalDate getCreationDate();
    String getPricingPlan();
    Integer getComments();
    Integer getReviews();
}
