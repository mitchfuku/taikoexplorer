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

This should start the app on localhost:8000

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

## What's Virtualenv?

Basically, activating virtualenv creates a "virtual" environment for your
development.  Anytime you run "pip install <package_name>" or anything like that
while virtualenv is active, it will not install the package into your computer's
root, but into its virtual root (venv/bin).  Yay for not installing tons of crap
packages on your computer!

## Database schema

Video
vid = native video id
type = yt or vm (youtube for now...more types to come eventually!)
small_thumb = yt or vm thumbnail url
default_thumb
large_thumb
(implied) id
title
description

Composer
full_name
(implied) id

Song (also for drills)
(implied) id
name
description
date_composed = date the ORIGINAL version of this song was composed
is_open_source
is_drill = boolean true if the "song" is a drill
is_original = boolean true if the song being played is the original version

Group
(implied) id
name
nicknames = array(?)
date_founded

AKA
(implied) id
group_id = foreign key into group
name

//songs written by composer and composers of a song
ComposerSong
composer_id
song_id
is_original_composer = boolean true if the song associated to this composer was composed by this composer
date_rearranged = if this is not the original, date this was rearranged

//Songs in the video and videos this song is in
SongVideo
song_id
video_id (implied id)
video_vid

//Groups in the video and videos this group is in
GroupVideo
group_id
video_id (implied) //included in case vimeo or YT ever changes their IDs
video_vid (native video id)
