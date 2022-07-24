package com.example.rihack;

import android.os.Bundle;
import android.os.StrictMode;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.rihack.data.NewActivity;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class NewsFragment extends Fragment {
    protected RecyclerView mRecyclerView;
    protected EventsAdapter mAdapter;
    protected RecyclerView.LayoutManager mLayoutManager;
    protected NewActivity[] mDataset;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_news, container, false);
        mRecyclerView = rootView.findViewById(R.id.home_recycler_view);
        mLayoutManager = new LinearLayoutManager(getActivity());

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        HttpUrl url = HttpUrl.parse("http://192.168.43.193:8000/api/notifs").newBuilder()
                .build();

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(url)
                .get()
                .build();

        try (Response response = client.newCall(request).execute()) {
            System.out.println(response);
            JSONObject cleansingJSONObject = new JSONObject(response.body().string());
            ObjectMapper mapper = new ObjectMapper();
            mDataset = mapper.readValue(cleansingJSONObject.get("notifs").toString(), NewActivity[].class);
            mAdapter = new EventsAdapter(mDataset, View.GONE, View.VISIBLE, View.GONE);
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