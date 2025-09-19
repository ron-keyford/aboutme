// script.js - enhanced interactivity with modern animations

;(() => {
  const docEl = document.documentElement
  const body = document.body
  const themeToggle = document.getElementById("themeToggle")
  const sectionIds = ["intro", "work", "thoughts", "connect"]
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
  const nav = document.querySelector(".side-nav")
  const navDots = nav ? Array.from(nav.querySelectorAll(".nav-dot")) : []

  // Theme: read persisted preference or default to dark like the React version
  const THEME_KEY = "portfolio_theme"
  const stored = localStorage.getItem(THEME_KEY)
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  let isDark = stored ? stored === "dark" : true || prefersDark

  function applyTheme() {
    docEl.classList.toggle("dark", isDark)
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light")
  }

  applyTheme()

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      isDark = !isDark
      applyTheme()
      themeToggle.style.transform = "rotate(180deg)"
      setTimeout(() => {
        themeToggle.style.transform = "rotate(0deg)"
      }, 300)
    })
  }

  // Smooth scroll for side nav
  navDots.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target")
      const el = target && document.getElementById(target)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    })
  })

  let activeId = ""
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation delay
          setTimeout(() => {
            entry.target.classList.add("animate-in")
          }, index * 100)

          activeId = entry.target.id
          // Update nav dots with enhanced animation
          navDots.forEach((btn) => {
            const match = btn.getAttribute("data-target") === activeId
            btn.classList.toggle("active", match)
            if (match) {
              btn.style.transform = "scale(1.3)"
              setTimeout(() => {
                btn.style.transform = "scale(1.2)"
              }, 200)
            }
          })
        }
      })
    },
    { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
  )

  sections.forEach((s) => s && observer.observe(s))

  const cards = document.querySelectorAll(".enhanced-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  const workRows = document.querySelectorAll(".enhanced-work-row")
  workRows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      const tags = row.querySelectorAll(".enhanced-tag")
      tags.forEach((tag, index) => {
        setTimeout(() => {
          tag.style.transform = "translateY(-2px) scale(1.05)"
        }, index * 50)
      })
    })

    row.addEventListener("mouseleave", () => {
      const tags = row.querySelectorAll(".enhanced-tag")
      tags.forEach((tag) => {
        tag.style.transform = "translateY(0) scale(1)"
      })
    })
  })

  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / window.innerWidth
    mouseY = e.clientY / window.innerHeight

    const particles = document.querySelectorAll(".particle")
    particles.forEach((particle, index) => {
      const speed = (index + 1) * 0.5
      const x = mouseX * speed * 10
      const y = mouseY * speed * 10
      particle.style.transform = `translate(${x}px, ${y}px)`
    })
  })

  const chips = document.querySelectorAll(".enhanced-chip")
  chips.forEach((chip) => {
    chip.addEventListener("mouseenter", () => {
      chip.style.transform = "translateY(-3px) rotate(2deg)"
    })

    chip.addEventListener("mouseleave", () => {
      chip.style.transform = "translateY(0) rotate(0deg)"
    })
  })

  // Accessibility: keyboard navigation for side nav dots
  navDots.forEach((btn) => {
    btn.setAttribute("tabindex", "0")
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        btn.click()
      }
    })
  })

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallax = document.querySelector(".particles-bg")
    if (parallax) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })
})()
