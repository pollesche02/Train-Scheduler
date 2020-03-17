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



var timer;
setInterval(update,1000)

function update(){
    $("#currenttime").text(moment().format("HH:mm:ss"))
var imgurl="('/assets/images/1940\ interior.jpg')"
    $("body").css("background-image",  "url(" + imgurl + ")");
// update the next train and minutes away 
}
