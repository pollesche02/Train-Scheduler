$(document).ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyAww0orIpP_BROUSeExkolNKUNX-9IRxts",
        authDomain: "train-schedules-a2ae5.firebaseapp.com",
        databaseURL: "https://train-schedules-a2ae5.firebaseio.com",
        projectId: "train-schedules-a2ae5",
    storageBucket: "train-schedules-a2ae5.appspot.com",
    messagingSenderId: "471486888690",
    appId: "1:471486888690:web:df520d8f46f9e3b0a3ae6b"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();


$("#currenttime").text(moment().format("HH:mm:ss"))

$('#addTrainBtn').on("click", function() {
      event.preventDefault()
      console.log("submit")
      // here the new train information needs to go 
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrainTime = $("#timeInput").val().trim();
      var frequency = $("#FrequencyInput").val().trim();
      
      var newTrain = {
          name: trainName,
          place: destination,
          firsttrain: firstTrainTime,
          frequency: frequency,
        }
      //put all train information into the form
      database.ref().push(newTrain);
      console.log(newTrain.name)
      
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#timeInput").val("");
      $("#frequencyInput").val("");
      
      //this will stope the screen from moving to the next pg.
      // return false;
    });
  // I want to add a "child" so that the user can add a new train into the database
  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().firsttrain;
  var frequency = childSnapshot.val().frequency;
  
  // now i have to push back the first train so that i will come back before current time
  var firsttimeConverted = moment(firstTrain, "HH:mm");
  
  var currentTime = moment().format("HH:mm");
  var timeDiff = moment().diff(moment(firsttimeConverted), "minutes");
  var timeRemainder = timeDiff % frequency;
  var minToTrain = frequency - timeRemainder;
  
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  
  console.log(trainName,destination,nxTrain,frequency,minToTrain)
  
  // $("#trainTable>tbody").append("<tr class='trainrow' ><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>"
  //  + frequency + "</td><td>" + minToTrain + "</td></tr>");
  
  $("#trainTable>tbody").append(`<tr class='trainrow' dataFirst=${firstTrain} dataFre=${frequency}><td>${trainName}</td><td>${destination}</td><td>${nxTrain}</td><td>${frequency}</td><td>${minToTrain}</td></tr>`);
});

var imgArray=["1920 interior.jpg", "1940 interior.jpg" , "1960 interior.jpg", "1980 interior.jpg", "2000 interior.jpg",
"2010 interior.jpg", "2020 interior.jpg" , "1920.jpg" , "1940.jpg" , "1950.jpg" , "1960.jpg" , "1970.jpg" , "1990.jpg" , "2005.jpg" , 
"2020.jpg"]
var index=0
var timer;
setInterval(update,8000)

function update(){
    console.log("were getting to this point")
    $("#currenttime").text(moment().format("HH:mm:ss"))
    // var imgurl='/assets/Images/1940 interior.jpg' 
    index++   
    if (index > imgArray.length) index = 0
    var imgurl='/assets/Images/' + imgArray [index]    // imgArray[index]  /// increment index // verify if is > than lengt and the restat to 0
    console.log(imgurl)
    $("body").css("background-image",  "url('" + imgurl + "')");
    // update the next train and minutes away 
}

});