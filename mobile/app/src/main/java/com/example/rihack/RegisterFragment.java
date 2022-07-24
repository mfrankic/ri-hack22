package com.example.rihack;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import android.os.StrictMode;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.rihack.databinding.FragmentRegisterBinding;
import com.example.rihack.databinding.FragmentReportProblemBinding;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.FormBody;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class RegisterFragment extends Fragment {
    private FragmentRegisterBinding binding;

    public RegisterFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentRegisterBinding.inflate(inflater, container, false);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        binding.registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                HttpUrl url = HttpUrl.parse("http://192.168.43.193:8000/api/user/register/").newBuilder()
                        .addQueryParameter("name", binding.nameText.getText().toString())
                        .addQueryParameter("email", binding.emailText.getText().toString())
                        .addQueryParameter("password", binding.passwordText.getText().toString())
                        .build();

                OkHttpClient client = new OkHttpClient();
                RequestBody body = new FormBody.Builder().build();

                Request request = new Request.Builder()
                        .url(url)
                        .post(body)
                        .build();

                try (Response response = client.newCall(request).execute()) {
                    System.out.println(response.body().string());
                    JSONObject object = new JSONObject(response.body().string());
                    String authToken = object.get("auth_token").toString();

                    if(authToken != null) {
                        SharedPreferences sharedPref = getActivity().getPreferences(Context.MODE_PRIVATE);
                        SharedPreferences.Editor editor = sharedPref.edit();
                        editor.putString("auth_token", authToken);
                        editor.apply();
                        Navigation.findNavController(view).navigate(R.id.action_RegisterFragment_to_NavNews);
                    }
                } catch (IOException | JSONException e) {
                    e.printStackTrace();
                }
            }
        });
        return binding.getRoot();
    }


}