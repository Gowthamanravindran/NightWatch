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