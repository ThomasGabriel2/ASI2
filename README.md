# ASI2 : Atelier 2 : 

Noms : CHOURAQUI Maxime / CLEMENT Charles / GABRIEL Thomas / LUPPI Daniel

Eléments réalisés : 
- Front REACT : Thomas & Daniel
  - Réalisation d'une page d'acceuil, gestion de l'authentification, gestion du store (affichage des cartes à vendre avec possibilé de les acheter ou de mettre en vente ses cartes), gestion des appels au back end.
  - Création d'une page de jeu avec d'un côté le chat et de l'autre le jeu. Cette page communique avec le back-end NodeJs avec une WebSocket.
- Back end Springboot : Maxime & Charles
  - Création de classes émettrice et réceptrice pour gérer la communication avec un ESB activeMQ dans le cas d'ajout, modification ou suppression d'utilisateurs.
- Back end NodeJS : Maxime & Charles
  - Réalisation du chat entre deux utilisateurs, connection des utilisateurs, possibilité d'envoyer des invitations pour jouer, lancement de la partie avec affichage.

Lien GIT : https://github.com/ThomasGabriel2/ASI2

Lien shcéma d'architecture : https://excalidraw.com/#room=56b64bcf9fd3e4860c7f,9plkOl3K9wOPewGXilH5qQ

Explication de la vidéo :
Nous commençons par lancer le backend springboot puis nous crééons deux utilisateurs via l'interface React. Ensuite, nous lançons le back end nodeJS et nous simulons le comportement de deux utilisateurs.
Pendant la partie, les labels "cartes cachées" coorespondent aux cartes de l'adversaire (dont le nom est écrit juste en dessous) et les labels "[object Object]" sont nos cartes. L'algorithme de la partie désigne simplement un gagnant aléatoirement.

Eléments à améliorer :
-  Back end Springboot :
  - Exploser le monolithe en micro services.
  - Utilisez des ESBs pour d'autres fonctionnalités chronophage.
- Back end NodeJS :
  - Sécurisation des données (users, cards, ...)
  - Gestion de la connection du même user sur plusieurs sockets.
  - Possibilité de répondre à un message sans avoir à cliquer sur le nom de la personne.
  - Refaire (juste faire) tout l'algorithme du jeu de la partie.
- Front-End :
  - Éclater le composant Game en plus de composants et passer la socket en variable global avec Redux
  - Gérer le déroulement de la partie
  - Griser les boutons du magasin et de l'inventaire après avoir cliqué dessus pour ne pas cliqué plusieurs fois sur les mêmes cartes
  - Ajouter une page profil à l'utilisateur

# Comment utiliser ?

- Lancer ActiveMQ
- Lancer Nginx
- Lancer le Backend en démarrant CardMngMonolithicApplication du dossier asi2-backendmarket-monolithic-student-master
- Lancer React (npm run dev) dans le dossier my-app
- Enregistrer ses utilisateurs
- Lancer le Backend Node en démarrant le fichier server.js dans le dossier tp



# Utils

### Commandes docker : 
- activemq : sudo docker run -it -p 61616:61616 -p 61613:61613 -p 8161:8161 -e ACTIVEMQ_DISALLOW_WEBCONSOLE=false -e ACTIVEMQ_USERNAME=myuser -e ACTIVEMQ_PASSWORD=mypwd -e ACTIVEMQ_WEBADMIN_USERNAME=myuserweb -e ACTIVEMQ_WEBADMIN_PASSWORD=mypwd symptoma/activemq:latest

- nginx : sudo docker run --rm --name my-custom-asi-nginx-container --network host -v /home/thomas/Documents/ASI2/projet/ASI2/nginx.conf:/etc/nginx/nginx.conf:ro nginx

### Squelette carte : 
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
