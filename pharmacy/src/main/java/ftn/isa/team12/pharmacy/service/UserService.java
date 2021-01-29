package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.UUID;

public interface UserService extends UserDetailsService {
    User findById(UUID id);
    User findUserByEmail(String email);
    List<User> findAll ();
    UserDto changeAccountInfo(User user, UserDto dto);
    boolean IsLoginUserExist(String oldPassword);
}
