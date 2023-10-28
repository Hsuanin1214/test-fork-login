//新增貼文
const addTitle = document.querySelector(".addTitle");
const addContent = document.querySelector(".addContent");


//後臺取得資料
// const tableBody = document.getElementById("tableBody");
function tableData() {
  axios.get("http://localhost:3000/views").then(function (response) {
    let result = response.data;
    console.log(result);
    const tableBody = document.getElementById("tableBody");
    // 渲染数据
    result.forEach((data) => {
      const row = document.createElement("tr");

      // 创建并设置 ID 列
      const idCell = document.createElement("th");
      idCell.setAttribute("scope", "row");
      idCell.textContent = data.id;

      // 创建并设置 First Name 列
      const firstNameCell = document.createElement("td");
      firstNameCell.textContent = data.name;

      // 创建并设置 Last Name 列
      const lastNameCell = document.createElement("td");
      lastNameCell.textContent = data.description;

      // 创建并设置 Actions 列
      const actionsCell = document.createElement("td");
      const editLink = document.createElement("a");
      editLink.href = "#";
      editLink.className = "link-info";
      editLink.textContent = "編輯";
      editLink.setAttribute("href", `http://127.0.0.1:5500/edit.html?id=${data.id}`);

      const deleteLink = document.createElement("a");
      deleteLink.href = "#";
      deleteLink.className = "link-secondary";
      deleteLink.textContent = "刪除";
      deleteLink.setAttribute("data-num", data.id);
      deleteLink.onclick = function (event) {
        deleteBtn(event);
      };

      actionsCell.appendChild(editLink);
      actionsCell.appendChild(deleteLink);

      // 添加所有列到行
      row.appendChild(idCell);
      row.appendChild(firstNameCell);
      row.appendChild(lastNameCell);
      row.appendChild(actionsCell);

      // 添加行到表格的 tbody
      tableBody.appendChild(row);
    });
  });
}
tableData();


// 新增景點
function addBtn() {
  if (addTitle.value !== "" || addContent.value !== "") {
    axios
      .post(`http://localhost:3000/views`, {
        name: addTitle.value,
        description: addContent.value,
      })
      .then(function (response) {
        console.log(response);
        alert("新增成功!");
        addTitle.value = "";
        addContent.value = "";
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

let editId;
let editContent = document.querySelector('.editContent');
let editTitle = document.querySelector('.editTitle');
  //編輯景點
  editId = location.href.split('=')[1];
  if(window.location.href == `http://127.0.0.1:5500/edit.html?id=${editId}`){
    axios.get(`http://localhost:3000/views/${editId}`)
    .then(function (response) {
      console.log(response)
      editTitle.value = JSON.stringify(response.data.name).replace(/^"(.*)"$/, '$1');
      editContent.value = JSON.stringify(response.data.description).replace(/^"(.*)"$/, '$1');
    })
    .catch(function (error) {
      console.log(error);
    })
  }

function editCheckBtn(e){
  editId = location.href.split("=")[1];
  e.preventDefault();
  if (editTitle.value !== '' || editContent.value !== '') {
      axios.patch(`http://localhost:3000/views/${editId}`, {
          "name": editTitle.value,
          "description": editContent.value
      })
          .then(function (response) {
              console.log(response);
              alert('修改成功!');
          })
          .catch(function (error) {
              console.log(error);
              alert('修改失敗!');
          });
  }
}

// 刪除景點
function deleteBtn(e) {
  if (e.target.classList.contains("delete")) {
    e.preventDefault();
    alert("已刪除!");
  }
  let num = e.target.getAttribute("data-num");
  axios
    .delete(`http://localhost:3000/views/${num}`)
    .then(function (response) {
      alert("已刪除!");
      tableData();
    })
    .catch(function (error) {
      console.log(error.response);
    });
}
