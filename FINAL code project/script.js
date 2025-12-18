

// Overall notes - new task ids will be how your taks logic works 
// new task = new id, if no new task (like w edit -> no new id - just updated data) 
// then base generating the task boxes based on ids
// simialr w timeline blocks
//  task and block data -> everything added will go here


// big taks buttons still work weird btu its fine
var tasks = [];
var blocks = [];




// ok so since every new task is based on if the user creates one and 
// can happen multiuple times -> need a function that makes new tasks and 
//that contains ALL the js AND html? for the each task iteself -> this needs to run each time a new 
// task is added -


//moving the vraiables inside the loop becaus ethey werent updating
 //var taskListEl = document.getElementById("task-list");
 // var bigTaskListEl = document.getElementById("big-task-list");


 // want this to apply to big taks too

 // journal stuff
var journalEntries = [];
var nextJournalId = 1;
var currentJournalEntryId = null; // which entry is being edited, null if creating new

//function renderTasks() 
function renderTasks(taskListEl, bigTaskListEl) 
  {var taskListEl = taskListEl || document.getElementById("task-list");
  var bigTaskListEl = bigTaskListEl || document.getElementById("big-task-list");
  


  // keeps duplicating now that im rerendering from scratch each time -> need to clear everuthing
  taskListEl.innerHTML = "";
  bigTaskListEl.innerHTML = "";

  // similar to matlab -> as long as current task is in list, add one 
  // each time we loop -> task by task -> then in loop we create the card for each task 

  
  //for ( currenttask = 0; currenttask < tasks.length; currenttask++) {
  for (let currenttask = 0; currenttask < tasks.length; currenttask++)
    
 { var card = document.createElement("div");
  
  card.className = "task-card";
   card.setAttribute("data-task-id",  tasks[currenttask].id);
 
    
  
   var titleSpan =  document.createElement("span");
  titleSpan.className = "task-title";
  titleSpan.textContent =  tasks[currenttask].name;

    // title + progress -> think i cna append actual progress bar later
   
    var leftHeader = document.createElement("div");
      leftHeader.className = "task-card-header-left";
    leftHeader.appendChild(titleSpan);

      //due +time est

  var rightHeader  = document.createElement("div");
    rightHeader.className =  "task-card-header-right";

  
    var header = document.createElement("div");
    header.className = "task-card-header";
      
    header.appendChild(leftHeader);
    header.appendChild(rightHeader);






  
    var dueSpan = document.createElement("span");
    dueSpan.className = "task-deadline";
  
    // fneed to formatting the date
      if (tasks[currenttask].due) {
      
        var dateParts = tasks[currenttask].due.split("-");

      if (dateParts.length == 3) 
      {var year = dateParts[0]; 
      var monthNum = parseInt (dateParts[1], 10) - 1;
   
      var  day = dateParts[2];
        var months = ["Jan", "Feb","Mar","Apr","May", "Jun", "Jul","Aug","Sep", "Oct","Nov", "Dec"];
      var monthName = months[monthNum];
        
      dueSpan.textContent = "Due " +  monthName +  " " + day+ ", " + year;}
       else {dueSpan.textContent = "Due " + tasks[currenttask].due;}
    }





    var estimateSpan = document.createElement("span");
    estimateSpan.className = "task-estimate";
    if (tasks[currenttask].estimatedTime) 
      {estimateSpan.textContent = "Dur: " + tasks[currenttask].estimatedTime;}

      // add to right head here
    rightHeader.appendChild(dueSpan);
    rightHeader.appendChild(estimateSpan);

   

    // progress label
    var progressLabel = document.createElement("div");
    progressLabel.className = "task-progress-label";
    
    //  speerating sicne its split -> number changes achange and progress/% doesnt, add it in together later
    var left = document.createElement("span");
    left.textContent = "Progress: ";
    
    var right = document.createElement("span");
    right.textContent = tasks[currenttask].progress + "%";
    
    
    progressLabel.appendChild(left);
    progressLabel.appendChild(right);





    // slider row with progress slider  -> also will have the toggle later 
    var sliderRow = document.createElement("div");
    sliderRow.className = "task-slider-row";

    // slider -> use range, save when var for current progress,  
    var slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "100";

      // okay so not actually showing numebr so we'll mark ithere and then show later 
    slider.value = tasks[currenttask].progress;
    
  

    // edit also only working for last created task -> change everythingt o let for that too same as notes
    // this and all savedids
    let savedTaskId = tasks[currenttask].id;
    let savedLabel = right;

    slider.oninput = function(e) 
    { var value = e.target.value;

   // okay so need the current task to update percent now its marked 
   // add var for current task and then show the progrrss
   

  for (var j = 0; j < tasks.length; j++) 

// charts js comparison eneds numbers so fix progress w mking it a number
     {if (tasks[j].id == savedTaskId)
      {tasks[j].progress = parseInt(value, 10);}}


      savedLabel.textContent = value + "%";};
    sliderRow.appendChild(slider);







       // adding toggle button
    var completeBtn = document.createElement("button");
    completeBtn.type = "button";
    completeBtn.className = "task-complete-toggle";
    completeBtn.textContent = tasks[currenttask].completed ? "✓" : "○";

    // need to save task id for the click

    /// same issue as notes -> adding lets here too

    // ok good working now
    let savedTaskIdfortoggle = tasks[currenttask].id;


    completeBtn.onclick = function() 
    { for (let toggletaks = 0; toggletaks < tasks.length; toggletaks ++) {

      if (tasks[toggletaks].id == savedTaskIdfortoggle) 
        {tasks[toggletaks].completed = !tasks[toggletaks].completed;
          
        
          // -> adding when it says completed priogrss bar should update 
          if (tasks[toggletaks].completed) 
           
            {tasks[toggletaks].progress = 100;}
        }}
      renderTasks();
    };
    sliderRow.appendChild(completeBtn);


     //  completed so we can make it look diff in css w the green
    if (tasks[currenttask].completed) {
      card.className = card.className + " completed";
    }




    // notes toggle button
    var notesBtn = document.createElement("button");
    notesBtn.type = "button";
    notesBtn.className = "task-notes-toggle";
    notesBtn.textContent = "Notes ▾";

    var NotesDiv = document.createElement("div");
    NotesDiv.className = "task-notes-body";

    //save user notes  
    //if (task.notes)
    // {NotesDiv.textContent = task.notes;}  
    if (tasks[currenttask].notes)

      {NotesDiv.textContent = tasks[currenttask].notes;} 
    
    else {NotesDiv.textContent = "No notes added yet.";}
    NotesDiv.style.display = "none";

  

    // addign these here and replacing all w savednotes vars to fix the loop/ id issye -

    // did not work -> now using let instead of var here and also at current task at top
   let savedNotesDiv = NotesDiv;
 let savedNotesBtn = notesBtn;

    notesBtn.onclick = function() 
    
    { if (savedNotesDiv.style.display == "none" || savedNotesDiv.style.display == "")
        
        

        //{notesDiv.style.display = "block";
       // notesBtn.textContent = "Notes ▴";} 
        
       // else {notesDiv.style.display = "none";
      //  notesBtn.textContent = "Notes ▾";}
    //};
        

            // shifted to NotesDiv but still not working -
            // clicking any notes btn only wokrs for one created task
            // doesn't correspond to the taks clicked
            
        // so most recent notes is opening in most recent task -> regardless 
        // of which task's notes nutton is clokced -> variable or ID issue in loop 

        // okay so need a new saved var that updates for each taks outside of looop

        


        {savedNotesDiv.style.display = "block";
       savedNotesBtn.textContent = "Notes ▴";} 
        
        else {savedNotesDiv.style.display = "none";
       savedNotesBtn.textContent = "Notes ▾";}
    };


     // adding show done badge near the totle when its done
    if (tasks[currenttask].completed) {
      var donePill = document.createElement("span");
      donePill.className = "task-completed-pill";
      donePill.textContent = "✓ Done";
      titleSpan.appendChild(donePill);
    }

    // edit and delete buttons
    var actions = document.createElement("div");
    actions.className = "task-card-actions";

    var editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.textContent = "Edit";
    let savedTaskId3 = tasks[currenttask].id;
    editBtn.onclick = function() 
    
    {for (var j = 0; j < tasks.length; j++) 
      {if (tasks[j].id == savedTaskId3) 
        {openTaskModalForEdit(tasks[j]);}}};





    var deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    let savedTaskId4 = tasks[currenttask].id;
    deleteBtn.onclick = function() {
      var newTasks = [];
      for (var j = 0; j < tasks.length; j++) {
        if (tasks[j].id != savedTaskId4) {
          newTasks.push(tasks[j]);}}
      
      
          tasks = newTasks;
      renderTasks();
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    // put everything together
    card.appendChild(header);
    card.appendChild(progressLabel);
    card.appendChild(sliderRow);
    card.appendChild(savedNotesBtn);
    card.appendChild(savedNotesDiv);
    card.appendChild(actions);

    // add to main list
    taskListEl.appendChild(card);

    // also add to big task view -
  }

  openTaskBigBtn.onclick = function() {
  renderTasks(
    document.getElementById("big-task-list") 
  );
  taskBigModal.style.display = "flex";
};
}








//------------------------------------------------
// timeline


// drawing the timeline  -> similar to tasks, rerender each time, 
// -> strat is using a grid 


function renderTimeline() {
  var timelineGridEl = document.getElementById("timeline-grid");
  // clear it first
  timelineGridEl.innerHTML = "";

  // add hour labels at the top -> 0 -17 -> 5-10
  for (let currenthour = 0; currenthour < 18; currenthour++) {
    let hour = 5 + currenthour;
    var label = document.createElement("div");
    label.className = "time-label";

// reformat to amke am/pm style
 
    var hourText = "";
    

    if (hour < 12) 

     { hourText = hour + " AM";} 

     else if (hour == 0) 
      
    {hourText = "12 AM";} 

    else if (hour == 12) 

      {hourText = "12 PM"; } 
      
      else
     {hourText = (hour - 12) + " PM"; }
    
      label.textContent = hourText;
   
   // loop htrough i to make the labels go where they need to go 
   // also simialr to matlab logiv  
   
    label.style.gridRowStart = 1;
    label.style.gridColumnStart = currenthour + 1;

    timelineGridEl.appendChild(label);
  }


  //  time blocks

  // okay so use the grid position from before to anchor where
  // the block needs to be+ how big it should be 
  for (let Timelineblock = 0; Timelineblock < blocks.length; Timelineblock++) 
    
    {let block = blocks[Timelineblock];


    // create div for each block
    var blockDiv = document.createElement("div");

    blockDiv.className = "time-block";



    if (block.completed) 

      {blockDiv.className = blockDiv.className + " completed"; }
   
      //blockDiv.setAttribute("data-block-id", block.id); not needed w let 

    
    
    
      // top row with title and edit button
    var topRow = document.createElement("div");
    topRow.className = "time-block-top-row";

    var title = document.createElement("span");
    title.className = "time-block-title";
    title.textContent = block.name || "Time block";

    var editBtn = document.createElement("button");
    editBtn.className = "time-block-edit-btn";
    editBtn.textContent = "Edit";
    var savedBlockId = block.id;

    // fix to issue of edit opwning full blcok details 
    //  clicking it houdl only open edit 
    editBtn.onclick = function(e) 
    { e.stopPropagation();

      openBlockModalForEdit(block)
    };



    topRow.appendChild(title);
    topRow.appendChild(editBtn);
    blockDiv.appendChild(topRow);



    // time range text
    var timeText = document.createElement("div");
    timeText.className = "time-block-footnote";
    if (block.startTimeRaw || block.endTimeRaw) {
      timeText.textContent = (block.startTimeRaw || "") + " – " + (block.endTimeRaw || "");
    }
    blockDiv.appendChild(timeText);

    // complete button

    var completeBtn = document.createElement("button");
    completeBtn.className = "time-block-complete-btn";
    
     if (block.completed)    
        {completeBtn.textContent = "✓";} 

     else 
        {completeBtn.textContent = "○";}





    completeBtn.onclick = function(e) 
    
    {e.stopPropagation();
      block.completed = !block.completed; 
      renderTimeline();
    };
    
    
    blockDiv.appendChild(completeBtn);


    //  hwo to put the block in corrext position 
    // make stringsnumbers for where the block starts and end goe sin 
    // the grid
    blockDiv.style.gridRowStart = "2";
    blockDiv.style.gridColumnStart = (block.startIndex + 1).toString();
    blockDiv.style.gridColumnEnd = (block.endIndex + 1).toString();

    // click to see details
    blockDiv.onclick = function() 
    {openBlockDetails(block);};

    { timelineGridEl.appendChild(blockDiv);}
}}



// task modal for both adding and editing tasks 
// same thinsg as before -> titie, inputs, profrss, 

var taskModal = document.getElementById("task-modal");
 var taskModalTitle = document.getElementById("task-modal-title");
var taskNameInput = document.getElementById("task-name-input");
 
 var taskDueInput = document.getElementById("task-due-input");
var taskEstimateInput = document.getElementById("task-estimate-input");

var taskNotesInput = document.getElementById("task-notes-input");
var taskProgressInput = document.getElementById("task-progress-input");
var taskProgressDisplay = document.getElementById("task-progress-display");

// how to use for edit vs create -> if this is empty then it is for creating a task but if its 
// a numebr than ots for editing a taks

// hve everuthing empty in create, but have current data for edit
var taskEditIdInput = document.getElementById("task-edit-id"); // stores task id when editing


function openTaskModalForCreate() {
 
    taskModalTitle.textContent = "Add Task";
  taskNameInput.value = "";
  taskDueInput.value = "";
  taskEstimateInput.value = "";
  taskNotesInput.value = "";
  taskProgressInput.value = 0;
  taskProgressDisplay.textContent = "0%";
  taskEditIdInput.value = "";
  taskModal.style.display = "flex";
}


//  shouldve just made a var for = tasks[currenttask]
function openTaskModalForEdit(task) 


{taskModalTitle.textContent = "Edit Task";
  
  taskNameInput.value = task.name || "";
  taskDueInput.value = task.due || "";
  taskEstimateInput.value = task.estimatedTime || "";
  taskNotesInput.value = task.notes || "";
  

 // taskProgressInput.value = tasks[currenttask].progress;
  //taskProgressDisplay.textContent = ttasks[currenttask].progress + "%";
 // taskEditIdInput.value = tasks[currenttask].id;
 
 // 
 taskProgressInput.value = task.progress; //
  taskProgressDisplay.textContent = (task.progress) + "%";

  taskEditIdInput.value = task.id;
 
taskModal.style.display = "flex";}


 
// addtask modal button opens create mode
var openTaskModalBtn = document.getElementById("open-task-modal");

openTaskModalBtn.onclick = function()

 { openTaskModalForCreate();};


var cancelTaskBtn = document.getElementById("cancel-task-btn");
cancelTaskBtn.onclick = function() 

{taskModal.style.display = "none";};

var saveTaskBtn = document.getElementById("save-task-btn");


  // if editing, update existing task
saveTaskBtn.onclick = function() {
  // get all the values from inputs

// adding req that therehas to be a name there
  var name = taskNameInput.value;
  if (!name) {return; }  

  var due = taskDueInput.value;
  var estimate = taskEstimateInput.value;
  var notes = taskNotesInput.value;

  
  var progress = parseInt(taskProgressInput.value, 10);
  var editId = taskEditIdInput.value; 


// update for that specifc task if its edittinf
  if (editId) {
    for (var i = 0; i < tasks.length; i++) 

      {if (tasks[i].id == parseInt(editId, 10)) {
        tasks[i].name = name;
        tasks[i].due = due;
        tasks[i].estimatedTime = estimate;
        tasks[i].notes = notes;
        tasks[i].progress = progress;}
    }
} 
 // so each task needs to have a different id than the other tasks
    // that way 

// create new task
else {
 
   // var nextTaskId = 1;
  //var nextBlockId = 1;

    var newTask = 
    
    {id: nextTaskId,
      name: name,
      due: due,
      estimatedTime: estimate,
      notes: notes,
      progress: progress,
      completed: false};


    nextTaskId = nextTaskId + 1;
   // add it to the current tasks list
    tasks.push(newTask); }

  renderTasks();
  taskModal.style.display = "none";
};








// big task view modal

var openTaskBigBtn = document.getElementById("open-task-big");
var taskBigModal = document.getElementById("task-big-modal");
var closeTaskBigBtn = document.getElementById("close-task-big-btn");

openTaskBigBtn.onclick = function() 


{renderTasks();
  taskBigModal.style.display = "flex";};

closeTaskBigBtn.onclick = function()

{taskBigModal.style.display = "none";};






// time line edit blocks 

var blockModal = document.getElementById("block-modal");
var blockModalTitle = document.getElementById("block-modal-title");
var blockNameInput = document.getElementById("block-name-input");
var blockEditIdInput = document.getElementById("block-edit-id");
var blockStartInput = document.getElementById("block-start-input");
var blockEndInput = document.getElementById("block-end-input");
var blockNotesInput = document.getElementById("block-notes-input");
var deleteBlockBtn = document.getElementById("delete-block-btn");


var blockTasksListEl = document.getElementById("block-tasks-list");



function openBlockModalForCreate() 



{ blockModalTitle.textContent = "Create Time Block";
  blockNameInput.value = "";
  blockStartInput.value = "";
  blockEndInput.value = "";
  blockNotesInput.value = "";
  blockEditIdInput.value = "";

// no delete button if creatign 
  deleteBlockBtn.classList.add("hidden");
  

  buildBlockTaskCheckboxes([]);
  
  blockModal.style.display = "flex";}




function openBlockModalForEdit(block) 


{blockModalTitle.textContent = "Edit Time Block";
  blockNameInput.value = block.name;
  blockStartInput.value = block.startTimeRaw;
  blockEndInput.value = block.endTimeRaw;
  blockNotesInput.value = block.notes || "";
  blockEditIdInput.value = block.id;

  // yes delete button if editing  
  deleteBlockBtn.classList.remove("hidden");
  
  
  buildBlockTaskCheckboxes(block.taskIds);
  
  blockModal.style.display = "flex";}




//  checkboxes for tasks in block modal
//  one checkbox for each task
function buildBlockTaskCheckboxes(selectedIds) {
  blockTasksListEl.innerHTML = "";

  
  for (var i = 0; i < tasks.length; i++) 
    
    { var task = tasks[i];
    var label = document.createElement("label");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = task.id;

    // see if this task should be selected from the selected id tasks
    for (var j = 0; j < selectedIds.length; j++) 
      
      {if (selectedIds[j] == task.id) 
        { checkbox.checked = true; }}

        // task anme near the checkbozc

    var span = document.createElement("span");
    span.textContent = task.name;


    label.appendChild(checkbox);
    label.appendChild(span);
    blockTasksListEl.appendChild(label);}
}





// create block Modal for timeline takss -> each should have 
// cancel and save

var openBlockModalBtn = document.getElementById("open-block-modal");
openBlockModalBtn.onclick = function() 

{openBlockModalForCreate();};


var cancelBlockBtn = document.getElementById("cancel-block-btn");
cancelBlockBtn.onclick = function()

 { blockModal.style.display = "none";};

var saveBlockBtn = document.getElementById("save-block-btn");
saveBlockBtn.onclick = function() 

// adding a no name fall back here -> im not fine w  taks without name but 
// timeblcok without name is okay
{var name = blockNameInput.value;
  if (!name) 
    
    {name = "Time block"; }




  // backwards procress of before -> now i need to change all the
  // inputted times back into the timeline verison so they go in the 
  // tight place
   
  var startRaw = blockStartInput.value;
  var endRaw = blockEndInput.value;

  
  var startIndex = null;
  if (startRaw)
     {var startParts = startRaw.split(":");
   
    if (startParts.length >= 2) 
     
      {var startHour = parseInt(startParts[0], 10);
      startIndex = startHour - 5;
     

      // issue fic -> blcoks needs go on timeline no matter WHAT' 
      // so im putting defaults for when the times dont make sense
      // 24 hour timeline is alternative but i dnt want ot dot hat
      if (startIndex < 0) 
        
        {startIndex = 0;}

      
      if (startIndex > 17) 
        
        {startIndex = 17;}
    }
  }

  var endIndex = null;
  if (endRaw) 
    
    {var endParts = endRaw.split(":");
    if (endParts.length >= 2) 
      
      {var endHour = parseInt(endParts[0], 10);
      endIndex = endHour - 5;

      if (endIndex < 0)
         {endIndex = 0; }

      if (endIndex > 17) 
        {endIndex = 17;}}
  }

  // another oversight, need to account for empty values
  if (startIndex == null || endIndex == null) 
    { return;  }
 
// again-> same as start issue -> it cant be longe than the final hour
  if (endIndex > 17) 
    
    {endIndex = 17;}




// okay so now the checkbozes are there and the taks will work but i need to
// save which task were checked 
  var chosenIds = [];
  var checkboxes = blockTasksListEl.querySelectorAll("input[type='checkbox']");

  for (var i = 0; i < checkboxes.length; i++) 
    
    {if 

    (checkboxes[i].checked)
     {chosenIds.push(parseInt(checkboxes[i].value, 10)); }}

  var notes = blockNotesInput.value;
  var editId = blockEditIdInput.value;






  // update or create time block
  if (editId) 

    { var idNum = parseInt(editId, 10);
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].id == idNum) {
        blocks[i].name = name;
        blocks[i].startIndex = startIndex;
        blocks[i].endIndex = endIndex;
        blocks[i].taskIds = chosenIds;
        blocks[i].startTimeRaw = startRaw;
        blocks[i].endTimeRaw = endRaw;
        blocks[i].notes = notes;} }
  } 
  
  else 
    
    {var newBlock = 
      
      { id: nextBlockId,
      name: name,
      startIndex: startIndex,
      endIndex: endIndex,
      taskIds: chosenIds,
      startTimeRaw: startRaw,
      endTimeRaw: endRaw,
      notes: notes,
      completed: false};
    nextBlockId = nextBlockId + 1;
    blocks.push(newBlock);}

    
  renderTimeline();
  blockModal.style.display = "none";};
  

