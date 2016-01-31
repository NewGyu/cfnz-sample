module.exports = {
  stackName: "ECS-SAMPLE-DEV",
  timeoutInMinutes: 10,
  parameters: {
    //使わないパラメータがあると怒られる
//    KeyPairName: "docker-sample",
//    InstanceType: "t2.micro"
  },
  //custom settings
  prefix: "ECS-SAMPLE-DEV",
  vpcId: "vpc-4e55442c",
  subnets: ["subnet-bb86bacf","subnet-da4a159c"],
  EcsCluster: {
    instance: {
      type: "t2.micro",
      diskSize: "30" //ECS Instance requires 30GB at least
    },
    min: "1",
    max: "1",
    desired: "1",
  }
}
