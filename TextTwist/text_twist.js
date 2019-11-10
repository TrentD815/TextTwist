var i = 0;
var clickHandler = function(eventObject){
  //console.log(eventObject);
  
  
  //Add words to guessed lists after entering
  if (flag == true){ 
  var guess = document.getElementById('entered_word').value;
  
  var li = guess + "\n";
  document.getElementById("guessed_words").appendChild(document.createTextNode(li));
  
  document.querySelector("#num_guesses").innerText = ++i; //Test button
  //console.log(document.querySelector("#num_guesses").innerText);
  
  
  
  document.querySelector("#entered_word").value = ""; //Clear text box after typing a word
  document.getElementById('entered_word').focus();  //Highlight text box after each entry for ease of entering words
  }
}
document.querySelector("#submit_word").addEventListener("click",clickHandler);

var active ='';   //Active rack to be replaced if shuffled
var flag = false //Not allowed to enter a word until a rack is displayed

//Get and display a new rack from the database
  var display_results = function(result){
  racks.innerHTML = '';
  flag = true;
  
  
  for(var i = 0; i < result.length; i++){
    racks.innerHTML += `${result[i].rack}`;
    active = racks.innerHTML;
  }
  
  };
  
  var genericGetRequest = function(URL, callback){
  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
    if (this.status == 200){
      callback(JSON.parse(this.response));
    }
  };
  xhr.open("GET", URL);
  xhr.send();
};

document.getElementById("new_rack").addEventListener('click', function(){
  genericGetRequest("word.php", display_results);
  
  document.getElementById("guessed_words").innerHTML= ""; //Clear guesses if new rack

});

document.getElementById("shuffle").addEventListener('click', function(){
   var shuffled = shuffleWord(active);  //replace active rack with shuffled
  //console.log(active);
  //console.log(shuffled);
  document.getElementById("racks").innerHTML= shuffled;
});

//Shuffle rack
function shuffleWord (word){
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
    }
    return shuffledWord;
}

var win = function(aninput){
  alert("Congratulations you won!");
}

if (document.querySelector("#num_guesses").innerText == "0") { //If Words Left goes to 0 then give victory alert
  win("done");
}