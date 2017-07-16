
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


## In order to start the server execute this exact command on the terminal 
/home/ubuntu/workspace/google-cloud-sdk/bin/dev_appserver.py app.yaml --host $IP --admin_port=9000

## The application will be running on this link
https://morgiidad-abdallahozaifa.c9users.io/

## To deploy this application execute this exact command
/home/ubuntu/workspace/google-cloud-sdk/bin/gcloud app deploy app.yaml --project markdistrictwebsite

## The application is currently hosted on this link
https://markdistrictwebsite.appspot.com/

## To watch the server logs
/home/ubuntu/workspace/google-cloud-sdk/gcloud app logs tail -s default

