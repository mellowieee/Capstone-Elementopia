package Elementopia.Gamified.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.*;

@Entity
@Table(name = "tblUser", uniqueConstraints = @UniqueConstraint(columnNames = "username"))
public class UserEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int uid;
	
	@Column(name="username", nullable = false, unique = true)
	private String username;
	
	@Column(name="password", nullable = false, unique = true)
	private String password;
	
	public UserEntity() {
		
	}
	public UserEntity(int uid, String username, String password) {
		super();
		this.uid = uid;
		this.username = username;
		this.password = password;
	}
	public int getId() {
		return uid;
	}
	public void setId(int uid) {
		this.uid = uid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