deleteBlockBtn.onclick = function() 

{var editId = blockEditIdInput.value;
 
 // still no need to delete if creatign
    if (!editId)
     {return; }

  var idNum = parseInt(editId, 10);

  // now recreating all the blcoks agin without yhe 
  // deleted blcok
  var newBlocks = [];
  for (var i = 0; i < blocks.length; i++)
     
    {if (blocks[i].id != idNum) 
      { newBlocks.push(blocks[i]); }}


  blocks = newBlocks;
  renderTimeline();
  blockModal.style.display = "none"};







  // show block details when clockign on time block 

var blockDetailsModal = document.getElementById("block-details-modal");
var blockDetailsTitle = document.getElementById("block-details-title");
var blockDetailsTime = document.getElementById("block-details-time");
var blockDetailsTasks = document.getElementById("block-details-tasks");
var blockDetailsNotes = document.getElementById("block-details-notes");
var closeBlockDetailsBtn = document.getElementById("close-block-details-btn");

function openBlockDetails(block) {
  

    // shwo start-end time, and also will need ot deal w 
    // showing the task lsist here since id ont want it in the 
    // main timeline block anymore -> so saved when creatign, now
    // access and display -> similar w notes -> show here whar we saved in createw
  blockDetailsTitle.textContent = block.name || "Time block";
  if (block.startTimeRaw || block.endTimeRaw) {
    blockDetailsTime.textContent = (block.startTimeRaw || "") + " – " + (block.endTimeRaw || "");
  } else {
    blockDetailsTime.textContent = "No time range set.";
  }
// ok now task list part again -> clear old, go through saved ids, 
// 

  blockDetailsTasks.innerHTML = "";
  if (block.taskIds && block.taskIds.length > 0) {
    for (var i = 0; i < block.taskIds.length; i++) {
      var taskId = block.taskIds[i];
      var taskName = "";

      
      for (var j = 0; j < tasks.length; j++) {
        if (tasks[j].id == taskId) {
          taskName = tasks[j].name;
        }
      }
      var li = document.createElement("li");
      li.textContent = taskName || ("Task " + taskId);
      blockDetailsTasks.appendChild(li);
    }
  } else {
    var li = document.createElement("li");
    li.textContent = "No tasks selected for this block.";
    blockDetailsTasks.appendChild(li);
  }







  // notes
 
  
  if (block.notes) {
    blockDetailsNotes.textContent = block.notes;
  } else {
    blockDetailsNotes.textContent = "No notes for this block yet.";
  }

  blockDetailsModal.style.display = "flex";
}

