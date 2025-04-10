package com.elementopia.database.service;

import com.elementopia.database.entity.DiscoveryEntity;
import com.elementopia.database.entity.UserEntity;
import com.elementopia.database.repository.DiscoveryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiscoveryService {
    private final DiscoveryRepository discoveryRepository;

    @Transactional
    public DiscoveryEntity logDiscovery(DiscoveryEntity discovery) {
        UserEntity currentUser = (UserEntity) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return discoveryRepository.save(discovery);
    }

//    public List<DiscoveryEntity> getDiscoveriesForCurrentUser() {
//        UserEntity currentUser = (UserEntity) SecurityContextHolder.getContext()
//                .getAuthentication().getPrincipal();
//        return discoveryRepository.findByUser(currentUser);
//    }
}