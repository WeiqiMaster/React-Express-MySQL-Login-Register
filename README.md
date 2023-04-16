<!-- ## Start the MySQL docker container and run init_db_scripts on startup.
```
docker run -p 3306:3306 --name mysql-server -v $PWD/init_db_scripts:/docker-entrypoint-initdb.d -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
``` -->
# Use docker-compose to start up nginx reverse proxy, fronend, backend, MySQL, Redis containers all at once
- docker-compose up --build
- docker-compose up

#### The webpage will be available at http://localhost

<!-- ### To connect to the MySQL server via command line for debugging purpose, use the following command. Root user password is "root".
```
sudo docker exec -it mysql-db mysql -u root -p
``` -->
<!-- 
## Start the redis server to store the sessions:
```
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
``` -->

<!-- 
## build the server locally:
## Install all the dependecies for Expressjs and React
```
npm install
```

## Start both Expressjs backend server and React server
```
npm run dev
``` -->


# Testing ethereal email account. Fake verification code will be sent from this email (The recipient will not recieved the email). Check https://ethereal.email
- Username: 	brody48@ethereal.email (also works as a real inbound email address)
- Password: 	1bWqZCcVwKuZTdT7G4


