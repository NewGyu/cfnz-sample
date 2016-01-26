"use strict";

var CFNZ = require("cloudformation-z");
var config = require("config");
var program = require("commander");

program.option("-t --template <templateName>").parse(process.argv);
if(! program.template) {
  console.error("template is require");
  process.exit(1);
}

var template = require("./template/" + program.template);
var commander = new CFNZ.EasyCommander(config, template);

commander.exec(["node","cfnz"].concat(program.args));
