package helping;

import entity.Type;

import java.util.Arrays;

public class ValueValidator {

    private final double[] xValues = {-3, -2, -1, 0, 1, 2, 3, 4, 5};
    private final  String floatRegex = "^-?\\d+\\.?\\d*$";


    public boolean validate(double x, double y, double r, Type type){
        return true;
    }

    private boolean validateSubmit(double x, double y, double r){
        return validateSubmitX(x) && validateSubmitY(y) && validateSubmitR(r);
    }

    private boolean validateSubmitX(double x){
        return Arrays.asList(xValues).contains(x);
    }

    private boolean validateSubmitY(double y){
        return -5 <= y && y <= 3;
    }

    private boolean validateSubmitR(double r){
        return 1 <= r && r <= 4 && (r % 0.5) % 1  == 0;
    }



    private boolean validateClick(double x, double y, double r){
        return validateClickR(r) && validateClickX(x, r) && validateClickY(y, r);
    }

    private boolean validateClickX(double x, double r){
        return -1.25*r <= x && x <= 1.25*r;
    }

    private boolean validateClickY(double y, double r){
        return -1.25*r <= y && y <= 1.25*r;
    }

    private boolean validateClickR(double r){
        return validateSubmitR(r);
    }
}
