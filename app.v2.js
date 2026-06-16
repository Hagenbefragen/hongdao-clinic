// ==========================================
// HONGDAO TCM CLINIC - APPLICATION LOGIC
// Includes multilingual i18n, price calculator,
// slot selector, modal controller & popups
// ==========================================

// Translation Dictionary (German & English)
const translations = pageContent.translations;

// Endometriosis Program Pricing Data Matrix
const endometriosisPricing = {
  "1w": {
    basic: 950,
    premium: 1950,
    features: {
      en: [
        "Initial pulse & tongue diagnosis with Master Xu",
        "3 Acupuncture & moxibustion sessions",
        "1 Specialized Womb-Massage session",
        "1 Group Sound Healing & sound ceremony",
        "TCM nutrition guideline and kitchen introduction",
        "Take-home medicine instruction (powders/pastes)"
      ],
      de: [
        "Erstdiagnose (Puls & Zunge) mit Meister Xu",
        "3 Akupunktur- & Moxibustions-Sitzungen",
        "1 Spezialisierte Womb-Massage (Gebärmutter-Massage)",
        "1 Gruppen-Sound-Healing & Klangzeremonie",
        "TCM-Ernährungsleitfaden & Küchen-Einführung",
        "Einweisung für Kräuterpulver/-pasten für Zuhause"
      ]
    }
  },
  "2w": {
    basic: 1750,
    premium: 3500,
    features: {
      en: [
        "Initial & mid-program checkup with Master Xu",
        "6 Acupuncture & moxibustion sessions",
        "2 Specialized Womb-Massage sessions",
        "2 Group Sound Healing sessions & private alignment",
        "Daily TCM-based herbal soups at clinic",
        "Take-home medicine instruction + 3 months follow-up support"
      ],
      de: [
        "Erst- & Zwischen-Diagnose durch Meister Xu",
        "6 Akupunktur- & Moxibustions-Sitzungen",
        "2 Spezialisierte Womb-Massagen (Gebärmutter-Massagen)",
        "2 Gruppen-Sound-Healings & private Klangsitzung",
        "Tägliche TCM-Kräutersuppen in der Klinik",
        "Einweisung für Kräuter sowie 3 Monate Begleitung"
      ]
    }
  },
  "4w": {
    basic: 3200,
    premium: 6400,
    features: {
      en: [
        "Weekly diagnostic checkups with Master Xu",
        "12 Acupuncture & moxibustion sessions",
        "4 Specialized Womb-Massage sessions",
        "4 Sound Healing & meditation ceremonies",
        "Daily TCM-based herbal kitchen meals at clinic",
        "Comprehensive stem-cell therapy consultation integration",
        "Take-home customized medicine preparation + 6 months follow-up support"
      ],
      de: [
        "Wöchentliche Diagnostik und Anpassung durch Meister Xu",
        "12 Akupunktur- & Moxibustions-Sitzungen",
        "4 Spezialisierte Womb-Massagen",
        "4 Sound-Healing- & Meditationszeremonien",
        "Tägliche Mahlzeiten aus der TCM-Heilküche in der Klinik",
        "Integration & Beratung zu Stammzellentherapie",
        "Herstellung der Kräuterarznei + 6 Monate ärztliche Begleitung"
      ]
    }
  }
};

// Dynamic Image Loading
function initImages() {
  const isEditMode = localStorage.getItem("ohm_edit_token") !== null;
  if (typeof pageContent !== 'undefined' && pageContent.images) {
    document.querySelectorAll('[data-img-key]').forEach(el => {
      const key = el.getAttribute('data-img-key');
      const val = pageContent.images[key];
      const customWidth = pageContent.images[key + "_width"];

      if (val === "deleted") {
        if (isEditMode) {
          el.style.display = "inline-block";
          el.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23111' stroke='%23333' stroke-width='2' stroke-dasharray='5,5'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='10' font-family='sans-serif'>[ Deleted Image ]</text></svg>";
          el.style.opacity = "0.5";
        } else {
          el.style.display = "none";
        }
      } else if (val) {
        el.src = val;
        el.style.display = "";
        el.style.opacity = "";
      }

      if (customWidth) {
        el.style.width = customWidth;
        el.style.maxWidth = "100%";
      } else {
        el.style.width = ""; // reset to default CSS
      }
    });
  }
}

// In-place Editor Mode
let pendingImageChanges = {};
let isNavigateMode = false;

function initEditorToolbar() {
  if (document.getElementById("editor-toolbar")) return;

  const toolbar = document.createElement("div");
  toolbar.id = "editor-toolbar";
  toolbar.style.position = "fixed";
  toolbar.style.bottom = "20px";
  toolbar.style.left = "50%";
  toolbar.style.transform = "translateX(-50%)";
  toolbar.style.background = "rgba(18, 18, 18, 0.85)";
  toolbar.style.backdropFilter = "blur(12px)";
  toolbar.style.border = "1px solid rgba(255, 255, 255, 0.1)";
  toolbar.style.borderRadius = "50px";
  toolbar.style.padding = "10px 24px";
  toolbar.style.display = "flex";
  toolbar.style.alignItems = "center";
  toolbar.style.gap = "16px";
  toolbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
  toolbar.style.zIndex = "999999";
  toolbar.style.color = "#fff";
  toolbar.style.fontFamily = "var(--font-serif), serif";

  const statusDot = document.createElement("span");
  statusDot.style.width = "8px";
  statusDot.style.height = "8px";
  statusDot.style.borderRadius = "50%";
  statusDot.style.background = "#4caf50";
  statusDot.style.display = "inline-block";

  const statusText = document.createElement("span");
  statusText.innerText = "Editor Mode: Nanjing Deng";
  statusText.style.fontSize = "0.9rem";
  statusText.style.fontWeight = "600";
  statusText.style.marginRight = "8px";

  const modeToggle = document.createElement("button");
  modeToggle.id = "editor-mode-toggle";
  modeToggle.innerText = "Mode: Edit ✏️";
  modeToggle.style.background = "rgba(255, 255, 255, 0.1)";
  modeToggle.style.color = "#fff";
  modeToggle.style.border = "1px solid rgba(255, 255, 255, 0.15)";
  modeToggle.style.borderRadius = "20px";
  modeToggle.style.padding = "8px 16px";
  modeToggle.style.cursor = "pointer";
  modeToggle.style.fontWeight = "600";
  modeToggle.style.fontSize = "0.85rem";
  modeToggle.style.marginRight = "8px";
  modeToggle.style.transition = "transform 0.2s, background 0.2s";
  modeToggle.addEventListener("mouseenter", () => modeToggle.style.transform = "scale(1.05)");
  modeToggle.addEventListener("mouseleave", () => modeToggle.style.transform = "scale(1)");
  
  modeToggle.addEventListener("click", () => {
    isNavigateMode = !isNavigateMode;
    if (isNavigateMode) {
      modeToggle.innerText = "Mode: Navigate 🧭";
      modeToggle.style.background = "#2196f3"; // light blue
      disableEditMode();
    } else {
      modeToggle.innerText = "Mode: Edit ✏️";
      modeToggle.style.background = "rgba(255, 255, 255, 0.1)";
      enableEditMode();
    }
  });

  const publishBtn = document.createElement("button");
  publishBtn.innerText = "Publish Changes";
  publishBtn.style.background = "var(--terracotta, #c86446)";
  publishBtn.style.color = "#fff";
  publishBtn.style.border = "none";
  publishBtn.style.borderRadius = "20px";
  publishBtn.style.padding = "8px 16px";
  publishBtn.style.cursor = "pointer";
  publishBtn.style.fontWeight = "600";
  publishBtn.style.fontSize = "0.85rem";
  publishBtn.style.transition = "transform 0.2s, background 0.2s";
  publishBtn.addEventListener("mouseenter", () => publishBtn.style.transform = "scale(1.05)");
  publishBtn.addEventListener("mouseleave", () => publishBtn.style.transform = "scale(1)");
  publishBtn.addEventListener("click", publishChanges);

  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  cancelBtn.style.background = "transparent";
  cancelBtn.style.color = "#ccc";
  cancelBtn.style.border = "1px solid #444";
  cancelBtn.style.borderRadius = "20px";
  cancelBtn.style.padding = "8px 16px";
  cancelBtn.style.cursor = "pointer";
  cancelBtn.style.fontWeight = "600";
  cancelBtn.style.fontSize = "0.85rem";
  cancelBtn.addEventListener("click", () => {
    if (confirm("Discard all unsaved edits?")) {
      window.location.reload();
    }
  });

  const logoutBtn = document.createElement("button");
  logoutBtn.innerText = "Logout";
  logoutBtn.style.background = "transparent";
  logoutBtn.style.color = "#ff4a4a";
  logoutBtn.style.border = "none";
  logoutBtn.style.cursor = "pointer";
  logoutBtn.style.fontWeight = "600";
  logoutBtn.style.fontSize = "0.85rem";
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("ohm_edit_token");
    window.location.href = window.location.pathname;
  });

  toolbar.appendChild(statusDot);
  toolbar.appendChild(statusText);
  toolbar.appendChild(modeToggle);
  toolbar.appendChild(publishBtn);
  toolbar.appendChild(cancelBtn);
  toolbar.appendChild(logoutBtn);
  document.body.appendChild(toolbar);
}

function publishChanges() {
  const token = localStorage.getItem("ohm_edit_token");
  if (!token) {
    alert("Not logged in or session expired.");
    return;
  }

  const publishBtn = document.querySelector("#editor-toolbar button");
  const originalText = publishBtn.innerText;
  publishBtn.innerText = "Publishing...";
  publishBtn.disabled = true;

  const payload = {
    token: token,
    translations: pageContent.translations,
    images: pageContent.images,
    imageChanges: pendingImageChanges
  };

  fetch("/api/edit/publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(data => {
      throw new Error(data.error || "Publish failed");
    });
  })
  .then(data => {
    alert("Changes published successfully!");
    pendingImageChanges = {};
    window.location.reload();
  })
  .catch(err => {
    alert("Error publishing changes: " + err.message);
    publishBtn.innerText = originalText;
    publishBtn.disabled = false;
  });
}

function makeElementsEditable() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    if (element.tagName !== "INPUT" && element.tagName !== "TEXTAREA" && element.tagName !== "SELECT") {
      element.setAttribute("contenteditable", "true");
      element.style.outline = "1px dashed rgba(220, 100, 50, 0.3)";
      element.style.padding = "2px";
      element.style.borderRadius = "2px";
      
      if (element.getAttribute("data-editable-wired")) return;
      element.setAttribute("data-editable-wired", "true");

      element.addEventListener("mouseenter", () => {
        if (isNavigateMode) return;
        element.style.outline = "2px dashed var(--terracotta)";
      });
      element.addEventListener("mouseleave", () => {
        if (isNavigateMode) return;
        element.style.outline = "1px dashed rgba(220, 100, 50, 0.3)";
      });

      element.addEventListener("blur", () => {
        if (isNavigateMode) return;
        const key = element.getAttribute("data-i18n");
        if (key && pageContent.translations[currentLang]) {
          pageContent.translations[currentLang][key] = element.innerHTML;
        }
      });
    }
  });
  
  document.querySelectorAll("[data-img-key]").forEach(img => {
    img.style.cursor = "pointer";
    img.style.outline = "2px dashed rgba(220, 100, 50, 0.5)";
    
    if (img.getAttribute("data-img-wired")) return;
    img.setAttribute("data-img-wired", "true");

    img.addEventListener("mouseenter", () => {
      if (isNavigateMode) return;
      img.style.outline = "3px dashed var(--terracotta)";
    });
    img.addEventListener("mouseleave", () => {
      if (isNavigateMode) return;
      img.style.outline = "2px dashed rgba(220, 100, 50, 0.5)";
    });

    img.addEventListener("click", (e) => {
      if (isNavigateMode) return;
      e.stopPropagation();
      e.preventDefault();
      showImageEditorMenu(img);
    });
  });
}

function enableEditMode() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    if (element.tagName !== "INPUT" && element.tagName !== "TEXTAREA" && element.tagName !== "SELECT") {
      element.setAttribute("contenteditable", "true");
      element.style.outline = "1px dashed rgba(220, 100, 50, 0.3)";
      element.style.padding = "2px";
      element.style.borderRadius = "2px";
    }
  });
  
  document.querySelectorAll("[data-img-key]").forEach(img => {
    img.style.cursor = "pointer";
    img.style.outline = "2px dashed rgba(220, 100, 50, 0.5)";
  });
}

function disableEditMode() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.removeAttribute("contenteditable");
    element.style.outline = "";
    element.style.padding = "";
    element.style.borderRadius = "";
  });

  document.querySelectorAll("[data-img-key]").forEach(img => {
    img.style.cursor = "";
    img.style.outline = "";
  });

  document.querySelectorAll("a[href]").forEach(link => {
    let href = link.getAttribute("href");
    if (href && !href.startsWith("http") && !href.startsWith("mailto") && !href.startsWith("tel") && !href.startsWith("#")) {
      const urlParts = href.split("?");
      const pathPart = urlParts[0];
      const searchPart = urlParts[1] ? "?" + urlParts[1] : "";
      
      const params = new URLSearchParams(searchPart);
      params.set("edit", "true");
      
      link.setAttribute("href", pathPart + "?" + params.toString());
    }
  });
}

function showImageEditorMenu(img) {
  const existingMenu = document.getElementById("image-editor-menu");
  if (existingMenu) existingMenu.remove();

  const key = img.getAttribute("data-img-key");

  const menu = document.createElement("div");
  menu.id = "image-editor-menu";
  menu.style.position = "absolute";
  menu.style.background = "rgba(20, 20, 20, 0.95)";
  menu.style.backdropFilter = "blur(10px)";
  menu.style.border = "1px solid rgba(255, 255, 255, 0.15)";
  menu.style.borderRadius = "12px";
  menu.style.padding = "8px";
  menu.style.display = "flex";
  menu.style.flexDirection = "column";
  menu.style.gap = "4px";
  menu.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.5)";
  menu.style.zIndex = "1000001";
  menu.style.fontFamily = "sans-serif";
  menu.style.minWidth = "160px";

  const rect = img.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  menu.style.top = `${rect.top + scrollTop + 10}px`;
  menu.style.left = `${rect.left + scrollLeft + 10}px`;

  const title = document.createElement("div");
  title.innerText = `Image: ${key}`;
  title.style.fontSize = "0.75rem";
  title.style.color = "#888";
  title.style.padding = "4px 8px";
  title.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
  title.style.marginBottom = "4px";
  menu.appendChild(title);

  const changeBtn = document.createElement("button");
  changeBtn.innerText = "📷 Change Photo";
  styleMenuButton(changeBtn);
  changeBtn.addEventListener("click", () => {
    menu.remove();
    triggerImageUpload(img);
  });
  menu.appendChild(changeBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "🗑️ Delete Photo";
  styleMenuButton(deleteBtn);
  deleteBtn.style.color = "#ff4d4d";
  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this photo from the layout?")) {
      pageContent.images[key] = "deleted";
      delete pendingImageChanges[key];
      initImages();
      menu.remove();
    }
  });
  menu.appendChild(deleteBtn);

  const sizeHeader = document.createElement("div");
  sizeHeader.innerText = "Size / Width:";
  sizeHeader.style.fontSize = "0.7rem";
  sizeHeader.style.color = "#888";
  sizeHeader.style.padding = "4px 8px 2px 8px";
  menu.appendChild(sizeHeader);

  const sizeRow = document.createElement("div");
  sizeRow.style.display = "flex";
  sizeRow.style.gap = "4px";
  sizeRow.style.padding = "0 8px 8px 8px";

  const sizes = ["25%", "50%", "75%", "100%", "Default"];
  sizes.forEach(size => {
    const sizeBtn = document.createElement("button");
    sizeBtn.innerText = size;
    sizeBtn.style.background = "rgba(255, 255, 255, 0.08)";
    sizeBtn.style.border = "none";
    sizeBtn.style.color = "#fff";
    sizeBtn.style.fontSize = "0.7rem";
    sizeBtn.style.padding = "3px 6px";
    sizeBtn.style.borderRadius = "4px";
    sizeBtn.style.cursor = "pointer";
    sizeBtn.addEventListener("click", () => {
      const widthVal = size === "Default" ? "" : size;
      pageContent.images[key + "_width"] = widthVal;
      initImages();
      menu.remove();
    });
    sizeRow.appendChild(sizeBtn);
  });
  menu.appendChild(sizeRow);

  setTimeout(() => {
    const clickOutsideHandler = (event) => {
      if (!menu.contains(event.target)) {
        menu.remove();
        document.removeEventListener("click", clickOutsideHandler);
      }
    };
    document.addEventListener("click", clickOutsideHandler);
  }, 100);

  document.body.appendChild(menu);
}

function styleMenuButton(btn) {
  btn.style.background = "transparent";
  btn.style.border = "none";
  btn.style.color = "#fff";
  btn.style.padding = "6px 8px";
  btn.style.textAlign = "left";
  btn.style.borderRadius = "6px";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "0.85rem";
  btn.style.transition = "background 0.2s";
  btn.addEventListener("mouseenter", () => btn.style.background = "rgba(255, 255, 255, 0.1)");
  btn.addEventListener("mouseleave", () => btn.style.background = "transparent");
}

function triggerImageUpload(img) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/jpeg, image/png, image/webp";
  
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert("Only JPG, PNG, and WebP images are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result;
        img.src = base64Data;
        
        const key = img.getAttribute("data-img-key");
        pageContent.images[key] = base64Data;
        
        pendingImageChanges[key] = {
          name: file.name,
          type: file.type,
          data: base64Data
        };
        initImages();
      };
      reader.readAsDataURL(file);
    }
  });
  fileInput.click();
}


function checkEditorMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenParam = urlParams.get("access_token");
  
  if (tokenParam) {
    localStorage.setItem("ohm_edit_token", tokenParam);
    urlParams.delete("access_token");
    let newSearch = urlParams.toString();
    newSearch = newSearch ? "?" + newSearch : "";
    window.history.replaceState({}, "", window.location.pathname + newSearch + window.location.hash);
  }

  const isEdit = urlParams.get("edit") === "true" || window.location.hash === "#edit";
  if (!isEdit) return;

  const token = localStorage.getItem("ohm_edit_token");
  if (!token) {
    showLoginModal();
  } else {
    makeElementsEditable();
    initEditorToolbar();
  }
}

function injectEditorLoginLinks() {
  const urlParams = new URLSearchParams(window.location.search);
  const isEdit = urlParams.get("edit") === "true" || window.location.hash === "#edit";
  if (isEdit) return;

  // 1. Sidebar/Mobile Navigation
  document.querySelectorAll(".nav-links").forEach(nav => {
    if (nav.querySelector(".editor-nav-link")) return;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = window.location.pathname + "?edit=true";
    a.className = "nav-link editor-nav-link";
    a.style.opacity = "0.5";
    a.style.fontSize = "0.85rem";
    a.style.borderTop = "1px solid rgba(255, 255, 255, 0.08)";
    a.style.marginTop = "15px";
    a.style.paddingTop = "10px";
    a.innerText = "✎ Editor Login";
    li.appendChild(a);
    nav.appendChild(li);
  });

  // 2. Footer Bottom Links
  const footerLinks = document.querySelector(".footer-bottom-links");
  if (footerLinks && !footerLinks.querySelector(".editor-login-link")) {
    const editLink = document.createElement("a");
    editLink.href = window.location.pathname + "?edit=true";
    editLink.className = "editor-login-link";
    editLink.style.marginLeft = "15px";
    editLink.style.opacity = "0.5";
    editLink.innerText = "Editor Login";
    footerLinks.appendChild(editLink);
  }
}

function showLoginModal() {
  const modalOverlay = document.createElement("div");
  modalOverlay.id = "editor-login-overlay";
  modalOverlay.style.position = "fixed";
  modalOverlay.style.top = "0";
  modalOverlay.style.left = "0";
  modalOverlay.style.width = "100%";
  modalOverlay.style.height = "100%";
  modalOverlay.style.background = "rgba(0,0,0,0.8)";
  modalOverlay.style.display = "flex";
  modalOverlay.style.alignItems = "center";
  modalOverlay.style.justify = "center";
  modalOverlay.style.zIndex = "1000000";
  modalOverlay.style.backdropFilter = "blur(8px)";

  const card = document.createElement("div");
  card.style.background = "#1a1a1a";
  card.style.border = "1px solid rgba(255, 255, 255, 0.1)";
  card.style.borderRadius = "16px";
  card.style.padding = "40px";
  card.style.maxWidth = "400px";
  card.style.width = "90%";
  card.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.5)";
  card.style.color = "#fff";
  card.style.fontFamily = "var(--font-serif), serif";
  card.style.textAlign = "center";

  const title = document.createElement("h2");
  title.innerText = "Hong Dao Clinic Editor";
  title.style.fontSize = "1.8rem";
  title.style.marginBottom = "10px";
  title.style.color = "var(--terracotta, #c86446)";

  const subtitle = document.createElement("p");
  subtitle.innerText = "Secure login using OHM Identity SSO";
  subtitle.style.fontSize = "0.9rem";
  subtitle.style.color = "#888";
  subtitle.style.marginBottom = "30px";

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.value = "nanjing.deng18@gmail.com";
  emailInput.placeholder = "Enter email";
  emailInput.style.width = "100%";
  emailInput.style.padding = "12px";
  emailInput.style.borderRadius = "8px";
  emailInput.style.border = "1px solid #333";
  emailInput.style.background = "#222";
  emailInput.style.color = "#fff";
  emailInput.style.marginBottom = "15px";
  emailInput.style.boxSizing = "border-box";

  const passInput = document.createElement("input");
  passInput.type = "password";
  passInput.placeholder = "Token / Password";
  passInput.style.width = "100%";
  passInput.style.padding = "12px";
  passInput.style.borderRadius = "8px";
  passInput.style.border = "1px solid #333";
  passInput.style.background = "#222";
  passInput.style.color = "#fff";
  passInput.style.marginBottom = "25px";
  passInput.style.boxSizing = "border-box";

  passInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      ssoBtn.click();
    }
  });

  const btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";
  btnContainer.style.flexDirection = "column";
  btnContainer.style.gap = "10px";

  const ssoBtn = document.createElement("button");
  ssoBtn.innerText = "Login with OHM SSO";
  ssoBtn.style.width = "100%";
  ssoBtn.style.padding = "12px";
  ssoBtn.style.background = "var(--terracotta, #c86446)";
  ssoBtn.style.color = "#fff";
  ssoBtn.style.border = "none";
  ssoBtn.style.borderRadius = "8px";
  ssoBtn.style.fontWeight = "bold";
  ssoBtn.style.cursor = "pointer";
  
  ssoBtn.addEventListener("click", () => {
    const enteredPass = passInput.value.trim();
    if (enteredPass === "HongDao2026!Edit") {
      localStorage.setItem("ohm_edit_token", "HongDao2026!Edit");
      window.location.reload();
      return;
    }

    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocal) {
      if (emailInput.value !== "nanjing.deng18@gmail.com") {
        alert("Authorized users only. Nanjing's email is required.");
        return;
      }
      localStorage.setItem("ohm_edit_token", "mock-token-nanjing-deng");
      window.location.reload();
    } else {
      const redirectUri = window.location.origin + window.location.pathname + "?edit=true";
      window.location.href = `https://identity.offlinehumanmode.com/api/v1/authorize?client_id=clinic_editor&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=openid%20email`;
    }
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  cancelBtn.style.background = "transparent";
  cancelBtn.style.color = "#888";
  cancelBtn.style.border = "none";
  cancelBtn.style.cursor = "pointer";
  cancelBtn.addEventListener("click", () => {
    window.location.href = window.location.pathname;
  });

  card.appendChild(title);
  card.appendChild(subtitle);
  card.appendChild(emailInput);
  card.appendChild(passInput);
  
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  if (isLocal) {
    const mockBtn = document.createElement("button");
    mockBtn.innerText = "Login (Local Dev Mode)";
    mockBtn.style.width = "100%";
    mockBtn.style.padding = "12px";
    mockBtn.style.background = "#333";
    mockBtn.style.color = "#fff";
    mockBtn.style.border = "none";
    mockBtn.style.borderRadius = "8px";
    mockBtn.style.fontWeight = "bold";
    mockBtn.style.cursor = "pointer";
    mockBtn.addEventListener("click", () => {
      if (emailInput.value !== "nanjing.deng18@gmail.com") {
        alert("Authorized users only. Nanjing's email is required.");
        return;
      }
      localStorage.setItem("ohm_edit_token", "mock-token-nanjing-deng");
      window.location.reload();
    });
    btnContainer.appendChild(mockBtn);
  }
  
  btnContainer.appendChild(ssoBtn);
  btnContainer.appendChild(cancelBtn);
  card.appendChild(btnContainer);
  modalOverlay.appendChild(card);
  document.body.appendChild(modalOverlay);
}

// Global App State
let currentLang = localStorage.getItem('preferredLanguage') || 'de'; // Load persistent language or default to German
let selectedDuration = '2w'; // Default to 2 weeks
let selectedTier = 'premium'; // Default to Premium Retreat

document.addEventListener("DOMContentLoaded", () => {
  initImages();
  initLanguage();
  initEndometriosisCalculator();
  initBookingSlots();
  initFaq();
  initNavbarScroll();
  initMarketingPopup();
  initBookingModal();
  initTechModal();
  initLightbox();
  initContactTabs();
  initMobileMenu();
  initStartDates();
  checkEditorMode();
  injectEditorLoginLinks();
});

// 1. Language switcher logic
function initLanguage() {
  const deBtn = document.getElementById("lang-de");
  const enBtn = document.getElementById("lang-en");
  const deMobileBtn = document.getElementById("lang-de-mobile");
  const enMobileBtn = document.getElementById("lang-en-mobile");
  
  if (deBtn && enBtn) {
    deBtn.addEventListener("click", () => setLanguage('de'));
    enBtn.addEventListener("click", () => setLanguage('en'));
  }
  if (deMobileBtn && enMobileBtn) {
    deMobileBtn.addEventListener("click", () => setLanguage('de'));
    enMobileBtn.addEventListener("click", () => setLanguage('en'));
  }
  
  // Set initial language
  setLanguage(currentLang);
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('preferredLanguage', lang);
  
  // Update toggle buttons active class
  const deBtn = document.getElementById("lang-de");
  const enBtn = document.getElementById("lang-en");
  const deMobileBtn = document.getElementById("lang-de-mobile");
  const enMobileBtn = document.getElementById("lang-en-mobile");
  if (deBtn) deBtn.classList.toggle("active", lang === 'de');
  if (enBtn) enBtn.classList.toggle("active", lang === 'en');
  if (deMobileBtn) deMobileBtn.classList.toggle("active", lang === 'de');
  if (enMobileBtn) enMobileBtn.classList.toggle("active", lang === 'en');
  
  // Translate static data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.setAttribute("placeholder", translations[lang][key]);
      } else {
        element.innerHTML = translations[lang][key];
      }
    }
  });

  // Re-render components that are dynamic
  updateEndometriosisDisplay();
  updateDateSlotLabels();
  populateStartDates(lang);

  // Update active lightbox caption if active
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  if (lightbox && lightbox.classList.contains("active") && lightboxImg && lightboxCaption) {
    const src = lightboxImg.getAttribute("src");
    const activeItem = document.querySelector(`.gallery-item[data-img="${src}"]`);
    if (activeItem) {
      lightboxCaption.textContent = lang === 'de'
        ? activeItem.getAttribute("data-desc-de")
        : activeItem.getAttribute("data-desc-en");
    }
  }
}

// 2. Endometriosis Pricing Calculator Logic
function initEndometriosisCalculator() {
  // Duration buttons
  const dur1w = document.getElementById("dur-1w");
  const dur2w = document.getElementById("dur-2w");
  const dur4w = document.getElementById("dur-4w");

  // Tier buttons
  const tierBasic = document.getElementById("tier-basic");
  const tierPremium = document.getElementById("tier-premium");

  if (dur1w && dur2w && dur4w && tierBasic && tierPremium) {
    dur1w.addEventListener("click", () => { selectedDuration = '1w'; updateEndometriosisDisplay(); });
    dur2w.addEventListener("click", () => { selectedDuration = '2w'; updateEndometriosisDisplay(); });
    dur4w.addEventListener("click", () => { selectedDuration = '4w'; updateEndometriosisDisplay(); });

    tierBasic.addEventListener("click", () => { selectedTier = 'basic'; updateEndometriosisDisplay(); });
    tierPremium.addEventListener("click", () => { selectedTier = 'premium'; updateEndometriosisDisplay(); });
  }
}

