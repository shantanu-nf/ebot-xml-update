const path = require('path');
const config = require(path.join(__dirname + '/config.js'));
const util = {}

util.addLogChatNode = function (botDialog, botJsonInfo) {
    if (!util.logChatCallExists(botDialog.botSteps)) {
        botJsonInfo.dialogsUpdatedCount = botJsonInfo.dialogsUpdatedCount + 1;
        return botDialog.botSteps.unshift(config.logChatXmlNode);
    }
}

util.addCreateSessionNode = function (botDialog, botJsonInfo) {
    util.addLogChatNode(botDialog, botJsonInfo);
    if (!util.createSessionCallExists(botDialog.botSteps))
        return botDialog.botSteps.unshift(config.createBotSessionXmlNode);
}

util.addVariables = function (conversationVariables) {
    var cloneObj = {};
    conversationVariables.forEach(function (variable) {
        cloneObj[variable.developerName] = variable;
    });

    config.conversationVariables.forEach(function (variable) {
        if (!cloneObj[variable.developerName])
            conversationVariables.push(variable);
    });
}

util.createSessionCallExists = function (botSteps) {
    let callExists = false;
    botSteps.some(function (step) {
        if (step.type[0] === 'Invocation' && step.botInvocation && step.botInvocation[0].invocationActionName[0] === 'ebotdata__BotChatLogSession') {
            callExists = true;
            return true;
        }
    });
    return callExists;
}

util.logChatCallExists = function (botSteps) {
    let callExists = false;
    botSteps.some(function (step) {
        if ((step.type[0] === 'Invocation') && (step.botInvocation) && (step.botInvocation[0].invocationActionName[0]) === 'ebotdata__BotChatLogger') {
            callExists = true;
            return true;
        }
    });
    return callExists;
}

util.moveFileToUploads = function (sampleFile, callback) {
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('uploads/' + sampleFile.name, function (err) {
        if (err)
            callback(err, null);
        else{
            callback(null, 'success');
        }
    });
}

module.exports = util;