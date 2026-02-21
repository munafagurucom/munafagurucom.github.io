// Service Management System
// Add or modify services in this array to update the website

const services = [
    {
        serviceId: "1",
        name: "Body Polish : Herbal Body Polish",
        offerPrice: 1199,
        actualPrice: 2398,
        tags: ["Body Polish"],
        rating: 4.95,
        duration: "45 min",
        description: "Herbal body polish treatment"
    },
    {
        serviceId: "2",
        name: "Body Polish : Coffee & Choco Butter",
        offerPrice: 1799,
        actualPrice: 3598,
        tags: ["Body Polish"],
        rating: 4.9,
        duration: "45 min",
        description: "Coffee and chocolate butter body polish"
    },
    {
        serviceId: "3",
        name: "Combo : Facial(VLCC Fruit) + Waxing(Honey) Full Leg + Full Arm + Pedicure + Threading Upper Lip + Cut & File Hand + Cut & File Feet",
        offerPrice: 1499,
        actualPrice: 2798,
        tags: ["Combo"],
        rating: 4.95,
        duration: "150 min",
        description: "Complete combo package with facial, waxing, pedicure, threading and nail care"
    },
    {
        serviceId: "4",
        name: "Combo : Facial(VLCC Fruit) + Waxing(Honey) Full Leg + Full Arm + Underarm",
        offerPrice: 1499,
        actualPrice: 2598,
        tags: ["Combo"],
        rating: 4.75,
        duration: "100 min",
        description: "Combo package with facial and full body waxing"
    },
    {
        serviceId: "5",
        name: "Combo : Facial(VLCC Fruit) + Waxing(Honey) Full Leg + Full Arm + Detan Face + Detan Neck + Threading Upper Lip",
        offerPrice: 1499,
        actualPrice: 2598,
        tags: ["Combo"],
        rating: 4.9,
        duration: "110 min",
        description: "Combo package with facial, waxing, detan and threading"
    },
    {
        serviceId: "6",
        name: "Combo : Facial(VLCC Fruit) + Waxing(Honey) Full Leg + Full Arm + Threading Upper Lip + Threading Eye Brows + Massage Back&Shoulder 10 Min",
        offerPrice: 1499,
        actualPrice: 2598,
        tags: ["Combo"],
        rating: 4.75,
        duration: "120 min",
        description: "Combo package with facial, waxing, threading and massage"
    },
    {
        serviceId: "7",
        name: "Raaga Detan : Face & Neck",
        offerPrice: 249,
        actualPrice: 498,
        tags: ["Detan"],
        rating: 4.55,
        duration: "30 Min",
        description: "Face and neck detan treatment"
    },
    {
        serviceId: "8",
        name: "Raaga Detan : Full Hands",
        offerPrice: 399,
        actualPrice: 798,
        tags: ["Detan"],
        rating: 4.7,
        duration: "30 Min",
        description: "Full hands detan treatment"
    },
    {
        serviceId: "9",
        name: "Raaga Detan : Full Legs",
        offerPrice: 479,
        actualPrice: 958,
        tags: ["Detan"],
        rating: 4.95,
        duration: "30 Min",
        description: "Full legs detan treatment"
    },
    {
        serviceId: "10",
        name: "Raaga Detan : Full Back",
        offerPrice: 559,
        actualPrice: 1118,
        tags: ["Detan"],
        rating: 4.85,
        duration: "30 Min",
        description: "Full back detan treatment"
    },
    {
        serviceId: "11",
        name: "Raaga Detan : Underarms",
        offerPrice: 129,
        actualPrice: 258,
        tags: ["Detan"],
        rating: 4.9,
        duration: "30 Min",
        description: "Underarms detan treatment"
    },
    {
        serviceId: "12",
        name: "Facials : VLCC Fruit",
        offerPrice: 459,
        actualPrice: 918,
        tags: ["Facials"],
        rating: 4.65,
        duration: "60 min",
        description: "VLCC fruit facial treatment"
    },
    {
        serviceId: "13",
        name: "Facials : VLCC Insta Glow",
        offerPrice: 489,
        actualPrice: 978,
        tags: ["Facials"],
        rating: 4.5,
        duration: "60 min",
        description: "VLCC instant glow facial"
    },
    {
        serviceId: "14",
        name: "Facials : VLCC Anti Tan",
        offerPrice: 499,
        actualPrice: 998,
        tags: ["Facials"],
        rating: 4.95,
        duration: "60 min",
        description: "VLCC anti-tan facial treatment"
    },
    {
        serviceId: "15",
        name: "Facials : VLCC Gold",
        offerPrice: 899,
        actualPrice: 1798,
        tags: ["Facials"],
        rating: 4.6,
        duration: "60 min",
        description: "VLCC gold facial treatment"
    },
    {
        serviceId: "16",
        name: "Facials : O3+ Power Brightening",
        offerPrice: 1169,
        actualPrice: 2338,
        tags: ["Facials"],
        rating: 4.6,
        duration: "60 min",
        description: "O3+ power brightening facial"
    },
    {
        serviceId: "17",
        name: "Facials : O3+ Anti Aging",
        offerPrice: 1499,
        actualPrice: 2798,
        tags: ["Facials"],
        rating: 4.7,
        duration: "60 min",
        description: "O3+ anti-aging facial treatment"
    },
    {
        serviceId: "18",
        name: "Facials : O3+ Shine and Glow",
        offerPrice: 1499,
        actualPrice: 2798,
        tags: ["Facials"],
        rating: 4.8,
        duration: "60 min",
        description: "O3+ shine and glow facial"
    },
    {
        serviceId: "19",
        name: "Facials : O3+ Vitamin C",
        offerPrice: 1499,
        actualPrice: 2798,
        tags: ["Facials"],
        rating: 4.85,
        duration: "60 min",
        description: "O3+ vitamin C facial treatment"
    },
    {
        serviceId: "20",
        name: "Facials : O3+ D-Tan Facial",
        offerPrice: 1499,
        actualPrice: 2798,
        tags: ["Facials"],
        rating: 4.9,
        duration: "60 min",
        description: "O3+ D-tan facial treatment"
    },
    {
        serviceId: "21",
        name: "Facials : O3+ Bridal Facial",
        offerPrice: 1899,
        actualPrice: 3798,
        tags: ["Facials"],
        rating: 4.95,
        duration: "60 min",
        description: "O3+ bridal facial treatment"
    },
    {
        serviceId: "22",
        name: "Facials : Korean Glass Facial",
        offerPrice: 1999,
        actualPrice: 3998,
        tags: ["Facials"],
        rating: 4.9,
        duration: "60 min",
        description: "Korean glass facial treatment"
    },
    {
        serviceId: "23",
        name: "Facials : Hydra Facial (Traditional)",
        offerPrice: 1999,
        actualPrice: 3998,
        tags: ["Facials"],
        rating: 4.75,
        duration: "60 min",
        description: "Traditional hydra facial"
    },
    {
        serviceId: "24",
        name: "Facials : Lotus Face Whitening",
        offerPrice: 899,
        actualPrice: 1798,
        tags: ["Facials"],
        rating: 4.6,
        duration: "60 min",
        description: "Lotus face whitening facial"
    },
    {
        serviceId: "25",
        name: "Facials : Lotus Anti Aging",
        offerPrice: 1049,
        actualPrice: 2098,
        tags: ["Facials"],
        rating: 4.65,
        duration: "60 min",
        description: "Lotus anti-aging facial treatment"
    },
    {
        serviceId: "26",
        name: "Facials : Raaga Face Whitening",
        offerPrice: 999,
        actualPrice: 1998,
        tags: ["Facials"],
        rating: 4.6,
        duration: "60 min",
        description: "Raaga face whitening facial"
    },
    {
        serviceId: "27",
        name: "Facials : Asta Wine Facial",
        offerPrice: 899,
        actualPrice: 1798,
        tags: ["Facials"],
        rating: 4.75,
        duration: "60 min",
        description: "Asta wine facial treatment"
    },
    {
        serviceId: "28",
        name: "Facials : Shahnaz Gold",
        offerPrice: 1899,
        actualPrice: 3798,
        tags: ["Facials"],
        rating: 4.6,
        duration: "60 min",
        description: "Shahnaz gold facial treatment"
    },
    {
        serviceId: "29",
        name: "Facials : Shahnaz Diamond",
        offerPrice: 1999,
        actualPrice: 3998,
        tags: ["Facials"],
        rating: 4.8,
        duration: "60 min",
        description: "Shahnaz diamond facial treatment"
    },
    {
        serviceId: "30",
        name: "Facials : Basic Herbal Cleanup",
        offerPrice: 299,
        actualPrice: 598,
        tags: ["Facials"],
        rating: 4.8,
        duration: "60 min",
        description: "Basic herbal cleanup treatment"
    },
    {
        serviceId: "31",
        name: "Facials : Detan Cleanup",
        offerPrice: 399,
        actualPrice: 798,
        tags: ["Facials"],
        rating: 4.7,
        duration: "60 min",
        description: "Detan cleanup treatment"
    },
    {
        serviceId: "32",
        name: "Oxy Bleach : Face & Neck",
        offerPrice: 249,
        actualPrice: 498,
        tags: ["Facials"],
        rating: 4.65,
        duration: "30 Min",
        description: "Oxy bleach for face and neck"
    },
    {
        serviceId: "33",
        name: "Oxy Bleach : Full Hands",
        offerPrice: 399,
        actualPrice: 798,
        tags: ["Facials"],
        rating: 4.75,
        duration: "30 Min",
        description: "Oxy bleach for full hands"
    },
    {
        serviceId: "34",
        name: "Oxy Bleach : Full Legs",
        offerPrice: 479,
        actualPrice: 958,
        tags: ["Facials"],
        rating: 4.85,
        duration: "30 Min",
        description: "Oxy bleach for full legs"
    },
    {
        serviceId: "35",
        name: "Oxy Bleach : Full Back",
        offerPrice: 559,
        actualPrice: 1118,
        tags: ["Facials"],
        rating: 4.9,
        duration: "30 Min",
        description: "Oxy bleach for full back"
    },
    {
        serviceId: "36",
        name: "Oxy Bleach : Underarms",
        offerPrice: 129,
        actualPrice: 258,
        tags: ["Facials"],
        rating: 4.6,
        duration: "30 Min",
        description: "Oxy bleach for underarms"
    },
    {
        serviceId: "37",
        name: "Color Application : Henna",
        offerPrice: 249,
        actualPrice: 498,
        tags: ["Hair"],
        rating: 4.95,
        duration: "60 min",
        description: "Henna color application"
    },
    {
        serviceId: "38",
        name: "Color Application : Root Touchup",
        offerPrice: 259,
        actualPrice: 518,
        tags: ["Hair"],
        rating: 4.6,
        duration: "60 min",
        description: "Root touchup color application"
    },
    {
        serviceId: "39",
        name: "Color Application : Full Hair",
        offerPrice: 349,
        actualPrice: 698,
        tags: ["Hair"],
        rating: 4.8,
        duration: "60 min",
        description: "Full hair color application"
    },
    {
        serviceId: "40",
        name: "Straightening / Smoothening : Front Hair",
        offerPrice: 1799,
        actualPrice: 3598,
        tags: ["Hair"],
        rating: 4.95,
        duration: "45 min",
        description: "Front hair straightening/smoothening"
    },
    {
        serviceId: "41",
        name: "Straightening / Smoothening : Shoulder Length",
        offerPrice: 2999,
        actualPrice: 5998,
        tags: ["Hair"],
        rating: 4.95,
        duration: "45 min",
        description: "Shoulder length hair straightening/smoothening"
    },
    {
        serviceId: "42",
        name: "Straightening / Smoothening : Midback Length",
        offerPrice: 3199,
        actualPrice: 6398,
        tags: ["Hair"],
        rating: 4.95,
        duration: "45 min",
        description: "Midback length hair straightening/smoothening"
    },
    {
        serviceId: "43",
        name: "Straightening / Smoothening : Waist Length",
        offerPrice: 3499,
        actualPrice: 6998,
        tags: ["Hair"],
        rating: 4.95,
        duration: "45 min",
        description: "Waist length hair straightening/smoothening"
    },
    {
        serviceId: "44",
        name: "Professional Color (Loreal/Schwarzkopf) : Root Touchup",
        offerPrice: 749,
        actualPrice: 1498,
        tags: ["Hair"],
        rating: 4.6,
        duration: "45 min",
        description: "Professional root touchup color"
    },
    {
        serviceId: "45",
        name: "Professional Color (Loreal/Schwarzkopf) : Shoulder Length",
        offerPrice: 1199,
        actualPrice: 2398,
        tags: ["Hair"],
        rating: 4.55,
        duration: "45 min",
        description: "Professional color for shoulder length hair"
    },
    {
        serviceId: "46",
        name: "Professional Color (Loreal/Schwarzkopf) : Midback Length",
        offerPrice: 1599,
        actualPrice: 3198,
        tags: ["Hair"],
        rating: 4.7,
        duration: "45 min",
        description: "Professional color for midback length hair"
    },
    {
        serviceId: "47",
        name: "Professional Color (Loreal/Schwarzkopf) : Waist Length",
        offerPrice: 2099,
        actualPrice: 4198,
        tags: ["Hair"],
        rating: 4.65,
        duration: "45 min",
        description: "Professional color for waist length hair"
    },
    {
        serviceId: "48",
        name: "Hair Cut : Basic Trim",
        offerPrice: 269,
        actualPrice: 538,
        tags: ["Hair"],
        rating: 4.6,
        duration: "45 min",
        description: "Basic hair trim"
    },
    {
        serviceId: "49",
        name: "Hair Cut : Stylish Cut",
        offerPrice: 499,
        actualPrice: 998,
        tags: ["Hair"],
        rating: 4.7,
        duration: "45 min",
        description: "Stylish hair cut"
    },
    {
        serviceId: "50",
        name: "L'Oreal Hair Spa : Till Shoulder",
        offerPrice: 699,
        actualPrice: 1398,
        tags: ["Hair"],
        rating: 4.7,
        duration: "45 min",
        description: "L'Oreal hair spa till shoulder length"
    },
    {
        serviceId: "51",
        name: "L'Oreal Hair Spa : Above Shoulder",
        offerPrice: 799,
        actualPrice: 1598,
        tags: ["Hair"],
        rating: 4.65,
        duration: "45 min",
        description: "L'Oreal hair spa above shoulder length"
    },
    {
        serviceId: "52",
        name: "L'Oreal Hair Spa : Medium Length",
        offerPrice: 849,
        actualPrice: 1698,
        tags: ["Hair"],
        rating: 4.65,
        duration: "45 min",
        description: "L'Oreal hair spa for medium length hair"
    },
    {
        serviceId: "53",
        name: "L'Oreal Hair Spa : Waist Length",
        offerPrice: 999,
        actualPrice: 1998,
        tags: ["Hair"],
        rating: 4.8,
        duration: "45 min",
        description: "L'Oreal hair spa for waist length hair"
    },
    {
        serviceId: "54",
        name: "L'Oreal Hair Spa : O3+ Hair Spa Damage Remedy",
        offerPrice: 1099,
        actualPrice: 2198,
        tags: ["Hair"],
        rating: 4.75,
        duration: "45 min",
        description: "O3+ hair spa damage remedy treatment"
    },
    {
        serviceId: "55",
        name: "Hair Styling : Blow Dry",
        offerPrice: 419,
        actualPrice: 838,
        tags: ["Hair"],
        rating: 4.7,
        duration: "45 min",
        description: "Professional blow dry styling"
    },
    {
        serviceId: "56",
        name: "Hair Styling : Flat Iron",
        offerPrice: 519,
        actualPrice: 1038,
        tags: ["Hair"],
        rating: 4.95,
        duration: "45 min",
        description: "Flat iron hair styling"
    },
    {
        serviceId: "57",
        name: "Streaks & Highlights : Per Streaks",
        offerPrice: 279,
        actualPrice: 558,
        tags: ["Hair"],
        rating: 4.9,
        duration: "45 min",
        description: "Per streaks highlights"
    },
    {
        serviceId: "58",
        name: "Streaks & Highlights : Short Length Highlights",
        offerPrice: 2799,
        actualPrice: 5598,
        tags: ["Hair"],
        rating: 4.7,
        duration: "45 min",
        description: "Short length highlights"
    },
    {
        serviceId: "59",
        name: "Streaks & Highlights : Medium Length Highlights",
        offerPrice: 2999,
        actualPrice: 5998,
        tags: ["Hair"],
        rating: 4.95,
        duration: "45 min",
        description: "Medium length highlights"
    },
    {
        serviceId: "60",
        name: "Streaks & Highlights : Waist Length Highlights",
        offerPrice: 3099,
        actualPrice: 6198,
        tags: ["Hair"],
        rating: 4.8,
        duration: "45 min",
        description: "Waist length highlights"
    },
    {
        serviceId: "61",
        name: "Manicure : Aroma",
        offerPrice: 419,
        actualPrice: 838,
        tags: ["Manicure"],
        rating: 4.8,
        duration: "45 min",
        description: "Aroma manicure treatment"
    },
    {
        serviceId: "62",
        name: "Manicure : Sara",
        offerPrice: 549,
        actualPrice: 1098,
        tags: ["Manicure"],
        rating: 4.55,
        duration: "45 min",
        description: "Sara manicure treatment"
    },
    {
        serviceId: "63",
        name: "Manicure : O3+ Premium",
        offerPrice: 899,
        actualPrice: 1798,
        tags: ["Manicure"],
        rating: 4.5,
        duration: "45 min",
        description: "O3+ premium manicure treatment"
    },
    {
        serviceId: "64",
        name: "Massage (Relaxation) : Anti Wrinkle Face (10 Min)",
        offerPrice: 139,
        actualPrice: 278,
        tags: ["Massage"],
        rating: 4.85,
        duration: "45 min",
        description: "Anti wrinkle face massage (10 minutes)"
    },
    {
        serviceId: "65",
        name: "Massage (Relaxation) : Head (15 Min)",
        offerPrice: 189,
        actualPrice: 378,
        tags: ["Massage"],
        rating: 4.55,
        duration: "45 min",
        description: "Head massage (15 minutes)"
    },
    {
        serviceId: "66",
        name: "Massage (Relaxation) : Foot (15 Min)",
        offerPrice: 259,
        actualPrice: 518,
        tags: ["Massage"],
        rating: 4.8,
        duration: "45 min",
        description: "Foot massage (15 minutes)"
    },
    {
        serviceId: "67",
        name: "Massage (Relaxation) : Leg (15 Min)",
        offerPrice: 329,
        actualPrice: 658,
        tags: ["Massage"],
        rating: 4.5,
        duration: "45 min",
        description: "Leg massage (15 minutes)"
    },
    {
        serviceId: "68",
        name: "Massage (Relaxation) : Back (15 Min)",
        offerPrice: 329,
        actualPrice: 658,
        tags: ["Massage"],
        rating: 4.95,
        duration: "45 min",
        description: "Back massage (15 minutes)"
    },
    {
        serviceId: "69",
        name: "Massage (Relaxation) : Shoulder & Back (20 Min)",
        offerPrice: 499,
        actualPrice: 998,
        tags: ["Massage"],
        rating: 4.7,
        duration: "45 min",
        description: "Shoulder and back massage (20 minutes)"
    },
    {
        serviceId: "70",
        name: "Massage (Relaxation) : Full Body (60 Min)",
        offerPrice: 1099,
        actualPrice: 2198,
        tags: ["Massage"],
        rating: 4.9,
        duration: "45 min",
        description: "Full body massage (60 minutes)"
    },
    {
        serviceId: "71",
        name: "Pedicure : Aroma",
        offerPrice: 449,
        actualPrice: 898,
        tags: ["Pedicure"],
        rating: 4.8,
        duration: "45 min",
        description: "Aroma pedicure treatment"
    },
    {
        serviceId: "72",
        name: "Pedicure : Sara",
        offerPrice: 599,
        actualPrice: 1198,
        tags: ["Pedicure"],
        rating: 4.8,
        duration: "45 min",
        description: "Sara pedicure treatment"
    },
    {
        serviceId: "73",
        name: "Pedicure : O3+ Premium",
        offerPrice: 899,
        actualPrice: 1798,
        tags: ["Pedicure"],
        rating: 4.8,
        duration: "45 min",
        description: "O3+ premium pedicure treatment"
    },
    {
        serviceId: "74",
        name: "Threading : Eyebrows",
        offerPrice: 49,
        actualPrice: 98,
        tags: ["Threading"],
        rating: 4.5,
        duration: "45 min",
        description: "Eyebrow threading"
    },
    {
        serviceId: "75",
        name: "Threading : Upperlip",
        offerPrice: 39,
        actualPrice: 78,
        tags: ["Threading"],
        rating: 4.8,
        duration: "45 min",
        description: "Upper lip threading"
    },
    {
        serviceId: "76",
        name: "Threading : Lowerlip",
        offerPrice: 39,
        actualPrice: 78,
        tags: ["Threading"],
        rating: 4.55,
        duration: "45 min",
        description: "Lower lip threading"
    },
    {
        serviceId: "77",
        name: "Threading : Forehead",
        offerPrice: 39,
        actualPrice: 78,
        tags: ["Threading"],
        rating: 4.9,
        duration: "45 min",
        description: "Forehead threading"
    },
    {
        serviceId: "78",
        name: "Threading : Chin",
        offerPrice: 39,
        actualPrice: 78,
        tags: ["Threading"],
        rating: 4.75,
        duration: "45 min",
        description: "Chin threading"
    },
    {
        serviceId: "79",
        name: "Threading : Sidelocks",
        offerPrice: 49,
        actualPrice: 98,
        tags: ["Threading"],
        rating: 4.6,
        duration: "45 min",
        description: "Sidelocks threading"
    },
    {
        serviceId: "80",
        name: "Waxing (Honey) : Full Hands",
        offerPrice: 279,
        actualPrice: 558,
        tags: ["Waxing"],
        rating: 4.9,
        duration: "30 Min",
        description: "Full hands honey waxing"
    },
    {
        serviceId: "81",
        name: "Waxing (Honey) : Full Legs",
        offerPrice: 299,
        actualPrice: 598,
        tags: ["Waxing"],
        rating: 4.85,
        duration: "30 Min",
        description: "Full legs honey waxing"
    },
    {
        serviceId: "82",
        name: "Waxing (Honey) : Full Back",
        offerPrice: 259,
        actualPrice: 518,
        tags: ["Waxing"],
        rating: 4.75,
        duration: "30 Min",
        description: "Full back honey waxing"
    },
    {
        serviceId: "83",
        name: "Waxing (Honey) : Stomach",
        offerPrice: 210,
        actualPrice: 420,
        tags: ["Waxing"],
        rating: 4.9,
        duration: "30 Min",
        description: "Stomach honey waxing"
    },
    {
        serviceId: "84",
        name: "Waxing (Honey) : Full Face",
        offerPrice: 179,
        actualPrice: 358,
        tags: ["Waxing"],
        rating: 4.7,
        duration: "30 Min",
        description: "Full face honey waxing"
    },
    {
        serviceId: "85",
        name: "Waxing (Honey) : Half Legs",
        offerPrice: 199,
        actualPrice: 398,
        tags: ["Waxing"],
        rating: 4.6,
        duration: "30 Min",
        description: "Half legs honey waxing"
    },
    {
        serviceId: "86",
        name: "Waxing (Honey) : Half Hands",
        offerPrice: 179,
        actualPrice: 358,
        tags: ["Waxing"],
        rating: 4.7,
        duration: "30 Min",
        description: "Half hands honey waxing"
    },
    {
        serviceId: "87",
        name: "Waxing (Honey) : Half Back",
        offerPrice: 169,
        actualPrice: 338,
        tags: ["Waxing"],
        rating: 4.9,
        duration: "30 Min",
        description: "Half back honey waxing"
    },
    {
        serviceId: "88",
        name: "Waxing (Honey) : Side Locks",
        offerPrice: 59,
        actualPrice: 118,
        tags: ["Waxing"],
        rating: 4.95,
        duration: "30 Min",
        description: "Side locks honey waxing"
    },
    {
        serviceId: "89",
        name: "Waxing (Honey) : Chin",
        offerPrice: 39,
        actualPrice: 78,
        tags: ["Waxing"],
        rating: 4.55,
        duration: "30 Min",
        description: "Chin honey waxing"
    },
    {
        serviceId: "90",
        name: "Waxing (Honey) : Underarms",
        offerPrice: 49,
        actualPrice: 98,
        tags: ["Waxing"],
        rating: 4.8,
        duration: "30 Min",
        description: "Underarms honey waxing"
    },
    {
        serviceId: "91",
        name: "Waxing (Honey) : Bikini",
        offerPrice: 419,
        actualPrice: 838,
        tags: ["Waxing"],
        rating: 4.5,
        duration: "30 Min",
        description: "Bikini honey waxing"
    },
    {
        serviceId: "92",
        name: "Waxing (Honey) : Brazilian Bikini",
        offerPrice: 899,
        actualPrice: 1798,
        tags: ["Waxing"],
        rating: 4.5,
        duration: "30 Min",
        description: "Brazilian bikini honey waxing"
    },
    {
        serviceId: "93",
        name: "Waxing (Honey) : Brazilian Full Face",
        offerPrice: 549,
        actualPrice: 1098,
        tags: ["Waxing"],
        rating: 4.6,
        duration: "30 Min",
        description: "Brazilian full face honey waxing"
    },
    {
        serviceId: "94",
        name: "Waxing (Honey) : Brazilian Upperlip",
        offerPrice: 199,
        actualPrice: 398,
        tags: ["Waxing"],
        rating: 4.9,
        duration: "30 Min",
        description: "Brazilian upper lip honey waxing"
    },
    {
        serviceId: "95",
        name: "Waxing (Honey) : Honey Full Body Wax",
        offerPrice: 1549,
        actualPrice: 3098,
        tags: ["Waxing"],
        rating: 4.75,
        duration: "30 Min",
        description: "Full body honey waxing"
    },
    {
        serviceId: "96",
        name: "Waxing (Rica) : Full Hands",
        offerPrice: 399,
        actualPrice: 798,
        tags: ["Waxing"],
        rating: 4.5,
        duration: "30 Min",
        description: "Full hands Rica waxing"
    },
    {
        serviceId: "97",
        name: "Waxing (Rica) : Full Legs",
        offerPrice: 469,
        actualPrice: 938,
        tags: ["Waxing"],
        rating: 4.9,
        duration: "30 Min",
        description: "Full legs Rica waxing"
    },
    {
        serviceId: "98",
        name: "Waxing (Rica) : Full Back",
        offerPrice: 389,
        actualPrice: 778,
        tags: ["Waxing"],
        rating: 4.85,
        duration: "30 Min",
        description: "Full back Rica waxing"
    },
    {
        serviceId: "99",
        name: "Waxing (Rica) : Stomach",
        offerPrice: 299,
        actualPrice: 598,
        tags: ["Waxing"],
        rating: 4.75,
        duration: "30 Min",
        description: "Stomach Rica waxing"
    },
    {
        serviceId: "100",
        name: "Waxing (Rica) : Full Face",
        offerPrice: 239,
        actualPrice: 478,
        tags: ["Waxing"],
        rating: 4.5,
        duration: "30 Min",
        description: "Full face Rica waxing"
    },
    {
        serviceId: "101",
        name: "Waxing (Rica) : Half Legs",
        offerPrice: 279,
        actualPrice: 558,
        tags: ["Waxing"],
        rating: 4.7,
        duration: "30 Min",
        description: "Half legs Rica waxing"
    },
    {
        serviceId: "102",
        name: "Waxing (Rica) : Half Hands",
        offerPrice: 249,
        actualPrice: 498,
        tags: ["Waxing"],
        rating: 4.5,
        duration: "30 Min",
        description: "Half hands Rica waxing"
    },
    {
        serviceId: "103",
        name: "Waxing (Rica) : Half Back",
        offerPrice: 249,
        actualPrice: 498,
        tags: ["Waxing"],
        rating: 4.6,
        duration: "30 Min",
        description: "Half back Rica waxing"
    },
    {
        serviceId: "104",
        name: "Waxing (Rica) : Side Locks",
        offerPrice: 119,
        actualPrice: 238,
        tags: ["Waxing"],
        rating: 4.7,
        duration: "30 Min",
        description: "Side locks Rica waxing"
    },
    {
        serviceId: "105",
        name: "Waxing (Rica) : Chin",
        offerPrice: 59,
        actualPrice: 118,
        tags: ["Waxing"],
        rating: 4.55,
        duration: "30 Min",
        description: "Chin Rica waxing"
    },
    {
        serviceId: "106",
        name: "Waxing (Rica) : Underarms",
        offerPrice: 99,
        actualPrice: 198,
        tags: ["Waxing"],
        rating: 4.95,
        duration: "30 Min",
        description: "Underarms Rica waxing"
    },
    {
        serviceId: "107",
        name: "Waxing (Rica) : Bikini",
        offerPrice: 599,
        actualPrice: 1198,
        tags: ["Waxing"],
        rating: 4.95,
        duration: "30 Min",
        description: "Bikini Rica waxing"
    }
];

