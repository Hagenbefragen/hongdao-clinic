// ==========================================
// HONGDAO TCM CLINIC - APPLICATION LOGIC
// Includes multilingual i18n, price calculator,
// slot selector, modal controller & popups
// ==========================================

// Translation Dictionary (German & English)
const translations = {
  en: {
    // Navigation
    "nav-home": "Home",
    "nav-about": "About & Masters",
    "nav-treatments": "Treatments",
    "nav-devices": "Technology",
    "nav-programs": "Programs",
    "nav-retreat": "Yunnan Retreat",
    "nav-info": "Clinic Info",
    "nav-apply": "Apply Now",

    // Hero Section
    "hero-tag": "Traditional Chinese Medicine meets Modern Technology",
    "hero-title": "Traditional Chinese Medicine & Clinical Diagnostics",
    "hero-desc": "Experience professional medical support led by TCM Master Xu Ruqi. We integrate classical herbal medicine and pulse diagnostics with modern clinical measurement methods for your health and recovery.",
    "hero-cta-apply": "Apply Now",
    "hero-cta-more": "Explore Programs",

    // Introduction / Philosophy
    "intro-title": "TCM Experience Meets Modern Diagnostics",
    "intro-desc": "Our Shenzhen practice integrates decades of experience in pulse diagnostics and herbal therapy with clinical examination devices, supportive sound therapy, and nutritional guidance. We offer structured care for patients facing endometriosis, hormonal imbalances, chronic fatigue, and stress-related conditions.",

    // Masters & Team
    "team-title": "Lineage Keepers & Specialized Healers",
    "team-subtitle": "Meet our dedicated staff, bridging traditional practices and modern recovery.",
    "master-xu-title": "Chief Physician & TCM Master",
    "master-xu-desc": "Master Xu Ruqi has spent over 40 years mastering pulse diagnosis and classical herbal medicine. A clinical expert at Beijing University of Chinese Medicine, he is globally renowned for treating severe chronic conditions, advanced tumors, and gynecological diseases.",
    "doctor-1-title": "Specialized Physician & Stem Cell Therapy",
    "doctor-1-name": "Dr. Jingwen Qiao (乔建文)",
    "doctor-1-desc": "Dr. Jingwen Qiao combines modern diagnostics with classical herbal medicine and pelvic moxibustion for pain and hormonal balance.",
    "doctor-4-name": "Dr. Weina Guan (管蔚娜)",
    "doctor-4-spec": "Licensed TCM Physician. Specialist in meridian detoxification, clinical acupuncture, and therapeutic massages.",
    "doctor-5-name": "Hailin Zhang (张海林)",
    "doctor-5-spec": "Head of Decoction Center. Specialist in traditional herbal extraction and quality control.",
    "btn-read-bio": "Read Profile",
    "decoction-subtitle": "In-House Herbal Craftsmanship",
    "decoction-title": "Modern Decoction Center & Dao Di Herbs",
    "decoction-desc": "<p style=\"margin-bottom: 1.5rem;\">We source exclusively high-quality <strong>Dao Di Herbs (道地藥材)</strong> from certified organic cultivation and soil-specific farming methods, grown in regions that offer the optimal climatic and energetic conditions for each native plant.</p><p>In our in-house Decoction Center, under the direct supervision of Master Xu, these herbs are individually extracted, precisely processed, and portion-packed into <strong>Ready-to-Drink decoctions</strong> that you can easily take home.</p>",
    "doctor-1-desc": "Dr. Adrianna Qiao integrates advanced stem cell therapies with TCM rejuvenation techniques for cellular health, fertility, and hormonal balance.",
    "visionary-deng-title": "Translation, Sound Therapy & Patient Support",
    "visionary-deng-desc": "Deng Nanjing translates Master Xu's consultations and diagnostic findings into German, English, and Italian. She also facilitates sound therapy sessions, tea ceremonies, and supports guests with all organizational needs during their stay.",
    "visionary-deng-spec": "Translation, Sound Therapy & Patient Support",
    "team-grid-title": "Our Specialized Team",
    "doctor-2-name": "Dr. Zhang Min (张敏)",
    "doctor-2-spec": "Specialist in Gynecological Disorders, Hormonal Imbalances & Advanced Endometriosis Therapy.",
    "doctor-3-name": "Dr. Chen Wei (陈伟)",
    "doctor-3-spec": "Acupuncture Specialist, Chronic Pain Management, Burnout Therapy & Nervous System Regulation.",
    "doctor-sound-name": "Mingli Cheung",
    "doctor-sound-spec": "Lead Sound Healer & Vibration Therapist, coordinating energy realignment and emotional release.",

    // Specialized Treatments
    "treatments-title": "Specialized Medical Fields",
    "treatments-subtitle": "Tailored, highly focused healing strategies for targeted recovery.",
    "treatment-1-title": "Endometriosis & Women's Health",
    "treatment-1-desc": "Custom herbal pastes, womb massage, and acupressure to dissolve blood stagnation and relieve chronic pain.",
    "treatment-2-title": "Stem Cell & Longevity",
    "treatment-2-desc": "Dr. Adrianna Qiao integrates advanced stem cell therapies with TCM rejuvenation techniques for cellular health.",
    "treatment-3-title": "Stress & Burnout Recovery",
    "treatment-3-desc": "Holistic relief for high-pressure lifestyles using pulse-guided acupuncture and relaxing sound frequencies.",
    
    // Modern Devices
    "devices-title": "Advanced Clinical Technology",
    "devices-subtitle": "Traditional diagnostic wisdom validated by high-end modern devices.",
    "device-1-name": "Infrared Thermal Imaging",
    "device-1-desc": "Maps body inflammation, circulation blockages, and meridian temperature patterns.",
    "device-2-name": "Bioresonance Frequency Scanner",
    "device-2-desc": "Analyzes cell energy fields to identify allergies, environmental toxins, and organ weakness.",
    "device-3-name": "Electro-Acupuncture Stimulator",
    "device-3-desc": "Delivers gentle microcurrents to traditional acupuncture points to double healing speed.",

    // Programs & Endometriosis calculator
    "programs-title": "Healing Programs & Training",
    "programs-subtitle": "From intensive teacher trainings to customized personal recovery retreats.",
    
    "retreat-10day-title": "10-Day Teacher Training & Retreat",
    "retreat-10day-date": "October 10th - October 20th, 2026",
    "retreat-10day-desc": "A complete immersion in TCM theory and practice. 5 days of clinical observation in Shenzhen under Master Xu, followed by 5 days of Daoist lifestyle integration in the Wudang Mountains. Limited to 12 participants.",
    "retreat-10day-price": "From €3,900 (Early Bird)",
    
    "retreat-1day-title": "1-Day Shenzhen Local Programs",
    "retreat-1day-desc": "Focused local masterclasses. Perfect for nearby practitioners wishing to experience direct clinic shadowing, pulse diagnostic introduction, and herbal kitchen preparation.",
    "retreat-1day-price": "€250 per session",
    
    "endo-program-title": "Endometriosis Healing Program",
    "endo-program-desc": "A dedicated, fully customizable program addressing uterine health, hormone balance, and pain relief. Features customized herbal formulas (which you can take home as powder or paste), womb massage, sound healing, and direct doctor guidance.",
    "endo-select-duration": "Select Program Duration:",
    "duration-1w": "1 Week",
    "duration-2w": "2 Weeks",
    "duration-4w": "4 Weeks",
    "package-basic": "Outpatient (No Boarding)",
    "package-premium": "Premium Retreat (With Luxury Hotel & TCM Kitchen)",
    "endo-included-title": "What's Included:",
    "endo-price-note": "*Note: Prices exclude individually prescribed customized herbal medicines to take home.",

    // Yunnan Retreat
    "yunnan-title": "Yunnan 3-Day Nature Extension",
    "yunnan-subtitle": "A mystical transition from the city clinic into pristine mountain elements.",
    "yunnan-desc-1": "Extend your clinical program with a 3-day spiritual retreat in Yunnan. After starting with 3-4 days of intensive diagnosis and detox treatments at our Shenzhen clinic, you travel directly into the mountains.",
    "yunnan-desc-2": "Live together in a luxurious partner hotel nestled in nature, featuring a beautiful pool, organic mountain cuisine, mushroom foraging expeditions, local tea culture experiences, and ethnic minority musical heritage.",
    "yunnan-hotel-info": "Partner Hotel: Yunnan Horizon Sanctuary - a high-end luxury mountain eco-retreat with traditional wood architecture and panoramic views.",

    // Child Space
    "child-title": "HongDao Child Space",
    "child-desc": "We believe family healing involves the youngest. Our clinic hosts a beautiful internal Children's Space, providing peaceful activities, kids TCM nutrition guidance, and regular public and internal events for families to connect.",

    // Clinic Info & FAQ
    "info-title": "Practical Clinic Information",
    "info-location-label": "Location & Access",
    "info-location-desc": "HongDao TCM Clinic, Shenzhen Nanshan District. Easily reachable via metro and highway.",
    "info-hours-label": "Opening Hours",
    "info-hours-desc": "Monday - Saturday: 09:00 - 18:00 (Appointments Required)",
    "info-payment-label": "Booking & Payment policy",
    "info-payment-desc": "Online booking is immediately available. Please note your booking is officially confirmed only upon receipt of your personalized confirmation email. Existing payment methods will be securely processed.",
    
    "faq-title": "Frequently Asked Questions",
    "faq-q1": "Are customized herbal medicines included in the program fee?",
    "faq-a1": "No. The customized herbal prescriptions, available as easy-to-take powder or paste formulas to take home, are billed separately based on individual diagnostic needs.",
    "faq-q2": "How is the Yunnan travel organized?",
    "faq-a2": "Our team coordinates the train/flight transfers from Shenzhen. The program covers the local partner hotel stay, guiding, and specified activities.",
    "faq-q3": "Can I bring my family?",
    "faq-a3": "Yes. Our HongDao Child Space offers family-friendly support and special weekend activities for children while parents undergo therapies.",

    // Contact
    "contact-title": "Begin Your Healing Journey",
    "contact-subtitle": "Contact us or apply directly for your customized program.",
    "contact-free-consult": "Book a Free 15-Min Consultation",
    "contact-free-desc": "Speak directly with Nanjing Deng to discuss your symptoms and select the ideal treatment path.",
    "contact-label-name": "Full Name",
    "contact-label-email": "Email Address",
    "contact-label-phone": "Phone Number",
    "contact-label-program": "Program of Interest",
    "contact-label-date": "Select Consultation Date (Wed & Sat)",
    "contact-label-slot": "Select Time Slot (Chinese Time 14:00 - 20:00)",
    "contact-label-message": "Brief Medical History / Notes",
    "contact-submit-btn": "Apply Now",
    "contact-submit-email": "Apply via Email",
    "contact-submit-whatsapp": "Apply via WhatsApp",
    "contact-social-text": "Connect with us on Social Media for daily health tips, sound circles and tea recipes:",
    "whatsapp-text": "Chat on WhatsApp",
    "instagram-text": "Instagram: nanjing_tea.sound",

    // Interactive Booking Toast/Confirm
    "booking-success-toast": "Application submitted! Check your email inbox for confirmation.",
    
    // Marketing Popup
    "popup-title": "Exclusive Healing Offer",
    "popup-desc": "Embrace a gentle spiritual transformation. Apply today for our Endometriosis Programs or the Wudang Retreat and receive 10% off your initial clinical diagnosis session.",
    "popup-code-label": "Your Exclusive Application Code:",
    "popup-cta": "Apply with Code",

    // Fungal Medicine & Resources
    "treatment-4-badge": "Mycology",
    "treatment-4-title": "Fungal Medicine & Mycelial Regulation",
    "treatment-4-desc": "Unblocking membranous pathways (膜络) using medical macrofungi (Poria, Reishi, Cordyceps). Supports regression of breast and thyroid nodules and regulates the vegetative nervous system.",
    "nav-resources": "Resources",
    "resources-tag": "Knowledge & Downloads",
    "resources-title": "Clinic Manuals & Science",
    "resources-subtitle": "Download official manuals of our clinical devices and deepen your understanding of our treatment systems.",
    "wisdom-tag": "WeChat Wisdom & Clinical Practice",
    "wisdom-title": "The Wisdom of Fungal Medicine: From Soil to Membrane",
    "wisdom-text": "<p style=\"margin-bottom: 1rem;\">Beneath the earth lies a neural network – the 'Wood Wide Web'. Just like this planetary immune system, mushrooms work in our bodies through symbiosis and regulation. They connect with our '膜络' (membranous collaterals) to clear blockages, transform dampness, and resolve nodules (cysts, fibroids, thyroid nodules).</p><p>In our clinical practice, we combine these natural laws with modern care. Read the full scientific report by Dr. Zhang Hailing and Dr. Chen Kainan.</p>",
    "wisdom-link": "Read Original Article (WeChat)",
    "cases-title": "Clinical Case Studies",
    "case-1": "<strong>Case 1 (Thyroid Nodules, 2.1cm):</strong> Complete symptom relief and nodule regression to 0.9cm after 3 months of Poria & Ganoderma therapy.",
    "case-2": "<strong>Case 2 (Breast Hyperplasia & Anxiety):</strong> Dispersal of breast nodules (1.6cm) and relief of palpitations/insomnia through mycelial regulation.",
    "download-program-brochure": "Download Retreat Book (PDF)",
    "manuals-grid-title": "Medical Device Manuals & Brochures",
    "pdf-1-title": "Spectrum Treatment Device 2.0",
    "pdf-1-desc": "Detailed clinical manual on thermal spectrum light therapy for cellular rejuvenation and meridian warming.",
    "pdf-2-title": "Pian-Stone Medium-Frequency Pot 2.0",
    "pdf-2-desc": "Operation manual and applications of the warm Pian-stone electrotherapy device for meridian massage.",
    "pdf-3-title": "Infrared Thermal Imaging 4.0",
    "pdf-3-desc": "Guide to infrared thermographic diagnostics for visualizing inflammation and microcirculation patterns.",
    "pdf-4-title": "铺灸 / Pu Jiu Moxibustion Manual 3.1",
    "pdf-4-desc": "Clinical protocols for spine moxibustion (Pu Jiu) to expel deep body cold and nourish Yang vitality.",
    "pdf-5-title": "Frequency Hyperthermia Cabin 3.5",
    "pdf-5-desc": "Therapeutic manual for the clinical hyperthermia cabin, optimizing cellular detox and metabolic fire.",
    "pdf-6-title": "Dao-Pilz-Retreat Program Guide",
    "pdf-6-desc": "Full program details and daily schedules for the Daoist Mushroom Retreat in the Wudang Mountains.",
    "pdf-download-btn": "Download PDF",
    "treatment-1-badge": "Gynecology",
    "treatment-2-badge": "Cell Therapy",
    "treatment-3-badge": "Neurology",
    "nav-tech-btn": "TCM Technology",
    "tech-modal-title": "Clinical Technology & Therapy Methods",
    "tech-download-manual": "Download Manual (PDF)",
    "tech-device-2-title": "Bian Stone Electro-Frequency Therapy",
    "tech-device-2-long-desc": "Combines Bian stone physical properties with target electrical frequencies to stimulate cellular metabolism and relieve muscle-skeletal tension.",
    "tech-device-3-title": "Large-Scale Moxibustion (Pu Jiu)",
    "tech-device-3-long-desc": "A thermal therapy applied over large body zones (such as the back) burning mugwort to warm the meridians, boost Yang energy, and regulate immunological response.",
    "tech-device-4-title": "Whole-Body Spectrum Cabin",
    "tech-device-4-long-desc": "Utilizes a broad electromagnetic wavelength spectrum to warm body tissues. Promotes peripheral microcirculation, supports cellular drainage, and alleviates chronic muscle stiffness.",
    "tech-device-5-title": "Localized Spectrum treatment radiator",
    "tech-device-5-long-desc": "Targeted spectrum radiation simulating natural body emission frequencies to stimulate tissue regeneration, local metabolism, and complement classical acupuncture treatments.",
    "download-brochure-btn": "Download Brochure (PDF)",
    "gallery-title": "Impressions from our last Retreat 2025",
    "gallery-subtitle": "Photos and moments of group training, meditations, and nature experiences.",
    "gallery-item-group-badge": "Group",
    "gallery-item-group-title": "Retreat Group 2025",
    "gallery-item-meditation-badge": "Meditation",
    "gallery-item-meditation-title": "Sound Meditation",
    "gallery-item-qigong-badge": "Qi Gong",
    "gallery-item-qigong-title": "Morning Qi Gong",
    "gallery-item-tea-badge": "Ceremony",
    "gallery-item-tea-title": "Tea Ceremony",
    "gallery-item-lecture-badge": "Lecture",
    "gallery-item-lecture-title": "Pulse Diagnosis",
    "gallery-item-nature-badge": "Nature",
    "gallery-item-nature-title": "Hiking & Herbs",
    "gallery-item-practice-badge": "Practice",
    "gallery-item-practice-title": "Moxa Training",
    "gallery-item-kitchen-badge": "Nutrition",
    "gallery-item-kitchen-title": "Healing Kitchen",
    "gallery-item-soundbath-badge": "Sound Bath",
    "gallery-item-soundbath-title": "Nature Sound Bath",
    "btn-read-article": "Read Article",
    "endo-read-approach": "Treatment Approach & Case Studies"
  },
  de: {
    // Navigation
    "nav-home": "Startseite",
    "nav-about": "Über uns & Meister",
    "nav-treatments": "Behandlungen",
    "nav-devices": "Medizintechnik",
    "nav-programs": "Programme",
    "nav-retreat": "Yunnan-Retreat",
    "nav-info": "Klinik-Info",
       // Hero Section
    "hero-tag": "Traditionelle Chinesische Medizin trifft moderne Medizintechnik",
    "hero-title": "Traditionelle Chinesische Medizin & Klinische Diagnostik",
    "hero-desc": "Erfahren Sie wirksame Begleitung unter der Leitung von TCM-Meister Xu Ruqi. Wir verbinden die klassische Kräuterheilkunde und Pulsdiagnose mit modernen klinischen Messverfahren für Ihre Gesundheit und Regeneration.",
    "hero-cta-apply": "Jetzt bewerben",
    "hero-cta-more": "Programme entdecken",

    // Introduction / Philosophy
    "intro-title": "TCM-Erfahrung trifft auf moderne Medizintechnik",
    "intro-desc": "Unsere Shenzhen-Praxis verbindet jahrzehntelange Erfahrung in der Pulsdiagnostik und Kräutertherapie mit klinischen Untersuchungsgeräten, begleitender Klangtherapie und Ernährungsberatung. Wir bieten eine strukturierte Betreuung für Patientinnen und Patienten mit Endometriose, hormonellen Störungen, Erschöpfungssyndrom und chronischem Stress.",

    // Masters & Team
    "team-title": "Hüter der Tradition & Spezialisierte Heiler",
    "team-subtitle": "Lernen Sie unser engagiertes Team kennen, das Brücken zwischen Tradition und moderner Genesung schlägt.",
    "master-xu-title": "Chefarzt & TCM-Meister",
    "master-xu-desc": "Meister Xu Ruqi verfügt über mehr als 40 Jahre Erfahrung in Pulsdiagnostik und klassischer Kräutermedizin. Als klinischer Experte an der Pekinger Universität für Chinesische Medizin ist er weltweit bekannt für die Behandlung schwerer chronischer Krankheiten, Tumoren und gynäkologischer Leiden.",
    "doctor-1-title": "Spezialisierte Ärztin & Stammzelltherapie",
    "doctor-1-name": "Dr. Jingwen Qiao (乔建文)",
    "doctor-1-desc": "Dr. Jingwen Qiao verbindet moderne Diagnostik mit klassischer Kräuterheilkunde und Becken-Moxibustion bei Schmerz- und Hormonleiden.",
    "doctor-4-name": "Dr. Weina Guan (管蔚娜)",
    "doctor-4-spec": "Staatlich lizenzierte TCM-Ärztin. Spezialistin für Meridian-Entgiftung, Akupunktur und therapeutische Massagen.",
    "doctor-5-name": "Hailin Zhang (张海林)",
    "doctor-5-spec": "Leiter des Dekokt-Zentrums. Experte für traditionelle Kräuterzubereitung und Qualitätskontrolle.",
    "btn-read-bio": "Profil lesen",
    "decoction-subtitle": "Hauseigene Kräuter-Manufaktur",
    "decoction-title": "Modernes Dekokt-Zentrum & Dao Di Kräuter",
    "decoction-desc": "<p style=\"margin-bottom: 1.5rem;\">Wir beziehen ausschließlich hochwertige <strong>Dao Di Kräuter (道地藥材)</strong> aus kontrolliert biologischem Anbau und Soil-Technik aus den Herkunftsregionen, die für die jeweilige Pflanze die optimalen klimatischen und energetischen Bedingungen bieten.</p><p>In unserem hauseigenen Dekokt-Zentrum werden die Heilkräuter unter Aufsicht von Meister Xu individuell für Sie extrahiert, präzise verarbeitet und portioniert als <strong>gebrauchsfertige Kräuterdekokte (Ready-to-Drink)</strong> abgepackt, die Sie unkompliziert mit nach Hause nehmen können.</p>",
    "doctor-1-desc": "Dr. Adrianna Qiao kombiniert modernste Stammzelltherapie mit TCM-Rejuvenationstechniken für zelluläre Gesundheit, Fruchtbarkeit und hormonelle Balance.",
    "visionary-deng-title": "Übersetzung, Klangbegleitung & Patientenbetreuung",
    "visionary-deng-desc": "Deng Nanjing übersetzt die Konsultationen und Befunde von Meister Xu verlässlich ins Deutsche, Englische und Italienische. Begleitend leitet sie Klangsitzungen und Teezeremonien und unterstützt Sie bei allen organisatorischen Anliegen während Ihres Aufenthaltes.",
    "visionary-deng-spec": "Übersetzung, Klangbegleitung & Patientenbetreuung.",
    "team-grid-title": "Unser spezialisiertes Team",
    "doctor-2-name": "Dr. Zhang Min (张敏)",
    "doctor-2-spec": "Spezialistin für gynäkologische Erkrankungen, hormonelle Dysbalancen & Endometriose-Therapie.",
    "doctor-3-name": "Dr. Chen Wei (陈伟)",
    "doctor-3-spec": "Spezialist für Akupunktur, chronische Schmerztherapie, Burnout & vegetative Nervensystem-Regulation.",
    "doctor-sound-name": "Mingli Cheung",
    "doctor-sound-spec": "Klangheiler & Vibrationstherapeut, leitet die energetische Ausrichtung und emotionale Entlastung.",

    // Specialized Treatments
    "treatments-title": "Spezialisierte Fachbereiche",
    "treatments-subtitle": "Maßgeschneiderte Behandlungsstrategien für Ihre gezielte Genesung.",
    "treatment-1-title": "Endometriose & Frauengesundheit",
    "treatment-1-desc": "Individuelle Kräuterpasten, Womb-Massage (Gebärmutter-Massage) und Akupressur zur Lösung von Stagnationen und Schmerzlinderung.",
    "treatment-2-title": "Stammzellen & Langlebigkeit",
    "treatment-2-desc": "Dr. Adrianna Qiao kombiniert modernste Stammzelltherapie mit TCM-Rejuvenationstechniken für zelluläre Erneuerung.",
    "treatment-3-title": "Stress & Burnout-Prävention",
    "treatment-3-desc": "Ganzheitliche Begleitung bei Belastungszuständen durch pulsgeführte Akupunktur und begleitende Klangtherapie.",

    // Modern Devices
    "devices-title": "Klinische Medizintechnik",
    "devices-subtitle": "Traditionelle TCM-Diagnostik, präzisiert durch modernste klinische Geräte.",
    "device-1-name": "Infrarot-Thermografie",
    "device-1-desc": "Visualisiert Entzündungen, Durchblutungsstörungen und energetische Blockaden in den Meridianen.",
    "device-2-name": "Bioresonanz-Frequenzscanner",
    "device-2-desc": "Misst elektromagnetische Schwingungen der Zellen zur Erkennung von Belastungen, Toxinen und Organschwächen.",
    "device-3-name": "Elektro-Akupunktur-Gerät",
    "device-3-desc": "Unterstützt die klassische Nadelung durch präzise Mikroströme zur Anregung der Nervenregeneration.",

    // Programs & Endometriosis calculator
    "programs-title": "Heilungsprogramme & Kurse",
    "programs-subtitle": "Vom intensiven Ausbildungskurs bis zum maßgeschneiderten Therapieprogramm.",
    
    "retreat-10day-title": "10-tägiges TCM-Training & Retreat",
    "retreat-10day-date": "10. Oktober - 20. Oktober 2026",
    "retreat-10day-desc": "Komplette Immersion in TCM-Theorie & Praxis. 5 Tage klinische Hospitation in Shenzhen unter Meister Xu, gefolgt von 5 Tagen taoistischer Lebensführung in den Wudang-Bergen. Maximal 12 Teilnehmer.",
    "retreat-10day-price": "Ab €3.900,- (Frühbucher)",
    
    "retreat-1day-title": "1-tägige Programme (Shenzhen)",
    "retreat-1day-desc": "Lokale Tageskurse vor Ort. Ideal für Praktizierende für klinische Hospitationen, Pulsdiagnose-Einführung und Kräuterküchen-Zubereitung.",
    "retreat-1day-price": "€250,- pro Tag",
    
    "endo-program-title": "Endometriose-Heilprogramm",
    "endo-program-desc": "Ein spezialisiertes, 1-4 wöchiges Heilprogramm für Frauen, individuell anpassbar. Enthält Kräutermedizin (als Pulver oder Paste zum Mitnehmen), Womb-Massagen, Sound Healing, Ernährungsanalyse und langfristige Begleitung.",
    "endo-select-duration": "Programmdauer wählen:",
    "duration-1w": "1 Woche",
    "duration-2w": "2 Wochen",
    "duration-4w": "4 Wochen",
    "package-basic": "Ohne Unterkunft & Verpflegung (Ambulant)",
    "package-premium": "Premium (Inkl. Luxus-Boutique-Hotel & TCM-Küche)",
    "endo-included-title": "Inklusive Leistungen:",
    "endo-price-note": "*Hinweis: Alle Preise beinhalten keine individuell verschreibungspflichtige Kräutermedizin.",

    // Yunnan Retreat
    "yunnan-title": "3-tägiges Yunnan Natur-Retreat",
    "yunnan-subtitle": "Ein heilsamer Übergang von der Stadtklinik in die unberührte Natur.",
    "yunnan-desc-1": "Erweitern Sie Ihre Behandlung mit einem 3-tägigen Naturaufenthalt. Nach den ersten 3-4 Tagen Diagnose und Therapie in der Shenzhen-Klinik reisen Sie direkt in das malerische Yunnan.",
    "yunnan-desc-2": "Erleben Sie Gemeinschaft beim Pilze sammeln, entdecken Sie Teekultur und Minderheitenbräuche. Sie wohnen in einem luxuriösen Berghotel mit Pool, naturnah gelegen, mit exzellenter traditioneller chinesischer Küche.",
    "yunnan-hotel-info": "Partnerhotel: Yunnan Horizon Sanctuary - Luxuriöses Öko-Resort mit atemberaubendem Pool und traditioneller Holzbauweise inmitten der Berge.",

    // Child Space
    "child-title": "HongDao Kinderbereich",
    "child-desc": "Heilung betrifft die ganze Familie. Unsere Klinik bietet einen hauseigenen Kinderbereich (Child Space) mit kindgerechten Beschäftigungen, TCM-Ernährungsberatung und regelmäßigen öffentlichen & internen Events.",

    // Clinic Info & FAQ
    "info-title": "Klinikinformationen & Buchungsrichtlinien",
    "info-location-label": "Standort & Anfahrt",
    "info-location-desc": "HongDao TCM-Klinik, Nanshan District, Shenzhen. Gut angebunden an Metro und Autobahn.",
    "info-hours-label": "Öffnungszeiten",
    "info-hours-desc": "Montag - Samstag: 09:00 - 18:00 Uhr (Nur nach Terminvereinbarung)",
    "info-payment-label": "Buchung & Zahlungsablauf",
    "info-payment-desc": "Eine Online-Zahlung ist sofort möglich. Die Buchung gilt jedoch erst nach Erhalt der Bestätigungs-E-Mail als offiziell bestätigt. Die bereits hinterlegte Zahlungsmethode wird verwendet.",
    
    "faq-title": "Häufig gestellte Fragen (FAQ)",
    "faq-q1": "Sind die verschriebenen Kräuter im Preis inbegriffen?",
    "faq-a1": "Nein. Individuell verschriebene Kräuterarzneien (die als Pulver oder Paste mit nach Hause genommen werden können) werden je nach Diagnose und Bedarf separat abgerechnet.",
    "faq-q2": "Wie läuft der Transfer nach Yunnan ab?",
    "faq-a2": "Unser Klinikteam organisiert den Transfer per Bahn/Flug. Unterkunft im Partnerhotel sowie Aktivitäten vor Ort sind im Buchungspreis des Retreats enthalten.",
    "faq-q3": "Gibt es eine Kinderbetreuung vor Ort?",
    "faq-a3": "Ja. Unser hauseigener Kinderbereich bietet altersgerechte Programme und veranstaltet regelmäßige Familien-Events.",

    // Contact
    "contact-title": "Beginnen Sie Ihren Weg zur Heilung",
    "contact-subtitle": "Kontaktieren Sie uns oder bewerben Sie sich direkt für Ihr individuelles Heilprogramm.",
    "contact-free-consult": "15-minütiges kostenloses Beratungsgespräch buchen",
    "contact-free-desc": "Sprechen Sie direkt mit Nanjing Deng, um Ihre Beschwerden zu besprechen und das passende Programm zu finden.",
    "contact-label-name": "Name",
    "contact-label-email": "E-Mail-Adresse",
    "contact-label-phone": "Telefonnummer",
    "contact-label-program": "Gewünschtes Programm",
    "contact-label-date": "Datum des Beratungsgesprächs (Mittwoch / Samstag)",
    "contact-label-slot": "Uhrzeit wählen (Pekinger Ortszeit 14:00 - 20:00 Uhr)",
    "contact-label-message": "Kurze Anmerkung zu Ihren Beschwerden",
    "contact-submit-btn": "Jetzt bewerben",
    "contact-submit-email": "Per E-Mail bewerben",
    "contact-submit-whatsapp": "Per WhatsApp bewerben",
    "contact-social-text": "Folgen Sie uns in den sozialen Medien für Gesundheitstipps, Klangzirkel und Tee-Rituale:",
    "whatsapp-text": "Über WhatsApp chatten",
    "instagram-text": "Instagram: nanjing_tea.sound",

    // Interactive Booking Toast/Confirm
    "booking-success-toast": "Bewerbung erfolgreich gesendet! Eine Bestätigung wird an Ihre E-Mail gesendet.",
    
    // Marketing Popup
    "popup-title": "Exklusiver Rabattcode",
    "popup-desc": "Erhalten Sie eine sanfte, spirituelle Ermäßigung. Bewerben Sie sich noch heute für unsere Endometriose-Heilprogramme oder das Wudang-Retreat und erhalten Sie 10% Rabatt auf die erste Diagnose.",
    "popup-code-label": "Ihr persönlicher Rabattcode:",
    "popup-cta": "Code anwenden & bewerben",

    // Fungal Medicine & Resources
    "treatment-4-badge": "Pilzheilkunde",
    "treatment-4-title": "Pilzheilkunde & Myzel-Regulation",
    "treatment-4-desc": "Lösung von Blockaden in den Membranen (膜络) durch medizinale Großpilze (Poria, Reishi, Cordyceps) zur sanften Schrumpfung von Gewebeknoten und Regulation des Nervensystems.",
    "nav-resources": "Handbücher",
    "resources-tag": "Wissenschaft & Downloads",
    "resources-title": "Klinik-Handbücher & Forschung",
    "resources-subtitle": "Laden Sie offizielle Handbücher unserer Medizintechnik herunter und vertiefen Sie Ihr Wissen über unsere Behandlungssysteme.",
    "wisdom-tag": "WeChat-Wissenschaft & Klinische Praxis",
    "wisdom-title": "Die Weisheit der Pilzmedizin: Vom Erdboden zu den Membranen",
    "wisdom-text": "<p style=\"margin-bottom: 1rem;\">Unter der Erde erstreckt sich ein neuronales Netzwerk – das „Wood Wide Web“. Genau wie dieses planetare Immunsystem arbeiten Pilze in unserem Körper durch Symbiose und Regulation. Sie verbinden sich mit unseren „膜络“ (membranösen Kollateralen), um Blockaden zu lösen, Feuchtigkeit zu transformieren und Knoten (Zysten, Myome, Schilddrüsenknoten) aufzulösen.</p><p>In unserer klinischen Praxis verbinden wir diese Naturgesetze mit moderner Begleitung. Lesen Sie die vollständige wissenschaftliche Ausarbeitung von Dr. Zhang Hailing und Dr. Chen Kainan.</p>",
    "wisdom-link": "Original-Artikel lesen (WeChat)",
    "cases-title": "Klinische Fallstudien",
    "case-1": "<strong>Fall 1 (Schilddrüsenknoten, 2.1cm):</strong> Vollständige Symptomlinderung und Knotenschrumpfung auf 0.9cm nach 3 Monaten Therapie mit Poria & Reishi.",
    "case-2": "<strong>Fall 2 (Brustdrüsen-Hyperplasie & Angst):</strong> Auflösung von Brustknoten (1.6cm) und Linderung von Herzklopfen/Schlaflosigkeit durch Myzel-Regulation.",
    "download-program-brochure": "Retreat-Programmbuch herunterladen (PDF)",
    "manuals-grid-title": "Medizinische Geräte-Handbücher & Broschüren",
    "pdf-1-title": "Spektrum-Therapiegerät 2.0",
    "pdf-1-desc": "Detailliertes Handbuch zur thermischen Spektrallicht-Therapie zur Entgiftung und Meridianstärkung.",
    "pdf-2-title": "Pian-Stein Mittelfrequenz-Therapie",
    "pdf-2-desc": "Bedienungsanleitung und Anwendungsbereiche des warmen Pian-Stein-Behälters zur Meridian-Massage.",
    "pdf-3-title": "Infrarot-Thermografie 4.0",
    "pdf-3-desc": "Broschüre zur thermischen Bildgebung und Diagnostik von Durchblutung und Entzündungsherden.",
    "pdf-4-title": "铺灸 / Pu Jiu Handbuch 3.1",
    "pdf-4-desc": "Klinische Richtlinien zur Rücken-Moxibustion zur Beseitigung tiefer Kälte und Stärkung des Yang.",
    "pdf-5-title": "Frequenz-Hyperthermie-Kabine 3.5",
    "pdf-5-desc": "Bedienung und therapeutischer Nutzen der Ganzkörper-Wärmekabine zur Entgiftung und Immun-Aktivierung.",
    "pdf-6-title": "Dao-Pilz-Retreat Programm",
    "pdf-6-desc": "Exklusive Broschüre zum Retreat „Awakening and Transforming the Life Force“ in den Wudang-Bergen.",
    "pdf-download-btn": "PDF herunterladen",
    "treatment-1-badge": "Gynäkologie",
    "treatment-2-badge": "Zelltherapie",
    "treatment-3-badge": "Neurologie",
    "nav-tech-btn": "TCM-Technologie",
    "tech-modal-title": "Klinische Medizintechnik & Therapieverfahren",
    "tech-download-manual": "Handbuch herunterladen (PDF)",
    "tech-device-2-title": "Bian-Stein Mittelfrequenz-Elektrotherapie",
    "tech-device-2-long-desc": "Verbindet Akupressur-Punkte mit gezielten Frequenzen zur Anregung des Zellstoffwechsels und zur Entlastung des Muskel-Skelett-Systems. Stimuliert blockierte Leitbahnen (Meridiane) mittels biologischer Frequenzen.",
    "tech-device-3-title": "Großflächen-Moxibustion (铺灸 - Pu Jiu)",
    "tech-device-3-long-desc": "Eine Wärmetherapie auf großen Körperflächen (wie dem Rücken), bei der Beifußkraut gezielt verbrannt wird, um Kälte aus den Leitbahnen zu vertreiben, die Yang-Energie zu stärken und das Immunsystem zu regulieren.",
    "tech-device-4-title": "Ganzkörper-Spektralkabine",
    "tech-device-4-long-desc": "Nutzt ein breites elektromagnetisches Frequenzspektrum zur Erwärmung des Gewebes. Fördert die periphere Mikrozirkulation, unterstützt die zelluläre Ausleitung und lindert chronische Muskelverspannungen.",
    "tech-device-5-title": "Lokalisiertes Spektral-Bestrahlungsgerät",
    "tech-device-5-long-desc": "Gezielter Spektralstrahler zur lokalen Bestrahlung. Fördert die Geweberegeneration, regt lokale Stoffwechselprozesse an und wird komplementär zu Akupunktur- und Moxa-Sitzungen eingesetzt.",
    "download-brochure-btn": "Broschüre herunterladen (PDF)",
    "gallery-title": "Impressionen aus unserem letzten Retreat 2025",
    "gallery-subtitle": "Bilder und Momente des gemeinsamen Trainings, der Meditationen und Naturerfahrungen.",
    "gallery-item-group-badge": "Gruppe",
    "gallery-item-group-title": "Retreatgruppe 2025",
    "gallery-item-meditation-badge": "Meditation",
    "gallery-item-meditation-title": "Klangmeditation",
    "gallery-item-qigong-badge": "Qi Gong",
    "gallery-item-qigong-title": "Morgen Qi Gong",
    "gallery-item-tea-badge": "Zeremonie",
    "gallery-item-tea-title": "Tee-Zeremonie",
    "gallery-item-lecture-badge": "Theorie",
    "gallery-item-lecture-title": "Pulsdiagnose",
    "gallery-item-nature-badge": "Natur",
    "gallery-item-nature-title": "Wandern & Kräuter",
    "gallery-item-practice-badge": "Praxis",
    "gallery-item-practice-title": "Moxa-Training",
    "gallery-item-kitchen-badge": "Ernährung",
    "gallery-item-kitchen-title": "Heilküche",
    "gallery-item-soundbath-badge": "Klangbad",
    "gallery-item-soundbath-title": "Klangbad in Natur",
    "btn-read-article": "Artikel lesen",
    "endo-read-approach": "Behandlungsansatz & Fallbeispiele"
  }
};

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

