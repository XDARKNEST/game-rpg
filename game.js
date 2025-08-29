// ==== Data Player ====
let player = {
  name: "Hero",
  hp: 100,
  maxHp: 100,
  atk: 10,
  def: 5,
  gold: 50,
  level: 1,
  exp: 0,
  inventory: ["Potion"],
  quest: "Kalahkan 3 Orc",
  location: "Desa Awal"
};

// ==== Cheat System ====
let cheatUnlocked = false;
function activateCheat() {
  let code = document.getElementById("cheatInput").value;
  if (code === "DRAKS@1122") {
    cheatUnlocked = true;
    log("🔥 Cheat aktif! Semua fitur development terbuka.");
  } else {
    log("❌ Kode salah!");
  }
}

// ==== Panel Show ====
function showPanel(panel) {
  document.querySelectorAll(".panel").forEach(p => {
    if (p.id && p.id !== panel) p.style.display = "none";
  });
  document.getElementById(panel).style.display = "block";
  renderPanel(panel);
}

// ==== Render Panels ====
function renderPanel(panel) {
  if (panel === "stats") {
    document.getElementById("stats").innerHTML = `
      <h3>Stats</h3>
      <p>Nama: ${player.name}</p>
      <p>HP: ${player.hp}/${player.maxHp}</p>
      <p>Atk: ${player.atk} | Def: ${player.def}</p>
      <p>Gold: ${player.gold}</p>
      <p>Level: ${player.level} (EXP: ${player.exp})</p>
    `;
  }

  if (panel === "inventory") {
    document.getElementById("inventory").innerHTML = `
      <h3>Inventory</h3>
      <p>${player.inventory.join(", ") || "Kosong"}</p>
    `;
  }

  if (panel === "quest") {
    document.getElementById("quest").innerHTML = `
      <h3>Quest</h3>
      <p>${player.quest}</p>
    `;
  }

  if (panel === "map") {
    document.getElementById("map").innerHTML = `
      <h3>Peta</h3>
      <p>Lokasi: ${player.location}</p>
      <button onclick="travel('Hutan Orc')">➡️ Pergi ke Hutan Orc</button>
    `;
  }

  if (panel === "shop") {
    document.getElementById("shop").innerHTML = `
      <h3>Toko</h3>
      <button onclick="buyItem('Potion', 20)">Beli Potion (20 gold)</button>
    `;
  }

  if (panel === "battle") {
    document.getElementById("battle").innerHTML = `
      <h3>Battle</h3>
      <button onclick="battleEnemy()">Cari Musuh</button>
    `;
  }
}

// ==== Sistem Battle Sederhana ====
function battleEnemy() {
  let enemy = { name: "Orc", hp: 30, atk: 6 };
  log(`⚔️ Kamu bertemu ${enemy.name}!`);

  while (player.hp > 0 && enemy.hp > 0) {
    // Player serang
    enemy.hp -= Math.max(1, player.atk - 2);
    log(`🗡️ Kamu menyerang ${enemy.name}, HP musuh: ${enemy.hp}`);
    if (enemy.hp <= 0) {
      log(`🎉 ${enemy.name} kalah!`);
      player.exp += 10;
      player.gold += 15;
      break;
    }

    // Enemy serang
    player.hp -= Math.max(1, enemy.atk - player.def);
    log(`💥 ${enemy.name} menyerangmu, HP kamu: ${player.hp}`);
    if (player.hp <= 0) {
      log("💀 Kamu kalah...");
      break;
    }
  }
  renderPanel("stats");
}

// ==== Travel ====
function travel(loc) {
  player.location = loc;
  log(`🚶 Kamu pergi ke ${loc}.`);
  renderPanel("map");
}

// ==== Shop ====
function buyItem(item, price) {
  if (player.gold >= price) {
    player.gold -= price;
    player.inventory.push(item);
    log(`🛒 Kamu membeli ${item}.`);
  } else {
    log("❌ Gold tidak cukup!");
  }
  renderPanel("shop");
}

// ==== Log System ====
function log(msg) {
  let box = document.getElementById("log");
  box.innerHTML += msg + "<br>";
  box.scrollTop = box.scrollHeight;
}

// ==== Init ====
showPanel("stats");
