package org.example.cinemamax_server.controller;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.enums.ReactionType;
import org.example.cinemamax_server.service.CommentReactionService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentReactionController {
    CommentReactionService commentReactionService;

    @PostMapping("/comment/{commentId}/react")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<?> reactToComment(
            @PathVariable int commentId,
            @RequestParam ReactionType reactionType,
            Authentication authentication) {
        String email = (authentication != null) ? authentication.getName() : null;
        String message = commentReactionService.reactToComment(commentId, email, reactionType);
        return ApiResponse.builder()
                .message(message)
                .result(null)
                .build();
    }
}
