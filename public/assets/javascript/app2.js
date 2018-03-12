(function() {

    var trainName;
    var destination;
    var firstTrainTime;
    var frequency;
    var nextArrival;
    var minutesAway;
    var key;

    var database = firebase.database();

    // Empties the user input areas
    function emptyInput() {
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrainTime").val("");
        $("#frequency").val("");
    }

    // Adds click functionality to submit button
    $("#add-train-form").on("submit", function(e) {

        e.preventDefault();

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
        nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");
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

        key = database.ref("trains/").push().key;
        console.log(key);

        database.ref("trains/").push(newTrain);

        emptyInput();
    });


    database.ref("trains/")
        .orderByChild("dateAdded")
        .on("child_added", function(snapshot) {
            // storing the snapshot.val() in a variable for convenience
            console.log(key);
            var sv = snapshot.val();


            // Change the HTML to reflect
            var nameCell = $("<td>").text(sv.name);
            var destCell = $("<td>").text(sv.destination);
            var frequencyCell = $("<td>").text(sv.frequency);
            var nextCell = $("<td>").text(sv.next);
            var minutesCell = $("<td>").text(sv.minutes);
            var remove = $("<td><input type='submit' value='remove train' class='remove btn btn-primary btn-sm'></td>");
            var newRow = $("<tr>").append(nameCell, destCell, frequencyCell, nextCell, minutesCell, remove).attr("data-id", key);
            $("#trains").append(newRow);

            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

    $("body").on("click", ".remove", function() {
        $(this).closest("tr").remove();
        var id = $(this).closest("tr").data("id");
        console.log(id);
        console.log(database.ref("trains/" + id));
        database.ref("trains/" + id).remove();
    });
})();