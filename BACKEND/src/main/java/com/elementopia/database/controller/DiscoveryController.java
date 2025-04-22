package com.elementopia.database.controller;

import com.elementopia.database.entity.DiscoveryEntity;
import com.elementopia.database.service.DiscoveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discoveries")
public class DiscoveryController {

    @Autowired
    private DiscoveryService discoveryService;

    @GetMapping("/getAll")
    public List<DiscoveryEntity> getAllDiscoveries() {
        return discoveryService.getAllDiscoveries();
    }

    @GetMapping("/get/{id}")
    public DiscoveryEntity getDiscoveryById(@PathVariable Long id) {
        return discoveryService.getDiscoveryById(id);
    }

    @GetMapping("/getByUser/{userId}")
    public List<DiscoveryEntity> getByUserId(@PathVariable Long userId) {
        return discoveryService.getDiscoveriesByUserId(userId);
    }

    @PostMapping("/create/{userId}")
    public DiscoveryEntity createDiscovery(@PathVariable Long userId, @RequestBody DiscoveryEntity discovery) {
        return discoveryService.createDiscovery(userId, discovery);
    }

    @PutMapping("/update/{id}")
    public DiscoveryEntity updateDiscovery(@PathVariable Long id, @RequestBody DiscoveryEntity discovery) {
        return discoveryService.updateDiscovery(id, discovery);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDiscovery(@PathVariable Long id) {
        String result = discoveryService.deleteDiscovery(id);
        return ResponseEntity.ok(result);
    }

}
