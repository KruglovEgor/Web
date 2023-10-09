package server.data;


import java.util.HashMap;
import java.util.Map;

public class Result {
    public float x;
    public float y;
    public  float r;
    public String time;
    public long executionTime;
    public boolean hit;

    public Result(float x, float y, float r, String time, long executionTime, boolean hit){
        this.x = x;
        this.y = y;
        this.r = r;
        this.time = time;
        this.executionTime = executionTime;
        this.hit = hit;
    }

    //add function to convert to json
    public String toJson(){
        return "{" +
                "\"x\":" + x +
                ", \"y\":" + y +
                ", \"r\":" + r +
                ", \"time\":\"" + time + "\"" +
                ", \"executionTime\":" + executionTime +
                ", \"hit\":" + hit +
                "}";
    }


    public Map<String, Object> toMap(){
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("x", x);
        result.put("y", y);
        result.put("r", r);
        result.put("time", time);
        result.put("executionTime", executionTime);
        result.put("hit", hit);
        return result;
    }
}
