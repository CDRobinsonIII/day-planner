/*jshint esversion: 6 */ 

// Use the moment object along with the format method to display the current day on the index.html page.
$("#currentDay").text(moment().format("dddd, MMMM Do"));


// Create a function to retreive any stored tasks from the local storage. 
// The function is called one at a time for each time block via the createTimeBlocks function.
function retrieveStoredTask (timeBlockTask) {

    // Declare var to local storage item.
    var timeBlockTaskId = `task${timeBlockTask}`;
    var timeBlockData = localStorage.getItem(timeBlockTaskId);

    // See if there is data in the local storage for the timeBlockTask.
    // If there is data, then display it in the text area for that time block.
    if (timeBlockData) {

        // Grab the task id (with a template literal) which is attached to the <textarea>.
        // After grabbing the task id set the value .text() to the task in the local storage.
        $(`#${timeBlockTaskId}`).text(timeBlockData);
    }  
    else {
        $(`#${timeBlockTaskId}`).text("");
    }
}

// Create function to display 9 different time block on the day planner. This will be done by mainpulating the DOM of the index.html page. 
function createTimeBlocks () {

    // Create a for Loop to run through the 9 different time blocks for the day planner. 
    for (var i = 0; i <9; i++) {

        // Create a row (aka time block) to contain the three columns of data for the time block. There will be 9 different time block rows. 
        // Each row needs to have an id stating the row that they are, based off of the iterator i starting at 0 for (9am).
        var timeBlockRow = $('<div>').addClass('row time-block');
        var row = $(timeBlockRow); 
        
        // Create the 3 different columns that will be in each row. 
        // One column for the time for the time block, one column for the text area containing the task, and another column for the save button. 

        // The first column is the time column.
        // The data-time attribute is created using the moment.js time method and hour AMPM format (hA). 
        // This attribute will be used to create the time to be display in the time block column.
        var columnTimeBlock = $('<div>').addClass('col-md-1 p-0 hour').text(moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));
        columnTimeBlock.attr('data-time', moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));

        // The second column is the text area to hold the task for that hour.
        // The task id created will be use to display the task text from local storage.

        var columnTaskBlock = $('<textarea>').addClass('col-md-10 description p-0').attr('id', `task${i}`);

        // The third column is the save button to save the task to local storage. 
        var columnSaveBlock = $('<button>').addClass('saveBtn col-md-1 p-0').html('<i class = "fas fa-save"></i>');

        // Append the three columns to the row in the correct order. 
        row.append(columnTimeBlock);
        row.append(columnTaskBlock);
        row.append(columnSaveBlock);

        // Append the row to the container 
        $('.container').append(row);

        // Call the retrieveStoredTask function to see if there is a task in local storage for the current time block.
        retrieveStoredTask (i);
        
    }

}

// Call createTimeBlocks function to generate the time block dynamically on the index.html page.
createTimeBlocks ();

// Function to change time block text area color based on current hour. If present = red (class present); past = gray (class past); future = green (class future).
function updateTimeBlockColors () {

    // Use the moment object to get() the current hour we are in.
    var currentDayTime = moment();
    var currentDayHour = currentDayTime.get("hour");	
    
    // Create a for loop to cycle through all 9 time slots in the time block. Compare time slot time to current time and change color accordingly. 
    for (var i = 0; i < 9; i++) {

        // Add 9 to the interator to get the actual time of the time slot. 
        if ((i+9)===currentDayHour) {
            $(`#task${i}`).addClass('present');
        }
        else if ((i+9)>currentDayHour) {
            $(`#task${i}`).addClass('future');
        }
        else {
            $(`#task${i}`).addClass('past');
        }
    }

}

// Call function to update the colors of the time blocks based on past, present, current.
updateTimeBlockColors ();

// Function to store the task in the local storage. This function is called once the save button is clicked.
function storeTask () {

    // Get the task from the text area that was just entered.
    var taskText = $(this).siblings(".description").val();
        
    // Get the id of the text area where the task was just typed.
    var taskId = $(this).siblings("textarea").attr('id');
    
    // Store the typed in task in local storage. 
    localStorage.setItem(taskId, taskText);
}

// Function to clear all of the tasks from the day planner for the day.
function clearTasks () {
    
    // Confirm that the user wants to clear the tasks. 
    var confirmClear = confirm("Are you sure you want to clear all of the tasks for the day?");
    if (confirmClear) {
        localStorage.clear();
        // After the local storage is cleared, I had to clear the time blocks of the task for using this for loop and setting text to "".
        for (var i = 0; i < 9; i++) {
            $(`#task${i}`).text("");
        }
    }
    else {
        return;
    }   
}

// Create an addEventListener for when user clicks on the save button for the tasks.
$(".saveBtn").on("click",storeTask);

// Create an addEventistener for when the user clicks on the clear all task button.
$("#clear-tasks").on("click",clearTasks);

// Added the document ready function because my clear all tasks button was briefly showing before the time blocks were generated. 
// This fixed the issue.
$(function() {
    $("#clear-tasks").css("display", "block");
});
