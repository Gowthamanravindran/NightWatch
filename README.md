# NightWatch

Playwright Framework with Typescript

#### Tech Stack

Automation Engine : Playwright
Language : TypeScript
Reporting : Allure

#### Features
- Follows POM Model
- Confiugurable TestData handling
- Cross Browser Testing
- 

###  Setup

#### Initialize NPM project
	npm init -y

#### Install typescript dependencies
	npm install -D typescript ts-node ts-node-dev

#### create tsconfig.json
	npx tsc --init

#### Install playwright
	npm install -D @playwright/test

#### Install Browsers

    sudo npx playwright install-deps
    npx playwright install

#### Validate playwright installation
	npx playwright test

#### Install openjdk ( Required for allure local - only needed if not already present)
	brew install openjdk

#### Install allure
	brew install allure

#### Install allure cli
	npm install -g allure-commandline

#### Install allure dependencies
	npm install -D allure-playwright allure-commandline

#### Validate allure
	allure --version

#### install dotenv
	npm install dotenv

#### Run web tests
	npm run test:web

### FAQ

#### GPG Key Error when installing Playwright dependencies

W: GPG error: https://dl.yarnpkg.com/debian stable InRelease: The following signatures were invalid

	sudo apt-key list


And then

	sudo apt-key del <Key from  the  Error>


And then

	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo gpg --dearmor -o /usr/share/keyrings/yarn-archive-keyring.gpg

Update Package

	sudo apt update
 
Retry installation

	sudo npx playwright install-deps

#### JRE Error

If you get errors when JRE is not available
In MAC, with Homebrew - Check if openjdk is installed
	brew install openjdk

If already instealled - Check if MacOS can detect it 
	/usr/libexec/java_home -V

Let Homebrew detect openjdk
	sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk \/Library/Java/JavaVirtualMachines/openjdk.jdk

Then try 
	/usr/libexec/java_home -V

Now check
	java -version