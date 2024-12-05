let formmain = document.getElementById("formmain");
let searchinput = document.getElementById("searchinput");
let isDarkMode = false;

document.querySelector(".theme-switch").addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);

  const modeText = isDarkMode ? "LIGHT" : "DARK";
  document.querySelector(".theme-label").textContent = modeText;

  const toggleIcon = document.getElementById("theme-toggle");
  toggleIcon.src = isDarkMode ? "./images/002-sun.svg" : "./images/moon.svg";
  toggleIcon.alt = isDarkMode ? "sun" : "moon";
});

formmain.addEventListener("submit", (e) => {
  e.preventDefault();
  getData();
});

async function getData() {
  try {
    let username = searchinput.value.trim();
    if (!username) {
      showError("no username.");
      return;
    }
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
      showError("User not found. Please try another username.");
      return;
    }
    const data = await res.json();
    renderToHtml(data);
  } catch (error) {
    console.error(error);
    showError("Something went wrong. Please try again later.");
  }
}

function renderToHtml(data) {
  clearError();
  let container = document.querySelector(".profile-section");

  container.innerHTML = `
        <div class="avatar-wrapper">
            <img class="avatar-img" src="${data.avatar_url}" alt="${
    data.name || "User's avatar"
  }" />
        </div>
        <div class="profile-info">
            <div class="profile-header">
                <div class="info-header">
                    <div class="name-container">
                        <h3 class="profile-name">${data.name || "No Name"}</h3>
                        <h3 class="profile-username">@${data.login}</h3>
                    </div>
                    <div class="join-date">
                        <h3 class="join-label">Joined ${new Date(
                          data.created_at
                        ).toDateString()}</h3>
                    </div>
                </div>
                <div>
                    <h3 class="bio-text">${
                      data.bio || "This profile has no bio"
                    }</h3>
                </div>
            </div>
            <div class="stats-box">
                <div class="stat-item">
                    <h2 class="stat-title">Repos</h2>
                    <h4 class="stat-value">${data.public_repos}</h4>
                </div>
                <div class="stat-item">
                    <h2 class="stat-title">Followers</h2>
                    <h4 class="stat-value">${data.followers}</h4>
                </div>
                <div class="stat-item">
                    <h2 class="stat-title">Following</h2>
                    <h4 class="stat-value">${data.following}</h4>
                </div>
            </div>
            <div class="contact-section">
                <div class="contact-row">
                    <div class="contact-item">
                        <img src="./images/003-pin.svg" alt="location" />
                        <h3 class="contact-text">${
                          data.location || "Not Available"
                        }</h3>
                    </div>
                    <div class="contact-item">
                        <img src="./images/002-url.svg" alt="website" />
                        <h3 class="contact-text">
                            ${
                              data.blog
                                ? `<a href="${data.blog}" target="_blank" rel="noopener noreferrer">${data.blog}</a>`
                                : "Not Available"
                            }
                        </h3>
                    </div>
                </div>
                <div class="contact-row">
                    <div class="contact-item">
                        <img src="./images/004-twitter.svg" alt="twitter" />
                        <h3 class="contact-text">${
                          data.twitter_username || "Not Available"
                        }</h3>
                    </div>
                    <div class="contact-item">
                        <img src="./images/001-office-building.svg" alt="company" />
                        <h3 class="contact-text">${
                          data.company || "Not Available"
                        }</h3>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showError(message) {
  clearError();
  searchinput.style.position = "relative";
  const errorSpan = document.createElement("span");
  errorSpan.textContent = message;
  errorSpan.className = "error-message";
  errorSpan.style.position = "absolute";
  errorSpan.style.right = "150px";
  errorSpan.style.top = "50%";
  errorSpan.style.transform = "translateY(-50%)";
  errorSpan.style.color = "red";
  errorSpan.style.fontSize = "15px";
  errorSpan.style.fontWeight = "bold";
  const parent = searchinput.parentElement;
  parent.style.position = "relative";
  parent.appendChild(errorSpan);
}

function clearError() {
  const errorSpan = document.querySelector(".error-message");
  if (errorSpan) errorSpan.remove();
  searchinput.style.border = "";
}
