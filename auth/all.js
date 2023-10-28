//取得貼文
// 找到要更新的元素
const userCardsContainer = document.getElementById("user-cards");
const userBackCardsContainer = document.getElementById("user-back-cards");
const currentUrl = window.location.href;
let isBackList = currentUrl.includes("backendList");

function getList() {
  axios
    .get(`http://localhost:3000/views`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log(response.data);
      let userData = response.data;
      // 更新元素的内容
      // 遍历 userData 数组，为每个用户创建一个卡片
      userData.forEach((data) => {
        const cardBorder = document.createElement("div");
        cardBorder.className = "card me-3";
        cardBorder.style = "width: 18rem;";

        const cardDiv = document.createElement("div");
        cardDiv.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = data.name;

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = data.description;

        const detailButton = document.createElement("button");
        detailButton.type = "button";
        detailButton.className = "btn btn-primary detail";
        detailButton.setAttribute("data-id", data.id);
        detailButton.setAttribute("href", `listDetail.html?id=${data.id}`);
        detailButton.textContent = "看詳細";
        // 添加事件监听器到每个按钮
        detailButton.addEventListener("click", function (event) {
          clickedButton = event.target; // 保存点击按钮的引用
          const id = event.target.getAttribute("data-id");
          console.log(id);
          showDetail(id);
        });
        cardDiv.appendChild(cardTitle);
        cardDiv.appendChild(cardText);
        cardDiv.appendChild(detailButton);
        cardBorder.appendChild(cardDiv);

        if (isBackList) {
          userBackCardsContainer.appendChild(cardBorder);
        } else {
          userCardsContainer.appendChild(cardBorder);
        }
      });
    })
    .catch(function (error) {
      let errorMsg = error;
    });
}
getList();

// 渲染db.json
function showDetail(id) {
  console.log(id);
  if (isBackList) {
    axios
      .get(`http://localhost:3000/views/${id}`)
      .then(function (response) {
        console.log(response.data);
        //   detail.textContent  = response.data;
        localStorage.setItem("spotDetails", JSON.stringify(response.data));
        location.href = "http://127.0.0.1:5500/backendListDetail.html";
      })
      .catch(function (error) {
        //   console.log(error.response);
      });
  } else {
    axios
      .get(`http://localhost:3000/views/${id}`)
      .then(function (response) {
        console.log(response.data);
        //   detail.textContent  = response.data;
        localStorage.setItem("spotDetails", JSON.stringify(response.data));
        location.href = "http://127.0.0.1:5500/listDetail.html";
      })
      .catch(function (error) {
        //   console.log(error.response);
      });
  }
}
