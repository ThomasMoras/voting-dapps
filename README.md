# Voting DApps

## Description

3rd Alyra project, voting DApps with simple UI and CI/CD pipeline.

### Frontend

- Next.js
- Shadcn/ui
- Tailwind css

### Backend

- Hardhat
- Wagmi
- Vim

### CR 

#### Vulnérabilités détectées 

##### DOS
- Possibilité de DoS sur le tableau proposal
Un utilisateur (de type voter) peut proposer un nombre illimité de propositions dans le tableau dynamique proposals
Ainsi, s'il est admis en tant que voter, l'utilisateur peut rendre la fonction "tallyVotes" (qui boucle sur le tableau proposals) inutilisable.
- Pas de limite de caractères sur la description de la proposition. Ainsi un attaquant étant voter peut proposer X propostions avec de longues descriptions ce qui augmentera le stockage en mémoire du contrat à son utilisation et augmenter le coût de la fonction "tallyVotes"
  
Solutions : 
- Limiter le nombre de propositions soumis par un utilisateur (à 3 par exemple) : Fix dans le code
- Limiter le nombre de propositions maximal, s'il y a beaucoup de voter, il faudra nécessairement limiter le nombre de propositions : Fix dans le code
- Modifier la gestion des propositions du contrat : Non Fix dans le code, car nécessite une refactorisation complète du contrat

##### Cohérence

- Problème de cohérence en cas d'égalité, la première proposition qui a la plus de vote gagne

##### Non critiques

- Pas de check sur l'address 0 lors de l'ajout d'un voter