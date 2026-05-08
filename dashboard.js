let currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "login.html";
}

// Load documents for this user
let docs = JSON.parse(localStorage.getItem("docs_" + currentUser)) || [];

// ---------------- FUNCTIONS -----------------
function uploadFile() {
  let input = document.getElementById("fileInput");
  let file = input.files[0];

  if (!file) return alert("Select file");

  let reader = new FileReader();
  reader.onload = () => {
    docs.push({ name: file.name, data: reader.result });
    localStorage.setItem("docs_" + currentUser, JSON.stringify(docs));
    showDocs();
  };
  reader.readAsDataURL(file);
}

function showDocs() {
  let list = document.getElementById("docList");
  list.innerHTML = "";

  docs.forEach((d, i) => {
    list.innerHTML += `
      <li>
        ${d.name}
        <span>
          <a href="${d.data}" download="${d.name}">Download</a>
          <button onclick="deleteDoc(${i})">X</button>
        </span>
      </li>`;
  });
}

function deleteDoc(i) {
  docs.splice(i, 1);
  localStorage.setItem("docs_" + currentUser, JSON.stringify(docs));
  showDocs();
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// Initial render
showDocs();