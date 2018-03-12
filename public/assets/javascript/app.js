(function () {

    var trainName;
    var destination;
    var firstTrainTime;
    var frequency;
    var nextArrival;
    var minutesAway;

    var database = firebase.database();

    // Empties the user input areas
    function emptyInput() {
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrainTime").val("");
        $("#frequency").val("");
    }

    // Adds click functionality to submit button
    $("#submit").on("click", function () {

        // Assigns user input to variables
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrainTime = $("#firstTrainTime").val().trim();
        frequency = $("#frequency").val().trim();    

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + currentTime.format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var remainder = diffTime % frequency;
    console.log(remainder);

    // Minute Until Train
    minutesAway = frequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + nextArrival);

       var newTrain = {
        name: trainName,
        destination: destination,
        first: firstTrainTime,
        frequency: frequency,
        next: nextArrival,
        minutes: minutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      };

    database.ref().push(newTrain);

    emptyInput();
    });


    database.ref()
        .orderByChild("dateAdded")
        .on("child_added", function(snapshot, prevChildKey) {
          // storing the snapshot.val() in a variable for convenience
          var sv = snapshot.val();


          // Change the HTML to reflect
          var nameCell = $("<td>").text(sv.name);
        var destCell = $("<td>").text(sv.destination);
        var frequencyCell = $("<td>").text(sv.frequency);
        var nextCell = $("<td>").text(sv.next);
        var minutesCell = $("<td>").text(sv.minutes);
        var newRow = $("<tr>").append(nameCell, destCell, frequencyCell, nextCell, minutesCell);
        $("#trains").append(newRow);

          // Handle the errors
        }, function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        });
})();