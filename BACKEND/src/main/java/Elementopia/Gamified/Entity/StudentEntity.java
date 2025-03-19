package Elementopia.Gamified.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_student")
@PrimaryKeyJoinColumn(name = "user_id")
public class StudentEntity extends UserEntity {

    public StudentEntity() {
        super();
        this.setRole("STUDENT");
    }

    public StudentEntity(String firstname, String lastname, String email, String username, String password) {
        super(firstname, lastname, email, username, password, "STUDENT");
    }
}
