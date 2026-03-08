
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}


const eventType = document.getElementById("eventType");

if (eventType) {
  const attendeesInput = document.getElementById("attendees");
  const durationSelect = document.getElementById("duration");
  const riskSelect = document.getElementById("risk");
  const dateInput = document.getElementById("eventDate");

  const equipment = document.getElementById("equipment");
  const weather = document.getElementById("weather");
  const vip = document.getElementById("vip");

  const basePremiumDisplay = document.getElementById("basePremium");
  const attendeeCostDisplay = document.getElementById("attendeeCost");
  const addonCostDisplay = document.getElementById("addonCost");
  const totalPremiumDisplay = document.getElementById("totalPremium");

  const calcMsg = document.getElementById("calcMsg");

  function getAddonCost() {
    let addonCost = 0;
    if (equipment && equipment.checked) addonCost += Number(equipment.value);
    if (weather && weather.checked) addonCost += Number(weather.value);
    if (vip && vip.checked) addonCost += Number(vip.value);
    return addonCost;
  }

  function calculatePremium() {
    const basePremium = Number(eventType.value);
    const attendees = Number(attendeesInput.value || 0);

    
    if (attendeesInput.value !== "" && attendees <= 0) {
      calcMsg.textContent = "Attendees must be at least 1.";
    } else if (dateInput && dateInput.value === "") {
      calcMsg.textContent = "Tip: Select an event date for better tracking.";
    } else {
      calcMsg.textContent = "";
    }

    const attendeeCost = attendees * 50; 
    const addonCost = getAddonCost();

    const durationMultiplier = Number(durationSelect.value);
    const riskMultiplier = Number(riskSelect.value);

    const total = (basePremium + attendeeCost + addonCost) * durationMultiplier * riskMultiplier;

    
    basePremiumDisplay.textContent = basePremium;
    attendeeCostDisplay.textContent = attendeeCost;
    addonCostDisplay.textContent = addonCost;
    totalPremiumDisplay.textContent = Math.round(total);
  }

  
  ["change", "input"].forEach(evt => {
    eventType.addEventListener("change", calculatePremium);
    attendeesInput.addEventListener("input", calculatePremium);
    durationSelect.addEventListener("change", calculatePremium);
    riskSelect.addEventListener("change", calculatePremium);
    if (dateInput) dateInput.addEventListener("change", calculatePremium);
    if (equipment) equipment.addEventListener("change", calculatePremium);
    if (weather) weather.addEventListener("change", calculatePremium);
    if (vip) vip.addEventListener("change", calculatePremium);
  });

  
  calculatePremium();
}


const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formMessage.style.color = "#ffb4b4";
      formMessage.textContent = "Please fill all fields correctly.";
      return;
    }

    formMessage.style.color = "#bff7cf";
    formMessage.textContent = "Submitted! We will contact you soon (demo confirmation).";

    contactForm.reset();
  });
}