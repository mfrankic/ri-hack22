package com.example.rihack;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.viewpager2.widget.ViewPager2;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.example.rihack.data.OnBoardingItem;
import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;
import java.util.List;

public class OnBoardingActivity extends AppCompatActivity {

    private OnBoardingAdapter OnBoardingAdapter;
    private LinearLayout layoutOnboardingIndicator;
    private MaterialButton buttonOnboardingAction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_on_boarding);

        layoutOnboardingIndicator = findViewById(R.id.layoutOnboardingIndicators);
        buttonOnboardingAction = findViewById(R.id.buttonOnBoardingAction);

        setOnBoardingItem();

        ViewPager2 onboardingViewPager = findViewById(R.id.onboardingViewPager);
        onboardingViewPager.setAdapter(OnBoardingAdapter);

        setOnboadingIndicator();
        setCurrentOnboardingIndicators(0);

        onboardingViewPager.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageSelected(int position) {
                super.onPageSelected(position);
                setCurrentOnboardingIndicators(position);
            }
        });

        buttonOnboardingAction.setOnClickListener(view -> {
            if (onboardingViewPager.getCurrentItem() + 1 < OnBoardingAdapter.getItemCount()) {
                onboardingViewPager.setCurrentItem(onboardingViewPager.getCurrentItem() + 1);
            } else {
                // User has seen OnboardingSupportFragment, so mark our SharedPreferences
                // flag as completed so that we don't show our OnboardingSupportFragment
                // the next time the user launches the app.
                SharedPreferences.Editor sharedPreferencesEditor =
                        PreferenceManager.getDefaultSharedPreferences(this).edit();
                sharedPreferencesEditor.putBoolean(
                        "COMPLETED_ONBOARDING_PREF_NAME", true);
                sharedPreferencesEditor.apply();
                startActivity(new Intent(getApplicationContext(), MainActivity.class));
                finish();
            }
        });
    }

    private void setOnboadingIndicator() {
        ImageView[] indicators = new ImageView[OnBoardingAdapter.getItemCount()];
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT
        );
        layoutParams.setMargins(8, 0, 8, 0);
        for (int i = 0; i < indicators.length; i++) {
            indicators[i] = new ImageView(getApplicationContext());
            indicators[i].setImageDrawable(ContextCompat.getDrawable(
                    getApplicationContext(), R.drawable.ic_onboarding_dot_inactive
            ));
            indicators[i].setLayoutParams(layoutParams);
            layoutOnboardingIndicator.addView(indicators[i]);
        }
    }

    @SuppressLint("SetTextI18n")
    private void setCurrentOnboardingIndicators(int index) {
        int childCount = layoutOnboardingIndicator.getChildCount();
        for (int i = 0; i < childCount; i++) {
            ImageView imageView = (ImageView) layoutOnboardingIndicator.getChildAt(i);
            if (i == index) {
                imageView.setImageDrawable(ContextCompat.getDrawable(getApplicationContext(), R.drawable.ic_onboarding_dot_active));
            } else {
                imageView.setImageDrawable(ContextCompat.getDrawable(getApplicationContext(), R.drawable.ic_onboarding_dot_inactive));
            }
        }
        if (index == OnBoardingAdapter.getItemCount() - 1) {
            buttonOnboardingAction.setText("Započni");
        } else {
            buttonOnboardingAction.setText("Dalje");
        }
    }

    private void setOnBoardingItem() {
        List<OnBoardingItem> onBoardingItems = new ArrayList<>();

        OnBoardingItem item = new OnBoardingItem();
        item.setTitle(getResources().getString(R.string.onboarding_title_one));
        item.setDescription(getResources().getString(R.string.onboarding_desc_one));
        item.setImage(R.drawable.onboarding_image_one);
        onBoardingItems.add(item);

        item = new OnBoardingItem();
        item.setTitle(getResources().getString(R.string.onboarding_title_two));
        item.setDescription(getResources().getString(R.string.onboarding_desc_two));
        item.setImage(R.drawable.onboarding_image_two);
        onBoardingItems.add(item);

        item = new OnBoardingItem();
        item.setTitle(getResources().getString(R.string.onboarding_title_three));
        item.setDescription(getResources().getString(R.string.onboarding_desc_three));
        item.setImage(R.drawable.onboarding_image_three);
        onBoardingItems.add(item);

        OnBoardingAdapter = new OnBoardingAdapter(onBoardingItems);
    }

}