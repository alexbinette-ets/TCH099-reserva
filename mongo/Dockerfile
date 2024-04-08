FROM mongo:jammy

# Create the data directory
RUN mkdir -p /data/db
COPY . /tmp/
COPY ./mongod.conf /etc/
# Set the working directory
WORKDIR /data/db

# Expose the default MongoDB port
EXPOSE 27017

# Start the MongoDB server
#CMD mongod -f /etc/mongod.conf
CMD mongod -f /etc/mongod.conf
