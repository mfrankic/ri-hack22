package com.example.rihack;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import android.os.StrictMode;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.budiyev.android.codescanner.CodeScanner;
import com.budiyev.android.codescanner.CodeScannerView;
import com.budiyev.android.codescanner.DecodeCallback;
import com.example.rihack.databinding.FragmentQRScanBinding;
import com.google.zxing.Result;

import java.io.IOException;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class QRScanFragment extends Fragment {
    private FragmentQRScanBinding binding;
    private CodeScannerView codeScannerView;
    private CodeScanner mCodeScanner;



    @Override
    public void onResume() {
        super.onResume();
        mCodeScanner.startPreview();
    }

    @Override
    public void onPause() {
        mCodeScanner.releaseResources();
        super.onPause();
    }

    @Override
    public View onCreateView(
            LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState
    ) {
        binding = FragmentQRScanBinding.inflate(inflater, container, false);
        super.onCreate(savedInstanceState);
        codeScannerView = binding.scannerView;
        mCodeScanner  = new CodeScanner(getContext(), codeScannerView);

        mCodeScanner.setDecodeCallback(new DecodeCallback() {
            @Override
            public void onDecoded(@NonNull final Result result) {
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
                        StrictMode.setThreadPolicy(policy);

                        HttpUrl url = HttpUrl.parse("http://192.168.43.193:8000/api/user_event/create").newBuilder()
                                .addQueryParameter("user_token", result.getText())
                                .addQueryParameter("creator_token", "6a32be4c0572e5c313a0d5c97555d9cf")
                                .build();

                        OkHttpClient client = new OkHttpClient();

                        Request request = new Request.Builder()
                                .url(url)
                                .get()
                                .build();

                        try (Response response = client.newCall(request).execute()) {
                            Navigation.findNavController(getView()).navigate(R.id.action_QRScanner_to_NavProfile);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                });
            }
        });
        codeScannerView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mCodeScanner.startPreview();
            }
        });

        return binding.getRoot();
    }

}