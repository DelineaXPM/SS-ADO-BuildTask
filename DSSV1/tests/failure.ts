import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

/**
 * Create the following configuration with an invalid username,
 * password OR secret id.
 */

const config = require("./failure_config.json");

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('ServerUrl', config.serverUrl);
tmr.setInput('Username', config.credentials.username);
tmr.setInput('Password', config.credentials.password);
tmr.setInput('SecretId', config.secretId);
tmr.setInput('VariablePrefix', config.variablePrefix);
tmr.setInput('Comment', config.comment);

tmr.run();