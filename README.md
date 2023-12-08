# Playwright Sample Framework to test plex.tv 
# WORK IN PROCESS

## Setup

 - download and install node
 - run the following command

 ```npm init playwright@latest --yes -- --quiet --browser=chromium --browser=firefox --browser=webkit --gha```

## Run tests
 
To run the test suite in headless mode, use the following command:


```sh
npm run test 
```

To run the test suite in headed mode, use the following command:

```sh
npm run test:headed
```

To run the test suite in debug mode, use the following command:

```sh
npm run test:debug
```

If you only want to run a single set of tests you can set it as the last parameter.

```sh
npm run test:headed account.spec.ts
```


