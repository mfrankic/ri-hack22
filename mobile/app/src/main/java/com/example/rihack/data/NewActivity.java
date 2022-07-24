package com.example.rihack.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NewActivity implements Filterable {
    @JsonProperty("title")
    public String name;

    @JsonProperty("image_path")
    public String image;

    @JsonProperty("location_name")
    public String location;

    @JsonProperty("event_time")
    public String time;

    public String desc;

    public NewActivity(){}

    public NewActivity(String name, String image, String location, String time) {
        this.name = name;
        this.image = image;
        this.location = location;
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
