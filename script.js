function choisirPhrasesOuMots () {
    let choix = prompt("Avec quelle liste désirez-vous jouer : 'Mots' ou 'Phrases' ?")
    while (choix != "Mots" && choix != "Phrases") {
        console.log("Saisie incorrecte")
        choix = prompt("Avec quelle liste désirez-vous jouer : 'Mots' ou 'Phrases' ?")
    }
    return choix
}

function lancerBoucleDeJeu (listePropositions) {
        let score = 0
        for (i=0; i < listePropositions.length; i++) {
            let motUtilisateur = prompt("Entrez le mot suivant : " + listePropositions[i])
            if (motUtilisateur === listePropositions[i]) {
                score++
            }
        }
    return score
}

function afficherResultat (score, nbPropositions) {
    console.log("Votre résultat est de " + score + " sur " + nbPropositions)
}

function lancerJeu () {
    let choix = choisirPhrasesOuMots ()

    let score = 0
    let nbPropositions = 0

    if (choix === "Mots") {
        score = lancerBoucleDeJeu(listeMots)
        nbPropositions = ListeMots.length
    } else {
        score = lancerBoucleDeJeu(ListePhrases)
        nbPropositions = ListePhrases.length
    }

    afficherResultat (score, nbPropositions)
}

lancerJeu()