package ftn.isa.team12.pharmacy.service.impl;

import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.dto.UserDto;
import ftn.isa.team12.pharmacy.repository.UserRepository;
import ftn.isa.team12.pharmacy.service.AuthorityService;
import ftn.isa.team12.pharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public User findById(UUID id) throws AccessDeniedException {
        User u = userRepository.findById(id).orElseGet(null);
        return u;
    }

    @Override
    public User findUserByEmail(String email) throws UsernameNotFoundException {
        User u = userRepository.findUserByEmail(email);
        return u;
    }

    @Override
    public List<User> findAll() throws AccessDeniedException {
        List<User> result = userRepository.findAll();
        return result;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        } else {
            return user;
        }
    }

    @Override
    public UserDto changeAccountInfo(User user, UserDto dto) {
        boolean fleg = false;
        if(this.validationCommon(user.getAccountInfo().getName(),dto.getName()) ||
                this.valildationRegex(dto.getName(),"(^[A-Za-z]\\w{5,12}$)")) {
            user.getAccountInfo().setName(dto.getName());
            fleg = true;
        }if(this.validationCommon(user.getAccountInfo().getLastName(),dto.getLastName()) ||
                this.valildationRegex(dto.getName(),"(^[A-Za-z]\\w{5,12}$)")){
            user.getAccountInfo().setLastName(dto.getLastName());
            fleg = true;
        }if(this.validationCommon(user.getAccountInfo().getPhoneNumber(),dto.getPhoneNumber()) ||
                this.valildationRegex(dto.getName(),"(\\w)")){
            user.getAccountInfo().setPhoneNumber(dto.getPhoneNumber());
            fleg = true;
        }
        //treba dodati za grad
        if(!fleg)
            return null;

        userRepository.save(user);

        return dto;
    }

    public boolean validationCommon(String valid, String chagne ){
        if(valid.equals(chagne) || chagne.equals(""))
            return false;
        return true;
    }
    public boolean valildationRegex(String change, String reg){
        if(!change.matches(reg)){
            return false;
        }
        return true;
    }

    @Override
    public boolean IsLoginUserExist(String oldPassword){
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = currentUser.getName();
        if (authenticationManager != null) {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, oldPassword));
            return true;
        } else {
            return false;
        }
    }

}
