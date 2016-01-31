"use strict";

var CFNZ = require("cloudformation-z");
var config = require("config");

var program = require("commander");
program.option("-t --template <templateName>").parse(process.argv);

var template = loadTemplate(program.template);
config.stackName = config.stackName + "-" + program.template;

var commander = new CFNZ.EasyCommander(config, template);
commander.exec(["node","cfnz"].concat(program.args));

function loadTemplate(templateName) {
  if(! templateName) {
    console.error("template is require");
    process.exit(1);
  }
  return require("./template/" + templateName);
}
