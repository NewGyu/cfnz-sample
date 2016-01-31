module.exports = {
  "ContainerDefinitions": [
    {
      "Name": "logger",
      "Image": "newgyu/fluent-awslogs",
      "VolumesFrom": [],
      "PortMappings": [
        {ContainerPort: 22424, HostPort: 22424}
      ],
      "Essential": true,
      "MountPoints": [],
      "Environment": [
        {Name: "AWSLOGS_GROUP",Value: "personalize/batch/test"},
        {Name: "AWSLOGS_STREAM",Value: "fuga"},
        {Name: "AWS_REGION",Value: "ap-northeast-1"},
      ],
      "Cpu": 100,
      "Memory": 256,
    }
  ],
  "Volumes": [],
}