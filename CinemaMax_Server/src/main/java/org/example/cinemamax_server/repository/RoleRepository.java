package org.example.cinemamax_server.repository;

import org.example.cinemamax_server.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
    Role findByName(String name);

    @Modifying
    @Transactional
    @Query(value = "UPDATE users_roles SET roles_name = :newRole WHERE user_id = :userId", nativeQuery = true)
    void updateUserRole(@Param("userId") Long userId, @Param("newRole") String newRole);

}