function updateEndometriosisDisplay() {
  const amountEl = document.getElementById("endo-price-amount");
  const descEl = document.getElementById("endo-price-period");
  const featuresList = document.getElementById("endo-features-list");
  
  if (!amountEl || !featuresList) return;

  // Update button active state
  document.getElementById("dur-1w").classList.toggle("active", selectedDuration === '1w');
  document.getElementById("dur-2w").classList.toggle("active", selectedDuration === '2w');
  document.getElementById("dur-4w").classList.toggle("active", selectedDuration === '4w');

  document.getElementById("tier-basic").classList.toggle("active", selectedTier === 'basic');
  document.getElementById("tier-premium").classList.toggle("active", selectedTier === 'premium');

  // Fetch prices & details
  const currentData = endometriosisPricing[selectedDuration];
  const price = selectedTier === 'basic' ? currentData.basic : currentData.premium;
  
  amountEl.textContent = `€${price},-`;
  
  const periodText = {
    en: { "1w": "1 Week Program (Cost Contribution)", "2w": "2 Weeks Program (Cost Contribution)", "4w": "4 Weeks Program (Cost Contribution)" },
    de: { "1w": "1 Woche Programm (Kostenbeitrag)", "2w": "2 Wochen Programm (Kostenbeitrag)", "4w": "4 Wochen Programm (Kostenbeitrag)" }
  };
  descEl.textContent = periodText[currentLang][selectedDuration];

  // Render Features list
  featuresList.innerHTML = "";
  const features = [...currentData.features[currentLang]];
  if (selectedTier === 'premium') {
    if (selectedDuration === '1w') {
      features.push(currentLang === 'de' ? "7 Nächte im luxuriösen Partnerhotel (inkl. TCM-Küche)" : "7 nights in the luxurious partner hotel (incl. TCM kitchen)");
    } else if (selectedDuration === '2w') {
      features.push(currentLang === 'de' ? "14 Nächte im luxuriösen Partnerhotel (inkl. TCM-Küche)" : "14 nights in the luxurious partner hotel (incl. TCM kitchen)");
    } else if (selectedDuration === '4w') {
      features.push(currentLang === 'de' ? "28 Nächte im luxuriösen Partnerhotel (inkl. TCM-Küche)" : "28 nights in the luxurious partner hotel (incl. TCM kitchen)");
    }
  }
  features.forEach(feat => {
    const li = document.createElement("li");
    li.textContent = feat;
    featuresList.appendChild(li);
  });

  // Set Stripe link
  const stripeLinks = {
    "1w": {
      basic: "https://buy.stripe.com/fZu3cwaM03yh878ascbo400",
      premium: "https://buy.stripe.com/14A28s5rG9WF2MObwgbo401"
    },
    "2w": {
      basic: "https://buy.stripe.com/aFa14o7zO4clfg0RCbo402",
      premium: "https://buy.stripe.com/7sY3cw9HWgl3afg1VGbo403"
    },
    "4w": {
      basic: "https://buy.stripe.com/dRmaEY3jyd8R9bcgQAbo404",
      premium: "https://buy.stripe.com/3claEY3jy1q91IK9o8bo405"
    }
  };
  const stripeUrl = stripeLinks[selectedDuration][selectedTier];
  const stripeLinkEl = document.getElementById("endo-stripe-link");
  if (stripeLinkEl) {
    stripeLinkEl.setAttribute("href", stripeUrl);
  }
}

// 3. Booking consultation Slots logic
let selectedDate = null;
let selectedSlot = null;

// Helper to check if user's timezone is CET/CEST
function isTimezoneCET(tz) {
  if (!tz) return false;
  const cetTimezones = [
    'Europe/Berlin', 'Europe/Paris', 'Europe/Vienna', 'Europe/Rome', 
    'Europe/Madrid', 'Europe/Zurich', 'Europe/Amsterdam', 'Europe/Brussels',
    'Europe/Stockholm', 'Europe/Oslo', 'Europe/Copenhagen', 'Europe/Warsaw',
    'Europe/Prague', 'Europe/Budapest', 'Europe/Bratislava', 'Europe/Ljubljana',
    'Europe/Zagreb', 'Europe/Sarajevo', 'Europe/Belgrade', 'Europe/Skopje',
    'Europe/Tirana', 'Europe/Podgorica', 'Europe/Luxembourg', 'Europe/Monaco',
    'Europe/Andorra', 'Europe/Vaduz', 'Europe/San_Marino', 'Europe/Vatican',
    'Europe/Malta', 'Europe/Gibraltar', 'CET', 'CEST', 'MET', 'Europe/Busingen'
  ];
  return cetTimezones.includes(tz) || 
         tz.startsWith('Europe/Berlin') || 
         tz.startsWith('Europe/Paris') || 
         tz.startsWith('Europe/Vienna') || 
         tz.startsWith('Europe/Rome') || 
         tz.startsWith('Europe/Zurich');
}

// Convert CST (Peking time, UTC+8) to CET/CEST on a specific date
function getCETTime(dateString, slotString) {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!isTimezoneCET(tz)) return null;

    // dateString: YYYY-MM-DD
    // slotString: HH:MM
    const cstISO = `${dateString}T${slotString}:00+08:00`;
    const date = new Date(cstISO);
    if (isNaN(date.getTime())) return null;

    // Format local time with short time zone name
    const options = { hour: '2-digit', minute: '2-digit', timeZoneName: 'short', hour12: false };
    const localFormatted = new Intl.DateTimeFormat(currentLang, options).format(date);
    return localFormatted;
  } catch (e) {
    console.error("Error converting timezone", e);
    return null;
  }
}

function initBookingSlots() {
  const dateInput = document.getElementById("consultation-date");
  if (dateInput) {
    dateInput.addEventListener("change", (e) => {
      selectedDate = e.target.value;
      generateTimeSlots();
    });
  }

  // Bind Submit Consultation Form
  const submitEmailBtn = document.getElementById("submit-email-btn");
  const submitWhatsappBtn = document.getElementById("submit-whatsapp-btn");

  function processBooking(method) {
    const form = document.getElementById("consultation-form");
    const dateInput = document.getElementById("consultation-date");
    
    // 1. Perform native HTML5 validation (Name, Email required, formats, etc.)
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    // 2. Custom validation for selected date (Wednesday or Saturday)
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const day = dateObj.getDay(); // 3 = Wed, 6 = Sat
      
      if (day !== 3 && day !== 6) {
        if (dateInput) {
          dateInput.setCustomValidity(currentLang === 'de' 
            ? "Bitte wählen Sie einen Mittwoch oder Samstag." 
            : "Please select a Wednesday or Saturday.");
          form.reportValidity();
          dateInput.setCustomValidity(""); // Reset
        }
        return;
      }
      
      // 3. Custom validation for time slot selection
      if (!selectedSlot) {
        if (dateInput) {
          dateInput.setCustomValidity(currentLang === 'de'
            ? "Bitte wählen Sie eine Uhrzeit aus den verfügbaren Slots."
            : "Please select a time slot from the available options.");
          form.reportValidity();
          dateInput.setCustomValidity(""); // Reset
        }
        return;
      }
    } else {
      if (dateInput) {
        dateInput.setCustomValidity(currentLang === 'de' ? "Bitte wählen Sie ein Datum." : "Please select a date.");
        form.reportValidity();
        dateInput.setCustomValidity("");
      }
      return;
    }

    const name = document.getElementById("consult-name").value;
    const email = document.getElementById("consult-email").value;
    const phone = document.getElementById("consult-phone").value || 'N/A';
    const programSelect = document.getElementById("consult-program");
    const programText = programSelect ? programSelect.options[programSelect.selectedIndex].text : 'TCM General';
    const message = document.getElementById("consult-message").value || 'N/A';

    const startDateSelect = document.getElementById("program-start-date");
    const startDateContainer = document.getElementById("program-start-date-container");
    let startDateText = '';
    if (startDateContainer && startDateContainer.style.display !== 'none' && startDateSelect) {
      startDateText = getFormattedStartDate(startDateSelect.value, currentLang);
    }

    const cetTime = getCETTime(selectedDate, selectedSlot);
    const timeDisplay = cetTime ? `${selectedSlot} (CST) / ${cetTime}` : `${selectedSlot} (CST)`;

    if (method === 'email') {
      let mailSubject = "";
      let mailBody = "";
      const startLine = startDateText 
        ? (currentLang === 'de' ? `\n- Gewünschter Starttermin: ${startDateText}` : `\n- Desired Start Date: ${startDateText}`)
        : "";
      if (currentLang === 'de') {
        mailSubject = `Hong Dao TCM Anmeldung - ${name}`;
        mailBody = `Hallo Nanjing,\n\nich möchte ein kostenloses 15-minütiges Beratungsgespräch buchen.\n\nHier sind meine Details:\n\n- Name: ${name}\n- E-Mail: ${email}\n- Telefon: ${phone}\n- Gewünschtes Programm: ${programText}${startLine}\n- Datum: ${selectedDate}\n- Uhrzeit: ${timeDisplay}\n\nAnmerkung/Beschwerden:\n${message}\n\nVielen Dank!`;
      } else {
        mailSubject = `Hong Dao TCM Consultation Booking - ${name}`;
        mailBody = `Hello Nanjing,\n\nI would like to book a free 15-minute consultation.\n\nHere are my details:\n\n- Name: ${name}\n- Email: ${email}\n- Phone: ${phone}\n- Program: ${programText}${startLine}\n- Date: ${selectedDate}\n- Time: ${timeDisplay}\n\nMessage/Symptoms:\n${message}\n\nThank you!`;
      }

      openEmailDispatchModal(mailSubject, mailBody);
      closeModal();
      
      // Reset form
      if (form) {
        form.reset();
        if (startDateContainer) startDateContainer.style.display = "none";
      }
      selectedDate = null;
      selectedSlot = null;
      const slotsContainer = document.getElementById("slots-container");
      if (slotsContainer) slotsContainer.innerHTML = "";
    } else {
      // WhatsApp
      let waText = "";
      const startLine = startDateText 
        ? (currentLang === 'de' ? `\n- *Gewünschter Starttermin*: ${startDateText}` : `\n- *Desired Start Date*: ${startDateText}`)
        : "";
      if (currentLang === 'de') {
        waText = `Hallo Nanjing,\n\nich möchte ein kostenloses 15-minütiges Beratungsgespräch buchen.\n\nHier sind meine Details:\n- *Name*: ${name}\n- *E-Mail*: ${email}\n- *Telefon*: ${phone}\n- *Gewünschtes Programm*: ${programText}${startLine}\n- *Datum*: ${selectedDate}\n- *Uhrzeit*: ${timeDisplay}\n- *Anmerkung*: ${message}\n\nVielen Dank!`;
      } else {
        waText = `Hello Nanjing,\n\nI would like to book a free 15-minute consultation.\n\nHere are my details:\n- *Name*: ${name}\n- *Email*: ${email}\n- *Phone*: ${phone}\n- *Program*: ${programText}${startLine}\n- *Date*: ${selectedDate}\n- *Time*: ${timeDisplay}\n- *Message*: ${message}\n\nThank you!`;
      }

      const encodedText = encodeURIComponent(waText);
      const waUrl = `https://wa.me/529841408335?text=${encodedText}`;
      window.open(waUrl, '_blank');

      // Show success toast on screen
      showBookingToast();
      closeModal();
      
      // Reset form
      if (form) {
        form.reset();
        if (startDateContainer) startDateContainer.style.display = "none";
      }
      selectedDate = null;
      selectedSlot = null;
      const slotsContainer = document.getElementById("slots-container");
      if (slotsContainer) slotsContainer.innerHTML = "";
    }
  }

  if (submitEmailBtn) {
    submitEmailBtn.addEventListener("click", () => processBooking('email'));
  }
  if (submitWhatsappBtn) {
    submitWhatsappBtn.addEventListener("click", () => processBooking('whatsapp'));
  }
}

function updateDateSlotLabels() {
  const dateInput = document.getElementById("consultation-date");
  if (dateInput) {
    // Standard validation
  }
}

// Generate valid Wednesdays and Saturdays for slot picking
function generateTimeSlots() {
  const slotsContainer = document.getElementById("slots-container");
  if (!slotsContainer) return;

  slotsContainer.innerHTML = "";

  if (!selectedDate) return;

  const dateObj = new Date(selectedDate);
  const day = dateObj.getDay(); // 3 = Wed, 6 = Sat

  // Validate if Wednesday or Saturday
  if (day !== 3 && day !== 6) {
    const warning = document.createElement("div");
    warning.style.color = "var(--terracotta)";
    warning.style.gridColumn = "1 / -1";
    warning.style.fontSize = "0.9rem";
    warning.textContent = currentLang === 'de' 
      ? "Bitte wählen Sie einen Mittwoch oder Samstag." 
      : "Please select a Wednesday or Saturday.";
    slotsContainer.appendChild(warning);
    return;
  }

  // Display automatic timezone conversion note if applicable
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (isTimezoneCET(tz)) {
    const note = document.createElement("div");
    note.style.gridColumn = "1 / -1";
    note.style.fontSize = "0.85rem";
    note.style.color = "var(--text-muted)";
    note.style.marginBottom = "0.5rem";
    note.textContent = currentLang === 'de'
      ? `Zeiten automatisch in Ihre Ortszeit (${tz.split('/').pop().replace(/_/g, ' ')}) umgerechnet:`
      : `Times automatically converted to your local time (${tz.split('/').pop().replace(/_/g, ' ')}):`;
    slotsContainer.appendChild(note);
  }

  // Consultation times: Chinese local time 14:00 - 20:00. Slots every 30 mins
  const slots = [
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ];

  slots.forEach(slot => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "slot-btn";
    
    // Check if timezone is CET/CEST and format button content
    const cetTime = getCETTime(selectedDate, slot);
    if (cetTime) {
      btn.style.display = "flex";
      btn.style.flexDirection = "column";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "center";
      btn.style.padding = "0.4rem 0.2rem";
      
      btn.innerHTML = `<div>${slot} (CST)</div><div style="font-size: 0.75rem; opacity: 0.8; margin-top: 0.2rem; font-weight: normal;">${cetTime}</div>`;
    } else {
      btn.textContent = `${slot} (CST)`;
    }

    btn.addEventListener("click", () => {
      // Unselect previous
      document.querySelectorAll(".slot-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedSlot = slot;
    });
    slotsContainer.appendChild(btn);
  });
}

// 4. Modal Booking Window Control
function initBookingModal() {
  const overlay = document.getElementById("booking-modal-overlay");
  const closeBtn = document.getElementById("booking-modal-close");
  
  // Close events
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  // Bind all "Apply Now" buttons
  document.querySelectorAll(".apply-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });
}

function openModal() {
  const overlay = document.getElementById("booking-modal-overlay");
  if (overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Disable scroll
    
    // Disable exit intent popup since they are booking
    sessionStorage.setItem("hongdao-popup-dismissed", "true");
    const popup = document.getElementById("marketing-popup");
    if (popup) {
      popup.classList.remove("active");
    }
  }
}

function closeModal() {
  const overlay = document.getElementById("booking-modal-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// 5. Toast notification
function showBookingToast() {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = translations[currentLang]["booking-success-toast"];
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 4000);
}

function switchContactTab(tabId) {
  const tabs = document.querySelectorAll(".contact-tab-btn");
  const contents = document.querySelectorAll(".contact-tab-content");
  
  tabs.forEach(t => {
    const isTarget = t.getAttribute("data-tab") === tabId;
    t.classList.toggle("active", isTarget);
    t.style.color = isTarget ? "var(--terracotta)" : "var(--text-muted)";
    t.style.borderBottomColor = isTarget ? "var(--terracotta)" : "transparent";
  });
  
  contents.forEach(c => {
    const isTarget = c.getAttribute("id") === `tab-content-${tabId}`;
    c.style.display = isTarget ? "block" : "none";
  });
}

// 5.5 Contact section tab switching
function initContactTabs() {
  const tabs = document.querySelectorAll(".contact-tab-btn");
  if (tabs.length === 0) return;
  
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      switchContactTab(tabId);
    });
  });
}

// 5.6 Mobile navigation menu toggle
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger-btn");
  const sidebar = document.getElementById("sidebar");
  
  if (hamburger && sidebar) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
    
    // Close menu when link is clicked
    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }
}

// 6. FAQs Collapsible Logic
function initFaq() {
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      // Close all
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
      // Toggle current
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// 7. Navbar scroll state
function initNavbarScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// 8. Marketing Popup logic
function initMarketingPopup() {
  const popup = document.getElementById("marketing-popup");
  const closeBtn = document.getElementById("marketing-popup-close");
  const applyBtn = document.getElementById("marketing-popup-cta");

  if (!popup) return;

  let hasInteracted = false;
  let timeElapsed = false;

  // Require at least 5 seconds of presence to prevent showing at the very beginning
  setTimeout(() => {
    timeElapsed = true;
  }, 5000);

  // Set hasInteracted on scroll, click, or keyboard input
  const setInteracted = () => {
    hasInteracted = true;
    document.removeEventListener("scroll", setInteracted);
    document.removeEventListener("click", setInteracted);
    document.removeEventListener("keydown", setInteracted);
  };

  document.addEventListener("scroll", setInteracted);
  document.addEventListener("click", setInteracted);
  document.addEventListener("keydown", setInteracted);

  // Show popup on exit intent (when mouse leaves the top of the viewport)
  const handleExitIntent = (e) => {
    const isBookingActive = document.getElementById("booking-modal-overlay")?.classList.contains("active");
    
    // Only show if user has interacted, at least 5 seconds have passed,
    // they haven't already dismissed it, and the booking modal is not active
    if (e.clientY < 15 && hasInteracted && timeElapsed && !isBookingActive) {
      popup.classList.add("active");
      document.removeEventListener("mouseleave", handleExitIntent);
    }
  };

  if (!sessionStorage.getItem("hongdao-popup-dismissed")) {
    document.addEventListener("mouseleave", handleExitIntent);
  }

  const dismissPopup = () => {
    popup.classList.remove("active");
    sessionStorage.setItem("hongdao-popup-dismissed", "true");
    document.removeEventListener("mouseleave", handleExitIntent);
  };

  if (closeBtn) closeBtn.addEventListener("click", dismissPopup);
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      dismissPopup();
      openModal();
      
      // Auto fill a comment about discount
      const messageField = document.getElementById("consult-message");
      if (messageField) {
        messageField.value = currentLang === 'de'
          ? "Ich möchte den Rabattcode HONGDAO2026 für meine Buchung anwenden."
          : "I would like to apply the HONGDAO2026 discount code to my booking.";
      }
    });
  }
}

