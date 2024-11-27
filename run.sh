#docker build -t ther12k/prodidikti . 
docker stop prodidikti
docker rm prodidikti
docker run -d -p 7007:80 --name prodidikti ther12k/prodidikti

