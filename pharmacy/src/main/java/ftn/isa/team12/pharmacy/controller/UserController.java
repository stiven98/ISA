package ftn.isa.team12.pharmacy.controller;


import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired()
    private UserService userService;

    @GetMapping("/all")

    public List<User> findAll() {
        return this.userService.findAll();
    }

}
