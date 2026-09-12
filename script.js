document.body.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#site-nav");

menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
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
const progress = document.querySelector(".progress span");

document.querySelectorAll(".command-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const demo = demos[button.dataset.command];
    document.querySelectorAll(".command-tab").forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
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
