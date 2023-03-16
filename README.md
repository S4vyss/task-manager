# Task Manager

Task Manager is a fullstack application made by me. S4vyss. It consists of main page, login page and project page. 
<hr>
Essentialy,its [trello](https://trello.com)

<hr>

## Dev Usage

To open this project locally on your computer do as follows:

```
mkdir project
cd project
git clone https://github.com/S4vyss/task-manager.git
```

Then in your project directory:

``
npm install
``

After that you gonna have to create your  **.env**  file and fill in the required variables from  **.env.example** 
<hr>
Your  **.env**  file should look like that:


```
 DATABASE_URL=file:./db.sqlite  
 NEXTAUTH_URL=http://localhost:3000 
   
 GOOGLE_CLIENT_ID= 
 GOOGLE_CLIENT_SECRET=
 ```

You need to provide your client id and secret that you can get from [here](https://console.cloud.google.com/apis/credentials?pli=1&project=task-manager-373515)


If you dont have already set up google Oauth application you can follow these steps to create one and get your client id and secret.
[Click](https://cloud.google.com/endpoints/docs/frameworks/python/creating-client-ids#web-client)
<hr>
After you set up your **.env** file you can then proceed to creating your prisma migration.

**Inside your project terminal:**
``
npx prisma migrate dev
``

### Lastly

*I want to thank Maciejowski and rafal06 for being beta testers.*