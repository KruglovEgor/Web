package ru.itmo.lab4.models;

import javax.persistence.*;



@Entity
@Table(name = "_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Boolean active;


    public Long getId() {return id;}
    public void setId(Long id){
        this.id = id;
    }


    public String getUsername() {return username;}
    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword() {return password;}
    public void setPassword(String password) {
        this.password = password;
    }


    public Boolean getActive(){return active;}
    public void setActive(Boolean active){this.active=active;}


    public User() {
    }
}