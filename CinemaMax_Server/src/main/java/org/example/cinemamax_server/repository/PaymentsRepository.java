package org.example.cinemamax_server.repository;

import org.example.cinemamax_server.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentsRepository extends JpaRepository<Payments, Integer> {
    void deleteByUserId(int userId);
    Optional<Payments> findByTransactionId(String transactionId); // Thêm phương thức này
}