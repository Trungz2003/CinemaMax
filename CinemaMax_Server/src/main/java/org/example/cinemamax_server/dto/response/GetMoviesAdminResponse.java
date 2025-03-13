package org.example.cinemamax_server.dto.response;

public interface GetMoviesAdminResponse {
    Long getId();
    String getTitle();
    Double getRating();
    Integer getView();
    String getStatus();
    String getReleaseDate();
    String getGenres(); // Danh sách thể loại dưới dạng chuỗi
}
