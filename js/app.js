'use strict';



var randomWord;
var randomIndex;
var messageBox = $("#message");

var choosenWord;
var linesLeft ;
var indexes = [];
/*indexes.length= choosenWord.length;*/
var counter = 0; 
var turns = 7;


document.addEventListener("keypress",getKeyboardInput, false);
getFile();



//-----------------------------------
// functions 
//
//-----------------------------------

function getFile(){
  
    var filenames = ["languages.txt","periodic-table.txt","planets.txt","sports-words.txt","universities.txt"]; 
    var category = filenames[getRandomInt(0, filenames.length-1)];
    var file = "http://swaheed2.github.io/Hangman-Game/dictionary/" + category;

    $('#category').append(category.replace(".txt",""));

    console.log("choose file: " + file);
    $.get(file,function(txt){
        var lines = txt.split("\n");
        //console.log("lines: " + JSON.stringify(lines, null, 2));
        randomIndex = getRandomInt(0, lines.length-1)
        choosenWord  = lines[randomIndex].trim();
        linesLeft = lines[randomIndex].length;
        console.log("randomIndex: " + randomIndex);
        console.log("chosenWord: " + choosenWord);
        printLines(choosenWord);
        for(var i=0; i<choosenWord.length;i++)
        {
            indexes[i]=false;
        }

    }); 
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function gameOver(){
    var gameover= document.getElementById("message");
    gameover.innerHTML = gameover.innerText+"Game Over";
}


function printLines(word){
    var lines= document.getElementById("lines");
    console.log(word);
    console.log(word.length);
    for(var i=0; i < word.length; i++){

        lines.innerHTML = lines.innerText+ '___ &nbsp;&nbsp;' ;

    } 

}




$('.btn-primary').click(function(){
    if (!(this).hasAttribute("disabled")){
        $(this).attr("disabled","disabled");
        var found = false;
        var buttonValue = $(this).text().trim().toLowerCase();
        console.log("button clicked: " + buttonValue); 

        //console.log("I am here..!"+turns); 

        for(var i=0; i<choosenWord.length;i++)
        { 
            if(choosenWord.charAt(i).toLowerCase() == buttonValue)
            {    
                console.log(choosenWord==buttonValue);
                indexes[i]=true;
                linesLeft--;
                found=true; 
            }
            else if(choosenWord.charAt(i) == ' ' && buttonValue == 'space'){
                console.log(choosenWord==buttonValue);
                indexes[i]=true;
                linesLeft--;
                found=true; 
            }
        }  

        if (!found)
        {
            turns--;
            console.log("Turns left "+turns);
            messageBox.html("<img class='img-responsive' style='height: 220px; width: 100% !important;' src='img/turnsLeft" +(turns) + ".png'> </img>");

            if(turns == 0){

                buttonsDisable(); 
                var x = $('#winMessage'); 
                $('#winMessage').addClass('callout callout-danger');
                $('#winMessage').addClass('text-center');
                $('#winMessage').html("<h1>You Lost!</h1>");
                $('#word-reveal').append("<span style='text-decoration:underline'>" + choosenWord + "</span>").show(); 
            }
            console.log("found");

        }
        else{
            if (win()){
                console.log('i am the winner');
                showFireworks();
                var x = $('#winMessage'); 
                $('#winMessage').addClass('callout callout-success');
                $('#winMessage').addClass('text-center');
                $('#winMessage').addClass('callout callout-success').html("<h1>You have won</h1>");

                //css("font-size: 300%");
                buttonsDisable();


            }

        }

        console.log("linesLeft: " + linesLeft);


        //console.log(messageBox.html());
        console.log("redraw lines");
        redrawLines(indexes);
        var winner= document.getElementById("message");

    }
});

function getKeyboardInput(event){
    var input = event.which || event.keyCode;
    console.log("input"); 

    var id = 'button' + (String.fromCharCode(input)).toUpperCase();  //buttonA or buttonB ...
    console.log(id);
    var button = document.getElementById(id.toString());
    button.click();

}

function win(){
    console.log(" showfire ");
    var finish=true;
    for(var i=0;i<indexes.length;i++)
    {   console.log(i+" showfire ");
     if(indexes[i]==false)
     {  console.log("not finished yet"+i);
      finish=false;
      break;
     }
    }
    for(var i=0;i<indexes.length;i++){
        console.log("indexes"+i+" "+indexes[i]);
    }



    if(finish==true){
        console.log(i+" showfireworks ");
        showFireworks();
        return true;
    }
    else 
        return false;


}
function redrawLines(indexes)
{
    var linesStr = ""

    for(var i=0; i<choosenWord.length;i++){
        if(indexes[i]==true)
        {
            linesStr += '&nbsp;&nbsp;<span class="linesLetter">' + choosenWord[i].toUpperCase() + '</span>&nbsp;&nbsp;' ;
            console.log("redrawLines if: ")
        }
        else
        {
            linesStr+= '___ &nbsp;&nbsp;';
        }
    }
    //console.log(linesStr);
    //console.log(JSON.stringify());
    var linesDiv = document.getElementById("lines");
    linesDiv.innerHTML = linesStr;

}

function playAgain(){
    location.reload();
}

function buttonsDisable(){
    $('#playAgainBtn').show();
    var allbuttons = document.getElementById('allbuttons').getElementsByTagName('button');
    for(var i=0; i< allbuttons.length; i++ )
    {   
        var child = allbuttons[i];
        console.log(child.innerHTML);
        child.setAttribute("disabled","disabled");

    }
}