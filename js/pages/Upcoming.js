<!DOCTYPE html>
<html>
<head>
  <title>Upcoming Levels</title>
  <style>
    .level-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      margin: 12px;
      max-width: 300px;
      display: inline-block;
      vertical-align: top;
      text-align: center;
    }
    .level-card img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>Upcoming Levels</h1>
  <div id="upcoming-levels"></div>

  <script>
    fetch('data/upcoming.json')
      .then(response => response.json())
      .then(levels => {
        const container = document.getElementById('upcoming-levels');
        levels.forEach(level => {
          const card = document.createElement('div');
          card.className = 'level-card';
          card.innerHTML = `
            <h2>${level.name}</h2>
            <img src="${level.image}" alt="${level.name}">
            <p><strong>Current Record:</strong> ${level.currentRecord}</p>
          `;
          container.appendChild(card);
        });
      })
      .catch(err => {
        document.getElementById('upcoming-levels').textContent = 'Error loading upcoming levels.';
        console.error(err);
      });
  </script>
</body>
</html>
