# Taikoexplorer

There are many plugins working together to make this work.  Check out
requirements.txt to see them all.  

## Installing things

There will probably be lots of things you need to install to get everything to
work.  Just go with the flow:

Download virtualenv https://pypi.python.org/pypi/virtualenv

    sudo python setup.py install #install virtualenv

Go into taikoexplorer/ folder

    virtualenv venv --distribute
    source venv/bin/activate #this runs Virtualenv.  See below.
    pip install -r requirements.txt

If you install a new package, make sure you are in virtualenv, install your
package, and run:

    pip freeze > requirements.txt

This will tell Heroku the packages necessary to run your application.  It is
critical that you install all packages necessary in the application in
virtualenv and then run the above command.

## Running the application locally

First, enter Virtualenv in your terminal.  Run:

    source venv/bin/activate

Your terminal will be prepended with "(venv)".  To deactivate venv, run:

    deactivate

Finally, to start the server, run:

    python manage.py runserver

This should start the app on localhost:5000

## What's Virtualenv?

Basically, activating virtualenv creates a "virtual" environment for your
development.  Anytime you run "pip install <package_name>" or anything like that
while virtualenv is active, it will not install the package into your computer's
root, but into its virtual root (venv/bin).  Yay for not installing tons of crap
packages on your computer!

## Database migrations

Migrations are done using South.  Here is a great tutorial on setting it up:
https://south.readthedocs.org/en/latest/tutorial/index.html#tutorial

Migrations are really easy!  Just change the file models.py in taikoexplorer_db/
and run:

    ./manage.py schemamigration taikoexplorer_db --auto

This will create a new migration file and put it in the
taikoexplorer_db/migrations folder.  After that, run:

    ./manage.py migrate taikoexplorer_db

And you are done!  You have the ability to go forward and backward in your
migrations too.  DO NOT DO MIGRATIONS ANY OTHER WAY.

## Deleting the database
DO NOT DO THIS UNLESS YOU KNOW EXACTLY WHAT YOU'RE DOING!
YOU WILL BE DELETING THE ENTIRE DATABASE AND RESETTING IT FROM SCRATCH!
Stop and think for one second...

Last chance...

Run these commands from /taikoexplorer: 

    heroku pg:reset DATABASE
    rm taikoexplorer_db/migrations/*
    python manage.py schemamigration taikoexplorer_db --initial
    ./manage.py syncdb
    ./manage.py migrate taikoexplorer_db
    
Then manually go into heroku pg:psql and do:

    insert into taikoexplorer_db_songstyle (name, description) values ('Betta', '');
    insert into taikoexplorer_db_songstyle (name, description) values ('Naname', '');
    insert into taikoexplorer_db_songstyle (name, description) values ('Hachijo', '');
    insert into taikoexplorer_db_songstyle (name, description) values ('Miyake', '');
    insert into taikoexplorer_db_songstyle (name, description) values ('Odaiko', '');
    insert into taikoexplorer_db_songstyle (name, description) values ('Yatai', '');
    insert into taikoexplorer_db_songstyle (name, description) values ('Other', '');
    insert into taikoexplorer_db_songstyle (name, description) values ('Shime', '');

## Database Help

To use psql to query the db, enter: 

    heroku pg:psql
    
Ctrl - D gets you out of psql

To query all tables in the database, enter:

    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema='public' 
    AND table_type='BASE TABLE';
