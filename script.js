// Task 1: Basic Button Interaction
function showMessage() {
  alert("Hello, Muhammad Omair! 👋 Welcome back to your enhanced web project!");
  document.getElementById("afterClick").innerText =
    "🎉 You clicked the button successfully!";
}

// Task 2: Form Validation
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  if (!name || !email || !message) {
    status.style.color = "red";
    status.innerText = "Please fill all fields before submitting.";
    return false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    status.style.color = "red";
    status.innerText = "Please enter a valid email address.";
    return false;
  }

  status.style.color = "green";
  status.innerText = "Message sent successfully!";
  return false; // stop actual submit
}

// Task 3: Weather API Fetch
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim() || "Delhi";
  const weatherBox = document.getElementById("weatherContainer");
  weatherBox.innerHTML = "⏳ Fetching weather data...";

  try {
    // Using free public weather API (no key required)
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    const res = await fetch(url);
    const data = await res.json();

    const area = data.nearest_area[0].areaName[0].value;
    const temp = data.current_condition[0].temp_C;
    const desc = data.current_condition[0].weatherDesc[0].value;
    const humidity = data.current_condition[0].humidity;
    const wind = data.current_condition[0].windspeedKmph;

    weatherBox.innerHTML = `
      <h3>Weather in ${area}</h3>
      <p><strong>${temp}°C</strong> — ${desc}</p>
      <p>Humidity: ${humidity}% • Wind: ${wind} km/h</p>
    `;
  } catch (error) {
    console.error(error);
    weatherBox.innerHTML =
      "❌ Unable to fetch weather data. Please check the city name or try again later.";
  }
}

/* ===================== TASK 4 CODE (ADDED) ===================== */

/* To-Do (localStorage) */
function addTask() {
  const input = document.getElementById("todoInput");
  const text = input && input.value.trim();
  if (!text) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(text);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("todoList");
  if (!list) return;
  list.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${escapeHtml(t)}</span>
      <button onclick="deleteTask(${i})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteTask(i) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

/* small helper for safety */
function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* Product list (filter + sort) */
const products = [
  { name: "Laptop", price: 50000, category: "electronics" },
  { name: "Chair", price: 1500, category: "furniture" },
  { name: "T-Shirt", price: 800, category: "clothes" },
  { name: "Mobile", price: 20000, category: "electronics" },
  { name: "Sofa", price: 10000, category: "furniture" }
];

function displayProducts(items) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = "";

  items.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${escapeHtml(p.name)}</h3>
      <p>₹${p.price}</p>
      <small>${escapeHtml(p.category)}</small>
    `;
    grid.appendChild(card);
  });
}

function applyFilters() {
  const categoryElem = document.getElementById("categoryFilter");
  const sortElem = document.getElementById("sortFilter");
  if (!categoryElem || !sortElem) return;

  const category = categoryElem.value;
  const sort = sortElem.value;

  let filtered = products.filter(p => (category === "all" ? true : p.category === category));

  if (sort === "low-high") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high-low") filtered.sort((a, b) => b.price - a.price);

  displayProducts(filtered);
}

/* initialize Task 4 things on page load */
document.addEventListener("DOMContentLoaded", function () {
  renderTasks();
  displayProducts(products);
});
