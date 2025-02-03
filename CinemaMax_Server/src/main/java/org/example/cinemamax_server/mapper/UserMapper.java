package org.example.cinemamax_server.mapper;

import org.example.cinemamax_server.dto.request.UserRequest;
import org.example.cinemamax_server.dto.response.UserResponse;
import org.example.cinemamax_server.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserRequest user);

    UserResponse toUserResponse(User user);

}
