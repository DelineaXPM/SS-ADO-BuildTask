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

tmr.setInput('ServerUrl', config.serverUrl);
tmr.setInput('Username', config.credentials.username);
tmr.setInput('Password', config.credentials.password);
tmr.setInput('SecretId', config.secretId);
tmr.setInput('VariablePrefix', config.variablePrefix);

tmr.run();
