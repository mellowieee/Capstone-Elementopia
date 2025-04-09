package com.elementopia.database.service;

import com.elementopia.database.entity.ElementEntity;
import com.elementopia.database.entity.UserEntity;
import com.elementopia.database.repository.ElementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ElementService {
    private final ElementRepository elementRepository;

    @Transactional
    public ElementEntity createElement(ElementEntity element) {
        UserEntity currentUser = (UserEntity) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        element.setUser(currentUser);
        return elementRepository.save(element);
    }

    public List<ElementEntity> getElementsForCurrentUser() {
        UserEntity currentUser = (UserEntity) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return elementRepository.findByUser(currentUser);
    }
}