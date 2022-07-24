package com.example.rihack;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.StrictMode;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.rihack.data.NewActivity;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


public class EventsFragment extends Fragment {
    protected RecyclerView mRecyclerView;
    protected EventsAdapter mAdapter;
    protected RecyclerView.LayoutManager mLayoutManager;
    protected NewActivity[] mDataset;

    public EventsFragment() {
        // Required empty public constructor
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_your_activities, container, false);
        mRecyclerView = rootView.findViewById(R.id.activities_recycler_view);
        mLayoutManager = new LinearLayoutManager(getActivity());


        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        HttpUrl url = HttpUrl.parse("http://192.168.43.193:8000/api/cleansing").newBuilder()
                .build();

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(url)
                .get()
                .build();

        try (Response response = client.newCall(request).execute()) {
            JSONObject object = new JSONObject(response.body().string());
            ObjectMapper mapper = new ObjectMapper();
            mDataset = mapper.readValue(object.get("cleansing").toString(), NewActivity[].class);
            mAdapter = new EventsAdapter(mDataset, View.VISIBLE, View.GONE, View.VISIBLE);
            mRecyclerView.setAdapter(mAdapter);
            setRecyclerViewLayoutManager();

        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return rootView;
    }

    public void setRecyclerViewLayoutManager() {
        int scrollPosition = 0;

        if (mRecyclerView.getLayoutManager() != null) {
            scrollPosition = ((LinearLayoutManager) mRecyclerView.getLayoutManager())
                    .findFirstCompletelyVisibleItemPosition();
        }

        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);
        mRecyclerView.scrollToPosition(scrollPosition);
    }
}

