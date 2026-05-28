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
    "nav-treatments": "Health Maintenance",
    "nav-devices": "Technology",
    "nav-programs": "Programs",
    "nav-retreat": "Yunnan Retreat",
    "nav-info": "Clinic Info",
    "nav-apply": "Register",

    // Hero Section
    "hero-tag": "Traditional Chinese Medicine meets Modern Medical Technology",
    "hero-title": "Traditional Chinese Medicine & Clinical Diagnostics",
    "hero-desc": "Experience deep physical and spiritual transformation through the 40-year TCM expertise of Professor Xu Ruqi, individualized herbal therapies, cutting-edge diagnostic devices, and healing sound ceremonies.",
    "hero-cta-apply": "Register Now",
    "hero-cta-more": "Explore Programs",

    // Introduction / Philosophy
    "intro-title": "Ancient Formulas as Foundation, Technology as Wings",
    "intro-desc": "<p style=\"margin-bottom: 1rem;\">The Hong Dao Clinic was founded by a team of renowned experts of the SHANGHANLUN 伤寒论 tradition of the ascended Master ZHANG Zhongjing 张仲景 and doctoral graduates of Fudan University, combining classical Chinese herbal formulas with modern technology and diagnostic methods.</p><p style=\"margin-bottom: 1rem;\">Under the guiding principle \u201cAncient Formulas as Foundation, Technology as Wings\u201d, the clinic unites research and teaching in an integrative concept serving people worldwide.</p><p>We offer individually tailored care and treatment plans for patients suffering from complex conditions such as autoimmune disorders, metabolic diseases like diabetes, endometriosis, hormonal imbalances, chronic fatigue, cancer, and infertility.</p>",

    // Masters & Team
    "team-tag": "Medical Lineage",
    "team-title": "Traditional Heritage & Compassionate Healing",
    "team-subtitle": "Meet our dedicated doctors and practitioners bridging classical Shanghanlun wisdom and modern recovery.",
    "master-xu-title": "Chief Physician & TCM Professor",
    "master-xu-desc": "Professor Xu Ruqi has spent over 40 years mastering pulse diagnosis and classical herbal medicine. A clinical expert at Beijing University of Chinese Medicine, he is globally renowned for treating severe chronic conditions, advanced tumors, and gynecological diseases.",
    "doctor-1-title": "Clinic Director & Stem Cell Therapy",
    "doctor-1-name": "Dr. Qiao Jingwen (乔靖文)",
    "doctor-1-desc": "Dr. Qiao Jingwen is Director of the Hong Dao Clinic, combining cutting-edge stem cell therapy with TCM rejuvenation techniques for cellular health, fertility, and hormonal balance.",
    "doctor-4-name": "Dr. Guan Weina (管蔚娜)",
    "doctor-4-spec": "Licensed TCM Physician. Specialist in meridian detoxification, clinical acupuncture, and therapeutic massages.",
    "doctor-5-name": "Dr. Zhang Hailin (张海林)",
    "doctor-5-spec": "Head of Decoction Center. Expert in traditional herbal extraction and quality control.",
    "btn-read-bio": "Read Profile",
    "decoction-subtitle": "In-House Herbal Craftsmanship",
    "decoction-title": "Modern Decoction Center & Dao Di Herbs",
    "decoction-desc": "<p style=\"margin-bottom: 1.5rem;\">We source exclusively high-quality <strong>Dao Di Herbs (道地藥材)</strong> from certified organic cultivation and soil-specific farming methods, grown in regions that offer the optimal climatic and energetic conditions for each native plant.</p><p>In our in-house Decoction Center, under the direct supervision of Master Xu, these herbs are individually extracted, precisely processed, and portion-packed into <strong>Ready-to-Drink decoctions</strong> that you can easily take home.</p>",
    "visionary-deng-title": "Heilpraktikerin, Qi Gong & Sound Therapy",
    "visionary-deng-desc": "Heilpraktikerin Deng Nanjing translates Professor Xu's consultations into German, English, Italian, Spanish, and Mandarin. She also leads Qi Gong sessions, 6 Healing Sounds practice, sound therapy, tea ceremonies, and supports guests with all organizational needs during their stay.",
    "visionary-deng-spec": "Heilpraktikerin, Qi Gong, Sound Therapy & Patient Support. 5 Languages.",
    "team-grid-title": "Guardians of Ancient Wisdom & Specialized Clinicians",
    "doctor-3-name": "Dr. Chen Kainan (陈凯南) — Assistant Physician",
    "doctor-3-spec": "Assistant Physician, specializing in acupuncture and clinical support under Professor Xu's guidance.",
    "doctor-sound-name": "Cheung Mingli",
    "doctor-sound-spec": "Nomad, yoga teacher for children and adults, fan dance therapist & sound worker with 10+ years of international experience.",

    // Specialized Treatments
    "treatments-title": "Health Maintenance Fields",
    "treatments-subtitle": "Tailored, highly focused strategies for targeted recovery.",
    "treatment-1-title": "Endometriosis & Women's Health",
    "treatment-1-desc": "Custom herbal pastes, womb massage, and acupressure to dissolve blood stagnation and relieve chronic pain.",
    "treatment-2-title": "Stem Cell & Longevity",
    "treatment-2-desc": "Dr. Adrianna Qiao integrates advanced cellular research with TCM health maintenance for cellular health.",
    "treatment-3-title": "Stress & Burnout Recovery",
    "treatment-3-desc": "Holistic relief for high-pressure lifestyles using pulse-guided acupuncture and relaxing sound frequencies.",
    
    // Modern Devices
    "devices-title": "Advanced Health Maintenance Technology",
    "devices-subtitle": "Traditional diagnostic wisdom validated by high-end modern devices.",
    "device-1-name": "Infrared Thermal Imaging",
    "device-1-desc": "Maps body inflammation, circulation blockages, and meridian temperature patterns.",
    "device-2-name": "Bioresonance Frequency Scanner",
    "device-2-desc": "Analyzes cell energy fields to identify allergies, environmental toxins, and organ weakness.",
    "device-3-name": "Electro-Acupuncture Stimulator",
    "device-3-desc": "Delivers gentle microcurrents to traditional acupuncture points to double healing speed.",

    // Programs & Endometriosis calculator
    "programs-title": "Health Programs & Training",
    "programs-subtitle": "From intensive training courses to customized personal health maintenance retreats.",
    
    "retreat-10day-title": "10-Day Teacher Training & Retreat",
    "retreat-10day-date": "October 10th - October 20th, 2026",
    "retreat-10day-desc": "A complete immersion in TCM theory and health maintenance. 5 days of clinical observation in Shenzhen under Master Xu, followed by 5 days of Daoist lifestyle integration in the Wudang Mountains. Limited to 12 participants.",
    "retreat-10day-price": "€3,900 Cost Contribution (Early Bird)",
    "retreat-10day-wix-link": "Wix Details",
    
    "retreat-1day-title": "1-3-5 Day TCM Clinical Training (Shenzhen)",
    "retreat-1day-desc": "Focused clinical training and masterclasses in Shenzhen. Ideal for practitioners and health enthusiasts wishing to experience direct clinical practice observation, pulse diagnosis introduction, and professional decoction preparation. Flexible attendance from 1 to 5 days.",
    "retreat-1day-price": "€250 first day, €200 each additional day",
    
    "endo-program-title": "Endometriosis Health Maintenance Program",
    "endo-program-desc": "A dedicated, fully customizable program addressing uterine health, hormone balance, and pain relief. Features customized herbal formulas, womb massage, sound healing, and direct guidance.",
    "endo-select-duration": "Select Program Duration:",
    "duration-1w": "1 Week",
    "duration-2w": "2 Weeks",
    "duration-4w": "4 Weeks",
    "package-basic": "Outpatient (No Boarding)",
    "package-premium": "Premium Retreat (With Partner Hotel & TCM Kitchen)",
    "endo-included-title": "What's Included:",
    "endo-price-note": "*Note: Cost contributions exclude individually prescribed customized herbal medicines.",

    // Yunnan Retreat
    "yunnan-title": "Mountain Retreats & Nature Extension",
    "yunnan-subtitle": "A mystical transition from the city clinic into pristine mountain elements.",
    "yunnan-desc-1": "Extend your clinical program with a nature retreat. Every treatment plan, training course, and retreat begins with intensive diagnosis and therapy at our Shenzhen clinic, after which you travel directly to China's pristine mountain sanctuaries.",
    "yunnan-desc-2": "The second, immersive part always takes place in a beautiful location in the mountains of China. We have a traditional guesthouse operated by Daoist Master Yin Chen Zi and his wife in the Wudang Mountains, as well as accommodations in Wuyi Shan and Yunnan (Xishuangbanna).",
    "yunnan-hotel-info": "Accommodations include: Traditional wood guesthouse in Wudang (Master Yin Chen Zi), scenic mountain lodging in Wuyi Shan, and the high-end luxury Yunnan Horizon Sanctuary eco-resort.",

    // Child Space
    "child-title": "Hong Dao Child Space",
    "child-desc": "We believe family healing involves the youngest. Our clinic hosts a beautiful internal Children's Space, providing peaceful activities, kids TCM nutrition guidance, and regular public and internal events for families to connect.",

    // Clinic Info & FAQ
    "info-title": "Practical Clinic Information",
    "info-location-label": "Location & Access",
    "info-location-desc": "Hong Dao TCM Clinic, Shenzhen Nanshan District. Easily reachable via metro and highway.",
    "info-hours-label": "Opening Hours",
    "info-hours-desc": "Monday - Saturday: 09:00 - 18:00 (Appointments Required)",
    "info-payment-label": "Registration & Cost Contribution Policy",
    "info-payment-desc": "Online registration is available. Please note your registration is officially confirmed only upon receipt of your personalized confirmation email. All contributions go directly toward covering the costs of the clinic's health programs.",
    
    "faq-title": "Frequently Asked Questions",
    "faq-q1": "Are customized herbal medicines included in the cost contribution?",
    "faq-a1": "No. Individually prepared herbal formulas for home use are provided separately to compensate for the direct preparation costs according to diagnostic needs.",
    "faq-q2": "How is the Yunnan travel organized?",
    "faq-a2": "Our team coordinates transfer assistance. The program covers the local partner hotel stay, guidance, and specified activities.",
    "faq-q3": "Can I bring my family?",
    "faq-a3": "Yes. Our Hong Dao Child Space offers family-friendly support and special weekend activities for children while parents undergo therapies.",
    "faq-q4": "Do I need a visa for China?",
    "faq-a4": "Most EU citizens (incl. Germany, Austria, Switzerland) can enter China visa-free for up to 30 days since 2024. Please verify the current entry requirements for your country before departure.",
    "faq-q5": "Which apps do I need in China?",
    "faq-a5": "<strong>Install before departure:</strong><br>&#8226; <strong>WeChat</strong> &#8211; Communication (China's WhatsApp)<br>&#8226; <strong>Alipay</strong> &#8211; Payment (link your credit card!)<br>&#8226; <strong>Didi</strong> &#8211; Taxi booking<br>&#8226; <strong>AMap</strong> &#8211; Navigation<br>&#8226; <strong>VPN</strong> &#8211; e.g. Jamjams or Potatso Lite",
    "faq-q6": "How does payment work on site?",
    "faq-a6": "China is almost entirely cashless. Download <strong>Alipay</strong> and link your credit card (Visa/Mastercard). You can pay everywhere with it.",
    "faq-q7": "What can I expect from a TCM treatment?",
    "faq-a7": "Professor Xu creates an individual diagnosis via pulse diagnostics and tongue analysis. Treatment typically includes herbal formulas, acupuncture, and moxibustion. Initial improvements often appear after 1-2 weeks, sustainable changes after 4+ weeks.",

    // Contact
    "contact-title": "Begin Your Healing Journey",
    "contact-subtitle": "Contact us or register directly for your customized program.",
    "contact-free-consult": "Request a Free 15-Min Consultation",
    "contact-free-desc": "Speak directly with Nanjing Deng to discuss your symptoms and select the ideal health maintenance path.",
    "contact-label-name": "Full Name",
    "contact-label-email": "Email Address",
    "contact-label-phone": "Phone Number",
    "contact-label-program": "Program of Interest",
    "contact-label-date": "Select Consultation Date (Wed & Sat)",
    "contact-label-slot": "Select Time Slot (Chinese Time 14:00 - 20:00)",
    "contact-label-message": "Brief Medical History / Notes",
    "contact-submit-btn": "Register Now",
    "contact-submit-email": "Register via Email",
    "contact-submit-whatsapp": "Register via WhatsApp",
    "contact-social-text": "Connect with us on Social Media for daily health tips, sound circles and tea recipes:",
    "whatsapp-text": "Chat on WhatsApp",
    "instagram-text": "Instagram: nanjing_tea.sound",

    // Interactive Booking Toast/Confirm
    "booking-success-toast": "Registration submitted! Check your email inbox for confirmation.",
    
    // Marketing Popup
    "popup-title": "Welcome Offer",
    "popup-desc": "Register today for our Endometriosis Programs or the Wudang Retreat and receive a 10% reduction on the cost contribution for your initial consultation.",
    "popup-code-label": "Your Registration Code:",
    "popup-cta": "Register with Code",

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
    "gallery-more-btn": "More Photos",
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
    "endo-read-approach": "Treatment Approach & Case Studies",
    "footer-impressum": "Impressum / Legal Notice",
    "footer-privacy": "Privacy Policy",
    "contact-wechat-wrapper": "<strong>WeChat:</strong> <a href=\"#\" class=\"read-article-btn\" data-article=\"wechat\" style=\"color: var(--terracotta); text-decoration: underline; font-weight: 500;\">Show QR Codes</a>"
  },
  de: {
    // Navigation
    "nav-home": "Startseite",
    "nav-about": "Über uns & Meister",
    "nav-treatments": "Gesundheitspflege",
    "nav-devices": "Medizintechnik",
    "nav-programs": "Programme",
    "nav-retreat": "Yunnan-Retreat",
    "nav-info": "Klinik-Info",
    "nav-apply": "Anmelden",

    // Hero Section
    "hero-tag": "Traditionelle Chinesische Medizin trifft moderne Medizintechnik",
    "hero-title": "Traditionelle Chinesische Medizin & Klinische Diagnostik",
    "hero-desc": "Erleben Sie tiefe körperliche und spirituelle Transformation durch die 40-jährige TCM-Erfahrung von Professor Xu Ruqi, individuelle Kräutertherapien, modernste Diagnosegeräte und heilsame Klangzeremonien.",
    "hero-cta-apply": "Jetzt anmelden",
    "hero-cta-more": "Programme entdecken",

    // Introduction / Philosophy
    "intro-title": "Alte Rezepturen als Fundament, Technologie als Flügel",
    "intro-desc": "<p style=\"margin-bottom: 1rem;\">Die Hong Dao Klinik wurde von einem Team renommierter Experten der SHANGHANLUN 伤寒论 Lehre des aufgestiegenen Meisters ZHANG Zhongjings 张仲景 sowie Doktoranden der Fudan University gegründet und verbindet klassische chinesische Kräuterrezepturen mit moderner Technologie und Diagnostikverfahren.</p><p style=\"margin-bottom: 1rem;\">Unter dem Leitgedanken \u201eAlte Rezepturen als Fundament, Technologie als Flügel\u201c vereint die Klinik Forschung und Lehre in einem integrativen Konzept und dient Menschen weltweit.</p><p>Wir bieten individuell maßgeschneiderte Begleitung und Therapiepläne für Patient:innen an, die unter komplexen Erkrankungen wie Autoimmungeschehen, Stoffwechselerkrankungen wie Diabetes, Endometriose, hormonellen Störungen, Erschöpfungssyndrom, Krebs und Unfruchtbarkeit leiden.</p>",

    // Masters & Team
    "team-tag": "Traditionslinie",
    "team-title": "Klassische Wurzeln & Ganzheitliche Zuwendung",
    "team-subtitle": "Lernen Sie unser engagiertes Team kennen, das Brücken zwischen klassischer Shanghanlun-Lehre und moderner Genesung schlägt.",
    "master-xu-title": "Chefarzt & TCM-Professor",
    "master-xu-desc": "Professor Xu Ruqi verfügt über mehr als 40 Jahre Erfahrung in Pulsdiagnostik und klassischer Kräutermedizin. Als klinischer Experte an der Pekinger Universität für Chinesische Medizin ist er weltweit bekannt für die Behandlung schwerer chronischer Krankheiten, Tumoren und gynäkologischer Leiden.",
    "doctor-1-title": "Direktorin der Klinik & Stammzelltherapie",
    "doctor-1-name": "Dr. Qiao Jingwen (乔靖文)",
    "doctor-1-desc": "Dr. Qiao Jingwen ist Direktorin der Hong Dao Klinik und kombiniert modernste Stammzelltherapie mit TCM-Rejuvenationstechniken für zelluläre Gesundheit, Fruchtbarkeit und hormonelle Balance.",
    "doctor-4-name": "Dr. Guan Weina (管蔚娜)",
    "doctor-4-spec": "Staatlich lizenzierte TCM-Ärztin. Spezialistin für Meridian-Entgiftung, Akupunktur und therapeutische Massagen.",
    "doctor-5-name": "Dr. Zhang Hailin (张海林)",
    "doctor-5-spec": "Leiterin des Dekokt-Zentrums. Expertin für traditionelle Kräuterzubereitung und Qualitätskontrolle.",
    "btn-read-bio": "Profil lesen",
    "decoction-subtitle": "Hauseigene Kräuter-Manufaktur",
    "decoction-title": "Modernes Dekokt-Zentrum & Dao Di Kräuter",
    "decoction-desc": "<p style=\"margin-bottom: 1.5rem;\">Wir beziehen ausschließlich hochwertige <strong>Dao Di Kräuter (道地藥材)</strong> aus kontrolliert biologischem Anbau und Soil-Technik aus den Herkunftsregionen, die für die jeweilige Pflanze die optimalen klimatischen und energetischen Bedingungen bieten.</p><p>In unserem hauseigenen Dekokt-Zentrum werden die Heilkräuter unter Aufsicht von Meister Xu individuell für Sie extrahiert, präzise verarbeitet und portioniert als <strong>gebrauchsfertige Kräuterdekokte (Ready-to-Drink)</strong> abgepackt, die Sie unkompliziert mit nach Hause nehmen können.</p>",
    "visionary-deng-title": "Heilpraktikerin, Qi Gong & Klangbegleitung",
    "visionary-deng-desc": "Heilpraktikerin Deng Nanjing übersetzt die Konsultationen und Befunde von Professor Xu verlässlich ins Deutsche, Englische, Italienische, Spanische und Mandarin. Begleitend leitet sie Qi Gong, die 6 heilenden Klänge, Klangsitzungen und Teezeremonien und unterstützt Sie bei allen organisatorischen Anliegen während Ihres Aufenthaltes.",
    "visionary-deng-spec": "Heilpraktikerin, Qi Gong, Klangbegleitung & Patientenbetreuung. 5 Sprachen.",
    "team-grid-title": "Bewahrer des Wissens & Klinische Experten",
    "doctor-3-name": "Dr. Chen Kainan (陈凯南) — Assistenzarzt",
    "doctor-3-spec": "Assistenzarzt, spezialisiert auf Akupunktur und klinische Unterstützung unter Anleitung von Professor Xu.",
    "doctor-sound-name": "Cheung Mingli",
    "doctor-sound-spec": "Nomadin, Yogalehrerin für Kinder und Erwachsene, Fächer-Tanz-Therapeutin & Klangarbeiterin mit 10+ Jahren internationaler Erfahrung.",

    // Specialized Treatments
    "treatments-title": "Fachbereiche der Gesundheitspflege",
    "treatments-subtitle": "Maßgeschneiderte Begleitung für Ihre gezielte Regeneration.",
    "treatment-1-title": "Endometriose & Frauengesundheit",
    "treatment-1-desc": "Individuelle Kräuterpasten, Womb-Massage (Gebärmutter-Massage) und Akupressur zur Lösung von Stagnationen und Schmerzlinderung.",
    "treatment-2-title": "Stammzellen & Langlebigkeit",
    "treatment-2-desc": "Dr. Adrianna Qiao kombiniert modernste Stammzelltherapie mit TCM-Rejuvenationstechniken für zelluläre Erneuerung.",
    "treatment-3-title": "Stress & Burnout-Prävention",
    "treatment-3-desc": "Ganzheitliche Begleitung bei Belastungszuständen durch pulsgeführte Akupunktur und begleitende Klangtherapie.",

    // Modern Devices
    "devices-title": "Technologie zur Gesundheitspflege",
    "devices-subtitle": "Traditionelle TCM-Diagnostik, präzisiert durch modernste klinische Geräte.",
    "device-1-name": "Infrarot-Thermografie",
    "device-1-desc": "Visualisiert Entzündungen, Durchblutungsstörungen und energetische Blockaden in den Meridianen.",
    "device-2-name": "Bioresonanz-Frequenzscanner",
    "device-2-desc": "Misst elektromagnetische Schwingungen der Zellen zur Erkennung von Belastungen, Toxinen und Organschwächen.",
    "device-3-name": "Elektro-Akupunktur-Gerät",
    "device-3-desc": "Unterstützt die klassische Nadelung durch präzise Mikroströme zur Anregung der Nervenregeneration.",

    // Programs & Endometriosis calculator
    "programs-title": "Gesundheitsprogramme & Kurse",
    "programs-subtitle": "Vom intensiven Ausbildungskurs bis zum maßgeschneiderten Gesundheitspflege-Programm.",
    
    "retreat-10day-title": "10-tägiges TCM-Training & Retreat",
    "retreat-10day-date": "10. Oktober - 20. Oktober 2026",
    "retreat-10day-desc": "Komplette Immersion in TCM-Theorie & Gesundheitspflege. 5 Tage Hospitation in Shenzhen unter Meister Xu, gefolgt von 5 Tagen taoistischer Lebensführung in den Wudang-Bergen. Maximal 12 Teilnehmer.",
    "retreat-10day-price": "€3.900,- Kostenbeitrag (Frühbucher)",
    "retreat-10day-wix-link": "Details auf Wix",
    
    "retreat-1day-title": "1-3-5-tägiges klinisches TCM-Training (Shenzhen)",
    "retreat-1day-desc": "Lokale Tageskurse vor Ort. Ideal für Therapeuten und Interessierte zur Hospitation, Pulsdiagnose-Einführung und Kräuterküchen-Zubereitung.",
    "retreat-1day-price": "€250,- Kostenbeitrag pro Tag",
    
    "endo-program-title": "Endometriose-Gesundheitspflegeprogramm",
    "endo-program-desc": "Ein spezialisiertes, individuell anpassbares Gesundheitspflege-Programm für Frauen. Enthält Kräuterrezepturen, Womb-Massagen, Sound Healing, Ernährungsanalyse und Begleitung.",
    "endo-select-duration": "Programmdauer wählen:",
    "duration-1w": "1 Woche",
    "duration-2w": "2 Wochen",
    "duration-4w": "4 Wochen",
    "package-basic": "Ambulant (ohne Unterkunft)",
    "package-premium": "Premium (inkl. Partnerhotel & TCM-Küche)",
    "endo-included-title": "Inklusive Leistungen:",
    "endo-price-note": "*Hinweis: Die Kostenbeiträge beinhalten keine individuelle Kräutermedizin.",

    // Yunnan Retreat
    "yunnan-title": "Berg-Retreats & Natur-Verlängerung",
    "yunnan-subtitle": "Ein heilsamer Übergang von der Stadtklinik in die unberührte Natur.",
    "yunnan-desc-1": "Erweitern Sie Ihr klinisches Programm mit einem Natur-Retreat. Jedes Behandlungsprogramm, jede Ausbildung und jedes Retreat beginnt mit intensiver Diagnose und Therapie in der Shenzhen-Klinik, bevor Sie direkt zu Chinas unberührten Bergheiligtümern reisen.",
    "yunnan-desc-2": "Der zweite und vertiefende Teil findet immer an einem wunderschönen Ort in den Bergen Chinas statt. Wir nutzen ein traditionelles Gästehaus, betrieben vom taoistischen Meister Yin Chen Zi und seiner Frau in den Wudang-Bergen, sowie Unterkünfte in Wuyi Shan und Yunnan (Xishuangbanna).",
    "yunnan-hotel-info": "Unterkünfte beinhalten: Traditionelles Gästehaus aus Holz in Wudang (Meister Yin Chen Zi), malerische Herbergen in Wuyi Shan sowie das luxuriöse Yunnan Horizon Sanctuary Öko-Resort.",

    // Child Space
    "child-title": "Hong Dao Kinderbereich",
    "child-desc": "Heilung betrifft die ganze Familie. Unsere Klinik bietet einen hauseigenen Kinderbereich (Child Space) mit kindgerechten Beschäftigungen, TCM-Ernährungsberatung und regelmäßigen öffentlichen & internen Events.",

    // Clinic Info & FAQ
    "info-title": "Klinikinformationen & Buchungsrichtlinien",
    "info-location-label": "Standort & Anfahrt",
    "info-location-desc": "Hong Dao TCM-Klinik, Nanshan District, Shenzhen. Gut angebunden an Metro und Autobahn.",
    "info-hours-label": "Öffnungszeiten",
    "info-hours-desc": "Montag - Samstag: 09:00 - 18:00 Uhr (Nur nach Terminvereinbarung)",
    "info-payment-label": "Anmeldung & Kostenbeitrag",
    "info-payment-desc": "Die Online-Anmeldung ist möglich. Die Anmeldung gilt erst nach Erhalt der Bestätigungs-E-Mail als offiziell bestätigt. Alle Kostenbeiträge fließen direkt in die Deckung der Aufwände für die Gesundheitspflege-Programme der Klinik.",
    
    "faq-title": "Häufig gestellte Fragen (FAQ)",
    "faq-q1": "Sind die verschriebenen Kräuter im Kostenbeitrag inbegriffen?",
    "faq-a1": "Nein. Individuell verschriebene Kräuterarzneien (die als Pulver oder Paste mit nach Hause genommen werden können) werden je nach individuellem Aufwand und Bedarf separat bereitgestellt.",
    "faq-q2": "Wie läuft der Transfer nach Yunnan ab?",
    "faq-a2": "Unser Klinikteam organisiert den Transfer per Bahn/Flug. Unterkunft im Partnerhotel sowie Aktivitäten vor Ort sind im Kostenbeitrag des Retreats enthalten.",
    "faq-q3": "Gibt es eine Kinderbetreuung vor Ort?",
    "faq-a3": "Ja. Unser hauseigener Kinderbereich bietet altersgerechte Programme und veranstaltet regelmäßige Familien-Events.",
    "faq-q4": "Brauche ich ein Visum für China?",
    "faq-a4": "Die meisten EU-Bürger (inkl. Deutschland, Österreich, Schweiz) können seit 2024 visumfrei für bis zu 30 Tage nach China einreisen. Bitte prüfen Sie die aktuellen Einreisebestimmungen Ihres Landes vor Abreise.",
    "faq-q5": "Welche Apps brauche ich in China?",
    "faq-a5": "<strong>Vor Abreise installieren:</strong><br>&#8226; <strong>WeChat</strong> &#8211; Kommunikation (Chinas WhatsApp)<br>&#8226; <strong>Alipay</strong> &#8211; Bezahlen (Kreditkarte verknüpfen!)<br>&#8226; <strong>Didi</strong> &#8211; Taxi bestellen<br>&#8226; <strong>AMap</strong> &#8211; Navigation<br>&#8226; <strong>VPN</strong> &#8211; z.B. Jamjams oder Potatso Lite",
    "faq-q6": "Wie funktioniert das Bezahlen vor Ort?",
    "faq-a6": "In China wird fast ausschließlich bargeldlos bezahlt. Laden Sie <strong>Alipay</strong> herunter und verknüpfen Sie Ihre Kreditkarte (Visa/Mastercard). Damit können Sie überall bezahlen.",
    "faq-q7": "Was kann ich von einer TCM-Behandlung erwarten?",
    "faq-a7": "Professor Xu erstellt eine individuelle Diagnose über Pulsdiagnostik und Zungenanalyse. Die Behandlung umfasst Kräuterrezepturen, Akupunktur und Moxibustion. Erste Verbesserungen zeigen sich oft nach 1-2 Wochen, nachhaltige Veränderungen nach 4+ Wochen.",

    // Contact
    "contact-title": "Beginnen Sie Ihren Weg zur Heilung",
    "contact-subtitle": "Kontaktieren Sie uns oder bewerben Sie sich direkt für Ihr individuelles Heilprogramm.",
    "contact-free-consult": "Kostenloses 15-minütiges Gespräch anfragen",
    "contact-free-desc": "Sprechen Sie direkt mit Nanjing Deng, um Ihre Beschwerden zu besprechen und das passende Programm zu finden.",
    "contact-label-name": "Name",
    "contact-label-email": "E-Mail-Adresse",
    "contact-label-phone": "Telefonnummer",
    "contact-label-program": "Gewünschtes Programm",
    "contact-label-date": "Datum des Beratungsgesprächs (Mittwoch / Samstag)",
    "contact-label-slot": "Uhrzeit wählen (Pekinger Ortszeit 14:00 - 20:00 Uhr)",
    "contact-label-message": "Kurze Anmerkung zu Ihren Beschwerden",
    "contact-submit-btn": "Jetzt anmelden",
    "contact-submit-email": "Per E-Mail anmelden",
    "contact-submit-whatsapp": "Per WhatsApp anmelden",
    "contact-social-text": "Folgen Sie uns in den sozialen Medien für Gesundheitstipps, Klangzirkel und Tee-Rituale:",
    "whatsapp-text": "Über WhatsApp chatten",
    "instagram-text": "Instagram: nanjing_tea.sound",

    // Interactive Booking Toast/Confirm
    "booking-success-toast": "Registrierung erfolgreich gesendet! Eine Bestätigung wird an Ihre E-Mail gesendet.",
    
    // Marketing Popup
    "popup-title": "Willkommensangebot",
    "popup-desc": "Registrieren Sie sich heute für die Endometriose-Programme oder das Wudang-Retreat und erhalten Sie 10% Ermäßigung auf den Kostenbeitrag der Erstkonsultation.",
    "popup-code-label": "Ihr Registrierungscode:",
    "popup-cta": "Mit Code registrieren",

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
    "gallery-more-btn": "Mehr Bilder",
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
    "endo-read-approach": "Behandlungsansatz & Fallbeispiele",
    "footer-impressum": "Impressum",
    "footer-privacy": "Datenschutz",
    "contact-wechat-wrapper": "<strong>WeChat:</strong> <a href=\"#\" class=\"read-article-btn\" data-article=\"wechat\" style=\"color: var(--terracotta); text-decoration: underline; font-weight: 500;\">QR-Codes anzeigen</a>"
  }
};

