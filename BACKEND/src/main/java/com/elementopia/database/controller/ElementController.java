package com.elementopia.database.controller;

import com.elementopia.database.entity.ElementEntity;
import com.elementopia.database.service.ElementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/elements")
@RequiredArgsConstructor
public class ElementController {
    private final ElementService elementService;

    @PostMapping
    public ResponseEntity<ElementEntity> createElement(@RequestBody ElementEntity element) {
        return ResponseEntity.ok(elementService.createElement(element));
    }

//    @GetMapping("/my-elements")
//    public ResponseEntity<List<ElementEntity>> getCurrentUserElements() {
//        return ResponseEntity.ok(elementService.getElementsForCurrentUser());
//    }
}