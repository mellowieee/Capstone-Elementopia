package com.elementopia.database.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "discovery")
public class DiscoveryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long discoveryId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate dateDiscovered;

    // Relationship with UserEntity
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private UserEntity user;
}