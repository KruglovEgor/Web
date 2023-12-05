package ru.itmo.lab4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import ru.itmo.lab4.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    //todo finish navsyakiy
    @Query("Select ")
    User findByUsername(String username);
}