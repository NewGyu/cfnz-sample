var config = require("config");
var fs = require("fs");
var Util = require("cloudformation-z").Util;

module.exports = {
  "AWSTemplateFormatVersion" : "2010-09-09",

  "Description" : "cloudformation template sample",

  "Parameters" : require("./parameters.js"),  //partialized template
  "Mappings": require("./mappings.js"),

  "Resources" : {
    "ClusterConfig" : {
      "Type" : "AWS::AutoScaling::LaunchConfiguration",
      "Properties" : {
        "ImageId" : {"Fn::FindInMap":["Region2EcsAMI", {"Ref" : "AWS::Region"}, "AMIID"]},
        "InstanceType" : config.EcsCluster.instance.type,
        "SecurityGroups" : [ { "Ref" : "InstanceSecurityGroup" }],
        "KeyName" : {"Ref":"KeyPairName"},
        "IamInstanceProfile" : {"Ref" : "EcsInstanceProfile"},
        "BlockDeviceMappings" : [{
          "DeviceName" : "/dev/xvda",
          "Ebs" : {"VolumeSize" : config.EcsCluster.instance.diskSize}
        }],
        "UserData" : Util.toFnBase64(fs.readFileSync(__dirname + "/userData/ecsInstance.sh", "utf-8"))
      }
    },
    //AutoScalingGroup
    "ClusterGroup" : {
      "Type" : "AWS::AutoScaling::AutoScalingGroup",
       "Properties" : {
          "AvailabilityZones" : { "Fn::GetAZs" : ""},
          "LaunchConfigurationName" : { "Ref" : "ClusterConfig" },
          "MinSize" : config.EcsCluster.min,
          "MaxSize" : config.EcsCluster.max,
          "DesiredCapacity": config.EcsCluster.desired,
          "VPCZoneIdentifier" : config.subnets,
          "Tags" :[
            {"Key": "Name", "Value": config.prefix + "-ECS", PropagateAtLaunch: true}
          ]
//          "LoadBalancerNames" : [ { "Ref" : "LB" } ]
       }
    },
    "EcsInstanceProfile" : {
      "Type": "AWS::IAM::InstanceProfile",
      "Properties": {
        "Path": "/",
        "Roles": [{"Ref": "EcsInstanceRole"}]
      }
    },
    // ECSのホストに渡すロール
    "EcsInstanceRole":  {
       "Type": "AWS::IAM::Role",
       "Properties": {
          "AssumeRolePolicyDocument": {
            "Statement": [{
              "Effect": "Allow",
              "Principal": {"Service": ["ec2.amazonaws.com"]},
              "Action": ["sts:AssumeRole"]
            }]
          },
          "Policies": [{
            "PolicyName": "EcsInstanceRole-policy",
            "PolicyDocument":{
              "Statement":[{
                "Effect": "Allow",
                "Action": [
                  "ecs:CreateCluster",
                  "ecs:DeregisterContainerInstance",
                  "ecs:DiscoverPollEndpoint",
                  "ecs:Poll",
                  "ecs:RegisterContainerInstance",
                  "ecs:StartTelemetrySession",
                  "ecs:Submit*",
                  "logs:CreateLogStream",
                  "logs:PutLogEvents"
                ],
                "Resource": "*"
              }]
            }
          }],
       }
    },
    "InstanceSecurityGroup" : {
      "Type" : "AWS::EC2::SecurityGroup",
      "Properties" : {
        "GroupDescription" : "Enable SSH access via port 22",
        "VpcId" : config.vpcId,
        "SecurityGroupIngress" : [ {
          "IpProtocol" : "tcp",
          "FromPort" : "22",
          "ToPort" : "22",
          "CidrIp" : "0.0.0.0/0"
        } ]
      }
    },
    "MyECSCluster" :{
      "Type" : "AWS::ECS::Cluster"
    }
  },
  "Outputs" : {}
}
