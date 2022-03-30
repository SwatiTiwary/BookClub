/*
SUBMITTED BY: 1928270 - SWATI TIWARY
*/
const loginFieldData = document.getElementById("logged-user");
const table = document.getElementById("info-table");
const allUsers = ["UserA", "UserB", "UserC", "UserD"];
var user = "";
var flag = 0;
var count = 0; //flag used for deleting the "add" row only once

const libraryDatabase = [
  {
    id: 1,
    name: "Book1",
    author: "Author1",
    lender: "UserC",
    borrower: "UserB",
    action: ""
  },
  {
    id: 2,
    name: "Book2",
    author: "Author2",
    lender: "UserC",
    borrower: "",
    action: ""
  },
  {
    id: 3,
    name: "Book3",
    author: "Author3",
    lender: "UserD",
    borrower: "UserC",
    action: ""
  },
  {
    id: 4,
    name: "Book4",
    author: "Author4",
    lender: "UserA",
    borrower: "",
    action: ""
  },
  {
    id: 5,
    name: "Book5",
    author: "Author5",
    lender: "UserA",
    borrower: "",
    action: ""
  },
  {
    id: 6,
    name: "Book6",
    author: "Author6",
    lender: "UserB",
    borrower: "UserA",
    action: ""
  }
];
for (var i = 0; i < libraryDatabase.length; i++) {
  var row = table.insertRow();
  var id = row.insertCell(0);
  var namenew = row.insertCell(1);
  var author = row.insertCell(2);
  var lender = row.insertCell(3);
  var borrower = row.insertCell(4);
  var action = row.insertCell(5);
  id.innerHTML = libraryDatabase[i].id;
  namenew.innerHTML = libraryDatabase[i].name;
  author.innerHTML = libraryDatabase[i].author;
  lender.innerHTML = libraryDatabase[i].lender;
  borrower.innerHTML = libraryDatabase[i].borrower || "-";
  action.innerHTML = "-";
}

function changeLoggedInUser() {
  //count=0;
  const username = loginFieldData.value;
  let message = document.getElementById("logged-in-user-name");
  if (allUsers.includes(username)) {
    if (flag === 1) {
      for (let i = 1; i < table.rows.length - 1; i++) {
        row = table.rows[i];
        row.cells[5].innerHTML = "";
      }
      table.deleteRow(table.rows.length - 1);
    }
    message.innerHTML = "Logged in user: " + username;
    user = username;
    flag = 1;
    defineAddRow(user);
  } else if (!allUsers.includes(username) && username !== "") {
    message.innerHTML = "Invalid Username! Try Again.";
    flag = 0;
    count++;
    for (let i = 1; i < table.rows.length - 1; i++) {
      row = table.rows[i];
      row.cells[5].innerHTML = "-";
    }

    if(count===1 && table.rows.length>7) // prevents multiple rows from getting deleted if user enters invalid/empty username more than once consecutively
      table.deleteRow(table.rows.length - 1); //for deleting the add new row functionality row

  } else {
    //window.alert(table.rows.length);
    message.innerHTML = "Username cannot be blank! Try Again.";
    flag = 0;
    count++;
    for (let i = 1; i < table.rows.length - 1; i++) {
      row = table.rows[i];
      row.cells[5].innerHTML = "-";
    }
    if(count===1 && table.rows.length>7) // prevents multiple rows from getting deleted if user enters invalid/empty username more than once consecutively
      table.deleteRow(table.rows.length - 1); //for deleting the add new row functionality row
  }
}

/*
For invalid/empty username,
the table is madde to look similar to the "No User Logged In" state
till where the last new entry was made or the libraryDatabase was last updated.

*/

function loggedIn() {
  count=0;
  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows[i];
    if (libraryDatabase[i - 1].lender !== user && libraryDatabase[i - 1].borrower === "") {
      row.cells[5].innerHTML = `<button onclick="borrowBook(${i})">Borrow</button>`;
    } else if (libraryDatabase[i - 1].lender !== user && libraryDatabase[i - 1].borrower === user) {
      row.cells[5].innerHTML = `<button onclick="returnBook(${i})">Return</button>`;
    }
    else{
      row.cells[5].innerHTML = "-";
    }
  }
}

function defineAddRow(user) {
  table.insertRow(libraryDatabase.length + 1).innerHTML = `<tr>
    <td>${table.rows.length - 1}</td>
    <td><input type="text" id="newTitle" placeholder="Title" required></input></td>
    <td><input type="text" id="newAuthor" placeholder="Author" required></input></td>
    <td>${user}</td>
    <td></td>
    <td><button type="button" onclick="addNewRow(user)">Add</button></td>
    </tr>`;
  loggedIn();
}

function addNewRow(currentUser) {

    var titleName = document.getElementById("newTitle");
    var authorName = document.getElementById("newAuthor");
    if(titleName.value!=="" && authorName.value!=="")
    {
          libraryDatabase.push({
          id: libraryDatabase.length,
          name: titleName.value,
          author: authorName.value,
          lender: currentUser,
          borrower: "",
          action: ""
      });
      var row = table.insertRow(libraryDatabase.length);
      var id = row.insertCell(0);
      id.innerHTML = libraryDatabase.length;

      var namenew = row.insertCell(1);
      namenew.innerHTML = titleName.value;

      var author = row.insertCell(2);
      author.innerHTML = authorName.value;

      var lender = row.insertCell(3);
      lender.innerHTML = currentUser;

      var borrower = row.insertCell(4);
      borrower.innerHTML = "-";

      var action = row.insertCell(5);
      action.innerHTML = "-";

      table.deleteRow(table.rows.length - 1);
      defineAddRow(user);
    }
}

function returnBook(rowNumber) {
  let row = table.rows[rowNumber];
  row.cells[5].innerHTML = `<button onclick="borrowBook(${rowNumber})">Borrow</button>`;
  row.cells[4].innerHTML = "-";

  libraryDatabase[rowNumber - 1].borrower = "";
}

function borrowBook(rowNumber) {
  let row = table.rows[rowNumber];
  row.cells[5].innerHTML = `<button onclick="returnBook(${rowNumber})">Return</button>`;
  row.cells[4].innerHTML = user;

  libraryDatabase[rowNumber - 1].borrower = user;
}