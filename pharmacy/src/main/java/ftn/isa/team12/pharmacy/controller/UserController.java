package ftn.isa.team12.pharmacy.controller;


import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.dto.UserDto;
import ftn.isa.team12.pharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("getUser")
    @PreAuthorize("hasAnyRole('ROLE_PATIENT', 'ROLE_PH_ADMIN')") // Dodati ostale role
    public User user(Principal user) {
        return this.userService.findUserByEmail(user.getName());
    }

    @PostMapping("/change")
    public ResponseEntity<UserDto> changeAccountInfo(@RequestBody UserDto userDto) {
            //userService.IsLoginUserExist(userDto.getPassword());
            User user = userService.findUserByEmail(userDto.getEmail());
            System.out.println(user.getPassword());
            UserDto changedUser = userService.changeAccountInfo(user, userDto);
            if (changedUser == null)
                return new ResponseEntity<UserDto>(changedUser, HttpStatus.BAD_REQUEST);
            return new ResponseEntity<UserDto>(changedUser, HttpStatus.OK);
    }




}
