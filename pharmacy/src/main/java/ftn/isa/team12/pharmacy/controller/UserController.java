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

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserService userService;

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
