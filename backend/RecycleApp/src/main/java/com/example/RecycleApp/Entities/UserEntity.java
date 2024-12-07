package com.example.RecycleApp.Entities;

import com.example.RecycleApp.Enumerations.RoleEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

@Data
@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    @Pattern(
            regexp = "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9])(?=.*[@$!%*?&]).{8,})\\S$",
            message = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character"
    )
    private String password;


    @Column
    @Email(message = "Email should be valid")
    private String email;

    @Column
    private String phoneNumber;

    @Column
    private String homeAddress;

    @Column
    private RoleEnum role;

}