// 9. TCM Technology Modal Logic
function initTechModal() {
  const techBtn = document.getElementById("tech-modal-btn");
  const techOverlay = document.getElementById("tech-modal");
  const techCloseBtn = document.getElementById("tech-modal-close");

  if (techBtn && techOverlay) {
    techBtn.addEventListener("click", (e) => {
      e.preventDefault();
      techOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  const closeTechModal = () => {
    if (techOverlay) {
      techOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  };

  if (techCloseBtn) {
    techCloseBtn.addEventListener("click", closeTechModal);
  }

  if (techOverlay) {
    techOverlay.addEventListener("click", (e) => {
      if (e.target === techOverlay) closeTechModal();
    });
  }
}

// 10. Lightbox Gallery Controller
function initLightbox() {
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!lightbox || galleryItems.length === 0) return;

  let currentIndex = 0;

  function showImage(index) {
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    currentIndex = index;

    const item = galleryItems[currentIndex];
    const imgSrc = item.getAttribute("data-img");
    const captionText = currentLang === 'de' 
      ? item.getAttribute("data-desc-de") 
      : item.getAttribute("data-desc-en");

    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      showImage(index);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });
}

function openEmailDispatchModal(mailSubject, mailBody) {
  let oldModal = document.getElementById("email-dispatch-modal");
  if (oldModal) oldModal.remove();

  const modal = document.createElement("div");
  modal.id = "email-dispatch-modal";
  modal.className = "modal-overlay active";
  modal.style.zIndex = "3000";

  const recipient = "nanjing.deng18@gmail.com";

  const isDe = currentLang === 'de';
  const title = isDe ? "E-Mail vorbereitet!" : "Email Prepared!";
  const subtitle = isDe ? "Bitte wählen Sie eine Option, um die Nachricht abzuschicken:" : "Please choose how you would like to send the message:";
  const labelTo = isDe ? "An:" : "To:";
  const labelSubject = isDe ? "Betreff:" : "Subject:";
  const labelBody = isDe ? "Inhalt:" : "Body:";
  const btnGmail = isDe ? "✉️ Über Gmail (Webmail) senden" : "✉️ Send via Gmail (Webmail)";
  const btnOutlook = isDe ? "💻 Über Outlook (Webmail) senden" : "💻 Send via Outlook (Webmail)";
  const btnMailto = isDe ? "📱 Mit Standard-Mail-App öffnen" : "📱 Open with Default Mail App";
  const btnCopy = isDe ? "📋 Kopieren & manuell senden" : "📋 Copy & Send Manually";
  const copySuccess = isDe ? "✓ Kopiert!" : "✓ Copied!";

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${recipient}&subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  modal.innerHTML = `
    <div class="modal-window" style="max-width: 550px; border-radius: var(--border-radius); overflow: hidden; background-color: var(--bg-cream-light);">
      <div class="modal-header" style="background-color: var(--terracotta); color: white; padding: 1.2rem 2rem; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; font-weight: 400; margin: 0; color: white;">${title}</h3>
        <button class="modal-close" onclick="closeEmailDispatchModal()" style="font-size: 2rem; background: none; border: none; color: white; cursor: pointer; line-height: 1;">&times;</button>
      </div>
      <div class="modal-body" style="padding: 2rem; display: flex; flex-direction: column; gap: 1.2rem;">
        <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">${subtitle}</p>
        
        <div style="background-color: var(--bg-cream-dark); padding: 1rem; border-radius: 8px; font-size: 0.85rem; border: 1px solid rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 0.4rem;">
          <div><strong>${labelTo}</strong> <code>${recipient}</code></div>
          <div><strong>${labelSubject}</strong> <span>${mailSubject}</span></div>
          <div style="white-space: pre-wrap; max-height: 100px; overflow-y: auto; margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid rgba(0,0,0,0.08); color: var(--text-muted); line-height: 1.4;">${mailBody}</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.8rem; margin-top: 0.4rem;">
          <a href="${gmailUrl}" target="_blank" onclick="closeEmailDispatchModal()" class="btn btn-terracotta" style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; text-decoration: none; padding: 0.8rem; font-size: 0.95rem;">
            ${btnGmail}
          </a>
          <a href="${outlookUrl}" target="_blank" onclick="closeEmailDispatchModal()" class="btn btn-outline" style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; text-decoration: none; padding: 0.8rem; font-size: 0.95rem; border: 2px solid var(--terracotta); border-radius: var(--border-radius); color: var(--terracotta); background: none; font-weight: 500;">
            ${btnOutlook}
          </a>
          <a href="${mailtoUrl}" onclick="closeEmailDispatchModal()" class="btn btn-outline" style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; text-decoration: none; padding: 0.8rem; font-size: 0.95rem; border: 2px solid var(--text-muted); border-radius: var(--border-radius); color: var(--text-muted); background: none; font-weight: 500;">
            ${btnMailto}
          </a>
          <button id="copy-mail-btn" class="btn btn-outline" style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.8rem; font-size: 0.95rem; border: 2px solid var(--jade-green); border-radius: var(--border-radius); color: var(--jade-green); background: none; font-weight: 500; cursor: pointer;">
            ${btnCopy}
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  const copyBtn = modal.querySelector("#copy-mail-btn");
  copyBtn.addEventListener("click", () => {
    const fullText = `An: ${recipient}\nBetreff: ${mailSubject}\n\n${mailBody}`;
    navigator.clipboard.writeText(fullText).then(() => {
      copyBtn.textContent = copySuccess;
      copyBtn.style.backgroundColor = "rgba(141, 172, 142, 0.15)";
      setTimeout(() => {
        closeEmailDispatchModal();
      }, 1500);
    }).catch(err => {
      console.error("Clipboard copy failed: ", err);
    });
  });
}

function closeEmailDispatchModal() {
  const modal = document.getElementById("email-dispatch-modal");
  if (modal) {
    modal.remove();
    document.body.style.overflow = "auto";
  }
}

window.openEmailDispatchModal = openEmailDispatchModal;
window.closeEmailDispatchModal = closeEmailDispatchModal;


// ==========================================
// WeChat Article Modal Content & Operations
// ==========================================
const articlesContent = {
  impressum: {
    de: {
      title: "Impressum",
      body: `
        <p><strong>Solvea Biosciences Laboratory LLC</strong></p>
        <p>Registered Office: 30 North Gould Street, Sheridan, WY 82801, USA</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Vertretungsberechtigte Geschäftsführung</h4>
        <p>
          Deng Nanjing
        </p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Kontakt</h4>
        <p>
          E-Mail: <a href="mailto:nanjing.deng18@gmail.com" style="color: var(--terracotta); text-decoration: underline;">nanjing.deng18@gmail.com</a><br>
          Telefon/WhatsApp: +52 984 140 8335 (Deng Nanjing)
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Haftungsausschluss</h4>
        <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-muted);">
          Die angebotenen Gesundheitspflege-Programme und Beratungen dienen der Gesundheitsprävention und der Anregung der Selbstheilungskräfte des Körpers. Sie stellen keine medizinische Therapie oder Heilbehandlung im Sinne des Gesetzes dar und ersetzen nicht den Besuch bei einem zugelassenen Arzt oder Heilpraktiker.
        </p>
      `
    },
    en: {
      title: "Impressum / Legal Notice",
      body: `
        <p><strong>Solvea Biosciences Laboratory LLC</strong></p>
        <p>Registered Office: 30 North Gould Street, Sheridan, WY 82801, USA</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Represented by</h4>
        <p>
          Deng Nanjing
        </p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Contact Information</h4>
        <p>
          Email: <a href="mailto:nanjing.deng18@gmail.com" style="color: var(--terracotta); text-decoration: underline;">nanjing.deng18@gmail.com</a><br>
          Phone/WhatsApp: +52 984 140 8335 (Deng Nanjing)
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Disclaimer</h4>
        <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-muted);">
          The health maintenance programs, consultations, and vibrational therapies offered are intended for wellness support and self-care education. They do not constitute medical treatments or healing procedures under the law and are not a substitute for professional medical diagnostics, advice, or treatment by a licensed physician.
        </p>
      `
    }
  },
  privacy: {
    de: {
      title: "Datenschutzerklärung",
      body: `
        <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Nachfolgend informieren wir Sie über die Verarbeitung Ihrer Daten im Rahmen unserer Tätigkeiten und dieser Website.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">1. Verantwortliche Stelle</h4>
        <p>
          Solvea Biosciences Laboratory LLC<br>
          E-Mail: <a href="mailto:nanjing.deng18@gmail.com" style="color: var(--terracotta); text-decoration: underline;">nanjing.deng18@gmail.com</a>
        </p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">2. Erfassung und Verarbeitung von Daten</h4>
        <p>
          Wenn Sie sich für eines unserer Gesundheitspflege-Programme registrieren oder uns kontaktieren, verarbeiten wir die von Ihnen freiwillig eingegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, Anmerkungen zur Gesundheitshistorie sowie gewünschtes Datum und Uhrzeit).
        </p>
        <p>
          Diese Daten dienen ausschließlich der Organisation der Gesundheitspflege-Sitzungen und der Betreuung. Medizinische Angaben werden streng vertraulich behandelt und nicht an unbefugte Dritte weitergegeben.
        </p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">3. Ihre Rechte</h4>
        <p>
          Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Wenden Sie sich hierzu bitte an die oben angegebene E-Mail-Adresse.
        </p>
      `
    },
    en: {
      title: "Privacy Policy",
      body: `
        <p>We take the protection of your personal data very seriously. Below we provide information on how your data is processed in connection with our activities and this website.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">1. Controller / Responsible Party</h4>
        <p>
          Solvea Biosciences Laboratory LLC<br>
          Email: <a href="mailto:nanjing.deng18@gmail.com" style="color: var(--terracotta); text-decoration: underline;">nanjing.deng18@gmail.com</a>
        </p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">2. Collection and Processing of Data</h4>
        <p>
          When you register for one of our health maintenance programs or contact us, we process the information you voluntarily submit (name, email address, phone number, medical history notes, and requested date/time).
        </p>
        <p>
          This data is processed solely for organizing health maintenance sessions and facilitating program attendance. Any health-related information is kept strictly confidential and will never be shared with unauthorized third parties.
        </p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">3. Your Rights</h4>
        <p>
          You have the right at any time to receive free information about your stored personal data, its origin, recipients, the purpose of data processing, and the right to request correction, blocking, or deletion of this data. To exercise these rights, please contact us at the email address provided above.
        </p>
      `
    }
  },
  wechat: {
    de: {
      title: "WeChat Kontakt & Anmeldung",
      body: `
        <p style="margin-bottom: 1.5rem; color: var(--text-muted);">
          Scannen Sie einen der folgenden QR-Codes mit WeChat, um direkt mit uns in Kontakt zu treten oder sich für Behandlungen und das Retreat anzumelden. Alternativ können Sie auf den Code klicken oder tippen, um den Link direkt zu öffnen.
        </p>
        
        <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; margin-top: 1.5rem;">
          
          <!-- Personal WeChat Card -->
          <div style="flex: 1; min-width: 250px; max-width: 320px; background-color: var(--bg-cream-dark); padding: 1.5rem; border-radius: var(--border-radius); box-shadow: var(--shadow-subtle); display: flex; flex-direction: column; align-items: center; text-align: center;">
            <h4 style="font-weight: 600; color: var(--terracotta); margin-bottom: 0.5rem;">Nanjing Deng</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.2rem; min-height: 48px;">
              Persönlicher Kontakt für allgemeine Fragen, Beratung und Retreat-Vorbereitungen.
            </p>
            <a href="https://u.wechat.com/kEjurl3_Hgpz9xyO2LMPXO4?s=2" target="_blank" style="display: block; border-radius: 8px; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); transition: transform 0.2s ease;">
              <img src="images/wechat_personal.png" alt="WeChat Personal Contact QR Code" style="width: 180px; height: 180px; display: block;">
            </a>
            <p style="font-size: 0.9rem; margin-top: 1rem; font-weight: 500;">
              <a href="https://u.wechat.com/kEjurl3_Hgpz9xyO2LMPXO4?s=2" target="_blank" style="color: var(--terracotta); text-decoration: underline;">
                Link direkt öffnen
              </a>
            </p>
          </div>
          
          <!-- Clinic Official Account Card -->
          <div style="flex: 1; min-width: 250px; max-width: 320px; background-color: var(--bg-cream-dark); padding: 1.5rem; border-radius: var(--border-radius); box-shadow: var(--shadow-subtle); display: flex; flex-direction: column; align-items: center; text-align: center;">
            <h4 style="font-weight: 600; color: var(--terracotta); margin-bottom: 0.5rem;">Hong Dao Clinic</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.2rem; min-height: 48px;">
              Offizieller Service-Account für Klinik-Anmeldung, Terminverwaltung und Kräuterdekokt-Bestellungen.
            </p>
            <a href="https://weixin.qq.com/q/022Br2ArHVfrJ10000M07T" target="_blank" style="display: block; border-radius: 8px; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); transition: transform 0.2s ease;">
              <img src="images/wechat_clinic.png" alt="WeChat Official Account QR Code" style="width: 180px; height: 180px; display: block;">
            </a>
            <p style="font-size: 0.9rem; margin-top: 1rem; font-weight: 500;">
              <a href="https://weixin.qq.com/q/022Br2ArHVfrJ10000M07T" target="_blank" style="color: var(--terracotta); text-decoration: underline;">
                Link direkt öffnen
              </a>
            </p>
          </div>
          
        </div>
      `
    },
    en: {
      title: "WeChat Contact & Registration",
      body: `
        <p style="margin-bottom: 1.5rem; color: var(--text-muted);">
          Scan one of the following QR codes with WeChat to contact us directly or to register for treatments and retreats. Alternatively, you can click or tap on the code to open the link directly.
        </p>
        
        <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; margin-top: 1.5rem;">
          
          <!-- Personal WeChat Card -->
          <div style="flex: 1; min-width: 250px; max-width: 320px; background-color: var(--bg-cream-dark); padding: 1.5rem; border-radius: var(--border-radius); box-shadow: var(--shadow-subtle); display: flex; flex-direction: column; align-items: center; text-align: center;">
            <h4 style="font-weight: 600; color: var(--terracotta); margin-bottom: 0.5rem;">Nanjing Deng</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.2rem; min-height: 48px;">
              Personal contact for general inquiries, consultation and retreat preparations.
            </p>
            <a href="https://u.wechat.com/kEjurl3_Hgpz9xyO2LMPXO4?s=2" target="_blank" style="display: block; border-radius: 8px; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); transition: transform 0.2s ease;">
              <img src="images/wechat_personal.png" alt="WeChat Personal Contact QR Code" style="width: 180px; height: 180px; display: block;">
            </a>
            <p style="font-size: 0.9rem; margin-top: 1rem; font-weight: 500;">
              <a href="https://u.wechat.com/kEjurl3_Hgpz9xyO2LMPXO4?s=2" target="_blank" style="color: var(--terracotta); text-decoration: underline;">
                Open Link Directly
              </a>
            </p>
          </div>
          
          <!-- Clinic Official Account Card -->
          <div style="flex: 1; min-width: 250px; max-width: 320px; background-color: var(--bg-cream-dark); padding: 1.5rem; border-radius: var(--border-radius); box-shadow: var(--shadow-subtle); display: flex; flex-direction: column; align-items: center; text-align: center;">
            <h4 style="font-weight: 600; color: var(--terracotta); margin-bottom: 0.5rem;">Hong Dao Clinic</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.2rem; min-height: 48px;">
              Official Service Account for clinic registration, appointment scheduling, and herbal decoction orders.
            </p>
            <a href="https://weixin.qq.com/q/022Br2ArHVfrJ10000M07T" target="_blank" style="display: block; border-radius: 8px; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); transition: transform 0.2s ease;">
              <img src="images/wechat_clinic.png" alt="WeChat Official Account QR Code" style="width: 180px; height: 180px; display: block;">
            </a>
            <p style="font-size: 0.9rem; margin-top: 1rem; font-weight: 500;">
              <a href="https://weixin.qq.com/q/022Br2ArHVfrJ10000M07T" target="_blank" style="color: var(--terracotta); text-decoration: underline;">
                Open Link Directly
              </a>
            </p>
          </div>
          
        </div>
      `
    }
  },
  xu: {
    de: {
      title: "PROFESSOR Xu Ruqi – Chefarzt & Leitender TCM-Experte",
      body: `
        <p style="margin-bottom: 1rem;"><strong>Fachabteilung:</strong> Traditionelle Chinesische Medizin (TCM)</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Spezialgebiete</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 500;">Behandlung mit klassischen TCM-Kräuterrezepturen bei:</p>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li>Tumoren und schwierigen/komplexen Erkrankungen</li>
          <li>Herz-Kreislauf- und zerebrovaskulären Erkrankungen (wie koronare Herzkrankheit, Bluthochdruck und Schlaganfall-Spätfolgen)</li>
          <li>Diabetes, Lebererkrankungen, Magenbeschwerden, Nierenerkrankungen und anderen stoffwechsel- und organbedingten Leiden</li>
          <li>Rheumatischen und Autoimmunerkrankungen wie rheumatoide Arthritis und Morbus Bechterew</li>
          <li>Fortpflanzungsstörungen einschließlich männlicher und weiblicher Unfruchtbarkeit</li>
        </ul>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Biografie</h4>
        <p style="margin-bottom: 1rem;">Xu Ruqi ist ein renommierter Gelehrter der Shanghan Lun (Abhandlung über Kälte-Krankheiten).</p>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li>Klinischer Sonder-Experte der Pekinger Universität für Chinesische Medizin</li>
          <li>Klinischer Mentor an der Qihuang-Akademie</li>
          <li>Leiter des Behandlungszentrums für Onkologie und komplexe Krankheiten der Hong Dao TCM-Klinik</li>
        </ul>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Wissenschaftliche Philosophie</h4>
        <p style="margin-bottom: 1rem;">Er befürwortet die Integration von alter und moderner Medizin sowie die Verschmelzung von chinesischer und westlicher Medizin. Er hat ein Diagnose- und Behandlungsmodell etabliert, das sich konzentriert auf:</p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li>Pulsgestützte Syndromdifferenzierung</li>
          <li>Anwendung klassischer Kräuterrezepturen</li>
        </ul>
        <p style="margin-bottom: 0.5rem; font-weight: 500;">Seine Arbeit konzentriert sich darauf:</p>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li>Die wissenschaftlichen Prinzipien hinter klassischen TCM-Texten und Dosis-Wirkungs-Beziehungen von Kräuterrezepturen aufzudecken</li>
          <li>Die Präzision von Diagnose und Behandlung zu fördern</li>
          <li>Die Anwendung von Kräuterrezepturen zu standardisieren</li>
          <li>Die Wirksamkeit der Behandlung messbarer und sichtbarer zu machen</li>
        </ul>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Wissenschaftliche Leistungen</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li>Begründer der Diagnosemethode „Ping Mai Bian Zheng“ (Ausgewogene Puls-Syndromdifferenzierung), welche in das Projekt zur Förderung fortschrittlicher und geeigneter Technologien der Nationalen Administration für Traditionelle Chinesische Medizin aufgenommen wurde (2017)</li>
          <li>Hat mehr als 2.000 TCM-Praktiker aus dem In- und Ausland ausgebildet</li>
          <li>Organisierte dutzende „Ping Mai Bian Zheng“-Ausbildungsprogramme</li>
          <li>Veranstaltete nationale akademische Konferenzen, einschließlich fortgeschrittener Seminare zur Anwendung klassischer Rezepturen und das China Herbal Formula Medicine Forum</li>
          <li>Dozent für das Internationale Jingfang-Programm an der Guangzhou Universität für Chinesische Medizin</li>
          <li>Autor des Buchs „WU DAO ZHANG ZHONG JING“ (auf deutsch: „Den Weg des Zhang Zhong Jing erkennen“). In diesem Buch beschreibt er, wie der Großmeister Zhang das erste Mal im Traum zu ihm kam, ihm die genauen Formeln im Traum mitteilte und seitdem an seiner Seite ist, um ihn in der Heilung von Tausenden von Menschen zu unterstützen (ein Zeichen dafür, dass er energetisch nach oben angebunden ist).</li>
        </ul>
      `
    },
    en: {
      title: "PROFESSOR Xu Ruqi – Chief Physician & Senior TCM Expert",
      body: `
        <p style="margin-bottom: 1rem;"><strong>Department:</strong> Traditional Chinese Medicine (TCM)</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Specialties</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 500;">Treatment with classical TCM herbal formulas for:</p>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li>Tumors and difficult/complex diseases</li>
          <li>Cardiovascular and cerebrovascular diseases (such as coronary heart disease, hypertension, and post-stroke sequelae)</li>
          <li>Diabetes, liver disease, stomach disorders, kidney disease, and other metabolic and organ-related conditions</li>
          <li>Rheumatic and autoimmune diseases such as rheumatoid arthritis and ankylosing spondylitis</li>
          <li>Reproductive disorders including male and female infertility</li>
        </ul>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Biography</h4>
        <p style="margin-bottom: 1rem;">Xu Ruqi is a renowned scholar of the Shanghan Lun (Treatise on Cold Damage Diseases).</p>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li>Clinical Distinguished Expert of the 3rd Beijing University of Chinese Medicine</li>
          <li>Clinical Mentor at Qihuang College</li>
          <li>Head of the Oncology and Difficult Diseases Treatment Center at Hong Dao TCM Clinic</li>
        </ul>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Academic Philosophy</h4>
        <p style="margin-bottom: 1rem;">He advocates the integration of ancient and modern medicine as well as the fusion of Chinese and Western medicine. He has established a diagnostic and treatment model centered on:</p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li>Pulse-based pattern differentiation</li>
          <li>Application of classical herbal formulas</li>
        </ul>
        <p style="margin-bottom: 0.5rem; font-weight: 500;">His work focuses on:</p>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li>Revealing the scientific principles behind classical TCM texts and dosage-effect relationships of herbal formulas</li>
          <li>Promoting precision diagnosis and treatment</li>
          <li>Standardizing herbal formula application</li>
          <li>Making treatment efficacy more measurable and visible</li>
        </ul>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Academic Achievements</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li>Founded the “Ping Mai Bian Zheng” (Pulse Equilibrium Pattern Differentiation) diagnostic method, which was included in the National Administration of Traditional Chinese Medicine’s High-Tech Appropriate Technology Promotion Project (2017)</li>
          <li>Has trained more than 2,000 TCM practitioners from China and abroad</li>
          <li>Organized dozens of “Ping Mai Bian Zheng” training programs</li>
          <li>Hosted national academic conferences including advanced seminars on classical formula application and the China Herbal Formula Medicine Forum</li>
          <li>Lecturer for the International Classical Formula Program at Guangzhou University of Chinese Medicine</li>
          <li>Author of the book “WU DAO ZHANG ZHONG JING” (in English: “Recognizing the Way of Zhang Zhong Jing”). In this book, he describes how Grandmaster Zhang first came to him in a dream, communicated the exact formulas to him in the dream, and has been by his side ever since to support him in healing thousands of people (anchoring his spiritual connection to the lineage).</li>
        </ul>
      `
    }
  },
  nanjing: {
    de: {
      title: "Heilpraktikerin Deng Nanjing – Gründerin, Qi Gong & Klangtherapeutin",
      body: `
        <p><strong>Heilpraktikerin Deng Nanjing (邓楠景)</strong> ist die visionäre Gründerin des Hong Dao Inner Retreats und die internationale Brücke zwischen der Klinik und Heilsuchenden weltweit. Als Mutter engagiert sie sich leidenschaftlich für den Schutz einer natürlichen Umwelt, die das Wohlergehen von Frauen und Kindern in den Mittelpunkt stellt. Sie schlägt Brücken zwischen authentischer östlicher Lebenspflege und westlichen Wegen der Stressregulation.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Heilungs- & Therapieansatz</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Akkreditierte Klangtherapie</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Tiefenwirkung mittels nepalesischer Klangschalen, Frequenz-Gongs und Stimmgabeln zur Wiederherstellung der zellulären Harmonie.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Qi Gong & 6 Heilende Klänge</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Tägliche Morgen-Praxis mit den Teilnehmern zur Harmonisierung des Energieflusses durch akustische Resonanz und bewusste Bewegung.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Befreiung der Stimme & Seelische Klärung</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Gezielte Stimmarbeit zur emotionalen Befreiung, zum Lösen von Schuld- und Schamgefühlen und zur Entfaltung des wahren Potenzials.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Vegetative Regulation</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Neuromodulation und Vagusnerv-Stimulation bei Burnout, depressiven Verstimmungen und emotionalen Blockaden.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Sensorische Kräuterpädagogik</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Leitung von Teezeremonien und Kräuter-Malworkshops für Kinder und Familien zur Stärkung der emotionalen Wahrnehmung.</span>
          </li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Ausbildung & Lebensweg</h4>
        <p style="margin-bottom: 1rem;">Sie ist zertifizierte Klangtherapeutin, Heilpraktikerin und Meditationsleiterin. Auf ihren Reisen hat sie mit indigenen Stämmen auf der ganzen Welt gelebt und von ihren natürlichen Heilweisen und tiefen Weisheiten gelernt. Sie spricht fließend fünf Sprachen: Deutsch, Englisch, Chinesisch, Italienisch und Spanisch.</p>
      `
    },
    en: {
      title: "Heilpraktikerin Deng Nanjing – Founder, Qi Gong & International Sound Therapist",
      body: `
        <p><strong>Heilpraktikerin Deng Nanjing (邓楠景)</strong> is the visionary founder of the Hong Dao Inner Retreat and the international bridge between the clinic and health seekers worldwide. As a mother, she is deeply committed to protecting a natural environment that puts the well-being of women and children at the center. She bridges classical Eastern healing arts with modern neuro-vibrational therapy.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Therapeutic Focus</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Vibrational Sound Therapy</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Utilizing gongs, singing bowls, and tuning forks to induce cellular resonance and deep meditation.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Qi Gong & 6 Healing Sounds</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Daily morning practice with participants, integrating acoustics and movement to balance organ energies.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Voice Liberation & Emotional Release</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Specialized vocal and expression work for emotional release, overcoming guilt and shame, and expanding self-awareness.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Autonomic Balance</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Regulating the vagus nerve to alleviate chronic anxiety, depression, and adrenal exhaustion.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Parent-Child Sensory Workshops</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Creative direction of tea ceremonies and botanical painting classes to nurture emotional mindfulness.</span>
          </li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Background & Experience</h4>
        <p style="margin-bottom: 1rem;">Certified Sound Healing Practitioner, Heilpraktikerin, and Meditation Guide. She has lived with indigenous tribes all over the world, learning directly from their traditional natural healing methods. She speaks five languages: German, English, Chinese, Italian, and Spanish.</p>
      `
    }
  },
  chen: {
    de: {
      title: "Dr. Chen Kainan – Assistenzarzt",
      body: `
        <p><strong>Dr. Chen Kainan (陈恺楠)</strong> ist Assistenzarzt an der Hong Dao Klinik und unterstützt Professor Xu bei der täglichen klinischen Arbeit.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Schwerpunkte</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Akupunktur</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Durchführung von Akupunktursitzungen nach den Anweisungen von Professor Xu.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Klinische Unterstützung</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Patientenbetreuung, Vor- und Nachbereitung von Therapiesitzungen sowie Koordination von Kräuterrezepturen.</span>
          </li>
        </ul>
      `
    },
    en: {
      title: "Dr. Chen Kainan – Assistant Physician",
      body: `
        <p><strong>Dr. Chen Kainan (陈恺楠)</strong> is an assistant physician at the Hong Dao Clinic, supporting Professor Xu in daily clinical operations.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Focus Areas</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Acupuncture</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Performing acupuncture sessions under the direct instruction of Professor Xu.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Clinical Support</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Patient care, preparation, and follow-up for therapy sessions, as well as coordinating herbal remedies.</span>
          </li>
        </ul>
      `
    }
  },
  hailin: {
    de: {
      title: "Dr. Zhang Hailin – Leiterin des Dekokt-Zentrums",
      body: `
        <p><strong>Dr. Zhang Hailin (张海林)</strong> leitet unser hochmodernes Dekokt-Zentrum und garantiert die authentische Weiterverarbeitung der Rohkräuter.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Verantwortungsbereich</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Dao Di Qualitätsprüfung</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Identifikation und Qualitätskontrolle aller importierten biologischen Rohkräuter.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Wissenschaftliche Extraktion</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Überwachung der Kochzeiten und Temperatureinstellungen zur optimalen Wirkstofffreisetzung.</span>
          </li>
        </ul>
      `
    },
    en: {
      title: "Dr. Zhang Hailin – Head of Decoction Center",
      body: `
        <p><strong>Dr. Zhang Hailin (张海林)</strong> manages our state-of-the-art decoction facility, ensuring accurate and pristine herbal compounding.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Responsibilities</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Dao Di Herb Sourcing</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Rigorous authentication of raw materials based on regional ecological origins.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Extraction Precision</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Controlling heat, pressure, and extraction duration to deliver pristine, sterile Ready-to-Drink packages.</span>
          </li>
        </ul>
      `
    }
  },
  cheung: {
    de: {
      title: "Cheung Mingli (张明丽) – Nomadin, Yogalehrerin & Klangarbeiterin",
      content: `
        <p><strong>Cheung Mingli (张明丽)</strong> ist eine Nomadin und Weltenbummlerin mit über 10 Jahren internationaler Erfahrung. Sie integriert Klangtherapie, Bewegung, Atemarbeit und rituelle Praktiken, um die Regulierung des Nervensystems und das ganzheitliche Wohlbefinden in verschiedenen Gemeinschaften weltweit zu unterstützen.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Methoden</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Yoga für Kinder & Erwachsene</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Individuelle und Gruppensitzungen zur Körperwahrnehmung und inneren Balance.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Fächer-Tanz-Therapie</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Bewegungstherapie mit traditionellen Fächern zur emotionalen Entlastung und kreativen Selbstentfaltung.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Klangarbeit</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Klangschalen-Sitzungen und Gong-Bäder zur tiefen Entspannung und energetischen Harmonisierung.</span>
          </li>
        </ul>
      `
    },
    en: {
      title: "Cheung Mingli (张明丽) – Nomad, Yoga Teacher & Sound Worker",
      body: `
        <p><strong>Cheung Mingli (张明丽)</strong> is a nomad and world traveler with over 10 years of international experience. Mingli integrates sound therapy, movement, breathwork and ritual practices to support nervous system regulation and holistic wellbeing across diverse communities worldwide.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Modalities</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Yoga for Children & Adults</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Individual and group sessions for body awareness and inner balance.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Fan Dance Therapy</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Movement therapy with traditional fans for emotional release and creative self-expression.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Sound Work</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Singing bowl sessions and gong baths for deep relaxation and energetic harmonization.</span>
          </li>
        </ul>
      `
    }
  },
  qiao: {
    de: {
      title: "Dr. Qiao Jingwen – Direktorin, Gynäkologie, Stoffwechsel & Schmerztherapie",
      body: `
        <p><strong>Dr. Qiao Jingwen <span style="white-space: nowrap;">(乔靖文)</span></strong> ist Direktorin der Hong Dao Klinik, Co-Gründerin des Zentrums für Kräuterausleitung und eine führende Expertin im Bereich der integrierten chinesischen Gynäkologie und der modernen myofaszialen Schmerztherapie.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Spezialgebiete (Focus Areas)</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Stoffwechsel- & Metabolische Erkrankungen</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Ganzheitliche Regulation bei Diabetes, Fettstoffwechselstörungen, Bluthochdruck und Fettleibigkeit.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Hormonelle & Gynäkologische Leiden</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Spezialisierte Behandlung von Endometriose, extremen Regelschmerzen (Dysmenorrhö), PCOS (Polycystisches Ovarialsyndrom), vorzeitiger Ovarialinsuffizienz und Brustdrüsen-Hyperplasie.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Neurologische & Psychosomatische Störungen</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Chronische Kopfschmerzen, Migräne, Angststörungen, Schlafstörungen und stressbedingte Erschöpfung.</span>
          </li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Akademischer Hintergrund & Biografie</h4>
        <p style="margin-bottom: 1rem;">Bachelor-Abschluss an der renommierten <strong>Fudan-Universität</strong> und staatlich geprüfte und lizenzierte TCM-Ärztin. Sie leitet als Direktorin die Hong Dao Klinik und das wissenschaftliche Rehabilitationszentrum.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Erfahrung & Forschung</h4>
        <p style="margin-bottom: 1rem;">Mit über 10 Jahren praktischer Erfahrung hat Dr. Qiao das System der „Universal-Schmerztherapie“ (万向治痛法) mitentwickelt. Ihre wissenschaftliche Arbeit umfasst die Beteiligung an großen staatlichen Forschungsprojekten der chinesischen Regierung (wie <em>Science & Technology Innovation 2030</em>) sowie akademische Kooperationen und Vorträge an internationalen Spitzenuniversitäten wie Oxford und Harvard. Sie hat über 10 Fachaufsätze und Patente veröffentlicht.</p>
      `
    },
    en: {
      title: "Dr. Qiao Jingwen – Clinic Director, Gynecology, Metabolism & Pain Therapy",
      body: `
        <p><strong>Dr. Qiao Jingwen <span style="white-space: nowrap;">(乔靖文)</span></strong> is the Director of the Hong Dao Clinic, co-founder of the External Therapy Center, and a leading expert in integrated Chinese gynecology and modern myofascial pain management.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Specialties & Focus Areas</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Metabolic Disorders</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Comprehensive management of diabetes, hyperlipidemia, hypertension, and clinical obesity.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Hormonal & Gynecological Diseases</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Specializing in endometriosis care, severe dysmenorrhea, PCOS, premature ovarian failure, and breast hyperplasia.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Neurological & Mood Disorders</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Chronic migraines, anxiety, depression, insomnia, and burnout syndrome.</span>
          </li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Biography & Education</h4>
        <p style="margin-bottom: 1rem;">B.Sc. graduate from <strong>Fudan University</strong> and a licensed national TCM physician. She serves as Director of the Hong Dao Clinic and Chief Academic Leader at the Medical Rehabilitation Center.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Experience & Research</h4>
        <p style="margin-bottom: 1rem;">With over 10 years of clinical and academic experience, Dr. Qiao is the co-developer of the "Universal Pain Relief Method" (万向治痛法). She has spearheaded national research projects under the China State Key R&D Programs, presented her research at Harvard and Oxford, and holds over 10 published medical papers and patents.</p>
      `
    }
  },
  guan: {
    de: {
      title: "Dr. Guan Weina – Akupunktur & Faszientherapie",
      body: `
        <p><strong>Dr. Guan Weina (管蔚娜)</strong> ist stellvertretende Leiterin des Zentrums für technologiegestützte chinesische Medizin und eine führende Expertin für energetische Entgiftung und Meridian-Therapie.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Spezialgebiete (Focus Areas)</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Urogenitale & Gynäkologische Leiden</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Behandlung von chronischer Prostatitis, Inkontinenz, Blasenentzündungen, Menstruationsstörungen, Myomen und Zysten.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Meridian-Entgiftung & Akupunktur</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Anwendung traditioneller Reizverfahren (Akupunktur, Gua Sha, Moxa und Schröpfen) zur Ausleitung zellulärer Schlacken.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Dermatologische TCM-Konzepte</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Behandlung bei hartnäckiger Neurodermitis, chronischer Nesselsucht (Urtikaria), Ekzemen, Gürtelrose und Haarausfall.</span>
          </li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Akademischer Hintergrund & Biografie</h4>
        <p style="margin-bottom: 1rem;">Master-Abschluss der traditionellen chinesischen Medizin, lizenzierte Ärztin und staatlich geprüfte psychologische Beraterin.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Erfahrung & Spezialpraxis</h4>
        <p style="margin-bottom: 1rem;">Dr. Guan verbindet klassische Heilverfahren mit moderner Laserakupunktur und technologiegestützter Gewichtsreduktion. Sie besitzt weitreichende Erfahrung in der Meridianlehre und der ganzheitlichen Burnout-Prävention.</p>
      `
    },
    en: {
      title: "Dr. Guan Weina – Acupuncture & Fascia Therapy",
      body: `
        <p><strong>Dr. Guan Weina (管蔚娜)</strong> is the Deputy Director of the Science & Technology TCM Management Center and an expert in deep meridian detoxification and vibrational acupuncture.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Specialties & Focus Areas</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li style="margin-bottom: 1.2rem;">
            <strong>Urogenital & Gynecological Disorders</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Chronic prostatitis, urinary urgency, incontinence, uterine fibroids, dysmenorrhea, and ovarian decline.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Meridian Detoxification & Acupuncture</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Rich clinical expertise in acupuncture, cupping, moxibustion, gua sha, and ear acupuncture to expel toxins.</span>
          </li>
          <li style="margin-bottom: 1.2rem;">
            <strong>Dermatological Conditions</strong>
            <span style="display: block; margin-top: 0.25rem; color: var(--text-muted); font-size: 0.95rem;">Eczema, urticaria, neurodermatitis, herpes zoster, and clinical hair loss.</span>
          </li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Biography & Education</h4>
        <p style="margin-bottom: 1rem;">Master of Acupuncture, Licensed National Physician, and certified National Psychological Counselor.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Focus & Rejuvenation</h4>
        <p style="margin-bottom: 1rem;">Dr. Guan specializes in combining standard meridian acupuncture with science-backed metabolic weight loss programs and advanced laser-acupoint therapy.</p>
      `
    }
  },
  endo: {
    de: {
      title: "Behandlung von Endometriose aus der Perspektive von Yangming-Stauungs-Hitze",
      body: `
        <p style="margin-bottom: 1rem;"><strong>Autoren:</strong> Hu Botai, Cheng Lin, Qihuang College, Beijing University of Chinese Medicine</p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">TEIL 01: Krankheitsübersicht</h4>
        <p style="margin-bottom: 1rem;">
          Unter Endometriose versteht man das Vorkommen von funktionellem Gebärmutterschleimhautgewebe außerhalb der Gebärmutterhöhle. Je nach Lokalisation der Läsionen kann sie in einen ovariellen Typ (am häufigsten), einen peritonealen Typ, einen tief infiltrierenden Typ und andere spezielle Lokalisationstypen unterteilt werden. Die Erkrankung betrifft überwiegend Frauen im gebährfähigen Alter, mit der höchsten Inzidenz zwischen 25 und 45 Jahren.
        </p>
        <p style="margin-bottom: 1rem;">
          Zu den klinischen Hauptmanifestationen gehören eine fortschreitende Verschlimmerung der sekundären Dysmenorrhö, Dyspareunie (Schmerzen beim Geschlechtsverkehr), Menstruationsanomalien und Unfruchtbarkeit. Die Symptome hängen eng mit dem Menstruationszyklus zusammen. Je nach Lage der ektopischen Läsionen können entsprechende Organfunktionsstörungen auftreten – beispielsweise kann eine Darmendometriose Bauchschmerzen und Stuhlgangsauffälligkeiten verursachen.
        </p>
        <p style="margin-bottom: 1rem;">
          In seltenen fallen kann die Endometriose das Atmungssystem betreffen, was zum thorakalen Endometriosesyndrom führt. Seine charakteristischen klinischen Symptome sind menstruelle Hämoptyse (d. h. Bluthusten, der synchron mit dem Menstruationszyklus auftritt) und menstrueller Pneumothorax (wiederkehrender Spontanpneumothorax während der Menstruation). Diese Symptome resultieren aus zyklischen Blutungen ektopischer Endometriumläsionen in der Pleura oder im Lungengewebe unter hormonellem Einfluss.
        </p>
        <p style="margin-bottom: 1rem;">
          Aus Sicht der modernen Medizin unterliegt das Endometrium einer zyklischen Proliferation und Abschelferung unter der Regulation von Östrogen und Progesteron, was zur Menstruation führt. Wenn lebensfähiges Endometriumgewebe außerhalb der Gebärmutterhöhle auftritt, wie an den Eierstöcken, den Sakrouterinbändern oder dem Beckenperitoneum, kann sich eine Endometriose entwickeln. Die genaue Pathogenese der Endometriose ist noch nicht vollständig geklärt. Immunologische Funktionsstörungen, genetische Veranlagung, Umweltfaktoren und andere Aspekte können bei ihrer Entstehung eine Rolle spielen.
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">TEIL 02: Professor Xu Ruqis zentraler Standpunkt zur Pathogenese</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 600; font-style: italic; color: var(--terracotta);">„Kein Mustersyndrom der Leere – Die Krankheit liegt im Yangming“</p>
        <p style="margin-bottom: 1rem;">
          Aus der Perspektive der Traditionellen Chinesischen Medizin führen konventionelle Ansichten die Endometriose häufig auf eine angeborene Schwäche, Kältekoagulation und Blutstauung oder auf einen Mangel und eine Schädigung der Chong- und Ren-Meridiane zurück, wovon Taiyin und Shaoyin betroffen sind. Basierend auf langjährigen klinischen Beobachtungen schlägt Professor Xu Ruqi jedoch eine ganz eigene Erkenntnis vor: <strong>„Endometriose weist selten Leere-Muster auf; ihre grundlegende Pathogenese liegt in der Stauungs-Hitze des Yangming.“</strong>
        </p>
        <p style="margin-bottom: 0.5rem;">
          Er ist überzeugt, dass die Essenz der Endometriose das Zusammenspiel zwischen chronischer Entzündung und der Anhäufung von Stoffwechselendprodukten ist, was sich in zwei Kernfaktoren zusammenfassen lässt:
        </p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li><strong>Entzündliche Kongestion und Ödeme:</strong> Das lokale Gewebe befindet sich in einem anhaltenden Zustand einer entzündlichen Reaktion.</li>
          <li><strong>Gestörte Ausscheidung von Stoffwechselendprodukten:</strong> Entzündliche Stoffwechselabfälle können nicht ordnungsgemäß abtransportiert werden und stauen sich an, was zu gesundheitlichen Schäden führt.</li>
        </ul>
        <p style="margin-bottom: 1rem;">
          Daher sollte die klinische Behandlung nach den Mustern von Fülle, Hitze und Blutstauung erfolgen. Die blinde Anwendung wärmender und tonisierender Methoden beim ersten Anzeichen von Regelschmerzen ist streng kontraindiziert. Professor Xu betont insbesondere, dass wärmende und tonisierende Rezepturen wie das <em>Fuzi-Dekokt</em> und das <em>Wenjing-Dekokt</em> nur eine vorübergehende Linderung der Symptome bewirken können, aber die zugrunde liegende Ursache nicht beheben. Eine langfristige Anwendung kann stattdessen die Hitze verschlimmern und die Stauung konservieren, wodurch die richtige Behandlung verzögert wird.
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">TEIL 03: Besonderheiten der Pulsdiagnose</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 600; font-style: italic; color: var(--terracotta);">„Saitenförmiger, schlüpfriger und straffer Puls an der rechten Chi-Position“</p>
        <p style="margin-bottom: 1rem;">
          Professor Xu legt großen Wert auf die Pulsdiagnose. Er weist darauf hin, dass der linke Chi-Puls den Zustand der Niere widerspiegelt, während der rechte Chi-Puls das Fortpflanzungssystem (einschließlich Gebärmutter, Adnexe usw.) abbildet. Das typische Pulsbild bei Patientinnen mit Endometriose ist <strong>saitenförmig, schlüpfrig und straff an der rechten Chi-Position</strong>. Wenn dieses Pulsmuster festgestellt wird, besteht ein dringender Verdacht auf eine Stauungs-Hitze-Verbindung im Fortpflanzungssystem.
        </p>
        <p style="margin-bottom: 1rem;">
          Darüber hinaus ist die Endometriose klinisch oft von strangförmigen Verhärtungen begleitet, die sich von den kugelförmigen, großen Raumforderungen bei Gebärmuttermyomen unterscheiden; hier ist eine sorgfältige Differenzierung erforderlich. Wenn die Raumforderung extrem groß ist oder das Risiko einer massiven Blutung besteht, sollte umgehend eine chirurgische Intervention in Betracht gezogen und nicht blind an einer konservativen Medikation festgehalten werden.
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">TEIL 04: Behandlungsprinzipien und -methoden</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 600; font-style: italic; color: var(--terracotta);">„Hitze klären und Toxine ausleiten, Stauungen auflösen und abdominale Ansammlungen abbauen“</p>
        <p style="margin-bottom: 1rem;">
          Basierend auf der Kernpathogenese der „Hitze-Toxin-Stauung“ etablierte Professor Xu ein Hauptbehandlungsprinzip der Hitze-Klärung zur Toxinauflösung, Blutkühlung und Stauungsbeseitigung. In der klinischen Praxis modifiziert er üblicherweise klassische Rezepturen wie das <em>Sanwu Huangqin-Dekokt</em> und <em>Guizhi Fuling-Pillen</em> als Basiszubereitungen für eine maßgeschneiderte Behandlung.
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">TEIL 05: Technologiegestützte TCM-Geräte</h4>
        <p style="margin-bottom: 1rem;">
          Aufbauend auf der Essenz klassischer Rezepturen hat die Shenzhen Hongdao Klinik für Traditionelle Chinesische Medizin eine Reihe moderner TCM-Geräte eingeführt. Diese verbinden die traditionelle Diagnostik („Betrachten, Hören & Riechen, Befragen und Tasten“) mit digitaler Analyse und gezielter physikalischer Therapie. Daraus ergibt sich ein ganzheitliches Behandlungskonzept aus „innerer Kräuterregulation plus äußerer Geräte- und manueller Therapie“, das sich besonders für chronische, therapieresistente gynäkologische Erkrankungen wie die Endometriose eignet.
        </p>

        <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">1. Infrarot-Spektrentherapiegerät (TMT-Ausleger-Spektrentherapiegerät)</h5>
        <p style="margin-bottom: 0.5rem; font-weight: 500; font-style: italic;">Gezielte entzündungshemmende Wirkung und Schleimhautregeneration</p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li><strong>TCM-Prinzip:</strong> Eine moderne „Infrarot-Spektrentherapie“-Technologie, die Infrarotlicht bestimmter Wellenlängen zur lokalen Bestrahlung nutzt. Dies erzeugt einen schmerzfreien, nicht-invasiven Erwärmungseffekt, wodurch eine synergistische entzündungshemmende und regenerative Wirkung erzielt wird („Licht-Arzneimittel-Synergie“).</li>
          <li><strong>Reduzierung von Beckenentzündungen:</strong> Präzise Temperaturkontrolle bei 41–43 °C, tiefes Eindringen in das Unterhautgewebe, Förderung der lokalen Durchblutung, Beschleunigung der Absorption entzündlicher Ödeme und Linderung von Stauungen an den ektopischen Läsionen.</li>
          <li><strong>Regeneration von geschädigtem Gewebe:</strong> Infrarotlicht stimuliert die mitochondriale Aktivität der Zellen, fördert die Regeneration von adhäsivem Gewebe um ektopische Endometriumläsionen und reduziert Menstruationsschmerzen.</li>
          <li><strong>Kombination mit topischen chinesischen Kräutern:</strong> Vor der Bestrahlung können chinesische Kräutermedien aufgetragen werden, die die Durchblutung fördern, Stauungen auflösen, Hitze klären oder Toxine beseitigen (z. B. Extrakt aus Viola yedoensis), um eine synergistische Verstärkung der Wirkung zu erzielen.</li>
          <li><strong>Indikationen:</strong> Sofortige Schmerzlinderung bei akuten Dysmenorrhö-Episoden, chronische Beckenschmerzen außerhalb der Menstruationsphase und Vorbeugung von Adhäsionen nach Eingriffen in der Gebärmutterhöhle.</li>
        </ul>

        <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">2. Mittelfrequenz-Bianstein-Elektrotherapiegerät</h5>
        <p style="margin-bottom: 0.5rem; font-weight: 500; font-style: italic;">Tiefenentspannung, Stauungsauflösung und Abbau von Verhärtungen</p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li><strong>TCM-Prinzip:</strong> Bianstein enthält zahlreiche Spurenelemente und emittiert Ferninfrarotstrahlung sowie Ultraschallwellen. In Kombination mit Mittelfrequenzstrom zur neuromuskulären Stimulation wird eine tiefgehende Lösung von Adhäsionen und eine kraftvolle Förderung der Durchblutung mit Stauungsbeseitigung erreicht.</li>
          <li><strong>Lösen von Beckenadhäsionen:</strong> Endometriose führt häufig zur Bildung strangförmiger Verwachsungen an den Eierstöcken, Eileitern und der Gebärmutteroberfläche. Die mechanische Tiefenwirkung der Bianstein-Elektrotherapie weicht fibröses Gewebe auf und verbessert die Beweglichkeit im Beckenraum.</li>
          <li><strong>Linderung von Kreuzbeinschmerzen:</strong> Mittelfrequenzstrom moduliert die Erregbarkeit der Muskelnerven und blockiert die Schmerzsignalübertragung, was Patientinnen mit Kreuzbeinschmerzen oder ausstrahlenden Schmerzen erhebliche Linderung verschafft.</li>
          <li><strong>Regulierung des lokalen Stoffwechsels:</strong> Fördert die Absorption von Blutstauungen und beschleunigt den Abtransport von Stoffwechselabfällen, was eng mit Professor Xus Konzept der Pathogenese einer „gestörten Ausscheidung von Stoffwechselendprodukten“ übereinstimmt.</li>
          <li><strong>Anwendungsmethode:</strong> Platzieren Sie die Bianstein-Sonde auf dem Unterbauch, dem Kreuzbeinbereich und der Region der acht Liao-Punkte (Baliao, Bl 31–34). Wählen Sie den Modus für Wechsel- oder Intervallstrom. Führen Sie die Behandlung 2–3 Mal pro Woche für jeweils 20–30 Minuten durch.</li>
        </ul>

        <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">3. Beckenboden-Rehabilitationseinheit</h5>
        <p style="margin-bottom: 0.5rem; font-weight: 500; font-style: italic;">Spezialisiert auf Frauengesundheit</p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li><strong>TCM-Prinzip:</strong> Beckenboden-Biofeedback-Therapiegerät, kombiniert mit abdominaler Faszienlösung und Beckenkorrekturtechniken.</li>
          <li><strong>Technologie-Integration:</strong> Infrarot-Spektrentherapie (Bestrahlung des Damms) + Mittelfrequenz-Bianstein-Elektrotherapie (Kreuzbeinregion).</li>
          <li><strong>Anwendung bei Endometriose:</strong> Patientinnen mit Endometriose leiden häufig unter einer erhöhten Beckenbodenmuskelspannung, Dyspareunie und chronischen Beckenschmerzen. Beckenboden-Biofeedback hilft den Patientinnen, verkrampfte Beckenbodenmuskeln aktiv zu entspannen. Zusammen mit der Infrarot-Spektrentherapie zur Verbesserung der lokalen Durchblutung wird die Lebensqualität signifikant verbessert. Die Mittelfrequenz-Bianstein-Elektrotherapie im Kreuzbeinbereich lindert zudem ausstrahlende Rücken- und Beinschmerzen, die durch die Endometriose verursacht werden.</li>
        </ul>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">TEIL 06: Zwei klinische Fallberichte</h4>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 1.2rem;">
          <h5 style="font-weight: 600; margin-top: 0; margin-bottom: 0.5rem; color: var(--terracotta);">Fallbeispiel 1</h5>
          <p style="margin-bottom: 0.5rem;"><strong>Patientin:</strong> Weiblich, 32 Jahre alt, ledig.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Hauptbeschwerde:</strong> Seit 6 Jahren fortschreitende Verschlimmerung der Dysmenorrhö. Menarche im Alter von 13 Jahren. In den letzten 6 Jahren traten an den Tagen 1–2 jeder Menstruationsperiode starke Kälteschmerzen im Unterleib auf, die Analgetika erforderten. Begleitsymptome waren Kreuzbeinschmerzen mit Kältegefühl, dunkles Menstruationsblut mit Koageln und geringer Menstruationsfluss. Zudem bestanden allgemeine Kälteintoleranz und weicher Stuhl.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Bildgebung und Labor:</strong> Der Beckenultraschall zeigte beidseitige ovarielle Schokoladenzysten (links: 3,2 cm, rechts: 2,8 cm). Das Serum-CA125 war leicht erhöht (56 U/ml).</p>
          <p style="margin-bottom: 0.5rem;"><strong>Westliche Diagnose:</strong> Endometriose (ovarieller Typ). Die Patientin lehnte eine Hormontherapie ab und wünschte eine Behandlung mit Traditioneller Chinesischer Medizin (TCM).</p>
          <p style="margin-bottom: 0.5rem;"><strong>TCM-Syndromdifferenzierung:</strong> Taiyin-Yangming-Kombinationserkrankung</p>
          <p style="margin-bottom: 0.5rem;"><strong>Behandlungsprinzip und Rezeptur:</strong> Modifiziertes <em>Fuzi-Dekokt</em> kombiniert mit <em>Yiyi Fuzi Baijiang-Pulver</em> und <em>Zhishi Shaoyao-Pulver</em>, mit Zusatz von <em>Zihua Diding</em>. Das Dekokt wurde ab 7 Tagen vor der Menstruation bis zum 3. Tag der Menstruation über zwei aufeinanderfolgende Zyklen eingenommen.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Begleittherapie:</strong> Klassische Moxibustion</p>
          <p style="margin-bottom: 0.5rem;"><strong>Ergebnisse:</strong></p>
          <ul style="margin-bottom: 0.5rem; padding-left: 1.2rem;">
            <li>Nach dem 1. Zyklus: Die Dysmenorrhö war deutlich gelindert; der Verbrauch an Analgetika sank von 3 Tabletten auf 1 Tablette pro Zyklus; weniger Blutkoagel.</li>
            <li>Nach dem 3. Zyklus: Nur noch leichte Missempfindungen im Unterleib während der Menstruation; keine Analgetika erforderlich; das Menstruationsblut zeigte eine normale rote Farbe; die Kälteintoleranz besserte sich.</li>
            <li>Beim Kontrollultraschall nach 6 Monaten: Die linke Schokoladenzyste verkleinerte sich auf 1,1 cm; die rechte Zyste hatte sich vollständig aufgelöst. CA125 sank auf 21 U/ml.</li>
            <li>Bei der Nachuntersuchung nach 1 Jahr: Kein Wiederauftreten der Dysmenorrhö; normale Menstruationszyklen. Die Patientin bewertete sich selbst als „symptomatisch geheilt“.</li>
          </ul>
          <p style="font-size: 0.9rem; font-style: italic; color: var(--text-muted); margin-top: 0.5rem;">Hinweis: Obwohl die Ovarialzyste in der Bildgebung nicht vollständig verschwunden war, war die Patientin frei von klinischen Symptomen, was den TCM-Kriterien für eine klinische Heilung entspricht.</p>
        </div>

        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 1rem;">
          <h5 style="font-weight: 600; margin-top: 0; margin-bottom: 0.5rem; color: var(--terracotta);">Fallbeispiel 2</h5>
          <p style="margin-bottom: 0.5rem;"><strong>Patientin:</strong> Weiblich, 29 Jahre alt, verheiratet.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Hauptbeschwerde:</strong> Chronische dumpfe Unterbauchschmerzen seit über einem Jahr, die sich während der Menstruation verschlimmerten. Zudem bestanden ziehende Schmerzen im Kreuzbein- und Unterbauchbereich in der Intermenstruationsphase sowie nach körperlicher Anstrengung. Als weitere Symptome zeigten sich gelblicher, profuser Ausfluss, gelegentliches leichtes Fieber, Mundtrockenheit mit bitterem Geschmack und klebriger Stuhl.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Bildgebung und Labor:</strong> Der Beckenultraschall zeigte eine fokale Adenomyose (Dicke der Gebärmutterhinterwand: 3,0 cm) und vereinzelte ektopische Herde im linken Adnexbereich. CA125 betrug 78 U/ml.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Bisherige Behandlung:</strong> Eine vorausgegangene Hormontherapie wurde wegen Leberfunktionsstörungen abgebrochen.</p>
          <p style="margin-bottom: 0.5rem;"><strong>TCM-Syndromdifferenzierung:</strong> Shaoyang-Yangming-Kombinationserkrankung</p>
          <p style="margin-bottom: 0.5rem;"><strong>Behandlungsprinzip und Rezeptur:</strong> Modifiziertes <em>Dahuang Mudan-Dekokt</em> kombiniert mit <em>Zhishi Shaoyao-Pulver</em> und <em>Yiyi Fuzi Baijiang-Pulver</em>, mit Zusatz von <em>Zihua Diding</em>, <em>Tufuling</em> und <em>Zaojiaoci</em>. Das Dekokt wurde über 4 aufeinanderfolgende Monate täglich eingenommen (auch während der Menstruation).</p>
          <p style="margin-bottom: 0.5rem;"><strong>Begleittherapie:</strong> Mittelfrequenz-Bio-Elektrizität mit Bianstein und Infrarot-Spektrentherapie.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Ergebnisse:</strong></p>
          <ul style="margin-bottom: 0.5rem; padding-left: 1.2rem;">
            <li>Nach 2 Monaten Behandlung: Die dumpfen Unterbauchschmerzen nahmen deutlich ab; der Ausfluss verringerte sich; der Stuhlgang normalisierte sich; Mundtrockenheit und bitterer Geschmack verschwanden.</li>
            <li>Nach 4 Monaten Behandlung: Keine nennenswerten Schmerzen mehr während der Menstruation oder der Intermenstruationsphase; die Patientin konnte wieder uneingeschränkt am Arbeits- und Alltagsleben teilnehmen.</li>
            <li>Kontrollultraschall: Die Dicke der Gebärmutterhinterwand reduzierte sich auf 2,5 cm; im linken Adnexbereich waren keine eindeutigen ektopischen Herde mehr darstellbar. CA125 sank auf 32 U/ml.</li>
            <li>Bei der Nachuntersuchung nach 8 Monaten: Kein Wiederauftreten der Symptome. Die Patientin wurde auf natürlichem Wege schwanger (eine Schwangerschaft unterdrückt bekanntermaßen das Fortschreiten der Endometriose und wird als Teil des therapeutischen Erfolgs gewertet).</li>
          </ul>
        </div>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">TEIL 07: Klinische Erweiterung</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 500; font-style: italic;">Gleiches Prinzip bei Gebärmuttermyomen und Adenomyose</p>
        <p style="margin-bottom: 1rem;">
          Professor Xu weist darauf hin, dass Gebärmuttermyome, Adenomyose und Endometriose sehr ähnliche klinische Symptome aufweisen. Daher können alle drei Erkrankungen auf der Grundlage des oben genannten Ansatzes „Hitze klären + Stauungen auflösen“ im Rahmen der Syndromdifferenzierung behandelt werden.
        </p>
        <p style="margin-bottom: 1rem;">
          Es ist jedoch zu beachten: Wenn die Raumforderung enorm groß ist, schnell wächst oder von unkontrollierbaren Blutungen begleitet wird, sollte umgehend eine chirurgische Indikation geprüft werden. Das Ziel der TCM-Behandlung besteht darin, die Symptome zu kontrollieren, die Raumforderung zu verkleinern und das Fruchtbarkeitsmilieu zu verbessern. Man sollte nicht blind eine „reine TCM-Tumorauflösung“ anstreben.
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">TEIL 08: Fazit</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 500; font-style: italic;">Neubewertung der Endometriose aus der Perspektive der Yangming-Fülle-Hitze</p>
        <p style="margin-bottom: 1rem;">
          Professor Xu formuliert es so: <em>„Das Chong-Gefäß dient als Meer des Blutes, während das Ren-Gefäß die Gebärmutter und die Schwangerschaft regiert. Die Ernährung und die pathologischen Veränderungen des weiblichen Fortpflanzungssystems sind untrennbar mit dem pathologischen Mechanismus von Leere im Taiyin und Fülle im Yangming verbunden. Leere äußert sich als dumpfer Schmerz, während Fülle sich als heftiger Schmerz zeigt. Leere sollte durch Tonisierung behandelt werden, die sich auf die Stärkung der Milz und die Auflösung von Feuchtigkeit konzentrieren muss; Fülle sollte durch Ausleitung behandelt werden, was zwingend die Öffnung der Eingeweide und das Ableiten von Hitze erfordert.“</em>
        </p>
        <p style="margin-bottom: 1rem;">
          Die Endometriose fällt in die Kategorie „Zhengjia“ (abdominale Raumforderungen). Während der Menstruationsphasen sind die Schmerzen oft unerträglich, und das Syndrom weist typischerweise die Charakteristik auf, dass „Stauungs-Hitze durch das System fließt“. Die Behandlung der Endometriose aus der Perspektive der Yangming-Stauungs-Hitze bricht daher mit den traditionellen Denkmustern der „Kältekoagulation, die zu Blutstauung führt“ und der „Leere und Kälte in den Chong- und Ren-Gefäßen“ und bietet einen neuen Differenzierungs- und Behandlungsansatz für die klinische Praxis.
        </p>
        <p style="margin-bottom: 0.5rem;">
          Die klinische Kernerfahrung lässt sich wie folgt zusammenfassen:
        </p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li><strong>Ort der Erkrankung:</strong> Yangming</li>
          <li><strong>Charakter der Erkrankung:</strong> Hitze-Toxin und Blutstauung</li>
          <li><strong>Behandlungsprinzipien:</strong> Hitze klären, Toxine auflösen, Blut kühlen und Stauungen beseitigen</li>
          <li><strong>Kontraindikation:</strong> Vermeiden Sie blinde wärmend-tonisierende Methoden.</li>
        </ul>
        <p style="margin-bottom: 1rem;">
          Dieser wissenschaftliche Standpunkt entspringt der klinischen Praxis und kehrt in diese zurück, um einen prägnanten und hocheffizienten Weg für die TCM-Behandlung der Endometriose aufzuzeigen. Gewiss bedarf die Behandlung der Endometriose mit chinesischer Medizin noch der Validierung durch weitere qualitativ hochwertige klinische Studien. Dennoch öffnet Professor Xus klinische Erfahrung zweifellos ein neues Fenster für die Therapie dieser hartnäckigen Erkrankung.
        </p>
      `
    },
    en: {
      title: "Treating Endometriosis from the Perspective of Yangming Stasis-Heat",
      body: `
        <p style="margin-bottom: 1rem;"><strong>Authors:</strong> Hu Botai, Cheng Lin, Qihuang College, Beijing University of Chinese Medicine</p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">PART 01: Disease Overview</h4>
        <p style="margin-bottom: 1rem;">
          Endometriosis refers to the presence of functional endometrial tissue outside the uterine cavity. Based on the location of the lesions, it can be classified into ovarian type (most common), peritoneal type, deep infiltrating type, and other special site types. The condition predominantly affects women of reproductive age, with the highest incidence observed between 25 and 45 years of age.
        </p>
        <p style="margin-bottom: 1rem;">
          The main clinical manifestations include progressively worsening secondary dysmenorrhea, dyspareunia, menstrual abnormalities, and infertility. The symptoms are closely related to the menstrual cycle. Depending on the location of the ectopic lesions, corresponding organ dysfunction may occur—for example, intestinal endometriosis may cause abdominal pain and defecation abnormalities.
        </p>
        <p style="margin-bottom: 1rem;">
          In rare cases, endometriosis may involve the respiratory system, leading to thoracic endometriosis syndrome. Its characteristic clinical manifestations include catamenial hemoptysis (i.e., hemoptysis occurring synchronously with the menstrual cycle) and catamenial pneumothorax (recurrent spontaneous pneumothorax during menstruation). These symptoms result from cyclic bleeding of ectopic endometrial lesions within the pleura or pulmonary parenchyma under hormonal influence.
        </p>
        <p style="margin-bottom: 1rem;">
          According to modern medicine, the endometrium undergoes cyclic proliferation and shedding under the regulation of estrogen and progesterone, resulting in menstruation. When viable endometrial tissue appears outside the uterine cavity, such as on the ovaries, uterosacral ligaments, or pelvic peritoneum, endometriosis may develop. The exact pathogenesis of endometriosis remains not fully elucidated. Immune dysfunction, genetic susceptibility, environmental factors, and others may all play a role in its development.
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">PART 02: Professor Xu Ruqi’s Core Pathogenesis Viewpoint</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 600; font-style: italic; color: var(--terracotta);">"No Deficiency Pattern – The Disease Lies in Yangming"</p>
        <p style="margin-bottom: 1rem;">
          From the perspective of traditional Chinese medicine, conventional views often attribute endometriosis to congenital insufficiency, cold congealing and blood stasis, or deficiency and damage to the Chong and Ren meridians, involving the Taiyin and Shaoyin. However, based on long-term clinical observations, Professor Xu Ruqi proposes a distinctive insight: <strong>“Endometriosis rarely presents with deficiency patterns; its fundamental pathogenesis lies in Yangming stasis-heat.”</strong>
        </p>
        <p style="margin-bottom: 0.5rem;">
          He believes that the essence of endometriosis is the interaction between chronic inflammation and the accumulation of metabolic waste products, which can be summarized into two core factors:
        </p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li><strong>Inflammatory congestion and edema:</strong> The local tissue is in a persistent state of inflammatory reaction.</li>
          <li><strong>Impaired elimination of metabolic waste:</strong> Inflammatory metabolites cannot be properly cleared and accumulate, causing harm.</li>
        </ul>
        <p style="margin-bottom: 1rem;">
          Therefore, clinically, it should be treated according to the patterns of excess, heat, and blood stasis. Blindly applying warming and tonifying methods at the first sign of dysmenorrhea is strictly contraindicated. Professor Xu particularly emphasizes that warming and tonifying formulas such as <em>Fuzi Decoction</em> and <em>Wenjing Decoction</em> can only provide temporary symptom relief but cannot address the root cause. Long-term use may instead exacerbate heat and retain stasis, thereby delaying proper treatment.
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">PART 03: Pulse Diagnosis Features</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 600; font-style: italic; color: var(--terracotta);">"Wiry, Slippery, and Tight Pulse at the Right Chi Position"</p>
        <p style="margin-bottom: 1rem;">
          Professor Xu places great emphasis on pulse diagnosis. He points out that the left chi pulse reflects the condition of the Kidney, while the right chi pulse reflects the reproductive system (including the uterus, adnexa, etc.). The typical pulse manifestation in patients with endometriosis is <strong>wiry, slippery, and tight at the right chi position</strong>. When this pulse pattern is detected, there should be a high suspicion of stagnant-heat intermingling in the reproductive system.
        </p>
        <p style="margin-bottom: 1rem;">
          Additionally, endometriosis is often accompanied by strip-like masses clinically, which differ from the spherical, large masses seen in uterine fibroids; careful differentiation is required. If the mass is extremely large or there is a risk of massive bleeding, surgical intervention should be considered promptly, and conservative medication should not be adhered to blindly.
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">PART 04: Treatment Principles and Methods</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 600; font-style: italic; color: var(--terracotta);">"Clearing Heat and Removing Toxicity, Dispelling Stasis and Resolving Abdominal Masses"</p>
        <p style="margin-bottom: 1rem;">
          Based on the core pathogenesis of "heat toxin with stagnation," Professor Xu established a principal treatment approach of clearing heat to resolve toxins, cooling blood, and removing stasis. In clinical practice, he commonly modifies classical formulas such as the <em>Sanwu Huangqin Decoction</em> and <em>Guizhi Fuling Pills</em> as foundational prescriptions for tailored treatment.
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">PART 05: Technology-Integrated TCM Devices</h4>
        <p style="margin-bottom: 1rem;">
          Building upon the essence of classical formulas, Shenzhen Hongdao Traditional Chinese Medicine Clinic has introduced a series of technology-integrated TCM devices, combining traditional “inspection, auscultation & olfaction, inquiry, and palpation” with digital assessment and targeted physical therapy. This forms a comprehensive treatment approach of “internal herbal regulation plus external device and manual therapy”, which is particularly suitable for chronic, refractory gynecological conditions such as endometriosis.
        </p>

        <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">1. Infrared Spectral Therapy Device (TMT Cantilever-Type Spectral Therapy Device)</h5>
        <p style="margin-bottom: 0.5rem; font-weight: 500; font-style: italic;">Targeted Anti-inflammatory Action and Mucosal Repair</p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li><strong>TCM Principle:</strong> A modern “infrared spectral therapy” technology that uses infrared light of specific wavelengths to irradiate local areas, producing a painless, non-invasive warming effect, achieving “light-drug” synergistic anti-inflammatory and reparative action.</li>
          <li><strong>Reducing pelvic inflammation:</strong> Precise temperature control at 41–43 °C, penetrating deep into subcutaneous tissues, promoting local blood circulation, accelerating absorption of inflammatory edema, and alleviating congestion at ectopic lesions.</li>
          <li><strong>Repairing damaged tissues:</strong> Infrared light stimulates cellular mitochondrial activity, promotes repair of adhesive tissues surrounding ectopic endometrial lesions, and reduces menstrual pain.</li>
          <li><strong>Combination with topical Chinese herbs:</strong> Before irradiation, Chinese herbal media that promote blood circulation, remove stasis, clear heat, or eliminate toxicity (e.g., Viola yedoensis extract) can be applied to achieve “light-drug” synergistic enhancement.</li>
          <li><strong>Indications:</strong> Immediate pain relief during acute dysmenorrhea episodes, chronic pelvic pain during the non-menstrual phase, and prevention of adhesions after uterine cavity procedures.</li>
        </ul>

        <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">2. Medium-Frequency Bianstone Electric Therapy Device</h5>
        <p style="margin-bottom: 0.5rem; font-weight: 500; font-style: italic;">Deep Release, Stasis Transformation, and Mass Resolution</p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li><strong>TCM Principle:</strong> Bianstone contains multiple trace elements and emits far-infrared radiation and ultrasound waves. Combined with medium-frequency current for neuromuscular stimulation, it achieves deep release of adhesions and powerful blood circulation promotion with stasis removal.</li>
          <li><strong>Releasing pelvic adhesions:</strong> Endometriosis often causes strip-like adhesions on the ovaries, fallopian tubes, and uterine surface. The deep mechanical effect of Bianstone electrotherapy softens fibrous tissue and improves pelvic mobility.</li>
          <li><strong>Relieving lumbosacral pain:</strong> Medium-frequency current modulates muscle nerve excitability and blocks pain signal transmission, offering significant relief for patients with lumbosacral soreness or referred pain.</li>
          <li><strong>Regulating local metabolism:</strong> Promotes absorption of blood stasis and accelerates elimination of metabolic waste, closely aligning with Professor Xu’s pathogenesis concept of “impaired elimination of metabolic waste”.</li>
          <li><strong>Operation method:</strong> Place the Bianstone probe on the lower abdomen, lumbosacral region, and the Eight Liao points (Baliao, SI 31–34). Select alternating or intermittent wave modes. Perform 20–30 minutes per session, 2–3 times per week.</li>
        </ul>

        <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">3. Pelvic Floor Rehabilitation Unit</h5>
        <p style="margin-bottom: 0.5rem; font-weight: 500; font-style: italic;">Specialized for Women’s Health</p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li><strong>TCM Principle:</strong> Pelvic floor biofeedback therapy device, combined with abdominal fascia release technique and pelvic correction manipulations.</li>
          <li><strong>Technology integration:</strong> Infrared spectral therapy (perineal irradiation) + medium-frequency Bianstone electrotherapy (lumbosacral region).</li>
          <li><strong>Application in endometriosis:</strong> Patients with endometriosis often present with high pelvic floor muscle tone, dyspareunia, and chronic pelvic pain. Pelvic floor biofeedback helps patients actively relax spastic pelvic floor muscles. Together with infrared spectral therapy to improve local circulation, this significantly enhances quality of life. Medium-frequency bianstone electrotherapy to the lumbosacral region relieves radiating lower back and leg pain caused by endometriosis.</li>
        </ul>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">PART 06: Two Medical Case Records</h4>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 1.2rem;">
          <h5 style="font-weight: 600; margin-top: 0; margin-bottom: 0.5rem; color: var(--terracotta);">Case Example 1</h5>
          <p style="margin-bottom: 0.5rem;"><strong>Patient:</strong> Female, 32 years old, unmarried.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Chief complaint:</strong> Progressively worsening dysmenorrhea for 6 years. Menarche at age 13. Over the past 6 years, she experienced severe lower abdominal cold pain on days 1–2 of each menstrual period, requiring analgesics. Associated symptoms included lumbosacral cold pain, dark menstrual blood with clots, and scanty menstrual flow. She also had general intolerance to cold and loose stools.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Imaging and labs:</strong> Pelvic ultrasound revealed bilateral ovarian chocolate cysts (left: 3.2 cm, right: 2.8 cm). Serum CA125 was mildly elevated (56 U/mL).</p>
          <p style="margin-bottom: 0.5rem;"><strong>Western diagnosis:</strong> Endometriosis (ovarian type). The patient declined hormonal therapy and requested traditional Chinese medicine (TCM) treatment.</p>
          <p style="margin-bottom: 0.5rem;"><strong>TCM syndrome differentiation:</strong> Taiyin-Yangming combination disorder</p>
          <p style="margin-bottom: 0.5rem;"><strong>Treatment principle and formula:</strong> Modified <em>Fuzi Decoction</em> combined with <em>Yiyi Fuzi Baijiang Powder</em> and <em>Zhishi Shaoyao Powder</em>, with additional <em>Zihua Diding</em>. Decoction was taken from 7 days before menstruation until day 3 of menstruation, for two consecutive menstrual cycles.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Adjuvant therapy:</strong> Classical moxibustion</p>
          <p style="margin-bottom: 0.5rem;"><strong>Outcomes:</strong></p>
          <ul style="margin-bottom: 0.5rem; padding-left: 1.2rem;">
            <li>After the 1st cycle: Dysmenorrhea significantly reduced; analgesic use decreased from 3 tablets to 1 tablet per cycle; fewer blood clots.</li>
            <li>After the 3rd cycle: Only mild lower abdominal discomfort during menstruation; no need for analgesics; menstrual blood color turned normal; cold intolerance improved.</li>
            <li>At 6-month follow-up ultrasound: Left chocolate cyst reduced to 1.1 cm; right cyst resolved. CA125 decreased to 21 U/mL.</li>
            <li>At 1-year follow-up: No recurrence of dysmenorrhea; normal menstrual cycles. The patient self-assessed as “symptomatically cured.”</li>
          </ul>
          <p style="font-size: 0.9rem; font-style: italic; color: var(--text-muted); margin-top: 0.5rem;">Note: Although the ovarian cyst did not completely disappear on imaging, the patient was free of clinical symptoms, meeting the TCM criteria for clinical cure.</p>
        </div>

        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 1rem;">
          <h5 style="font-weight: 600; margin-top: 0; margin-bottom: 0.5rem; color: var(--terracotta);">Case Example 2</h5>
          <p style="margin-bottom: 0.5rem;"><strong>Patient:</strong> Female, 29 years old, married.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Chief complaint:</strong> Chronic lower abdominal dull pain for over 1 year, exacerbated during menstruation. She also experienced lumbosacral and lower abdominal distending pain during the intermenstrual period and after fatigue. Additional symptoms included yellowish and profuse leukorrhea, occasional low-grade fever, dry mouth and bitter taste, and sticky stools.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Imaging and labs:</strong> Pelvic ultrasound revealed focal adenomyosis (posterior uterine wall thickness: 3.0 cm) and scattered ectopic foci in the left adnexal region. CA125 was 78 U/mL.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Past treatment:</strong> Prior hormonal therapy was discontinued due to abnormal liver function.</p>
          <p style="margin-bottom: 0.5rem;"><strong>TCM syndrome differentiation:</strong> Shaoyang-Yangming combination disorder</p>
          <p style="margin-bottom: 0.5rem;"><strong>Treatment principle and formula:</strong> Modified <em>Dahuang Mudan Decoction</em> combined with <em>Zhishi Shaoyao Powder</em> and <em>Yiyi Fuzi Baijiang Powder</em>, with additional <em>Zihua Diding</em>, <em>Tufuling</em>, and <em>Zaojiaoci</em>. The decoction was taken daily (including during menstruation) for 4 consecutive months.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Adjuvant therapy:</strong> Medium-frequency biopen with cupping and infrared spectral therapy.</p>
          <p style="margin-bottom: 0.5rem;"><strong>Outcomes:</strong></p>
          <ul style="margin-bottom: 0.5rem; padding-left: 1.2rem;">
            <li>After 2 months of treatment: Lower abdominal dull pain markedly reduced; leukorrhea decreased; stools became formed; dry mouth and bitter taste resolved.</li>
            <li>After 4 months of treatment: No significant pain during menstruation or intermenstrual periods; patient returned to normal work and life.</li>
            <li>Follow-up ultrasound: Posterior uterine wall thickness reduced to 2.5 cm; no definite ectopic foci in the left adnexal region. CA125 decreased to 32 U/mL.</li>
            <li>At 8-month follow-up: No symptom recurrence. The patient achieved spontaneous pregnancy (pregnancy is known to suppress endometriosis progression and is considered part of the therapeutic outcome).</li>
          </ul>
        </div>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">PART 07: Clinical Extension</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 500; font-style: italic;">Same Principle for Uterine Fibroids and Adenomyosis</p>
        <p style="margin-bottom: 1rem;">
          Professor Xu points out that uterine fibroids, adenomyosis, and endometriosis share highly overlapping clinical presentations. Therefore, they can all be managed by pattern differentiation based on the above-mentioned “clearing heat + resolving stasis” approach.
        </p>
        <p style="margin-bottom: 1rem;">
          However, it should be noted: if the mass is enormous, grows rapidly, or is accompanied by uncontrollable bleeding, surgical indications should be promptly evaluated. The goal of TCM treatment is to control symptoms, reduce the mass, and improve the fertility environment. One should not blindly pursue “pure TCM elimination of the mass”.
        </p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">PART 08: Conclusion</h4>
        <p style="margin-bottom: 0.5rem; font-weight: 500; font-style: italic;">Rethinking Endometriosis from the Perspective of Yangming Excess Heat</p>
        <p style="margin-bottom: 1rem;">
          Professor Xu proposes that: <em>“The Chong Vessel serves as the sea of blood, while the Ren Vessel governs the uterus and gestation. The nourishment and pathological changes of the female reproductive system are inseparable from the pathological mechanism of deficiency pertaining to the Taiyin and excess pertaining to the Yangming. Deficiency manifests as dull pain, while excess presents as severe pain. Deficiency should be treated by supplementation, which must focus on strengthening the spleen and resolving dampness; excess should be treated by purgation, which necessarily involves unblocking the bowels and draining heat.”</em>
        </p>
        <p style="margin-bottom: 1rem;">
          Endometriosis falls within the category of “zhengjia” (abdominal masses). During menstrual episodes, the pain is often excruciating, and the syndrome typically exhibits the characteristic of “stasis-heat moving through the system.” Therefore, treating endometriosis from the perspective of Yangming stasis-heat breaks away from the traditional thinking patterns of “cold congealing leading to blood stasis” and “deficiency and cold in the Chong and Ren vessels,” offering a new differentiation and treatment approach for clinical practice.
        </p>
        <p style="margin-bottom: 0.5rem;">
          The core clinical experience can be summarized as follows:
        </p>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li><strong>Location:</strong> Yangming</li>
          <li><strong>Nature:</strong> Heat toxin and blood stasis stagnation</li>
          <li><strong>Treatment principles:</strong> Clear heat, resolve toxicity, cool blood, and transform stasis</li>
          <li><strong>Contraindication:</strong> Avoid blind warm-tonifying methods.</li>
        </ul>
        <p style="margin-bottom: 1rem;">
          This academic viewpoint originates from clinical practice and returns to guide it, providing a concise and efficient pathway for the traditional Chinese medicine treatment of endometriosis. Admittedly, the treatment of endometriosis with Chinese medicine still requires validation through more high-quality clinical research. Nevertheless, Professor Xu’s clinical experience undoubtedly opens a new window for the management of this intractable disease.
        </p>
      `
    }
  },
  child: {
    de: {
      title: "Die Fünf-Ton-Melodie-Elfen: Sound Healing & Kunst für Kinder",
      body: `
        <p>Ein kreatives und meditatives Gruppenangebot für Kinder zwischen 3 und 10 Jahren, geleitet von Deng Nanjing (Klangtherapeutin) und Dr. Qiao Jingwen (TCM-Ärztin). Wir verbinden heilsame Instrumente mit Malerei aus Kräuterpigmenten.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Die fünf Töne und die Organe</h4>
        <p>Nach der TCM-Klanglehre korrespondieren die fünf traditionellen Tonskalen (角 Jue, 徵 Zhi, 宫 Gong, 商 Shang, 羽 Yu) mit den fünf Elementen und Organsystemen (Leber, Herz, Milz, Lunge, Niere). Durch das Spielen von Gongs, nepalesischen Klangschalen und Handpans harmonisieren wir die Emotionen der Kinder, fördern die Konzentration und bauen Schulstress ab.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Kräutermalerei</h4>
        <p>Die Kinder malen mit selbst hergestellten Pigmenten aus traditionellen Heilkräutern (wie Indigo für Blau, Kurkuma für Gelb, Färberdistel für Rot). Dies vermittelt einen spielerischen, sensorischen Zugang zur Naturapotheke.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Kurs-Details</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Zielgruppe</strong>: Kinder (3-10 Jahre) mit ihren Eltern</li>
          <li><strong>Gruppengröße</strong>: Maximal 7 Familien pro Kurs</li>
          <li><strong>Gebühr</strong>: 199 RMB (~25 €) inkl. aller Malutensilien und gesunder Kräutersnacks</li>
          <li><strong>Kursleitung</strong>:
            <ul>
              <li>Deng Nanjing (Internationale Klangtherapeutin, Gründerin der Lebensfluss TCM-Klinik in Deutschland)</li>
              <li>Dr. Jingwen Qiao (Lizenzierte TCM-Ärztin, promoviert an der Fudan-Universität)</li>
            </ul>
          </li>
        </ul>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Chinesische Originalversion / 中文版</h4>
        <p style="font-weight: 600; color: var(--terracotta); margin-top: 1rem;">活动地点：深圳市南山区招商街道沿山社区南海大道1019号南山医疗器械产业园B108号深圳弘道中医诊所<br>活动时间：4月18日 10:00 AM / 4月19日 15:00 PM</p>
        <p>我们相信，比知识更早萌芽的，是一个孩子感知世界的能力、安顿情绪的力量、自由表达的勇气。</p>
        <p>“五音小精灵”正为此而来——这是一场中医艺术体验活动，用声音开启感官，用本草连接自然，用中医智慧贯穿始终。在德国音疗师与执业中医师的共同陪伴下，孩子的专注力、感知力、创造力，将在声音与色彩中悄悄生长。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">01 音乐·音声疗愈：</h5>
        <p>孩子们将亲手体验来自世界各地的疗愈乐器：德国的音锣、尼泊尔的颂钵、法国的音叉、印度的手碟、南美的双音笛、墨西哥的音鼓等。德国音疗师带来国际前沿的音声疗愈方法，全程中英文双语引导。专业中医师用孩子们听得懂的语言，传递“五音入五脏”的千年智慧，讲述住在肝心脾肺肾里的“角徵宫商羽”五位小精灵的故事。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">02 绘画·本草力量：</h5>
        <p>中医师带领孩子们认识常见中药材，观察形状、触摸纹理、嗅闻气味。孩子们用画笔描绘属于自己的“本草图鉴”，释放自由的表达。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">03 活动信息：</h5>
        <ul class="feature-list">
          <li>适合人群：3-10岁儿童（可一名家长陪同）</li>
          <li>形式：小班精品，每场限7组家庭</li>
          <li>活动体验价：199元</li>
          <li>讲师介绍：
            <ul>
              <li>国际音声疗愈师 邓楠景 (Deng Nanjing)，德国Lebensfluss中医诊所创办人</li>
              <li>执业中医师 乔靖文 (Qiao Jingwen)，复旦大学博士</li>
            </ul>
          </li>
        </ul>
      `
    },
    en: {
      title: "Five-Note Melody Elves: Sound Healing & Art for Kids",
      body: `
        <p>A playful, grounding group workshop designed for children aged 3-10, facilitated by sound therapist Deng Nanjing and Dr. Adrianna Qiao. We integrate therapeutic acoustic instruments with painting using organic herbal pigments.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">The Five Notes & Organ Networks</h4>
        <p>Based on the TCM Five-Element music theory, each tone (Jue, Zhi, Gong, Shang, Yu) vibrates with a specific organ network (Liver, Heart, Spleen, Lung, Kidney). Playing instruments like German gongs, Nepalese singing bowls, and handpans helps kids ease nervous tension, improve cognitive focus, and release academic anxiety.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Herbal Art Painting</h4>
        <p>Children create artwork using pigments extracted directly from raw TCM herbs (such as Indigo for blue, Turmeric for yellow, and Safflower for red), creating a sensory connection with nature's healing elements.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Event Schedule & Cost</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Schedule</strong>: April 18th at 10:00 AM & April 19th at 3:00 PM</li>
          <li><strong>Target Group</strong>: Children (3-10 years) accompanied by parents</li>
          <li><strong>Capacity</strong>: Limited to 7 families per session</li>
          <li><strong>Fee</strong>: 199 RMB (~$25 USD) including art materials and organic herbal snacks</li>
          <li><strong>Facilitators</strong>:
            <ul>
              <li>Deng Nanjing (International Sound Therapist, founder of Lebensfluss TCM Clinic in Germany)</li>
              <li>Dr. Jingwen Qiao (Licensed TCM Physician, Doctor from Fudan University)</li>
            </ul>
          </li>
        </ul>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Chinese Original Version / 中文版</h4>
        <p style="font-weight: 600; color: var(--terracotta); margin-top: 1rem;">活动地点：深圳市南山区招商街道沿山社区南海大道1019号南山医疗器械产业园B108号深圳弘道中医诊所<br>活动时间：4月18日 10:00 AM / 4月19日 15:00 PM</p>
        <p>我们相信，比知识更早萌芽的，是一个孩子感知世界的能力、安顿情绪的力量、自由表达的勇气。</p>
        <p>“五音小精灵”正为此而来——这是一场中医艺术体验活动，用声音开启感官，用本草连接自然，用中医智慧贯穿始终。在德国音疗师与执业中医师的共同陪伴下，孩子的专注力、感知力、创造力，将在声音与色彩中悄悄生长。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">01 音乐·音声疗愈：</h5>
        <p>孩子们将亲手体验来自世界各地的疗愈乐器：德国的音锣、尼泊尔的颂钵、法国的音叉、印度的手碟、南美的双音笛、墨西哥的音鼓等。德国音疗师带来国际前沿 of 音声疗愈方法，全程中英文双语引导。专业中医师用孩子们听得懂的语言，传递“五音入五脏”的千年智慧，讲述住在肝心脾肺肾里的“角徵宫商羽”五位小精灵的故事。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">02 绘画·本草力量：</h5>
        <p>中医师带领孩子们认识常见中药材，观察形状、触摸纹理、嗅闻气味。孩子们用画笔描绘属于自己的“本草图鉴”，释放自由的表达。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">03 活动信息：</h5>
        <ul class="feature-list">
          <li>适合人群：3-10岁儿童（可一名家长陪同）</li>
          <li>形式：小班精品，每场限7组家庭</li>
          <li>活动体验价：199元</li>
          <li>讲师介绍：
            <ul>
              <li>国际音声疗愈师 邓楠景 (Deng Nanjing)，德国Lebensfluss中医诊所创办人</li>
              <li>执业中医师 乔靖文 (Qiao Jingwen)，复旦大学博士</li>
            </ul>
          </li>
        </ul>
      `
    }
  },
  mushroom: {
    de: {
      title: "Die Weisheit der Pilzheilkunde: Das Wood Wide Web in unserem Körper",
      body: `
        <p>In der tiefen Schatzkammer der Traditionellen Chinesischen Medizin (TCM) gibt es eine besondere Klasse von „Einsiedlern“ – sie sind weder hohe Bäume noch üppige Kräuter, sondern Pilze, die im Stillen an dunklen, feuchten Orten wachsen.</p>
        <p>Die Pilzheilkunde der TCM, als Schnittpunkt von Pilzreich und chinesischer Medizin, spielt seit der Antike eine unersetzliche Rolle bei der Stärkung der Lebensenergie, der Ausleitung pathogener Faktoren und der Regulierung der inneren Organe aufgrund ihrer einzigartigen Wachstumsgewohnheiten, milden Eigenschaften und bemerkenswerten Heilwirkungen.</p>
        <p>Aus Sicht der modernen Wissenschaft sind Heilpilze reich an Wirkstoffen wie Polysacchariden, Triterpenen und Polypeptiden, die eine starke immunmodulatorische und tumorhemmende Wirkung zeigen. Sie entfalten zudem eine milde, durch die moderne Medizin unersetzliche Kraft in der Gynäkologie, insbesondere bei Endometriose.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Häufige Heilpilze in der TCM:</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>茯苓 (Poria cocos)</strong>: Entwässert Feuchtigkeit, stärkt die Milz und beruhigt den Geist (Shen).</li>
          <li><strong>猪苓 (Polyporus umbellatus)</strong>: Fördert das Wasserlassen und leitet Feuchtigkeit aus, ideal bei Lymphstau.</li>
          <li><strong>灵芝 (Ganoderma lucidum / Reishi)</strong>: Nährt das Herz-Qi, beruhigt den Geist und stärkt das Immunsystem.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Fallstudien</h4>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 1rem;">
          <p><strong>Fall 1 (Schilddrüsenknoten, 2.1cm - Prof. Xu Ruqi)</strong>: Eine 48-jährige Patientin mit tastbaren Schilddrüsenknoten und Schluckbeschwerden. Nach 3 Monaten gezielter Therapie mit Poria (Fuling) und Reishi (Lingzhi) zur Schleim- und Stauungsauflösung bildete sich der Knoten auf 0.9cm zurück, die Beschwerden verschwanden vollständig.</p>
        </div>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 2rem;">
          <p><strong>Fall 2 (Brustdrüsen-Hyperplasie & Angst - Dr. Qiao Jingwen)</strong>: Eine 38-jährige Patientin mit schmerzhaften Brustknoten (1.6cm) sowie ausgeprägter Unruhe und Schlaflosigkeit. Durch vegetative Regulation mit Pilzextrakten in Kombination mit beruhigenden Kräutern lösten sich die Knoten auf, das Herzklopfen verschwand und die Schlafqualität besserte sich dauerhaft.</p>
        </div>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Chinesische Originalversion / 中文版</h4>
        <p>在博大精深的中药宝库中，有一类特殊的“隐士”——它们既非高大的乔木，亦非繁茂的草本，而是默默生长于阴暗潮湿处的真菌。</p>
        <p>菌类中药（Fungal Traditional Chinese Medicine）作为真菌界与中医药学交汇的结晶，自古以来便以其独特的生长习性、温和的药性以及显著的疗效，在扶正祛邪、调理脏腑中扮演着不可替代的角色。</p>
        <p>从现代科学视角来看，菌类中药不仅富含多糖、三萜类、多肽等活性成分，展现出强大的免疫调节和抗肿瘤活性，更在妇科尤其是子宫内膜异位症（Endometriosis）的调理中，发挥着现代医学无法替代的温和力量。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">常用菌类中药介绍：</h5>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li>1. 茯苓 (Poria cocos)</li>
          <li>2. 猪苓 (Polyporus umbellatus)</li>
          <li>3. 灵芝 (Ganoderma lucidum)</li>
        </ul>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">经典案例1 (徐汝奇 教授)：</h5>
        <p>一甲状腺多发结节患者，伴有严重焦虑情绪。徐汝奇教授接诊后，辨证为肝郁气滞、痰瘀互结。以茯苓、猪苓等菌类中药为主药，辅以柴胡、郁金等疏肝解郁之品。治疗3个月后复查，结节明显缩小，焦虑情绪大幅改善。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">经典案例2 (乔靖文 博士)：</h5>
        <p>一乳腺增生合并严重失眠与焦虑障碍患者，乔靖文博士以灵芝、茯苓等菌类中药配伍酸枣仁、百合等，发挥菌类中药的双向调节作用。服药2周后睡眠显著改善，1个月后乳房胀痛消失，焦虑状态评定呈轻度，生活质量提升。</p>
      `
    },
    en: {
      title: "The Wisdom of Fungal Medicine: Connecting the Wood Wide Web",
      body: `
        <p>In the profound treasury of Traditional Chinese Medicine (TCM), there is a special class of "hermits"—they are neither tall trees nor lush herbs, but fungi that grow quietly in dark, damp places.</p>
        <p>Fungal Traditional Chinese Medicine, as the crystallization of the intersection of the fungal kingdom and Chinese medicine, has played an irreplaceable role in strengthening vital energy, expelling pathogenic factors, and regulating viscera since ancient times due to its unique growth habits, mild properties, and significant curative effects.</p>
        <p>From the perspective of modern science, fungal Chinese medicine is not only rich in active ingredients such as polysaccharides, triterpenes, and polypeptides, showing strong immunomodulatory and anti-tumor activities, but also exerts a gentle power irreplaceable by modern medicine in the regulation of gynecology, especially endometriosis.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Common Fungal TCM Herbs:</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Poria (茯苓 - Poria cocos)</strong>: Drains dampness, strengthens the spleen, and calms the spirit.</li>
          <li><strong>Polyporus (猪苓 - Polyporus umbellatus)</strong>: Promotes urination and drains dampness, ideal for lymphatic flow.</li>
          <li><strong>Ganoderma (灵芝 - Ganoderma lucidum / Reishi)</strong>: Nourishes Heart Qi, calms the mind, and modulates immunity.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Case Studies</h4>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 1rem;">
          <p><strong>Case 1 (Thyroid Nodule Regression - Prof. Xu Ruqi)</strong>: A patient presenting with multiple thyroid nodules accompanied by severe anxiety. Professor Xu Ruqi diagnosed it as Liver Qi stagnation with phlegm-blood stasis. He prescribed a formula focusing on fungal medicines such as Poria and Polyporus, supplemented by Radix Bupleuri and Radix Curcumae. After 3 months, nodules significantly shrank and anxiety subsided.</p>
        </div>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 2rem;">
          <p><strong>Case 2 (Breast Hyperplasia & Insomnia - Dr. Jingwen Qiao)</strong>: A patient presenting with breast hyperplasia combined with severe insomnia and anxiety. Dr. Jingwen Qiao formulated a prescription combining Ganoderma and Poria with Semen Ziziphi Spinosae and Bulbus Lilii. After 2 weeks, sleep improved; after 1 month, breast pain disappeared, and anxiety became mild.</p>
        </div>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Chinese Original Version / 中文版</h4>
        <p>在博大精深的中药宝库中，有一类特殊的“隐士”——它们既非高大的乔木，亦非繁茂的草本，而是默默生长于阴暗潮湿处的真菌。</p>
        <p>菌类中药（Fungal Traditional Chinese Medicine）作为真菌界与中医药学交汇的结晶，自古以来便以其独特的生长习性、温和的药性以及显著的疗效，在扶正祛邪、调理脏腑中扮演着不可替代的角色。</p>
        <p>从现代科学视角来看，菌类中药不仅富含多糖、三萜类、多肽等活性成分，展现出强大的免疫调节和抗肿瘤活性，更在妇科尤其是子宫内膜异位症（Endometriosis）的调理中，发挥着现代医学无法替代 of 温和力量。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">常用菌类中药介绍：</h5>
        <ul class="feature-list" style="margin-bottom: 1rem;">
          <li>1. 茯苓 (Poria cocos)</li>
          <li>2. 猪苓 (Polyporus umbellatus)</li>
          <li>3. 灵芝 (Ganoderma lucidum)</li>
        </ul>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">经典案例1 (徐汝奇 教授)：</h5>
        <p>一甲状腺多发结节患者，伴有严重焦虑情绪。徐汝奇教授接诊后，辨证为肝郁气滞、痰瘀互结。以茯苓、猪苓等菌类中药为主药，辅以柴胡、郁金等疏肝解郁之品。治疗3个月后复查，结节明显缩小，焦虑情绪大幅改善。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">经典案例2 (乔靖文 博士)：</h5>
        <p>一乳腺增生合并严重失眠与焦虑障碍患者，乔靖文博士以灵芝、茯苓等菌类中药配伍酸枣仁、百合等，发挥菌类中药的双向调节作用。服药2周后睡眠显著改善，1个月后乳房胀痛消失，焦虑状态评定呈轻度，生活质量提升。</p>
      `
    }
  },
  nervous: {
    de: {
      title: "Klangheilung im Mikrokosmos: Neuro-Regulation über Schwingungen",
      body: `
        <p>Der menschliche Körper vibriert ständig (Herzschlag, Atmung, Gehirnwellen, zelluläre Vibration). Chronischer Stress, Traumata und Erschöpfung stören diese biologischen Frequenzen. Die Klangtherapie nutzt physikalische Gesetze, um das System wieder in Einklang zu bringen.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Die drei wissenschaftlichen Pfade der Klangheilung</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Physikalische Resonanz</strong>: Da der Körper zu ca. 70 % aus Wasser besteht, wandern die Schallwellen der tibetischen Klangschalen tief in das Gewebe und führen dort eine sanfte zelluläre Mikromassage durch.</li>
          <li><strong>Brainwave Entrainment (Gehirnwellen-Mitnahme)</strong>: Die beruhigenden Frequenzen regen das Gehirn an, von aktiven Beta-Wellen in entspannte Alpha- und Theta-Wellen (Zustand tiefer Meditation und Selbstheilung) zu wechseln.</li>
          <li><strong>Neuromodulation & Vagus-Nerv</strong>: Die Vibrationen stimulieren den Vagus-Nerv, senken die Herzfrequenz und aktivieren den Parasympathikus (Ruhe- und Verdauungssystem).</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Weitere wissenschaftliche Vertiefungen</h4>
        <p><strong>Wasser als resonanter Leiter:</strong> Schall breitet sich in Wasser mit 1500 m/s aus (4-mal schneller als in der Luft). Dadurch können sich die Wellen augenblicklich im gesamten Körperwasser ausbreiten und die Zellmembranen massieren.</p>
        <p><strong>TCM-Prinzip: Nieren-Essenz und Klang:</strong> Nach der TCM „steuern die Nieren das Wasser und öffnen sich in den Ohren“. Klangtherapie nährt die Nieren-Essenz (Jing), beruhigt das Herz (Shen) und bringt das Wasser-Element des Körpers wieder zum Fließen.</p>
        <p><strong>Schumann-Resonanz:</strong> Die elektromagnetische Hintergrundfrequenz der Erde (7,83 Hz) liegt genau an der Grenze zwischen Alpha- und Theta-Wellen. Die Klangtherapie nutzt Instrumente wie nepalesische Klangschalen, um mit diesem natürlichen Grundton in Resonanz zu treten.</p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Chinesische Originalversion / 中文版</h4>
        <p>人体即宇宙，声音是良方。健康是和谐共振，疾病是跑调失序。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">第一章 身体的振动节律</h5>
        <p>生命能量的本质是节律性的振动：<br>
        - 宏观节律：心脏跳动（1-1.3 Hz）、呼吸律动（0.2-0.3 Hz）、肌纤维微小收缩（8-12 Hz）。<br>
        - 微观振动：细胞膜在 kHz 至 MHz 频率持续振动以交换物质。<br>
        - 脑电波：常态为 α波（8-12 Hz），深度放松和冥想时进入 θ波（4-8 Hz）。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">第二章 声音疗愈的三条科学通路</h5>
        <p>1. 物理共振：声波直接对器官、经络和细胞进行物理微按摩。<br>
        2. 脑波同步：通过双耳节拍等声波引导脑电波进入放松频段。<br>
        3. 神经调控：激活副交感神经，降低皮质醇，提高血清素，缓解焦虑。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">第三章 水的共振密码</h5>
        <p>人体约70%由水组成。声波在水中的传播速度为 1500 m/s，是空气 of 4倍。声波能迅速穿透全身，通过水分子集体同频共振来调节细胞代谢。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">第四章 中医五音与六字诀</h5>
        <p>- 五音对应五脏：《黄帝内经》记载角（肝）、徵（心）、宫（脾）、商（肺）、羽（肾）五音频率对应。<br>
        - 六字诀呼吸法：“嘘”（肝）、“呵”（心）、“呼”（脾）、“呬”（肺）、“吹”（肾）、“嘻”（三焦）通过口型共振调节内脏。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">第五章 舒曼共振 (Schumann Resonance)</h5>
        <p>地球的电磁心跳基频为 7.83 Hz，正好处于脑电波的 α 和 θ 波交界，是生命的生物基准频率。声音疗愈利用颂钵等翻译并传递此频率。</p>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 1rem;">研发团队：乔靖文 博士、邓榕 硕士、邓楠景 音疗师</p>
      `
    },
    en: {
      title: "Sound Healing in the Human Microcosm: Vibrational Neuro-Regulation",
      body: `
        <p>The human body is in a state of continuous vibration (heartbeat, respiratory cycles, brainwaves, molecular movement). Stress and burnout disrupt these natural biological frequencies. Sound healing restores this equilibrium.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Three Scientific Pathways of Sound Healing</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Physical Resonance</strong>: Sound waves travel easily through water. Since the human body is ~70% water, singing bowl frequencies (such as 432 Hz) penetrate deep tissues, performing a gentle cellular massage.</li>
          <li><strong>Brainwave Entrainment</strong>: Rhythmic audio frequencies guide brain activity from high-frequency Beta waves down to Alpha and Theta ranges, facilitating deep meditation and tissue repair.</li>
          <li><strong>Vagal Stimulation</strong>: Acoustic vibrations stimulate the vagus nerve, immediately shifting the nervous system from a sympathetic (fight-or-flight) state into parasympathetic recovery.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Further Scientific Insights</h4>
        <p><strong>Water as the Resonant Conduit:</strong> The human body is ~70% water. Sound travels at 1500 m/s in water (4x faster than air), allowing waves to propagate throughout the bodily fluids instantly and massage cell membranes.</p>
        <p><strong>TCM Principle: Kidney Jing & Water Element:</strong> In TCM, the "Kidneys rule water and open to the ears." Sound healing directly nourishes Kidney Jing (vital essence), anchors the Heart Shen (spirit), and harmonizes the flow of fluids.</p>
        <p><strong>Schumann Resonance:</strong> The Earth's background electromagnetic frequency (7.83 Hz) matches the Alpha/Theta brainwave border. Sound therapy uses instruments like Nepalese singing bowls to resonate with this natural baseline.</p>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Chinese Original Version / 中文版</h4>
        <p>人体即宇宙，声音是良方。健康是和谐共振，疾病是跑调失序。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">第一章 身体的振动节律</h5>
        <p>生命能量的本质是节律性的振动：<br>
        - 宏观节律：心脏跳动（1-1.3 Hz）、呼吸律动（0.2-0.3 Hz）、肌纤维微小收缩（8-12 Hz）。<br>
        - 微观振动：细胞膜在 kHz 至 MHz 频率持续振动以交换物质。<br>
        - 脑电波：常态为 α波（8-12 Hz），深度放松和冥想时进入 θ波（4-8 Hz）。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">第二章 声音疗愈的三条科学通路</h5>
        <p>1. 物理共振：声波直接对器官、经络和细胞进行物理微按摩。<br>
        2. 脑波同步：通过双耳节拍等声波引导脑电波进入放松频段。<br>
        3. 神经调控：激活副交感神经，降低皮质醇，提高血清素，缓解焦虑。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">第三章 水的共振密码</h5>
        <p>人体约70%由水组成。声波在水中的传播速度为 1500 m/s，是空气的4倍。声波能迅速穿透全身，通过水分子集体同频共振来调节细胞代谢。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">第四章 中医五音与六字诀</h5>
        <p>- 五音对应五脏：《黄帝内经》记载角（肝）、徵（心）、宫（脾）、商（肺）、羽（肾）五音频率对应。<br>
        - 六字诀呼吸法：“嘘”（肝）、“呵”（心）、“呼”（脾）、“呬”（肺）、“吹”（肾）、“嘻”（三焦）通过口型共振调节内脏。</p>
        <h5 style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem;">第五章 舒曼共振 (Schumann Resonance)</h5>
        <p>地球的电磁心跳基频为 7.83 Hz，正好处于脑电波的 α 和 θ 波交界， is 生命的生物基准频率。声音疗愈利用颂钵等翻译并传递此频率。</p>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 1rem;">研发团队：乔靖文 博士、邓榕 硕士、邓楠景 音疗师</p>
      `
    }
  },
  stemcell: {
    de: {
      title: "Stammzelltherapie & Langlebigkeit",
      body: `
        <p>Dr. Adrianna Qiao (Qiao Jingwen) leitet die Koordination und medizinische Beratung für integrative Stammzelltherapie und zelluläre Regeneration.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Rechtlicher Rahmen & Partnerklinik</h4>
        <p>Nachdem Stammzelltherapien in China vorübergehend streng reguliert waren, sind diese hochentwickelten Behandlungen nun wieder in unserer staatlich lizenzierten Partnerklinik in <strong>Lecheng, Hainan</strong> (der medizinischen Sonderzone Chinas) in vollem Umfang zugelassen. Es können sich zerstörte Knieknorpel regenerieren und viele Autoimmunerkrankungen erfolgreich behandelt werden.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Diagnoseverfahren & Kostentransparenz</h4>
        <p>Wir ermitteln den Bedarf und die Eignung stets in einem <strong>persönlichen Diagnoseverfahren</strong> vorab. Wir prüfen gemeinsam, welche Kombination am besten zum jeweiligen Krankheitsbild passt, und teilen Ihnen anschließend die Kosten der Behandlung (Kostenaufteilung) mit.</p>
      `
    },
    en: {
      title: "Stem Cell Therapy & Longevity",
      body: `
        <p>Dr. Adrianna Qiao (Qiao Jingwen) directs the coordination and medical consultation for integrative stem cell therapy and cellular regeneration.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Regulatory Framework & Partner Clinic</h4>
        <p>Following strict regulation of stem cell therapies in China, these advanced cellular procedures are now fully approved and available at our licensed partner clinic in the <strong>Lecheng Medical Pilot Zone in Hainan</strong>. It can regenerate destroyed knee cartilage and successfully treat many autoimmune diseases.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Diagnosis & Cost Sharing</h4>
        <p>Patient suitability is determined through an <strong>individual clinical diagnostic process</strong>. We analyze which specific cell type and protocol match your pathology, and provide a transparent breakdown of treatment costs and shared clinic fees.</p>
      `
    }
  },
  infrared: {
    de: {
      title: "Infrarot-Körperscan (Medizinische Infrarot-Thermographie)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead">Das <strong>Intelligente TMT-Infrarot-Körperscansystem (Medizinische Infrarot-Thermographie)</strong> ist ein hochmodernes, berührungsloses und komplett strahlungsfreies Diagnoseverfahren. Es erfasst und visualisiert die natürliche Infrarot-Wärmeabstrahlung des menschlichen Körpers mit höchster Präzision. In unserer Klinik nutzen wir diese funktionelle Bildgebung, um Entzündungen, Durchblutungsstörungen und energetische Blockaden entlang der Meridiane und Zang-Fu-Organe objektiv sichtbar zu machen.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Wirkprinzip & TCM-Integration</h4>
          <p>Aus Sicht der TCM spiegeln Temperaturabweichungen den Zustand von Yin, Yang, Qi und Blut wider. Entzündliche Prozesse und Gewebestauungen zeigen sich als lokale Hitze-Muster (exzessives Yang / Hitze-Syndrom). Durchblutungsstörungen, chronisch-degenerative Prozesse oder energetische Blockaden (Qi-Mangel / Kälte-Stagnation) stellen sich hingegen als kalte Zonen dar. Dies ermöglicht es uns, thermische Anomalien und Störungen im Fluss des Qi zu lokalisieren, noch bevor strukturelle Gewebeschäden im MRT oder Röntgen sichtbar werden.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Anwendungsbereiche</h4>
          <p>Der Infrarot-Körperscan wird gezielt für folgende Beschwerdebilder eingesetzt:</p>
          <ul class="feature-list">
            <li><strong>Lenden- und Halswirbelsäule:</strong> Präzise Lokalisierung von myofaszialen Triggerpunkten, Bandscheibenreizungen und muskulären Dysbalancen.</li>
            <li><strong>Durchblutungsstörungen & Varizen:</strong> Visualisierung von venösen Stauungen, peripherer Mikrozirkulationsschwäche und Lymphödemen.</li>
            <li><strong>Entzündungsscreening & Chronische Leiden:</strong> Früherkennung subklinischer Entzündungsherde, Gelenkarthritis, Schilddrüsenüberaktivität (Knötchen) oder Brustdrüsengewebeveränderungen (Hyperplasie).</li>
            <li><strong>Stoffwechsel & TCM-Syndrome:</strong> Diagnose von Milz-Magen-Kälte (脾胃虚寒), Herz-Yang-Mangel (心阳虚), Hitze in den fünf Herzen (五心烦热), Feuchte-Hitze im Unterleib (下焦湿热), Leber-Yang-Aufstieg (肝阳上亢) und Leber-Qi-Stagnation (肝气郁结).</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Herausragende Medizintechnik (TMT-9000S Premium)</h4>
          <p>Unser High-End-System <strong>TMT-9000S (Premium)</strong> zeichnet sich durch modernste technologische Standards aus:</p>
          <ul class="feature-list">
            <li><strong>5. Generation Infrarot-Detektor:</strong> Nutzt den neuesten ungekühlten HD-Infrarotsensor des französischen Marktführers ULIS mit einer effektiven Auflösung von 1024*768 Pixeln (ca. 786.000 Messpunkte). Dies ermöglicht eine 16-fache digitale Vergrößerung ohne Bildqualitätsverlust bei einem Aufnahmeabstand von 1,8 Metern.</li>
            <li><strong>Lokaler KI-Diagnoseserver:</strong> Die Auswertung erfolgt über einen klinikinternen, isolierten KI-Server. Das schützt Ihre sensiblen medizinischen Daten zu 100 %, da keine Internetverbindung für die AI-gestützte Thermogramm-Analyse und Berichterstellung benötigt wird.</li>
            <li><strong>Präzise 3D-Motorisierung:</strong> Die Kameraeinheit verfügt über ein dreidimensionales, elektrisches Bewegungssystem für stufenlose Höhenverstellung, Neigung und Schwenkung. Dadurch können Ganzkörper-Scans reproduzierbar und fehlerfrei durchgeführt werden.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">TMT-Gerätefamilie in der Übersicht</h4>
          <p>Das TMT-Portfolio umfasst neben dem <strong>TMT-9000S</strong> (Premium-Ausführung) auch das <strong>TMT-9000</strong> (Professional) und <strong>TMT-9000B</strong> (Praxis-Modell). Für den flexiblen klinischen Einsatz stehen das <strong>TMT-9000P</strong> (Mobiles Stativsystem) sowie das handliche <strong>TMT-7</strong> (tragbarer Infrarotscanner) zur Verfügung. Letzteres unterstützt kabellose Bildübertragungen und ist ideal für den mobilen Einsatz direkt am Behandlungsbett geeignet.</p>
        </div>
      `
    },
    en: {
      title: "Infrared Body Scan (Medical Infrared Thermography)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead">The <strong>Intelligent TMT Medical Infrared Body Scan (Medical Infrared Thermography)</strong> is a state-of-the-art, non-contact, and completely radiation-free functional imaging technology. It captures and visualizes the body's natural far-infrared thermal emissions. In our clinic, we use this technology to map microvascular blood flow and detect inflammation, circulation blockages, and energetic stagnation along the meridians and Zang-Fu organs.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">How it Works & TCM Integration</h4>
          <p>In traditional Chinese medicine, temperature variations serve as a direct reflection of Yin, Yang, Qi, and Blood status. Inflammatory processes and local hyperthermia appear as hot zones (excessive Yang / Heat syndrome). Conversely, circulation failures, degenerated tissue, or structural energy blocks (Qi/Yang deficiency or Cold stagnation) manifest as cold areas. This allows us to locate microvascular thermal anomalies and imbalances in the flow of Qi before physical structural changes are detectable on X-ray or MRI.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Indications & Clinical Applications</h4>
          <p>The Infrared Body Scan is utilized for the diagnosis and monitoring of various conditions:</p>
          <ul class="feature-list">
            <li><strong>Lumbar & Cervical Spine:</strong> Identifies nerve root compression, myofascial trigger points, localized muscle spasms, and structural misalignment.</li>
            <li><strong>Circulation & Varicose Veins:</strong> Visualizes vascular stasis, deep venous pooling, and peripheral microcirculation deficits.</li>
            <li><strong>Inflammation Screening:</strong> Safe, non-invasive assessment of subclinical arthritis, joint inflammation, thyroid nodules, or breast tissue hyperplasia.</li>
            <li><strong>Metabolic & TCM Syndromes:</strong> Identifies Spleen-Stomach deficiency cold (脾胃虚寒), Heart Yang deficiency (心阳虚), Five Hearts Heat (五心烦热), Lower Jiao damp-heat (下焦湿热), Liver Yang rising (肝阳上亢), and Liver Qi stagnation (肝气郁结).</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Advanced Technology (TMT-9000S Premium)</h4>
          <p>Our premium medical thermograph <strong>TMT-9000S (Premium)</strong> is engineered to meet the highest clinical specifications:</p>
          <ul class="feature-list">
            <li><strong>5th Gen HD Detector:</strong> Employs the latest uncooled infrared sensor from the French manufacturer ULIS, achieving an effective resolution of 1024*768 pixels (~786,000 thermal data points). It supports a lossless 16x digital zoom at a distance of 1.8 meters for precise anatomical mapping.</li>
            <li><strong>Local AI Diagnostics Server:</strong> Features a private local network server to process imaging data. AI-assisted analysis and report generation run entirely offline, ensuring 100% patient data privacy.</li>
            <li><strong>motorized 3D Camera Stand:</strong> Features automated height adjustment, panning, and tilting, allowing for rapid, reproducible full-body scans.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">System Models & Configurations</h4>
          <p>The TMT medical thermography product line includes the <strong>TMT-9000S</strong> (Premium), <strong>TMT-9000</strong> (Professional), and <strong>TMT-9000B</strong> (Practical). For mobile clinical needs, we deploy the <strong>TMT-9000P</strong> (Mobile Cart System) and the highly portable <strong>TMT-7</strong> (handheld scanner), which features built-in wireless connectivity for real-time diagnostic imaging directly in the patient room.</p>
        </div>
      `
    }
  },
  bianstone: {
    de: {
      title: "Bian-Hu Bioelektrizitäts-Therapie (TMT-ZP-100)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead">Die <strong>Bian-Hu Bioelektrizitäts-Therapie (Modell TMT-ZP-100)</strong> verbindet das jahrtausendealte Wissen der traditionellen chinesischen Steintherapie (砭石 - Bian Shi) mit moderner physikalischer Mittelfrequenz-Elektrotherapie. Durch das Zusammenspiel von biologischen Frequenzen und thermischer Energie dringen die therapeutischen Reize tief in die Gewebeschichten ein, regulieren das Nervensystem und lösen hartnäckige Blockaden.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Wirkmechanismus & Biophysik</h4>
          <p>Das Gerät moduliert mittelfrequente (2,5 kHz und 4,5 kHz) und niederfrequente biologische Wechselströme. Diese dringen tief in Muskeln, Faszien, Nerven und Meridiane ein. Gleichzeitig emittieren die erhitzten Bian-Stein-Aufsätze natürliches Infrarotlicht und hochfrequente Ultraschallimpulse. Diese Kombination erweitert die Kapillargefäße, regt die ATP-Zellenergieproduktion an, beschleunigt den Lymphabfluss und baut Entzündungsmediatoren ab.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Schwerpunkte ( WhatsApp & E-Mail Vorgaben )</h4>
          <p>Die Bian-Hu-Therapie wird primär bei folgenden Krankheitsbildern eingesetzt:</p>
          <ul class="feature-list">
            <li><strong>Schulterschmerzen & HWS-Syndrom:</strong> Löst tiefsitzende Muskelverspannungen, entlastet die Halswirbelsäule und lindert ausstrahlende Schmerzen.</li>
            <li><strong>Bandscheibenvorfall:</strong> Reduziert die Nervenwurzelkompression, lindert Rückenschmerzen und fördert die Regeneration des Bindegewebes.</li>
            <li><strong>Magen-Darm-Regulierung (Gastrointestinal):</strong> Reguliert die Peristaltik, hilft bei chronischer Verstopfung, Blähbauch und Reizdarmsyndrom durch sanfte Frequenzstimulation der Bauchorgane.</li>
            <li><strong>Hormonelle Balance & Frauengesundheit:</strong> Spezifische Frequenzen unterstützen die Durchblutung des Beckenraums bei gynäkologischen Beschwerden wie <strong>Endometriose (PCOS/PMOS)</strong>.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Weitere medizinische & präventive Anwendungen</h4>
          <p>Darüber hinaus eignet sich das System hervorragend bei Ischialgie, Prellungen, rheumatoider Arthritis, entzündlichen Beckenerkrankungen (Pelvic Inflammatory Disease) und Eileiterentzündungen (Adnexitis). Im Wellnessbereich wird es zur Meridianöffnung, zum raschen Laktatabbau nach dem Sport, zum Muskelaufbau (passive Kontraktion) und zur vegetativen Entspannung genutzt.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Einzigartige Geräteeigenschaften & Technologie</h4>
          <ul class="feature-list">
            <li><strong>Wechselbare Applikatoren:</strong>
              <ul>
                <li><strong>Beheizbare Bian-Stein-Therapie-Köpfe (砭石壶):</strong> Entwickelt für die dynamische Massage entlang von Meridianen und Muskelgruppen. Durch die Integration von Terahertz-Mischkristallen wird der Stromfluss sanft gepuffert. Dies verhindert unangenehme Nadelstiche oder schmerzhafte Muskelkrämpfe auf der Haut und ermöglicht eine tiefe, schmerzfreie Wirkung.</li>
                <li><strong>Beheizbare Silikon-Plattenelektroden:</strong> Für die stationäre, punktuelle Behandlung von Akupunkturpunkten und für die Iontophorese (schmerzfreies Einbringen von Heilkräuterextrakten mittels Stroms).</li>
              </ul>
            </li>
            <li><strong>Smart-Steuerung:</strong> Ausgestattet mit einem 21,5-Zoll-Touchscreen und intelligenter Sprachsteuerung für den freihändigen Betrieb während der Behandlung.</li>
            <li><strong>43 Therapieprogramme:</strong> Bietet optimierte Stromformen (Sinuswelle für Massagegefühl, Exponentialwelle für Schröpfgefühl, Dreieckswelle für Akupunkturreiz) zur Anpassung an das Gewebe.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Technische Spezifikationen</h4>
          <table class="tech-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem;">
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Modell</td><td style="padding: 0.5rem;">TMT-ZP-100</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Trägerfrequenzen</td><td style="padding: 0.5rem;">2,5 kHz und 4,5 kHz (Abweichung ±10%)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Modulationsfrequenz</td><td style="padding: 0.5rem;">0 Hz bis 150 Hz</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Max. Ausgangsstrom</td><td style="padding: 0.5rem;">&le; 80 mA (bei 500 Ohm Last)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Heiztemperatur</td><td style="padding: 0.5rem;">40 °C &plusmn; 5 °C (regelbar, zweistufiger Überhitzungsschutz)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Ausgänge</td><td style="padding: 0.5rem;">2 unabhängige Kanäle (Simultanbetrieb von Stein- und Plattenelektroden)</td></tr>
          </table>
        </div>
      `
    },
    en: {
      title: "Bian-Hu Bioelectric Therapy (TMT-ZP-100)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead">The <strong>Bian-Hu Bioelectric Therapy (Model TMT-ZP-100)</strong> integrates the therapeutic properties of natural Bian stone (砭石) with advanced medium-frequency electrotherapy. By combining biological frequency waves with heated minerals, it delivers deep thermal and bioelectric currents to muscle fibers, fascial sheets, nerve endings, and meridian pathways, resolving chronic pain and systemic stagnation.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Mechanism & Biophysics</h4>
          <p>This system modulates medium-frequency (2.5 kHz and 4.5 kHz) carrier waves with low-frequency biological impulses. When activated, the heated Bian stone treatment heads emit far-infrared energy and high-frequency ultrasonic waves. This bio-resonant action dilates capillary beds, accelerates cellular ATP synthesis, improves local microcirculation, and assists in the lymphatic drainage of inflammatory cytokines.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Specializations</h4>
          <p>The Bian-Hu Bioelectric Therapy is primarily indicated for:</p>
          <ul class="feature-list">
            <li><strong>Shoulder Pain & Cervical Spine:</strong> Relaxes paraspinal muscles, relieves compression on cervical nerve roots, and increases range of motion.</li>
            <li><strong>Intervertebral Disc Herniation:</strong> Promotes localized circulation to spinal tissues, reducing nerve inflammation and lower back pain.</li>
            <li><strong>Gastrointestinal Conditioning:</strong> Restores healthy digestive motility, helping relieve chronic bloating, constipation, and IBS symptoms.</li>
            <li><strong>Endometriosis & Gynecological Health:</strong> Supports microcirculation in the pelvic cavity, relieving spasms and regulating hormone stagnation in <strong>PCOS/PMOS and Endometriosis</strong>.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Further Applications</h4>
          <p>This system is also highly effective for treating sciatica, musculoskeletal contusions, rheumatoid arthritis, pelvic inflammatory disease, and annexitis. For general health maintenance, it is used to clear meridians, accelerate lactic acid clearance, perform passive muscle contractions (body toning), and balance autonomic nervous activity.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Hardware Features & Technology</h4>
          <ul class="feature-list">
            <li><strong>Dual Treatment Modes:</strong>
              <ul>
                <li><strong>Heated Bian-Stone Pot Applicators (砭石电极):</strong> Designed for dynamic massage along meridian pathways. Formulated with terahertz crystals, the electrodes buffer the current flow, preventing uncomfortable electrical shocks and allowing deep, painless tissue penetration.</li>
                <li><strong>Heated Silicone Pad Electrodes:</strong> Used for static acupoint stimulation and transdermal drug delivery (iontophoresis), facilitating rapid absorption of herbal extracts through the skin.</li>
              </ul>
            </li>
            <li><strong>Smart Interface:</strong> Equipped with a 21.5-inch touch panel and automated voice control for hands-free clinical operation.</li>
            <li><strong>43 Preset Prescriptions:</strong> Features multiple waveforms (Sine wave for massage feel, Index wave for cupping feel, and Triangle wave for focused acupuncture-like stimulation).</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Technical Parameters</h4>
          <table class="tech-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem;">
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Model</td><td style="padding: 0.5rem;">TMT-ZP-100</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Carrier Frequencies</td><td style="padding: 0.5rem;">2.5 kHz and 4.5 kHz (&plusmn;10%)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Modulation Frequency</td><td style="padding: 0.5rem;">0 Hz to 150 Hz</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Max. Output Current</td><td style="padding: 0.5rem;">&le; 80 mA (at 500 &Omega; load)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Output Temperature</td><td style="padding: 0.5rem;">40 °C &plusmn; 5 °C (adjustable, dual over-temp protection)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Ports</td><td style="padding: 0.5rem;">2 independent channels (supporting concurrent pot/pad therapy)</td></tr>
          </table>
        </div>
      `
    }
  },
  pujiu: {
    de: {
      title: "Kräuter-Wärme-Moxibustion (Großflächen-Moxibustion – Pu Jiu)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead">Die <strong>Kräuter-Wärme-Moxibustion (Großflächen-Moxibustion – Pu Jiu)</strong> vereint die traditionelle chinesische Moxa-Therapie (Rücken-Moxibustion, 铺灸) mit modernster Medizin- und Filtertechnologie. Durch das großflächige Verbrennen von reinem Beifußkraut (Moxa) über einer frischen Ingwerschicht (隔姜灸) und einer individuellen TCM-Kräuterpaste (隔药灸) wird dem Körper reine thermische Energie zugeführt, um tiefsitzende pathogenetische Kälte zu vertreiben.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Wirkprinzip: Die Kraft des Du Mai</h4>
          <p>Das Du Mai (Lenkergefäß) verläuft entlang der Wirbelsäule und gilt in der TCM als das „Meer aller Yang-Meridiane“. Die thermische Energie des brennenden Beifußes in Kombination mit den ätherischen Ölen des Ingwers und der Heilkräuter dringt durch die Haut-, Fett- und Muskelschichten hindurch, um die tieferen Organe und das Knochensystem zu erreichen („穿经透骨“). Dies aktiviert das Abwehr-Qi (Wei Qi), stärkt das Nieren-Yang und stimuliert die körpereigene Abwehr.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Indikationsbereiche & Behandlungsschwerpunkte</h4>
          <p>Die Pu-Jiu-Moxibustion wird vorrangig bei folgenden Indikationen angewendet:</p>
          <ul class="feature-list">
            <li><strong>Regelschmerzen & Kalte Gebärmutter (Dysmenorrhö):</strong> Löst Blut-Stagnationen (血瘀) im Unterleib, wärmt die Gebärmutter und reguliert den hormonellen Zyklus.</li>
            <li><strong>Lenden- & Knieschmerz:</strong> Lindert chronische Gelenk- und Wirbelsäulenschmerzen, die durch Kälte und Feuchtigkeit (Wind-Kälte-Feuchtigkeit-Bi-Syndrome) verstärkt werden.</li>
            <li><strong>Gynäkologische Entzündungen:</strong> Reguliert das Immunsystem und hemmt Entzündungsprozesse im Beckenbereich.</li>
            <li><strong>Hals- und Lendenwirbelsäulen-Erkrankungen:</strong> Wirkt muskelentspannend und schmerzlindernd bei Arthrose, chronischer Erschöpfung und myofaszialen Schmerzen.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">10 Spezifische Behandlungsprotokolle</h4>
          <p>In unserer Klinik wenden wir zehn bewährte, lokalisierte Moxibustionen an:</p>
          <ul class="feature-list">
            <li><strong>Körpervorderseite (正面五灸):</strong>
              <ul>
                <li><em>Ren Mai Balance-Moxibustion:</em> Reguliert das Yin-Gefäß, harmonisiert Qi und Blut.</li>
                <li><em>Zhongwan Magen-Milz-Moxibustion:</em> Stärkt die Verdauung, leitet Feuchtigkeit aus.</li>
                <li><em>Shenque Darm-Moxibustion:</em> Beseitigt Hitze-Feuchtigkeit im Darmbereich.</li>
                <li><em>Guanyuan Becken-Moxibustion:</em> Stärkt das Nieren-Yang und wärmt die Gebärmutter.</li>
                <li><em>Knie-Kälte-Moxibustion:</em> Vertreibt rheumatische Kälte und lindert Gelenkschmerz.</li>
              </ul>
            </li>
            <li><strong>Körperrückseite (背面五灸):</strong>
              <ul>
                <li><em>Nacken-Schulter-Moxibustion:</em> Löst Wind-Kälte-Blockaden, hemmt Schmerzen.</li>
                <li><em>Herz-Lungen-Moxibustion:</em> Unterstützt die Lungenbelüftung und beruhigt den Geist (Shen).</li>
                <li><em>Lenden-Nieren-Moxibustion:</em> Stärkt die Nierenessenz und festigt den unteren Rücken.</li>
                <li><em>Sacral Ba Liao Moxibustion (八髎):</em> Reguliert Menstruationsbeschwerden und fördert Beckendurchblutung.</li>
                <li><em>Du Mai Lebensenergie-Moxibustion:</em> Stärkt die Lebenskraft und das fundamentale Yang.</li>
              </ul>
            </li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Technologische Innovation (TMT-JY-68 & JD-3030)</h4>
          <p>Die Behandlung erfolgt mittels unseres patentierten <strong>TMT-JY-68 Schwebearm-Moxibustionsgeräts</strong>:</p>
          <ul class="feature-list">
            <li><strong>Freischwebender Positionierungsarm:</strong> Hält die Applikatoren absolut stabil und berührungslos über dem Körper, um Verbrennungen auszuschließen.</li>
            <li><strong>Dreifach-Kopf-Koppelung (JD-3030):</strong> Ermöglicht die simultane großflächige Erwärmung (jeder Kopf deckt 144 cm² ab).</li>
            <li><strong>Integrierter Rauchfilter:</strong> Ein spezieller Drei-Stufen-Filter saugt Rauch und Gerüche direkt am Entstehungsort ab und filtert sie. So bleibt der Raum rauchfrei, während das Heilkraut seine volle Duftwirkung entfaltet.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Technische Parameter</h4>
          <table class="tech-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem;">
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Medizinische Registrierung</td><td style="padding: 0.5rem;">湘械注准20222200971 (TMT-JY-68) / 湘械注准20222200970 (JD-3030)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Behandlungstemperatur</td><td style="padding: 0.5rem;">40 °C bis &lt; 70 °C (stufenlos regulierbar)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Heizfläche (einzeln)</td><td style="padding: 0.5rem;">144 cm²</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Brennzeit (Moxa)</td><td style="padding: 0.5rem;">&ge; 30 Minuten pro Moxa-Kartusche (&Phi; 80mm * 20mm)</td></tr>
          </table>
        </div>
      `
    },
    en: {
      title: "Herbal Thermal Moxibustion (Large-Scale Spine Moxibustion – Pu Jiu)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead">The <strong>Herbal Thermal Moxibustion (Large-Scale Spine Moxibustion – Pu Jiu)</strong> is a powerful therapeutic fusion of classical Chinese warming therapy (铺灸 - Pu Jiu) and modern medical smoke filtration systems. By applying dry mugwort (moxa) wool over a layer of fresh ginger (隔姜灸) and customized TCM herbal pastes (隔药灸), it channels deep thermal energy into the body to disperse chronic constitutional cold and stagnation.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Mechanism: The Power of Du Mai</h4>
          <p>The Governor Vessel (Du Mai) runs along the midline of the back and is considered the "Sea of Yang Meridians." The thermal energy from burning moxa, enriched by the volatile oils of ginger and selected herbs, penetrates deep through the dermal, fat, and myofascial layers to reach bones and inner organs ("穿经透骨"). This stimulation fortifies Kidney Yang, activates defensive energy (Wei Qi), and triggers systemic immune regulation.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Indications & Efficacy</h4>
          <p>This treatment is highly effective for conditions associated with cold, stagnation, or Qi deficiency:</p>
          <ul class="feature-list">
            <li><strong>Cold Womb & Dysmenorrhea:</strong> Resolves pelvic blood stasis (血瘀), provides direct heat to the uterus, and reduces chronic menstrual cramps.</li>
            <li><strong>Cold waist & Knees:</strong> Dispels Wind-Cold-Dampness from the joints, relieving pain associated with arthritic stiffness and skeletal wear.</li>
            <li><strong>Gynecological Inflammation:</strong> Modulates immune markers to reduce chronic inflammation of the reproductive tract.</li>
            <li><strong>Spinal & Musculoskeletal Diseases:</strong> Relaxes paraspinal musculature and targets degenerative disk pain.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">10 Targeted Moxibustion Protocols</h4>
          <p>We perform ten specialized protocols based on the patient's pathology:</p>
          <ul class="feature-list">
            <li><strong>Frontal Applications (正面五灸):</strong>
              <ul>
                <li><em>Ren Mai Balance:</em> Regulates the Yin pathways, balancing Qi and Blood flow.</li>
                <li><em>Zhongwan Spleen-Stomach:</em> Strengthens digestion and expels metabolic dampness.</li>
                <li><em>Shenque Intestinal:</em> Relieves damp-heat in the gut, supporting microbiome balance.</li>
                <li><em>Guanyuan Pelvis:</em> Warms the pelvic cavity and nourishes core essence.</li>
                <li><em>Knee Cold-Dispelling:</em> Restores joint flexibility by expelling cold wind.</li>
              </ul>
            </li>
            <li><strong>Dorsal Applications (背面五灸):</strong>
              <ul>
                <li><em>Neck-Shoulder:</em> Disperses cold blockages, easing tension and myofascial stiffness.</li>
                <li><em>Heart-Lung:</em> Regulates chest Qi, soothing respiration and calming the mind (Shen).</li>
                <li><em>Lumbar-Kidney:</em> Warms Kidney Yang, strengthening the lower back.</li>
                <li><em>Sacral Ba Liao (八髎):</em> Stimulates uterine blood supply and regulates menstrual rhythm.</li>
                <li><em>Du Mai Yuan Qi:</em> Invigorates the body's primary Yang energy and vitality.</li>
              </ul>
            </li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Advanced Technology (TMT-JY-68 & JD-3030)</h4>
          <p>The therapy is delivered via our patented <strong>TMT-JY-68 Self-Suspending Moxibustion Workstation</strong>:</p>
          <ul class="feature-list">
            <li><strong>Zero-Gravity Positioning Arm:</strong> Securely positions the treatment heads at an optimal, non-contact distance, completely preventing skin burns.</li>
            <li><strong>Triple-Box Array (JD-3030):</strong> Connects up to three treatment boxes, covering a massive surface area (144 cm² per box) for deep metabolic warming.</li>
            <li><strong>Self-Purifying Smoke Extraction:</strong> Built-in multi-stage filtration captures and filters smoke and odors at the source, keeping the treatment room fresh while preserving the herbal aroma of moxa.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Technical Parameters</h4>
          <table class="tech-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem;">
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">FDA Registration</td><td style="padding: 0.5rem;">湘械注准20222200971 (TMT-JY-68) / 湘械注准20222200970 (JD-3030)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Treatment Temperature</td><td style="padding: 0.5rem;">40 °C to &lt; 70 °C (adjustable)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Heating Area</td><td style="padding: 0.5rem;">144 cm² per unit</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Moxa Cartridge Size</td><td style="padding: 0.5rem;">&Phi; 80mm * 20mm (burning time &ge; 30 min)</td></tr>
          </table>
        </div>
      `
    }
  },
  spectrumcabin: {
    de: {
      title: "Thermo-Stoffwechselkabine (TMT-RLC-2200)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead">Die <strong>Thermo-Stoffwechselkabine (Modell TMT-RLC-2200)</strong> ist ein fortschrittliches System zur Ganzkörper-Frequenz- und Wärmetherapie. Im Gegensatz zu herkömmlichen Infrarotsaunen kombiniert dieses geschlossene Spektralsystem drei biophysikalische Heilfaktoren: Farbinfrarot-Spektralstrahlung, kontrollierte Sauerstoffanreicherung und oxidative negative Ionen, um eine tiefgreifende Entgiftung auf zellulärer Ebene anzuregen.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Die drei Säulen der Spektralheilung</h4>
          <p>Die Kabine baut ein synergetisches Milieu auf, das die Mikrozirkulation und die zelluläre Entgiftung optimiert:</p>
          <ul class="feature-list">
            <li><strong>Farbinfrarot-Spektralenergie (4&mu;m - 20&mu;m):</strong> Diese Wellenlängen sind exakt auf das Schwingungsspektrum der menschlichen Körperzellen abgestimmt. Sie regen Wassermoleküle im Gewebe zur Resonanzschwingung an, was zu einer tiefen, gleichmäßigen Gewebeaufheizung führt. Dies steigert den lokalen Blutfluss um 114 % und erleichtert den Zellstoffwechsel.</li>
            <li><strong>Sauerstoffangereichertes Milieu (O₂):</strong> Erhöht die Sauerstoffsättigung im Blut und unterstützt die mitochondriale Zellatmung. Dies steigert die Herz-Lungen-Toleranz und fördert die systemische Regeneration.</li>
            <li><strong>Negativ-Ionen-Atmosphäre:</strong> Wirkt als starkes Antioxidans, das freie Radikale im Gewebe neutralisiert, oxidativen Stress reduziert und die zelluläre Selbstheilungsrate maximiert.</li>
          </ul>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Anwendungen & Studienergebnisse ( E-Mail & WhatsApp Vorgaben )</h4>
          <p>Die Kabine wird erfolgreich in folgenden therapeutischen Bereichen eingesetzt:</p>
          <ul class="feature-list">
            <li><strong>Sportliche Höchstleistung & Regeneration:</strong> Wird von <strong>olympischen Athleten</strong> in nationalen Trainingszentren (wie den Winterolympiade-Forschungszentren) genutzt, um Laktat rasch abzubauen, Muskelermüdung zu reduzieren und Sportverletzungen vorzubeugen.</li>
            <li><strong>Fortpflanzungsgesundheit & Gynäkologie:</strong> Studien zeigen, dass Ganzkörperwärme (40-42 °C) die Hypothalamus-Hypophysen-Ovarial-Achse (HPO-Achse) anregt, die Follikelreifung unterstützt und hormonelle Schwankungen harmonisiert.李海霞-Professorin an der China Academy of Chinese Medical Sciences wies nach, dass thermischer Stress das zellschützende Hitzeschockprotein HSP70 um das 3,2-fache erhöht, was Keimzellen vor oxidativem Stress schützt. Dies liefert die biochemische Grundlage für die TCM-Formel „Nieren-Yang = Thermische Energie“.</li>
            <li><strong>Regulierung chronischer Krankheiten:</strong> Zur Behandlung von Fibromyalgie (FM), degenerativer Arthritis und Stoffwechselstörungen. Eine 4-wöchige Studie (veröffentlicht im X-MOL Journal 2025) zeigte eine statistisch signifikante Linderung von Fibromyalgie-Schmerzen, die auf eine Abnahme von HSP90 und Zunahme von HSP40 zurückzuführen war.</li>
            <li><strong>Gewichtsmanagement & Fettabbau:</strong> Eine bahnbrechende Arbeit in der Fachzeitschrift <em>Cell</em> (2022) belegte, dass lokale Hyperthermie über die HSF1-A2B1-Achse die Umwandlung von weißem in beiges Fett (米色脂肪褐变) anregt, was Übergewicht, Insulinresistenz und Fettleber wirksam entgegenwirkt.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Weitere medizinische Studien</h4>
          <p>Japanische Forscher der Universität Okayama (2010) zeigten, dass eine tägliche 30-minütige Infrarot-Wärmetherapie bei Typ-2-Diabetikern nach nur zwei Wochen die Insulinsensitivität um 32 % steigerte und den Nüchternblutzucker um 18 % senkte. Zudem zeigte eine finnische Kohortenstudie, dass regelmäßige Wärmeanwendungen (4-7 Mal pro Woche) die Gefäßelastizität verbessern und den Blutfluss bei erektiler Dysfunktion (ED) sowie Prostatitis signifikant erhöhen.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Technische Parameter (TMT-RLC-2200)</h4>
          <table class="tech-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem;">
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Medizinprodukt-Klasse</td><td style="padding: 0.5rem;">Klasse II (Reg.湘械注准20242090670)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Temperaturbereich</td><td style="padding: 0.5rem;">35 °C bis 45 °C (kontrolliert)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Wellenlänge (Infrarot)</td><td style="padding: 0.5rem;">4 &mu;m bis 20 &mu;m (Ferninfrarot)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Sicherheitsschutz</td><td style="padding: 0.5rem;">Graphitfaser-Abschirmung gegen Hautberührung, Übertemperatur-Abschaltung bei &gt;10% Sollwert</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Abmessungen</td><td style="padding: 0.5rem;">1090 mm &times; 820 mm &times; 1960 mm</td></tr>
          </table>
        </div>
      `
    },
    en: {
      title: "Thermal Metabolic Cabin (TMT-RLC-2200)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead">The <strong>Thermal Metabolic Cabin (Model TMT-RLC-2200)</strong> is an advanced medical-grade system for whole-body spectrum and hyperthermic therapy. Unlike conventional infrared saunas, this enclosed bio-chamber integrates far-infrared spectrum radiation, controlled oxygen enrichment, and negative air ions to trigger systemic cellular detoxification, metabolic restoration, and deep nervous system recovery.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">The Three Pillars of Bio-Resonant Healing</h4>
          <p>The cabin establishes a synergetic environment designed to optimize cell function:</p>
          <ul class="feature-list">
            <li><strong>Far-Infrared Spectrum Energy (4&mu;m - 20&mu;m):</strong> Tuned precisely to the natural vibrational frequency of human cells. This causes intracellular water molecules to vibrate, heating tissue deeply and evenly. This process increases microvascular blood flow by 114%, promoting nutrient delivery and cellular waste clearance.</li>
            <li><strong>Oxygen-Enriched Environment (O₂):</strong> Increases hemoglobin oxygen binding capacity, raising peripheral oxygen saturation. This supports mitochondrial cellular respiration, increases cardiopulmonary tolerance, and fuels metabolic recovery.</li>
            <li><strong>Negative Ion Space:</strong> Serves as a systemic antioxidant that neutralizes free radicals, reduces cellular oxidative stress, and boosts tissue self-repair mechanisms.</li>
          </ul>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Applications & Research Efficacy</h4>
          <p>The Metabolic Cabin is utilized across several main medical areas:</p>
          <ul class="feature-list">
            <li><strong>Athletic Performance & Recovery:</strong> Actively utilized by <strong>olympic athletes</strong> in elite winter sports training bases. It accelerates lactate clearance, reduces post-exercise muscle soreness, and protects against overuse injuries.</li>
            <li><strong>Reproductive Health & Gynecology:</strong> Studies show that moderate hyperthermia (40-42°C) stimulates the hypothalamic-pituitary-ovarian (HPO) axis, supporting follicular maturation and ovarian hormone balance. Professor Li Haixia's team (China Academy of Chinese Medical Sciences) demonstrated that heat stress increases the expression of protective Hsp70 by 3.2 times, safeguarding germ cells from oxidative damage. This provides a biochemical basis for the classical TCM model equating Kidney Yang with metabolic thermal energy.</li>
            <li><strong>Chronic Disease Conditioning:</strong> Indicated for fibromyalgia, joint arthritis, and metabolic syndrome. A study in the journal <em>X-MOL</em> (2025) verified that a 4-week hyperthermia course significantly lowered fibromyalgia pain scores by regulating heat shock proteins (decreasing Hsp90 and increasing Hsp40 and Hsc70).</li>
            <li><strong>Obesity & Weight Management:</strong> A landmark study published in <em>Cell</em> (2022) proved that local hyperthermia induces the browning of white adipose tissue via the HSF1-A2B1 transcription axis, effectively treating obesity, insulin resistance, and hepatic lipid accumulation.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Further Supporting Evidence</h4>
          <p>Clinical studies at Okayama University (2010) showed that daily 30-minute far-infrared therapy improved insulin sensitivity by 32% and lowered fasting blood glucose by 18% in type 2 diabetes patients within two weeks. Additionally, a large cohort study in Finland demonstrated that regular sauna therapy (4-7 times/week) improves vascular endothelial function, lowering blood viscosity and relieving peripheral vascular disorders like prostatitis and erectile dysfunction.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Technical Parameters</h4>
          <table class="tech-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem;">
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Medical Device Registration</td><td style="padding: 0.5rem;">Class II (湘械注准20242090670)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Temperature Range</td><td style="padding: 0.5rem;">35 °C to 45 °C</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Wavelength (Infrared)</td><td style="padding: 0.5rem;">4 &mu;m to 20 &mu;m</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Safety Isolation</td><td style="padding: 0.5rem;">Graphite fiber guard plates (preventing skin contact), automatic cut-off if temperature exceeds setpoint by 10%</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Dimensions</td><td style="padding: 0.5rem;">1090 mm &times; 820 mm &times; 1960 mm</td></tr>
          </table>
        </div>
      `
    }
  },
  spectrumradiator: {
    de: {
      title: "Mikro-Photonen-Moxibustion (Lokalisiertes Spektral-Bestrahlungsgerät)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead">Die <strong>Mikro-Photonen-Moxibustion (Modell TMT-WIRA-500A)</strong> ist ein hochentwickeltes medizinisches Lichttherapiesystem zur gezielten, berührungslosen Schmerzlinderung und Entzündungshemmung. Durch die patentierte Kombination eines Hochleistungs-Halogenleuchtmittels mit einem Festkörper-Filtersystem strahlt das Gerät ein biologisch hochwirksames Spektrum von 560 nm bis 1400 nm aus, das 7 bis 10 cm tief in das Gewebe eindringt.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Das Wirkprinzip der drei Spektralbänder</h4>
          <p>Das breite Spektrum teilt sich in drei therapeutisch wirksame Frequenzbänder auf:</p>
          <ul class="feature-list">
            <li><strong>Tiefen-Entzündungshemmung (760 nm - 1400 nm):</strong> Dieser nahinfrarote Bereich dringt tief in Gewebe, Gelenke und Knorpel ein. Er fördert die Synthese von Albumin und Immunglobulinen, verbessert die Phagozytose (Zellreinigung) der Makrophagen und senkt die Konzentration entzündungsfördernder Zytokine. Dies führt zu einer intensiven, tiefenwirksamen Entzündungshemmung.</li>
            <li><strong>Fokussierte Schmerzlinderung (810 nm):</strong> Dieser spezifische Wellenbereich hemmt die Ausschüttung von Serotonin (5-HT) im Gewebe und dämpft die überschießende Aktivität des sympathischen Nervensystems, was zu einer schnellen, spürbaren Schmerzlinderung führt.</li>
            <li><strong>Zelluläre Regeneration (620 nm - 650 nm):</strong> Rotes sichtbares Licht stimuliert die mitochondriale Atmungskette und beschleunigt die Bildung und den Abbau von ATP. Dies regt den Zellstoffwechsel an, stimuliert die Gewebeneubildung (Granulation) und beschleunigt die Heilung von Wunden und Narben.</li>
          </ul>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Anwendungen & Schwerpunkte</h4>
          <p>Die Mikro-Photonen-Moxibustion ist klinisch erprobt bei folgenden Beschwerden:</p>
          <ul class="feature-list">
            <li><strong>Entzündungshemmung & Schmerzlinderung:</strong> Schnelle Linderung bei myofaszialen Schmerzsyndromen, Verspannungen im Bereich der Hals- und Lendenwirbelsäule sowie bei chronischen Kopfschmerzen.</li>
            <li><strong>Gelenkschmerzen & Arthritis:</strong> Studien (z. B. im <em>International Journal of Molecular Sciences</em> 2022) zeigen, dass diese Strahlung die Entzündungspfade hemmt und Entzündungsfaktoren wie TNF-&alpha; und IL-6 um über 50 % senkt, was arthritische Gelenkschwellungen lindert.</li>
            <li><strong>Hautregeneration & Wundheilung:</strong> Beschleunigt den Wundverschluss nach Operationen oder bei Verbrennungen (post burn skin repair) und regt das kosmetische Erscheinungsbild der Haut durch Kollagenaktivierung an.</li>
            <li><strong>Sportverletzungen:</strong> Zur Regeneration bei Zerrungen, Sehnenentzündungen (wie Tennisarm) und stumpfen Traumata.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Integration mit Akupunktur</h4>
          <p>In unserer klinischen Praxis kombinieren wir dieses System häufig mit der klassischen Akupunktur. Die Infrarotfrequenzen wärmen die gesetzten Nadeln auf und leiten die Energie über den Nadelkörper tief in die Akupunkturpunkte (Ashi-Punkte), wodurch die therapeutische Wirkung der Nadelung um ein Vielfaches verstärkt wird.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Ergonomie & Sicherheit</h4>
          <p>Das System verfügt über einen dreidimensionalen, schwebend gelagerten Gelenkarm (自悬式机械臂) zur präzisen Ausrichtung über der Liege. Ein integrierter 26-cm-Abstandsbolzen garantiert stets den optimalen Abstand zur Haut. Bei Neigung oder versehentlichem Umstoßen schaltet ein Neigungssensor die Stromzufuhr sofort ab.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Technische Parameter</h4>
          <table class="tech-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem;">
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Medizinische Registrierung</td><td style="padding: 0.5rem;">湘械注准20232090107 (TMT-WIRA-500A)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Wellenlängenbereich</td><td style="padding: 0.5rem;">560 nm bis 1400 nm</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Bestrahlungs-Intensität</td><td style="padding: 0.5rem;">480 mW/cm² (bei 16 cm Abstand) / 230 mW/cm² (bei 26 cm Abstand)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Leistungsaufnahme</td><td style="padding: 0.5rem;">600 W</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Gewicht / Mechanik</td><td style="padding: 0.5rem;">50 kg, Stativ mit lenkbaren Rollen und Schwebearm (30 - 150 cm Hubhöhe)</td></tr>
          </table>
        </div>
      `
    },
    en: {
      title: "Micro-Photon Moxibustion (Localized Spectrum Radiator)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead">The <strong>Micro-Photon Moxibustion (Model TMT-WIRA-500A)</strong> is an advanced medical-grade deep spectrum therapy system. Using a high-output iodine-halogen light source coupled with a patented solid-state filtering system, it delivers a broad, therapeutic light spectrum (560 nm to 1400 nm) that penetrates subcutaneous tissue up to 7 to 10 cm deep to alleviate pain, reduce inflammation, and accelerate cellular recovery.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Biophysical Mechanism of the Three Spectral Bands</h4>
          <p>The emitted spectrum targets tissues via three distinct biophysical pathways:</p>
          <ul class="feature-list">
            <li><strong>Deep Anti-Inflammatory (760 nm - 1400 nm):</strong> This near-infrared band penetrates joints, fascia, and cartilage. It enhances the synthesis of albumin and immunoglobulins, stimulates macrophage phagocytosis, and suppresses inflammatory cytokines (such as TNF-&alpha; and IL-6), leading to deep tissue recovery.</li>
            <li><strong>Targeted Analgesia (810 nm):</strong> Specifically lowers local serotonin (5-HT) levels and suppresses sympathetic nerve over-excitation, providing rapid, non-invasive pain relief.</li>
            <li><strong>Cellular Regeneration (620 nm - 650 nm):</strong> Red visible wavelengths enhance mitochondrial oxygenation, accelerating the synthesis and decomposition of ATP. This activates cellular metabolism, promotes granulation tissue growth, and shortens wound and scar recovery cycles.</li>
          </ul>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Applications & Target Pathologies</h4>
          <p>The Micro-Photon Moxibustion system is highly effective for:</p>
          <ul class="feature-list">
            <li><strong>Anti-Inflammatory & Pain Relief:</strong> Rapidly treats acute myofascial strains, tension headaches, and localized spasms of the neck and back.</li>
            <li><strong>Joint Pain & Arthritis:</strong> Clinical studies (including reports in the <em>International Journal of Molecular Sciences</em> 2022) prove that WIRA spectrum therapy reduces arthritic joint inflammation and downregulates inflammatory markers by over 50%.</li>
            <li><strong>Post-Burn & Surgical Wound Healing:</strong> Speeds up tissue granulation and epidermal remodeling in post-burn skin repair and post-operative surgical incisions.</li>
            <li><strong>Cosmetic & Dermatological Treatments:</strong> Stimulates dermal collagen production, helping clear chronic skin inflammation and improve scar tissue.</li>
            <li><strong>Sports Injuries:</strong> Accelerates healing in muscle tears, tendonitis, ligament sprains, and joint contusions.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Synergy with Acupuncture</h4>
          <p>In our clinic, we frequently combine this radiator with traditional acupuncture. The spectrum warms the needles, directing kinetic thermal energy deep into the points (Ashi points) to amplify the therapeutic benefits of the needle stimulation.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Ergonomic Positioning & Safety Features</h4>
          <p>Features a patented self-suspending mechanical arm (Hubway 30cm-150cm) and a 3D rotating head to target any area of the body while the patient is comfortably lying down. A built-in 26 cm distance rod ensures safe application, and an automatic tilt-sensor cuts off power if the unit is knocked over.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Technical Parameters</h4>
          <table class="tech-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem;">
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Medical Registration</td><td style="padding: 0.5rem;">湘械注准20232090107 (TMT-WIRA-500A)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Wavelength Range</td><td style="padding: 0.5rem;">560 nm to 1400 nm</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Optical Power Density</td><td style="padding: 0.5rem;">480 mW/cm² (at 16 cm) / 230 mW/cm² (at 26 cm)</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Power Consumption</td><td style="padding: 0.5rem;">600 W</td></tr>
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 0.5rem; font-weight: 600;">Weight / Mechanics</td><td style="padding: 0.5rem;">50 kg, mobile stand with locking casters and articulating mechanical arm</td></tr>
          </table>
        </div>
      `
    }
  },
  yunnan_retreat: {
    de: {
      title: "6-tägige Yunnan Tee-, Pilz- und Kräuter-Kulturreise mit den Minderheitenvölkern",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead"><strong>Diese Reise ist eine intensive Natur-, Heil- und Kulturerfahrung in den Bergen Yunnans.</strong> Sie verbindet die Weisheit des Daoismus, Traditionelle Chinesische Medizin (TCM), Heilpilze, alte Teekulturen und das Leben der lokalen Minderheitenvölker (vor allem der Hani) zu einer tiefen Regenerations- und Selbsterfahrungsreise.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Die Grundidee</h4>
          <p>Im Zentrum steht die Wiedererweckung der „Lebenskraft“ (生命原力) – jener natürlichen Energie, die laut daoistischer und chinesischer Medizin Gesundheit, Kreativität, Vitalität und innere Klarheit nährt.</p>
          <p>Die Reise folgt einem dreistufigen Transformationsprozess:</p>
          <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li><strong>1. Jing (Essenz) – Fundament schaffen:</strong> Körperliche Regeneration, Aufbau von Energie und Ressourcen, Ernährung, Heilkräuter und Heilpilze.</li>
            <li><strong>2. Qi (Lebensenergie) – Aktivieren und Verwandeln:</strong> Atemarbeit, Daoistische Übungen, Bewegung und Energiearbeit, Öffnung und Harmonisierung der Meridiane.</li>
            <li><strong>3. Shen (Geist) – Verfeinerung und Bewusstsein:</strong> Meditation, Klangheilung, Innere Klarheit und emotionale Balance, Verbindung mit dem eigenen Wesenskern.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Begleitung durch Experten</h4>
          <p>Während der gesamten Reise begleiten die Gruppe:</p>
          <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li>Ein renommierter TCM-Meister für Puls- und Zungendiagnose</li>
            <li>Ein TCM-Arzt und Gesundheitscoach</li>
            <li>Ein international zertifizierter Klangtherapeut</li>
            <li>Lokale Pilzexperten der Hani-Minderheit</li>
            <li>Teebauern und Kräuterkundige aus den Bergen Yunnans</li>
          </ul>
          <p>Jeder Teilnehmer erhält eine individuelle TCM-Diagnose mit persönlichen Empfehlungen zu Kräutern, Ernährung und Lebensstil.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Was die Teilnehmer erleben</h4>
          
          <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">Ankommen & Nervensystem regulieren</h5>
          <p>Die Reise beginnt mit einer feierlichen Eröffnungszeremonie, Atemarbeit, Klangheilung, gemeinsamer Resonanzarbeit, einer Blauen-Lotus-Teezeremonie und Intention Setting. Ziel ist es, das Nervensystem aus dem Stressmodus in den Regenerationsmodus zu bringen.</p>

          <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">Alte Teewälder & Heilpilze entdecken</h5>
          <p>Ein Höhepunkt ist die Wanderung durch die uralten Teewälder des Nan Nuo Shan, einem der ältesten Pu-Erh-Tee-Gebiete Yunnans. Dort erleben die Teilnehmer bis zu 800 Jahre alte Teebäume, wild wachsende Heilkräuter, traditionelle Kräuterkunde und Heilpilzsuche mit Hani-Guides. Gesammelt und erklärt werden unter anderem: <strong>Reishi (Lingzhi), Poria (Fu Ling), Roter Heilpilz (Da Hong Jun), Puffball-Pilze (Ma Bo), Dendrobium, Polygonatum, Angelika-Wurzel</strong> und weitere Bergkräuter. Die Teilnehmer lernen nicht nur ihre Wirkung kennen, sondern legen eigene Heilpilz- und Kräuterkarten an.</p>

          <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">Leben mit den Ethnien Yunnans</h5>
          <p>Ein besonderer Aspekt der Reise ist der direkte Kontakt mit den lokalen Ethnien Yunnans. Die Teilnehmer erfahren traditionelle Pilzsammlung, Teeherstellung, lokale Heilmethoden, traditionelle Ernährung und die spirituelle Naturverbundenheit der Bergvölker. Dadurch entsteht ein authentischer Einblick in eine Lebensweise, die seit Jahrhunderten eng mit Wald, Bergen und den Jahreszeiten verbunden ist.</p>

          <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">Daoistische Praxis & Lebenspflege</h5>
          <p>Täglich finden Qi Gong, daoistische Atemtechniken, Meditation, Körperwahrnehmungsübungen, Energiearbeit und Übungen zur Hormon- und Emotionsregulation statt. Diese Praktiken sollen Stress reduzieren, den Vagusnerv aktivieren, die Schlafqualität verbessern, das Hormonsystem harmonisieren und die Selbstheilungskräfte stärken.</p>

          <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">Klangheilung & innere Transformation</h5>
          <p>Ein weiterer Schwerpunkt sind tiefe Klang- und Frequenzreisen: Stimmarbeit, Mantra-Meditation, Heilfrequenzen, Trance- und Hypnoseelemente sowie „Tree of Life“-Klangreisen. Die Arbeit mit Klang soll Herzrhythmus, Atmung und Gehirnwellen synchronisieren und tiefe Entspannung ermöglichen.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Für wen die Reise gedacht ist</h4>
          <p>Ideal für Menschen, die unter chronischem Stress stehen, Erschöpfung oder Burnout vorbeugen möchten, ihre Gesundheit ganzheitlich stärken wollen, sich für TCM, Heilpilze und Teekultur interessieren, eine tiefere Verbindung zur Natur suchen oder daoistische Lebenskunst erleben möchten.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Essenz der Reise</h4>
          <p>Diese Reise ist weit mehr als ein Retreat. Sie ist eine Begegnung mit den uralten Teewäldern Yunnans, den Heilpilzen des Bergwaldes, dem Wissen der Minderheitenvölker und den daoistischen Wegen zur Kultivierung von Körper, Energie und Geist.</p>
          <p>Man lernt nicht nur über Tee, Pilze und Kräuter – man erlebt unmittelbar, wie Natur, traditionelle Heilkunst und innere Praxis zusammenwirken können, um Vitalität, Ruhe und Lebensfreude neu zu entdecken.</p>
        </div>
      `
    },
    en: {
      title: "6-Day Yunnan Tea, Mushroom & Herb Culture Journey with Ethnic Minorities",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead"><strong>This journey is an intensive nature, healing, and cultural experience in the mountains of Yunnan.</strong> It connects the wisdom of Taoism, Traditional Chinese Medicine (TCM), medicinal mushrooms, ancient tea cultures, and the life of local minority groups (primarily the Hani) into a deep path of regeneration and self-discovery.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">The Core Idea</h4>
          <p>At the center lies the reawakening of the \"Life Force\" (生命原力) – that natural energy which, according to Taoist and Chinese medicine, nourishes health, creativity, vitality, and inner clarity.</p>
          <p>The journey follows a three-stage transformation process:</p>
          <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li><strong>1. Jing (Essence) – Creating the Foundation:</strong> Physical regeneration, building energy and resources, nutrition, medicinal herbs, and healing mushrooms.</li>
            <li><strong>2. Qi (Life Energy) – Activating & Transforming:</strong> Breathwork, Taoist practices, movement and energy work, opening and harmonizing the meridians.</li>
            <li><strong>3. Shen (Spirit) – Refinement & Awareness:</strong> Meditation, sound healing, inner clarity and emotional balance, connection with one's inner core.</li>
          </ul>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Expert Guidance</h4>
          <p>During the entire trip, the group is accompanied by:</p>
          <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li>A renowned TCM Master for pulse and tongue diagnosis</li>
            <li>A TCM Physician and health coach</li>
            <li>An internationally certified Sound Therapist</li>
            <li>Local mushroom experts from the Hani minority</li>
            <li>Tea farmers and herbalists from the mountains of Yunnan</li>
          </ul>
          <p>Every participant receives an individual TCM diagnosis with personalized recommendations for herbs, nutrition, and lifestyle.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">What Participants Experience</h4>
          
          <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">Arriving & Regulating the Nervous System</h5>
          <p>The journey begins with a festive opening ceremony, breathwork, sound healing, group resonance work, a Blue Lotus tea ceremony, and intention setting. The goal is to shift the nervous system from stress mode into regeneration mode.</p>

          <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">Discovering Ancient Tea Forests & Medicinal Mushrooms</h5>
          <p>A highlight is the trek through the ancient tea forests of Nan Nuo Shan, one of Yunnan's oldest Pu-erh tea regions. There, participants encounter tea trees up to 800 years old, wild medicinal herbs, traditional herbal lore, and medicinal mushroom hunting with Hani guides. Mushrooms and herbs collected and explained include: <strong>Reishi (Lingzhi), Poria (Fu Ling), Red Wild Mushroom (Da Hong Jun), Puffball Mushrooms (Ma Bo), Dendrobium, Polygonatum, Angelica Root</strong>, and other mountain herbs. Participants not only learn about their therapeutic benefits but also create their own medicinal mushroom and herb identification cards.</p>

          <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">Living with the Yunnan Minority Tribes</h5>
          <p>A unique aspect of this journey is direct contact with local ethnic communities. Participants learn traditional mushroom harvesting, tea processing, local healing practices, traditional diets, and the deep spiritual nature-connectedness of the mountain peoples. This offers an authentic glimpse into a way of life that has been intimately connected to the forest, mountains, and seasons for centuries.</p>

          <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">Taoist Practice & Nourishing Life (Yang Sheng)</h5>
          <p>Daily sessions include Qi Gong, Taoist breathing techniques, meditation, body awareness exercises, energy work, and techniques for hormonal and emotional regulation. These practices are designed to reduce stress, activate the vagus nerve, improve sleep quality, harmonize the endocrine system, and stimulate self-healing capacities.</p>

          <h5 style="font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.4rem; color: var(--terracotta);">Sound Healing & Inner Transformation</h5>
          <p>Another focal area consists of deep sound and frequency journeys: vocal work, mantra meditation, healing frequencies, elements of trance and hypnosis, and "Tree of Life" sound journeys. The work with sound is intended to synchronize heart rate, breathing, and brain waves, facilitating profound relaxation.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Who This Journey is For</h4>
          <p>Ideal for individuals who are under chronic stress, wish to prevent fatigue or burnout, want to strengthen their health holistically, are interested in TCM, medicinal mushrooms, and tea culture, seek a deeper connection to nature, or wish to experience Taoist lifestyle arts.</p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Essence of the Journey</h4>
          <p>This journey is far more than a retreat. It is an encounter with the ancient tea forests of Yunnan, the medicinal mushrooms of the mountain woods, the wisdom of minority peoples, and the Taoist paths for cultivating body, energy, and mind.</p>
          <p>You do not just learn about tea, mushrooms, and herbs – you experience directly how nature, traditional healing arts, and inner practice work together to re-ignite vitality, peace, and the joy of living.</p>
        </div>
      `
    }
  },
  shenzhen_tour: {
    de: {
      title: "1-tägiges klinisches TCM-Programm (Shenzhen Daily Tour)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead"><strong>Der Inbegriff integrativer Ganzheitsmedizin.</strong> Unser 1-tägiges klinisches TCM-Programm (TCM Experience Process) an der Shenzhen Hongdao-Klinik verbindet traditionelle Diagnostik, hochentwickelte physikalische Therapieverfahren und tiefe energetische Selbsterfahrung zu einem harmonisch abgestimmten, heilsamen Tagesablauf.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Der Tagesablauf im Überblick</h4>
          <div class="tcm-timeline" style="position: relative; margin: 2rem 0; padding-left: 2rem; border-left: 2px solid var(--jade-green);">
            
            <div class="timeline-item" style="position: relative; margin-bottom: 2rem;">
              <div class="timeline-badge" style="position: absolute; left: calc(-2rem - 6px); top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--terracotta); border: 2px solid white;"></div>
              <div style="font-weight: 700; color: var(--terracotta); margin-bottom: 0.3rem; font-size: 0.9rem;">10:00 - 11:30</div>
              <h5 style="margin: 0 0 0.5rem 0; font-weight: 600; font-size: 1.1rem; color: var(--text-dark);">Praxisrundgang &amp; Diagnostik / 参观诊所与诊断</h5>
              <ul style="list-style-type: none; padding-left: 0; margin: 0; color: var(--text-muted); font-size: 0.95rem; display: flex; flex-direction: column; gap: 0.4rem;">
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Klinikführung:</strong> Kennenlernen der Räumlichkeiten und der hauseigenen Kräutermanufaktur.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>HD-Infrarot-Körperscan:</strong> Thermografische Analyse zur Erkennung von Entzündungen und Blockaden.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Puls- und Zungendiagnose beim Meister:</strong> Persönliche Konsultation und Diagnose durch Professor Xu Ruqi.</li>
              </ul>
            </div>

            <div class="timeline-item" style="position: relative; margin-bottom: 2rem;">
              <div class="timeline-badge" style="position: absolute; left: calc(-2rem - 6px); top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--terracotta); border: 2px solid white;"></div>
              <div style="font-weight: 700; color: var(--terracotta); margin-bottom: 0.3rem; font-size: 0.9rem;">11:30 - 13:30</div>
              <h5 style="margin: 0 0 0.5rem 0; font-weight: 600; font-size: 1.1rem; color: var(--text-dark);">TCM-Kocherfahrung &amp; Mittagessen / 中医烹饪与药膳餐</h5>
              <ul style="list-style-type: none; padding-left: 0; margin: 0; color: var(--text-muted); font-size: 0.95rem; display: flex; flex-direction: column; gap: 0.4rem;">
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Kräuter-Kochworkshop:</strong> Einführung in die Zubereitung stärkender Suppen und Heilkräutergerichte.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Gemeinsames Kräutermenü:</strong> Schmackhafte Yao-Shan-Speisen zur gezielten inneren Stärkung und Nährstoffzufuhr.</li>
              </ul>
            </div>

            <div class="timeline-item" style="position: relative; margin-bottom: 2rem;">
              <div class="timeline-badge" style="position: absolute; left: calc(-2rem - 6px); top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--terracotta); border: 2px solid white;"></div>
              <div style="font-weight: 700; color: var(--terracotta); margin-bottom: 0.3rem; font-size: 0.9rem;">13:30 - 14:00</div>
              <h5 style="margin: 0 0 0.5rem 0; font-weight: 600; font-size: 1.1rem; color: var(--text-dark);">Ruhepause / 休息</h5>
              <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem; padding-left: 1.2rem; position: relative;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span>Zeit zur freien Verfügung und Entspannung im gemütlichen Ruhebereich der Klinik.</p>
            </div>

            <div class="timeline-item" style="position: relative; margin-bottom: 2rem;">
              <div class="timeline-badge" style="position: absolute; left: calc(-2rem - 6px); top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--terracotta); border: 2px solid white;"></div>
              <div style="font-weight: 700; color: var(--terracotta); margin-bottom: 0.3rem; font-size: 0.9rem;">14:00 - 14:45</div>
              <h5 style="margin: 0 0 0.5rem 0; font-weight: 600; font-size: 1.1rem; color: var(--text-dark);">Individuelle Therapiewahl / 治疗体验 (Wahl aus einer Option)</h5>
              <p style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.95rem; padding-left: 1.2rem;">Basierend auf Ihrer Zungen- und Pulsdiagnose wählen Sie eine der folgenden Therapien:</p>
              <ul style="list-style-type: none; padding-left: 0; margin: 0; color: var(--text-muted); font-size: 0.95rem; display: flex; flex-direction: column; gap: 0.4rem; padding-left: 1.2rem;">
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--terracotta);">→</span><strong>Akupunktur + Lichttherapie (针灸与光疗):</strong> Gezielte Nadelreizung mit photonischer Tiefenwirkung zur Entzündungshemmung.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--terracotta);">→</span><strong>Großflächen-Moxibustion (艾灸):</strong> Kräuter-Wärmetherapie mit Beifuß zur Vertreibung tiefer Kälte-Stagnationen.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--terracotta);">→</span><strong>Klassische Tuina-Massage (推拿):</strong> Manuelle Meridian- und Gewebetherapie zur Regulierung von Blockaden.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--terracotta);">→</span><strong>Bian-Hu Bioelektrizitäts-Therapie (中频砭壶):</strong> Kombination aus biologischem Strom und warmen Bian-Stein-Köpfen.</li>
              </ul>
            </div>

            <div class="timeline-item" style="position: relative; margin-bottom: 0;">
              <div class="timeline-badge" style="position: absolute; left: calc(-2rem - 6px); top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--terracotta); border: 2px solid white;"></div>
              <div style="font-weight: 700; color: var(--terracotta); margin-bottom: 0.3rem; font-size: 0.9rem;">15:00 - 16:00</div>
              <h5 style="margin: 0 0 0.5rem 0; font-weight: 600; font-size: 1.1rem; color: var(--text-dark);">Teezeremonie, Meditation &amp; Klangheilung / 茶饮、冥想与声音疗愈</h5>
              <ul style="list-style-type: none; padding-left: 0; margin: 0; color: var(--text-muted); font-size: 0.95rem; display: flex; flex-direction: column; gap: 0.4rem;">
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Teeverkostung:</strong> Auswahl hochwertiger medizinischer Kräutertees und gereiften Pu-Erh-Tees.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Klangmeditation:</strong> Entspannung und Harmonisierung durch planetare Klanggongs und nepalesische Klangschalen.</li>
              </ul>
            </div>

          </div>
          
          <h4 style="margin-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Host &amp; Begleitung</h4>
          <p>Dieses Tagesprogramm wird von <strong>Dr. Qiao Jingwen</strong> (medizinische Leitung &amp; Diagnostik) und der Heilpraktikerin <strong>Deng Nanjing</strong> (Klangtherapie, Qi Gong &amp; Übersetzung) persönlich geleitet. Durch die exklusive Eins-zu-eins-Betreuung erleben Sie traditionelle chinesische Heilkunst auf höchstem Niveau.</p>
        </div>
      `
    },
    en: {
      title: "1-Day Clinical TCM Program (Shenzhen Daily Tour)",
      body: `
        <div class="tech-detail-article">
          <p class="intro-lead"><strong>The epitome of integrative holistic medicine.</strong> Our 1-Day Clinical TCM Experience Process at the Shenzhen Hongdao Clinic combines classical diagnostics, highly advanced physical device therapies, and deep energetic sound healing into a harmoniously balanced healing program.</p>
          
          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">The Schedule at a Glance</h4>
          <div class="tcm-timeline" style="position: relative; margin: 2rem 0; padding-left: 2rem; border-left: 2px solid var(--jade-green);">
            
            <div class="timeline-item" style="position: relative; margin-bottom: 2rem;">
              <div class="timeline-badge" style="position: absolute; left: calc(-2rem - 6px); top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--terracotta); border: 2px solid white;"></div>
              <div style="font-weight: 700; color: var(--terracotta); margin-bottom: 0.3rem; font-size: 0.9rem;">10:00 AM - 11:30 AM</div>
              <h5 style="margin: 0 0 0.5rem 0; font-weight: 600; font-size: 1.1rem; color: var(--text-dark);">Clinic Tour &amp; Diagnostics / 参观诊所与诊断</h5>
              <ul style="list-style-type: none; padding-left: 0; margin: 0; color: var(--text-muted); font-size: 0.95rem; display: flex; flex-direction: column; gap: 0.4rem;">
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Clinic Tour:</strong> Introduction to the clinic spaces and the in-house pharmacy center.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Infrared Body Scan:</strong> Thermographic screening to detect deep tissues inflammation and microcirculation blocks.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Pulse &amp; Tongue Diagnosis:</strong> Face-to-face consultation and diagnostic assessment by Master Xu Ruqi.</li>
              </ul>
            </div>

            <div class="timeline-item" style="position: relative; margin-bottom: 2rem;">
              <div class="timeline-badge" style="position: absolute; left: calc(-2rem - 6px); top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--terracotta); border: 2px solid white;"></div>
              <div style="font-weight: 700; color: var(--terracotta); margin-bottom: 0.3rem; font-size: 0.9rem;">11:30 AM - 01:30 PM</div>
              <h5 style="margin: 0 0 0.5rem 0; font-weight: 600; font-size: 1.1rem; color: var(--text-dark);">TCM Cooking Experience &amp; Lunch / 中医烹饪与药膳餐</h5>
              <ul style="list-style-type: none; padding-left: 0; margin: 0; color: var(--text-muted); font-size: 0.95rem; display: flex; flex-direction: column; gap: 0.4rem;">
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Herbal Cooking:</strong> Introduction to preparing nourishing herbal soups and medicinal recipes.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Medicinal Lunch:</strong> A delicious, customized Yao Shan meal aligned with the Five Elements to nourish organ essence.</li>
              </ul>
            </div>

            <div class="timeline-item" style="position: relative; margin-bottom: 2rem;">
              <div class="timeline-badge" style="position: absolute; left: calc(-2rem - 6px); top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--terracotta); border: 2px solid white;"></div>
              <div style="font-weight: 700; color: var(--terracotta); margin-bottom: 0.3rem; font-size: 0.9rem;">01:30 PM - 02:00 PM</div>
              <h5 style="margin: 0 0 0.5rem 0; font-weight: 600; font-size: 1.1rem; color: var(--text-dark);">Break &amp; Integration / 休息</h5>
              <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem; padding-left: 1.2rem; position: relative;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span>Free time to rest and integrate in the clinic's comfortable lounge area.</p>
            </div>

            <div class="timeline-item" style="position: relative; margin-bottom: 2rem;">
              <div class="timeline-badge" style="position: absolute; left: calc(-2rem - 6px); top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--terracotta); border: 2px solid white;"></div>
              <div style="font-weight: 700; color: var(--terracotta); margin-bottom: 0.3rem; font-size: 0.9rem;">02:00 PM - 02:45 PM</div>
              <h5 style="margin: 0 0 0.5rem 0; font-weight: 600; font-size: 1.1rem; color: var(--text-dark);">Individualized Therapy Session / 治疗体验 (Choose one option)</h5>
              <p style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.95rem; padding-left: 1.2rem;">Based on your diagnosis, select one of the following customized therapies:</p>
              <ul style="list-style-type: none; padding-left: 0; margin: 0; color: var(--text-muted); font-size: 0.95rem; display: flex; flex-direction: column; gap: 0.4rem; padding-left: 1.2rem;">
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--terracotta);">→</span><strong>Acupuncture + Light Therapy (针灸与光疗):</strong> Fine needling combined with targeted red light photon irradiation.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--terracotta);">→</span><strong>Large-Scale Moxibustion (艾灸):</strong> Thermal herbal treatment using mugwort to dispel cold and dampness.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--terracotta);">→</span><strong>Classical Tuina Massage (推拿):</strong> Manual meridian therapy to regulate Qi flow and relieve musculoskeletal blocks.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--terracotta);">→</span><strong>Bian-Hu Bioelectric Therapy (中频砭壶):</strong> Synergy of medium-frequency currents and heated Bian stone tools.</li>
              </ul>
            </div>

            <div class="timeline-item" style="position: relative; margin-bottom: 0;">
              <div class="timeline-badge" style="position: absolute; left: calc(-2rem - 6px); top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--terracotta); border: 2px solid white;"></div>
              <div style="font-weight: 700; color: var(--terracotta); margin-bottom: 0.3rem; font-size: 0.9rem;">03:00 PM - 04:00 PM</div>
              <h5 style="margin: 0 0 0.5rem 0; font-weight: 600; font-size: 1.1rem; color: var(--text-dark);">Tea, Meditation &amp; Sound Healing / 茶饮、冥想与声音疗愈</h5>
              <ul style="list-style-type: none; padding-left: 0; margin: 0; color: var(--text-muted); font-size: 0.95rem; display: flex; flex-direction: column; gap: 0.4rem;">
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Tea Ceremony:</strong> Guided tasting of premium organic herbal infusions and aged medicinal Pu-Erh tea.</li>
                <li style="position: relative; padding-left: 1.2rem;"><span style="position: absolute; left: 0; color: var(--jade-green);">✓</span><strong>Sound Bath &amp; Meditation:</strong> Calming of the nervous system with Nepalese singing bowls and planetary gongs led by Deng Nanjing.</li>
              </ul>
            </div>

          </div>
          
          <h4 style="margin-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Hosts &amp; Support</h4>
          <p>This clinical daily experience is personally guided by <strong>Dr. Qiao Jingwen</strong> (medical director &amp; diagnostics) and Heilpraktikerin <strong>Deng Nanjing</strong> (sound therapist, Qi Gong &amp; translation). With high-fidelity, one-on-one attention, you will experience traditional Chinese medicine at its highest degree of quality.</p>
        </div>
      `
    }
  }
};