closeBlockDetailsBtn.onclick = function() {
  blockDetailsModal.style.display = "none";
};











// journal functions -  will work on htis oen now 
// don't need to save a lot of data for journal since none of the visual features
// are impacted outside of this modal -> should be simpler than rest 

var openJournalModalBtn = document.getElementById("open-journal-modal");
var journalModal = document.getElementById("journal-modal");
var closeJournalBtn = document.getElementById("close-journal-btn");
var journalGridEl = document.getElementById("journal-grid");
var journalEditorEmpty = document.getElementById("journal-editor-empty");
var journalEditorActive = document.getElementById("journal-editor-active");
var journalEditorTitleInput = document.getElementById("journal-editor-title-input");
var journalEditorText = document.getElementById("journal-editor-text");
var journalSaveBtn = document.getElementById("journal-save-btn");
var journalNewBtn = document.getElementById("journal-new-btn");

function renderJournalGrid() {
  // clear first
  journalGridEl.innerHTML = "";

  // adding in placeholders- show message if no entries

  if (!journalEntries || journalEntries.length == 0) 
    
    {var empty = document.createElement("div");
    empty.className = "journal-empty-state";
    empty.textContent = "No entries yet :).";
    journalGridEl.appendChild(empty);
    return;}


// need to make a card for each saved entry whcih shows just the title
// want that click to open it in editor -> so text in editor just changes 
// based on whats clicked  

  for (var i = 0; i < journalEntries.length; i++) 
    
    {var entry = journalEntries[i];
    var card = document.createElement("button");
    card.type = "button";
    card.className = "journal-card";
    card.setAttribute("data-journal-id", entry.id);



    var title = document.createElement("div");
    title.className = "journal-card-title";
    title.textContent = entry.title || "Untitled entry";
    card.appendChild(title);

  // workign on the opening part now -> wil need find the journal
    // id of eafh past entru and open that one
// fixing same sve issue w let here not var 
    let savedEntryId = entry.id;
    card.onclick = function()
    

  
    {openJournalEntry(savedEntryId);};

    journalGridEl.appendChild(card);}}

