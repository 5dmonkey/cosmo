const fileInput = document.getElementById('fileInput');
const gridPreview = document.getElementById('gridPreview');
const listView = document.getElementById('listView');
const emptyState = document.getElementById('emptyState');
const postCount = document.getElementById('postCount');

let items = [];
let draggedId = null;

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function render() {
  gridPreview.innerHTML = '';
  listView.innerHTML = '';
  postCount.textContent = items.length;
  emptyState.style.display = items.length ? 'none' : 'block';
  gridPreview.classList.toggle('empty', items.length === 0);

  items.forEach((item, index) => {
    const tile = document.createElement('div');
    tile.className = 'grid-tile';
    tile.innerHTML = `<img src="${item.src}" alt="Grid image ${index + 1}" />`;
    gridPreview.appendChild(tile);

    const card = document.createElement('div');
    card.className = 'list-card';
    card.draggable = true;
    card.dataset.id = item.id;
    card.innerHTML = `
      <div class="thumb"><img src="${item.src}" alt="Upload ${index + 1}" /></div>
      <div class="meta">
        <strong>Post ${index + 1}</strong>
        <span>Drag to move this in your grid</span>
      </div>
      <div class="actions">
        <button class="grip" type="button" aria-label="Drag">⋮⋮</button>
        <button class="remove-btn" type="button" aria-label="Remove">×</button>
      </div>
    `;

    card.addEventListener('dragstart', () => {
      draggedId = item.id;
      card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
      draggedId = null;
      card.classList.remove('dragging');
    });

    card.addEventListener('dragover', (e) => e.preventDefault());
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!draggedId || draggedId === item.id) return;
      const from = items.findIndex((x) => x.id === draggedId);
      const to = items.findIndex((x) => x.id === item.id);
      const [moved] = items.splice(from, 1);
      items.splice(to, 0, moved);
      render();
    });

    card.querySelector('.remove-btn').addEventListener('click', () => {
      items = items.filter((x) => x.id !== item.id);
      render();
    });

    listView.appendChild(card);
  });
}

fileInput.addEventListener('change', async (event) => {
  const files = Array.from(event.target.files || []);
  for (const file of files) {
    const src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    items.push({ id: uid(), src });
  }
  render();
  fileInput.value = '';
});

render();
