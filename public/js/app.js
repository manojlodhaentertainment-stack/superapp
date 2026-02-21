document.addEventListener('DOMContentLoaded', () => {
  // AI chat
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBox = document.getElementById('chat');

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;
    appendChat('You', message);
    chatInput.value = '';
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    appendChat('Assistant', data.reply);
  });

  function appendChat(who, text) {
    const el = document.createElement('div');
    el.className = 'msg';
    el.innerHTML = `<b>${who}:</b> ${escapeHtml(text)}`;
    chatBox.appendChild(el);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Video search
  const videoForm = document.getElementById('videoForm');
  const videoInput = document.getElementById('videoInput');
  const videoResults = document.getElementById('videoResults');

  videoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const q = videoInput.value.trim();
    if (!q) return;
    videoResults.innerHTML = '<li>Searching...</li>';
    const res = await fetch(`/api/videos?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    renderVideos(data.items);
  });

  function renderVideos(items) {
    videoResults.innerHTML = '';
    items.forEach(it => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${it.thumbnail}" alt="thumb"><a href="${it.url}" target="_blank">${escapeHtml(it.title)}</a>`;
      videoResults.appendChild(li);
    });
  }

  // Product search
  const productForm = document.getElementById('productForm');
  const productInput = document.getElementById('productInput');
  const productResults = document.getElementById('productResults');

  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const q = productInput.value.trim();
    if (!q) return;
    productResults.innerHTML = '<li>Searching...</li>';
    const res = await fetch(`/api/products?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    renderProducts(data.products);
  });

  function renderProducts(products) {
    productResults.innerHTML = '';
    products.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${p.image}" alt="img"><div class="prod"><a href="${p.url}" target="_blank">${escapeHtml(p.title)}</a><div class="price">$${p.price}</div></div>`;
      productResults.appendChild(li);
    });
  }

  // Tools
  document.getElementById('timerBtn').addEventListener('click', () => {
    const out = document.getElementById('toolOutput');
    out.textContent = 'Timer: 10s started';
    setTimeout(() => out.textContent = 'Timer finished ⏰', 10000);
  });

  document.getElementById('calcBtn').addEventListener('click', () => {
    const expr = prompt('Enter expression to evaluate (e.g. 2+2*3)');
    if (!expr) return;
    try {
      // Very small, safe eval: allow digits and operators only
      if (!/^[0-9+\-*/(). \t]+$/.test(expr)) throw new Error('Invalid characters');
      // eslint-disable-next-line no-eval
      const v = eval(expr);
      document.getElementById('toolOutput').textContent = `Result: ${v}`;
    } catch (err) {
      document.getElementById('toolOutput').textContent = 'Error evaluating expression';
    }
  });

  function escapeHtml(s){
    return String(s).replace(/[&"'<>]/g, (c) => ({'&':'&amp;','"':'&quot;',"'":'&#39;','<':'&lt;','>':'&gt;'}[c]));
  }
});
