package com.elementopia.database.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "element")
public class ElementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long elementId;

    @Column(nullable = false)
    private String name;

    private String symbol;
    private int atomicNumber;
    private String description;

    @Column(nullable = false)
    private LocalDate dateDiscovered;

    // Relationship with UserEntity
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private UserEntity user;
}