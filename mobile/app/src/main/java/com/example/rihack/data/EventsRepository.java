package com.example.rihack.data;

import androidx.lifecycle.MutableLiveData;

import java.util.ArrayList;

public class EventsRepository {

    public static MutableLiveData<ArrayList<NewActivity>> events = new MutableLiveData<>();
}