// Global App State
let currentLang = 'de'; // Default to German
let selectedDuration = '2w'; // Default to 2 weeks
let selectedTier = 'premium'; // Default to Premium Retreat

// Init Functions
document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initEndometriosisCalculator();
  initBookingSlots();
  initFaq();
  initNavbarScroll();
  initMarketingPopup();
  initBookingModal();
  initTechModal();
  initLightbox();
});

// 1. Language switcher logic
function initLanguage() {
  const deBtn = document.getElementById("lang-de");
  const enBtn = document.getElementById("lang-en");
  
  if (deBtn && enBtn) {
    deBtn.addEventListener("click", () => setLanguage('de'));
    enBtn.addEventListener("click", () => setLanguage('en'));
  }
  
  // Set initial language
  setLanguage(currentLang);
}

function setLanguage(lang) {
  currentLang = lang;
  
  // Update toggle buttons active class
  document.getElementById("lang-de").classList.toggle("active", lang === 'de');
  document.getElementById("lang-en").classList.toggle("active", lang === 'en');
  
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
    en: { "1w": "1 Week Program", "2w": "2 Weeks Program", "4w": "4 Weeks Program" },
    de: { "1w": "1 Woche Programm", "2w": "2 Wochen Programm", "4w": "4 Wochen Programm" }
  };
  descEl.textContent = periodText[currentLang][selectedDuration];

  // Render Features list
  featuresList.innerHTML = "";
  const features = currentData.features[currentLang];
  features.forEach(feat => {
    const li = document.createElement("li");
    li.textContent = feat;
    featuresList.appendChild(li);
  });
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

    const cetTime = getCETTime(selectedDate, selectedSlot);
    const timeDisplay = cetTime ? `${selectedSlot} (CST) / ${cetTime}` : `${selectedSlot} (CST)`;

    if (method === 'email') {
      let mailSubject = "";
      let mailBody = "";
      if (currentLang === 'de') {
        mailSubject = `HongDao TCM Anmeldung - ${name}`;
        mailBody = `Hallo Nanjing,\n\nich möchte ein kostenloses 15-minütiges Beratungsgespräch buchen.\n\nHier sind meine Details:\n\n- Name: ${name}\n- E-Mail: ${email}\n- Telefon: ${phone}\n- Gewünschtes Programm: ${programText}\n- Datum: ${selectedDate}\n- Uhrzeit: ${timeDisplay}\n\nAnmerkung/Beschwerden:\n${message}\n\nVielen Dank!`;
      } else {
        mailSubject = `HongDao TCM Consultation Booking - ${name}`;
        mailBody = `Hello Nanjing,\n\nI would like to book a free 15-minute consultation.\n\nHere are my details:\n\n- Name: ${name}\n- Email: ${email}\n- Phone: ${phone}\n- Program: ${programText}\n- Date: ${selectedDate}\n- Time: ${timeDisplay}\n\nMessage/Symptoms:\n${message}\n\nThank you!`;
      }

      openEmailDispatchModal(mailSubject, mailBody);
      closeModal();
      
      // Reset form
      if (form) form.reset();
      selectedDate = null;
      selectedSlot = null;
      const slotsContainer = document.getElementById("slots-container");
      if (slotsContainer) slotsContainer.innerHTML = "";
    } else {
      // WhatsApp
      let waText = "";
      if (currentLang === 'de') {
        waText = `Hallo Nanjing,\n\nich möchte ein kostenloses 15-minütiges Beratungsgespräch buchen.\n\nHier sind meine Details:\n- *Name*: ${name}\n- *E-Mail*: ${email}\n- *Telefon*: ${phone}\n- *Gewünschtes Programm*: ${programText}\n- *Datum*: ${selectedDate}\n- *Uhrzeit*: ${timeDisplay}\n- *Anmerkung*: ${message}\n\nVielen Dank!`;
      } else {
        waText = `Hello Nanjing,\n\nI would like to book a free 15-minute consultation.\n\nHere are my details:\n- *Name*: ${name}\n- *Email*: ${email}\n- *Phone*: ${phone}\n- *Program*: ${programText}\n- *Date*: ${selectedDate}\n- *Time*: ${timeDisplay}\n- *Message*: ${message}\n\nThank you!`;
      }

      const encodedText = encodeURIComponent(waText);
      const waUrl = `https://wa.me/5219841408335?text=${encodedText}`;
      window.open(waUrl, '_blank');

      // Show success toast on screen
      showBookingToast();
      closeModal();
      
      // Reset form
      if (form) form.reset();
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
  xu: {
    de: {
      title: "Master Xu Ruqi – Chefarzt & Leitender TCM-Experte",
      body: `
        <p><strong>Master Xu Ruqi (徐汝奇)</strong> verfügt über mehr als 40 Jahre klinische Erfahrung in klassischer chinesischer Medizin und fortgeschrittener Pulsdiagnostik. Er gilt weltweit als herausragende Kapazität auf dem Gebiet der Behandlung schwerer chronischer Leiden.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Spezialgebiete & Heilerfolge</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Gynäkologische Schmerzsyndrome</strong>: Herausragende Heilerfolge bei chronischer Endometriose, Schokoladenzysten (Endometriomen) und schwerer Dysmenorrhö allein durch pflanzliche Therapien.</li>
          <li><strong>Onkologische Begleitung & Tumore</strong>: Ganzheitliche Unterstützung bei Krebserkrankungen, Linderung von Nebenwirkungen der Chemotherapie und Stabilisierung der Lebensenergie (Qi).</li>
          <li><strong>Knoten- und Zystenauflösung</strong>: Erfolgreiche Rückbildung von Schilddrüsenknoten, Brustdrüsen-Hyperplasien und inneren Zysten mittels klassischer Rezepturen.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Akademische Lehre</h4>
        <p style="margin-bottom: 1rem;">Ehemaliger leitender Dozent und klinischer Ausbilder an der renommierten <strong>Pekinger Universität für Chinesische Medizin (BUCM)</strong>. Er hat Generationen von TCM-Ärzten ausgebildet und leitet heute die pharmakologische Entwicklung im Hongdao-Zentrum.</p>
      `
    },
    en: {
      title: "Master Xu Ruqi – Chief Physician & Senior TCM Master",
      body: `
        <p><strong>Master Xu Ruqi (徐汝奇)</strong> has over 40 years of clinical experience in classical Chinese medicine and advanced pulse diagnostics. He is globally recognized as an authority in treating severe chronic and gynecological disorders.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Specialties & Track Record</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Gynecological Pain Syndromes</strong>: High success rates in resolving severe endometriosis, chocolate cysts, and dysmenorrhea using purely customized herbal medicine.</li>
          <li><strong>Oncology Support & Tumors</strong>: Integrative support for cancer patients, reducing chemo-induced toxicity, and boosting immune cell counts.</li>
          <li><strong>Nodule & Cyst Regression</strong>: Proven clinical track record in shrinking thyroid nodules, breast hyperplasia, and ovarian cysts.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Academic Credentials</h4>
        <p style="margin-bottom: 1rem;">Former senior lecturer and clinical director at the prestigious <strong>Beijing University of Chinese Medicine (BUCM)</strong>. He directs the pharmacological quality and compounding center at Hongdao.</p>
      `
    }
  },
  nanjing: {
    de: {
      title: "Deng Nanjing – Gründerin & Klangtherapeutin",
      body: `
        <p><strong>Deng Nanjing (邓楠景)</strong> ist die visionäre Gründerin des Lebensfluss Inner Retreats und des Hongdao-Zentrums. Sie verbindet authentische östliche Philosophie mit westlichen Konzepten der Stressregulation.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Heilungs- & Therapieansatz</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Akkreditierte Klangtherapie</strong>: Tiefenwirkung mittels nepalesischer Klangschalen, Frequenz-Gongs und Stimmgabeln zur Wiederherstellung der zellulären Harmonie.</li>
          <li><strong>Vegetative Regulation</strong>: Neuromodulation und Vagusnerv-Stimulation bei Burnout, depressiven Verstimmungen und emotionalen Blockaden.</li>
          <li><strong>Sensorische Kräuterpädagogik</strong>: Leitung von Teezeremonien und Kräuter-Malworkshops für Kinder und Familien zur Stärkung der emotionalen Wahrnehmung.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Ausbildung & Veröffentlichungen</h4>
        <p style="margin-bottom: 1rem;">Zertifizierte internationale Klangtherapeutin und Meditationsleiterin. Sie hat mehrere erfolgreiche Artikel über die Resonanzfähigkeit von Körperflüssigkeiten und die Wirkung von 432-Hz-Frequenzen publiziert.</p>
      `
    },
    en: {
      title: "Deng Nanjing – Founder & International Sound Therapist",
      body: `
        <p><strong>Deng Nanjing (邓楠景)</strong> is the visionary founder of the Lebensfluss Inner Retreat and the Hongdao Center. She bridges classical Eastern healing arts with modern neuro-vibrational therapy.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Therapeutic Focus</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Vibrational Sound Therapy</strong>: Utilizing gongs, singing bowls, and tuning forks to induce cellular resonance and deep meditation.</li>
          <li><strong>Autonomic Balance</strong>: Regulating the vagus nerve to alleviate chronic anxiety, depression, and adrenal exhaustion.</li>
          <li><strong>Parent-Child Sensory Workshops</strong>: Creative direction of tea ceremonies and botanical painting classes to nurture emotional mindfulness.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Background</h4>
        <p style="margin-bottom: 1rem;">Certified Sound Healing Practitioner and Tea Master. She is dedicated to translating ancient vibrational principles into accessible modern therapies.</p>
      `
    }
  },
  zhang: {
    de: {
      title: "Dr. Zhang Min – Spezialistin für Gynäkologie & Akupunktur",
      body: `
        <p><strong>Dr. Zhang Min (张敏)</strong> ist eine erfahrene TCM-Ärztin mit über 15 Jahren klinischer Praxis in der Gynäkologie und gynäkologischen Endokrinologie.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Schwerpunkte</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Hormonelle Balance</strong>: Erfolgreiche Regulierung bei unregelmäßigem Zyklus, Amenorrhö und Wechseljahresbeschwerden.</li>
          <li><strong>Endometriose & Fruchtbarkeit</strong>: Kombination aus gezielter Akupunktur und wärmenden Kräuterwickeln zur Schmerzlinderung und Förderung des Kinderwunsches.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinischer Weg</h4>
        <p style="margin-bottom: 1rem;">Studium an der Guangzhou Universität für TCM. Sie leitete langjährig gynäkologische TCM-Forschungsprojekte zur natürlichen Empfängnishilfe.</p>
      `
    },
    en: {
      title: "Dr. Zhang Min – Specialist in Gynecology & Acupuncture",
      body: `
        <p><strong>Dr. Zhang Min (张敏)</strong> is a veteran TCM physician with 15+ years of clinical specialization in natural gynecology and endocrinology.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Specialties</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Hormonal Regulation</strong>: Restoring cycle regularity, treating amenorrhea, and reducing menopause discomfort.</li>
          <li><strong>Endometriosis & Fertility</strong>: Applying specialized abdominal acupuncture and herbal moxibustion to dissolve blockages and boost natural conception.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Background</h4>
        <p style="margin-bottom: 1rem;">Graduate of Guangzhou University of TCM, with numerous peer-reviewed studies on non-hormonal cycle regulation.</p>
      `
    }
  },
  chen: {
    de: {
      title: "Dr. Chen Wei – Experte für Neurologie & Akupunktur",
      body: `
        <p><strong>Dr. Chen Wei (陈伟)</strong> ist unser Spezialist für Akupunktur, Elektro-Akupunktur und die Wiederherstellung der vegetativen Nervenbalance.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Schwerpunkte</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Chronische Schmerztherapie</strong>: Linderung bei Migräne, Ischialgie, Bandscheibenvorfällen und myofaszialen Schmerzen.</li>
          <li><strong>Burnout & Stressfolgen</strong>: Vegetative Regulation zur Absenkung des Sympathikus-Tonus und Linderung chronischer Schlafstörungen.</li>
        </ul>
      `
    },
    en: {
      title: "Dr. Chen Wei – Expert in Neurological Acupuncture",
      body: `
        <p><strong>Dr. Chen Wei (陈伟)</strong> is our lead acupuncture expert specializing in neurological pain management and autonomic balance.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Specialties</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Chronic Pain Care</strong>: Treatment of severe migraines, sciatica, herniated discs, and structural back pain.</li>
          <li><strong>Nervous System Recovery</strong>: Restoring parasympathetic balance for patients suffering from insomnia, anxiety, and adrenal exhaustion.</li>
        </ul>
      `
    }
  },
  hailin: {
    de: {
      title: "Hailin Zhang – Leiter des Dekokt-Zentrums",
      body: `
        <p><strong>Hailin Zhang (张海林)</strong> leitet unser hochmodernes Dekokt-Zentrum und garantiert die authentische Weiterverarbeitung der Rohkräuter.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Verantwortungsbereich</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Dao Di Qualitätsprüfung</strong>: Identifikation und Qualitätskontrolle aller importierten biologischen Rohkräuter.</li>
          <li><strong>Wissenschaftliche Extraktion</strong>: Überwachung der Kochzeiten und Temperatureinstellungen zur optimalen Wirkstofffreisetzung.</li>
        </ul>
      `
    },
    en: {
      title: "Hailin Zhang – Head of Decoction Center",
      body: `
        <p><strong>Hailin Zhang (张海林)</strong> manages our state-of-the-art decoction facility, ensuring accurate and pristine herbal compounding.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Responsibilities</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Dao Di Herb Sourcing</strong>: Rigorous authentication of raw materials based on regional ecological origins.</li>
          <li><strong>Extraction Precision</strong>: Controlling heat, pressure, and extraction duration to deliver pristine, sterile Ready-to-Drink packages.</li>
        </ul>
      `
    }
  },
  cheung: {
    de: {
      title: "Mingli Cheung – Klangtherapeut & Meridianheiler",
      body: `
        <p><strong>Mingli Cheung</strong> ist ein erfahrener Meister der Klangtherapie und bringt energetische Blockaden durch physische Schwingung wieder ins Fließen.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Methoden</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Klangschalen-Massage</strong>: Lokale Platzierung von tibetischen Klangschalen auf Meridian-Punkten zur Freisetzung von Stagnationen.</li>
          <li><strong>Gong-Bäder</strong>: Tiefe akustische Entspannung zur Linderung von Traumata und emotionalem Stress.</li>
        </ul>
      `
    },
    en: {
      title: "Mingli Cheung – Sound Therapist & Meridian Healer",
      body: `
        <p><strong>Mingli Cheung</strong> is a practitioner of sound vibration therapies, using frequency tools to stimulate energy channels and dissolve physical blocks.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Modilities</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Singing Bowl Meridian Therapy</strong>: Placing authentic bowls on acupoints to release energy blockages.</li>
          <li><strong>Acoustic Gong Journeys</strong>: Guiding patients through deep restorative soundscapes to soothe nervous tension.</li>
        </ul>
      `
    }
  },
  qiao: {
    de: {
      title: "Dr. Jingwen Qiao – Gynäkologie, Stoffwechsel & Schmerztherapie",
      body: `
        <p><strong>Dr. Jingwen (Adrianna) Qiao (乔建文)</strong> ist Co-Gründerin des Hongdao Zentrums für Kräuterausleitung und eine führende Expertin im Bereich der integrierten chinesischen Gynäkologie und der modernen myofaszialen Schmerztherapie.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Spezialgebiete (Focus Areas)</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Stoffwechsel- & Metabolische Erkrankungen</strong>: Ganzheitliche Regulation bei Diabetes, Fettstoffwechselstörungen, Bluthochdruck und Fettleibigkeit.</li>
          <li><strong>Hormonelle & Gynäkologische Leiden</strong>: Spezialisierte Behandlung von Endometriose, extremen Regelschmerzen (Dysmenorrhö), PCOS (Polycystisches Ovarialsyndrom), vorzeitiger Ovarialinsuffizienz und Brustdrüsen-Hyperplasie.</li>
          <li><strong>Neurologische & Psychosomatische Störungen</strong>: Chronische Kopfschmerzen, Migräne, Angststörungen, Schlafstörungen und stressbedingte Erschöpfung.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Akademischer Hintergrund & Biografie</h4>
        <p style="margin-bottom: 1rem;">Bachelor-Abschluss an der renommierten <strong>Fudan-Universität</strong> und staatlich geprüfte und lizenzierte TCM-Ärztin. Sie leitet die wissenschaftliche Rehabilitation am Hongdao TCM-Forschungszentrum.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Erfahrung & Forschung</h4>
        <p style="margin-bottom: 1rem;">Mit über 10 Jahren praktischer Erfahrung hat Dr. Qiao das System der „Universal-Schmerztherapie“ (万向治痛法) mitentwickelt. Ihre wissenschaftliche Arbeit umfasst die Beteiligung an großen staatlichen Forschungsprojekten der chinesischen Regierung (wie <em>Science & Technology Innovation 2030</em>) sowie akademische Kooperationen und Vorträge an internationalen Spitzenuniversitäten wie Oxford und Harvard. Sie hat über 10 Fachaufsätze und Patente veröffentlicht.</p>
      `
    },
    en: {
      title: "Dr. Jingwen Qiao – Gynecology, Metabolism & Pain Therapy",
      body: `
        <p><strong>Dr. Jingwen (Adrianna) Qiao (乔建文)</strong> is a co-founder of the Hongdao External Therapy Center and a leading expert in integrated Chinese gynecology and modern myofascial pain management.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Specialties & Focus Areas</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Metabolic Disorders</strong>: Comprehensive management of diabetes, hyperlipidemia, hypertension, and clinical obesity.</li>
          <li><strong>Hormonal & Gynecological Diseases</strong>: Specializing in endometriosis care, severe dysmenorrhea, PCOS, premature ovarian failure, and breast hyperplasia.</li>
          <li><strong>Neurological & Mood Disorders</strong>: Chronic migraines, anxiety, depression, insomnia, and burnout syndrome.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Biography & Education</h4>
        <p style="margin-bottom: 1rem;">B.Sc. graduate from <strong>Fudan University</strong> and a licensed national TCM physician. She serves as the Chief Academic Leader at the Hongdao Medical Rehabilitation Center.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Experience & Research</h4>
        <p style="margin-bottom: 1rem;">With over 10 years of clinical and academic experience, Dr. Qiao is the co-developer of the "Universal Pain Relief Method" (万向治痛法). She has spearheaded national research projects under the China State Key R&D Programs, presented her research at Harvard and Oxford, and holds over 10 published medical papers and patents.</p>
      `
    }
  },
  guan: {
    de: {
      title: "Dr. Weina Guan – Akupunktur & Faszientherapie",
      body: `
        <p><strong>Dr. Weina Guan (管蔚娜)</strong> ist stellvertretende Leiterin des Zentrums für technologiegestützte chinesische Medizin und Expertin für energetische Entgiftung und Meridian-Therapie.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Spezialgebiete (Focus Areas)</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Urogenitale & Gynäkologische Leiden</strong>: Behandlung von chronischer Prostatitis, Inkontinenz, Blasenentzündungen, Menstruationsstörungen, Myomen und Zysten.</li>
          <li><strong>Meridian-Entgiftung & Akupunktur</strong>: Anwendung traditioneller Reizverfahren (Akupunktur, Gua Sha, Moxa und Schröpfen) zur Ausleitung zellulärer Schlacken.</li>
          <li><strong>Dermatologische TCM-Konzepte</strong>: Behandlung bei hartnäckiger Neurodermitis, chronischer Nesselsucht (Urtikaria), Ekzemen, Gürtelrose und Haarausfall.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Akademischer Hintergrund & Biografie</h4>
        <p style="margin-bottom: 1rem;">Master-Abschluss der traditionellen chinesischen Medizin, lizenzierte Ärztin und staatlich geprüfte psychologische Beraterin.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Erfahrung & Spezialpraxis</h4>
        <p style="margin-bottom: 1rem;">Dr. Guan verbindet klassische Heilverfahren mit moderner Laserakupunktur und technologiegestützter Gewichtsreduktion. Sie besitzt weitreichende Erfahrung in der Meridianlehre und der ganzheitlichen Burnout-Prävention.</p>
      `
    },
    en: {
      title: "Dr. Weina Guan – Acupuncture & Fascia Therapy",
      body: `
        <p><strong>Dr. Weina Guan (管蔚娜)</strong> is the Deputy Director of the Science & Technology TCM Management Center and an expert in deep meridian detoxification and vibrational acupuncture.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Specialties & Focus Areas</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Urogenital & Gynecological Disorders</strong>: Chronic prostatitis, urinary urgency, incontinence, uterine fibroids, dysmenorrhea, and ovarian decline.</li>
          <li><strong>Meridian Detoxification & Acupuncture</strong>: Rich clinical expertise in acupuncture, cupping, moxibustion, gua sha, and ear acupuncture to expel toxins.</li>
          <li><strong>Dermatological Conditions</strong>: Eczema, urticaria, neurodermatitis, herpes zoster, and clinical hair loss.</li>
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
      title: "Gebärmutter befreien: Ganzheitliche TCM-Therapie bei Endometriose",
      body: `
        <p><strong>Endometriose (Endometriosis)</strong> ist einer der schmerzhaftesten „stillen Killer“ in der Gynäkologie und betrifft weltweit etwa 10 % aller Frauen im gebärfähigen Alter. Wenn Endometriumzellen wie „verirrte Samen“ außerhalb der Gebärmutter wachsen, bluten sie bei jeder Periode mit, was zu Entzündungen, Verwachsungen und Schokoladenzysten (Endometriomen) führt.</p>
        <p>Dies verursacht nicht nur chronische Beckenschmerzen und extrem schmerzhafte Regelschmerzen (VAS-Skala 8-9), sondern ist auch die Hauptursache für 30 % bis 50 % aller Fälle von unerfülltem Kinderwunsch. In der westlichen Medizin werden meist Hormone unterdrückt oder Gewebe operativ entfernt, manchmal sogar ganze Organe.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Der ganzheitliche Ansatz: 温阳消瘀 (Yang wärmen & Stagnation auflösen)</h4>
        <p>Dr. Adrianna Qiao (M.Sc. Zellbiologie und TCM-Ärztin) erklärt, dass die biologische Mikroumgebung im Becken entscheidend ist. In der klassischen TCM ist die Hauptursache <strong>„寒凝血瘀“ (Kälte-Kondensation und Blutstagnation)</strong> im Unterleib. Das Becken verhält sich wie ein feuchter, kalter Boden ohne Sonne. Daher ist unser Behandlungsziel <strong>„温阳化瘀“</strong> – den Unterleib von innen heraus zu erwärmen, die Durchblutung anzuregen und die blockierten Leitbahnen zu befreien. So erzielen wir hervorragende Ergebnisse rein mit Naturheilkunde.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Unsere Therapieverfahren</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Guanyuan-Becken-Moxibustion (铺灸 - Pu Jiu)</strong>: Spezielle therapeutische Boxen (JD3030) mit frischem Ingwer-Mus und wärmenden Kräutern auf den Punkten Guanyuan, Qihai und Zigong. Die tiefe Wärme regt die Durchblutung an und löst Verwachsungen im Becken.</li>
          <li><strong>Klassische Kräuterheilkunde</strong>: Individuelle Rezepturen (wie <em>Shaofu Zhuyu Tang</em>) fördern die Blutzirkulation und helfen, Verhärtungen abzubauen.</li>
          <li><strong>Bian-Stein Elektrotherapie</strong>: Löst Verspannungen der Gebärmuttermuskulatur und lindert Krämpfe.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Fallbeispiele</h4>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 1rem;">
          <p><strong>Fall 1 (Schokoladenzyste & Infertilität)</strong>: Eine 29-jährige Patientin mit Kinderwunsch litt unter einer 4,2 cm großen Schokoladenzyste am linken Eierstock und extremen Regenschmerzen (VAS 9, starke Schmerzmittel). Nach 3 Monaten kombinierter Pu-Jiu-Therapie und Kräutereinnahme schrumpfte die Zyste auf 1,5 cm, die Schmerzen verschwanden vollständig (VAS 1, ohne Medikamente).</p>
        </div>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px;">
          <p><strong>Fall 2 (Adenomyose & Schwangerschaft)</strong>: Eine 34-jährige Patientin mit primärer Infertilität seit 4 Jahren litt an einer stark vergrößerten Gebärmutter infolge von Adenomyose. Durch gezielte Erwärmung und Zyklustherapie verkleinerte sich die Gebärmutter, die Blutungen normalisierten sich, und im 5. Behandlungsmonat wurde sie natürlich schwanger.</p>
        </div>
      `
    },
    en: {
      title: "Nourishing Yang & Dissolving Stagnation: High-Tech TCM Care for Endometriosis",
      body: `
        <p><strong>Endometriosis</strong> is one of the most challenging conditions in gynecology, affecting about 10% of women of childbearing age globally. When endometrial cells grow outside the uterine cavity, they bleed with each monthly cycle, causing chronic inflammation, tissue adhesions, and chocolate cysts (endometriomas).</p>
        <p>This does not only lead to severe dysmenorrhea (VAS pain scale 8-9) and chronic pelvic pain, but is also a leading cause of infertility (30% to 50% of cases). In Western medicine, hormones are often suppressed or surgery is performed, sometimes removing entire organs.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">The Integrative Approach: Warming Yang & Dissolving Stagnation</h4>
        <p>Dr. Adrianna Qiao explains that the pelvic microenvironment supports these cells. In classical TCM, the root cause is <strong>"Cold Condensation and Blood Stagnation" (寒凝血瘀)</strong> in the lower burner. The pelvic cavity acts like cold, damp soil lacking sunlight. Our therapy focus is <strong>"Warming Yang and Dissolving Stagnation" (温阳化瘀)</strong> – using deep thermal penetration and herbs to dissolve blockages and restore tissue mobility.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Our Therapy System</h4>
        <ul class="feature-list" style="margin-bottom: 1.5rem;">
          <li><strong>Guanyuan Pelvic Moxibustion (Pu Jiu)</strong>: Physical heating boxes (JD3030) burning pure moxa over ginger paste and circulation herbs on acupuncture points (Guanyuan, Qihai, Zigong).</li>
          <li><strong>Classical Formulas</strong>: Individually tailored herbal preparations (such as <em>Shaofu Zhuyu Tang</em>) designed to warm the womb and clear stagnation.</li>
          <li><strong>Bian-Stone Electrotherapy</strong>: Uses warm physical stone therapy combined with electro-stimulation to soothe uterine muscle spasm.</li>
        </ul>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Case Studies</h4>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 1rem;">
          <p><strong>Case 1 (Chocolate Cyst & Pain Resolution)</strong>: A 29-year-old female, 2 years infertility, presenting with a 4.2cm ovarian chocolate cyst and severe pain (VAS 9, relying on pain medication). After 3 months of pelvic moxibustion and herbal pastes, the cyst reduced to 1.5cm, and pain was fully resolved (VAS 1).</p>
        </div>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px;">
          <p><strong>Case 2 (Adenomyosis & Successful Conception)</strong>: A 34-year-old female, 4 years primary infertility, diagnosed with adenomyosis and enlarged uterus. After 4 months of cycle therapy, uterine volume decreased, menstrual flow normalized, and she conceived naturally in the 5th month of treatment.</p>
        </div>
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
        <ul class="feature-list">
          <li><strong>Termine</strong>: 18. April um 10:00 Uhr & 19. April um 15:00 Uhr</li>
          <li><strong>Zielgruppe</strong>: Kinder (3-10 Jahre) mit ihren Eltern</li>
          <li><strong>Gruppengröße</strong>: Maximal 7 Familien pro Kurs</li>
          <li><strong>Gebühr</strong>: 199 RMB (~25 €) inkl. aller Malutensilien und gesunder Kräutersnacks</li>
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
        <ul class="feature-list">
          <li><strong>Schedule</strong>: April 18th at 10:00 AM & April 19th at 3:00 PM</li>
          <li><strong>Target Group</strong>: Children (3-10 years) accompanied by parents</li>
          <li><strong>Capacity</strong>: Limited to 7 families per session</li>
          <li><strong>Fee</strong>: 199 RMB (~$25 USD) including art materials and organic herbal snacks</li>
        </ul>
      `
    }
  },
  mushroom: {
    de: {
      title: "Die Weisheit der Pilzheilkunde: Das Wood Wide Web in unserem Körper",
      body: `
        <p>Unter der Erde erstreckt sich ein feines, weitreichendes Geflecht – das Myzel. Es verbindet Bäume, reguliert Nährstoffe und dient als neuronales Immunsystem des Waldes (bekannt als das „Wood Wide Web“). In der TCM arbeiten Vitalpilze ganz ähnlich in unserem Körper.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Vegetative Regulation & Knotenabbau</h4>
        <p>Heilpilze (wie Reishi, Poria, Cordyceps) dringen tief in unsere feinen Membrangewebe (膜络 - Mo Luo) und Faszien ein. Sie wirken stark feuchtigkeitsausleitend, entzündungshemmend und harmonisieren das vegetative Nervensystem. In unserer Praxis setzen wir die Mykotherapie gezielt ein, um Gewebeverhärtungen (wie Zysten, Myome sowie Schilddrüsen- und Brustknoten) aufzulösen.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Fallstudien</h4>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 1rem;">
          <p><strong>Fall 1 (Schilddrüsenknoten, 2.1cm)</strong>: Eine 48-jährige Patientin mit tastbaren Schilddrüsenknoten und Schluckbeschwerden. Nach 3 Monaten gezielter Therapie mit Poria (Fuling) und Reishi (Lingzhi) bildete sich der Knoten auf 0.9cm zurück, die Beschwerden verschwanden vollständig.</p>
        </div>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px;">
          <p><strong>Fall 2 (Brustdrüsen-Hyperplasie & Angst)</strong>: Eine 38-jährige Patientin mit schmerzhaften Brustknoten (1.6cm) sowie ausgeprägter Unruhe und Schlaflosigkeit. Durch vegetative Regulation mit Pilzextrakten lösten sich die Knoten auf, das Herzklopfen verschwand und die Schlafqualität besserte sich dauerhaft.</p>
        </div>
      `
    },
    en: {
      title: "The Wisdom of Fungal Medicine: Connecting the Wood Wide Web",
      body: `
        <p>Beneath the forest floor lies a vast mycelial network connecting plant life, distributing nutrients, and acting as the Earth's neural immune system. In Traditional Chinese Medicine, medicinal mushrooms perform a similar biological role inside the human body.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Vegetative Regulation & Nodule Resolution</h4>
        <p>Medicinal mushrooms (like Reishi, Poria, and Cordyceps) target the body's membrane network (膜络 - Mo Luo), which corresponds to the fascial and lymphatic systems. They clear chronic dampness, regulate immune responses, and calm the autonomic nervous system. We utilize clinical mycology to systematically disperse benign nodules, cysts, fibroids, and breast/thyroid hyperplasia.</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Case Studies</h4>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px; margin-bottom: 1rem;">
          <p><strong>Case 1 (Thyroid Nodule Regression)</strong>: A 48-year-old female presenting with a 2.1cm thyroid nodule and throat tightness. After a 3-month course of customized Poria & Ganoderma therapy, the nodule shrank to 0.9cm, resolving all clinical symptoms.</p>
        </div>
        <div style="background-color: var(--bg-cream-dark); padding: 1.2rem; border-radius: 8px;">
          <p><strong>Case 2 (Breast Hyperplasia & Insomnia)</strong>: A 38-year-old female presenting with painful breast nodules (1.6cm), palpitations, and anxiety-induced insomnia. Mycological regulation successfully dissolved the nodules and restored deep, restful sleep.</p>
        </div>
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
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">TCM-Prinzip: Nieren-Essenz und Klang</h4>
        <p>Nach der TCM „steuern die Nieren das Wasser und öffnen sich in den Ohren“. Klangtherapie nährt die Nieren-Essenz (Jing), beruhigt das Herz (Shen) und bringt das Wasser-Element des Körpers wieder zum Fließen. Dies führt zu einer tiefen, lang anhaltenden Erleichterung bei Burnout und chronischem Stress.</p>
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
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">TCM Principle: Kidney Jing & Water Element</h4>
        <p>In TCM, the "Kidneys rule water and open to the ears." Sound healing directly nourishes Kidney Jing (vital essence), anchors the Heart Shen (spirit), and harmonizes the flow of fluids in the body, providing relief from chronic fatigue.</p>
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

  // Watch for language changes to rebind if DOM structure changes
  const originalSetLanguage = window.setLanguage;
  if (originalSetLanguage) {
    window.setLanguage = function(lang) {
      originalSetLanguage(lang);
      // Wait a tiny bit for translation scripts to finish DOM updates
      setTimeout(bindArticleButtons, 50);
    };
  }
});

window.openArticleModal = openArticleModal;
window.closeArticleModal = closeArticleModal;
