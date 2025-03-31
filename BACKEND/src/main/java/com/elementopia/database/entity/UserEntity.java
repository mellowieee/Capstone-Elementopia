package com.elementopia.database.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user")
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
    private Long userId;
=======
    @Column(name = "userId")
    private Long userId;

>>>>>>> c86b59f5a44db58bcd910fc19b0c61ceb1cdb006
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

<<<<<<< HEAD
    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
=======
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
>>>>>>> c86b59f5a44db58bcd910fc19b0c61ceb1cdb006
    private String lastName;

    @Column(name = "role", nullable = false)
    private String role;  // Role: "STUDENT" or "TEACHER"

<<<<<<< HEAD
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private StudentEntity student;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
=======
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private StudentEntity student;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
>>>>>>> c86b59f5a44db58bcd910fc19b0c61ceb1cdb006
    @JsonManagedReference
    private TeacherEntity teacher;
}