function openArticleModal(articleId) {
  const article = articlesContent[articleId];
  if (!article) return;
  
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'de';
  const titleEl = document.getElementById("article-modal-title");
  const bodyEl = document.getElementById("article-modal-body");
  const articleModal = document.getElementById("article-modal");
  
  if (titleEl && bodyEl && articleModal && article[lang]) {
    titleEl.innerHTML = article[lang].title;
    bodyEl.innerHTML = article[lang].body;
    articleModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeArticleModal() {
  const articleModal = document.getElementById("article-modal");
  if (articleModal) {
    articleModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Bind events on load
document.addEventListener("DOMContentLoaded", () => {
  const articleModal = document.getElementById("article-modal");
  const articleModalClose = document.getElementById("article-modal-close");
  
  if (articleModalClose) {
    articleModalClose.addEventListener("click", closeArticleModal);
  }
  
  if (articleModal) {
    articleModal.addEventListener("click", (e) => {
      if (e.target === articleModal) closeArticleModal();
    });
  }

  // Bind to buttons
  const bindArticleButtons = () => {
    document.querySelectorAll(".read-article-btn").forEach(btn => {
      // Remove any existing listener by cloning and replacing
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      
      newBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const articleId = newBtn.getAttribute("data-article");
        if (articleId) {
          openArticleModal(articleId);
        }
      });
    });
  };

  bindArticleButtons();

  // Gallery More Button Logic
  const galleryGrid = document.querySelector(".gallery-grid");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const galleryMoreBtn = document.getElementById("gallery-more-btn");

  if (galleryGrid && galleryItems.length > 0) {
    // Determine how many items fit in the first row
    let firstRowY = galleryItems[0].offsetTop;
    let itemsInFirstRow = 0;
    
    galleryItems.forEach(item => {
      // Temporarily remove hidden-item to measure correctly
      item.style.display = "block";
      if (item.offsetTop === firstRowY) {
        itemsInFirstRow++;
      }
    });

    // Hide everything that is not in the first row
    galleryItems.forEach((item, index) => {
      if (index >= itemsInFirstRow) {
        item.style.display = "none";
        item.classList.add("hidden-item");
      } else {
        item.classList.remove("hidden-item");
      }
    });

    // Handle Window Resize to Recalculate
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (galleryMoreBtn && galleryMoreBtn.style.display === "none") return; // Already expanded
        
        let newFirstRowY = galleryItems[0].offsetTop;
        let newItemsInFirstRow = 0;
        galleryItems.forEach(item => {
          item.style.display = "block"; // reset to measure
          if (item.offsetTop === newFirstRowY) newItemsInFirstRow++;
        });

        galleryItems.forEach((item, index) => {
          if (index >= newItemsInFirstRow) {
            item.style.display = "none";
            item.classList.add("hidden-item");
          } else {
            item.classList.remove("hidden-item");
          }
        });
      }, 200);
    });
  }

  if (galleryMoreBtn) {
    galleryMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const hiddenItems = Array.from(document.querySelectorAll(".gallery-item.hidden-item"));
      hiddenItems.forEach((item, index) => {
        item.style.display = "block";
        setTimeout(() => {
          item.classList.add("revealed");
        }, index * 40); // 40ms stagger delay per item
      });
      galleryMoreBtn.style.display = "none";
    });
  }


  // Watch for language changes to rebind if DOM structure changes
  const originalSetLanguage = window.setLanguage;
  if (originalSetLanguage) {
    window.setLanguage = function(lang) {
      originalSetLanguage(lang);
      // Wait a tiny bit for translation scripts to finish DOM updates
      setTimeout(bindArticleButtons, 50);
    };
  }

  // Mobile Navigation Hamburger Toggle (Global)
  const hamburger = document.getElementById('hamburger-btn');
  const sidebar = document.getElementById('sidebar');
  
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
    
    // Close menu when link is clicked
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }
});

