let articles;
fetchAndShowNews();

async function fetchAndShowNews(search) {
  let req = await fetch(
    `https://newsapi.org/v2/everything?q=${
      search || "tesla"
    }&from=2023-12-14&sortBy=publishedAt&apiKey=fe2ddac88c864b77adcaf4cc0ad8f0d4`
  );

  let res = await req.json();
  articles = res.articles;
  displayNews();
}

document.getElementById("searchInput").addEventListener("keyup", function (e) {
  fetchAndShowNews(e.target.value);
});

function displayNews() {
  let insideContent = "";
  for (let i = 0; i < articles.length; i++) {
    insideContent += `<div class="col-md-4 px-0 rounded-2 text-dark mt-3">
    <div class="p-3 h-100">
        <a href="${articles[i].url}" target="_blank">
            <img class="w-100 overflow-hidden rounded-top-2" src=${
              articles[i].urlToImage
            } onerror="this.src='./images/1000_F_496954562_9C2JX5dibr16MA70ANfrzM2iJnHSPfg3.jpg'" alt="">
            <div class="describtion bg-light-subtle  text-dark p-2 fs-5">${
              articles[i].title
            }</div>
        </a>
        <div class="p-2 d-flex justify-content-between align-items-center border-top bg-light-subtle ">
          <span class="fw-bold">
              <span class="author text-info"><i class="fa-solid fa-arrow-right"></i></span>
          </span> <span class="date fw-semibold">${articles[
            i
          ].publishedAt.slice(0, 10)}</span>
        </div>
    </div>
</div>`;
  }
  document.querySelector(".row").innerHTML = insideContent;
}