function openJournalEntry(entryId) {
 

  var entry = null;
  for (var i = 0; i < journalEntries.length; i++) 

    {if (journalEntries[i].id == entryId) {
      entry = journalEntries[i];}}





// need to save the open entry rm sp that the eidotr shows that one
  currentJournalEntryId = entry.id;
  journalEditorTitleInput.value = entry.title || "";
    journalEditorText.value = entry.text || "";
  journalEditorEmpty.classList.add("hidden");
journalEditorActive.classList.remove("hidden");}


// for new entries
function clearJournalEditor() 

{ currentJournalEntryId = null; 


journalEditorTitleInput.value = "";
 journalEditorText.value = "";
  journalEditorActive.classList.remove("hidden");
  journalEditorEmpty.classList.add("hidden");}




// opening/ closing the modals 

openJournalModalBtn.onclick = function()
 { renderJournalGrid();
  
    clearJournalEditor();
  journalModal.style.display = "flex";};

closeJournalBtn.onclick = function() 
{journalModal.style.display = "none";};


// new entry button -> everything is empty, save -> update, buttom -> 
journalNewBtn.onclick = function() 

{currentJournalEntryId = null;
  journalEditorTitleInput.value = "";
  journalEditorText.value = "";
  journalEditorTitleInput.focus();};

