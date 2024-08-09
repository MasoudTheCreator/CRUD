// CALLING FIELDS
let title = document.getElementById("title");
// ---------------------------------------------
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
// ---------------------------------------------------
let count = document.getElementById("count");
let category = document.getElementById("category");
// -----------------------------------------------------
let search = document.getElementById("searchBar");
// ------------------------------------------------
let mode = "create";

let globali;

function calcTotal() {
  // Adding the fields values together to get the totaL
  let result;
  result = +price.value + +taxes.value + +ads.value - +discount.value;
  // ---------------------------------

  // Check if the user filled all the fields
  if (price.value.trim() !== "") {
    // if so dispaly the total (added values)
    total.innerHTML = result;
    // and change the "total's" background color to green
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "rgb(158, 16, 16)";
  }
}

let arrayOfObjects;
if (localStorage.item != null) {
  arrayOfObjects = JSON.parse(localStorage.item);
} else {
  arrayOfObjects = [];
}

function create() {
  // Creating n object/row of data and pushing it to the array
  let rowObj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  // if (title.value != "") {
  //   arrayOfObjects.push(rowObj);
  // } else {
  //   console.log("empty object");
  // }
  if(title.value != "" && price.value !=""){
    if (mode === "create") {
      if (rowObj.count > 1) {
        for (let i = 0; i < rowObj.count; i++) {
          arrayOfObjects.push(rowObj);
        }
      } else {
        arrayOfObjects.push(rowObj);
      }
    } else {
      arrayOfObjects[globali] = rowObj;
      mode = "create";
      createButton.innerHTML = "Create";
      count.style.display = "block";
    }
  }
 

  // ---------------------------------------------

  // saving the array in the local storage
  stringedArrayOfObjects = JSON.stringify(arrayOfObjects);
  localStorage.setItem("item", stringedArrayOfObjects);

  // Clear the fields
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";

  count.value = "";
  category.value = "";

  total.style.backgroundColor = "rgb(158, 16, 16)";

  console.log("cleared🧹");
  // ----------------------
  showData();
}

//import the array data to the table

function showData() {
  let theTable = "";

  for (let i = 0; i < arrayOfObjects.length; i++) {
    theTable += `
     <tr>
              <td>${i}</td>
              <td>${arrayOfObjects[i].title}</td>
              <td>${arrayOfObjects[i].price}</td>
              <td>${arrayOfObjects[i].taxes}</td>
              <td>${arrayOfObjects[i].ads}</td>
              <td>${arrayOfObjects[i].discount}</td>
              <td>${arrayOfObjects[i].total}</td>
              <td>${arrayOfObjects[i].category}</td>
              <td><button id="update" onclick="updateItem(${i})">Update</button></td>
              <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
    </tr>
    `;
    document.getElementById("insertHere").innerHTML = theTable;
  }

  if (arrayOfObjects.length > 0) {
    let deleteAllButton = document.getElementById("deleteAll");
    deleteAllButton.innerHTML = `
  <button onclick="deleteAll()">Delete All [${arrayOfObjects.length}] items</button>
  `;
  }
}
// -------SHOW DATA-----------
showData();

function deleteItem(i) {
  arrayOfObjects.splice(i, 1);
  localStorage.item = JSON.stringify(arrayOfObjects);
  console.log(`delete ${i}`);
  showData();
}

function updateItem(i) {
  title.value = arrayOfObjects[i].title;
  price.value = arrayOfObjects[i].price;
  taxes.value = arrayOfObjects[i].taxes;
  ads.value = arrayOfObjects[i].ads;
  category.value =arrayOfObjects[i].category;
  discount.value = arrayOfObjects[i].discount;
  calcTotal();
  count.style.display = "none";
  createButton.innerHTML = "Update";
  mode = "update";
  scroll({ top: 0, behavior: "smooth" });

  globali = i;
}

function deleteAll() {
  localStorage.clear();
  arrayOfObjects.splice(0);
  location.reload();
}

// ----------SEARCH---------------
let searchByWhat = "titleSearch";
function searchMode(id) {
  if (id == "searchByTitle") {
    searchByWhat = "titleSearch";
    search.placeholder = "Search by title";
  } else {
    searchByWhat = "categorySearch";
    search.placeholder = "Search by category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchTable(value) {
  let theTable = "";
  if (searchByWhat === 'titleSearch') {
    for (let i = 0; i < arrayOfObjects.length; i++) {
      if (arrayOfObjects[i].title.toLowerCase().includes(value.toLowerCase())) {
        theTable += `
          <tr>
            <td>${i}</td>
            <td>${arrayOfObjects[i].title}</td>
            <td>${arrayOfObjects[i].price}</td>
            <td>${arrayOfObjects[i].taxes}</td>
            <td>${arrayOfObjects[i].ads}</td>
            <td>${arrayOfObjects[i].discount}</td>
            <td>${arrayOfObjects[i].total}</td>
            <td>${arrayOfObjects[i].category}</td>
            <td><button id="update" onclick="updateItem(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
          </tr>
        `;
      }
    }
  } else if (searchByWhat === 'categorySearch') {
    for (let i = 0; i < arrayOfObjects.length; i++) {
      if (arrayOfObjects[i].category.toLowerCase().includes(value.toLowerCase())) {
        theTable += `
          <tr>
            <td>${i}</td>
            <td>${arrayOfObjects[i].title}</td>
            <td>${arrayOfObjects[i].price}</td>
            <td>${arrayOfObjects[i].taxes}</td>
            <td>${arrayOfObjects[i].ads}</td>
            <td>${arrayOfObjects[i].discount}</td>
            <td>${arrayOfObjects[i].total}</td>
            <td>${arrayOfObjects[i].category}</td>
            <td><button id="update" onclick="updateItem(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.getElementById("insertHere").innerHTML = theTable;
}