package com.example.rihack;

import static android.app.Activity.RESULT_CANCELED;
import static android.app.Activity.RESULT_OK;

import android.Manifest;
import android.app.AlertDialog;
import android.app.PendingIntent;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Bundle;

import androidx.core.app.ActivityCompat;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import android.os.Environment;
import android.os.StrictMode;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.rihack.databinding.FragmentReportProblemBinding;

import org.apache.http.params.HttpParams;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Call;
import okhttp3.Connection;
import okhttp3.FormBody;
import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class ReportProblemFragment extends Fragment {
    private FragmentReportProblemBinding binding;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public ReportProblemFragment() {
        // Required empty public constructor
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        binding = FragmentReportProblemBinding.inflate(inflater, container, false);

        binding.selectImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent galleryintent = new Intent(Intent.ACTION_GET_CONTENT, null);
                galleryintent.setType("image/*");

                Intent cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
                Intent chooser = new Intent(Intent.ACTION_CHOOSER);
                chooser.putExtra(Intent.EXTRA_INTENT, galleryintent);
                chooser.putExtra(Intent.EXTRA_TITLE, "Select from:");
                Intent[] intentArray = {cameraIntent};
                chooser.putExtra(Intent.EXTRA_INITIAL_INTENTS, intentArray);
                startActivityForResult(chooser, 1);
            }
        });

        binding.reportProblemButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
                StrictMode.setThreadPolicy(policy);

                LocationManager lm = (LocationManager) getActivity().getSystemService(Context.LOCATION_SERVICE);
                if (ActivityCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    return;
                }
                Location location = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);

                HttpUrl url = HttpUrl.parse("http://192.168.43.193:8000/api/reports/create").newBuilder()
                        .addQueryParameter("lat", String.valueOf(45.3260))
                        .addQueryParameter("lon", String.valueOf(14.4446))
                        .addQueryParameter("auth_token", "6a32be4c0572e5c313a0d5c97555d9cf")
                        .addQueryParameter("type", "Ostalo")
                        .build();
                final MediaType JSON
                        = MediaType.get("application/json; charset=utf-8");


                OkHttpClient client = new OkHttpClient();

                binding.imageView.setDrawingCacheEnabled(true);
                Bitmap bmap = binding.imageView.getDrawingCache();
                File imageFile = new File(Environment.getExternalStoragePublicDirectory(
                        Environment.DIRECTORY_MOVIES) +"image.jpeg");

                OutputStream os;
                try {
                    os = new FileOutputStream(imageFile);
                    bmap.compress(Bitmap.CompressFormat.JPEG, 100, os);
                    os.flush();
                    os.close();
                } catch (Exception e) {
                    Log.e(getClass().getSimpleName(), "Error writing bitmap", e);
                }

                RequestBody requestBody = new MultipartBody.Builder()
                        .setType(MultipartBody.FORM)
                        .addFormDataPart("image", "image.jpeg",
                                RequestBody.create(MediaType.parse("application/octet-stream"),
                                        imageFile))
                        .build();


                Request request = new Request.Builder()
                        .url(url)
                        .post(requestBody)
                        .build();

                try (Response response = client.newCall(request).execute()) {
                    showAlert();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        return binding.getRoot();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(resultCode != RESULT_CANCELED) {
            if(data.getExtras() != null) {
                Bitmap selectedImage = (Bitmap) data.getExtras().get("data");
                binding.imageView.setImageBitmap(selectedImage);
            } else {
                final Uri imageUri = data.getData();
                InputStream imageStream = null;
                try {
                    imageStream = getContext().getContentResolver().openInputStream(imageUri);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
                final Bitmap selectedImage = BitmapFactory.decodeStream(imageStream);
                binding.imageView.setImageBitmap(selectedImage);
            }
            binding.selectImageButton.setVisibility(View.GONE);
            binding.imageView.setVisibility(View.VISIBLE);
        }
    }

    private void showAlert() {
        AlertDialog.Builder builder
                = new AlertDialog
                .Builder(getContext());

        builder.setMessage("Vaš problem je uspješno poslan.");
        builder.setTitle("Jej!!");
        builder.setCancelable(false);

        builder
                .setPositiveButton(
                        "Ok",
                        new DialogInterface
                                .OnClickListener() {

                            @Override
                            public void onClick(DialogInterface dialog,
                                                int which)
                            {
                                Navigation.findNavController(getView()).navigate(R.id.action_ReportProblem_to_NavNews);
                            }
                        });

        AlertDialog alertDialog = builder.create();
        alertDialog.show();
    }

}