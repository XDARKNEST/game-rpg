// === PLAYER DATA ===
let player = {
  name: "Hero",
  level: 1,
  exp: 0,
  hp: 100,
  maxHp: 100,
  mp: 30,
  maxMp: 30,
  atk: 10,
  def: 5,
  gold: 50,
  inventory: ["Potion"],
  quest: []
};

// === ENEMY DATA ===
let enemies = [
  {name: "Goblin", hp: 30, atk: 5, def: 2, gold: 10, exp: 10},
  {name: "Orc", hp: 50, atk: 8, def: 3, gold: 20, exp: 20},
  {name: "Dragon", hp: 200, atk: 20, def: 10, gold: 100, exp: 100}
];

// === UTILS ===
function showPanel(id) {
  document.querySelectorAll(".panel").forEach(p => p.style.display = "none");
  document.getElementById(id + "-panel").style.display = "block";
  updateStats();
}

function updateStats() {
  document.getElementById("playerStats").innerText =
    `Lv.${player.level} | HP ${player.hp}/${player.maxHp} | MP ${player.mp}/${player.maxMp}
     ATK:${player.atk} DEF:${player.def} | Gold:${player.gold} | EXP:${player.exp}`;
  updateInventory();
}

function updateInventory() {
  let list = document.getElementById("inventoryList");
  list.innerHTML = "";
  player.inventory.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

// === BATTLE ===
function startBattle() {
  let enemy = {...enemies[Math.floor(Math.random()*enemies.length)]};
  log(`⚔️ Kamu melawan ${enemy.name}!`);
  battleTurn(enemy);
}

function battleTurn(enemy) {
  while (enemy.hp > 0 && player.hp > 0) {
    let dmg = Math.max(0, player.atk - enemy.def);
    enemy.hp -= dmg;
    log(`Kamu menyerang ${enemy.name} -${dmg} HP`);

    if (enemy.hp <= 0) {
      log(`${enemy.name} kalah!`);
      player.gold += enemy.gold;
      player.exp += enemy.exp;
      levelUpCheck();
      break;
    }

    let edmg = Math.max(0, enemy.atk - player.def);
    player.hp -= edmg;
    log(`${enemy.name} menyerangmu -${edmg} HP`);
    if (player.hp <= 0) {
      log("❌ Kamu kalah! Respawn di Town.");
      player.hp = player.maxHp;
      player.mp = player.maxMp;
      break;
    }
  }
  updateStats();
}

function log(msg) {
  let b = document.getElementById("battleLog");
  b.innerHTML += msg + "<br>";
  b.scrollTop = b.scrollHeight;
}

// === LEVEL UP ===
function levelUpCheck() {
  if (player.exp >= player.level * 50) {
    player.exp = 0;
    player.level++;
    player.maxHp += 20;
    player.maxMp += 10;
    player.atk += 5;
    player.def += 3;
    log(`🎉 Naik level! Sekarang Lv.${player.level}`);
  }
}

// === MAP ===
function travel(area) {
  document.getElementById("mapStatus").innerText = `Kamu berada di ${area}`;
  log(`🚶 Pergi ke ${area}`);
}

// === SHOP ===
let shopStock = ["Potion", "Hi-Potion", "Mana Potion"];
function loadShop() {
  let s = document.getElementById("shopItems");
  s.innerHTML = "";
  shopStock.forEach(item => {
    let btn = document.createElement("button");
    btn.textContent = `Beli ${item} (10G)`;
    btn.onclick = () => buyItem(item);
    s.appendChild(btn);
  });
}

function buyItem(item) {
  if (player.gold >= 10) {
    player.gold -= 10;
    player.inventory.push(item);
    updateInventory();
    updateStats();
    log(`🛒 Membeli ${item}`);
  } else {
    log("Gold tidak cukup!");
  }
}

// === CHEAT SYSTEM ===
function unlockCheat() {
  let code = document.getElementById("cheatCode").value;
  if (code === "DRAKS@1122") {
    document.getElementById("cheatBtn").style.display = "inline-block";
    alert("✅ Developer Mode Unlocked!");
  } else {
    alert("❌ Kode salah!");
  }
}

function cheatGold() { player.gold += 1000; updateStats(); log("💰 Cheat Gold +1000"); }
function cheatExp() { player.exp += 1000; levelUpCheck(); updateStats(); log("⭐ Cheat EXP +1000"); }
function cheatHeal() { player.hp = player.maxHp; player.mp = player.maxMp; updateStats(); log("❤️ Cheat Heal Full"); }
function cheatItem() { player.inventory.push("Rare Sword of Dev"); updateInventory(); log("🎁 Cheat Rare Item didapat!"); }
function cheatLevel() { player.level++; updateStats(); log("⬆️ Cheat Level Naik!"); }

// === INIT ===
updateStats();
loadShop();
showPanel('stats');
