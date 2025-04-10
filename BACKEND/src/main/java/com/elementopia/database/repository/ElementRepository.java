package com.elementopia.database.repository;

import com.elementopia.database.entity.ElementEntity;
import com.elementopia.database.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ElementRepository extends JpaRepository<ElementEntity, Long> {
    //List<ElementEntity> findByUser(UserEntity user);
}