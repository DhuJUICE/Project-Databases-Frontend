@echo off
echo Starting Frontend, Api Gateway, MicroServices...

REM Start Frontend
start cmd /k "cd /d J:\2.PROJECTS\DATABASES-PROJECT\Project-Databases-Frontend && npm start"

REM Start Api Gateway
start cmd /k "cd /d J:\2.PROJECTS\DATABASES-PROJECT\SocialMedia-ApiGateway-Ocelot\Social-ApiGateway && dotnet run Social-ApiGateway"

REM Start MicroServices
start cmd /k "cd /d J:\2.PROJECTS\DATABASES-PROJECT\Project-Databases-AuthenticationService && python manage.py runserver 8000"
start cmd /k "cd /d J:\2.PROJECTS\DATABASES-PROJECT\Project-Databases-FeedService && python manage.py runserver 8001"
start cmd /k "cd /d J:\2.PROJECTS\DATABASES-PROJECT\Project-Databases-UserService && python manage.py runserver 8002"
start cmd /k "cd /d J:\2.PROJECTS\DATABASES-PROJECT\Project-Databases-PostService && python manage.py runserver 8003"
start cmd /k "cd /d J:\2.PROJECTS\DATABASES-PROJECT\Project-Databases-GraphService && python manage.py runserver 8004"

REM Close this batch window
exit
