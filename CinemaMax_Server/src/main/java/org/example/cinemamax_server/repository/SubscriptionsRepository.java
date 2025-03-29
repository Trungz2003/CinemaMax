package org.example.cinemamax_server.repository;

import org.example.cinemamax_server.entity.Subscriptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriptionsRepository extends JpaRepository<Subscriptions, Long> {
    Optional<Subscriptions> findByName(String name);
}
