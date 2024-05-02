
/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

// /**
//  * Cette fonction demande à l'utilisateur de choisir entre "mots" et "phrases" et retourne le choix de l'utilisateur
//  * @return {string} : le choix de l'utilisateur, ce choix est nécessairement "mots" ou "phrases
//  */
// function choisirPhrasesOuMots() {
//     let choix = prompt("Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?")
//     while (choix != "mots" && choix != "phrases") {
//         console.log("Saisie incorrecte")
//         choix = prompt("Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?")
//     }
//     return choix
// }

// /**
//  * Cette fonction lance la boucle de jeu, c'est à dire qu'elle demande à l'utilisateur de saisir tous les mots
//  * contenus dans le tableau listePropositions. A chaque mot saisi, on incrémente le score de l'utilisateur
//  * 
//  * @param {array[string]} listePropositions 
//  * @return {number} : le score de l'utilisateur
//  */
// function lancerBoucleDeJeu(listePropositions) {
//     let score = 0
//     for (let i = 0; i < listePropositions.length; i++) {
//         let motUtilisateur = prompt("Entrez le mot : " + listePropositions[i])
//         if (motUtilisateur === listePropositions[i]) {
//             score++
//         }
//     }
//     return score
// }

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbPropositions) {
    let spanScore = document.querySelector(".zoneScore span")
    let affichageScore = `${score} / ${nbPropositions}`

    spanScore.innerText = affichageScore
}

function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {

    initAddEventListenerPopup() // on active l'écouteur d'évènement sur la popup

    let score = 0
    let i = 0
    let listeProposition = listeMots
    
    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")

    afficherProposition(listeProposition[i])
    
    // Gestion de l'évènement "click" sur le boutons valider
    btnValiderMot.addEventListener("click", () => {

        if (inputEcriture.value === listeProposition[i]) { // Si la saisie de l'utilisateur = proposition
            score++ // alors on incrémente le score de 1
        }

        i++ // on incrémente i de 1
        afficherResultat(score, i) // on affiche le résultat
        inputEcriture.value = '' // on vide le champ de saisie

        if (listeProposition[i] === undefined) { // si le type de listeProposition est 'undefined'
            afficherProposition("Le jeu est fini") // alors on affiche "Le jeu est fini"
            btnValiderMot.disabled = true // et on désactive le bouton valider
        } else {
            afficherProposition(listeProposition[i]) // sinon on fait une nouvelle proposition
        }
    })

    // Gestion de l'évènement "change" sur les boutons radio
    let listeBtnRadio = document.querySelectorAll('input[name="optionSource"]')
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {

            if (event.target.value === "1") { // Si c'est le premier élément qui a été sélectionné
                listeProposition = listeMots // alors on veut jouer avec la liste de mots
            } else {
                listeProposition = listePhrases // sinon nous voulons jouer avec la liste des phrases
            }
            afficherProposition(listeProposition[i]) // On modifie l'affichage en direct
        })
    }

    afficherResultat(score, i)
}