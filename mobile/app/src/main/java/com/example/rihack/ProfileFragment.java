package com.example.rihack;

import static android.content.Context.WINDOW_SERVICE;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Point;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.RequiresApi;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import android.os.Environment;
import android.os.StrictMode;
import android.util.Log;
import android.view.Display;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;

import com.example.rihack.databinding.FragmentProfileBinding;
import com.google.zxing.WriterException;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import androidmads.library.qrgenearator.QRGContents;
import androidmads.library.qrgenearator.QRGEncoder;
import okhttp3.FormBody;
import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class ProfileFragment extends Fragment {
    private FragmentProfileBinding binding;
    private QRGEncoder qrgEncoder;

    public ProfileFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentProfileBinding.inflate(inflater, container, false);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        HttpUrl url = HttpUrl.parse("http://192.168.43.193:8000/api/user/auth").newBuilder()
                .addQueryParameter("auth_token", "6a32be4c0572e5c313a0d5c97555d9cf")
                .build();

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(url)
                .get()
                .build();

        try (Response response = client.newCall(request).execute()) {
            JSONObject object = new JSONObject(response.body().string());
            JSONObject innerObject = new JSONObject(object.get("user").toString());

            binding.name.setText(innerObject.get("name").toString());
            binding.emailText.setText(innerObject.get("email").toString());
            binding.pointsText.setText(innerObject.get("points").toString());

            String role = innerObject.get("role").toString();
            if (role.equals("volunteer")) {
                binding.volunteerText.setText(R.string.volunteer_yes);
            } else {
                if ((Boolean)innerObject.get("hasRequest")) {
                    binding.volunteerText.setText(R.string.volunteer_pending);
                } else {
                    binding.volunteerText.setText(R.string.volunteer_no);
                }
            }

            // the windowmanager service.
            WindowManager manager = (WindowManager) getActivity().getSystemService(WINDOW_SERVICE);

            // initializing a variable for default display.
            Display display = manager.getDefaultDisplay();

            // creating a variable for point which
            // is to be displayed in QR Code.
            Point point = new Point();
            display.getSize(point);

            // getting width and
            // height of a point
            int width = point.x;
            int height = point.y;

            // generating dimension from width and height.
            int dimen = width < height ? width : height;
            dimen = dimen * 3 / 4;

            // setting this dimensions inside our qr code
            // encoder to generate our qr code.
            qrgEncoder = new QRGEncoder(innerObject.get("auth_token").toString(), null, QRGContents.Type.TEXT, dimen);
            try {
                // getting our qrcode in the form of bitmap.
                Bitmap bitmap = qrgEncoder.encodeAsBitmap();
                // the bitmap is set inside our image
                // view using .setimagebitmap method.
                binding.imageView.setImageBitmap(bitmap);
            } catch (WriterException e) {
                e.printStackTrace();
            }
            System.out.println(object.get("hasRequest").toString());
            if((Boolean)object.get("hasRequest")) {
                binding.volonterButton.setVisibility(View.GONE);
                binding.qrScannerButton.setVisibility(View.VISIBLE);
            } else {
                binding.volonterButton.setText("Pokreni QRCode Scanner");
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        binding.volonterButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                HttpUrl url = HttpUrl.parse("http://192.168.43.193:8000/api/volunteerRequest/create").newBuilder()
                        .addQueryParameter("auth_token", "f59da5e00f0a935524266178d9d82560")
                        .build();

                OkHttpClient client = new OkHttpClient();
                RequestBody body = new FormBody.Builder().build();

                Request request = new Request.Builder()
                        .url(url)
                        .post(body)
                        .build();

                try (Response response = client.newCall(request).execute()) {
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        binding.qrScannerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Navigation.findNavController(view).navigate(R.id.action_ProfileFragment_to_qr_scanner_nav);
            }
        });

        return binding.getRoot();
    }
}