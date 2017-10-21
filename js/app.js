var current_sort = {
    "key": "id",
    "order": "asc"
};
var json_data;
var table_body = document.querySelector('#table_body');
var search_input = document.querySelector('#search_input');

document.addEventListener('DOMContentLoaded', function () {
  loadJSON('assets/data.json', onLoadData);
});

function onLoadData(data) {
  json_data = data;
  loadTable(data);
}

function loadTable(data) {
  for (var i = 0; i < data.length; i++) {
    generateRow(data[i], table_body);
  }
}

function SearchRecords() {
  query = search_input.value;

  if (query === "") {
    return;
  }
  const regex = new RegExp(query, 'i');
  const result = _queryJson(json_data, regex);

  let json_result = [];
  let ids = [];
  for (var i = 0; i < result.length; i++) {
    var pos = result[i][0];
      let found = ids.indexOf(pos) > -1;
      if (!found) {
        ids.push(pos);
      }
  }

  for (var i = 0; i < ids.length; i++) {
    json_result.push(json_data[ids[i]]);
  }
  table_body.innerHTML = "";
  loadTable(json_result);
}


function sortData(key) {
  table_body.innerHTML = "";
  data = json_data;
  if (current_sort.key === key) {
    if (current_sort.order === 'asc') {
        var sort = 'des';
      } else {
        var sort = 'asc';
      }
      current_sort = {
        "key": key,
        "order": sort
      };

      if (key === 'id') {
        if (sort === 'asc') {
          var SortedData = sortjsonarray(json_data, key, sort, 'num');
        } else {
          var SortedData = data.reverse();
        }
      } else {
        var SortedData = sortjsonarray(json_data, key, sort);
      }

    } else {
      current_sort = {
        "key": key,
        "order": "asc"
      };

      if (key === 'id') {
        if (sort === 'asc') {
          var SortedData = sortjsonarray(data, key, sort, 'num');
          var SortedData = data.reverse();
        } else {
          var SortedData = sortjsonarray(data, key, sort, 'num');
          //var SortedData = d.reverse();
        }
      } else {
        var SortedData = sortjsonarray(data, key, 'asc');
      }
    }
    loadTable(SortedData);
}

function loadJSON(path, success)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
              console.log(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function generateRow(row) {
    var tr = document.createElement("tr");

    var td = document.createElement("td");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    var txt = document.createTextNode(row.id);
    td.appendChild(txt);
    tr.appendChild(td);

    var txt = document.createTextNode(row.first_name);
    td1.appendChild(txt);
    tr.appendChild(td1);

    var txt = document.createTextNode(row.last_name);
    td2.appendChild(txt);
    tr.appendChild(td2);

    var txt = document.createTextNode(row.email);
    td3.appendChild(txt);
    tr.appendChild(td3);

    var txt = document.createTextNode(row.gender);
    td4.appendChild(txt);
    tr.appendChild(td4);

    var txt = document.createTextNode(row.ip_address);
    td5 .appendChild(txt);
    tr.appendChild(td5);

    table_body.appendChild(tr)
}
