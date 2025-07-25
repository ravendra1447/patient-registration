import { PgLite } from './pglite.mjs';

console.log("JS Loaded");

window.addEventListener("DOMContentLoaded", async () => {
  const db = new PgLite({ filename: "patients.db", persistent: true });

  async function init() {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        gender TEXT
      );`);
    await loadPatients();
  }

  document
    .getElementById("patientForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const age = parseInt(document.getElementById("age").value);
      const gender = document.getElementById("gender").value;

      if (!name || !age || !gender) return;

      await db.run(
        "INSERT INTO patients (name, age, gender) VALUES (?, ?, ?)",
        [name, age, gender]
      );
      e.target.reset();
      await loadPatients();
    });

  async function loadPatients() {
    const { rows } = await db.all("SELECT * FROM patients");
    const tbody = document.querySelector("#patientTable tbody");
    tbody.innerHTML = "";
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${row.id}</td><td>${row.name}</td><td>${row.age}</td><td>${row.gender}</td>`;
      tbody.appendChild(tr);
    });
  }

  await init();
});
