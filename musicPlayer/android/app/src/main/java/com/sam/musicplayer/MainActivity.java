package com.sam.musicplayer;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import android.os.Bundle;

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "musicPlayer"; // This should match the name registered in your JavaScript code
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SoLoader.init(this, /* native exopackage */ false);
    }
}