journalSaveBtn.onclick = function() 

{var title = journalEditorTitleInput.value || "";
  var text = journalEditorText.value || "";

  if (!title && !text)
     {return; } // need at least something



  // writing in what happems when they save or update entry
  
  if (currentJournalEntryId == null) 
    
    { var entry = 
    
    {id: nextJournalId,
      title: title || "Untitled entry",
      text: text};

    nextJournalId = nextJournalId + 1;
    journalEntries.push(entry);
    currentJournalEntryId = entry.id;} 

  else 
    
    {for (var i = 0; i < journalEntries.length; i++) 
      
      { if (journalEntries[i].id == currentJournalEntryId) {
        journalEntries[i].title = title || "Untitled entry";
        journalEntries[i].text = text;} } }

  renderJournalGrid()};











// okay stats page now 

var openStatsModalBtn = document.getElementById("open-stats-modal");
var statsModal = document.getElementById("stats-modal");
var closeStatsBtn = document.getElementById("close-stats-btn");

var tasksCompletedChart = null;
var taskProgressChart = null;
var blocksCompletedChart = null;

var tasksCompletedCaption = document.getElementById("tasks-completed-caption");
var taskProgressCaption = document.getElementById("task-progress-caption");
var blocksCompletedCaption = document.getElementById("blocks-completed-caption");


 // Planning to have a stats page here w a circle grouph for  completed vs in progress tasks, bar graph for task progress data, circle graph for  completed blocoks.  
