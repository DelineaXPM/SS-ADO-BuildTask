import tl = require('azure-pipelines-task-lib/task');
import path = require("path");

import { ServerTaskParameters } from './models/ServerTaskParameters';
import { Server } from './operations/Server';
import { Secret } from './models/Secret';
import { SecretField } from './models/SecretField';

async function run() {
    try {

        /**
         * Initialization.
         */
        const taskManifestPath = path.join(__dirname, "task.json");
        tl.debug("Setting resource path to " + taskManifestPath);
        tl.setResourcePath(taskManifestPath);

        /**
         * Get task parameters and create our server from
         * the resulting configuration. 
         */
        const serverParameters = new ServerTaskParameters();
        const taskParameters = serverParameters.getTaskParameters();
        const server = new Server(taskParameters.config!);

        /**
         * Make sure the secret id has been specified.
         */
        if (!taskParameters.secretId) {
            tl.setResult(tl.TaskResult.Failed, "Secret id not specified");
            return;
        }

        /**
         * Get the secret from the server.
         */
        let secret: Secret = await server.getSecret(taskParameters.secretId);
        if (!secret) {
            tl.setResult(tl.TaskResult.Failed, "Secret not found");
            return;
        }

        tl.debug("Got secret with id " + taskParameters.secretId);

        /**
         * Get the list of field names/slugs requested and iterate over
         * them setting a variable in the environment for each with the
         * specified variable prefix (Default: "DSS_") on each key.
         */
        let fieldNames: string[] = taskParameters.getFieldNames(secret);

        fieldNames.forEach(fieldName => {
            if (fieldName) {
                let field: SecretField | null = secret.getField(fieldName);
                if (field) {
                    if (field.itemValue) {
                        if (field.slug) {
                            let name: string = taskParameters.getVariableName(field.slug);
                            let value: string = field.itemValue;
                            let secret: boolean = taskParameters.isSecret(name);
                            tl.setVariable(name, value, secret);
                            console.log(`Stored value for field '${fieldName}' in the variable '${name}' (secret: ${secret})`);
                        }
                        else {
                            console.log(`Slug for '${fieldName}' is undefined`);
                        }
                    } else {
                        console.log(`Value for '${fieldName}' is undefined`);
                    }
                }
                else {
                    console.log(`Field with name or slug '${fieldName}' not found`);
                }
            }
        });

        tl.setResult(tl.TaskResult.Succeeded, "");
    }
    catch (err) {
        console.log(err.message);
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();