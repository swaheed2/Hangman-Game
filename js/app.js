'use strict';

var words = [

    "pakstan", //8
    "nda",  //5
    "amerca",  // 7
    "australia",  //9
    "ethiopi",
    "newyork",
    "newjersey"

];

var randomWord = getRandomInt(0, words.length-1).toString();
var messageBox = $("#message");

var choosenWord = words[randomWord];
var linesLeft = words[randomWord].length;
var indexes = [];
indexes.length= choosenWord.length;
var counter = 0;
console.log(randomWord);
var turns = 7;

// ----------




//-----------


document.addEventListener("keypress",getKeyboardInput, false);

printLines(words[randomWord]);

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

for(var i=0; i<choosenWord.length;i++)
{
    indexes[i]=false;
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
            if(words[randomWord].charAt(i) == buttonValue)
            {    
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
            messageBox.html("<img class='img-responsive' style='height: 220px; width: 100% !importanat;' src='img/turnsLeft" +(turns) + ".png'> </img>");

            if(turns == 0){

              buttonsDisable();
                /*  var allbuttons = $("#allbuttons").children("button");
            console.log(allbuttons);
            for( i=0; i< allbuttons.length; i++ )
            {
                childDivs[i].attr
            }
            allbuttons.each(function(){
                console.log("disabled"); 
                $(this).attr("disabled","disabled");

            })*/
                //showFireworks();

            }
            console.log("FIREEeeee");

        }
        else{
            if (win()){
                console.log('i am the winner');
                showFireworks();
                var x = $('#winMessage');
                //var z= $('#winMessage').addClass('alert alert-success');
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
    var allbuttons = document.getElementById('allbuttons').getElementsByTagName('button');
    for( i=0; i< allbuttons.length; i++ )
    {   
        var child = allbuttons[i];
        console.log(child.innerHTML);
        child.setAttribute("disabled","disabled");

    }
}