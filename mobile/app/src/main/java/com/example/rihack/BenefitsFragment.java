package com.example.rihack;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.rihack.data.NewActivity;

public class BenefitsFragment extends Fragment {
    protected RecyclerView mRecyclerView;
    protected BenefitsAdapter mAdapter;
    protected RecyclerView.LayoutManager mLayoutManager;
    protected NewActivity[] mDataset;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initDataset();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_benefits, container, false);
        mRecyclerView = rootView.findViewById(R.id.benefits_recycler_view);
        mLayoutManager = new LinearLayoutManager(getActivity());

        mAdapter = new BenefitsAdapter(mDataset);
        mRecyclerView.setAdapter(mAdapter);
        setRecyclerViewLayoutManager();
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

    private void initDataset() {
        mDataset = new NewActivity[3];

        mDataset[0] = new NewActivity("Ricikleta popust 0.20 kn/km",
                "https://ricikleta.rijeka.hr/images/logo/logo-ricikleta.png",
                "","2000 bodova");

        mDataset[1] = new NewActivity("50% popusta na članstvo GKR",
                                              "https://www.mojarijeka.hr/wp-content/uploads/2011/09/gkri-logo1-1680x800.jpg",
                                              "","4000 bodova");
        mDataset[2] = new NewActivity("40% popusta na izložbu",
                "https://www.muzej-rijeka.hr/wp-content/uploads/2019/11/MGR-logo.png",
                "","5000 bodova");

    }
}