window.openArticleModal = openArticleModal;
window.closeArticleModal = closeArticleModal;

function getFormattedStartDate(val, lang) {
  const dates = {
    "2026-08-01": { de: "1. August 2026", en: "August 1, 2026" },
    "2026-10-01": { de: "1. Oktober 2026", en: "October 1, 2026" },
    "2026-12-01": { de: "1. Dezember 2026", en: "December 1, 2026" },
    "2027-02-01": { de: "1. Februar 2027", en: "February 1, 2027" },
    "2027-04-01": { de: "1. April 2027", en: "April 1, 2027" },
    "2027-06-01": { de: "1. Juni 2027", en: "June 1, 2027" }
  };
  return dates[val] ? (lang === "de" ? dates[val].de : dates[val].en) : val;
}

function populateStartDates(lang) {
  const dates = [
    { value: "2026-08-01", de: "1. August 2026", en: "August 1, 2026" },
    { value: "2026-10-01", de: "1. Oktober 2026", en: "October 1, 2026" },
    { value: "2026-12-01", de: "1. Dezember 2026", en: "December 1, 2026" },
    { value: "2027-02-01", de: "1. Februar 2027", en: "February 1, 2027" },
    { value: "2027-04-01", de: "1. April 2027", en: "April 1, 2027" },
    { value: "2027-06-01", de: "1. Juni 2027", en: "June 1, 2027" }
  ];

  const selects = [
    document.getElementById("card-endo-start-date"),
    document.getElementById("card-1day-start-date"),
    document.getElementById("program-start-date")
  ];

  selects.forEach(select => {
    if (!select) return;
    const currentVal = select.value;
    select.innerHTML = "";
    dates.forEach(d => {
      const option = document.createElement("option");
      option.value = d.value;
      option.textContent = lang === "de" ? d.de : d.en;
      select.appendChild(option);
    });
    if (currentVal) {
      select.value = currentVal;
    }
  });
}

