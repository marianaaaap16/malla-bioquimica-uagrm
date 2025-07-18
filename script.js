fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const tabla = document.getElementById('tabla-materias');
    const filtro = document.getElementById('filtro-semestre');

    // Cargar opciones del filtro de semestre
    const semestresUnicos = [...new Set(data.map(m => m.nivel))];
    semestresUnicos.sort((a, b) => a - b);
    semestresUnicos.forEach(nivel => {
      const option = document.createElement('option');
      option.value = nivel;
      option.textContent = `Semestre ${nivel}`;
      filtro.appendChild(option);
    });

    // Función para mostrar materias
    function mostrarMaterias(filtroNivel = "") {
      tabla.innerHTML = "";
      data
        .filter(m => !filtroNivel || m.nivel == filtroNivel)
        .forEach(m => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${m.codigo}</td>
            <td>${m.nombre}</td>
            <td>${m.nivel}</td>
            <td>${m.creditos}</td>
            <td>${m.horas}</td>
            <td>${m.prerequisitos.join(", ")}</td>
          `;
          tabla.appendChild(row);
        });
    }

    filtro.addEventListener('change', e => {
      mostrarMaterias(e.target.value);
    });

    mostrarMaterias(); // mostrar todas al inicio
  });
