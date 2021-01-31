package ftn.isa.team12.pharmacy.controller;
import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.dto.UserDto;
import ftn.isa.team12.pharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.UUID;


@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/getUser")
    @PreAuthorize("hasAnyRole('ROLE_PATIENT', 'ROLE_PH_ADMIN', 'ROLE_DERMATOLOGIST')") // Dodati ostale role
    public ResponseEntity<UserDto> user(Principal user) {
        User userDetails = this.userService.findUserByEmail(user.getName());
        UserDto dto = new UserDto(userDetails);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //treba dodati role da ne moze ne ulogovan da pristupi stranici
    @PreAuthorize("hasAnyRole('ROLE_PATIENT', 'ROLE_PH_ADMIN', 'ROLE_DERMATOLOGIST')") // Dodati ostale role
    @PostMapping("/change")
    public ResponseEntity<UserDto> changeAccountInfo(@RequestBody UserDto userDto) {
            userService.IsLoginUserExist(userDto.getPassword());
            User user = userService.findUserByEmail(userDto.getEmail());
            UserDto changedUser = userService.changeAccountInfo(user, userDto);
            if (changedUser == null)
                return new ResponseEntity<UserDto>(changedUser, HttpStatus.BAD_REQUEST);
            return new ResponseEntity<UserDto>(changedUser, HttpStatus.OK);
    }


    @GetMapping("/getById/{id}")
    public ResponseEntity<UserDto> getByID(@PathVariable UUID id) {
        User user = userService.findByUserId(id);
        UserDto dto = new UserDto(user);
        return new ResponseEntity<>(dto,HttpStatus.OK);
    }

}
