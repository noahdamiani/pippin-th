# Pippin Takehome

Author: Noah Damiani

## Design

https://www.figma.com/community/file/1080613843279208341/Pippin-UI-Development-Test

## Running the project

First run `yarn` to install the codebase. Run `npm install --global yarn` if yarn is not installed.

To run in development mode:

```bash
yarn dev
```

The application should be running at http://localhost:3000

## Run test suites

This project contains E2E tests built with cypress, as well as unit tests using Jest.

If you want to see the entirety of test results, just run `yarn build`,
which will run both Jest and Cypress in CI mode before building the codebase.

To check test suites individually:

```bash
    # E2E tests, in your console:
    yarn e2e:headless

    # E2E tests with browser explorer:
    yarn e2e

    # Jest unit tests:
    yarn test

    # Jest unit tests, CI:
    yarn test:ci
```
