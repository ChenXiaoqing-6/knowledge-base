cluster ui
https://api.dev.k8s.coresuite.com/api/v1/namespaces/kube-system/services/kubernetes-dashboard/proxy/#!/service?namespace=smallapps

helm docs
https://docs.helm.sh/using_helm/#using-helm

list pods
```
kubectl get pods
```

check status
```
helm status service-map
```

delete
```
helm delete service-map --purge
```



notes:

got to /Users/gasi/.kube/config
replace [config] is the default

running curl inside cluster
kubectl run --rm curl --image=radial/busyboxplus:curl -i --tty