// Service Management Functions
class ServiceManager {
    constructor() {
        this.services = services;
        this.currentFilter = 'all';
    }

    // Get all services
    getAllServices() {
        return this.services;
    }

    // Get service by ID
    getServiceById(serviceId) {
        return this.services.find(service => service.serviceId === serviceId);
    }

    // Filter services by tag
    filterServicesByTag(tag) {
        if (tag === 'all') {
            return this.services;
        }
        return this.services.filter(service => service.tags.includes(tag));
    }

    // Get all unique tags
    getAllTags() {
        const tags = new Set();
        this.services.forEach(service => {
            service.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }

    // Search services by name
    searchServices(query) {
        const searchTerm = query.toLowerCase();
        return this.services.filter(service => 
            service.name.toLowerCase().includes(searchTerm) ||
            service.description.toLowerCase().includes(searchTerm)
        );
    }

    // Get services in price range
    getServicesInPriceRange(minPrice, maxPrice) {
        return this.services.filter(service => 
            service.offerPrice >= minPrice && service.offerPrice <= maxPrice
        );
    }

    // Sort services by price
    sortServicesByPrice(order = 'asc') {
        return [...this.services].sort((a, b) => {
            return order === 'asc' ? 
                a.offerPrice - b.offerPrice : 
                b.offerPrice - a.offerPrice;
        });
    }

    // Sort services by rating
    sortServicesByRating(order = 'desc') {
        return [...this.services].sort((a, b) => {
            return order === 'desc' ? 
                b.rating - a.rating : 
                a.rating - b.rating;
        });
    }

    // Get featured services (high rating and popular)
    getFeaturedServices() {
        return this.services.filter(service => service.rating >= 4.5);
    }

    // Get services by duration
    getServicesByDuration(maxDuration) {
        return this.services.filter(service => {
            const duration = parseInt(service.duration);
            return duration <= maxDuration;
        });
    }
}

// Create global service manager instance
const serviceManager = new ServiceManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ServiceManager, serviceManager, services };
}
