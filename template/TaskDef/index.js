var config = require("config");
var fs = require("fs");
var Util = require("cloudformation-z").Util;

module.exports = {
  "AWSTemplateFormatVersion" : "2010-09-09",
  "Description" : "ECS Taskdef and Service",

//  "Parameters" : require("./parameters.js"),  //partialized template
//  "Mappings": require("./mappings.js"),
  Parameters: {},
  Mappings: {},
  Resources : {
    "TaskSample" : {
      "Type": "AWS::ECS::TaskDefinition",
      "Properties" : require("./taskdef/taskdef1")
    },
    "FluentAWS" : {
      "Type": "AWS::ECS::TaskDefinition",
      "Properties" : require("./taskdef/fluentAWS")
    },
  },
//  Outputs : {}
}
