# 🤖 node-rest-project

M2 Back-end REST project

## 🚀 How to run the app

### Setup

You will need to have [kubectl](https://kubernetes.io/docs/tasks/tools/) installed on your machine, and optionally [minikube](https://minikube.sigs.k8s.io/) as well.

#### 1. Setup the cluster config

To apply the Kubernetes configuration, if you are using **kubectl**, run:

```shell
kubectl apply -f redis-service.yml,ps-database-service.yml,backend-tcp-service.yml,db-data-persistentvolumeclaim.yml,redis-deployment.yml,ps-database-deployment.yml,backend-deployment.yml
```

**OR**

If you are using **minikube**, run:

```shell
minikube kubectl -- apply -f redis-service.yaml,ps-database-service.yaml,backend-tcp-service.yaml,db-data-persistentvolumeclaim.yaml,redis-deployment.yaml,ps-database-deployment.yaml,backend-deployment.yaml
```

#### 2. Access the application

If you're using **kubectl**, run:

```shell
kubectl describe svc backend
```

**OR**

If you're using **minikube**, run:

```shell
minikube service backend
```
