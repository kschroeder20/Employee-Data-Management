// Initialize Firebase
var config = {
    apiKey: "AIzaSyDS7R6dR-f2mHdtf683BHdC3DNxtMKfsy4",
    authDomain: "employeedatamgmt-eadbb.firebaseapp.com",
    databaseURL: "https://employeedatamgmt-eadbb.firebaseio.com",
    projectId: "employeedatamgmt-eadbb",
    storageBucket: "employeedatamgmt-eadbb.appspot.com",
    messagingSenderId: "307997365380"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // Variables
  var employeeName = "";
  var role = "";
  var startDate = "";
  var monthsWorked = null;
  var monthlyRate = null;
  var totalBilled = null;
  
  
  // Form onlcick function
  $("#saveButton").on("click", function () {
    //prevent default behavior
    event.preventDefault();
  
    // Get user input from form and store in variables
    employeeName = $("#employeeName").val().trim();
    role= $("#role").val().trim();
    startDate = $("#startDate").val().trim();
    monthlyRate = $("#monthlyRate").val();
  
 
  
    // Creates variables to connect to firebase
    var employeeInfo = {
      employeeName: employeeName,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate
    };
  
    // Push employeeInfo to database
    database.ref().push(employeeInfo);
  
    // Clean input fields
    clearInputFields()
  
  });
  
  // Function to clear submission fields
  function clearInputFields() {
    $("#employeeName").val("");
    $("#role").val("");
    $("#startDate").val("");
    $("#monthlyRate").val("");
    
  };
  
  database.ref().on("value", function(snapshot) {
    
  
    // Store into variables.
    employeeName = snapshot.val().employeeName;
    role = snapshot.val().role;
    startdate= snapshot.val().startDate;
    monthlyRate = snapshot.val().monthlyRate;
   
  
    // Employee Info
   
  
    // First Time (pushed back 1 year to make sure it comes before current time)
    // monthsWorkedCalc = moment(firstTrain, "HH:mm").subtract(1, "years");
    // console.log("FIRST CONVERTED TIME: " + firstConvertedTime);
  
    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
    // // Difference between the times
    // var diffTime = moment().diff(moment(firstConvertedTime), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);
  
    // // Time apart
    // var timeApart = diffTime % trainFrequency;
    // console.log("TIME APART: " + timeApart);
  
    // // Minute until time arrival
    // minutesNextTrain = trainFrequency - timeApart;
    // console.log("MINUTES TILL TRAIN: " + minutesNextTrain);
  
    // // Next Train
    // nextTrain = moment().add(minutesNextTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
     // Creating new row
     var newRow = $("<tr>").append(
      $("<td>").text(employeeName),
      $("<td>").text(role),
      $("<td>").text(startDate),
      $("<td>").text(monthsWorked),
      $("<td>").text(monthlyRate),
      $("<td>").text(totalBilled)
       );
  
       //Append newRow to the table
       $("#current-employees > tbody").append(newRow);
       console.log(newRow);
  });