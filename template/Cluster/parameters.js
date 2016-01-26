module.exports = {
  "KeyPairName": {
    "Description" : "Name of an existing EC2 KeyPair to enable SSH access to the instance",
    "Type": "AWS::EC2::KeyPair::KeyName",
    "ConstraintDescription" : "must be the name of an existing EC2 KeyPair."
  },

  "InstanceType" : {
    "Description" : "EC2 instance type",
    "Type" : "String",
    "Default" : "t2.micro",
    "ConstraintDescription" : "must be a valid EC2 instance type."
  },
}
