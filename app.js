$(document).ready(function () {
  const duration = 400;
  $(".result-js").fadeOut(0);
  document.getElementById("search-btn").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    if (username) {
      $(".container-search").fadeOut(duration);
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((data) => showRepos(data))
        .catch((error) => console.error("Error fetching data:", error));
      setTimeout(() => {
        $(".result-js").fadeIn(duration);
      }, duration * 2 + 150);
    }
  });

  function showRepos(repos) {
    const repoList = document.getElementById("repo-list");
    const repoCon = document.querySelector(".result-js");
    repoList.innerHTML = "";
    const repoBtn = document.createElement("button");
    repoBtn.classList = "container-result_backToSearch back-js";
    repoBtn.textContent = "👈";
    repoCon.appendChild(repoBtn);
    if (repos.message == "Not Found") {
      const repoElement = document.createElement("div");
      repoElement.className = "repo-empty";
      repoElement.innerHTML = `
        <p>No elements to display...<p>
    `;
      repoList.appendChild(repoElement);
    } else {
      repos.forEach((repo) => {
        const repoElement = document.createElement("a");
        repoElement.className = "repo-element";
        repoElement.setAttribute("href", `${repo.html_url}`);
        repoElement.setAttribute("target", "_blank");
        repoElement.innerHTML = `
        <div>
        <h2 class='repo-element_name'>${repo.name}</h2>
        ${
          repo.language !== null
            ? `<p>Main language: <b>${repo.language}</b></p>`
            : ""
        }
        <p class='repo-element_description'>${
          repo.description || "No description available"
        }</p>
        </div>
        <div>
          <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 👀 ${
          repo.watchers_count
        }</p>
        </div>
      `;
        repoList.appendChild(repoElement);
      });
    }
  }

  $(".result-js").on("click", ".back-js", function () {
    $("#username").val("");
    $(".result-js").fadeOut(duration);
    setTimeout(() => {
      $(".search-js").fadeIn(duration);
    }, duration * 2 + 150);
  });
});