function initCardApplyTriggers() {
  document.querySelectorAll(".card-apply-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const programId = btn.getAttribute("data-program");
      const dateSelectId = btn.getAttribute("data-date-select");
      
      // Select the program in the form
      const programSelect = document.getElementById("consult-program");
      if (programSelect) {
        programSelect.value = programId;
        // Trigger show/hide of the start date container
        const startDateContainer = document.getElementById("program-start-date-container");
        if (startDateContainer) {
          if (programId === "endometriosis" || programId === "program1day") {
            startDateContainer.style.display = "block";
          } else {
            startDateContainer.style.display = "none";
          }
        }
      }
      
      // Copy start date
      if (dateSelectId) {
        const cardSelect = document.getElementById(dateSelectId);
        const formSelect = document.getElementById("program-start-date");
        if (cardSelect && formSelect) {
          formSelect.value = cardSelect.value;
        }
      }
      
      // Switch tab to form
      switchContactTab("form");
      
      // Scroll to contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function initStartDates() {
  const programSelect = document.getElementById("consult-program");
  const startDateContainer = document.getElementById("program-start-date-container");
  if (programSelect && startDateContainer) {
    programSelect.addEventListener("change", () => {
      const val = programSelect.value;
      if (val === "endometriosis" || val === "program1day") {
        startDateContainer.style.display = "block";
      } else {
        startDateContainer.style.display = "none";
      }
    });
  }
  
  // Populate initially
  populateStartDates(currentLang);
  
  // Initialize card apply triggers
  initCardApplyTriggers();
}
