# The Cloudkitects Secret Server Azure DevOps Task
This repository contains the code for an Azure DevOps pipeline task which is used to read secrets from Delinea Secret Server.

Please find the Delinea Secret Server ADO Task in the VisualStudio Marketplace here: https://marketplace.visualstudio.com/items?itemName=cloudkitects.delinea-ss-task

## Prerequisites
* [Visual Studio Code](https://code.visualstudio.com/)
* [Node.js](https://nodejs.org)
* [TypeScript Compiler](https://www.npmjs.com/package/typescript)
* CLI for Azure DevOps (tfx-cli) to package the extension. You can install *tfx-cli* by running *npm i -g tfx-cli*.

## General
The task code can be found in the **DSSV1** directory. The entry point for the task is *index.ts* and most of the core code can be found in *operations/Server.ts*.

## Compiling
From the task directory **DSSV1**, first install the task dependencies:
```
DSSV1> npm install
```

Then to compile the task:
```
DSSV1> tsc
```

## Debugging
Create a *launch.json* in your **.vscode** directory:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\DSSV1\\index.ts",
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ],
            "env": {
                "INPUT_USERNAME": "ExampleUsername",
                "INPUT_PASSWORD": "ExamplePassword12#",
                "INPUT_SERVERURL": "https://mytenent.secretservercloud.com",
                "INPUT_SECRETID": "1",
                "INPUT_DATAFILTER": "*",
                "INPUT_VARIABLEPREFIX": "DSS_"
            }
        }
    ]
}
```
From the 'Run' menu, select 'Start Debugging' OR F5.

## Unit Tests

Create a *success_config.json* in the **DSSV1\tests** directory:
```json
{
    "serverUrl": "https://mytenent.secretservercloud.com",
    "credentials": {
        "username": "myusername",
        "password": "mypassword"
    },
    "secretId": 1,
    "variablePrefix": "DSS_"
}
```
Create a *failure_config.json* in the **DSSV1\tests** directory:
```json
{
    "serverUrl": "https://mytenent.secretservercloud.com",
    "credentials": {
        "username": "myusername",
        "password": "mypassword"
    },
    "secretId": 1234567890,
    "variablePrefix": "DSS_"
}
```
From the task directory **DSSV1**, run:
```
npm run test
```
## Debugging Unit Tests in VSCode
Add this configuration to launch.json
```json
{
    "args": [
        "-u",
        "bdd",
        "--timeout",
        "999999",
        "--colors",
        "${workspaceFolder}/DSSV1/tests"
    ],
    "internalConsoleOptions": "openOnSessionStart",
    "name": "Mocha Tests",
    "program": "${workspaceFolder}/DSSV1/node_modules/mocha/bin/_mocha",
    "request": "launch",
    "skipFiles": [
        "<node_internals>/**"
    ],
    "type": "node",
    "cwd": "${workspaceRoot}/DSSV1/",
}
````

# Packaging the extension
Package the extension into a .vsix file using the following command from the repository root:
```
> tfx extension create --manifest-globs vss-extension.json
```
Note, the version in *vss-extension.json* must match the one in *DSSV1/task.json*.
