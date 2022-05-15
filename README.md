# Step 1 navigate inside the folder
* cd assgiment <!-- navigate terminal into the main folder  -->

 # Step 1 Download docker
* sudo apt-get install curl
* curl -fsSL https://get.docker.com -o get-docker.sh
* sudo sh ./get-docker.sh

# Step 2 Build the containers
* sudo apt-get isntall docker-compose
* sudo docker-compose up --build

# Step 3 Load the data
* docker exec backend bash -c 'cd backend ; python manage.py migrate ; python manage.py loaddata json_data.json'
