package server.data.validation;

import static server.data.validation.InputValidator.validateR;

public class ClickValidator {



    private static boolean validateClickCoordinate (String coordinate, String  r){
        String floatRegex = "^-?\\d+\\.?\\d*$";
        if (coordinate.trim().matches(floatRegex)){
            float rFloat = Float.parseFloat(r);
            float coordinateFloat = Float.parseFloat(coordinate);
            return -1.25*rFloat <= coordinateFloat && coordinateFloat <= 1.25*rFloat;
        }
        return false;
    }


    public static boolean validateClick(String x, String y, String r){
        if(validateR(r)){
            return validateClickCoordinate(x, r) && validateClickCoordinate(y, r);
        }
        return false;
    }
}
