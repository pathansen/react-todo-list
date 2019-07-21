# React Todo List

## Setting Up React front end
After downloading the repository, change directory into `client`:

```
$ cd react-todo-list/client
```

Install the node packages:

```
$ npm install
```

Start the server:

```
$ npm start
```

This will be default start the server on localhost port 3000 (_i.e._, http://localhost:3000)

## Setting Up Python back end

After setting up front end, change directory back to root of project:

```
$ cd ..
```

Create a virtual environment for the repository using `python 3` and activate the environment (can make `env` in the command to any name):

```
$ pip install virtualenv
$ virtualenv -p python env

# Will only need one of the following commands depending on OS
$ source env/bin/activate  # macOS or Linux
$ source env/Scripts/activate  # Windows
```

After creating and activating the virtual environment, change directory into the server"

```
(env) $ cd server
```

Install Python requirements:

```
(env) $ pip install -r requirments
```

With the requirements installed, can now start the backend server

```
# Will only need one of the following commands depending on OS
(env) $ gunicorn -reload app:api  # macOS or Linux
(env) $ waitress-serve --port=8000 app.app:api  # Windows
```
