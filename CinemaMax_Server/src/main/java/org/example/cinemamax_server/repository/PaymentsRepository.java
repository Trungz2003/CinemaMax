package org.example.cinemamax_server.repository;

import org.example.cinemamax_server.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentsRepository extends JpaRepository<Payments, Integer> {
    void deleteByUserId(int userId);
}