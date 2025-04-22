async function fetchWaitTimes() {
  try {
    const response = await fetch("https://queue-times.com/parks/6/queue_times.json");
    const data = await response.json();
    const rides = data.lands.flatMap(land => land.rides);
    rides.sort((a, b) => a.wait_time - b.wait_time);

    const container = document.getElementById("attractions");
    container.innerHTML = rides.map(ride => `
      <div class="ride">
        <div>${ride.name}</div>
        <div class="wait">${ride.wait_time} min</div>
      </div>
    `).join("");
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    document.getElementById("attractions").innerText = "Erro ao carregar dados.";
  }
}

fetchWaitTimes();
setInterval(fetchWaitTimes, 300000); // Atualiza a cada 5 minutos
