module.exports = {
  "ContainerDefinitions": [
    {
      "Name": "awscli",
      "Image": "newgyu/awscli",
      "VolumesFrom": [],
      "PortMappings": [],
      "Essential": true,
      "MountPoints": [],
      "Environment": [],
      "Command": [
        "ec2",
        "describe-instances"
      ],
      "Cpu": 50,
      "Memory": "128",
    }
  ],
  "Volumes": [],
}