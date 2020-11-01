# The Thycotic Secret Server Azure DevOps Task
This repository contains the code for an Azure DevOps pipeline task which is used to read secrets from Thycotic Secret Server.

## Prerequisites
* [Visual Studio Code](https://code.visualstudio.com/)
* [Node.js](https://nodejs.org)
* [TypeScript Compiler](https://www.npmjs.com/package/typescript)
* CLI for Azure DevOps (tfx-cli) to package the extension. You can install *tfx-cli* by running *npm i -g tfx-cli*.

## General
The task code can be found in the **TSSV1** directory. The entry point for the task is *index.ts* and most of the core code can be found in *operations/Server.ts*.

## Compiling
From the task directory **TSSV1**, first install the task dependencies:
```
TSSV1> npm install
```

Then to compile the task:
```
TSSV1> tsc
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
            "program": "${workspaceFolder}\\TSSV1\\index.ts",
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ],
            "env": {
                "INPUT_USERNAME": "myusername",
                "INPUT_PASSWORD": "mypassword",
                "INPUT_SERVERURL": "https://mytenent.secretservercloud.com",
                "INPUT_SECRETID": "1",
                "INPUT_DATAFILTER": "*",
                "INPUT_VARIABLEPREFIX": "TSS_"
            }
        }
    ]
}
```
From the 'Run' menu, select 'Start Debugging' OR F5.

## Unit Tests
```
Create a *success_config.json* in the **TSSV1\tests** directory:
```json
{
    "serverUrl": "https://mytenent.secretservercloud.com",
    "credentials": {
        "username": "myusername",
        "password": "mypassword"
    },
    "secretId": 1,
    "variablePrefix": "TSS_"
}
```
Create a *failure_config.json* in the **TSSV1\tests** directory:
```json
{
    "serverUrl": "https://mytenent.secretservercloud.com",
    "credentials": {
        "username": "myusername",
        "password": "mypassword"
    },
    "secretId": 1234567890,
    "variablePrefix": "TSS_"
}
```
From the task directory **TSSV1**, run the following:
```
TSSV1> mocha .\tests\_suite.js
```

# Packaging the extension
Package the extension into a .vsix file using the following command from the repository root:
```
> tfx extension create --manifest-globs vss-extension.json
```
Note, the version in *vss-extension.json* must match the one in *TSSV1/task.json*.
