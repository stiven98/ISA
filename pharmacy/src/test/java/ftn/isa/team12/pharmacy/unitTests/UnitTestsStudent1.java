package ftn.isa.team12.pharmacy.unitTests;

import ftn.isa.team12.pharmacy.domain.users.AccountInfo;
import ftn.isa.team12.pharmacy.domain.users.LoginInfo;
import ftn.isa.team12.pharmacy.domain.users.Patient;
import ftn.isa.team12.pharmacy.repository.PatientRepository;
import ftn.isa.team12.pharmacy.service.PatientService;
import ftn.isa.team12.pharmacy.service.impl.PatientServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UnitTestsStudent1 {

    @Mock
    private PatientRepository patientRepositoryMock;

    @Mock
    private Patient patientMock;

    @InjectMocks
    private PatientServiceImpl patientService;

    @Test
    @Transactional
    @Rollback(true)
    public void testFindAll() {
        Patient patient = new Patient();
        LoginInfo loginInfo = new LoginInfo();
        loginInfo.setEmail("pacijent@pacijent.com");
        loginInfo.setPassword("pacijent");
        patient.setLoginInfo(loginInfo);
        when(this.patientRepositoryMock.findAll()).thenReturn(Arrays.asList(patient));
        List<Patient> patients = patientService.findAll();
        assertThat(patients).hasSize(1);
        verify(patientRepositoryMock, times(1)).findAll();
        verifyNoMoreInteractions(patientRepositoryMock);
    }

}