// Endometriosis Program Pricing Data Matrix
const endometriosisPricing = {
  "1w": {
    basic: 1750,
    premium: 2500,
    features: {
      en: [
        "Initial pulse & tongue diagnosis with Professor Xu",
        "3 Acupuncture sessions",
        "3 Moxibustion (Pu Jiu) sessions",
        "1 Specialized Womb-Massage session",
        "1 Group Sound Healing & sound ceremony",
        "TCM nutrition guideline and kitchen introduction",
        "Take-home medicine instruction (powders/pastes)"
      ],
      de: [
        "Erstdiagnose (Puls & Zunge) mit Professor Xu",
        "3 Akupunktur-Sitzungen",
        "3 Moxibustions-Sitzungen (Pu Jiu)",
        "1 Spezialisierte Womb-Massage (Gebärmutter-Massage)",
        "1 Gruppen-Sound-Healing & Klangzeremonie",
        "TCM-Ernährungsleitfaden & Küchen-Einführung",
        "Einweisung für Kräuterpulver/-pasten für Zuhause"
      ]
    }
  },
  "2w": {
    basic: 3500,
    premium: 5000,
    features: {
      en: [
        "Initial & mid-program checkup with Professor Xu",
        "6 Acupuncture sessions",
        "6 Moxibustion (Pu Jiu) sessions",
        "2 Specialized Womb-Massage sessions",
        "2 Group Sound Healing sessions",
        "Daily Morning Qi Gong",
        "1 Tea Ceremony",
        "Evening Meditation sessions",
        "Cultural program with ethnic minorities (from week 2)",
        "Daily TCM-based herbal soups at clinic",
        "Take-home medicine instruction + 3 months follow-up support"
      ],
      de: [
        "Erst- & Zwischen-Diagnose durch Professor Xu",
        "6 Akupunktur-Sitzungen",
        "6 Moxibustions-Sitzungen (Pu Jiu)",
        "2 Spezialisierte Womb-Massagen (Gebärmutter-Massagen)",
        "2 Gruppen-Sound-Healings",
        "Tägliches Morgen-Qi Gong",
        "1 Teezeremonie",
        "Abendmeditation",
        "Kulturprogramm mit ethnischen Minderheiten (ab Woche 2)",
        "Tägliche TCM-Kräutersuppen in der Klinik",
        "Einweisung für Kräuter sowie 3 Monate Begleitung"
      ]
    }
  },
  "4w": {
    basic: 6200,
    premium: 9000,
    features: {
      en: [
        "Weekly diagnostic checkups with Professor Xu",
        "12 Acupuncture sessions",
        "12 Moxibustion (Pu Jiu) sessions",
        "4 Specialized Womb-Massage sessions",
        "4 Sound Healing & meditation ceremonies",
        "Daily Morning Qi Gong",
        "2 Tea Ceremonies",
        "Daily Evening Meditation",
        "Cultural program with ethnic minorities",
        "Daily TCM-based herbal kitchen meals at clinic",
        "Comprehensive stem-cell therapy consultation integration",
        "Take-home customized medicine preparation + 6 months follow-up support"
      ],
      de: [
        "Wöchentliche Diagnostik und Anpassung durch Professor Xu",
        "12 Akupunktur-Sitzungen",
        "12 Moxibustions-Sitzungen (Pu Jiu)",
        "4 Spezialisierte Womb-Massagen",
        "4 Sound-Healing- & Meditationszeremonien",
        "Tägliches Morgen-Qi Gong",
        "2 Teezeremonien",
        "Tägliche Abendmeditation",
        "Kulturprogramm mit ethnischen Minderheiten",
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
    en: { "1w": "1 Week Program (Cost Contribution)", "2w": "2 Weeks Program (Cost Contribution)", "4w": "4 Weeks Program (Cost Contribution)" },
    de: { "1w": "1 Woche Programm (Kostenbeitrag)", "2w": "2 Wochen Programm (Kostenbeitrag)", "4w": "4 Wochen Programm (Kostenbeitrag)" }
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
        mailSubject = `Hong Dao TCM Anmeldung - ${name}`;
        mailBody = `Hallo Nanjing,\n\nich möchte ein kostenloses 15-minütiges Beratungsgespräch buchen.\n\nHier sind meine Details:\n\n- Name: ${name}\n- E-Mail: ${email}\n- Telefon: ${phone}\n- Gewünschtes Programm: ${programText}\n- Datum: ${selectedDate}\n- Uhrzeit: ${timeDisplay}\n\nAnmerkung/Beschwerden:\n${message}\n\nVielen Dank!`;
      } else {
        mailSubject = `Hong Dao TCM Consultation Booking - ${name}`;
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
          Telefon/WhatsApp: +52 1 984 140 8335 (Deng Nanjing)
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
          Phone/WhatsApp: +52 1 984 140 8335 (Deng Nanjing)
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
            <a href="https://u.wechat.com/EKrXuMndtBkOgA4VDjFYiuY?s=2" target="_blank" style="display: block; border-radius: 8px; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); transition: transform 0.2s ease;">
              <img src="images/wechat_personal.png" alt="WeChat Personal Contact QR Code" style="width: 180px; height: 180px; display: block;">
            </a>
            <p style="font-size: 0.9rem; margin-top: 1rem; font-weight: 500;">
              <a href="https://u.wechat.com/EKrXuMndtBkOgA4VDjFYiuY?s=2" target="_blank" style="color: var(--terracotta); text-decoration: underline;">
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
            <a href="https://u.wechat.com/EKrXuMndtBkOgA4VDjFYiuY?s=2" target="_blank" style="display: block; border-radius: 8px; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); transition: transform 0.2s ease;">
              <img src="images/wechat_personal.png" alt="WeChat Personal Contact QR Code" style="width: 180px; height: 180px; display: block;">
            </a>
            <p style="font-size: 0.9rem; margin-top: 1rem; font-weight: 500;">
              <a href="https://u.wechat.com/EKrXuMndtBkOgA4VDjFYiuY?s=2" target="_blank" style="color: var(--terracotta); text-decoration: underline;">
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
          <li>Klinischer Sonder-Experte der 3. Pekinger Universität für Chinesische Medizin</li>
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
        <p><strong>Dr. Chen Kainan (陈凯南)</strong> ist Assistenzarzt an der Hong Dao Klinik und unterstützt Professor Xu bei der täglichen klinischen Arbeit.</p>
        
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
        <p><strong>Dr. Chen Kainan (陈凯南)</strong> is an assistant physician at the Hong Dao Clinic, supporting Professor Xu in daily clinical operations.</p>
        
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
      title: "Cheung Mingli – Nomadin, Yogalehrerin & Klangarbeiterin",
      body: `
        <p><strong>Cheung Mingli</strong> ist eine Nomadin und Weltenbummlerin mit über 10 Jahren internationaler Erfahrung. Sie integriert Klangtherapie, Bewegung, Atemarbeit und rituelle Praktiken, um die Regulierung des Nervensystems und das ganzheitliche Wohlbefinden in verschiedenen Gemeinschaften weltweit zu unterstützen.</p>
        
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
      title: "Cheung Mingli – Nomad, Yoga Teacher & Sound Worker",
      body: `
        <p><strong>Cheung Mingli</strong> is a nomad and world traveler with over 10 years of international experience. Mingli integrates sound therapy, movement, breathwork and ritual practices to support nervous system regulation and holistic wellbeing across diverse communities worldwide.</p>
        
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
        <p><strong>Dr. Qiao Jingwen (乔靖文)</strong> ist Direktorin der Hong Dao Klinik, Co-Gründerin des Zentrums für Kräuterausleitung und eine führende Expertin im Bereich der integrierten chinesischen Gynäkologie und der modernen myofaszialen Schmerztherapie.</p>
        
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
        <p><strong>Dr. Qiao Jingwen (乔靖文)</strong> is the Director of the Hong Dao Clinic, co-founder of the External Therapy Center, and a leading expert in integrated Chinese gynecology and modern myofascial pain management.</p>
        
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
      title: "Infrarot-Thermografie – Visualisierung des Energieflusses (Qi)",
      body: `
        <p>Die <strong>Infrarot-Thermografie</strong> ist ein hochmodernes, strahlungsfreies Diagnoseverfahren, das Infrarotstrahlungsintensitäten des menschlichen Körpers erfasst und visualisiert. In der TCM nutzen wir dieses Verfahren, um Temperaturunterschiede und damit verbundene Blockaden oder Entzündungen entlang der Meridiane sichtbar zu machen.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Funktionsweise & TCM-Integration</h4>
        <p>Aus Sicht der TCM spiegeln Temperaturabweichungen den Zustand von Yin, Yang, Qi und Blut wider. Entzündungen zeigen sich als lokale Hitze-Muster (Yang-Fülle), während Durchblutungsstörungen oder Kälte-Stagnationen (Yin-Fülle / Qi-Mangel) als kalte Zonen dargestellt werden. Dies erlaubt eine präzise Lokalisierung von Störfeldern noch vor dem Auftreten struktureller Gewebeschäden.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Therapeutischer Nutzen</h4>
        <ul class="feature-list">
          <li>Objektive Erfolgskontrolle von Akupunktur- und Kräutertherapien durch Vorher-Nachher-Vergleich der Wärmebilder.</li>
          <li>Lokalisierung von myofaszialen Triggerpunkten und versteckten Entzündungsherden im Körper.</li>
          <li>100 % sicher, berührungslos und komplett strahlungsfrei – auch für sensible Patient:innen geeignet.</li>
        </ul>
      `
    },
    en: {
      title: "Infrared Thermography – Visualizing the Flow of Qi",
      body: `
        <p><strong>Infrared Thermography</strong> is a state-of-the-art, radiation-free diagnostic imaging method that records and visualizes the body's natural thermal emissions. In TCM, we use this technology to map temperature gradients and detect energy blocks or inflammation along the meridian pathways.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">How it Works & TCM Integration</h4>
        <p>In TCM, temperature variations reflect the balance of Yin, Yang, Qi, and Blood. Inflammatory processes appear as hot zones (excess Yang), whereas blood stagnation or cold blockages (excess Yin / Qi deficiency) show up as cold areas. This allows us to locate dysfunction in the meridian pathways before structural tissue damage occurs.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Benefits</h4>
        <ul class="feature-list">
          <li>Objective visualization of therapy progress via thermal baseline and follow-up comparisons.</li>
          <li>Accurate identification of myofascial trigger points and hidden subclinical inflammation.</li>
          <li>Completely safe, non-contact, and non-invasive – suitable for all patient groups.</li>
        </ul>
      `
    }
  },
  bianstone: {
    de: {
      title: "Bian-Stein Mittelfrequenz-Therapie – Energetische Meridianregulation",
      body: `
        <p>Die <strong>Bian-Stein-Therapie</strong> kombiniert die therapeutischen Eigenschaften natürlicher Bian-Steine mit moderner Mittelfrequenz-Elektrotherapie. In der TCM wird Bian-Stein seit Jahrtausenden geschätzt, da er bei Erwärmung heilsame Ultraschallimpulse und Infrarotstrahlung aussendet.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Wirkungsweise</h4>
        <p>Durch die Verbindung des Minerals mit sanften elektrischen Mittelfrequenzen dringen die Vibrationen tief in das Fasziengewebe ein. Dies regt den zellulären Stoffwechsel an, fördert den Abtransport von Entzündungsmediatoren und löst hartnäckige Muskelverspannungen.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Indikationsbereiche</h4>
        <ul class="feature-list">
          <li>Chronische Schmerzen des Bewegungsapparates (Rückenschmerzen, Gelenkarthrose).</li>
          <li>Meridian-Blockaden zur Entstauung des lymphatischen und venösen Flusses.</li>
          <li>Unterstützung der Regeneration bei Lähmungserscheinungen und Taubheitsgefühlen.</li>
        </ul>
      `
    },
    en: {
      title: "Bian-Stone Electro-Frequency Therapy – Energetic Meridian Regulation",
      body: `
        <p><strong>Bian-Stone Therapy</strong> integrates the healing resonance of natural Bian stone with targeted medium-frequency electro-stimulation. Ancient TCM classics document Bian stone for its ability to generate high-frequency ultrasonic waves and far-infrared radiation when warmed.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Mechanisms of Action</h4>
        <p>By pairing this therapeutic mineral with electrical currents, biological frequencies penetrate deep into the myofascial layers. This stimulates cellular ATP production, accelerates the drainage of metabolic waste, and releases chronic muscular spasms.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Key Indications</h4>
        <ul class="feature-list">
          <li>Chronic musculoskeletal conditions (lower back pain, osteoarthritis, joint stiffness).</li>
          <li>Meridian stagnation affecting lymphatic circulation and cardiovascular return.</li>
          <li>Nerve rehabilitation to restore micro-sensation and motor coordination.</li>
        </ul>
      `
    }
  },
  pujiu: {
    de: {
      title: "Großflächen-Moxibustion (Pu Jiu) – Vertreibung tiefer Kälte",
      body: `
        <p>Die <strong>Rücken-Moxibustion (铺灸 - Pu Jiu)</strong> ist eines der kraftvollsten wärmetherapeutischen Verfahren der traditionellen chinesischen Medizin. Dabei wird eine Kräuterpaste und getrocknetes Beifußkraut (Moxa) großflächig entlang der Wirbelsäule (Du Mai / Lenkergefäß) verbrannt.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Das Prinzip des Du Mai</h4>
        <p>Das Du Mai (Lenkergefäß) verläuft entlang der Wirbelsäule und wird in der TCM als „Meer aller Yang-Meridiane“ bezeichnet. Durch die intensive, tief eindringende Wärme von Pu Jiu wird das Yang im gesamten Körper gestärkt, das Immunsystem reguliert und chronische Kälte-Stagnation vertrieben.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Klinische Effekte</h4>
        <ul class="feature-list">
          <li>Tiefenwirksame Vertreibung von Feuchtigkeit und Kälte, ideal bei chronischem Rheuma, Arthrose und Kältegefühl.</li>
          <li>Stärkung des Nieren-Yang bei chronischer Erschöpfung, Schwäche des Immunsystems und unerfülltem Kinderwunsch.</li>
          <li>Hormonelle Balance und Schmerzlinderung bei gynäkologischen Leiden wie Endometriose.</li>
        </ul>
      `
    },
    en: {
      title: "Large-Scale Spine Moxibustion (Pu Jiu) – Expelling Deep Cold",
      body: `
        <p><strong>Spine Moxibustion (铺灸 - Pu Jiu)</strong> is one of the most powerful warming therapies in classical TCM. Formulated herbal pastes and dry mugwort (moxa) are applied along the spine over the Du Mai (Governor Vessel) and gently burned.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">The Governor Vessel (Du Mai)</h4>
        <p>The Du Mai meridian runs along the midline of the back and is considered the "Sea of Yang Meridians" in TCM. The deep, sustained thermal stimulation of Pu Jiu activates the body's defensive Qi (Wei Qi), raises metabolic fire, and clears deep constitutional cold.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Clinical Efficacy</h4>
        <ul class="feature-list">
          <li>Disperses wind-cold-dampness, providing relief in rheumatoid arthritis and joint degeneration.</li>
          <li>Nourishes Kidney Yang to combat chronic fatigue, adrenal burnout, and low fertility markers.</li>
          <li>Aids in regulating menstrual cycles and easing gynecological stagnation syndromes like endometriosis.</li>
        </ul>
      `
    }
  },
  spectrumcabin: {
    de: {
      title: "Ganzkörper-Spektralkabine – Systemische Entgiftung",
      body: `
        <p>Die <strong>Ganzkörper-Spektralkabine</strong> ist eine moderne Weiterentwicklung der Infrarotsauna, die ein speziell auf die Zellemissionen abgestimmtes bio-elektromagnetisches Wellenspektrum nutzt.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Biophysikalische Wirkung</h4>
        <p>Die Frequenzen regen die Wassermoleküle im Gewebe zur Schwingung an, was zu einer tiefen Erwärmung führt. Dies beschleunigt die Mikrozirkulation, verbessert die Dehnbarkeit der Faszien und fördert die Ausleitung von Zellgiften und Schwermetallen über die Haut.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Einsatzbereiche in unserer Praxis</h4>
        <ul class="feature-list">
          <li>Unterstützung bei Entgiftungskuren und Fastenbegleitung.</li>
          <li>Vegetative Entspannung des Nervensystems zur Stressreduktion.</li>
          <li>Linderung von chronischen Muskelverspannungen und Schmerzzuständen.</li>
        </ul>
      `
    },
    en: {
      title: "Whole-Body Spectrum Cabin – Systemic Cellular Detoxification",
      body: `
        <p>The <strong>Whole-Body Spectrum Cabin</strong> uses a broad bio-matched electromagnetic spectrum designed to match the body's natural thermal wavelengths, going beyond conventional infrared technology.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Biophysical Mechanism</h4>
        <p>These specialized wavelengths resonate with intracellular water molecules, generating heat deep within tissues. This thermal action improves capillary microcirculation, enhances fascial flexibility, and promotes sweat-induced excretion of cellular waste and heavy metals.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Key Benefits</h4>
        <ul class="feature-list">
          <li>Facilitates deep cellular cleansing and metabolic detoxification programs.</li>
          <li>Restores balance to the autonomic nervous system, promoting deep sleep.</li>
          <li>Relieves generalized body pain, chronic fatigue, and muscular stiffness.</li>
        </ul>
      `
    }
  },
  spectrumradiator: {
    de: {
      title: "Lokalisiertes Spektral-Bestrahlungsgerät – Gezielte Geweberegeneration",
      body: `
        <p>Das <strong>Lokalisierte Spektral-Bestrahlungsgerät</strong> nutzt gezielte elektromagnetische Frequenzen, um lokale Entzündungsprozesse zu regulieren und die Selbstheilungskräfte des Gewebes anzuregen.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Kombination mit Akupunktur</h4>
        <p>In unserer Praxis setzen wir das Gerät häufig zeitgleich mit Akupunkturnadeln ein. Die Wärme und Frequenzen erwärmen die Nadeln und leiten die Energie tief in die Akupunkturpunkte (Ashi-Punkte), wodurch die heilsame Wirkung verdoppelt wird.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Indikationsbereiche</h4>
        <ul class="feature-list">
          <li>Lokale Muskel- und Gelenkschmerzen (Halswirbelsäulen-Syndrom, Tennisarm).</li>
          <li>Unterstützung der Wundheilung und Linderung chronischer Hautentzündungen.</li>
          <li>Wärmebehandlung des Unterbauchs bei gynäkologischen Schmerzen.</li>
        </ul>
      `
    },
    en: {
      title: "Localized Spectrum Radiator – Targeted Tissue Regeneration",
      body: `
        <p>The <strong>Localized Spectrum Radiator</strong> delivers target-focused electromagnetic wavelengths to soothe local inflammation and accelerate tissue recovery.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Integration with Acupuncture</h4>
        <p>We often utilize this device in conjunction with traditional acupuncture. Wavelengths warm the needles to direct kinetic thermal energy deep into the points (Ashi points), amplifying the therapeutic benefit of needle stimulation.</p>
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; color: var(--terracotta);">Common Applications</h4>
        <ul class="feature-list">
          <li>Localized myofascial pain, joint inflammation, and back stiffness.</li>
          <li>Supports dermal healing, helping clear localized rashes or scars.</li>
          <li>Pelvic warmth therapy to relieve gynecological spasms and womb coldness.</li>
        </ul>
      `
    }
  },
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
  const galleryMoreBtn = document.getElementById("gallery-more-btn");
  if (galleryMoreBtn) {
    galleryMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".gallery-item.hidden-item").forEach(item => {
        item.style.display = "block";
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
});

window.openArticleModal = openArticleModal;
window.closeArticleModal = closeArticleModal;
