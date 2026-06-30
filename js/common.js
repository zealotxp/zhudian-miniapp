/* ========================================
   竖店短剧小程序 - 公共脚本
======================================== */

// 通用返回按钮
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

// 跳转
function navigate(url) {
  window.location.href = url;
}

// Toast 提示
function showToast(msg, duration = 1500) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// 状态栏时间更新
function updateStatusBarTime() {
  const els = document.querySelectorAll('.status-bar .time');
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  els.forEach(el => el.textContent = `${h}:${m}`);
}

// 渲染公共状态栏
function renderStatusBar(dark = false) {
  return `
    <div class="status-bar ${dark ? 'dark' : ''}">
      <span class="time">9:41</span>
      <span class="icons">
        <span style="margin-right:4px">●●●●</span>
        <span style="margin-right:4px">📶</span>
        <span>🔋</span>
      </span>
    </div>
  `;
}

// 渲染顶部导航栏
function renderNavBar(title, opts = {}) {
  const { transparent = false, rightHTML = '', back = true } = opts;
  return `
    <div class="nav-bar ${transparent ? 'transparent' : ''}">
      ${back ? `<div class="nav-back" onclick="goBack()">‹</div>` : '<div style="width:32px"></div>'}
      <div class="nav-title">${title}</div>
      <div class="nav-right">${rightHTML}</div>
    </div>
  `;
}

// 渲染底部 TabBar
function renderTabBar(active = '') {
  const SVG = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
    teach: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-4.5L22 9l-10 4.5z"/><path d="M6 11v5c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-5"/><path d="M22 9v5.5"/></svg>',
    scenic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l1.8 3h-3.6z"/><path d="M8.5 5h7l-1 4h-5z"/><path d="M7.5 9h9l-1 4h-7z"/><path d="M6.5 13h11l-1 8h-9z"/><path d="M10 16h4M10 19h4"/></svg>',
    profile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>'
  };
  const tabs = [
    { key: 'home', name: '首页', url: 'index.html' },
    { key: 'teach', name: '教学', url: 'teach.html' },
    { key: 'scenic', name: '景区', url: 'scenic.html' },
    { key: 'profile', name: '我的', url: 'profile.html' }
  ];
  return `
    <div class="tab-bar">
      ${tabs.map(t => `
        <a class="tab-item ${active === t.key ? 'active' : ''}" href="${t.url}">
          <span class="tab-icon">${SVG[t.key]}</span>
          <span>${t.name}</span>
        </a>
      `).join('')}
    </div>
  `;
}

// 初始化页面（注入状态栏等）
document.addEventListener('DOMContentLoaded', () => {
  updateStatusBarTime();
  setInterval(updateStatusBarTime, 30000);
});
