# ☁ cloud-project

Repository for our M2 Software Engineering for the Cloud project.

By Thibault LEPEZ, Ruben NABET, and Daniil ROSSO.

## 📚 Table of contents

- [Project Report](#📄-project-report)
  - [Premises](#premises)
  - [From Docker Compose to Kubernetes](#from-docker-compose-to-kubernetes)
- [How to run the app](#🚀-how-to-run-the-app)
  - [Requirements](#requirements)
  - [Setup](#setup)
    - [Setting up the cluster](#1-setting-up-the-cluster)
    - [Enabling ingress](#2-enabling-ingress)
  - [Running the app](#running-the-app)

## 📜 Project Report

### Premises

The source code for this project is originally the code for a Node.js REST API we made. It consists of 3 microservices interacting with each other:

- a PostgreSQL database,
- a Redis database (used for caching in the app),
- a Node.js backend.

We built the entire project using Docker and Docker Compose, and it worked really well.

### From Docker Compose to Kubernetes

In order to make it usable in the context of a cluster, we turned the backend microservice into its own Docker image, which we [published on the Docker hub](https://hub.docker.com/r/mrmonster0248/node_app).

From there, we simply added the new `backend` service to the [docker-compose file](./docker-compose.yml). We just refreshed the docker-compose app, and the new setup worked perfectly in Docker.

As recommended by the Kubernetes documentation, we used [the `kompose` tool](https://kubernetes.io/docs/tasks/configure-pod-container/translate-compose-kubernetes/) to generate [our deployment files](./kubernetes).

## 🚀 How to run the app

### Requirements

You will need to have [Docker 🐳](https://docker.com) and [minikube](https://minikube.sigs.k8s.io/) (or optionally kubectl) installed on your machine.

### Setup

#### 1. Setting up the cluster

First, open a terminal in this project and start a local cluster:

```shell
minikube start
```

Then, once your cluster is started, create the deployments for this project:

```shell
minikube kubectl -- apply -f ./kubernetes
```

Check that every deployment is running correctly:

```shell
minikube kubectl -- get deployments
```

The correct output at this point should be this:

```
NAME          READY   UP-TO-DATE   AVAILABLE
backend       1/1     1            1
ps-database   1/1     1            1
redis         1/1     1            1
```

Check that the services are okay:

```shell
minikube kubectl -- get services
```

It should look like this:

```
NAME          TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)
backend-tcp   LoadBalancer   10.97.199.196   <pending>     7000:32115/TCP
kubernetes    ClusterIP      10.96.0.1       <none>        443/TCP
```

#### 2. Enabling ingress

From there, enable the `ingress` addon:

```shell
minikube addons enable ingress
```

### Running the app

Once the `ingress` addon is active, just run:

```shell
minikube tunnel
```

**⚠ Keep this terminal open ! ⚠**

In another terminal, check that the tunneling is working:

```shell
minikube kubectl -- get services
```

The output should look like this:

```
NAME          TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)
backend-tcp   LoadBalancer   10.104.141.108   127.0.0.1     7000:31962/TCP
kubernetes    ClusterIP      10.96.0.1        <none>        443/TCP
```

While the tunnel is running, the app is accessible at the address: `http://127.0.0.1:7000`.

You can test it by launching this address in the browser: [`http://127.0.0.1:7000/docs`](http://127.0.0.1:7000/docs).
You should be able to see the API's Swager UI page.
