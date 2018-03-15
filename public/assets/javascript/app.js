(function() {

    // global variables
    var trainName;
    var destination;
    var firstTrainTime;
    var frequency;
    var nextArrival;
    var minutesAway;
    var key;

    var database = firebase.database();

    // function to empty the user input areas
    function emptyInput() {
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrainTime").val("");
        $("#frequency").val("");
    }

    // Adds click functionality to submit button
    $("#add-train-form").on("submit", function(e) {

        // stop the form submit
        e.preventDefault();

        // assigns user input to variables
        trainName = $("#trainName").val().trim().toLowerCase();
        destination = $("#destination").val().trim().toLowerCase();
        firstTrainTime = $("#firstTrainTime").val().trim();
        frequency = $("#frequency").val().trim();

        // object to hold train information
        var newTrain = {
            name: trainName,
            destination: destination,
            first: firstTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        // push train information into Firebase
        database.ref("trains/").push(newTrain);

        // call function to empty user input areas
        emptyInput();
    });

    // function to add Firebase information to table each time a new train is added
    database.ref("trains/")
        .orderByChild("dateAdded")
        .on("child_added", function(snapshot) {

            // store the snapshot.val() in a variable for convenience
            var sv = snapshot.val();

            // store the snapshot key in a variable
            key = snapshot.key;

            // assign snaphot information to variables
            trainName = snapshot.val().name;
            destination = snapshot.val().destination;
            firstTrainTime = snapshot.val().first;
            frequency = snapshot.val().frequency;

            // first Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

            // Current Time
            var currentTime = moment();

            // calculate ifference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

            // calculate remainder
            var remainder = diffTime % frequency;

            // calculate minutes until train
            minutesAway = frequency - remainder;

            // calculate next train arrival
            nextArrival = moment().add(minutesAway, "minutes").format("h:mm A");

            // update the HTML table to reflect the added child

            // create variables for table cell information
            var nameCell = $("<td class='capitalize'>").text(sv.name);
            var destCell = $("<td class='capitalize'>").text(sv.destination);
            var frequencyCell = $("<td>").text(sv.frequency);
            var nextCell = $("<td>").text(nextArrival);
            var minutesCell = $("<td>").text(minutesAway);

            // create button to remove train from table and database
            var remove = $("<td class='text-center'><button type='submit' class='remove btn btn-primary btn-sm'><i class='fa fa-trash'></i> Remove</button></td>");

            // variable to create table row and append table cells
            var newRow = $("<tr>").append(nameCell, destCell, frequencyCell, nextCell, minutesCell, remove).attr("data-id", key);

            // add row to trains table
            $("#trains").append(newRow);

            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

    // function to remove table row and remove train from Firebase
    $("body").on("click", ".remove", function() {
        $(this).closest("tr").remove();
        var id = $(this).closest("tr").data("id");
        database.ref("trains/").child(id).remove();
    });

})();