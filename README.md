# Test-Technique-TROOV-RDV

## Démarrer
Il faut cloner le projet avec `git clone git@github.com:anselme-ali19/Test-Technique-TROOV.git` en ssh\
ou en https avec `git clone https://github.com/anselme-ali19/Test-Technique-TROOV.git`.
Ensuite se rendre dans le repertoire `Test-Technique-TROOV`\.

## Lancer l'application
L'application a été déployée dans un conteneur docker qu'il faudra lancer.

On commence par démarrer le service docker.\
Ensuite dans le repertoire `Test-Technique-TROOV`, on lance `docker compose up`\
pour démarrer les services de  l'application (service front-end + service back-end + la database mongoDB).



## Visualiser l'application
Une fois les étapes précedentes ont été réalisées, l'application sera visible grâce au lien \
(http://localhost:3000).

Les liens pour l'api du serveur sont (http://localhost:4000/api/products) et (http://localhost:4000/api/users).

Pour visualiser la database mongodb, vous pourrez vous connecter directement \
avec l'URI `mongodb://admin:admin123@localhost:27017/` ou en ligne de commande \
en spécifiant le userName `admin` et le password `admin123`.\
Une fois connecté, dans la database `test`, il y a une collection `products` qui stockent les produits et `users` qui stockent les utilisateurs.

## Stoper l'application
Pour arrêter les services de l 'application, on lancera la commande `docker compose down`
