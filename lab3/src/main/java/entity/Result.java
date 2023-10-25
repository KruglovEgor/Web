package entity;


import lombok.Getter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "record")
public class Result implements Serializable {
    @Id
    @Column(name = "id")
    private int id;

    @Getter
    @Column(name = "x")
    private double x;

    @Getter
    @Column(name = "y")
    private double y;

    @Getter
    @Column(name = "r")
    private double r;

    @Getter
    @Column(name = "record_time", length = 100)
    private String currentTime;

    @Getter
    @Column(name = "execution_time")
    private double executionTime;

    @Getter
    @Column(name = "hit")
    private boolean hit;

    public Result() {}

    public Result(double x, double y, double r, String currentTime, double executionTime, boolean hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = currentTime;
        this.executionTime = executionTime;
        this.hit = hit;
    }

    @Override
    public String toString(){
        return "{id: " + id +
                "x: " + x +
                "y: " + y +
                "r: " + r +
                "time: " + currentTime +
                "ex_time: " + executionTime +
                "hit: " + hit +"}";
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public void setExecutionTime(double executionTime) {
        this.executionTime = executionTime;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }
}
