const ddlYears = document.getElementById("ddlYears");
const month = document.getElementById("month");
var currentYear = new Date().getFullYear();
const calendar = document.getElementById("calendar");
const date = document.getElementById("date");
const btn = document.getElementById("btn");
let greenList = [];



for (var i = 1950; i <= currentYear; i++) {
  var option = document.createElement("OPTION");
  option.innerHTML = i;
  option.value = i;
  ddlYears.appendChild(option);
}

function createCalendar(elem, year, month, selectedDate) {
  let mon = month - 1; 
  let d = new Date(year, mon);

  let table =
    "<table><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr><tr>";


  for (let i = 0; i < getDay(d); i++) {
    table += "<td></td>";
  }

  while (d.getMonth() == mon) {
    const currDate = d.getDate();
    if(currDate == selectedDate) {
      if(greenList.includes(currDate)) {
        table += "<td bgcolor='white'>" + currDate + "</td>";
        greenList = greenList.filter(val => val != selectedDate);
      } else {
        table += "<td bgcolor='green'>" + currDate+ "</td>"
        greenList.push(selectedDate);
      }
    } else {
      if(greenList.includes(currDate)) {
        table += "<td bgcolor='green'>" + currDate+ "</td>"
      } else 
      table += "<td bgcolor='white'>" + currDate + "</td>";
    }

    if (getDay(d) % 7 == 6) {
      table += "</tr><tr>";
    }

    d.setDate(d.getDate() + 1);
  }

  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      table += "<td></td>";
    }
  }

  table += "</tr></table>";

  elem.innerHTML = table;
}

function getDay(date) {
  let day = date.getDay();
  if (day == 0) day = 7; 
  return day - 1;
}

ddlYears.value = 2022;
createCalendar(calendar, ddlYears.value, month.value);

ddlYears.onchange = function () { 
  greenList = [];
  createCalendar(calendar, ddlYears.value, month.value);
};

month.onchange = function () {
  greenList = [];
  createCalendar(calendar, ddlYears.value, month.value);
};

function displayDate() {
  
    createCalendar(calendar, ddlYears.value, month.value, Number(date.value));
    date.value = "";
}

date.onkeydown =function (e) {
  console.log();
  if(e.key == 'Enter') {
    createCalendar(calendar, ddlYears.value, month.value, Number(date.value));
    date.value = "";
  }
} 


