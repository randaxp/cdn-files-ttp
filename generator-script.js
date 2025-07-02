const CLIENT_ID = "874311207918-5h6o10cd3cb3jl3ruijbqoti6jf8fqua.apps.googleusercontent.com";

function uploadImage() {
  const file = document.getElementById('imageInput').files[0];
  if (!file) return alert("Pilih gambar dulu!");

  const reader = new FileReader();
  reader.onloadend = function () {
    const base64 = reader.result.replace(/^data:image\/(png|jpeg);base64,/, "");
    fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: "Client-ID ffffff", // Ganti dengan Client ID Imgur milikmu
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image: base64, type: "base64" })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Upload berhasil!");
        localStorage.setItem("apkImage", data.data.link);
      } else {
        alert("Upload gagal!");
      }
    });
  };
  reader.readAsDataURL(file);
}

function generateHTML() {
  const title = document.getElementById('title').value;
  const version = document.getElementById('version').value;
  const size = document.getElementById('size').value;
  const download = document.getElementById('downloadLink').value;
  const mirror = document.getElementById('downloadMirror').value;
  const features = document.getElementById('features').value.split("\n").map(f => "<li>" + f + "</li>").join("");
  const img = localStorage.getItem("apkImage") || "";

  const html = \`
<div class="apk-card">
  <img src="\${img}" alt="\${title}" />
  <h2>\${title}</h2>
  <ul>\${features}</ul>
  <p><b>Versi:</b> \${version}</p>
  <p><b>Ukuran:</b> \${size}</p>
  <a href="\${download}" class="btn">Download</a>
  <a href="\${mirror}" class="btn">Mirror</a>
</div>
  \`;

  document.getElementById('htmlPreview').innerText = html;
  localStorage.setItem("lastHTML", html);
}

function copyHTML() {
  navigator.clipboard.writeText(document.getElementById('htmlPreview').innerText);
  alert("HTML disalin!");
}

function exportHTML() {
  const blob = new Blob([document.getElementById('htmlPreview').innerText], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'apk-post.html';
  a.click();
}

function exportJSON() {
  const data = {
    title: document.getElementById('title').value,
    version: document.getElementById('version').value,
    size: document.getElementById('size').value,
    link: document.getElementById('downloadLink').value,
    mirror: document.getElementById('downloadMirror').value,
    features: document.getElementById('features').value,
    image: localStorage.getItem("apkImage")
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'apk-data.json';
  a.click();
}

function postToBlogger() {
  alert("Fitur posting ke Blogger akan diaktifkan di versi lanjutan JS (OAuth login dan fetch ke API).");
}