// first need to collect all that data 
 function buildStatsCharts() {
  
 
  var completedTasks = 0;
  var inProgressTasks = 0;

// count completes vs not ocmpleted task -> rely both on the toggle info and progress = 10-0

  for (var i = 0; i < tasks.length; i++) 
    
    {if (tasks[i].completed || tasks[i].progress >= 100) 
      { completedTasks = completedTasks + 1;} 
      
      else {inProgressTasks = inProgressTasks + 1;}}

  



      // progress, and only want takss that hae made some progress 
      // to not be discouraging 
  var taskLabels = [];
  
  var taskProgressData = [];



  for (var i = 0; i < tasks.length; i++) 
    
    {var p = tasks[i].progress || 0;
    
    if (p > 0)
      
      {taskLabels.push(tasks[i].name);
      taskProgressData.push(p);}}



  // timeline blcoks
  var completedBlocks = 0;
  
  var notCompletedBlocks = 0;


  for (var i = 0; i < blocks.length; i++) 
    
    {if (blocks[i].completed)
       
        {completedBlocks = completedBlocks + 1;} 

    else 
      {notCompletedBlocks = notCompletedBlocks + 1;}}




  var tasksCompletedCtx = document.getElementById("tasks-completed-chart").getContext("2d");
var taskProgressCtx = document.getElementById("task-progress-chart").getContext("2d");
    var blocksCompletedCtx = document.getElementById("blocks-completed-chart").getContext("2d");



// now remove old stuff before rerendering 
    if (tasksCompletedChart) 
    {tasksCompletedChart.destroy();}

  if (taskProgressChart) {
    taskProgressChart.destroy();}

  if (blocksCompletedChart) {
    blocksCompletedChart.destroy();}

    // totals for percent calculations 
  var totalTasks = completedTasks + inProgressTasks;
  var totalBlocks = completedBlocks + notCompletedBlocks;
  var displayedTasksCount = taskLabels.length;

  // want to adding in captions so you dont have to slick on thinsg 
  if (tasksCompletedCaption)
    
    { if (totalTasks == 0)
       {tasksCompletedCaption.textContent = "No tasks yet – you can add one whenever you're ready.";} 
       else 
        {tasksCompletedCaption.textContent = "You've moved " + completedTasks + " tasks forward so far.";}}

  if (taskProgressCaption) 
    
    {if (displayedTasksCount == 0) 
      
      {taskProgressCaption.textContent = "Once you update task progress, you'll see it build up here.";} else 
     
     // aberage
       {var sum = 0;

      for (var i = 0; i < taskProgressData.length; i++) 
        
        {sum = sum + taskProgressData[i]; }

      var averageProgress = Math.round(sum / displayedTasksCount);
      taskProgressCaption.textContent = "Average progress across tasks: " + averageProgress + "%";}}

  if (blocksCompletedCaption) {
   
    if (totalBlocks == 0) 
      
      {blocksCompletedCaption.textContent = "No time blocks yet – your schedule is completely flexible today.";} 
      
      else 
        
        {blocksCompletedCaption.textContent = "You completed " + completedBlocks + " block(s)";}
  }

  // create charts
  tasksCompletedChart = new Chart(tasksCompletedCtx, {
    type: "doughnut",
    data: 
    
    {labels: ["Finished today", "In progress"],
      datasets: 
      
      [{data: [completedTasks, inProgressTasks],
        backgroundColor: ["#9ed5c2", "#c3b7f7"],
        borderWidth: 0 }] },

    options: 
    
    { animation:  
      {duration: 900,
        easing: "easeOutQuad"},
      plugins:

      { legend: { display: true } }}
  });

  taskProgressChart = new Chart(taskProgressCtx,
    
    { type: "bar",
    
    data: 
    { labels: taskLabels,
      datasets: 

      [{ label: "Progress (%)",
        data: taskProgressData,
        backgroundColor: "#e2f3f7",
        borderWidth: 0,
        borderRadius: 6}]},

    options: 
    
    { indexAxis: "y",
      animation: 

      { duration: 900,
        easing: "easeOutQuad"},
      
      scales: 

      { x: 
        
        {beginAtZero: true,
          max: 100,
          grid: {
            color: "rgba(0,0,0,0.04)"}},

        y: {grid: {display: false }
        }},

      plugins: 
      {legend: { display: false }}}
  });

  blocksCompletedChart = new Chart(blocksCompletedCtx, {
    
    type: "doughnut",
    data: 
    
    { labels: ["Completed blocks", "Open blocks"],
      datasets: 
      
      [{data: [completedBlocks, notCompletedBlocks],
        backgroundColor: ["#9ed5c2", "#fbe7c8"],
        borderWidth: 0
      }]},


    options: {
      animation: 
      {duration: 900,
        easing: "easeOutQuad"},

      plugins: 
      {legend: { display: true }}
    }
  });
}





