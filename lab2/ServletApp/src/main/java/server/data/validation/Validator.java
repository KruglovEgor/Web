package server.data.validation;

import static server.data.validation.ClickValidator.validateClick;
import static server.data.validation.InputValidator.validateInput;

public class Validator {

    public static boolean validate(String x, String y, String r, String type){
        if(type.equals("input")){
            return validateInput(x, y, r);
        }
        else if(type.equals("click")){
            return validateClick(x, y, r);
        }
        return false;
    }
}
