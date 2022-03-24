# 🤖 node-rest-project

M2 Back-end REST project

## 🚀 How to run the app

### Setup

You will need to have [kubectl](https://kubernetes.io/docs/tasks/tools/) installed on your machine, and optionally [minikube](https://minikube.sigs.k8s.io/) as well.

#### 1. Setup the cluster config

To apply the Kubernetes configuration, if you are using **kubectl**, run:

```shell
kubectl apply -f ./kubernetes
```

**OR**

If you are using **minikube**, run:

```shell
minikube kubectl -- apply -f ./kubernetes
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

The service should be running.
