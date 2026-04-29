// ===== Pixel 风格模拟时钟 =====
const canvas = document.getElementById('clock-canvas');
const ctx = canvas.getContext('2d');
const size = 270;
const center = size / 2;
const radius = center - 16;

function drawAnalogClock() {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ms = now.getMilliseconds();

  // 平滑秒针角度 (连续扫秒, 仿 Pixel)
  const secondAngle = (seconds + ms / 1000) * 6;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const hourAngle = (hours + minutes / 60) * 30;

  ctx.clearRect(0, 0, size, size);

  // ---- 外圈 ----
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.20)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // ---- 时针 ----
  const hLen = radius * 0.50;
  const hWidth = 3;
  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.lineTo(
    center + hLen * Math.sin(hourAngle * Math.PI / 180),
    center - hLen * Math.cos(hourAngle * Math.PI / 180)
  );
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = hWidth;
  ctx.lineCap = 'round';
  ctx.stroke();

  // ---- 分针 ----
  const mLen = radius * 0.68;
  const mWidth = 2;
  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.lineTo(
    center + mLen * Math.sin(minuteAngle * Math.PI / 180),
    center - mLen * Math.cos(minuteAngle * Math.PI / 180)
  );
  ctx.strokeStyle = 'rgba(255,255,255,0.70)';
  ctx.lineWidth = mWidth;
  ctx.lineCap = 'round';
  ctx.stroke();

  // ---- 秒针 ----
  const sLen = radius * 0.78;
  const sWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.lineTo(
    center + sLen * Math.sin(secondAngle * Math.PI / 180),
    center - sLen * Math.cos(secondAngle * Math.PI / 180)
  );
  ctx.strokeStyle = 'rgba(255, 200, 100, 0.80)';
  ctx.lineWidth = sWidth;
  ctx.lineCap = 'round';
  ctx.stroke();

  // ---- 中心圆点 ----
  ctx.beginPath();
  ctx.arc(center, center, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.80)';
  ctx.fill();

  // 中心小点
  ctx.beginPath();
  ctx.arc(center, center, 1.2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 200, 100, 0.60)';
  ctx.fill();
}

// ===== 数码时钟 =====
function updateDigitalClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('digital-clock').textContent = `${h}:${m}:${s}`;
}

// ===== 天气 =====
const weatherIcon = document.getElementById('weather-icon');
const weatherTemp = document.getElementById('weather-temp');

// WMO 天气编码 → emoji
const weatherEmoji = {
  0: '☀️',   // 晴
  1: '🌤️', // 大部晴
  2: '⛅',         // 多云
  3: '☁️',   // 阴
  45: '🌫️', // 雾
  48: '🌫️', // 雾凇
  51: '🌦️', // 小毛毛雨
  53: '🌦️', // 中毛毛雨
  55: '🌦️', // 大毛毛雨
  61: '🌧️', // 小雨
  63: '🌧️', // 中雨
  65: '🌧️', // 大雨
  71: '❄️',   // 小雪
  73: '❄️',   // 中雪
  75: '❄️',   // 大雪
  80: '🌨️', // 阵雨
  81: '🌨️', // 中阵雨
  82: '🌨️', // 大阵雨
  95: '⛈️',   // 雷暴
  96: '⛈️',   // 雷暴+小冰雹
  99: '⛈️',   // 雷暴+大冰雹
};

async function fetchWeather() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=33.75&longitude=105.72&current_weather=true'
    );
    if (!res.ok) return;
    const data = await res.json();
    const w = data.current_weather;
    const emoji = weatherEmoji[w.weathercode] || '☁️';
    weatherIcon.textContent = emoji;
    weatherTemp.textContent = `${Math.round(w.temperature)}°`;
  } catch (_) {
    // 静默失败, 保持上次数据显示
  }
}

fetchWeather();
setInterval(fetchWeather, 30 * 60 * 1000); // 每30分钟刷新

// ===== 时钟切换 =====
let clockMode = 'digital';
const digitalClock = document.getElementById('digital-clock');
const analogClock = document.getElementById('analog-clock');
const toggleBtn = document.getElementById('toggle-clock');

toggleBtn.addEventListener('click', () => {
  if (clockMode === 'digital') {
    clockMode = 'analog';
    digitalClock.style.opacity = '0';
    digitalClock.style.transform = 'scale(0.9)';
    setTimeout(() => {
      digitalClock.style.display = 'none';
      analogClock.style.display = 'flex';
      requestAnimationFrame(() => {
        analogClock.style.opacity = '1';
        analogClock.style.transform = 'scale(1)';
      });
    }, 300);
    // 切换按钮图标: 变回时钟图标 (数字模式)
    toggleBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
    </svg>`;
  } else {
    clockMode = 'digital';
    analogClock.style.opacity = '0';
    analogClock.style.transform = 'scale(0.9)';
    setTimeout(() => {
      analogClock.style.display = 'none';
      digitalClock.style.display = 'flex';
      requestAnimationFrame(() => {
        digitalClock.style.opacity = '1';
        digitalClock.style.transform = 'scale(1)';
      });
    }, 300);
    // 切换按钮图标: 变成模拟时钟图标
    toggleBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 3"/>
    </svg>`;
  }
});

// ===== 搜索功能 =====
document.getElementById('search-btn').addEventListener('click', () => {
  const query = document.getElementById('search-input').value;
  if (query) {
    window.open('https://www.google.com/search?q=' + encodeURIComponent(query));
  }
});

document.getElementById('search-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('search-btn').click();
  }
});

// ===== 主循环 =====
function tick() {
  updateDigitalClock();
  drawAnalogClock();
  requestAnimationFrame(tick);
}

// 初始样式
digitalClock.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
analogClock.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
analogClock.style.display = 'none';

tick();
