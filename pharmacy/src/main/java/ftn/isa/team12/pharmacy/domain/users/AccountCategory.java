package ftn.isa.team12.pharmacy.domain.users;

import ftn.isa.team12.pharmacy.domain.enums.UserCategory;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class AccountCategory implements Serializable {
    @Column(name = "points", nullable = false)
    private int points;
    @Column(name = "category", nullable = false)
    private UserCategory category;

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public UserCategory getCategory() {
        return category;
    }

    public void setCategory(UserCategory category) {
        this.category = category;
    }
}
