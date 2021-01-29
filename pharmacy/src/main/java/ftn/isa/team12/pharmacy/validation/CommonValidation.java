package ftn.isa.team12.pharmacy.validation;

public class CommonValidation {

    private String newValue;

    public CommonValidation(){}

    public CommonValidation(String newValue){
        this.newValue= newValue;
    }

    public boolean commonValidationCheck(String currentValue){
        if(newValue.equals(currentValue) || newValue.equals("")) {
            return false;
        }
        return true;
    }

    public boolean regexValidation(String regex){
        if(!newValue.matches(regex)){
            return false;
        }
        return true;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }
}
