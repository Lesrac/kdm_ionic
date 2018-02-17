FROM node:carbon

# Create a work directory and copy project files
WORKDIR /usr/src/app
COPY . .

# Install package dependencies
RUN pip install -r requirements.txt

# Expose ports of docker
EXPOSE 80 443

# Choose a default command to be excecuted when starting a container
RUN npm install
