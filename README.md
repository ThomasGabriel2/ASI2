# ASI2 : Atelier 1 : 

Noms : CHOURAQUI Maxime / CLEMENT Charles / GABRIEL Thomas / LUPPI Daniel

Eléments réalisés : 
- Front REACT : Thomas & Daniel
  - Réalisation d'une page d'acceuil, gestion de l'authentification, gestion du store (affichage des cartes à vendre avec possibilé de les acheter ou de mettre en vente ses cartes), gestion des appels au back end.
- Back end Springboot : Maxime & Charles
  - Création de classes émettrice et réceptrice pour gérer la communication avec un ESB activeMQ dans le cas d'ajout, modification ou suppression d'utilisateurs.

Lien GIT : https://github.com/ThomasGabriel2/ASI2

Lien shcéma d'architecture : https://excalidraw.com/#room=56b64bcf9fd3e4860c7f,9plkOl3K9wOPewGXilH5qQ



commandes docker : 
- activemq : sudo docker run -it -p 61616:61616 -p 61613:61613 -p 8161:8161 -e ACTIVEMQ_DISALLOW_WEBCONSOLE=false -e ACTIVEMQ_USERNAME=myuser -e ACTIVEMQ_PASSWORD=mypwd -e ACTIVEMQ_WEBADMIN_USERNAME=myuserweb -e ACTIVEMQ_WEBADMIN_PASSWORD=mypwd symptoma/activemq:latest

- nginx : sudo docker run --rm --name my-custom-asi-nginx-container --network host -v /home/thomas/Documents/ASI2/projet/ASI2/nginx.conf:/etc/nginx/nginx.conf:ro nginx

squelette carte : 
{
        "id": 12,
        "name": "name2",
        "description": "description2",
        "family": "family2",
        "affinity": "affinity2",
        "imgUrl": "http://medias.3dvf.com/news/sitegrab/gits2045.jpg",
        "smallImgUrl": "https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg",
        "energy": 100,
        "hp": 81.19427,
        "defence": 69.24205,
        "attack": 3.1732023,
        "price": 111,
        "userId": null,
        "storeId": null
    }
