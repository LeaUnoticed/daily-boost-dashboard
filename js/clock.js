export function updateClock(timezone = Intl.DateTimeFormat().resolvedOptions().timeZone) {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minDeg = minutes * 6;
  const secDeg = seconds * 6;

  gsap.to("#hand-hour", { rotation: hourDeg, duration: 0.5, ease: "power2.out" });
  gsap.to("#hand-minute", { rotation: minDeg, duration: 0.5, ease: "power2.out" });
  gsap.to("#hand-second", { rotation: secDeg, duration: 0.3, ease: "power1.out" });
}
