document.addEventListener("DOMContentLoaded", () => {
  const earL = document.querySelector('.ear.left');
  const earR = document.querySelector('.ear.right');
  const eyes = document.querySelectorAll('.eye');
  const dialog = document.getElementById("bunny-dialog");

  if (earL && earR) {
    gsap.to(earL, {
      rotate: 8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(earR, {
      rotate: -8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  if (eyes.length > 0) {
    setInterval(() => {
      eyes.forEach(eye => eye.style.height = '1px');
      setTimeout(() => {
        eyes.forEach(eye => eye.style.height = '6px');
      }, 150);
    }, 4000);

    document.addEventListener('mousemove', (e) => {
      eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const angle = Math.atan2(dy, dx);
        eye.style.transform = `translate(${Math.cos(angle) * 2}px, ${Math.sin(angle) * 2}px)`;
      });
    });
  }

  if (dialog) {
    setInterval(() => {
      dialog.textContent = "Rabbit : Think about take a break .. ";
      dialog.style.display = 'block';
      gsap.fromTo(dialog, { opacity: 0 }, { opacity: 1, duration: 0.5 });

      setTimeout(() => {
        gsap.to(dialog, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            dialog.style.display = 'none';
          }
        });
      }, 4000);
    }, 95000);
  }
});
