package com.example.RecycleApp.Repository;

import com.example.RecycleApp.Entities.CourierEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourierRepository extends JpaRepository<CourierEntity, Integer> {
}
