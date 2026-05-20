(() => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const nav = document.getElementById("main-navigation");
  const toggleButton = document.querySelector(".nav-toggle");

  if (nav && toggleButton) {
    const setExpanded = (isExpanded) => {
      toggleButton.setAttribute("aria-expanded", String(isExpanded));
    };

    toggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      setExpanded(isOpen);
    });

    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("open")) {
        return;
      }
      if (toggleButton.contains(e.target) || nav.contains(e.target)) {
        return;
      }
      nav.classList.remove("open");
      setExpanded(false);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        setExpanded(false);
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 640 && nav.classList.contains("open")) {
        nav.classList.remove("open");
        setExpanded(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        setExpanded(false);
        toggleButton.focus();
      }
    });
  }

  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const formStartedAt = document.getElementById("form-started-at");
  const honeypot = document.getElementById("company-website");
  if (contactForm && formFeedback && formStartedAt) {
    const stepOne = contactForm.querySelector('[data-step="1"]');
    const stepTwo = contactForm.querySelector('[data-step="2"]');
    const nextButton = document.getElementById("contact-next");
    const backButton = document.getElementById("contact-back");

    formStartedAt.value = String(Date.now());

    const setFeedback = (message) => {
      formFeedback.innerHTML = message;
    };

    const showStep = (stepNumber) => {
      if (!stepOne || !stepTwo) {
        return;
      }
      const isStepOne = stepNumber === 1;
      stepOne.hidden = !isStepOne;
      stepTwo.hidden = isStepOne;
      stepOne.classList.toggle("is-active", isStepOne);
      stepTwo.classList.toggle("is-active", !isStepOne);
      setFeedback("");
    };

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const fullName = document.getElementById("name")?.value.trim() || "";
        const workEmail = document.getElementById("email")?.value.trim() || "";
        const company = document.getElementById("company")?.value.trim() || "";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fullName || !workEmail || !company) {
          setFeedback("Please complete name, email, and company to continue.");
          return;
        }
        if (!emailPattern.test(workEmail)) {
          setFeedback("Please enter a valid work email address.");
          return;
        }
        showStep(2);
      });
    }

    if (backButton) {
      backButton.addEventListener("click", () => {
        showStep(1);
      });
    }

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const fullName = document.getElementById("name")?.value.trim() || "";
      const workEmail = document.getElementById("email")?.value.trim() || "";
      const company = document.getElementById("company")?.value.trim() || "";
      const stack = document.getElementById("stack")?.value.trim() || "Not provided";
      const priority = document.getElementById("priority")?.value.trim() || "";

      if (!fullName || !workEmail || !company || !priority) {
        setFeedback("Please complete all required fields before sending your request.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(workEmail)) {
        setFeedback("Please enter a valid work email address.");
        return;
      }

      const elapsedMs = Date.now() - Number(formStartedAt.value || 0);
      if ((honeypot && honeypot.value.trim() !== "") || elapsedMs < 3000) {
        setFeedback("Thanks. Your request was received.");
        return;
      }

      setFeedback("Sending your request...");
      const payload = new URLSearchParams({
        "form-name": "pilot-request",
        form_started_at: formStartedAt.value,
        company_website: honeypot?.value || "",
        "Full Name": fullName,
        "Work Email": workEmail,
        Company: company,
        "Telemetry Stack": stack,
        "Priority Risk": priority
      });

      try {
        const response = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: payload.toString()
        });

        if (!response.ok) {
          throw new Error("Form submit failed");
        }

        contactForm.reset();
        formStartedAt.value = String(Date.now());
        setFeedback("Thanks, your pilot request is in. We typically reply within 1 business day.");
      } catch (_err) {
        setFeedback("Submission did not go through. Please try again or email <a href=\"mailto:craig@neraium.com\">craig@neraium.com</a> directly.");
      }
    });
  }

  const faqList = document.querySelector("[data-faq-list]");
  if (!faqList) {
    return;
  }

  faqList.querySelectorAll(".faq-item").forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const panel = item.querySelector(".faq-panel");
    const icon = item.querySelector(".faq-icon");
    if (!trigger || !panel || !icon) {
      return;
    }

    trigger.addEventListener("click", () => {
      const willOpen = trigger.getAttribute("aria-expanded") !== "true";
      trigger.setAttribute("aria-expanded", String(willOpen));
      panel.hidden = !willOpen;
      icon.textContent = willOpen ? "\u2212" : "+";
    });
  });
})();
