package com.example.rihack;

import static android.app.Activity.RESULT_CANCELED;

import android.Manifest;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
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
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.rihack.databinding.FragmentOrganizeCleansingBinding;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Calendar;

import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class OrganizeCleansingFragment extends Fragment {
    private FragmentOrganizeCleansingBinding binding;

    public OrganizeCleansingFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentOrganizeCleansingBinding.inflate(inflater, container, false);

        binding.selectImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent galleryintent = new Intent(Intent.ACTION_GET_CONTENT, null);
                galleryintent.setType("image/*");

                Intent cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
                Intent chooser = new Intent(Intent.ACTION_CHOOSER);
                chooser.putExtra(Intent.EXTRA_INTENT, galleryintent);
                chooser.putExtra(Intent.EXTRA_TITLE, "Select from:");
                Intent[] intentArray = { cameraIntent };
                chooser.putExtra(Intent.EXTRA_INITIAL_INTENTS, intentArray);
                startActivityForResult(chooser, 1);
            }
        });

        binding.organizeCleansingButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
                StrictMode.setThreadPolicy(policy);

                LocationManager lm = (LocationManager) getActivity().getSystemService(Context.LOCATION_SERVICE);
                if (ActivityCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    return;
                }
                Location location = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
//                double longitude = location.getLongitude();
//                double latitude = location.getLatitude();

                Calendar cal = Calendar.getInstance();
                cal.add(Calendar.DATE, 1);
                HttpUrl url = HttpUrl.parse("http://192.168.43.193:8000/api/cleansing/create").newBuilder()
                        .addQueryParameter("lat", String.valueOf(45.3260))
                        .addQueryParameter("lon", String.valueOf(14.4446))
                        .addQueryParameter("auth_token", "6a32be4c0572e5c313a0d5c97555d9cf")
                        .addQueryParameter("event_time",  cal.getTime().toString())
                        .addQueryParameter("title", binding.nameTextField.getText().toString())
                        .addQueryParameter("desc", "opis")
                        .build();

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

                try (Response response = client.newCall(request).execute()) { showAlert();
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

        builder.setMessage("Vaša čistka je uspješno poslana.");
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
                                Navigation.findNavController(getView()).navigate(R.id.action_OrganizeCleansingFragment_to_NavNews);
                            }
                        });

        AlertDialog alertDialog = builder.create();
        alertDialog.show();
    }


}