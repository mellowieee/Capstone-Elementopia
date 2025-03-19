package Elementopia.Gamified.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_teacher")
@PrimaryKeyJoinColumn(name = "user_id")
public class TeacherEntity extends UserEntity {

    public TeacherEntity() {
        super();
        this.setRole("TEACHER");
    }

    public TeacherEntity(String firstname, String lastname, String email, String username, String password) {
        super(firstname, lastname, email, username, password, "TEACHER");
    }
}


