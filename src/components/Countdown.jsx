import { useEffect, useState } from "react";

function formatTimeLeft(expiryDate) {
  const now = new Date().getTime();
  const end = new Date(expiryDate).getTime();
  const diff = Math.max(0, end - now);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function Countdown({ expiryDate }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!expiryDate) return;

    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate) return null;

  const { hours, minutes, seconds } = formatTimeLeft(expiryDate);

  if (hours === 0 && minutes === 0 && seconds === 0) return null;

  return (
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
}

export default Countdown;
