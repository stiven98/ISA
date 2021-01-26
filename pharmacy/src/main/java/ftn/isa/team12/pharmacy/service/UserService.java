package ftn.isa.team12.pharmacy.service;

import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.domain.users.User;

import java.util.List;

public interface UserService {

    List<Patient> findAll();


}
