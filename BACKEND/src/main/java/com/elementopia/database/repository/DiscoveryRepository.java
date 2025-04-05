package com.elementopia.database.repository;

import com.elementopia.database.entity.DiscoveryEntity;
import com.elementopia.database.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DiscoveryRepository extends JpaRepository<DiscoveryEntity, Long> {
    List<DiscoveryEntity> findByUser(UserEntity user);
}