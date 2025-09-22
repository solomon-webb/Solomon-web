function showLogin() {
      document.getElementById("loginForm").style.display = "block";
      document.getElementById("registerForm").style.display = "none";
      document.getElementById("homePage").style.display = "none";
    }
    function showRegister() {
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("registerForm").style.display = "block";
      document.getElementById("homePage").style.display = "none";
    }
    function goHome() {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const user = JSON.parse(localStorage.getItem(loggedInUser));
        document.getElementById("usernameDisplay").innerText = user.username;
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("homePage").style.display = "block";
      } else {
        alert("Please login to access the home page.");
        showLogin();
      }
    }
    function registerUser() {
      const username = document.getElementById("registerUsername").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;

      if (localStorage.getItem(email)) {
        alert("User already exists!");
        return false;
      }

      const user = { username, email, password };
      localStorage.setItem(email, JSON.stringify(user));
      alert(`Welcome ${username}! Registration successful! Please login.`);
      showLogin();
      return false;
    }

    function loginUser() {
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const user = JSON.parse(localStorage.getItem(email));

      if (user && user.password === password) {
        localStorage.setItem("loggedInUser", email);
          alert("Login successful!");
        document.getElementById("usernameDisplay").innerText = user.username;
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("homePage").style.display = "block";
        document.getElementById("authButtons").style.display = "none";
        document.getElementById("logoutBtn").style.display = "inline-block";
         document.getElementById("ca").style.display = "block";
      } else {
        alert("Invalid email or password.");
      }

      return false;
    }

    function logout() {
      localStorage.removeItem("loggedInUser");
      document.getElementById("homePage").style.display = "none";
      showLogin();
      document.getElementById("authButtons").style.display = "inline-block";
      document.getElementById("logoutBtn").style.display = "none";
      document.getElementById("ca").style.display = "none";
    }

    window.onload = function () {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const user = JSON.parse(localStorage.getItem(loggedInUser));
        document.getElementById("usernameDisplay").innerText = user.username;
        document.getElementById("homePage").style.display = "block";
        document.getElementById("authButtons").style.display = "none";
        document.getElementById("logoutBtn").style.display = "inline-block";
        document.getElementById("loginForm").style.display = "none";
         document.getElementById("ca").style.display = "block";
        document.getElementById("registerForm").style.display = "none";
      } else {
        showRegister();
      }
    };
 
  // Populate days (1-31)
  const daySelect = document.getElementById('day');
  for (let i = 1; i <= 31; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.text = i;
    if (i === 5) option.selected = true;
    daySelect.appendChild(option);
  }

  // Populate years (e.g. 1900 to 2024)
  const yearSelect = document.getElementById('year');
  for (let year = 1900; year <= new Date().getFullYear(); year++) {
    let option = document.createElement('option');
    option.value = year;
    option.text = year;
    if (year === 1931) option.selected = true;
    yearSelect.appendChild(option);
  }
   document.getElementById("years").textContent = new Date().getFullYear();

   function showssRegister() {
    document.getElementById("registerForm").style.display = "block";
     document.getElementById("loginForm").style.display = "none";
     document.getElementById("homePage").style.display = "none";
     document.getElementById("logoutBtn").style.display = "none";
     document.getElementById("ca").style.display = "none";
   }

   function showhome() {
     document.getElementById("registerForm").style.display = "none";
     document.getElementById("loginForm").style.display = "none";
     document.getElementById("homePage").style.display = "block";
     document.getElementById("logoutBtn").style.display = "none";
      document.getElementById("ca").style.display = "block";
   }
  
    const API_BASE = "https://discoveryprovider.audius.co/v1";

    // Search button
    document.getElementById("search-btn").addEventListener("click", () => {
      const query = document.getElementById("search-box").value;
      if (query.trim() !== "") {
        searchAudius(query);
      }
    });

    // Fetch trending songs on page load
    window.onload = () => {
      loadTrending();
    };

    async function searchAudius(query) {
      const response = await fetch(`${API_BASE}/tracks/search?query=${encodeURIComponent(query)}&app_name=myapp`);
      const data = await response.json();
      displayTracks(data.data, "results");
    }

    async function loadTrending() {
      const response = await fetch(`${API_BASE}/tracks/trending?app_name=myapp`);
      const data = await response.json();
      displayTracks(data.data, "trending");
    }

    function displayTracks(tracks, containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = "";

      if (tracks.length === 0) {
        container.innerHTML = "<p>No songs found.</p>";
        return;
      }

      tracks.forEach(track => {
        const title = track.title;
        const artist = track.user ? track.user.name : "Unknown Artist";
        const artwork = track.artwork ? track.artwork['480x480'] : "https://via.placeholder.com/250";
        const streamUrl = `${API_BASE}/tracks/${track.id}/stream?app_name=myapp`;

        const trackDiv = document.createElement("div");
        trackDiv.classList.add("track");

        trackDiv.innerHTML = `
          <img src="${artwork}" alt="${title}">
          <h4>${title}</h4>
          <p>👤 ${artist}</p>
          <audio controls>
            <source src="${streamUrl}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
          <a class="download-btn" href="${streamUrl}" download="${title}.mp3">⬇ Download</a>
        `;

        container.appendChild(trackDiv);
      });
    }
