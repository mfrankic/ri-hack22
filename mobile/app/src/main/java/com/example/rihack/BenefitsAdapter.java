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

public class BenefitsAdapter extends RecyclerView.Adapter<BenefitsAdapter.ViewHolder> {
    private static final String TAG = "BenefitsAdatpter";

    private final NewActivity[] mDataSet;

    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView name;
        private final TextView time;
        private final ImageView image;

        public ViewHolder(View v) {
            super(v);
            v.setOnClickListener(v1 -> Log.d(TAG, "Element " + getAdapterPosition() + " clicked."));
            name = v.findViewById(R.id.benefits_row_title);
            time = v.findViewById(R.id.benefits_row_time);
            image = v.findViewById(R.id.benefits_img);
        }

        public TextView getName() {
            return name;
        }

        public TextView getTime() {
            return time;
        }

        public ImageView getImage() {
            return image;
        }
    }

    public BenefitsAdapter(NewActivity[] dataSet) {
        mDataSet = dataSet;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext())
                .inflate(R.layout.layout_card_benefit, viewGroup, false);

        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull BenefitsAdapter.ViewHolder viewHolder, final int position) {
        viewHolder.getName().setText(mDataSet[position].name);
        viewHolder.getTime().setText(mDataSet[position].time);
        Glide.with(viewHolder.getImage().getContext())
                .load(mDataSet[position].image)
                .placeholder(R.drawable.gradient)
                .into(viewHolder.getImage());
    }

    @Override
    public int getItemCount() {
        return mDataSet.length;
    }
}