// stats modal open and close 

openStatsModalBtn.onclick = function() 

{buildStatsCharts();
  statsModal.style.display = "flex";};

closeStatsBtn.onclick = function() 

{statsModal.style.display = "none";};

// data loading functions

// helper to get next id from array - added this when i added file loading
// finds the highest id and returns the next one
function getNextIdFromArray(arr) 

{var maxId = 0;

  for (var i = 0; i < arr.length; i++) 
    
    {if (arr[i].id && arr[i].id > maxId) {
      maxId = arr[i].id;} }

  return maxId + 1;}

//  test data as i work w file , will add load in later 

//-function seedData() {

/*  tasks.push
  
  ({id: nextTaskId,
    name: "RIQ Assignment",
    due: "2025-12-25",
    estimatedTime: "6h",
    notes: "Finish methods\nAdd diagrams\nDraft discussion\n\nCheck rubric again.",
    progress: 50,
    completed: false});


  nextTaskId = nextTaskId + 1;

  tasks.push
  
  ({id: nextTaskId,
    name: "SVS Analysis",
    due: "2025-12-22",
    estimatedTime: "4h",
    notes: "Run ANOVA\nClean figures\nExport to slides.",
    progress: 20,
    completed: false});


  nextTaskId = nextTaskId + 1;

  blocks.push
  
  ({id: nextBlockId,
    name: "Morning Routine",
    startIndex: 3,
    endIndex: 5,
    taskIds: [],
    startTimeRaw: "08:00",
    endTimeRaw: "10:00",
    notes: "Shower, breakfast, light emails.",
    completed: false});
  nextBlockId = nextBlockId + 1; */


// now can put ina ctual load data 
async function loadInitialData() 

{ {var response = await fetch("planner-data.json");
    
    var data = await response.json();
      
      {tasks = data.tasks;}
      {blocks = data.blocks;}

    // update next ids so everything is unique 
    nextTaskId = getNextIdFromArray(tasks);
    nextBlockId = getNextIdFromArray(blocks);} 
    
    
  // render everything after loading
  renderTasks();
  renderTimeline();}

// start the app
loadInitialData();







