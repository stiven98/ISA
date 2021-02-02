package ftn.isa.team12.pharmacy.service.impl;
import ftn.isa.team12.pharmacy.domain.common.Address;
import ftn.isa.team12.pharmacy.domain.common.City;
import ftn.isa.team12.pharmacy.domain.common.Country;
import ftn.isa.team12.pharmacy.domain.common.Location;
import ftn.isa.team12.pharmacy.domain.users.User;
import ftn.isa.team12.pharmacy.dto.UserDto;
import ftn.isa.team12.pharmacy.repository.UserRepository;
import ftn.isa.team12.pharmacy.service.*;
import ftn.isa.team12.pharmacy.validation.CommonValidation;
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

    @Autowired
    private CountryService countryService;

    @Autowired
    private CityService cityService;

    @Autowired
    private LocationService locationService;

    private CommonValidation commonValidation;

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
    public boolean changePassword(User user, String newPassword) {
        commonValidation=new CommonValidation(user.getPassword());
        String pattern = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{6,}";
        if(commonValidation.regexValidation(pattern)) {
            String encodedPassword = passwordEncoder.encode(newPassword);
            if(commonValidation.commonValidationCheck(encodedPassword)){
                user.setPassword(encodedPassword);
                if(user.getAccountInfo().isFirstLogin()){
                    user.getAccountInfo().setFirstLogin(false);
                }
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }

    @Override
    public UserDto changeAccountInfo(User user, UserDto dto) {
        boolean flag = false;
        commonValidation=new CommonValidation(dto.getName());
        if(commonValidation.commonValidationCheck(user.getAccountInfo().getName()) && commonValidation.regexValidation("(^[A-Z][a-z]{3,12}$)")) {
            user.getAccountInfo().setName(dto.getName());
            flag = true;
        }
        commonValidation.setNewValue(dto.getLastName());
        if(commonValidation.commonValidationCheck(user.getAccountInfo().getLastName()) && commonValidation.regexValidation("(^[A-Z][a-z]{3,12}$)")){
            user.getAccountInfo().setLastName(dto.getLastName());
            flag = true;
        }
        commonValidation.setNewValue(dto.getPhoneNumber());
        if(commonValidation.commonValidationCheck(user.getAccountInfo().getPhoneNumber()) && commonValidation.regexValidation("(^[0-9]{3,12}$)")){
            user.getAccountInfo().setPhoneNumber(dto.getPhoneNumber());
            flag = true;
        }

        if(true) {
            Country country = countryService.saveAndFlush(new Country(dto.getCountryName()));
            user.getLocation().getCity().setCountry(country);

            City city = cityService.saveAndFlush(new City(dto.getCityName(), country, dto.getZipCode()));
            user.getLocation().setCity(city);

            Address address = new Address(dto.getStreet(), dto.getStreetNumber());
            Location location = locationService.saveAndFlush(new Location(city, address));
            user.setLocation(location);
            flag = true;
        }
        if(!flag)
           return null;

        userRepository.save(user);
        return dto;
    }

    @Override
    public boolean checkCurrentUserCredentials(String password){
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = currentUser.getName();
        if (authenticationManager != null) {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            return true;
        } else {
            return false;
        }
    }

    @Override
    public User findByUserId(UUID id) {
        return userRepository.findByUserId(id);
    }
}
