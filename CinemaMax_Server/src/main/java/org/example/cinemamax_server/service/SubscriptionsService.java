package org.example.cinemamax_server.service;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.dto.response.NameSubscriptionResponse;
import org.example.cinemamax_server.dto.response.RoleResponse;
import org.example.cinemamax_server.entity.Subscriptions;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.repository.SubscriptionsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SubscriptionsService {
    protected SubscriptionsRepository subscriptionsRepository;

    public Subscriptions getSubscriptionsFree(long id){
        return subscriptionsRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public List<NameSubscriptionResponse> getAllSubscriptions(){
        List<Subscriptions> subscriptions = subscriptionsRepository.findAll();

        return subscriptions.stream()
                .map(subscription -> new NameSubscriptionResponse(subscription.getName()))
                .toList();
    }


}
