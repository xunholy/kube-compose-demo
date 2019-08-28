# Demo

This repo includes a react frontend and nodejs backend that are both dockerized and can be run using docker-compose. This demo includes examples how to use kube-compose to run the frontend and backend in kubernetes.

## Setup

The docker images are not published and therefore must be created locally.

### Prerequisites

This example we will rely upon docker and docker-compose as a easy way to configure and expose these applications, and ensuring the backend service is up and running before our frontend service boots up.

The following are required to run this demo:

- docker - https://docs.docker.com
- docker-compose - https://docs.docker.com/compose/install/
- kube-compose - https://github.com/kube-compose/kube-compose#Installation

### Building images for the frontend and backend
```bash
$ ./build_images.sh
```

## Running

Update the plivo credentials in `env.sh`.

### Docker-Compose

#### Start

Run both the frontend and backend services in containers with docker-compose using the following command:

Note: Use the `-d` flag if you wish to run detach mode to run the containers in the background and not print their logs. 

```bash
$ source env.sh
$ docker-compose up
```

You can now view frontend in the browser.

Local: http://localhost:3000/

You can also confirm the backend is working correctly with the following:

```bash
$ curl -v localhost:8081
```

Expected output:

```bash
* Rebuilt URL to: localhost:8081/
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8081 (#0)
> GET / HTTP/1.1
> Host: localhost:8081
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Content-Type: text/html; charset=utf-8
< Content-Length: 8
< ETag: ********
< Date: ********
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
Success!
```

#### Stop

Stop all running services with docker-compose using the following command:

```bash
$ source env.sh
$ docker-compose down
```


### Kube-Compose

There a lot of benefits of using docker-compose and it's a very popular tool for setting up a multi-container ecosystem.

kube-compose provides a lot of these benifits however gives the user the flexibilty to run their ecosystem in a kubernetes cluster.

Running CI in a kubernetes cluster provides the benifits of running your applications in the same environment / ecosystem as where you deploy your applications. Typically CI runs on some pool of agents and/or nodes and these environments are not similar to the environments your application gets deployed too.

#### Start

Run both the frontend and backend services in containers with kube-compose using the following command:

Note: You will need to authenticate to a kubernetes cluster, if no authentication is provided it will use your current kube context set in your kube config (i.e. `~/.kube/config`).

```bash
$ source env.sh
$ kube-compose up
```
Press ctrl-c when you are finished.

To view the pods and services created by `kube-compose`:
```bash
$ kubectl get all -owide --show-labels
```

#### Stop

Stop all running services and cleanup all Kubernetes resources that were created.

```bash
$ source env.sh
$ kube-compose down
```
