@echo off
docker cp ../fichiers_db/ mongodb_1:/tmp/
docker exec -it mongodb_1 sh -c "chmod +x /tmp/fichiers_db/mongoimport.sh && /tmp/fichiers_db/mongoimport.sh"

