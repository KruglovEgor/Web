package server.data.validation;


import java.util.Arrays;

public class InputValidator {


    private static boolean validateInputX (String input){
        final String[] availableValues = {"-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"};
        return Arrays.asList(availableValues).contains(input.trim());
    }

    private static boolean validateInputY(String input){
        String floatRegex = "^-?\\d+\\.?\\d*$";
        if (input.trim().matches(floatRegex)){
            float y = Float.parseFloat(input.trim());
            return -5 < y && y < 3;
        }
        return false;
    }

    protected static boolean validateR(String input){
        String floatRegex = "^-?\\d+\\.?\\d*$";
        if (input.trim().matches(floatRegex)){
            float r = Float.parseFloat(input.trim());
            return 2 < r && r < 5;
        }
        return false;
    }


    public static boolean validateInput (String x, String y, String r){
        return validateInputX(x) && validateInputY(y) && validateR(r);
    }
}
