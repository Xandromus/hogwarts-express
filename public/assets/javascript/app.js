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
    $("#submit").on('click', function () {

        var monthFormat = "MM/DD/YYYY";

        // Assigns user input to variables
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrainTime = $("#firstTrainTime").val().trim();
        frequency = $("#frequency").val();
        $(nextArrival).val("1");
        $(minutesAway).val("1");
        // use train example for this code
        //var convertedDate = moment(firstTrainTime, monthFormat);
        //time = (moment(convertedDate).diff(moment(), "months") * -1);
        //nextArrival = (now - firstTrainTime) % frequency
        //minutesAway = nextArrival - now;

        emptyInput();

       
        // Code for handling the push
      database.ref().push({
        name: trainName,
        destination: destination,
        first: firstTrainTime,
        frequency: frequency,
        //next: nextArrival,
        //minutes: minutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    database.ref()
        .orderByChild("dateAdded")
        .limitToLast(1)
        .on("child_added", function(snapshot) {
          // storing the snapshot.val() in a variable for convenience
          var sv = snapshot.val();


          // Change the HTML to reflect
          var nameCell = $("<td>").text(sv.name);
        var destCell = $("<td>").text(sv.destination);
        var frequencyCell = $("<td>").text(sv.frequency);
        var nextCell = $("<td>").text(sv.nextArrival);
        var minutesCell = $("<td>").text(sv.minutesAway);
        var newRow = $("<tr>").append(nameCell, destCell, frequencyCell, nextCell, minutesCell);
        $("#trains").append(newRow);

          // Handle the errors
        }, function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        });
})();