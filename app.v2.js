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
    "doctor-1-name": "Dr. Adrianna Qiao (乔婧文)",
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
    "treatment-3-badge": "Neurology"
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
    "doctor-1-name": "Dr. Adrianna Qiao (乔婧文)",
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
    "treatment-3-badge": "Neurologie"
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

      const mailtoUrl = `mailto:nanjing.deng18@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
      window.location.href = mailtoUrl;
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
    }

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

  // Show popup after 2.5 seconds, if not dismissed in this session
  if (!sessionStorage.getItem("hongdao-popup-dismissed")) {
    setTimeout(() => {
      popup.classList.add("active");
    }, 2500);
  }

  const dismissPopup = () => {
    popup.classList.remove("active");
    sessionStorage.setItem("hongdao-popup-dismissed", "true");
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
