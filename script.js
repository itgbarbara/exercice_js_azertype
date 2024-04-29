let score = 0

let choix = prompt("Avec quelle liste désirez-vous jouer : 'Mots' ou 'Phrases' ?")
while (choix != "Mots" && choix != "Phrases") {
    console.log("Saisie incorrecte")
    choix = prompt("Avec quelle liste désirez-vous jouer : 'Mots' ou 'Phrases' ?")
}

if (choix === "Mots") {
    for (i=0; i < listeMots.length; i++) {
        let motUtilisateur = prompt("Entrez le mot suivant : " + listeMots[i])
        if (motUtilisateur === listeMots[i]) {
            score++
        }
    }
    console.log("Votre score est de " + score + " sur " + listeMots.length")
} else {
    for (i=0; i < listePhrases.length; i++) {
        let phraseUtilisateur = prompt("Entrez la phrase suivante : " + listePhrases[i])
        if (phraseUtilisateur === listePhrases[i]) {
            score++
        }
    }
    console.log("Votre score est de " + score + " sur " + listePhrases.length)
}

