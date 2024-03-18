FROM mongo:jammy

# Create the data directory
RUN mkdir -p /data/db

# Set the working directory
WORKDIR /data/db

# Expose the default MongoDB port
EXPOSE 27017

# Start the MongoDB server
CMD ["mongod"]
