package ftn.isa.team12.pharmacy.email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;;import java.util.UUID;

@Component
public class EmailSender {

    @Autowired
    private JavaMailSender emailSender;

    public void sendVerificationEmail(String to,  String id) {
        SimpleMailMessage message = new SimpleMailMessage();
        String url = "http://localhost:8080/api/user/activateAccount/" + id;
        String body = "We are excited to tell you that your account is successfully created. Please click on the below link to verify your account: " + url;
        message.setTo(to);
        message.setSubject("Verification email!");
        message.setText(body);
        System.out.println(body);
        emailSender.send(message);
    }

    public void sendDrugReservationEmail(UUID id, String patientEmail, String pharmacyName, String deadline, String drugName) {
        SimpleMailMessage message = new SimpleMailMessage();
        String body = "Your reservation is succsessfully created with code: " + id.toString() + "\nYou can pick up your " + drugName + " in pharmacy " + pharmacyName +
                " until the " + deadline;
        message.setTo(patientEmail);
        message.setSubject("Drug reservation email");
        message.setText(body);
        System.out.println(body);
        emailSender.send(message);
    }

    public void sendDrugQuantityNotificationToPhAdmin(String to,  String drugName) {
        SimpleMailMessage message = new SimpleMailMessage();
        String body = "The drug: " + drugName + " is out of stock in your pharmacy. Please take attention.";
        message.setTo(to);
        message.setSubject("Drug out of stock");
        message.setText(body);
        System.out.println(body);
        emailSender.send(message);
    }


}
