// Complete Dentrist Application Controller with Image Mapping, Responsive Pages & Mobile Navigation Drawer
const App = {
  currentPage: 'home',
  currentModal: null,
  activeStoryIndex: 0,
  assessmentStep: 0,
  bookingStep: 0,
  selectedDentist: 'Dr. Emily Hart',
  selectedTime: '10:00 AM',

  // 6 Services mapped to uploaded & curated assets
  services: [
    {
      id: "general",
      title: "General Dentistry",
      desc: "Preventive care, routine cleanings, and checkups to keep your teeth and gums healthy for life.",
      img: "images/Article - Card 8.png"
    },
    {
      id: "cosmetic",
      title: "Cosmetic Dentistry",
      desc: "Whitening, veneers, and bonding tailored to your natural facial aesthetics and smile goals.",
      img: "images/Article - Card 9.png"
    },
    {
      id: "ortho",
      title: "Orthodontics",
      desc: "Reveal a modern, aligned smile with braces or clear aligners crafted for comfort and clarity.",
      img: "images/Article - Card 10.png"
    },
    {
      id: "pediatric",
      title: "Pediatric Dentistry",
      desc: "Gentle visits and calm guidance designed to help children build lifelong dental confidence.",
      img: "images/Article - Card 11.png"
    },
    {
      id: "implants",
      title: "Dental Implants",
      desc: "Replace missing teeth with natural-looking solutions designed to restore function and confidence.",
      img: "images/Article - Card 12.png"
    },
    {
      id: "emergency",
      title: "Emergency Dental Care",
      desc: "Toothache, chipped tooth, or swelling? Prompt guidance and gentle emergency visits.",
      img: "images/Article3.png"
    }
  ],

  // Patient stories
  stories: [
    {
      title: "A brighter everyday smile",
      concern: "Staining concerns",
      care: "Professional cleaning & whitening",
      img: "images/Article - Card 8.png"
    },
    {
      title: "Confidence at every visit",
      concern: "Dental anxiety",
      care: "A calm, gentle consultation",
      img: "images/Dentist showing smiling patient her teeth in a mirror.png"
    },
    {
      title: "A healthy start for little smiles",
      concern: "A first dental visit",
      care: "Friendly preventive care",
      img: "images/Article - Card 11.png"
    }
  ],

  // Team roster
  team: [
    { name: "Dr. Ethan Marquez", role: "Clinical Director", img: "images/Dentrist clinical specialist.png" },
    { name: "Dr. Emily Hart", role: "Cosmetic Dentistry", img: "images/Dr. Emily Hart.png" },
    { name: "Dr. Leo Ramirez", role: "Orthodontics", img: "images/Dr. Leo Ramirez.png" },
    { name: "Dr. Sara Nguyen", role: "Pediatric Dentistry", img: "images/Dr. Sara Nguyen.png" },
    { name: "Dr. Emily Hart", role: "Restorative Dentistry", img: "images/Dr. Emily Hart-1.png" },
    { name: "Dr. Leo Ramirez", role: "Dental Implants", img: "images/Dr. Leo Ramirez-1.png" }
  ],

  // Blog / Insights from the Desk
  articles: [
    {
      date: "14 May 2026",
      title: "The Simple Guide to Everyday Gum Health",
      desc: "Essential habits to protect your teeth between regular clinic checkups.",
      img: "images/Article - Card 12.png"
    },
    {
      date: "02 June 2026",
      title: "What to Expect at Your First Consultation",
      desc: "How modern clinics ensure a relaxed, pressure-free initial appointment.",
      img: "images/Article - Card 8.png"
    },
    {
      date: "18 June 2026",
      title: "Gentle Approaches to Pediatric Dental Care",
      desc: "Helping young children feel calm and excited about their smiles.",
      img: "images/Article - Card 11.png"
    }
  ],

  init() {
    this.bindStaticEvents();
    this.navigateTo(this.currentPage);
  },

  bindStaticEvents() {
    // Nav links
    document.querySelectorAll('[data-navigate]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = e.currentTarget.getAttribute('data-navigate');
        this.navigateTo(page);
      });
    });

    // Book buttons
    document.querySelectorAll('[data-book]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeMobileDrawer();
        this.openBooking();
      });
    });

    // Mobile nav drawer open / close controls
    const toggleBtn = document.getElementById('mobileNavToggle');
    const closeBtn = document.getElementById('mobileNavClose');
    const overlay = document.getElementById('mobileNavOverlay');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.openMobileDrawer();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeMobileDrawer();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeMobileDrawer();
        }
      });
    }

    // Modal backdrop click
    const modalBackdrop = document.getElementById('modalBackdrop');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          this.closeModal();
        }
      });
    }

    // Keyboard ESC to close drawer or modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileDrawer();
        this.closeModal();
      }
    });
  },

  openMobileDrawer() {
    const overlay = document.getElementById('mobileNavOverlay');
    if (overlay) overlay.classList.add('open');
    document.body.classList.add('menu-open');
  },

  closeMobileDrawer() {
    const overlay = document.getElementById('mobileNavOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  },

  navigateTo(page) {
    this.currentPage = page;
    this.closeMobileDrawer();
    this.closeModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active nav indicators
    document.querySelectorAll('.nav-item').forEach(el => {
      if (el.getAttribute('data-navigate') === page) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    this.renderPage(page);
  },

  renderPage(page) {
    const main = document.getElementById('mainContent');
    if (!main) return;

    if (page === 'home') {
      main.innerHTML = this.getHomeHTML();
    } else if (page === 'about') {
      main.innerHTML = this.getAboutHTML();
    } else if (page === 'services') {
      main.innerHTML = this.getServicesHTML();
    } else if (page === 'pediatric') {
      main.innerHTML = this.getPediatricHTML();
    } else if (page === 'journey') {
      main.innerHTML = this.getJourneyHTML();
    } else if (page === 'contact') {
      main.innerHTML = this.getContactHTML();
    }

    this.bindDynamicEvents();
  },

  bindDynamicEvents() {
    // Dynamic content buttons
    document.querySelectorAll('#mainContent [data-navigate]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = e.currentTarget.getAttribute('data-navigate');
        this.navigateTo(page);
      });
    });

    document.querySelectorAll('#mainContent [data-book]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openBooking();
      });
    });

    document.querySelectorAll('#mainContent [data-open-story]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-open-story') || '0', 10);
        this.openStory(idx);
      });
    });

    document.querySelectorAll('#mainContent [data-open-assessment]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openAssessment();
      });
    });

    // FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
      item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const successEl = document.getElementById('contactSuccess');
        const fieldsEl = document.getElementById('contactFields');
        if (successEl && fieldsEl) {
          fieldsEl.style.display = 'none';
          successEl.style.display = 'block';
        }
      });
    }

    // Hero quick book form
    const heroForm = document.getElementById('heroQuickForm');
    if (heroForm) {
      heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.openBooking();
      });
    }
  },

  // Modal Flow
  openBooking() {
    this.bookingStep = 0;
    this.currentModal = 'booking';
    this.renderModal();
  },

  openAssessment() {
    this.assessmentStep = 0;
    this.currentModal = 'assessment';
    this.renderModal();
  },

  openStory(idx = 0) {
    this.activeStoryIndex = idx;
    this.currentModal = 'story';
    this.renderModal();
  },

  closeModal() {
    this.currentModal = null;
    const modalBackdrop = document.getElementById('modalBackdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('open');
  },

  renderModal() {
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalContainer = document.getElementById('modalContainer');
    if (!modalBackdrop || !modalContainer) return;

    if (!this.currentModal) {
      modalBackdrop.classList.remove('open');
      return;
    }

    modalBackdrop.classList.add('open');

    if (this.currentModal === 'assessment') {
      modalContainer.innerHTML = this.getAssessmentModalHTML();
    } else if (this.currentModal === 'booking') {
      modalContainer.innerHTML = this.getBookingModalHTML();
    } else if (this.currentModal === 'story') {
      modalContainer.innerHTML = this.getStoryModalHTML();
    }

    this.bindModalEvents();
  },

  bindModalEvents() {
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

    document.querySelectorAll('[data-select-dentist]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.selectedDentist = e.currentTarget.getAttribute('data-select-dentist');
        this.bookingStep = 1;
        this.renderModal();
      });
    });

    document.querySelectorAll('[data-select-date]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const d = e.currentTarget.getAttribute('data-select-date');
        if (d === '18') {
          this.bookingStep = 2;
          this.renderModal();
        }
      });
    });

    document.querySelectorAll('[data-select-time]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.selectedTime = e.currentTarget.getAttribute('data-select-time');
        this.bookingStep = 3;
        this.renderModal();
      });
    });

    const confirmBtn = document.getElementById('btnConfirmBooking');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        this.bookingStep = 4;
        this.renderModal();
      });
    }

    const nextAssess = document.getElementById('btnNextAssessment');
    if (nextAssess) {
      nextAssess.addEventListener('click', () => {
        if (this.assessmentStep < 2) {
          this.assessmentStep++;
          this.renderModal();
        } else {
          this.openBooking();
        }
      });
    }

    const backAssess = document.getElementById('btnBackAssessment');
    if (backAssess) {
      backAssess.addEventListener('click', () => {
        if (this.assessmentStep > 0) {
          this.assessmentStep--;
          this.renderModal();
        }
      });
    }

    const prevStory = document.getElementById('btnPrevStory');
    const nextStory = document.getElementById('btnNextStory');
    if (prevStory) {
      prevStory.addEventListener('click', () => {
        this.activeStoryIndex = (this.activeStoryIndex + 2) % 3;
        this.renderModal();
      });
    }
    if (nextStory) {
      nextStory.addEventListener('click', () => {
        this.activeStoryIndex = (this.activeStoryIndex + 1) % 3;
        this.renderModal();
      });
    }

    document.querySelectorAll('#modalContainer [data-book]').forEach(btn => {
      btn.addEventListener('click', () => this.openBooking());
    });
  },

  // PAGE TEMPLATES
  getHomeHTML() {
    return `
      <!-- HERO SECTION -->
      <section class="section bg-soft-blue">
        <div class="container">
          <div class="hero-grid">
            <div>
              <span class="eyebrow">YOUR COMFORT COMES FIRST</span>
              <h1 style="margin-top: 14px;">Brighten Your Smile<br>with Dentrist</h1>
              <p style="margin-top: 18px; color: var(--color-secondary-text); font-size: 1.05rem; max-width: 500px;">
                Discover a dental experience that’s friendly, stress-free, and focused entirely on you.
              </p>
              
              <!-- Quick Booking Form Card -->
              <form id="heroQuickForm" class="hero-quick-form" style="margin-top: 28px; max-width: 480px;">
                <input required placeholder="Your full name" aria-label="Full name">
                <input required type="tel" placeholder="Phone number" aria-label="Phone number">
                <select required aria-label="Service needed">
                  <option value="" disabled selected>Select service</option>
                  <option>General Checkup & Cleaning</option>
                  <option>Teeth Whitening</option>
                  <option>Orthodontics & Aligners</option>
                  <option>Dental Implants</option>
                  <option>Pediatric Care</option>
                </select>
                <button type="submit" class="btn-primary" style="width: 100%;">Book an Appointment</button>
              </form>
            </div>

            <!-- Hero Main Image with smooth hover effect -->
            <div class="hero-image-wrap">
              <img src="images/Happy patient smiling in modern dental chair (1).png" alt="Happy patient smiling in modern dental chair">
            </div>
          </div>
        </div>
      </section>

      <!-- 6 SERVICES GRID -->
      <section class="section">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow">COMPREHENSIVE TREATMENTS</span>
              <h2 style="margin-top: 8px;">Smile Solutions for Every Need</h2>
            </div>
            <button class="section-action" data-navigate="services">Explore all services →</button>
          </div>

          <div class="services-card-grid">
            ${this.services.map(s => `
              <article class="service-item-card">
                <div class="service-card-media">
                  <img src="${s.img}" alt="${s.title}">
                </div>
                <div class="service-card-body">
                  <h3>${s.title}</h3>
                  <p>${s.desc}</p>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- WHY CHOOSE DENTRIST & CLINICAL SPECIALIST -->
      <section class="section bg-soft-blue">
        <div class="container">
          <div class="why-choose-layout">
            <div>
              <span class="eyebrow">WHY CHOOSE DENTRIST</span>
              <h2 style="margin-top: 10px;">Care that feels personal,<br>from people who care.</h2>
              <p style="margin-top: 18px; color: var(--color-secondary-text);">
                We combine clinical excellence with an experience built around clarity, comfort, and transparent communication.
              </p>

              <div class="metrics-grid">
                <div class="metric-item">
                  <strong>4.9/5</strong>
                  <span>Average patient satisfaction rating</span>
                </div>
                <div class="metric-item">
                  <strong>15k+</strong>
                  <span>Smiles transformed across Bay Area</span>
                </div>
                <div class="metric-item">
                  <strong>100%</strong>
                  <span>Transparent treatment costs up-front</span>
                </div>
                <div class="metric-item">
                  <strong>20+</strong>
                  <span>Years of dedicated clinical expertise</span>
                </div>
              </div>
            </div>

            <div class="img-hover-zoom" style="border-radius: 28px;">
              <img src="images/Dentrist clinical specialist.png" alt="Dentrist Clinical Specialist" style="width: 100%; max-width: 440px; border-radius: 24px; margin: auto; box-shadow: 0 16px 32px rgba(21, 59, 74, 0.08);">
            </div>
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <section class="section">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow">SIMPLE & TRANSPARENT</span>
            <h2 style="margin-top: 8px;">How It Works</h2>
            <p style="margin-top: 12px; color: var(--color-secondary-text);">Getting started with Dentrist is simple—just follow these easy steps.</p>
          </div>

          <div class="steps-grid">
            <div class="step-card">
              <span class="step-badge">Step 01</span>
              <h3>Schedule an Appointment</h3>
              <p style="margin-top: 10px; font-size: 14px; color: var(--color-secondary-text);">
                Book online in 60 seconds or call our friendly reception team at your convenience.
              </p>
            </div>
            <div class="step-card">
              <span class="step-badge">Step 02</span>
              <h3>Come Visit Our Clinic</h3>
              <p style="margin-top: 10px; font-size: 14px; color: var(--color-secondary-text);">
                Enjoy our calm, modern lounge while our care team helps you settle in comfortably.
              </p>
            </div>
            <div class="step-card">
              <span class="step-badge">Step 03</span>
              <h3>Receive Thoughtful Care</h3>
              <p style="margin-top: 10px; font-size: 14px; color: var(--color-secondary-text);">
                Meet your dentist, review your x-rays together, and leave with a clear, comfortable plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- DISCOVER THE DENTRIST EXPERIENCE -->
      <section class="section bg-soft-blue">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow">EXPERIENCE & TECHNOLOGY</span>
            <h2 style="margin-top: 8px;">Discover the Dentrist Experience</h2>
          </div>

          <div class="img-hover-zoom" style="position: relative; border-radius: 28px; box-shadow: 0 16px 36px rgba(21, 59, 74, 0.08);">
            <img src="images/Dentist reviewing panoramic dental X-ray on laptop.png" alt="Dentist reviewing panoramic dental X-ray on laptop" style="width: 100%; height: 480px; object-fit: cover;">
            <div style="position: absolute; bottom: 32px; left: 32px; max-width: 440px;">
              <button class="btn-primary" data-navigate="journey">Start Your Smile Journey →</button>
            </div>
          </div>
        </div>
      </section>

      <!-- MEET OUR CLINICIANS -->
      <section class="section">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow">EXPERIENCED PRACTITIONERS</span>
              <h2 style="margin-top: 8px;">Meet Our Dental Experts</h2>
            </div>
            <button class="section-action" data-navigate="about">Learn more about the team →</button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
            ${this.team.slice(0, 4).map(m => `
              <div class="card img-hover-zoom" style="text-align: center; padding-bottom: 20px;">
                <img src="${m.img}" alt="${m.name}" style="width: 100%; height: 260px; object-fit: cover;">
                <h3 style="margin-top: 16px; font-size: 1.15rem;">${m.name}</h3>
                <p style="font-size: 13px; color: var(--color-secondary-text); margin-top: 4px;">${m.role}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- TRANSPARENT PRICING TIERS -->
      <section class="section bg-soft-blue">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow">AFFORDABLE CARE</span>
            <h2 style="margin-top: 8px;">Transparent Pricing for Quality Care</h2>
            <p style="margin-top: 12px; color: var(--color-secondary-text);">No hidden fees or unexpected bills. Every treatment plan is discussed beforehand.</p>
          </div>

          <div class="pricing-grid">
            <div class="pricing-card">
              <h3>Preventive Visit</h3>
              <p style="color: var(--color-secondary-text); font-size: 13px; margin-top: 4px;">Routine maintenance & check</p>
              <div class="price">$120</div>
              <ul class="pricing-features">
                <li>Comprehensive oral examination</li>
                <li>Low-dose digital x-rays</li>
                <li>Gentle ultrasonic cleaning</li>
                <li>Custom oral hygiene guidance</li>
              </ul>
              <button class="btn-ghost" style="margin-top: auto; width: 100%;" data-book>Book Checkup</button>
            </div>

            <div class="pricing-card popular">
              <span class="step-badge" style="position: absolute; top: -14px; left: 24px; background: var(--color-teal-primary); color: #fff;">Most Popular</span>
              <h3>Smile Consultation</h3>
              <p style="color: var(--color-secondary-text); font-size: 13px; margin-top: 4px;">Complete aesthetic evaluation</p>
              <div class="price">$180</div>
              <ul class="pricing-features">
                <li>3D digital scan of your smile</li>
                <li>Facial aesthetic analysis</li>
                <li>Before & after simulation</li>
                <li>Personalized treatment timeline</li>
              </ul>
              <button class="btn-primary" style="margin-top: auto; width: 100%;" data-book>Book Consultation</button>
            </div>

            <div class="pricing-card">
              <h3>Restorative Care</h3>
              <p style="color: var(--color-secondary-text); font-size: 13px; margin-top: 4px;">Repair & implant assessment</p>
              <div class="price">$250</div>
              <ul class="pricing-features">
                <li>High-definition 3D CBCT scan</li>
                <li>Bone density evaluation</li>
                <li>Clear surgical plan review</li>
                <li>Flexible payment plans available</li>
              </ul>
              <button class="btn-ghost" style="margin-top: auto; width: 100%;" data-book>Book Assessment</button>
            </div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS / STORIES -->
      <section class="section">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow">PATIENT EXPERIENCES</span>
              <h2 style="margin-top: 8px;">Hear From Our Happy Patients</h2>
            </div>
            <button class="section-action" data-open-story="0">View smile stories →</button>
          </div>

          <div class="story-cards-grid">
            <article class="story-card img-hover-zoom" data-open-story="0">
              <img src="images/Article - Card 8.png" alt="Patient story">
              <div class="story-card-body">
                <div style="color: var(--color-teal-primary); font-size: 14px;">★★★★★</div>
                <h3 style="margin-top: 8px; font-size: 1.1rem;">“I felt listened to from the moment I arrived.”</h3>
                <p>Gentle consultation & cleaning</p>
              </div>
            </article>

            <article class="story-card img-hover-zoom" data-open-story="1">
              <img src="images/Dentist showing smiling patient her teeth in a mirror.png" alt="Patient story">
              <div class="story-card-body">
                <div style="color: var(--color-teal-primary); font-size: 14px;">★★★★★</div>
                <h3 style="margin-top: 8px; font-size: 1.1rem;">“Everything was explained clearly and calmly.”</h3>
                <p>Cosmetic whitening journey</p>
              </div>
            </article>

            <article class="story-card img-hover-zoom" data-open-story="2">
              <img src="images/Article - Card 11.png" alt="Patient story">
              <div class="story-card-body">
                <div style="color: var(--color-teal-primary); font-size: 14px;">★★★★★</div>
                <h3 style="margin-top: 8px; font-size: 1.1rem;">“A genuinely warm experience from start to finish.”</h3>
                <p>Child’s first checkup visit</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ARTICLES FROM THE DESK -->
      <section class="section bg-soft-blue">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow">DENTAL INSIGHTS</span>
              <h2 style="margin-top: 8px;">From the Dentrist Desk</h2>
            </div>
          </div>

          <div class="articles-grid">
            ${this.articles.map(a => `
              <article class="article-card img-hover-zoom">
                <img src="${a.img}" alt="${a.title}">
                <div class="article-card-body">
                  <small>${a.date}</small>
                  <h3>${a.title}</h3>
                  <p style="font-size: 13px; color: var(--color-secondary-text); margin-top: 6px;">${a.desc}</p>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- FAQ SECTION -->
      ${this.getFaqHTML()}

      <!-- NEWSLETTER BANNER -->
      ${this.getNewsletterHTML()}
    `;
  },

  getAboutHTML() {
    return `
      <section class="section bg-soft-blue">
        <div class="container">
          <div class="why-choose-layout">
            <div>
              <span class="eyebrow">A MESSAGE FROM OUR DIRECTOR</span>
              <h1 style="margin-top: 10px;">Dentistry built on empathy, trust, and clarity.</h1>
              <p style="margin-top: 18px; color: var(--color-secondary-text);">
                Dentrist is here to make dentistry feel more human—clear explanations, thoughtful care, and no unnecessary pressure.
              </p>
              <p style="margin-top: 24px; font-weight: 700; color: var(--color-teal-primary);">
                Dr. Ethan Marquez, DDS<br>
                <small style="font-weight: 500; color: var(--color-secondary-text);">Clinical Director & Founder</small>
              </p>
            </div>
            <div class="img-hover-zoom" style="border-radius: 28px;">
              <img src="images/Dentrist clinical specialist.png" alt="Dr. Ethan Marquez" style="width: 100%; border-radius: 28px; box-shadow: 0 16px 36px rgba(21, 59, 74, 0.08);">
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow">OUR CORE PRINCIPLES</span>
            <h2 style="margin-top: 8px;">Our Vision & Mission</h2>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
            <div class="card" style="padding: 36px; background: var(--color-soft-blue);">
              <h3>Vision</h3>
              <p style="margin-top: 14px; color: var(--color-ink); line-height: 1.7;">
                To become a leading dental care provider known for innovation, empathy, and exceptional patient experiences.
              </p>
            </div>
            <div class="card" style="padding: 36px; background: var(--color-soft-blue);">
              <h3>Mission</h3>
              <p style="margin-top: 14px; color: var(--color-ink); line-height: 1.7;">
                Deliver high-quality, personalized dentistry through expertise, technology, and honest communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="section bg-soft-blue">
        <div class="container">
          <div class="section-head">
            <div>
              <span class="eyebrow">MEET THE TEAM</span>
              <h2 style="margin-top: 8px;">The Team Behind the Smiles</h2>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;">
            ${this.team.map(m => `
              <div class="card img-hover-zoom" style="text-align: center; padding-bottom: 20px;">
                <img src="${m.img}" alt="${m.name}" style="width: 100%; height: 260px; object-fit: cover;">
                <h3 style="margin-top: 16px; font-size: 1.15rem;">${m.name}</h3>
                <p style="font-size: 13px; color: var(--color-secondary-text); margin-top: 4px;">${m.role}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      ${this.getNewsletterHTML()}
    `;
  },

  getServicesHTML() {
    return `
      <section class="section bg-soft-blue" style="text-align: center;">
        <div class="container">
          <span class="eyebrow">OUR SERVICES</span>
          <h1 style="margin-top: 10px;">Smile Solutions for Every Need</h1>
          <p style="margin-top: 14px; color: var(--color-secondary-text); max-width: 540px; margin-left: auto; margin-right: auto;">
            From routine checkups to full aesthetic smile makeovers, our clinicians are here with gentle expertise.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="services-card-grid">
            ${this.services.map(s => `
              <article class="service-item-card img-hover-zoom">
                <div class="service-card-media">
                  <img src="${s.img}" alt="${s.title}">
                </div>
                <div class="service-card-body">
                  <h3>${s.title}</h3>
                  <p>${s.desc}</p>
                  <button class="btn-ghost" style="margin-top: 18px; align-self: flex-start;" data-book>Book This Care →</button>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      ${this.getFaqHTML()}
      ${this.getNewsletterHTML()}
    `;
  },

  getPediatricHTML() {
    return `
      <section class="section bg-soft-blue">
        <div class="container">
          <div class="hero-grid">
            <div>
              <span class="eyebrow">PEDIATRIC CARE</span>
              <h1 style="margin-top: 12px;">Gentle Dental Care for Growing Smiles</h1>
              <p style="margin-top: 18px; color: var(--color-secondary-text); line-height: 1.7;">
                A positive first visit builds healthy habits for life. Our team welcomes toddlers, children, and teens with gentle explanations and a playful, stress-free atmosphere.
              </p>
              <button class="btn-primary" style="margin-top: 24px;" data-book>Book a Child’s Visit</button>
            </div>
            <div class="hero-image-wrap">
              <img src="images/Article - Card 11.png" alt="Pediatric dental patient smiling">
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow">WHAT WE OFFER</span>
            <h2 style="margin-top: 8px;">What We Offer in Pediatric Dentistry</h2>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-top: 24px;">
            <div class="card" style="padding: 28px;">
              <h3>Dental Checkups for Children</h3>
              <p style="margin-top: 10px; font-size: 14px; color: var(--color-secondary-text);">
                Gentle exams to track growing teeth and gums, with practical tips for healthy habits at home.
              </p>
            </div>
            <div class="card" style="padding: 28px;">
              <h3>Fluoride Treatments</h3>
              <p style="margin-top: 10px; font-size: 14px; color: var(--color-secondary-text);">
                Targeted fluoride to strengthen developing enamel and help protect against tooth decay.
              </p>
            </div>
            <div class="card" style="padding: 28px;">
              <h3>Dental Sealants</h3>
              <p style="margin-top: 10px; font-size: 14px; color: var(--color-secondary-text);">
                Thin protective coatings for back teeth that help keep food and plaque out of deep grooves.
              </p>
            </div>
            <div class="card" style="padding: 28px;">
              <h3>Gentle Cavity Care</h3>
              <p style="margin-top: 10px; font-size: 14px; color: var(--color-secondary-text);">
                Tooth-colored fillings in an age-appropriate setting with comfort options explained first.
              </p>
            </div>
          </div>
        </div>
      </section>

      ${this.getNewsletterHTML()}
    `;
  },

  getJourneyHTML() {
    const goals = [
      "Whiter Teeth", "Straighter Teeth", "Fix Gaps",
      "Healthy Gums", "Remove Stains", "General Smile Check"
    ];
    return `
      <section class="section bg-soft-blue">
        <div class="container">
          <div class="hero-grid">
            <div>
              <span class="eyebrow">YOUR SMILE, YOUR WAY</span>
              <h1 style="margin-top: 12px;">Discover Your<br>Perfect Smile</h1>
              <p style="margin-top: 18px; color: var(--color-secondary-text);">
                Every smile is unique. Tell us your goals and comfort preferences so we can guide you seamlessly.
              </p>
              <button class="btn-primary" style="margin-top: 24px;" data-open-assessment>
                Start the Smile Assessment
              </button>
            </div>
            <div class="hero-image-wrap">
              <img src="images/Dentist showing smiling patient her teeth in a mirror.png" alt="Dentist and smiling patient">
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="card" style="padding: 40px; background: var(--color-soft-blue-light);">
            <span class="eyebrow">01 / YOUR GOALS</span>
            <h2 style="margin-top: 10px;">What would you love to improve?</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-top: 24px;">
              ${goals.map(g => `
                <button class="card" style="padding: 20px; font-weight: 600; text-align: left; background: #fff;" data-open-assessment>
                  ${g}
                </button>
              `).join('')}
            </div>
            <button class="btn-primary" style="margin-top: 28px;" data-open-assessment>Continue with Assessment</button>
          </div>
        </div>
      </section>

      ${this.getNewsletterHTML()}
    `;
  },

  getContactHTML() {
    return `
      <section class="section bg-soft-blue" style="text-align: center;">
        <div class="container">
          <span class="eyebrow">GET IN TOUCH</span>
          <h1 style="margin-top: 10px;">Let’s Talk About Your Smile</h1>
          <p style="margin-top: 14px; color: var(--color-secondary-text);">
            Whether you need to book an appointment or ask a question, we’re here to help.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: flex-start;">
            <!-- Form Card -->
            <form id="contactForm" class="card" style="padding: 36px;">
              <h2>Send Us a Message</h2>
              <p style="margin-top: 8px; font-size: 14px; color: var(--color-secondary-text);">
                Ask about appointments, treatments, or your first visit.
              </p>

              <div id="contactFields" style="margin-top: 24px; display: flex; flex-direction: column; gap: 16px;">
                <input required placeholder="Full Name" aria-label="Full Name" style="height: 46px; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0 16px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <input required type="email" placeholder="Email Address" aria-label="Email" style="height: 46px; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0 16px;">
                  <input type="tel" placeholder="Phone Number" aria-label="Phone" style="height: 46px; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0 16px;">
                </div>
                <select required style="height: 46px; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0 16px;">
                  <option value="" disabled selected>What can we help you with?</option>
                  <option>Book an appointment</option>
                  <option>Routine checkup & cleaning</option>
                  <option>Dental pain or emergency</option>
                  <option>Cosmetic smile makeover</option>
                  <option>Orthodontic aligners</option>
                </select>
                <textarea placeholder="Tell us a little about your dental care needs..." style="min-height: 120px; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 14px 16px; font-family: inherit; font-size: 14px;"></textarea>
                <button type="submit" class="btn-primary" style="margin-top: 8px; width: 100%;">Send Message</button>
              </div>

              <div id="contactSuccess" style="display: none; margin-top: 24px; border-radius: 16px; background: var(--color-soft-blue); padding: 24px;">
                <h3>Thank you — we’ll be in touch!</h3>
                <p style="margin-top: 8px;">Your message has been received by our clinic reception team.</p>
              </div>
            </form>

            <!-- Office & Clinic Details -->
            <div>
              <div class="card" style="padding: 32px;">
                <h3>Contact Information</h3>
                <p style="margin-top: 14px; color: var(--color-secondary-text);">
                  <strong>Office</strong><br>
                  123 Smile Street, San Francisco, CA 94110
                </p>
                <p style="margin-top: 14px; color: var(--color-secondary-text);">
                  <strong>Email Address</strong><br>
                  info@dentristclinic.com
                </p>
                <p style="margin-top: 14px; color: var(--color-secondary-text);">
                  <strong>Phone Number</strong><br>
                  (123) 456-7890
                </p>
              </div>

              <div class="card" style="padding: 32px; margin-top: 24px; background: var(--color-soft-blue-light);">
                <h3>Opening Hours</h3>
                <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 14px; font-size: 14px;">
                  <div style="display: flex; justify-content: space-between;"><span>Monday – Friday</span><strong>09:00 AM – 06:00 PM</strong></div>
                  <div style="display: flex; justify-content: space-between;"><span>Saturday</span><strong>09:00 AM – 03:00 PM</strong></div>
                  <div style="display: flex; justify-content: space-between;"><span>Sunday</span><strong style="color: var(--color-secondary-text);">Closed</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${this.getNewsletterHTML()}
    `;
  },

  getFaqHTML() {
    const faqs = [
      ["How often should I visit the dentist?", "Most people benefit from regular checkups every six months, but your dentist will recommend a schedule based on your personal needs."],
      ["Do you treat children?", "Yes! Our pediatric approach is gentle, patient, and designed to help children develop positive dental associations."],
      ["What if I have dental anxiety?", "Tell us when you book. We take extra time, explain each step beforehand, and pause anytime you need a break."],
      ["Is professional teeth whitening safe?", "Yes, when performed or supervised by a qualified dental clinician after checking your enamel health."]
    ];

    return `
      <section class="section">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow">HELP & GUIDANCE</span>
            <h2 style="margin-top: 8px;">Answers to Your Dental Care Questions</h2>
          </div>
          <div class="faq-list">
            ${faqs.map(([q, a], idx) => `
              <div class="faq-item ${idx === 0 ? 'active' : ''}">
                <div class="faq-q">
                  <span>${q}</span>
                  <span>+</span>
                </div>
                <div class="faq-a">${a}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  },

  getNewsletterHTML() {
    return `
      <section class="newsletter-banner">
        <div class="container">
          <div class="newsletter-inner">
            <div>
              <h2>Keep Smiling Bright —<br>Stay Connected with Us</h2>
              <p style="margin-top: 8px; color: var(--color-secondary-text); font-size: 15px;">
                Get dental care tips, clinic updates, and exclusive offers straight to your inbox.
              </p>
            </div>
            <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Subscribed to Dentrist newsletter!');">
              <input type="email" required placeholder="Your Email Address" aria-label="Email Address" class="newsletter-input">
              <button type="submit" class="btn-primary newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    `;
  },

  // Modal Flow Implementations
  getAssessmentModalHTML() {
    let content = '';
    if (this.assessmentStep === 0) {
      content = `
        <span class="eyebrow">01 OF 03 · YOUR COMFORT</span>
        <h2 style="margin-top: 10px;">How can we make your visit easier?</h2>
        <p style="margin-top: 10px; color: var(--color-secondary-text);">Choose anything that would help you feel more at ease.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 24px;">
          <button class="card" style="padding: 18px; text-align: left; font-weight: 600; background: var(--color-soft-blue);">I’m nervous about dental treatment</button>
          <button class="card" style="padding: 18px; text-align: left; font-weight: 600; background: var(--color-soft-blue);">I prefer a gentle consultation</button>
          <button class="card" style="padding: 18px; text-align: left; font-weight: 600; background: var(--color-soft-blue);">I want to understand costs first</button>
          <button class="card" style="padding: 18px; text-align: left; font-weight: 600; background: var(--color-soft-blue);">I want to meet the dentist first</button>
        </div>
      `;
    } else if (this.assessmentStep === 1) {
      content = `
        <span class="eyebrow">02 OF 03 · YOUR SMILE GOAL</span>
        <h2 style="margin-top: 10px;">What is your top priority?</h2>
        <p style="margin-top: 10px; color: var(--color-secondary-text);">Select the care track you wish to explore.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 24px;">
          <button class="card" style="padding: 18px; text-align: left; font-weight: 600; background: var(--color-soft-blue);">Health & routine prevention</button>
          <button class="card" style="padding: 18px; text-align: left; font-weight: 600; background: var(--color-soft-blue);">Whitening & cosmetic brightening</button>
          <button class="card" style="padding: 18px; text-align: left; font-weight: 600; background: var(--color-soft-blue);">Straightening & aligners</button>
          <button class="card" style="padding: 18px; text-align: left; font-weight: 600; background: var(--color-soft-blue);">Replacing a missing tooth</button>
        </div>
      `;
    } else {
      content = `
        <span class="eyebrow">03 OF 03 · YOUR GUIDANCE</span>
        <h2 style="margin-top: 10px;">Your next step, made clear.</h2>
        <p style="margin-top: 10px; color: var(--color-secondary-text);">
          Based on your choices, a gentle smile consultation is the ideal starting point.
        </p>
        <div class="card" style="margin-top: 24px; padding: 24px; background: var(--color-soft-blue);">
          <h3>Recommended: 45-Min Smile Consultation</h3>
          <p style="margin-top: 8px; font-size: 14px; color: var(--color-secondary-text);">
            A calm, comprehensive conversation with 3D digital imaging and zero pressure.
          </p>
        </div>
      `;
    }

    return `
      <div class="modal-dialog">
        <p class="modal-crumb">Dentrist / Your smile assessment</p>
        <div class="modal-body">
          <button class="modal-close">✕</button>
          <div>${content}</div>
          <div style="display: flex; justify-content: space-between; margin-top: 32px;">
            ${this.assessmentStep > 0 ? `<button class="btn-ghost" id="btnBackAssessment">← Back</button>` : `<div></div>`}
            <button class="btn-primary" id="btnNextAssessment">
              ${this.assessmentStep < 2 ? "Continue" : "Book Consultation"}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  getBookingModalHTML() {
    let content = '';

    if (this.bookingStep === 0) {
      content = `
        <span class="eyebrow">01 OF 04 · YOUR DENTIST</span>
        <h2 style="margin-top: 10px;">Who would you like to meet?</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 24px;">
          <button data-select-dentist="Dr. Emily Hart" class="card" style="display: flex; gap: 16px; padding: 16px; text-align: left;">
            <img src="images/Dr. Emily Hart.png" style="width: 80px; height: 95px; border-radius: 12px; object-fit: cover;">
            <div>
              <strong style="font-size: 16px;">Dr. Emily Hart</strong>
              <small style="display: block; margin-top: 4px; color: var(--color-secondary-text);">Cosmetic & General<br>10+ years experience</small>
              <b style="display: block; margin-top: 8px; font-size: 13px; color: var(--color-teal-primary);">Select Dentist →</b>
            </div>
          </button>
          <button data-select-dentist="Dr. Sara Nguyen" class="card" style="display: flex; gap: 16px; padding: 16px; text-align: left;">
            <img src="images/Dr. Sara Nguyen.png" style="width: 80px; height: 95px; border-radius: 12px; object-fit: cover;">
            <div>
              <strong style="font-size: 16px;">Dr. Sara Nguyen</strong>
              <small style="display: block; margin-top: 4px; color: var(--color-secondary-text);">Pediatric & Gentle Care<br>8+ years experience</small>
              <b style="display: block; margin-top: 8px; font-size: 13px; color: var(--color-teal-primary);">Select Dentist →</b>
            </div>
          </button>
        </div>
      `;
    } else if (this.bookingStep === 1) {
      content = `
        <span class="eyebrow">02 OF 04 · SELECT DATE</span>
        <h2 style="margin-top: 10px;">Select an appointment date</h2>
        <p style="margin-top: 6px; font-weight: 600; color: var(--color-teal-primary);">${this.selectedDentist}</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-top: 24px;">
          <div>
            <h3>June 2026</h3>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-top: 14px;">
              ${Array.from({ length: 30 }, (_, i) => `
                <button class="card" data-select-date="${i + 1}" style="aspect-ratio: 1; display: grid; place-items: center; font-size: 13px; ${i === 17 ? 'background: var(--color-teal-primary); color: #fff; font-weight: 700;' : ''}">
                  ${i + 1}
                </button>
              `).join('')}
            </div>
          </div>
          <div class="card" style="padding: 20px; background: var(--color-soft-blue-light); display: flex; flex-direction: column; justify-content: center;">
            <p style="font-size: 14px; color: var(--color-secondary-text);">
              Click on <strong>June 18th</strong> to view available consultation slots for ${this.selectedDentist}.
            </p>
          </div>
        </div>
      `;
    } else if (this.bookingStep === 2) {
      content = `
        <span class="eyebrow">03 OF 04 · SELECT TIME</span>
        <h2 style="margin-top: 10px;">Choose a suitable time</h2>
        <p style="margin-top: 6px; color: var(--color-secondary-text);">Thursday, 18 June 2026 · ${this.selectedDentist}</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px;">
          <button class="card" data-select-time="10:00 AM" style="padding: 20px; font-weight: 700; font-size: 16px; text-align: center; background: var(--color-soft-blue);">10:00 AM</button>
          <button class="card" data-select-time="02:30 PM" style="padding: 20px; font-weight: 700; font-size: 16px; text-align: center; background: var(--color-soft-blue);">02:30 PM</button>
        </div>
      `;
    } else if (this.bookingStep === 3) {
      content = `
        <span class="eyebrow">04 OF 04 · CONFIRMATION</span>
        <h2 style="margin-top: 10px;">Your visit is ready</h2>
        <div class="card" style="margin-top: 20px; padding: 24px; background: var(--color-soft-blue);">
          <h3>${this.selectedDentist}</h3>
          <p style="margin-top: 8px;">
            Thursday, 18 June 2026 · ${this.selectedTime}<br>
            45-minute Comprehensive Consultation
          </p>
        </div>
        <button id="btnConfirmBooking" class="btn-primary" style="margin-top: 24px; width: 100%;">Confirm Appointment</button>
      `;
    } else {
      content = `
        <div style="text-align: center; padding: 32px 0;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--color-teal-primary); color: #fff; font-size: 26px; display: grid; place-items: center; margin: 0 auto;">✓</div>
          <h2 style="margin-top: 20px;">You’re all set!</h2>
          <p style="margin-top: 10px; color: var(--color-secondary-text);">We’ve confirmed your sample appointment and sent details to your phone.</p>
          <button class="btn-primary" style="margin-top: 24px;" onclick="App.closeModal()">Back to Dentrist</button>
        </div>
      `;
    }

    return `
      <div class="modal-dialog">
        <p class="modal-crumb">Dentrist / Your appointment</p>
        <div class="modal-body">
          <button class="modal-close">✕</button>
          <div>${content}</div>
        </div>
      </div>
    `;
  },

  getStoryModalHTML() {
    const s = this.stories[this.activeStoryIndex];
    return `
      <div class="modal-dialog">
        <p class="modal-crumb">Dentrist / Patient Story</p>
        <div class="modal-body">
          <button class="modal-close">✕</button>
          <span class="eyebrow">PATIENT STORY ${this.activeStoryIndex + 1} OF 3</span>
          <h2 style="margin-top: 10px;">${s.title}</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-top: 20px;">
            <img src="${s.img}" style="width: 100%; height: 260px; border-radius: 16px; object-fit: cover;">
            <div>
              <h3>${s.concern}</h3>
              <p style="margin-top: 8px; font-weight: 600; color: var(--color-teal-primary);">${s.care}</p>
              <p style="margin-top: 14px; font-size: 14px; color: var(--color-secondary-text);">
                Our clinicians carefully tailor each procedure to your comfort, answering every question along the way.
              </p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 24px;">
            <button class="btn-ghost" id="btnPrevStory">← Previous Story</button>
            <button class="btn-ghost" id="btnNextStory">Next Story →</button>
          </div>
          <button class="btn-primary" style="margin-top: 16px; width: 100%;" data-book>Book Your Consultation</button>
        </div>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
