export function initSky() {
  const sky = document.getElementById("sky");
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");
  const stars = document.getElementById("stars");
  const shootingStar = document.getElementById("shooting-star");
  const clouds = document.querySelectorAll(".cloud");
  const langSelect = document.getElementById("lang-select");

  function createStars(count = 30) {
    if (!stars) return;
    stars.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      stars.appendChild(star);
    }
  }

  function animateShootingStar() {
    if (!shootingStar) return;

    const startY = Math.random() * 30 + 20; 
    const startX = Math.random() * 50 + 10;

    gsap.set(shootingStar, {
      top: `${startY}px`,
      left: `${startX}%`,
      opacity: 0,
      x: 0,
      y: 0
    });

    gsap.to(shootingStar, {
      opacity: 1,
      duration: 0.2,
      onComplete: () => {
        gsap.to(shootingStar, {
          x: 400,
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out"
        });
      }
    });

    const next = Math.random() * 10000 + 10000;
    setTimeout(animateShootingStar, next);
  }

  function getHour(tz = 'local') {
    const now = tz === "local"
      ? new Date()
      : new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
    return now.getHours();
  }

  function isNight(hour) {
    return hour >= 20 || hour < 6;
  }

  function animateSky(hour) {
    if (!sky) return;

    if (hour >= 6 && hour < 10) {
      sky.style.background = "#fbe8a6"; 
    } else if (hour >= 10 && hour < 17) {
      sky.style.background = "#aee1f9"; 
    } else if (hour >= 17 && hour < 20) {
      sky.style.background = "#fbb26a"; 
    } else {
      sky.style.background = "#1e2746"; 
    }

    if (isNight(hour)) {
      gsap.to(sun, { opacity: 0 });
      gsap.to(moon, { opacity: 1, y: 0 });
      gsap.to(stars, { opacity: 0.7 });
      createStars(30);
      animateShootingStar();
    } else {
      gsap.to(sun, { opacity: 1 });
      gsap.to(moon, { opacity: 0 });
      gsap.to(stars, { opacity: 0 });
    }

    clouds.forEach((cloud, i) => {
      gsap.to(cloud, {
        x: i % 2 === 0 ? 100 : -100,
        duration: 60,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }

  function updateSky() {
    const timezone =
      langSelect?.value === "ja" ? "Asia/Tokyo" :
      langSelect?.value === "zh" ? "Asia/Shanghai" :
      langSelect?.value === "en" ? "America/New_York" :
      "Europe/Paris";

    const hour = getHour(timezone);
    animateSky(hour);
  }

  updateSky();
  setInterval(updateSky, 60000);
  langSelect?.addEventListener("change", updateSky);
}
