package Elementopia.Gamified.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "tblStudent")
public class StudentEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int sid;
	
	@Column(name = "studFirstname", nullable = false, unique = true)
	private String firstName;
	
	@Column(name = "studLastname", nullable = false, unique = true)
	private String lastName;
	
	@Column(name = "studUsername", nullable = false, unique = true)
	private String studUsername;
	
	@Column(name = "studPassword", nullable = false, unique = true)
	private String studPassword;

	public StudentEntity() {
		super();
	}

	public StudentEntity(int sid, String firstName, String lastName, String studUsername, String studPassword) {
		super();
		this.sid = sid;
		this.firstName = firstName;
		this.lastName = lastName;
		this.studUsername = studUsername;
		this.studPassword = studPassword;
	}

	public int getSid() {
		return sid;
	}

	public void setSid(int sid) {
		this.sid = sid;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getStudUsername() {
		return studUsername;
	}

	public void setStudUsername(String studUsername) {
		this.studUsername = studUsername;
	}

	public String getStudPassword() {
		return studPassword;
	}

	public void setStudPassword(String studPassword) {
		this.studPassword = studPassword;
	}
}
