const fs = require('fs'),
    xml2js = require('xml2js');
const path = require('path');
const config = require(path.join(__dirname + '/config.js'));
const util = require(path.join(__dirname + '/util.js'));
const xml_handler = {}

var botJsonInfo = {};
xml_handler.parseXml = function (file, callback) {
    xml2js.parseString(file, (err, result) => {

        /* Capture Initial stage metrics */
        botJsonInfo = {
            'dialogs': result.Bot.botVersions[0].botDialogs,
            'dialogCount': result.Bot.botVersions[0].botDialogs.length,
            'label': result.Bot.label[0],
            'conversationVariables': result.Bot.botVersions[0].conversationVariables,
            'dialogsUpdatedCount': 0
        };

        /* Add Conversation Bot Variables */
        util.addVariables(botJsonInfo.conversationVariables);

        /* Iterate thru all dialogs and add apex calls */
        botJsonInfo.dialogs.forEach(function (dialog) {
            if (dialog.developerName[0].toLowerCase() === config.WelcomeDeialogApiName) {
                util.addCreateSessionNode(dialog, botJsonInfo);
            } else {
                util.addLogChatNode(dialog, botJsonInfo);
            }
        });

        /* Create Builder object */
        const builder = new xml2js.Builder({
            renderOpts: {
                'pretty': true,
            },
            xmldec: {
                'version': '1.0',
                'encoding': 'UTF-8'
            }
        });

        /* Convert JSON to XML */
        var updatedXml = builder.buildObject(result);
        //console.log(updatedXml);
        console.log(botJsonInfo.dialogsUpdatedCount);
        callback(err, updatedXml);
    });
}

xml_handler.readBotXml = function (fieName, callback) {
    fs.readFile(__dirname + '/uploads/' + fieName, function(err, data) {
        xml_handler.parseXml(data, callback);
    });
}

module.exports = xml_handler;