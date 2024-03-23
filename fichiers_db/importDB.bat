@echo off
docker cp ../fichiers_db/ mongodb_1:/tmp/
rem docker exec -it mongodb_1 sh -c "chmod +x /tmp/fichiers_db/mongoimport.sh && /tmp/fichiers_db/mongoimport.sh"
docker exec -it mongodb_1 sh -c "cd /tmp/fichiers_db/ && tr -d '\r' < mongoimport.sh > mongoimport.sh.tmp && mv mongoimport.sh.tmp mongoimport.sh && bash ./mongoimport.sh"