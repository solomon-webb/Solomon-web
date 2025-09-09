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
   function filterPosts() {
         
          document.getElementById("GOSPEL").style.display = "none";
   }