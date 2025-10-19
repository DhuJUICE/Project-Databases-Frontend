@echo off
echo Starting Frontend, Api Gateway, MicroServices...

REM Start Frontend
start cmd /k "cd /d J:\2.PROJECTS\DATABASES-PROJECT\Project-Databases-Frontend && npm start"

REM Start Api Gateway
start cmd /k "cd /d J:\2.PROJECTS\DATABASES-PROJECT\SocialMedia-ApiGateway-Ocelot\Social-ApiGateway && dotnet run Social-ApiGateway"

REM Close this batch window
exit
