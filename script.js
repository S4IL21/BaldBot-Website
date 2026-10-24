document.body.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#site-nav");

function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu();
    menuButton.focus();
  }
});

const demos = {
  dashboard: {
    command: "/play dashboard",
    title: "Level 12 Entrepreneur",
    stats: [["BALANCE", "24.8K"], ["PRODUCTION", "2.4K/min"], ["ENERGY", "80 / 100"]],
    detail: "Your Follicle Forge is carrying the operation.",
    progress: "68%"
  },
  business: {
    command: "/business shop",
    title: "Follicle Exchange",
    stats: [["OWNED", "34"], ["NEXT COST", "9.2K"], ["BOOST", "+35%"]],
    detail: "Bulk buy, research, and compound your production.",
    progress: "82%"
  },
  event: {
    command: "/event attack",
    title: "The Chrome Dome",
    stats: [["DAMAGE", "1,840"], ["GUILD HP", "68%"], ["ENERGY", "70 / 100"]],
    detail: "Your attack earned 23 season points.",
    progress: "32%"
  },
  season: {
    command: "/season status",
    title: "Season 09 · Week 3",
    stats: [["POINTS", "4,250"], ["RESEARCH", "Force II"], ["RANK", "#7"]],
    detail: "Gold rewards are within reach. Keep the guild moving.",
    progress: "76%"
  }
};

const commandLabel = document.querySelector(".slash-command");
const demoTitle = document.querySelector("#demo-title");
const demoStats = document.querySelector("#demo-stats");
const demoDetail = document.querySelector("#demo-detail");
const demoPanel = document.querySelector("#demo-panel");
const progress = document.querySelector(".progress span");
const tabs = Array.from(document.querySelectorAll(".command-tab"));

function activateTab(tab, moveFocus) {
  const demo = demos[tab.dataset.command];
  tabs.forEach((other) => {
    const selected = other === tab;
    other.classList.toggle("active", selected);
    other.setAttribute("aria-selected", String(selected));
    other.tabIndex = selected ? 0 : -1;
  });
  demoPanel.setAttribute("aria-labelledby", tab.id);
  commandLabel.textContent = demo.command;
  demoTitle.textContent = demo.title;
  demoStats.replaceChildren(...demo.stats.map(([label, value]) => {
    const container = document.createElement("div");
    const name = document.createElement("span");
    const amount = document.createElement("strong");
    name.textContent = label;
    amount.textContent = value;
    container.append(name, amount);
    return container;
  }));
  demoDetail.textContent = demo.detail;
  progress.style.width = demo.progress;
  if (moveFocus) {
    tab.focus();
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab, false));
  tab.addEventListener("keydown", (event) => {
    const targets = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 };
    if (!(event.key in targets)) {
      return;
    }
    event.preventDefault();
    activateTab(tabs[(targets[event.key] + tabs.length) % tabs.length], true);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
