#!/bin/bash -xe
yum update -y
echo ECS_CLUSTER={"Ref":"MyECSCluster"}>> /etc/ecs/ecs.config
