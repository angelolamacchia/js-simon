/*Un alert espone 5 numeri casuali diversi.
Dopo 30 secondi l’utente deve inserire, un prompt alla volta,
 i numeri che ha visto precedentemente.
Una volta inseriti i 5 numeri, il software dice quanti 
e quali numeri sono stati ricordati.*/
$(document).ready(function(){

    //numero di numeri da indovinare
    const guessNumbers = 5;
    var arrayRandomNumbers = [];
    var arrayUtNumbers = [];

    //genero i numeri casuali e popolo l'array
    while (arrayRandomNumbers.length < guessNumbers) {
        var randomNumber = getRandomNumber(1,100);

        if (isInArray(randomNumber, arrayRandomNumbers)==false) {
            arrayRandomNumbers.push(randomNumber);
        }
    }

    // console.log(arrayRandomNumbers);
    
    //faccio vedere all'utente i numeri 
    $("#elencoNumeri").html("Cerca di ricordare i seguenti numeri: " + arrayRandomNumbers);
    //i numeri scompariranno dopo 30 secondi
    setTimeout(function(){
      $("#elencoNumeri").slideUp();
    }, 30000);

    //conto alla rovescia
    var seconds = 30;
    var interval;

    interval = setInterval(function(){
        //scrivo il conto alla rovescia ogni secondo
        document.getElementById("contatore").innerHTML = seconds;
        //arrivato a 0 inizio con le domande
        if (seconds == 0) {
            //controllo i valori inseriti dall'utente
            while (arrayUtNumbers.length < guessNumbers) {
                do {
                    var utNumber = parseInt(prompt("Inserire numero"));
                    if ((isNaN(utNumber)) || (utNumber < 1) || (utNumber > 100)) {
                        alert("Inserire valore valido");
                    } else if (isInArray(utNumber, arrayUtNumbers)==true) {
                        alert("Valore già inserito");
                    } else {
                        arrayUtNumbers.push(utNumber);
                    }
                } while ((isNaN(utNumber)) || (utNumber < 1) || (utNumber > 100))
            }

            //mostro il punteggio
            $("#indovinati, #punteggio").removeClass("hide");
            //nascondo il contatore
            $(".cont_container").addClass("hide");

            //confronto i valori degli array
            var strike = compareArray(arrayRandomNumbers, arrayUtNumbers);
            //mostro i numeri indovinati
            document.getElementById("indovinati").innerHTML = "Hai indovinato i seguenti numeri: " + strike;
            //mostro il numero di numeri indovinati
            document.getElementById("punteggio").innerHTML = "Ti sei ricordato solo "+ strike.length +" numeri";

            clearInterval(interval);
        } else {
            seconds--;
        }
    }, 1000);

    // console.log(arrayUtNumbers);


});

//funzione numero random
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// funzione 1 numero è nell'array
function isInArray(n,array) {
    for (var i=0; i<array.length; i++) {
        if (n == array[i]) {
            return true
        } 
    }
    return false
}
//funzione per confrontare i numeri in 2 array
function compareArray (array1, array2) {
    var matches = [];
    for (var i=0; i<array1.length; i++) {
        for (var e=0; e<array2.length; e++) {
            if (array1[i]==array2[e]) {
                matches.push(array1[i]);
            }
        }    
    }
    return matches;
}