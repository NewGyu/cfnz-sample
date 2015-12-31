#!/bin/bash -xe
echo ECS_CLUSTER={"Ref":"MyECSCluster"}>> /etc/ecs/ecs.config
