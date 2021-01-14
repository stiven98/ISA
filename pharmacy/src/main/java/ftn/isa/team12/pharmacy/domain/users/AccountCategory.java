package ftn.isa.team12.pharmacy.domain.users;

import ftn.isa.team12.pharmacy.domain.enums.UserCategory;

import javax.persistence.*;

@Embeddable
public class AccountCategory {
    @Column(name = "points", nullable = false)
    private int points;
    @Column(name = "category", nullable = false)
    private UserCategory category;
}
