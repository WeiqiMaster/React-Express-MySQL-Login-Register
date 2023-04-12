## Start the MySQL docker container and run init_db_scripts on startup.
```
docker run -p 3306:3306 --name mysql-server -v $PWD/init_db_scripts:/docker-entrypoint-initdb.d -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
```

### To connect to the MySQL server via command line for debugging purpose, use the following command. Root user password is "root".
```
sudo docker exec -it mysql-server mysql -u root -p
```

## Start the redis server to store the sessions:
```
docker exec -it redis-stack-server redis-cli
```

<!-- ## Use docker to start the server:
### Build the main docker image:
```
docker build -t mywebapp .
```


## build the server locally: -->
## Install all the dependecies for Expressjs and React
```
npm install
```

## Start both Expressjs backend server and React server
```
npm run dev
```



