// Variables
const searchBar = document.querySelector(".searchbar-container");
const profileContainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noResults = get("no-results");
const btnMode = get("btn-mode");
const modeText = get("mode-text");
const modeIcon = get("mode-icon");
const btnSubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const userLocation = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;

// Event Listeners
btnSubmit.addEventListener("click", () => {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key == "enter") {
    if (input.value !== "") {
      getUserData(url + input.value);
    }
  }
});

input.addEventListener("input", () => {
  noResults.style.display = "none";
});

btnMode.addEventListener("click", () => {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

// Api call
const getUserData = (getUrl) => {
  fetch(getUrl)
    .then((Response) => Response.json())
    .then((data) => {
      updateProfile(data);
    })
    .catch((error) => {
      throw error;
    });
};

// Render
const updateProfile = (data) => {
  if (data.message !== "Not Found") {
    noResults.style.display = "none";
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }
    avatar.src = `${data.avatar_url}`;
    userName.innerText = data.name === null ? data.login : data.name;
    user.innerText = `@${data.login}`;
    user.href = `${data.html_url}`;
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${
      months[datesegments[1] - 1]
    } ${datesegments[0]}`;
    bio.innerText =
      data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    userLocation.innerText = checkNull(data.location, userLocation)
      ? data.location
      : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter)
      ? data.twitter_username
      : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter)
      ? `https://twitter.com/${data.twitter_username}`
      : "#";
    company.innerText = checkNull(data.company, company)
      ? data.company
      : "Not Available";
    searchBar.classList.toggle("active");
    profileContainer.classList.toggle("active");
  } else {
    noResults.style.display = "block";
  }
};

// Switch to dark mode - activateDarkMode()
function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modeText.innerText = "LIGHT";
  modeIcon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  console.log("darkmode changed to " + darkMode);
  localStorage.setItem("dark-mode", true);

  console.log("setting dark mode to true");
}

// Switch to light mode - activateLightMode()
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modeText.innerText = "DARK";
  modeIcon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  console.log("darkmode changed to " + darkMode);

  localStorage.setItem("dark-mode", false);
  console.log("setting dark mode to false");
}

// Initialise UI
const init = () => {
  darkMode = false;

  const value = localStorage.getItem("dark-mode");

  if (value === null) {
    localStorage.setItem("dark-mode", darkMode);
    lightModeProperties();
  } else if (value == "true") {
    darkModeProperties();
  } else if (value == "false") {
    lightModeProperties();
  }

  getUserData(url + "suman918");
};

init();
