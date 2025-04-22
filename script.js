
async function fetchWaitTimes() {
  const res = await fetch("https://queue-times.com/parks/6/queue_times.json");
  const data = await res.json();
  const rides = data.lands.flatMap(land => land.rides);
  rides.sort((a, b) => a.wait_time - b.wait_time);

  const container = document.getElementById("attractions");
  container.innerHTML = rides.map(ride => `
    <div class="ride">
      <div>${ride.name}</div>
      <div class="wait">${ride.wait_time} min</div>
    </div>
  `).join("");
}
fetchWaitTimes();
setInterval(fetchWaitTimes, 300000); // atualiza a cada 5 minutos
