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