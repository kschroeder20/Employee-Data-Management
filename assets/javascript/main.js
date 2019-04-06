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
  
  database.ref("/bidderData").on("value", function (snapshot) {
  
        // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("employeeName").exists() ||
      snapshot.child("role").exists() ||
      snapshot.child("startDate").exists() ||
      snapshot.child("role").exists() {
  
          // Set the local variables for highBidder equal to the stored values in firebase.
          highBidder = snapshot.val().highBidder;
          highPrice = parseInt(snapshot.val().highPrice);
  
          // change the HTML to reflect the newly updated local values (most recent information from firebase)
          $("#highest-bidder").text(snapshot.val().highBidder);
          $("#highest-price").text("$" + snapshot.val().highPrice);
  
          // Print the local data to the console.
          console.log(snapshot.val().highBidder);
          console.log(snapshot.val().highPrice);
        }
  
  // Form onlcick function
  $("#saveButton").on("click", function () {
    //prevent default behavior
    event.preventDefault();
  
    // Get user input from form and store in variables
    employeeName = $("#employeeName").val().trim();
    role = $("#role").val().trim();
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
  
    database.ref().on("child_added", function (snapshot) {
        // full list of items to the well
        var newRow = $("<tr>").append(
          $("<td>").text(snapshot.val().employeeName),
          $("<td>").text(snapshot.val().role),
          $("<td>").text(snapshot.val().startDate),
          $("<td>").text(snapshot.val().monthsWorked),
          $("<td>").text(snapshot.val().monthlyRate),
          $("<td>").text(snapshot.val().totalBilled));
        $("#current-employees > tbody").append(newRow);
        console.log(newRow);
      },
      function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
    
    
  
  });
  
  // Function to clear submission fields
  function clearInputFields() {
    $("#employeeName").val("");
    $("#role").val("");
    $("#startDate").val("");
    $("#monthlyRate").val("");
  
  };
  
  // database.ref().on("value", function (snapshot) {
  
  //   // Store into variables.
  //   employeeName = snapshot.val().employeeName;
  //   role = snapshot.val().role;
  //   startdate = snapshot.val().startDate;
  //   monthlyRate = snapshot.val().monthlyRate;
  
  
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
  
    // // Creating new row
    // var newRow = $("<tr>").append(
    //   $("<td>").text(employeeName),
    //   $("<td>").text(role),
    //   $("<td>").text(startDate),
    //   $("<td>").text(monthsWorked),
    //   $("<td>").text(monthlyRate),
    //   $("<td>").text(totalBilled)
    // );
  
    //Append newRow to the table
  //   $("#current-employees > tbody").append(newRow);
  //   console.log(newRow);
  // });