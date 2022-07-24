package com.example.rihack;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.rihack.data.NewActivity;


public class EventsAdapter extends RecyclerView.Adapter<EventsAdapter.ViewHolder> {
    private static final String TAG = "EventsAdatpter";

    private final NewActivity[] mDataSet;
    private int showLocation;
    private int showDesc;
    private int showTime;

    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView name;
        private final TextView location;
        private final TextView time;
        private final TextView desc;
        private final ImageView image;

        public ViewHolder(View v) {
            super(v);
            v.setOnClickListener(v1 -> Log.d(TAG, "Element " + getAdapterPosition() + " clicked."));
            name = v.findViewById(R.id.home_row_title);
            location = v.findViewById(R.id.home_row_location);
            time = v.findViewById(R.id.home_row_time);
            image = v.findViewById(R.id.home_img);
            desc = v.findViewById(R.id.home_row_desc);
        }

        public TextView getName() {
            return name;
        }

        public TextView getLocation() {
            return location;
        }

        public TextView getTime() {
            return time;
        }

        public ImageView getImage() {
            return image;
        }

        public TextView getDesc() {
            return desc;
        }
    }

    public EventsAdapter(NewActivity[] dataSet, int showTime, int showDesc, int showLocation) {
        mDataSet = dataSet;
        this.showTime = showTime;
        this.showDesc = showDesc;
        this.showLocation = showLocation;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext())
                .inflate(R.layout.layout_card_event, viewGroup, false);


        v.findViewById(R.id.home_row_time).setVisibility(showTime);
        v.findViewById(R.id.home_row_desc).setVisibility(showDesc);
        v.findViewById(R.id.home_row_location).setVisibility(showLocation);

        v.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
            }
        });
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, final int position) {
        viewHolder.getName().setText(mDataSet[position].name);
        viewHolder.getLocation().setText(mDataSet[position].location);
        viewHolder.getTime().setText(mDataSet[position].time);
        viewHolder.getDesc().setText(mDataSet[position].desc);
        Glide.with(viewHolder.getImage().getContext())
                .load(mDataSet[position].image)
                .placeholder(R.drawable.gradient)
                .into(viewHolder.getImage());
    }

    @Override
    public int getItemCount() {
        return mDataSet != null ? mDataSet.length : 0 ;
    }
}
