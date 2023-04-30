const $ = selector => document.querySelector(selector);

const formatTime = seconds => {
  const [hours, minutes, remainingSeconds] = [
    Math.floor(seconds / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60
  ];

  return [hours, minutes, remainingSeconds]
    .map(value => value.toString().padStart(2, '0'))
    .join(':');
};

const createTimer = timerEl => seconds => {
  let startTimestamp = null;
  let requestId = null;

  const updateTimer = timestamp => {
    if (!startTimestamp) {
      startTimestamp = timestamp;
    }

    const elapsed = Math.floor((timestamp - startTimestamp) / 1000);

    if (seconds - elapsed >= 0) {
      timerEl.textContent = formatTime(seconds - elapsed);
      requestId = requestAnimationFrame(updateTimer);
    } else {
      cancelAnimationFrame(requestId);
      startTimestamp = null;
    }
  };

  requestId = requestAnimationFrame(updateTimer);
};

const initTimer = (inputEl, buttonEl, timerEl) => {
  inputEl.addEventListener('input', () =>
    (inputEl.value = inputEl.value.replace(/\D/g, ''))
  );

  buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);
    if (isNaN(seconds)) {
      alert('Please enter a valid number');
    } else {
      createTimer(timerEl)(seconds);
      inputEl.value = '';
    }
  });
};

initTimer($('input'), $('button'), $('span'));