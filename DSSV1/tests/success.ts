import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

/**
 * Create the following configuration with a valid username,
 * password AND secret id.
 */
const config = require("./success_config.json");

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
const serverType = process.env.SERVER_TYPE || config.type;
// Choose platform or secret server based on config.type
if (serverType === "platForm") {
    tmr.setInput('ServerUrl', config.platForm.serverUrl);
    tmr.setInput('Username', config.platForm.credentials.username);
    tmr.setInput('Password', config.platForm.credentials.password);
    tmr.setInput('SecretId', config.platForm.secretId);
    tmr.setInput('VariablePrefix', config.platForm.variablePrefix);
    tmr.setInput('Comment', config.platForm.comment);
} else {
    tmr.setInput('ServerUrl', config.secretServer.serverUrl);
    tmr.setInput('Username', config.secretServer.credentials.username);
    tmr.setInput('Password', config.secretServer.credentials.password);
    tmr.setInput('SecretId', config.secretServer.secretId);
    tmr.setInput('VariablePrefix', config.secretServer.variablePrefix);
    tmr.setInput('Comment', config.secretServer.comment);
}

tmr.run();
