---
title: "Use Google Apps Script to automate key processes (part 2 of 3)"
date: 2024-08-20T10:00:00-05:00
draft: false
summary: "Extend Google Sheets to create your own custom tools"
tags: 
  - Google Apps Script
  - Tutorial
image: https://storage.googleapis.com/ei-dev-assets/assets/0__lHyEfrVvZtSxMZR.webp
image-credit: Screen capture by author
featured: false
---
In part 2 of the [Time Tracker](https://eriktuck.com/blog/time-tracker) tutorial, we'll use Google Apps Script to automate the process of logging the data at the end of each week and clearing out the data entry form for the next week. 

![img](https://storage.googleapis.com/ei-dev-assets/assets/0__lHyEfrVvZtSxMZR.webp)

If you haven't already, complete [Time Tracker - part 1](https://eriktuck.com/blog/time-tracker---part-1) or jump in by copying the output of that tutorial [here](https://docs.google.com/spreadsheets/d/1tUwRvQpkjJOs3F4deWPFyR9uvGd2FyBagJQufUTf790/template/preview) (please click the **USE TEMPLATE** button to make a copy into your own Google Drive).

Apps Script is a flavor of JavaScript that provides access to the Google API (which allows you to interact with Google products like Google Sheets). If you're new to Apps Script or JavaScript, don't worry. This will be a gentle introduction. After this tutorial, you'll be able to create custom menus in Google Sheets, read data from a spreadsheet, and write it to another spreadsheet.
## step 1. open the Google Apps Script extension
Let's open the Google Apps Script code editor and familiarize ourselves with it.
- In the top menu of Google Sheets, select *Extensions > Apps Script* to open the Apps Script code editor. A new tab should open with an Untitled Project. 
- Rename the project by clicking the word "Untitled". (I like to use the same name as the Google Sheet so I can keep track of which project goes with which file).

Feel free to click around to familiarize yourself with the code editor. The project we've just created is what's called a [container-bound script](https://developers.google.com/apps-script/guides/bound#:~:text=The%20file%20that%20a%20bound,privileges%20over%20the%20parent%20file.), which means it is associated with the Google Sheet we created it from. Container-bound scripts have special methods that allow you to easily access the parent spreadsheet. You can also create [standalone scripts](https://developers.google.com/apps-script/guides/standalone) using Apps Script which are often better for deploying web applications.
## step 2. create a custom menu
We can create a custom menu in Google Sheets with Apps Script. We'll use our custom menu to execute the scripts we write for this project.
- Delete the existing code in the `Code.gs` file. The `Code.gs` file is the file that is created when we create an Apps Script project, and should be the only file in your project. See the Files box in the left sidebar to confirm.
- Input the following code:

```JavaScript
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Create a custom menu
  ui.createMenu('TRACKER')
    .addItem('Clear Entries', 'confirmAndClearEntries')
    .addToUi();
}
```

- Click the **Save Project** icon (a floppy disk) or use `Ctrl + S` to save.

This code uses the reserved function `onOpen`, which will run whenever we open the Google Sheet, to access the spreadsheet's user interface, create a menu called "TRACKER", and add an item named 'Clear Entries'. When clicked, this menu item will run the function `confirmAndClearEntries`, which we have not written yet.

Let's test it out by reloading the Google Sheet and confirming that a new menu item is added. Under that menu should be the item *Clear Entries*. Be patient, it may take a few seconds to show up. Try clicking the new menu item *Clear Entries*. You should get an error saying `Script function not found: confirmAndClearEntries`. We'll fix that in the next step.

Notice also that the Apps Script project was closed when we reloaded the spreadsheet. Go ahead and open it again under *Extensions > Apps Script*. 
## step 3. launch a dialog box
Let's start writing the function `confirmAndClearEntries` to see how Apps Script works. As the name suggests, this function will clear the entries in the Tracker app, but before doing so it will confirm with the user. 

- Input the following code below the function `onOpen()`:

```JavaScript
function confirmAndClearEntries() {
  var ui = SpreadsheetApp.getUi();
  var msg = 'Are you sure you want to delete all entries from Tracker?'
  var response = ui.alert('Please confirm', 
                          msg, 
                          ui.ButtonSet.YES_NO);

  if (response == ui.Button.YES) {
    ui.alert('Action confirmed');
  } else {
    ui.alert('Action canceled');
  }
}
```

This code launches a Yes/No dialog box. For now, it simply states whether the user confirmed or canceled the action. 

- Save the project (`Ctrl + S`).
- Navigate to the Tracker (you do not need to reload Google Sheets).
- Run the new function using the custom menu *Tracker > Clear Entries*.

You should see a dialog box like the one shown below. If you click No, another box should load with the message "Action canceled". If you click Yes, the box should say "Action confirmed".

![confirmation dialog box](https://storage.googleapis.com/ei-dev-assets/assets/Arc_a8LFf0EOUV.png)
## step 4. write function to clear entries
Now let's write the function that will clear the entries. We'll use a bit of a trick to make our lives easier. We're going to clear the content of any cell that uses the background color we selected for data entry cells (see step 1 in [Time Tracker - part 1](https://eriktuck.com/blog/time-tracker---part-1)). This will save us from having to explicitly define all of the data entry ranges. It will also allow you to use this same code in any other project you want to delete specific cells. 

- Navigate to the Apps Script code editor.
- Below the existing code, input the following:

```JavaScript
function clearEntries() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var trackerSheet = ss.getSheetByName('Tracker');
  var entryRange = trackerSheet.getRange(1, 1, trackerSheet.getLastRow() - 1, trackerSheet.getLastColumn());
  var backgrounds = entryRange.getBackgrounds();

  // Clear content from cells in source sheet with background color
  var backgroundColor = '#eee5e3';  // UPDATE
  for (var i = 0; i < backgrounds.length; i++) {
    for (var j = 0; j < backgrounds[i].length; j++) {
      if (backgrounds[i][j] == backgroundColor) {
        trackerSheet.getRange(i + 1, j + 1).clearContent();
      }
    }
  }
}
```

- Update the line `var backgroundColor = '#eee5e3'` with the color you selected for data entry cells. You can find this by hovering over the color in the color picker, as shown below.

![get hex code for input cell](https://storage.googleapis.com/ei-dev-assets/assets/Photos_YjZvIpg2Ms.png)

Understanding the code for this function is beyond the scope of this tutorial, but if you're curious notice that the code first accesses the spreadsheet object, then locates the Tracker sheet and gets all rows and all columns as the variable `entryRange`. The background colors of all cells are stored in the variable `backgrounds`. Nested for loops loop through each row and then each column of the backgrounds array to first check if the cell has the background color we specified and then clears the content of the cell if it does.
## step 5. call function to clear entries
Finally, we'll need to call this function for it to run. We can use the `confirmAndClearEntries` function we've already written. Instead of showing the dialog box when the user confirms the action, we'll call this function.
- Update the function `confirmAndCLearEntries` so it matches this code by replacing the line `ui.alert('Action confirmed')` with `clearEntries()`:

```JavaScript
function confirmAndClearEntries() {
  var ui = SpreadsheetApp.getUi();
  var msg = 'Are you sure you want to delete all entries from Tracker?'
  var response = ui.alert('Please confirm', 
                          msg, 
                          ui.ButtonSet.YES_NO);

  if (response == ui.Button.YES) {
    clearEntries();
  } else {
    ui.alert('Action cancelled');
  }
}
```

- Save the project (`Ctrl + S`).
## step 6. authorize Apps Script
Before Apps Script is allowed to run a function that will read, write, or delete from a Google Sheet, it requires authorization. This helps ensure that no malicious code is executed. To authorize, follow the steps below:
- Navigate back to the Tracker spreadsheet.
- Select the *TRACKER > Clear Entries* menu item.
- Follow the authorization workflow to authorize Apps Script.

If you are using a personal account, Google will warn you that it hasn't verified this app. You must click the link for "Advanced" and then the link for "Go to Time Tracker" (or your project's name) to authorize. Finally, click Allow. Organizational accounts will have a different authorization flow. The authorization screens are shown below.

> [!example]- Authorization Screens
> ![img](https://storage.googleapis.com/ei-dev-assets/assets/Arc_c0CUxPnSEx.png)
> 
> ![advanced authorization](https://storage.googleapis.com/ei-dev-assets/assets/Arc_d3vWCUnyYo.png)
> 
> ![click allow](https://storage.googleapis.com/ei-dev-assets/assets/Arc_Ebb2RvkMNL.png)
> 

- Repeat the previous step now that this Apps Script is authorized (select *TRACKER > Clear Entries*).
- A dialog box will pop up to ask you if you are sure. Select "Yes". The data in the tracker will then be cleared.
- Undo the changes (*Edit > Undo* or `Ctrl + Z`) to return the data to the spreadsheet.

You've successfully created a custom user interface, authorized Apps Script, and run code that manipulates data in the spreadsheet! But we don't want to simply delete the data we're tracking, we want to save it first and store it over time. Let's tackle that next.

We'll create a simple data pipeline to efficiently store the data. First, we'll copy the data from the data entry form into a temporary data store. Then, we'll use Apps Script to copy that data into long-term storage. All of this is done in the same spreadsheet. By combining traditional formulas with Apps Script in this way we'll ensure we always have access to all of the data, both from the current week and past weeks, which we'll use in data visualizations in future segments of this tutorial. Let's begin.
## step 7. create temporary data store
- Add a sheet to store the data temporarily. Call it "current_data". 
- In the first row, create headers for "Activity", "Date", "Hours", and "Comments".
- Write the following formula in cell `A2`:

```
=IFNA(FILTER({Tracker!B2:B,Tracker!D2:D,Tracker!E2:E, Tracker!C2:C},Tracker!B2:B<>"", Tracker!B2:B <> "Activity"))
```

This function combines `FILTER` and `IFNA` to return the records in columns B, E, D, and C in the **Tracker** sheet where the value in column B (the Activity column) is not blank and does not equal "Activity". If you chose a different header for that column, update the formula to match. If the date shown is a number like `45292`, change the format of the column to "Date" (*Format > Number > Date*).
## step 8. write function to log data
- Create a duplicate of **current_data** and call it "past_data" (right-click the sheet tab and select *Duplicate*.
- Delete the formula in cell A2 so that the sheet **past_data** only has the header row.
- Navigate to the Apps Script code editor.
- Below the existing code, input the following:

```JavaScript
function logData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sourceSheet = ss.getSheetByName('current_data');
  var targetSheet = ss.getSheetByName('past_data');

  // Get data range excluding headers
  var sourceRange = sourceSheet.getRange(2, 1, sourceSheet.getLastRow() - 1, sourceSheet.getLastColumn());

  // Get target range
  var targetRange = targetSheet.getRange(targetSheet.getLastRow() + 1, 1, sourceRange.getNumRows(), sourceRange.getNumColumns());

  // Copy values from source to target
  sourceRange.copyTo(targetRange, {contentsOnly: true});
}
```

This code access the current spreadsheet object and then saves the sheet **current_data** as the variable `sourceSheet` and the sheet **past_data** as the `targetSheet`. The script then accesses the all of the data in the **current_data** sheet, excluding the header row, and appends it to the **past_data** sheet starting in the first empty row. 
## step 9. call function to log data
We could update the `confirmAndClearEntries` function to  call the `logData` function. However, we may want to preserve our ability to clear the data without logging it. Let's add a new menu item to log the week's data instead.
- First, copy and paste the `confirmAndClearEntries` function and rename the copy `confirmAndLogData`.
- Update the `confirmAndLogData` function to also log the data if the user confirms the action. The code should look like this:

```JavaScript
function confirmAndLogData() {
  var ui = SpreadsheetApp.getUi();
  var msg = 'Are you sure you want to delete all entries from Tracker?'
  var response = ui.alert('Please confirm', 
                          msg, 
                          ui.ButtonSet.YES_NO);

  if (response == ui.Button.YES) {
    logData();
    clearEntries();
  } else {
    ui.alert('Action cancelled');
  }
}
```

We also include the call to `clearEntries` so that the data are removed once they are logged. If not, it's possible that data would be duplicated in the **past_data** sheet.

- Finally, update the `onOpen` function to add an item called "Save Week" that calls the `confirmAndLogData` function.

```JavaScript
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Create a custom menu
  ui.createMenu('TRACKER')
    .addItem('Save Week', 'confirmAndLogData')
    .addItem('Clear Entries', 'confirmAndClearEntries')
    .addToUi();
}
```

- Save the project (`Ctrl + S`).
- Reload the Google Sheet in your browser to see the new menu item.
- Log the data by running the menu item *TRACKER > Save Week*.

Each week, you'll run this function to log last week's data. Then simply input the current date in cell `A1`. If you're up for a challenge, write a function to update the date in cell `A1` with today's date and call it after you call `clearEntries` in the  `confirmAndLogData` function.

The menu should appear as below:

![custom menu](https://storage.googleapis.com/ei-dev-assets/assets/Arc_bpKngaxT33.png)
## step 9. aggregate past and current data
Let's combine the data from the **current_data** and **past_data** sheets in a new sheet called **all_data**. 
- Add a sheet to store the combined data. Call it "all_data".
- In cell `A1`, input the following formula:

```
=QUERY({past_data!A1:D;current_data!A2:D}, "SELECT * WHERE Col1 IS NOT NULL",1)
```

This formula first concatenates the ranges `past_data!A1:D` and `current_data!A2:D` (using the curly braces and semi-colon) and then uses a `QUERY` on the result to filter for records where the first column `Col1` is not a null value. A `QUERY` here is better than a `FILTER` because `QUERY` can operate on the concatenated range and `FILTER` cannot.
## step 10. join category to all data
In this final step, we'll join the category we assigned in the **Tasks** sheet to the entries in **all_data**.
- In the sheet **all_data**, add the column header "Category" to the column to the right of the data range, column E.
- In cell `E2` input the formula:

```
=ARRAYFORMULA(IF(ISBLANK(A2:A),,VLOOKUP(A2:A,Tasks!A:B,2,FALSE)))
```

This formula uses a `VLOOKUP` to join the category from the **Tasks** sheet to the Activity name in column A.

Here's how your final **all_record** should look:

![final all_record sheet](https://storage.googleapis.com/ei-dev-assets/assets/Arc_qEael7EK8K.png)
## up next
You should now see that **Tracker** and **current_data** are empty, **past_data** is populated with what was in **current_data** and **all_data** is exactly the same as **past_data**. In this tutorial, you've started with Apps Script, creating custom menu items and writing code that executes when those menu items are run. You've read data from a range and written it to another sheet in the same spreadsheet. You've also developed a simple data pipeline combing formulas and Apps Script functions to manage data storage and support analysis.

You can access a copy of the Time Tracker based on the tutorials so far [here](https://docs.google.com/spreadsheets/d/1oRAuKNwlFVG0-CSmHCuL4o0OoeWTyBP8Z3tUcddBMIg/template/preview). Please click the **USE TEMPLATE** button to make a copy into your own Google Drive.

We can use the data in the sheet **all_data** to analyze how we spend our time and create data visualizations, which we'll do in [Time Tracker - part 3](https://eriktuck.com/blog/time-tracker---part-3).