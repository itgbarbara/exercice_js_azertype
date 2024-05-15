
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
    let spanScore = document.querySelector(".zoneScore span") // Récupération de la zone dans laquelle on va écrire le score
    let affichageScore = `${score} / ${nbPropositions}` // Ecriture du texte
    spanScore.innerText = affichageScore // On place le texte à l'intérieur du span. 
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition") // Récupération de la zone dans laquelle va s'afficher la proposition
    zoneProposition.innerText = proposition // On place la proposition à l'intérieur de la zone
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * ici : deux caractères au minimum
 * @param {string} nom 
 * @throws {Error}
 */
function validerNom(nom) {
    if (nom.length < 2) { // On n'a pas utilisé de regExp pour ne pas être trop restrictif
        throw new Error("Le nom est trop court : veuillez saisir au moins 2 caractères") // Lance une exception en cas d'erreur
    }
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail (email) {
    let emailRegEx = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegEx.test(email)) { // Le ! devant veut dire que la proposition est fausse (inverse le test)
        throw new Error("L'adresse email n'est pas valide") // Lance une exception en cas d'erreur
    }
}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs. 
 * @param {string} message 
 */
function afficherMessageErreur(message) { // (5) Si on appelle plusieurs fois cette fonction-là, ça va créer une span à chaque fois.
    
    // const divPopup = document.querySelector(".popup") // (1) On récupère la div popup // (10) Cette partie-là n'a d'intérêt que si la span n'existe pas encore, donc on la déplace

    let spanErreurMessage = document.getElementById("erreurMessage") // (7) On essaye d'abord de récupérer cette span, pour savoir si elle existe et éviter de l'afficher une deuxième fois

    if (spanErreurMessage === null) { // (8) Si cette span n'existe pas déjà, alors on la créé
        const divPopup = document.querySelector(".popup") // (10)
        /* const */ spanErreurMessage = document.createElement("span") // (2) Création de la balise <span> qui contiendra le message d'erreur // (7) On enlève le const
        spanErreurMessage.id = "erreurMessage" // (6) On crée un id pour identifier cette span
        // spanErreurMessage.innerText = message // (3) On met à l'intérieur de la span notre message d'erreur // (9) On enlève cette ligne pour la mettre en-dessous
        divPopup.appendChild(spanErreurMessage) // (4)
    }
    spanErreurMessage.innerText = message // (9) Que la span ait été créée ou récupérée, nous mettons à jour le message
}

/**
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail
 */
function gererFormulaire (scoreEmail) {
    try {
        let champNom = document.getElementById("nom")
        let nomJoueur = champNom.value
        validerNom(nomJoueur) // S'il y a une erreur (nom non conforme), sera géré dans le bloc 'catch' et lancera l'exception associée
    
        let champMail = document.getElementById("email")
        let emailJoueur = champMail.value
        validerEmail(emailJoueur) // S'il y a une erreur (email non conforme), sera géré dans le bloc 'catch' et lancera l'exception associée
    
        afficherMessageErreur("") // Dans le cas où il n'y a pas d'erreur, on met une chaîne vide

        afficherEmail(nomJoueur, emailJoueur, scoreEmail)

    } catch(error) {
        afficherMessageErreur(error.message)
    }
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
                listeProposition = listeMots // alors on veut jouer avec la liste de mots (variable globale)
            } else {
                listeProposition = listePhrases // sinon nous voulons jouer avec la liste des phrases (variable globale)
            }
            afficherProposition(listeProposition[i]) // On modifie l'affichage en direct
        })
    }

    // Gestion de l'évènement submit sur le formulaire de partage
    let form = document.querySelector(".popup form")

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} / ${i}`
        gererFormulaire(scoreEmail)
        })

    afficherResultat(score, i)
}
