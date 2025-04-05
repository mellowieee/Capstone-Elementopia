package com.elementopia.database.controller;

import com.elementopia.database.entity.DiscoveryEntity;
import com.elementopia.database.service.DiscoveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discoveries")
@RequiredArgsConstructor
public class DiscoveryController {
    private final DiscoveryService discoveryService;

    @PostMapping
    public ResponseEntity<DiscoveryEntity> logDiscovery(@RequestBody DiscoveryEntity discovery) {
        return ResponseEntity.ok(discoveryService.logDiscovery(discovery));
    }

    @GetMapping("/my-discoveries")
    public ResponseEntity<List<DiscoveryEntity>> getCurrentUserDiscoveries() {
        return ResponseEntity.ok(discoveryService.getDiscoveriesForCurrentUser());
    }
}