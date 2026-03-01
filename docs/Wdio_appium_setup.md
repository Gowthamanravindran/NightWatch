# WDIO + APPIUM + MOCHAJS

Setup for mobile automation


#### Install Req
Download and Install Android Studio

#### Install platform tools
    brew install android-platform-tools

#### Install tsx
    npm install tsx --save-dev

#### Install appium
    npm install -g appium appium-doctor

#### Install uiautomator2 ( Android ) if you face issues
    appium driver install uiautomator2

#### Install WebDriverIO
    npm i --save-dev webdriverio

#### Install other WDIO requirements
    npm install --save-dev @wdio/appium-service @wdio/cli @wdio/local-runner @wdio/spec-reporter @wdio/mocha-framework

#### Install Mocha
    npm i --save-dev @types/mocha @types/jquery

#### Install Devices
In Android studio Virtual devices - setup the required devices and use the device name in env.ts


### Install APPIUM RELATED

#### Install Appium GUI Server
[GUI Server](https://github.com/appium/appium-desktop/releases/tag/v1.22.3-4)

#### Install Appium Inspector
[APPIUM Inspector](https://github.com/appium/appium-inspector/releases)

In Appium GUI, Go to Advanced -> Setup IP (127.0.0.1) and PORT (4723) and Check Allow CORS checkbox and then start server

In Appium Inspector, After starting GUI Server, add appium:APP_PATH, appium:ANDROID_VERSION, appium:ANDROID_DEVICE_NAME, appium:ANDROID_HOME, platformName

The above values will be dependent on the setup done previous in AVD

    {
        "appium:APP_PATH": "/Users/gowthamanr/Downloads/ApiDemos-debug.apk",
        "appium:ANDROID_VERSION": "36.1",
        "appium:ANDROID_DEVICE_NAME": "Medium_Phone_API_36.1",
        "appium:ANDROID_HOME": "/Users/gowthamanr/Library/Android/sdk",
        "platformName": "Android"
    }

And then start the session

