window.onload = function () {
  // Pilih semua elemen video
  var videos = document.querySelectorAll("video");

  // Buat observer untuk memantau ketika video memasuki viewport
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          // Jika video berada di viewport dan belum diputar, mulai memutar video
          if (video.paused) {
            video.muted = true; // Pastikan video dimute agar autoplay tidak terblokir
            video.play().catch(function (error) {
              console.log("Error attempting to play video:", error);
            });
          }
        }
      });
    },
    { threshold: 0.5 }
  ); // Sesuaikan threshold sesuai kebutuhan

  // Mulai mengamati setiap video
  videos.forEach(function (video) {
    observer.observe(video);
  });

  // Theme Toggler
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  // Fungsi untuk menerapkan tema
  const applyTheme = (theme) => {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      icon.classList.remove("bi-sun-fill");
      icon.classList.add("bi-moon-stars-fill");
    } else {
      body.classList.remove("dark-mode");
      icon.classList.remove("bi-moon-stars-fill");
      icon.classList.add("bi-sun-fill");
    }
  };

  // Cek tema yang tersimpan di localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  // Event listener untuk tombol toggle
  themeToggle.addEventListener("click", () => {
    let currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
    let newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });
};
