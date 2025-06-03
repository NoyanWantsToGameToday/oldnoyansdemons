// Sample data: Replace or update as needed
const upcomingLevels = [
    {
        name: "Sky Fortress",
        worldRecord: "1:23.45 by SpeedRunner123"
    },
    {
        name: "Crystal Cavern",
        worldRecord: "2:01.10 by GamerGal"
    },
    {
        name: "Inferno Peak",
        worldRecord: "No record yet"
    }
];

// Function to render Upcoming Levels and World Records
function renderUpcomingPage() {
    const container = document.getElementById('main-content');
    if (!container) return;

    let html = `<h2>Upcoming Levels</h2><ul>`;
    upcomingLevels.forEach(level => {
        html += `
            <li>
                <strong>${level.name}</strong>
                <div class="world-record">World Record: ${level.worldRecord}</div>
            </li>
        `;
    });
    html += `</ul>`;

    container.innerHTML = html;
}

// Optionally export for use elsewhere if using modules
// export { renderUpcomingPage };
