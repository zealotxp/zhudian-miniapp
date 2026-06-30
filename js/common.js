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
  const tabs = [
    { key: 'home', name: '首页', icon: '🏠', url: 'index.html' },
    { key: 'teach', name: '教学', icon: '📚', url: 'teach.html' },
    { key: 'scenic', name: '景区', icon: '🏞️', url: 'scenic.html' },
    { key: 'profile', name: '我的', icon: '👤', url: 'profile.html' }
  ];
  return `
    <div class="tab-bar">
      ${tabs.map(t => `
        <a class="tab-item ${active === t.key ? 'active' : ''}" href="${t.url}">
          <span class="tab-icon">${t.icon}</span>
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
