package server.data;

import java.util.Date;

public class Result {
    private float x;
    private float y;
    private  float r;
    private String time;
    private long executionTime;
    private boolean hit;

    public Result(float x, float y, float r, String time, long executionTime, boolean hit){
        this.x = x;
        this.y = y;
        this.r = r;
        this.time = time;
        this.executionTime = executionTime;
        this.hit = hit;
    }
}
