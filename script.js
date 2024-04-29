// Déclaration des tableaux contenant les listes des mots proposés à l'utilisateur
const listeMots = ["Cachalot","Pétunia","Serviette"]
const listePhrases = ["Pas de panique !","La vie, l'univers et le reste !","Merci pour le poisson"]

let score = 0

// Déclaration de la variable contenant le choix de l'utilisateur
let choix = prompt("Avec quelle liste désirez-vous jouer : 'Mots' ou 'Phrases' ?")
//Tant que l'utilisateur n'a pas saisi "Mots" ou "Phrases", on lui redemande de saisir un choix
while (choix != "Mots" && choix != "Phrases") {
    console.log("Saisie incorrecte")
    choix = prompt("Avec quelle liste désirez-vous jouer : 'Mots' ou 'Phrases' ?")
}

if (choix === "Mots") {
    // On parcourt le tableau des mots
    for (i=0; i < 3; i++) {
        // On demande à l'utilisateur de saisir le mot correspondant à l'indice i
        let motUtilisateur = prompt("Entrez le mot suivant : " + listeMots[i])
        if (motUtilisateur === listeMots[i]) {
            // Si le mot saisi par l'utilisateur est correct, on incrémente le score
            score++
        }
    }
} else {
    for (i=0; i < 3; i++) {
        let phraseUtilisateur = prompt("Entrez le mot suivant : " + listePhrases[i])
        if (phraseUtilisateur === listePhrases[i]) {
            score++
        }
    }
}

console.log("Votre score est de " + score + " sur 3")
