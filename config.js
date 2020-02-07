//Configuration items

var config = {};
config.logChatXmlNode = {
    "botInvocation": {
        "invocationActionName": "ebotdata__BotChatLogger",
        "invocationActionType": "apex",
        "invocationMappings": [{
                "parameterName": "currentThresholdHigh",
                "type": "Input",
                "variableName": "currentThresholdHigh",
                "variableType": "ConversationVariable"
            },
            {
                "parameterName": "currentUtterance",
                "type": "Input",
                "variableName": "currentUtterance",
                "variableType": "ConversationVariable"
            },
            {
                "parameterName": "liveAgentSessionId",
                "type": "Input",
                "variableName": "ChatKey",
                "variableType": "ContextVariable"
            },
            {
                "parameterName": "currentDialogName",
                "type": "Input",
                "variableName": "currentDialogName",
                "variableType": "ConversationVariable"
            },
            {
                "parameterName": "currentConfidenceForUtterance",
                "type": "Input",
                "variableName": "currentConfidenceForUtterance",
                "variableType": "ConversationVariable"
            },
            {
                "parameterName": "currentDialogId",
                "type": "Input",
                "variableName": "currentDialogId",
                "variableType": "ConversationVariable"
            }
        ]
    },
    "type": "Invocation"
};

config.createBotSessionXmlNode = {
    "botInvocation": {
        "invocationActionName": "ebotdata__BotChatLogSession",
        "invocationActionType": "apex",
        "invocationMappings": {
            "parameterName": "liveAgentSessionId",
            "type": "Input",
            "variableName": "ChatKey",
            "variableType": "ContextVariable"
        }
    },
    "type": "Invocation"
};

config.WelcomeDeialogApiName = 'welcome';

config.conversationVariables = [{
    dataType: 'Text',
    developerName: 'currentDialogId',
    label: 'currentDialogId'
}, {
    dataType: 'Text',
    developerName: 'currentDialogName',
    label: 'currentDialogName'
}, {
    dataType: 'Text',
    developerName: 'currentUtterance',
    label: 'currentUtterance'
}, {
    dataType: 'Number',
    developerName: 'currentConfidenceForUtterance',
    label: 'currentConfidenceForUtterance'
}, {
    dataType: 'Number',
    developerName: 'currentThresholdHigh',
    label: 'currentThresholdHigh'
}];

module.exports = config;