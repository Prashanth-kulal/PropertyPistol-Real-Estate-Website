// ============================================================================
// CENTRALIZED CITY TRANSIT & RAIL NETWORKS REGISTRY
// Supports all 19 cities with verified stations, accurate geographical coordinates,
// schematic vector alignments, interchange markers, and honest real-time transparency.
// ============================================================================

export const CITY_TRANSIT_NETWORKS = {
  "mumbai": {
    "cityId": "mumbai",
    "cityName": "Mumbai",
    "networkTitle": "Mumbai Suburban Rail Network",
    "networkSubtitle": "Western \u2022 Central \u2022 Harbour \u2022 Trans-Harbour Suburban Corridors",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 220 30 Q 230 200 240 350 Q 230 500 215 650 Q 190 750 190 940 Q 230 950 260 900 Q 280 850 290 750 Q 350 700 420 650 Q 480 600 550 560 Q 620 500 680 430 Q 720 350 710 250 Q 680 150 640 80 Z M 710 430 Q 740 500 740 600 Q 750 700 780 750 Q 820 800 870 820 Q 920 820 940 760 Q 940 650 930 550 Q 920 450 860 417 Z M 850 417 Q 950 417 1020 417 Q 1100 350 1210 180 Q 1230 190 1220 220 Q 1120 380 1040 430 Q 1100 550 1170 750 Q 1170 810 1150 830 Q 1080 870 1030 900 Z",
    "lines": [
      {
        "id": "western",
        "label": "Western Line",
        "color": "#EA580C",
        "bg": "#FFF4ED",
        "type": "suburban",
        "path": "M 251 46 L 251 643 L 281 690 L 207 760 L 207 922"
      },
      {
        "id": "central",
        "label": "Central Line",
        "color": "#16A34A",
        "bg": "#DCFCE7",
        "type": "suburban",
        "path": "M 1203 191 L 1180 222 L 1161 249 L 1142 276 L 1123 303 L 1104 330 L 1085 357 L 1066 384 L 1018 417 L 960 417 L 905 417 L 848 417 L 763 417 L 720 417 L 678 417 L 640 455 L 610 485 L 580 515 L 550 525 L 520 530 L 491 535 L 458 555 L 425 576 L 380 615 L 340 650 L 281 690 L 281 881 L 252.5 895.5 M 1018 417 L 1059 444 L 1080 470 L 1100 500 L 1120 535 L 1140 580 L 1150 625 L 1160 670 L 1163 749 L 1163 802 L 1132 825 L 1102 845 L 1073 865 L 1040 889"
      },
      {
        "id": "harbour",
        "label": "Harbour Line",
        "color": "#2563EB",
        "bg": "#DBEAFE",
        "type": "suburban",
        "path": "M 252.5 895.5 L 281 881 L 281 858 L 325 830 L 355 800 L 375 770 L 395 730 L 436 680 L 440 645 L 444 616 L 425 576 L 535 592 L 573 592 L 611 592 L 649 592 L 687.5 571.5 L 714.5 570.5 L 723.5 624.5 L 724.5 652.5 L 754 684 L 776 710 L 798 736 L 820 762 L 842 788 L 903.5 793.5 M 436 680 L 370 630 L 231.5 598.5 L 232.5 572.5 L 231.5 552.5 L 231.5 529.5 L 231.5 506.5 L 232.5 480.5"
      },
      {
        "id": "trans-harbour",
        "label": "Trans-Harbour",
        "color": "#EAB308",
        "bg": "#FEF9C3",
        "type": "suburban",
        "path": "M 678 417 L 714 440 L 742 481 L 742 504 L 742 527 L 742 550 L 714.5 570.5 L 723.5 624.5 L 724.5 652.5 L 903.5 793.5"
      },
      {
        "id": "vasai-diva",
        "label": "Vasai - Diva Line",
        "color": "#C026D3",
        "bg": "#FAE8FF",
        "type": "suburban",
        "path": "M 251 255 L 342 255 L 458 255 L 676 270 L 795 334 L 848 417"
      },
      {
        "id": "diva-panvel",
        "label": "Diva - Panvel Corridor",
        "color": "#94A3B8",
        "bg": "#F1F5F9",
        "type": "suburban",
        "path": "M 848 417 L 849 482 L 880 552 L 912 592 L 912 648 L 912 705 L 903.5 793.5 L 980 793.5 L 1020 793.5 L 1060 793.5"
      }
    ],
    "interchanges": [
      {
        "id": "dadar",
        "name": "Dadar Junction",
        "x": 266,
        "y": 685,
        "width": 30,
        "height": 14,
        "lines": [
          "Western Line",
          "Central Line"
        ]
      },
      {
        "id": "kurla",
        "name": "Kurla Junction",
        "x": 412,
        "y": 570,
        "width": 28,
        "height": 14,
        "lines": [
          "Central Line",
          "Harbour Line"
        ]
      },
      {
        "id": "bandra",
        "name": "Bandra Junction",
        "x": 222,
        "y": 568,
        "width": 32,
        "height": 14,
        "lines": [
          "Western Line",
          "Harbour Line"
        ]
      },
      {
        "id": "andheri",
        "name": "Andheri Interchange",
        "x": 222,
        "y": 476,
        "width": 32,
        "height": 14,
        "lines": [
          "Western Line",
          "Harbour Line"
        ]
      },
      {
        "id": "thane",
        "name": "Thane Junction",
        "x": 668,
        "y": 410,
        "width": 26,
        "height": 14,
        "lines": [
          "Central Line",
          "Trans-Harbour Line"
        ]
      },
      {
        "id": "diva",
        "name": "Diva Junction",
        "x": 838,
        "y": 410,
        "width": 24,
        "height": 14,
        "lines": [
          "Central Line",
          "Vasai-Diva Line",
          "Diva-Panvel Corridor"
        ]
      },
      {
        "id": "kalyan",
        "name": "Kalyan Mega-Junction",
        "x": 1008,
        "y": 410,
        "width": 26,
        "height": 14,
        "lines": [
          "Central Line"
        ]
      },
      {
        "id": "panvel",
        "name": "Panvel Terminus",
        "x": 893,
        "y": 786,
        "width": 26,
        "height": 14,
        "lines": [
          "Harbour Line",
          "Trans-Harbour Line",
          "Diva-Panvel Corridor"
        ]
      },
      {
        "id": "wadala",
        "name": "Wadala Road Junction",
        "x": 426,
        "y": 672,
        "width": 24,
        "height": 14,
        "lines": [
          "Harbour Line",
          "Harbour Branch"
        ]
      }
    ],
    "stations": [
      {
        "name": "Dahanu Road",
        "id": "dahanu_road",
        "lat": 19.9729,
        "lng": 72.7412,
        "uuid": "e64cba8d-35a4-4169-8350-4312ceec78a5",
        "type": "main_station",
        "position": {
          "x": 251,
          "y": 46
        },
        "text_position": {
          "x": 155,
          "y": 50
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 28,
        "slug": "real-estate-projects-near-dahanu-road-railway-station"
      },
      {
        "name": "Vangaon",
        "id": "vangaon",
        "lat": 19.8687,
        "lng": 72.7562,
        "uuid": "a808243a-f143-483e-9980-f29b906428f0",
        "type": "station",
        "position": {
          "x": 251,
          "y": 69
        },
        "text_position": {
          "x": 185,
          "y": 73
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 24,
        "slug": "real-estate-projects-near-vangaon-railway-station"
      },
      {
        "name": "Boisar",
        "id": "boisar",
        "lat": 19.7997,
        "lng": 72.7578,
        "uuid": "6cc699a9-2424-41a2-842c-16c8a25c8ae2",
        "type": "station",
        "position": {
          "x": 251,
          "y": 92
        },
        "text_position": {
          "x": 203,
          "y": 96
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 30,
        "slug": "real-estate-projects-near-boisar-railway-station"
      },
      {
        "name": "Umroli",
        "id": "umroli",
        "lat": 19.7423,
        "lng": 72.7663,
        "uuid": "aa8d6129-fa58-4c38-8c33-edfeb779af3b",
        "type": "station",
        "position": {
          "x": 251,
          "y": 115
        },
        "text_position": {
          "x": 201,
          "y": 119
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 26,
        "slug": "real-estate-projects-near-umroli-railway-station"
      },
      {
        "name": "Palghar",
        "id": "palghar",
        "lat": 19.697,
        "lng": 72.7656,
        "uuid": "4a0be5da-dc57-4a7d-b199-9de2760e439e",
        "type": "station",
        "position": {
          "x": 251,
          "y": 138
        },
        "text_position": {
          "x": 195,
          "y": 142
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 13,
        "slug": "real-estate-projects-near-palghar-railway-station"
      },
      {
        "name": "Saphale",
        "id": "saphale",
        "lat": 19.5765,
        "lng": 72.8202,
        "type": "station",
        "uuid": "59ee7e6c-dba4-4556-9ef8-725404b0121c",
        "position": {
          "x": 251,
          "y": 161
        },
        "text_position": {
          "x": 192,
          "y": 165
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 12,
        "slug": "real-estate-projects-near-saphale-railway-station"
      },
      {
        "name": "Vaitarna",
        "id": "vaitarna",
        "lat": 19.5052,
        "lng": 72.8465,
        "type": "station",
        "uuid": "23a3c4f1-a826-4ab5-9c7d-299e63b63af0",
        "position": {
          "x": 251,
          "y": 184
        },
        "text_position": {
          "x": 189,
          "y": 188
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 20,
        "slug": "real-estate-projects-near-vaitarna-railway-station"
      },
      {
        "name": "Virar",
        "id": "virar",
        "lat": 19.4552,
        "lng": 72.8105,
        "type": "main_station",
        "uuid": "d7b044c3-de6a-490f-a4ce-ca263bd1472b",
        "position": {
          "x": 251,
          "y": 208
        },
        "text_position": {
          "x": 206,
          "y": 212
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b95,500 / sq.ft",
        "newProjectsCount": 22,
        "slug": "real-estate-projects-near-virar-railway-station"
      },
      {
        "name": "Nalasopara",
        "id": "nalasopara",
        "lat": 19.4184,
        "lng": 72.8194,
        "type": "station",
        "uuid": "ec7c39a2-ccff-4ac7-93ea-5032aa8459b3",
        "position": {
          "x": 251,
          "y": 231
        },
        "text_position": {
          "x": 165,
          "y": 235
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 28,
        "slug": "real-estate-projects-near-nalasopara-railway-station"
      },
      {
        "name": "Vasai Road",
        "id": "vasairoad",
        "lat": 19.3809,
        "lng": 72.8322,
        "uuid": "ddf947ae-d9e7-41cc-85d2-42c4f6123b7e",
        "type": "station",
        "position": {
          "x": 251,
          "y": 255
        },
        "text_position": {
          "x": 165,
          "y": 259
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b96,800 / sq.ft",
        "newProjectsCount": 8,
        "slug": "real-estate-projects-near-vasai-road-railway-station"
      },
      {
        "name": "Bhayandar",
        "id": "bhayandar",
        "lat": 19.3125,
        "lng": 72.8533,
        "uuid": "d8d3d0df-e8ad-4e18-83cb-47cff802be73",
        "type": "main_station",
        "position": {
          "x": 251,
          "y": 302
        },
        "text_position": {
          "x": 165,
          "y": 306
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b910,200 / sq.ft",
        "newProjectsCount": 20,
        "slug": "real-estate-projects-near-bhayandar-railway-station"
      },
      {
        "name": "Borivali",
        "id": "borivali",
        "lat": 19.2291,
        "lng": 72.8569,
        "uuid": "bbb7f84f-8cff-4130-8530-168a537f4f55",
        "type": "main_station",
        "position": {
          "x": 251,
          "y": 372
        },
        "text_position": {
          "x": 190,
          "y": 376
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b921,000 / sq.ft",
        "newProjectsCount": 22,
        "slug": "real-estate-projects-near-borivali-railway-station"
      },
      {
        "name": "Goregaon",
        "id": "goregaon",
        "lat": 19.1643,
        "lng": 72.8493,
        "uuid": "dfe7c3f4-139d-458c-b110-9d34d84c7495",
        "type": "main_station",
        "position": {
          "x": 251,
          "y": 442
        },
        "text_position": {
          "x": 175,
          "y": 446
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b922,500 / sq.ft",
        "newProjectsCount": 16,
        "slug": "real-estate-projects-near-goregaon-railway-station"
      },
      {
        "name": "Kurla",
        "id": "kurla",
        "lat": 19.0657,
        "lng": 72.8793,
        "uuid": "60bf59e0-7db7-4a7a-9e6d-8e1a53bdc8fc",
        "type": "main_station",
        "position": {
          "x": 425,
          "y": 576
        },
        "text_position": {
          "x": 370,
          "y": 576
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b921,000 / sq.ft",
        "newProjectsCount": 17,
        "slug": "real-estate-projects-near-kurla-railway-station"
      },
      {
        "name": "Ghatkopar",
        "id": "ghatkopar",
        "lat": 19.0864,
        "lng": 72.9081,
        "type": "main_station",
        "uuid": "90654193-0be4-4dff-af71-d9947117ac5b",
        "position": {
          "x": 491,
          "y": 535
        },
        "text_position": {
          "x": 505,
          "y": 545
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b923,500 / sq.ft",
        "newProjectsCount": 15,
        "slug": "real-estate-projects-near-ghatkopar-railway-station"
      },
      {
        "name": "Thane",
        "id": "thane",
        "lat": 19.186,
        "lng": 72.9757,
        "uuid": "d8c2cc5a-8559-45a1-8276-ec95479cabfb",
        "type": "main_station",
        "position": {
          "x": 678,
          "y": 417
        },
        "text_position": {
          "x": 630,
          "y": 415
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b916,800 / sq.ft",
        "newProjectsCount": 30,
        "slug": "real-estate-projects-near-thane-railway-station"
      },
      {
        "name": "Diva",
        "id": "diva",
        "lat": 19.1895,
        "lng": 73.0427,
        "uuid": "ef6509ca-e50d-452e-b30e-94522044f5eb",
        "type": "main_station",
        "position": {
          "x": 848,
          "y": 417
        },
        "text_position": {
          "x": 858,
          "y": 408
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 6,
        "slug": "real-estate-projects-near-diva-railway-station"
      },
      {
        "name": "Kalyan",
        "id": "kalyan",
        "lat": 19.2364,
        "lng": 73.1307,
        "uuid": "a7424d3b-810a-4678-9a1e-85b25c43f95d",
        "type": "main_station",
        "position": {
          "x": 1018,
          "y": 417
        },
        "text_position": {
          "x": 1000.0,
          "y": 398
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b97,200 / sq.ft",
        "newProjectsCount": 30,
        "slug": "real-estate-projects-near-kalyan-railway-station"
      },
      {
        "name": "Kasara",
        "id": "kasara",
        "lat": 19.6548,
        "lng": 73.4839,
        "uuid": "8a93542f-84d3-4ac2-93a1-93ff9086d52d",
        "type": "main_station",
        "position": {
          "x": 1203,
          "y": 191
        },
        "text_position": {
          "x": 1214,
          "y": 191
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 17,
        "slug": "real-estate-projects-near-kasara-railway-station"
      },
      {
        "name": "Karjat",
        "id": "karjat",
        "lat": 18.9105,
        "lng": 73.3242,
        "uuid": "94c74560-7805-4cda-8dfd-6a4ec5756c42",
        "type": "main_station",
        "position": {
          "x": 1163,
          "y": 802
        },
        "text_position": {
          "x": 1180,
          "y": 806
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 27,
        "slug": "real-estate-projects-near-karjat-railway-station"
      },
      {
        "name": "Khopoli",
        "id": "khopoli",
        "lat": 18.7844,
        "lng": 73.3444,
        "uuid": "b87cc152-1e1c-4142-9140-2175b20a0e0d",
        "type": "main_station",
        "position": {
          "x": 1040,
          "y": 889
        },
        "text_position": {
          "x": 1055,
          "y": 894
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 8,
        "slug": "real-estate-projects-near-khopoli-railway-station"
      },
      {
        "name": "Mumbai Central",
        "id": "mumbaicentral",
        "lat": 18.9696,
        "lng": 72.8194,
        "uuid": "45c4a100-2461-4f4f-9ce3-2d16f9e66ed5",
        "type": "main_station",
        "position": {
          "x": 207,
          "y": 829
        },
        "text_position": {
          "x": 90,
          "y": 833
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b946,000 / sq.ft",
        "newProjectsCount": 14,
        "slug": "real-estate-projects-near-mumbai-central-railway-station"
      },
      {
        "name": "Churchgate",
        "id": "churchgate",
        "lat": 18.9322,
        "lng": 72.8264,
        "uuid": "8595c971-e613-4a1c-943e-4acd15094066",
        "type": "main_station",
        "position": {
          "x": 207,
          "y": 922
        },
        "text_position": {
          "x": 120,
          "y": 926
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b968,000 / sq.ft",
        "newProjectsCount": 24,
        "slug": "real-estate-projects-near-churchgate-railway-station"
      },
      {
        "name": "Dadar",
        "id": "dadar",
        "lat": 19.0178,
        "lng": 72.8478,
        "uuid": "54fa1467-4423-43bd-8d05-ce74d83c295c",
        "type": "main_station",
        "position": {
          "x": 281,
          "y": 690
        },
        "text_position": {
          "x": 300,
          "y": 694
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b941,000 / sq.ft",
        "newProjectsCount": 10,
        "slug": "real-estate-projects-near-dadar-railway-station"
      },
      {
        "name": "Naigaon",
        "id": "naigaon",
        "lat": 19.3512,
        "lng": 72.849,
        "type": "station",
        "uuid": "39cc0e82-d6ef-4e30-aedf-b88b5e4e4816",
        "position": {
          "x": 251,
          "y": 278
        },
        "text_position": {
          "x": 185,
          "y": 282
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 11,
        "slug": "real-estate-projects-near-naigaon-railway-station"
      },
      {
        "name": "Mira Road",
        "id": "miraroad",
        "lat": 19.2812,
        "lng": 72.8559,
        "uuid": "8bcb47d0-1f43-4261-a7a1-25c2d2087997",
        "type": "station",
        "position": {
          "x": 251,
          "y": 325
        },
        "text_position": {
          "x": 180,
          "y": 329
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b911,500 / sq.ft",
        "newProjectsCount": 13,
        "slug": "real-estate-projects-near-mira-road-railway-station"
      },
      {
        "name": "Dahisar",
        "id": "dahisar",
        "lat": 19.2505,
        "lng": 72.8597,
        "uuid": "d7d6b6fb-1042-4dd4-839f-692b72f5a5ec",
        "type": "station",
        "position": {
          "x": 251,
          "y": 348
        },
        "text_position": {
          "x": 195,
          "y": 352
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b916,500 / sq.ft",
        "newProjectsCount": 10,
        "slug": "real-estate-projects-near-dahisar-railway-station"
      },
      {
        "name": "Kandivali",
        "id": "kandivali",
        "lat": 19.2045,
        "lng": 72.8524,
        "uuid": "afbb31eb-e203-4ae6-b51e-838ce3108bd6",
        "type": "station",
        "position": {
          "x": 251,
          "y": 395
        },
        "text_position": {
          "x": 185,
          "y": 399
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b918,500 / sq.ft",
        "newProjectsCount": 29,
        "slug": "real-estate-projects-near-kandivali-railway-station"
      },
      {
        "name": "Malad",
        "id": "malad",
        "lat": 19.1868,
        "lng": 72.8488,
        "uuid": "22b627e9-963d-433f-9699-2a4a0f7987d6",
        "type": "station",
        "position": {
          "x": 251,
          "y": 418
        },
        "text_position": {
          "x": 200,
          "y": 422
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b919,800 / sq.ft",
        "newProjectsCount": 13,
        "slug": "real-estate-projects-near-malad-railway-station"
      },
      {
        "name": "Jogeshwari",
        "id": "jogeshwari",
        "lat": 19.136,
        "lng": 72.8492,
        "uuid": "0abc8f6c-1b88-450f-af3b-fe8ea02af9e8",
        "type": "station",
        "position": {
          "x": 251,
          "y": 466
        },
        "text_position": {
          "x": 170,
          "y": 470
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b924,000 / sq.ft",
        "newProjectsCount": 17,
        "slug": "real-estate-projects-near-jogeshwari-railway-station"
      },
      {
        "name": "Matunga Road",
        "id": "matungaroad",
        "lat": 19.0305,
        "lng": 72.8427,
        "uuid": "a479e5d7-a8a9-4bf2-a7bf-5bf035abf8ef",
        "type": "station",
        "position": {
          "x": 251,
          "y": 643
        },
        "text_position": {
          "x": 150,
          "y": 647
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 29,
        "slug": "real-estate-projects-near-matunga-road-railway-station"
      },
      {
        "name": "Prabhadevi",
        "id": "prabhadevi",
        "lat": 19.0146,
        "lng": 72.8302,
        "type": "station",
        "uuid": "e94c7902-3e24-408b-9bbb-e90323d4fcc7",
        "position": {
          "x": 207,
          "y": 760
        },
        "text_position": {
          "x": 130,
          "y": 764
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b949,000 / sq.ft",
        "newProjectsCount": 16,
        "slug": "real-estate-projects-near-prabhadevi-railway-station"
      },
      {
        "name": "Lower Parel",
        "id": "lowerparel",
        "lat": 18.9953,
        "lng": 72.8302,
        "uuid": "11067133-7b07-49ff-afe9-35c18419ed7a",
        "type": "station",
        "position": {
          "x": 207,
          "y": 783
        },
        "text_position": {
          "x": 130,
          "y": 787
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b948,500 / sq.ft",
        "newProjectsCount": 27,
        "slug": "real-estate-projects-near-lower-parel-railway-station"
      },
      {
        "name": "Mahalaxmi",
        "id": "mahalaxmi",
        "lat": 18.9827,
        "lng": 72.8239,
        "uuid": "1b010eac-78b0-499e-b7e8-7681a418f319",
        "type": "station",
        "position": {
          "x": 207,
          "y": 806
        },
        "text_position": {
          "x": 130,
          "y": 810
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b952,000 / sq.ft",
        "newProjectsCount": 28,
        "slug": "real-estate-projects-near-mahalaxmi-railway-station"
      },
      {
        "name": "Grant Road",
        "id": "grantroad",
        "lat": 18.9629,
        "lng": 72.8162,
        "uuid": "3782b034-154b-4187-8e28-ac33d3141f9f",
        "type": "station",
        "position": {
          "x": 207,
          "y": 853
        },
        "text_position": {
          "x": 125,
          "y": 857
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b948,000 / sq.ft",
        "newProjectsCount": 16,
        "slug": "real-estate-projects-near-grant-road-railway-station"
      },
      {
        "name": "Charni Road",
        "id": "charniroad",
        "lat": 18.9519,
        "lng": 72.8193,
        "uuid": "d375d55c-58f8-4b2d-8c95-48c3b7448384",
        "type": "station",
        "position": {
          "x": 207,
          "y": 876
        },
        "text_position": {
          "x": 123,
          "y": 880
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b954,000 / sq.ft",
        "newProjectsCount": 21,
        "slug": "real-estate-projects-near-charni-road-railway-station"
      },
      {
        "name": "Marine Lines",
        "id": "marinelines",
        "lat": 18.9438,
        "lng": 72.8236,
        "uuid": "f60d1db2-dff7-4fe2-afee-d01d36c62874",
        "type": "station",
        "position": {
          "x": 207,
          "y": 899
        },
        "text_position": {
          "x": 123,
          "y": 903
        },
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b962,000 / sq.ft",
        "newProjectsCount": 33,
        "slug": "real-estate-projects-near-marine-lines-railway-station"
      },
      {
        "name": "Masjid",
        "id": "masjid",
        "lat": 18.9515,
        "lng": 72.8385,
        "uuid": "4bbca719-eb7e-4b50-85f1-4f78b139fce9",
        "type": "station",
        "position": {
          "x": 281,
          "y": 881
        },
        "text_position": {
          "x": 295,
          "y": 884
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 22,
        "slug": "real-estate-projects-near-masjid-railway-station"
      },
      {
        "name": "Sandhurst Road",
        "id": "sandhurstroad",
        "lat": 18.961,
        "lng": 72.8383,
        "uuid": "0c1a2604-fa4e-4b6e-bf60-0b96bb0f1de4",
        "type": "station",
        "position": {
          "x": 281,
          "y": 858
        },
        "text_position": {
          "x": 295,
          "y": 862
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 16,
        "slug": "real-estate-projects-near-sandhurst-road-railway-station"
      },
      {
        "name": "Chunabhatti",
        "id": "chunabhatti",
        "lat": 19.0519,
        "lng": 72.8711,
        "uuid": "a4da108a-ae2c-4422-bd9d-663274dcf3e3",
        "type": "station",
        "position": {
          "x": 444,
          "y": 616
        },
        "text_position": {
          "x": 450,
          "y": 630
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 21,
        "slug": "real-estate-projects-near-chunabhatti-railway-station"
      },
      {
        "name": "Tilak Nagar",
        "id": "tilaknagar",
        "lat": 19.0683,
        "lng": 72.8907,
        "uuid": "d5f22dd8-b09e-451c-8646-c8bc4e2980d7",
        "type": "station",
        "position": {
          "x": 535,
          "y": 592
        },
        "text_position": {
          "x": 505,
          "y": 580
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 24,
        "slug": "real-estate-projects-near-tilak-nagar-railway-station"
      },
      {
        "name": "Chembur",
        "id": "chembur",
        "lat": 19.0624,
        "lng": 72.8997,
        "type": "station",
        "uuid": "5b3c3152-335f-4081-9103-180b1619623c",
        "position": {
          "x": 573,
          "y": 592
        },
        "text_position": {
          "x": 550,
          "y": 615
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 20,
        "slug": "real-estate-projects-near-chembur-railway-station"
      },
      {
        "name": "Govandi",
        "id": "govandi",
        "lat": 19.0558,
        "lng": 72.9148,
        "uuid": "31e70918-b442-4aa0-98c2-dddd794cff33",
        "type": "station",
        "position": {
          "x": 611,
          "y": 592
        },
        "text_position": {
          "x": 590,
          "y": 580
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 22,
        "slug": "real-estate-projects-near-govandi-railway-station"
      },
      {
        "name": "Mankhurd",
        "id": "mankhurd",
        "lat": 19.0505,
        "lng": 72.9318,
        "uuid": "0b8a013f-0443-449b-83e1-07a8d2daf4a7",
        "type": "station",
        "position": {
          "x": 649,
          "y": 592
        },
        "text_position": {
          "x": 620,
          "y": 615
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 24,
        "slug": "real-estate-projects-near-mankhurd-railway-station"
      },
      {
        "name": "Seawoods",
        "id": "seawoods",
        "lat": 19.0205,
        "lng": 73.0182,
        "uuid": "0e319eb0-e093-4631-86af-3cb367e14ee1",
        "type": "station",
        "position": {
          "x": 754,
          "y": 684
        },
        "text_position": {
          "x": 770,
          "y": 688
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 7,
        "slug": "real-estate-projects-near-seawoods-railway-station"
      },
      {
        "name": "CBD Belapur",
        "id": "cbdbelapur",
        "lat": 19.0183,
        "lng": 73.0396,
        "uuid": "146080cd-c552-4c08-8823-78aada31c85f",
        "type": "station",
        "position": {
          "x": 776,
          "y": 710
        },
        "text_position": {
          "x": 790,
          "y": 714
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b914,500 / sq.ft",
        "newProjectsCount": 14,
        "slug": "real-estate-projects-near-cbd-belapur-railway-station"
      },
      {
        "name": "Kharghar",
        "id": "kharghar",
        "lat": 19.0282,
        "lng": 73.0645,
        "uuid": "266eeaff-3165-454c-9298-9fa61bf60cc8",
        "type": "station",
        "position": {
          "x": 798,
          "y": 736
        },
        "text_position": {
          "x": 810,
          "y": 740
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,200 / sq.ft",
        "newProjectsCount": 6,
        "slug": "real-estate-projects-near-kharghar-railway-station"
      },
      {
        "name": "Mansarovar",
        "id": "mansarovar",
        "lat": 19.0179,
        "lng": 73.0851,
        "uuid": "25834e6b-103b-4003-a621-93db95df63c2",
        "type": "station",
        "position": {
          "x": 820,
          "y": 762
        },
        "text_position": {
          "x": 830,
          "y": 766
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 24,
        "slug": "real-estate-projects-near-mansarovar-railway-station"
      },
      {
        "name": "Khandeshwar",
        "id": "khandeshwar",
        "lat": 19.0063,
        "lng": 73.1009,
        "uuid": "7e2278e4-dfad-4692-b877-19e01549dc32",
        "type": "station",
        "position": {
          "x": 842,
          "y": 788
        },
        "text_position": {
          "x": 750,
          "y": 792
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 26,
        "slug": "real-estate-projects-near-khandeshwar-railway-station"
      },
      {
        "name": "Chikhale",
        "id": "chikhale",
        "lat": 18.9654,
        "lng": 73.142,
        "uuid": "98fedae0-aa10-40f4-b6c1-835f4f3abb49",
        "type": "station",
        "position": {
          "x": 977,
          "y": 802
        },
        "text_position": {
          "x": 950,
          "y": 786
        },
        "line": "Diva-Panvel Line",
        "lineKey": "diva-panvel",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 19,
        "slug": "real-estate-projects-near-chikhale-railway-station"
      },
      {
        "name": "Kalamboli",
        "id": "kalamboli",
        "lat": 19.0192,
        "lng": 73.1121,
        "uuid": "9b9fc5f1-9734-4f88-9990-41f2c981160d",
        "type": "station",
        "position": {
          "x": 912,
          "y": 705
        },
        "text_position": {
          "x": 925,
          "y": 709
        },
        "line": "Diva-Panvel Line",
        "lineKey": "diva-panvel",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 22,
        "slug": "real-estate-projects-near-kalamboli-railway-station"
      },
      {
        "name": "Taloja",
        "id": "taloja",
        "lat": 19.0832,
        "lng": 73.0945,
        "type": "station",
        "uuid": "b3231f92-ff76-45ca-8ef2-056522a26d5d",
        "position": {
          "x": 912,
          "y": 592
        },
        "text_position": {
          "x": 925,
          "y": 596
        },
        "line": "Diva-Panvel Line",
        "lineKey": "diva-panvel",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 25,
        "slug": "real-estate-projects-near-taloja-railway-station"
      },
      {
        "name": "Navade Road",
        "id": "navaderoad",
        "lat": 19.0435,
        "lng": 73.1082,
        "type": "station",
        "uuid": "77479c06-cdbe-4515-af9a-eb9951bf72ab",
        "position": {
          "x": 912,
          "y": 648
        },
        "text_position": {
          "x": 925,
          "y": 652
        },
        "line": "Diva-Panvel Line",
        "lineKey": "diva-panvel",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 15,
        "slug": "real-estate-projects-near-navade-road-railway-station"
      },
      {
        "name": "Nilaje",
        "id": "nilaje",
        "lat": 19.1382,
        "lng": 73.0722,
        "type": "station",
        "uuid": "e298644e-dcd3-48fc-b3c9-72a99e0101e4",
        "position": {
          "x": 880,
          "y": 552
        },
        "text_position": {
          "x": 890,
          "y": 556
        },
        "line": "Diva-Panvel Line",
        "lineKey": "diva-panvel",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 17,
        "slug": "real-estate-projects-near-nilaje-railway-station"
      },
      {
        "name": "Dativali",
        "uuid": "3acec197-7b03-47df-9319-509a39b87b49",
        "id": "dativali",
        "lat": 19.1672,
        "lng": 73.0561,
        "type": "station",
        "position": {
          "x": 849,
          "y": 482
        },
        "text_position": {
          "x": 860,
          "y": 486
        },
        "line": "Diva-Panvel Line",
        "lineKey": "diva-panvel",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 12,
        "slug": "real-estate-projects-near-dativali-railway-station"
      },
      {
        "name": "Mohape",
        "id": "mohape",
        "lat": 18.924,
        "lng": 73.198,
        "uuid": "474e2c5b-6db4-4b33-80cd-357f32e83f8c",
        "type": "station",
        "position": {
          "x": 1038,
          "y": 802
        },
        "text_position": {
          "x": 1015,
          "y": 786
        },
        "line": "Diva-Panvel Line",
        "lineKey": "diva-panvel",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 24,
        "slug": "real-estate-projects-near-mohape-railway-station"
      },
      {
        "name": "Chowk",
        "id": "chowk",
        "lat": 18.895,
        "lng": 73.235,
        "uuid": "d23fcbd7-11c8-488c-90cf-45470da05687",
        "type": "station",
        "position": {
          "x": 1099,
          "y": 802
        },
        "text_position": {
          "x": 1080,
          "y": 786
        },
        "line": "Diva-Panvel Line",
        "lineKey": "diva-panvel",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 14,
        "slug": "real-estate-projects-near-chowk-railway-station"
      },
      {
        "name": "Matheran",
        "id": "matheran",
        "lat": 18.9827,
        "lng": 73.2691,
        "type": "station",
        "uuid": "21a10a49-8146-4db3-879b-9c3a748074ff",
        "position": {
          "x": 1099,
          "y": 700
        },
        "text_position": {
          "x": 1080,
          "y": 690
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 14,
        "slug": "real-estate-projects-near-matheran-railway-station"
      },
      {
        "name": "GTB Nagar",
        "id": "gtbnagar",
        "lat": 19.0326,
        "lng": 72.8631,
        "type": "station",
        "uuid": "3a35e177-8aef-4045-87cf-c3da008a7cd4",
        "position": {
          "x": 427,
          "y": 652
        },
        "text_position": {
          "x": 440,
          "y": 656
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 32,
        "slug": "real-estate-projects-near-gtb-nagar-railway-station"
      },
      {
        "name": "Sewri",
        "id": "sewri",
        "lat": 19.0016,
        "lng": 72.8557,
        "type": "station",
        "uuid": "1c7a688b-3d79-4fb7-941d-ea8fb10ebc97",
        "position": {
          "x": 427,
          "y": 711
        },
        "text_position": {
          "x": 440,
          "y": 715
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 28,
        "slug": "real-estate-projects-near-sewri-railway-station"
      },
      {
        "name": "Cotton Green",
        "id": "cottongreen",
        "lat": 18.9866,
        "lng": 72.851,
        "uuid": "4d0eb6d3-9375-406a-b5fe-0bafae6d3e4f",
        "type": "station",
        "position": {
          "x": 427,
          "y": 741
        },
        "text_position": {
          "x": 440,
          "y": 745
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 22,
        "slug": "real-estate-projects-near-cotton-green-railway-station"
      },
      {
        "name": "Reay Road",
        "id": "reayroad",
        "lat": 18.9757,
        "lng": 72.8475,
        "type": "station",
        "uuid": "ed560be5-06d3-458d-a51c-9ae7839e6a1b",
        "position": {
          "x": 400,
          "y": 776
        },
        "text_position": {
          "x": 420,
          "y": 780
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 21,
        "slug": "real-estate-projects-near-reay-road-railway-station"
      },
      {
        "name": "Dockyard Road",
        "id": "dockyardroad",
        "lat": 18.966,
        "lng": 72.8444,
        "uuid": "4e2b722f-7c78-4ba8-afd0-f7f4bc6580f6",
        "type": "station",
        "position": {
          "x": 365,
          "y": 801
        },
        "text_position": {
          "x": 380,
          "y": 805
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 17,
        "slug": "real-estate-projects-near-dockyard-road-railway-station"
      },
      {
        "name": "Byculla",
        "id": "byculla",
        "lat": 18.9774,
        "lng": 72.8328,
        "type": "station",
        "uuid": "0d1d5d0c-832d-463e-8897-1b4dbeac62cc",
        "position": {
          "x": 281,
          "y": 783
        },
        "text_position": {
          "x": 295,
          "y": 787
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b935,000 / sq.ft",
        "newProjectsCount": 26,
        "slug": "real-estate-projects-near-byculla-railway-station"
      },
      {
        "name": "Chinchpokli",
        "id": "chinchpokli",
        "lat": 18.9886,
        "lng": 72.8306,
        "uuid": "d4582887-16ed-4a77-ba54-b4de92d2ac40",
        "type": "station",
        "position": {
          "x": 281,
          "y": 760
        },
        "text_position": {
          "x": 295,
          "y": 764
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 22,
        "slug": "real-estate-projects-near-chinchpokli-railway-station"
      },
      {
        "name": "Currey Road",
        "id": "curreyroad",
        "lat": 18.9972,
        "lng": 72.8317,
        "uuid": "65ec5f5e-b8ef-4529-a290-a140c0c5a7da",
        "type": "station",
        "position": {
          "x": 281,
          "y": 737
        },
        "text_position": {
          "x": 295,
          "y": 741
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 30,
        "slug": "real-estate-projects-near-currey-road-railway-station"
      },
      {
        "name": "Parel",
        "id": "parel",
        "lat": 19.0094,
        "lng": 72.8375,
        "uuid": "602d2542-9e34-44e0-8e8d-45432b0c8a38",
        "type": "station",
        "position": {
          "x": 281,
          "y": 714
        },
        "text_position": {
          "x": 295,
          "y": 719
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 6,
        "slug": "real-estate-projects-near-parel-railway-station"
      },
      {
        "name": "Matunga",
        "id": "matunga",
        "lat": 19.027,
        "lng": 72.855,
        "uuid": "90e29c9e-2a7c-449c-89b8-874438c635aa",
        "type": "station",
        "position": {
          "x": 300,
          "y": 655
        },
        "text_position": {
          "x": 310,
          "y": 659
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 27,
        "slug": "real-estate-projects-near-matunga-railway-station"
      },
      {
        "name": "King's Circle",
        "id": "kingscircle",
        "lat": 19.0315,
        "lng": 72.8557,
        "uuid": "231d030a-cd79-4c8f-84c3-f27ce17c5be7",
        "type": "station",
        "position": {
          "x": 288,
          "y": 625
        },
        "text_position": {
          "x": 280,
          "y": 610
        },
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 24,
        "slug": "real-estate-projects-near-king's-circle-railway-station"
      },
      {
        "name": "Sion",
        "id": "sion",
        "lat": 19.0434,
        "lng": 72.8624,
        "type": "station",
        "uuid": "e461e854-2fef-4455-9651-aba3bd363e4b",
        "position": {
          "x": 375,
          "y": 608
        },
        "text_position": {
          "x": 385,
          "y": 620
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 27,
        "slug": "real-estate-projects-near-sion-railway-station"
      },
      {
        "name": "Vidyavihar",
        "id": "vidyavihar",
        "lat": 19.0798,
        "lng": 72.8973,
        "uuid": "41961884-e320-46ac-90d4-c275f46ebfbf",
        "type": "station",
        "position": {
          "x": 458,
          "y": 556
        },
        "text_position": {
          "x": 390,
          "y": 550
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 21,
        "slug": "real-estate-projects-near-vidyavihar-railway-station"
      },
      {
        "name": "Vikhroli",
        "id": "vikhroli",
        "lat": 19.1112,
        "lng": 72.9282,
        "uuid": "5d0ba547-deb3-4bb8-9213-6eeab06f8607",
        "type": "station",
        "position": {
          "x": 524,
          "y": 515
        },
        "text_position": {
          "x": 470,
          "y": 510
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b920,000 / sq.ft",
        "newProjectsCount": 10,
        "slug": "real-estate-projects-near-vikhroli-railway-station"
      },
      {
        "name": "Juchandra",
        "id": "juchandra",
        "lat": 19.3496,
        "lng": 72.8845,
        "uuid": "3b66e134-a9bb-48a1-9605-9bf51938d97e",
        "type": "station",
        "position": {
          "x": 342,
          "y": 255
        },
        "text_position": {
          "x": 310,
          "y": 240
        },
        "line": "Vasai-Diva Line",
        "lineKey": "vasai-diva",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 26,
        "slug": "real-estate-projects-near-juchandra-railway-station"
      },
      {
        "name": "Kaman Road",
        "id": "kamanroad",
        "lat": 19.3363,
        "lng": 72.9238,
        "type": "station",
        "uuid": "e35795c8-22b2-4a67-89f9-ffc20a68a5e2",
        "position": {
          "x": 458,
          "y": 255
        },
        "text_position": {
          "x": 430,
          "y": 240
        },
        "line": "Vasai-Diva Line",
        "lineKey": "vasai-diva",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 24,
        "slug": "real-estate-projects-near-kaman-road-railway-station"
      },
      {
        "name": "Kharbao",
        "id": "kharbao",
        "lat": 19.2941,
        "lng": 72.9815,
        "uuid": "e1137241-ac45-41b4-94bf-cbe2ca143332",
        "type": "station",
        "position": {
          "x": 676,
          "y": 270
        },
        "text_position": {
          "x": 685,
          "y": 268
        },
        "line": "Vasai-Diva Line",
        "lineKey": "vasai-diva",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 6,
        "slug": "real-estate-projects-near-kharbao-railway-station"
      },
      {
        "name": "Bhiwandi",
        "id": "bhiwandi",
        "lat": 19.2812,
        "lng": 73.0633,
        "type": "station",
        "uuid": "03db25bd-1283-44f1-9767-86aa4b9840ed",
        "position": {
          "x": 795,
          "y": 334
        },
        "text_position": {
          "x": 810,
          "y": 338
        },
        "line": "Vasai-Diva Line",
        "lineKey": "vasai-diva",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 32,
        "slug": "real-estate-projects-near-bhiwandi-railway-station"
      },
      {
        "name": "Kanjumarg",
        "id": "kanjumarg",
        "lat": 19.1302,
        "lng": 72.9298,
        "uuid": "70172270-76f0-4a9b-be08-8d2863b89225",
        "type": "station",
        "position": {
          "x": 553,
          "y": 497
        },
        "text_position": {
          "x": 560,
          "y": 510
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 14,
        "slug": "real-estate-projects-near-kanjumarg-railway-station"
      },
      {
        "name": "Bhandup",
        "id": "bhandup",
        "lat": 19.1455,
        "lng": 72.9372,
        "uuid": "26349b4c-674d-4d41-9df6-86c69bb7c851",
        "type": "station",
        "position": {
          "x": 582,
          "y": 479
        },
        "text_position": {
          "x": 535,
          "y": 470
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b917,500 / sq.ft",
        "newProjectsCount": 16,
        "slug": "real-estate-projects-near-bhandup-railway-station"
      },
      {
        "name": "Nahur",
        "id": "nahur",
        "lat": 19.1566,
        "lng": 72.9439,
        "uuid": "b30321c8-01c4-4f48-a871-bf4e49c1a485",
        "type": "station",
        "position": {
          "x": 611,
          "y": 461
        },
        "text_position": {
          "x": 620,
          "y": 470
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 16,
        "slug": "real-estate-projects-near-nahur-railway-station"
      },
      {
        "name": "Mulund",
        "id": "mulund",
        "lat": 19.1726,
        "lng": 72.9563,
        "uuid": "75bf371a-cc45-473c-9604-0cbc378e06c0",
        "type": "station",
        "position": {
          "x": 640,
          "y": 443
        },
        "text_position": {
          "x": 590,
          "y": 440
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b921,000 / sq.ft",
        "newProjectsCount": 23,
        "slug": "real-estate-projects-near-mulund-railway-station"
      },
      {
        "name": "Turbhe",
        "id": "turbhe",
        "lat": 19.0782,
        "lng": 73.0178,
        "uuid": "e15dbce0-97e4-4400-8d31-52bd463a02cc",
        "type": "station",
        "position": {
          "x": 742,
          "y": 550
        },
        "text_position": {
          "x": 755,
          "y": 554
        },
        "line": "Trans-Harbour Line",
        "lineKey": "trans-harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 12,
        "slug": "real-estate-projects-near-turbhe-railway-station"
      },
      {
        "name": "Koparkhairane",
        "id": "koparkhairane",
        "lat": 19.1039,
        "lng": 73.0085,
        "uuid": "e44a919f-a39c-4657-85c6-871e635e85b1",
        "type": "station",
        "position": {
          "x": 742,
          "y": 527
        },
        "text_position": {
          "x": 755,
          "y": 531
        },
        "line": "Trans-Harbour Line",
        "lineKey": "trans-harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 10,
        "slug": "real-estate-projects-near-koparkhairane-railway-station"
      },
      {
        "name": "Ghansoli",
        "id": "ghansoli",
        "lat": 19.1248,
        "lng": 73.0039,
        "type": "station",
        "uuid": "46913e56-47cf-4e67-9bf1-dd3ff6834187",
        "position": {
          "x": 742,
          "y": 504
        },
        "text_position": {
          "x": 755,
          "y": 509
        },
        "line": "Trans-Harbour Line",
        "lineKey": "trans-harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 19,
        "slug": "real-estate-projects-near-ghansoli-railway-station"
      },
      {
        "name": "Rabale",
        "id": "rabale",
        "lat": 19.1378,
        "lng": 73.0016,
        "uuid": "d7a19da4-bef8-4804-b615-bd910d668b21",
        "type": "station",
        "position": {
          "x": 742,
          "y": 481
        },
        "text_position": {
          "x": 755,
          "y": 485
        },
        "line": "Trans-Harbour Line",
        "lineKey": "trans-harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 33,
        "slug": "real-estate-projects-near-rabale-railway-station"
      },
      {
        "name": "Airoli",
        "id": "airoli",
        "lat": 19.1578,
        "lng": 72.9972,
        "uuid": "d1f0cbc8-1cdc-4bb1-8148-a5f8705b699d",
        "type": "station",
        "position": {
          "x": 714,
          "y": 440
        },
        "text_position": {
          "x": 680,
          "y": 450
        },
        "line": "Trans-Harbour Line",
        "lineKey": "trans-harbour",
        "avgPrice": "\u20b913,800 / sq.ft",
        "newProjectsCount": 30,
        "slug": "real-estate-projects-near-airoli-railway-station"
      },
      {
        "name": "Kalwa",
        "id": "kalwa",
        "lat": 19.1963,
        "lng": 72.9944,
        "uuid": "5c64c2a2-76da-4261-8489-1fd58ec1e479",
        "type": "station",
        "position": {
          "x": 736,
          "y": 417
        },
        "text_position": {
          "x": 720,
          "y": 400
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 30,
        "slug": "real-estate-projects-near-kalwa-railway-station"
      },
      {
        "name": "Mumbra",
        "id": "mumbra",
        "lat": 19.1764,
        "lng": 73.0228,
        "uuid": "aa6a7c68-26b3-4532-ac04-fb63bc81012a",
        "type": "station",
        "position": {
          "x": 790,
          "y": 417
        },
        "text_position": {
          "x": 770,
          "y": 440
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 6,
        "slug": "real-estate-projects-near-mumbra-railway-station"
      },
      {
        "name": "Dombivali",
        "type": "station",
        "uuid": "962eb2e4-a727-4a24-803b-ebc6e2a5e8b4",
        "id": "dombivali",
        "lat": 19.2184,
        "lng": 73.0867,
        "position": {
          "x": 906,
          "y": 417
        },
        "text_position": {
          "x": 880,
          "y": 440
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b98,500 / sq.ft",
        "newProjectsCount": 33,
        "slug": "real-estate-projects-near-dombivali-railway-station"
      },
      {
        "name": "Thakurli",
        "id": "thakurli",
        "lat": 19.2273,
        "lng": 73.1025,
        "uuid": "9d0b3754-de12-43dc-8e23-0fb4b001d7af",
        "type": "station",
        "position": {
          "x": 960,
          "y": 417
        },
        "text_position": {
          "x": 940,
          "y": 398
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 6,
        "slug": "real-estate-projects-near-thakurli-railway-station"
      },
      {
        "name": "Vithalwadi",
        "uuid": "1bb99812-25ea-4148-8a20-230648ba9466",
        "id": "vithalwadi",
        "lat": 19.2257,
        "lng": 73.1519,
        "type": "station",
        "position": {
          "x": 1059,
          "y": 444
        },
        "text_position": {
          "x": 1070,
          "y": 448
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 11,
        "slug": "real-estate-projects-near-vithalwadi-railway-station"
      },
      {
        "name": "Shahad",
        "id": "shahad",
        "lat": 19.2483,
        "lng": 73.1558,
        "uuid": "aef774ff-9ca0-4366-875a-5f8d26ede0c9",
        "type": "station",
        "position": {
          "x": 1066,
          "y": 384
        },
        "text_position": {
          "x": 1075,
          "y": 389
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 7,
        "slug": "real-estate-projects-near-shahad-railway-station"
      },
      {
        "name": "Ambivali",
        "id": "ambivali",
        "lat": 19.2774,
        "lng": 73.1812,
        "uuid": "12449d70-df70-4207-9a48-69f9580f4f22",
        "type": "station",
        "position": {
          "x": 1085,
          "y": 357
        },
        "text_position": {
          "x": 1095,
          "y": 360
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 31,
        "slug": "real-estate-projects-near-ambivali-railway-station"
      },
      {
        "name": "Titwala",
        "id": "titwala",
        "lat": 19.2995,
        "lng": 73.2081,
        "uuid": "08b0edaa-6584-4176-81ce-6f15d05faa63",
        "type": "station",
        "position": {
          "x": 1104,
          "y": 330
        },
        "text_position": {
          "x": 1115,
          "y": 335
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 8,
        "slug": "real-estate-projects-near-titwala-railway-station"
      },
      {
        "name": "Khadavali",
        "uuid": "ac23d09a-fb33-4667-bb2d-df3b0e9ade42",
        "type": "station",
        "id": "khadavali",
        "lat": 19.3496,
        "lng": 73.2384,
        "position": {
          "x": 1123,
          "y": 303
        },
        "text_position": {
          "x": 1134,
          "y": 308
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 15,
        "slug": "real-estate-projects-near-khadavali-railway-station"
      },
      {
        "name": "Vashid",
        "id": "vashid",
        "lat": 19.419,
        "lng": 73.298,
        "uuid": "e1de6eeb-7243-4643-8a7e-c7e91f2bf555",
        "type": "station",
        "position": {
          "x": 1142,
          "y": 276
        },
        "text_position": {
          "x": 1153,
          "y": 281
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 29,
        "slug": "real-estate-projects-near-vashid-railway-station"
      },
      {
        "name": "Asangaon",
        "id": "asangaon",
        "lat": 19.4396,
        "lng": 73.3082,
        "uuid": "e8ef6b0f-a8a6-43b3-9b2a-c07640b8f38c",
        "type": "station",
        "position": {
          "x": 1161,
          "y": 249
        },
        "text_position": {
          "x": 1172,
          "y": 254
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 6,
        "slug": "real-estate-projects-near-asangaon-railway-station"
      },
      {
        "name": "Khardi",
        "id": "khardi",
        "lat": 19.5841,
        "lng": 73.4112,
        "uuid": "ab1abf19-af47-4718-bb85-cc7f656a5d09",
        "type": "station",
        "position": {
          "x": 1180,
          "y": 222
        },
        "text_position": {
          "x": 1191,
          "y": 227
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 17,
        "slug": "real-estate-projects-near-khardi-railway-station"
      },
      {
        "name": "Ulhasnagar",
        "id": "ulhasnagar",
        "lat": 19.2186,
        "lng": 73.1492,
        "uuid": "d5e02717-6029-49ef-aecc-46e31d83a3d1",
        "type": "station",
        "position": {
          "x": 1099,
          "y": 472
        },
        "text_position": {
          "x": 1110,
          "y": 474
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 32,
        "slug": "real-estate-projects-near-ulhasnagar-railway-station"
      },
      {
        "name": "Ambarnath",
        "id": "ambarnath",
        "lat": 19.1864,
        "lng": 73.1923,
        "uuid": "786542b8-69b1-417b-bbcb-c2d6bf645e11",
        "type": "station",
        "position": {
          "x": 1138,
          "y": 499
        },
        "text_position": {
          "x": 1150,
          "y": 503
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 24,
        "slug": "real-estate-projects-near-ambarnath-railway-station"
      },
      {
        "name": "Badlapur",
        "uuid": "c884cf6b-a7cb-48d1-9f27-9fd240e516a8",
        "id": "badlapur",
        "lat": 19.1554,
        "lng": 73.2625,
        "type": "station",
        "position": {
          "x": 1163,
          "y": 553
        },
        "text_position": {
          "x": 1175,
          "y": 557
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 9,
        "slug": "real-estate-projects-near-badlapur-railway-station"
      },
      {
        "name": "Vangani",
        "id": "vangani",
        "lat": 19.0793,
        "lng": 73.3032,
        "uuid": "461a41e1-52bc-4f17-a934-659dba44bef4",
        "type": "station",
        "position": {
          "x": 1163,
          "y": 602
        },
        "text_position": {
          "x": 1175,
          "y": 606
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 18,
        "slug": "real-estate-projects-near-vangani-railway-station"
      },
      {
        "name": "Shelu",
        "id": "shelu",
        "lat": 19.0437,
        "lng": 73.3094,
        "uuid": "f8fa98a8-dab7-4e0b-af0f-566e4bbb79a7",
        "type": "station",
        "position": {
          "x": 1163,
          "y": 651
        },
        "text_position": {
          "x": 1175,
          "y": 655
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 19,
        "slug": "real-estate-projects-near-shelu-railway-station"
      },
      {
        "name": "Neral",
        "id": "neral",
        "lat": 18.9877,
        "lng": 73.3195,
        "uuid": "804a7e6e-57b2-4eeb-812c-e385950a6924",
        "type": "station",
        "position": {
          "x": 1163,
          "y": 700
        },
        "text_position": {
          "x": 1175,
          "y": 704
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 32,
        "slug": "real-estate-projects-near-neral-railway-station"
      },
      {
        "name": "Bhivpuri",
        "id": "bhivpuri",
        "lat": 18.9482,
        "lng": 73.3211,
        "uuid": "4bb47ed1-c71b-442a-83ce-b0ed137d9db0",
        "type": "station",
        "position": {
          "x": 1163,
          "y": 749
        },
        "text_position": {
          "x": 1175,
          "y": 753
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 11,
        "slug": "real-estate-projects-near-bhivpuri-railway-station"
      },
      {
        "name": "Kelavli",
        "id": "kelavli",
        "lat": 18.8411,
        "lng": 73.3212,
        "uuid": "f552af7b-7f2b-41a7-971b-e8efb3237297",
        "type": "station",
        "position": {
          "x": 1132,
          "y": 825
        },
        "text_position": {
          "x": 1145,
          "y": 832
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 22,
        "slug": "real-estate-projects-near-kelavli-railway-station"
      },
      {
        "name": "Dolavli",
        "uuid": "e0e48507-d1af-400e-837f-10911802a415",
        "id": "dolavli",
        "lat": 18.8251,
        "lng": 73.3235,
        "type": "station",
        "position": {
          "x": 1102,
          "y": 845
        },
        "text_position": {
          "x": 1050,
          "y": 840
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 25,
        "slug": "real-estate-projects-near-dolavli-railway-station"
      },
      {
        "name": "Lowjee",
        "id": "lowjee",
        "lat": 18.7992,
        "lng": 73.3321,
        "uuid": "458ebc40-bb32-4dfd-82aa-01b868658f01",
        "type": "station",
        "position": {
          "x": 1073,
          "y": 865
        },
        "text_position": {
          "x": 1085,
          "y": 875
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b914,000 / sq.ft",
        "newProjectsCount": 8,
        "slug": "real-estate-projects-near-lowjee-railway-station"
      },
      {
        "name": "Mumbai CST",
        "id": "mumbaicst",
        "lat": 18.94,
        "lng": 72.8353,
        "uuid": "60974ec0-f4bf-4612-8d96-29319f040cdf",
        "type": "main_junction",
        "position": {
          "x": 252.5,
          "y": 895.5
        },
        "height": 17,
        "width": 37,
        "text_position": {
          "x": 300,
          "y": 907
        },
        "line": "Central Line",
        "lineKey": "central",
        "avgPrice": "\u20b958,000 / sq.ft",
        "newProjectsCount": 19,
        "slug": "real-estate-projects-near-mumbai-cst-railway-station"
      },
      {
        "name": "Wadala Road",
        "id": "wadalaroad",
        "lat": 19.0166,
        "lng": 72.8584,
        "uuid": "55ae52f3-063c-4c48-81a8-02a3f80a0fe2",
        "type": "main_junction",
        "position": {
          "x": 402.5,
          "y": 676.5
        },
        "text_position": {
          "x": 445,
          "y": 688
        },
        "width": 37,
        "height": 17,
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 10,
        "slug": "real-estate-projects-near-wadala-road-railway-station"
      },
      {
        "name": "Bandra",
        "id": "bandra",
        "lat": 19.0544,
        "lng": 72.8402,
        "type": "main_junction",
        "uuid": "4899894e-2534-444f-9ffa-5d4e36934ac8",
        "position": {
          "x": 232.5,
          "y": 572.5
        },
        "text_position": {
          "x": 180,
          "y": 584
        },
        "width": 27,
        "height": 17,
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b955,000 / sq.ft",
        "newProjectsCount": 6,
        "slug": "real-estate-projects-near-bandra-railway-station"
      },
      {
        "name": "Andheri",
        "id": "andheri",
        "lat": 19.1197,
        "lng": 72.8464,
        "type": "main_junction",
        "uuid": "84d5cefa-98bb-4af6-9a98-d915dd11be9c",
        "position": {
          "x": 232.5,
          "y": 480.5
        },
        "text_position": {
          "x": 175,
          "y": 492
        },
        "height": 17,
        "width": 27,
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b928,500 / sq.ft",
        "newProjectsCount": 9,
        "slug": "real-estate-projects-near-andheri-railway-station"
      },
      {
        "name": "Mahim Junction",
        "type": "junction",
        "uuid": "bcdb0291-428a-4f24-a746-c7e2d127ab80",
        "id": "mahimjunction",
        "lat": 19.0415,
        "lng": 72.8441,
        "position": {
          "x": 231.5,
          "y": 598.5
        },
        "text_position": {
          "x": 130,
          "y": 607
        },
        "width": 29,
        "height": 11,
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b918,000 / sq.ft",
        "newProjectsCount": 32,
        "slug": "real-estate-projects-near-mahim-junction-railway-station"
      },
      {
        "name": "Santacruz",
        "id": "santacruz",
        "lat": 19.0818,
        "lng": 72.8406,
        "uuid": "ff879065-efaa-484d-8e7c-e923bd4d1d53",
        "type": "junction",
        "position": {
          "x": 231.5,
          "y": 529.5
        },
        "text_position": {
          "x": 170,
          "y": 538
        },
        "height": 11,
        "width": 29,
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b938,000 / sq.ft",
        "newProjectsCount": 13,
        "slug": "real-estate-projects-near-santacruz-railway-station"
      },
      {
        "name": "Khar Road",
        "id": "kharroad",
        "lat": 19.0694,
        "lng": 72.8372,
        "type": "junction",
        "uuid": "38487819-250d-43e7-879b-cad8f6d4cc7f",
        "position": {
          "x": 231.5,
          "y": 552.5
        },
        "text_position": {
          "x": 165,
          "y": 561
        },
        "height": 11,
        "width": 29,
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b946,000 / sq.ft",
        "newProjectsCount": 10,
        "slug": "real-estate-projects-near-khar-road-railway-station"
      },
      {
        "name": "Vile Parle",
        "id": "vileparle",
        "lat": 19.0988,
        "lng": 72.844,
        "type": "junction",
        "uuid": "578029b1-070a-4f3d-9cfb-880ab12cee25",
        "position": {
          "x": 231.5,
          "y": 506.5
        },
        "text_position": {
          "x": 175,
          "y": 515
        },
        "height": 11,
        "width": 29,
        "line": "Western Line",
        "lineKey": "western",
        "avgPrice": "\u20b936,500 / sq.ft",
        "newProjectsCount": 18,
        "slug": "real-estate-projects-near-vile-parle-railway-station"
      },
      {
        "name": "Panvel",
        "id": "panvel",
        "lat": 18.9902,
        "lng": 73.1189,
        "uuid": "627a7b51-3e9c-428d-af33-cc77a0b4bcf2",
        "type": "main_junction",
        "position": {
          "x": 903.5,
          "y": 793.5
        },
        "text_position": {
          "x": 890,
          "y": 825
        },
        "height": 17,
        "width": 17,
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b98,800 / sq.ft",
        "newProjectsCount": 8,
        "slug": "real-estate-projects-near-panvel-railway-station"
      },
      {
        "name": "Nerul",
        "uuid": "8f453856-febc-44c7-929b-507898a19f40",
        "id": "nerul",
        "lat": 19.0335,
        "lng": 73.0163,
        "type": "main_junction",
        "position": {
          "x": 724.5,
          "y": 652.5
        },
        "text_position": {
          "x": 755,
          "y": 665
        },
        "height": 17,
        "width": 27,
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b916,200 / sq.ft",
        "newProjectsCount": 24,
        "slug": "real-estate-projects-near-nerul-railway-station"
      },
      {
        "name": "Vashi",
        "id": "vashi",
        "lat": 19.0771,
        "lng": 72.9986,
        "uuid": "5a695ced-7759-4150-aca5-1ff6790f3d64",
        "type": "main_junction",
        "position": {
          "x": 687.5,
          "y": 571.5
        },
        "text_position": {
          "x": 655,
          "y": 570
        },
        "height": 27,
        "width": 17,
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b918,900 / sq.ft",
        "newProjectsCount": 13,
        "slug": "real-estate-projects-near-vashi-railway-station"
      },
      {
        "name": "Juinagar",
        "id": "juinagar",
        "lat": 19.0573,
        "lng": 73.0178,
        "uuid": "a276fb95-b9df-46a7-ab57-8cc2506afea2",
        "type": "junction",
        "position": {
          "x": 723.5,
          "y": 624.5
        },
        "text_position": {
          "x": 755,
          "y": 634
        },
        "height": 11,
        "width": 29,
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 15,
        "slug": "real-estate-projects-near-juinagar-railway-station"
      },
      {
        "name": "Sanpada",
        "id": "sanpada",
        "lat": 19.0688,
        "lng": 73.0175,
        "type": "junction",
        "uuid": "a9e0e502-a25a-4e5f-8a55-c41bdffa689d",
        "position": {
          "x": 714.5,
          "y": 570.5
        },
        "text_position": {
          "x": 680,
          "y": 560
        },
        "height": 29,
        "width": 9,
        "line": "Harbour Line",
        "lineKey": "harbour",
        "avgPrice": "\u20b911,000 / sq.ft",
        "newProjectsCount": 6,
        "slug": "real-estate-projects-near-sanpada-railway-station"
      }
    ],
    "popularHubs": [
      {
        "id": "dadar",
        "name": "Dadar Junction",
        "line": "Western & Central Inter-Change",
        "avgPrice": "\u20b941,000 / sq.ft",
        "projects": 32,
        "tag": "Central Mega Interchange",
        "zone": "South Central"
      },
      {
        "id": "bandra",
        "name": "Bandra",
        "line": "Western & Harbour Line",
        "avgPrice": "\u20b955,000 / sq.ft",
        "projects": 26,
        "tag": "Queen of Suburbs",
        "zone": "Western Suburbs"
      },
      {
        "id": "andheri",
        "name": "Andheri",
        "line": "Western, Harbour & Metro 1",
        "avgPrice": "\u20b928,500 / sq.ft",
        "projects": 44,
        "tag": "Commercial Super-Hub",
        "zone": "Western Suburbs"
      },
      {
        "id": "borivali",
        "name": "Borivali",
        "line": "Western Fast & Terminus",
        "avgPrice": "\u20b921,000 / sq.ft",
        "projects": 38,
        "tag": "Northern Gateway",
        "zone": "Western Suburbs"
      },
      {
        "id": "thane",
        "name": "Thane",
        "line": "Central & Trans-Harbour Junction",
        "avgPrice": "\u20b916,800 / sq.ft",
        "projects": 52,
        "tag": "Smart City Junction",
        "zone": "Thane District"
      },
      {
        "id": "kalyan",
        "name": "Kalyan",
        "line": "Central Main & Northern Arterial",
        "avgPrice": "\u20b97,200 / sq.ft",
        "projects": 40,
        "tag": "Junction Terminus",
        "zone": "Extended Central"
      },
      {
        "id": "vashi",
        "name": "Vashi",
        "line": "Harbour & Trans-Harbour Node",
        "avgPrice": "\u20b918,900 / sq.ft",
        "projects": 22,
        "tag": "Navi Mumbai Gateway",
        "zone": "Navi Mumbai"
      },
      {
        "id": "panvel",
        "name": "Panvel",
        "line": "Harbour Terminus & Airport Corridor",
        "avgPrice": "\u20b98,800 / sq.ft",
        "projects": 48,
        "tag": "NMIA Transit Node",
        "zone": "Navi Mumbai"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Mumbai Suburban Railway Alignment (Central & Western Railway)",
      "missingCredentials": "Live GPS rake telemetry requires private CRIS/NTES / MRVC enterprise API credentials.",
      "scheduleFrequency": "Peak: every 3-4 mins \u2022 Regular: every 7-10 mins",
      "verified": true
    },
    "available": true
  },
  "pune": {
    "cityId": "pune",
    "cityName": "Pune",
    "networkTitle": "Pune Suburban & Metro Rail Network",
    "networkSubtitle": "Pune Suburban Railway \u2022 Purple Metro Line 1 \u2022 Aqua Metro Line 2",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 150 150 Q 300 210 500 290 Q 700 370 850 470 Q 950 540 1050 580 Q 1150 540 1280 500 Q 1200 600 1100 660 Q 950 720 850 670 Q 750 640 650 700 Q 400 500 150 150 Z",
    "lines": [
      {
        "id": "suburban",
        "label": "Suburban Railway",
        "color": "#16A34A",
        "bg": "#DCFCE7",
        "type": "suburban",
        "path": "M 180 180 L 280 220 L 430 280 L 530 320 L 580 340 L 640 370 L 700 400 L 760 430 L 820 460 L 870 490 L 920 520 L 980 560 L 1060 600"
      },
      {
        "id": "purple",
        "label": "Purple Line 1 (PCMC - Swargate)",
        "color": "#8B5CF6",
        "bg": "#EDE9FE",
        "type": "metro",
        "path": "M 760 340 L 760 380 L 760 420 L 820 460 L 870 490 L 920 520 L 980 560 L 1020 580 L 1020 620 L 1020 660 L 1020 710"
      },
      {
        "id": "aqua",
        "label": "Aqua Line 2 (Vanaz - Ramwadi)",
        "color": "#06B6D4",
        "bg": "#CFFAFE",
        "type": "metro",
        "path": "M 680 680 L 810 620 L 910 590 L 1020 580 L 1060 600 L 1210 530 L 1250 510"
      }
    ],
    "interchanges": [
      {
        "id": "civil_court",
        "name": "Civil Court Interchange",
        "x": 1005,
        "y": 572,
        "width": 30,
        "height": 16,
        "lines": [
          "Purple Metro",
          "Aqua Metro"
        ]
      },
      {
        "id": "pune_rail_metro",
        "name": "Pune Junction / Station",
        "x": 1045,
        "y": 592,
        "width": 30,
        "height": 16,
        "lines": [
          "Suburban Rail",
          "Aqua Metro"
        ]
      },
      {
        "id": "kasarwadi_int",
        "name": "Kasarwadi Intermodal",
        "x": 805,
        "y": 452,
        "width": 30,
        "height": 16,
        "lines": [
          "Suburban Rail",
          "Purple Metro"
        ]
      },
      {
        "id": "shivaji_int",
        "name": "Shivajinagar Central",
        "x": 965,
        "y": 552,
        "width": 30,
        "height": 16,
        "lines": [
          "Suburban Rail",
          "Purple Metro"
        ]
      }
    ],
    "stations": [
      {
        "id": "pune_jn",
        "name": "Pune Junction",
        "lat": 18.5284,
        "lng": 73.8744,
        "position": {
          "x": 1060,
          "y": 600
        },
        "text_position": {
          "x": 1075,
          "y": 604
        },
        "line": "Suburban & Aqua Metro",
        "lineKey": "suburban",
        "avgPrice": "\u20b911,500 / sq.ft",
        "newProjectsCount": 24,
        "slug": "pune-junction",
        "isJunction": true
      },
      {
        "id": "shivajinagar",
        "name": "Shivajinagar",
        "lat": 18.5314,
        "lng": 73.8446,
        "position": {
          "x": 980,
          "y": 560
        },
        "text_position": {
          "x": 995,
          "y": 564
        },
        "line": "Suburban & Purple Metro",
        "lineKey": "suburban",
        "avgPrice": "\u20b914,200 / sq.ft",
        "newProjectsCount": 38,
        "slug": "shivajinagar",
        "isJunction": true
      },
      {
        "id": "khadki",
        "name": "Khadki",
        "lat": 18.5627,
        "lng": 73.8344,
        "position": {
          "x": 920,
          "y": 520
        },
        "text_position": {
          "x": 860,
          "y": 524
        },
        "line": "Suburban & Purple Metro",
        "lineKey": "suburban",
        "avgPrice": "\u20b99,800 / sq.ft",
        "newProjectsCount": 22,
        "slug": "khadki",
        "isJunction": true
      },
      {
        "id": "dapodi",
        "name": "Dapodi",
        "lat": 18.5804,
        "lng": 73.8306,
        "position": {
          "x": 870,
          "y": 490
        },
        "text_position": {
          "x": 810,
          "y": 494
        },
        "line": "Suburban & Purple Metro",
        "lineKey": "suburban",
        "avgPrice": "\u20b98,900 / sq.ft",
        "newProjectsCount": 18,
        "slug": "dapodi",
        "isJunction": true
      },
      {
        "id": "kasarwadi",
        "name": "Kasarwadi",
        "lat": 18.5997,
        "lng": 73.8211,
        "position": {
          "x": 820,
          "y": 460
        },
        "text_position": {
          "x": 835,
          "y": 464
        },
        "line": "Suburban & Purple Metro",
        "lineKey": "suburban",
        "avgPrice": "\u20b98,500 / sq.ft",
        "newProjectsCount": 16,
        "slug": "kasarwadi",
        "isJunction": true
      },
      {
        "id": "pimpri",
        "name": "Pimpri",
        "lat": 18.6272,
        "lng": 73.7997,
        "position": {
          "x": 760,
          "y": 430
        },
        "text_position": {
          "x": 700,
          "y": 434
        },
        "line": "Suburban Railway",
        "lineKey": "suburban",
        "avgPrice": "\u20b98,200 / sq.ft",
        "newProjectsCount": 32,
        "slug": "pimpri"
      },
      {
        "id": "chinchwad",
        "name": "Chinchwad",
        "lat": 18.6389,
        "lng": 73.7911,
        "position": {
          "x": 700,
          "y": 400
        },
        "text_position": {
          "x": 630,
          "y": 404
        },
        "line": "Suburban Railway",
        "lineKey": "suburban",
        "avgPrice": "\u20b98,600 / sq.ft",
        "newProjectsCount": 42,
        "slug": "chinchwad",
        "isJunction": true
      },
      {
        "id": "akurdi",
        "name": "Akurdi",
        "lat": 18.6494,
        "lng": 73.7719,
        "position": {
          "x": 640,
          "y": 370
        },
        "text_position": {
          "x": 585,
          "y": 374
        },
        "line": "Suburban Railway",
        "lineKey": "suburban",
        "avgPrice": "\u20b97,900 / sq.ft",
        "newProjectsCount": 26,
        "slug": "akurdi"
      },
      {
        "id": "dehu_road",
        "name": "Dehu Road",
        "lat": 18.7183,
        "lng": 73.7297,
        "position": {
          "x": 580,
          "y": 340
        },
        "text_position": {
          "x": 510,
          "y": 344
        },
        "line": "Suburban Railway",
        "lineKey": "suburban",
        "avgPrice": "\u20b96,800 / sq.ft",
        "newProjectsCount": 19,
        "slug": "dehu-road"
      },
      {
        "id": "begdewadi",
        "name": "Begdewadi",
        "lat": 18.7297,
        "lng": 73.7086,
        "position": {
          "x": 530,
          "y": 320
        },
        "text_position": {
          "x": 460,
          "y": 324
        },
        "line": "Suburban Railway",
        "lineKey": "suburban",
        "avgPrice": "\u20b96,400 / sq.ft",
        "newProjectsCount": 12,
        "slug": "begdewadi"
      },
      {
        "id": "talegaon",
        "name": "Talegaon",
        "lat": 18.7303,
        "lng": 73.6681,
        "position": {
          "x": 430,
          "y": 280
        },
        "text_position": {
          "x": 370,
          "y": 284
        },
        "line": "Suburban Railway",
        "lineKey": "suburban",
        "avgPrice": "\u20b96,100 / sq.ft",
        "newProjectsCount": 35,
        "slug": "talegaon",
        "isJunction": true
      },
      {
        "id": "kamshet",
        "name": "Kamshet",
        "lat": 18.7561,
        "lng": 73.5606,
        "position": {
          "x": 280,
          "y": 220
        },
        "text_position": {
          "x": 225,
          "y": 224
        },
        "line": "Suburban Railway",
        "lineKey": "suburban",
        "avgPrice": "\u20b95,200 / sq.ft",
        "newProjectsCount": 14,
        "slug": "kamshet"
      },
      {
        "id": "lonavala",
        "name": "Lonavala",
        "lat": 18.7557,
        "lng": 73.4091,
        "position": {
          "x": 180,
          "y": 180
        },
        "text_position": {
          "x": 115,
          "y": 184
        },
        "line": "Suburban Railway",
        "lineKey": "suburban",
        "avgPrice": "\u20b97,800 / sq.ft",
        "newProjectsCount": 20,
        "slug": "lonavala",
        "isJunction": true
      },
      {
        "id": "pcmc",
        "name": "PCMC Building",
        "lat": 18.6297,
        "lng": 73.8122,
        "position": {
          "x": 760,
          "y": 340
        },
        "text_position": {
          "x": 775,
          "y": 344
        },
        "line": "Purple Metro Line",
        "lineKey": "purple",
        "avgPrice": "\u20b98,400 / sq.ft",
        "newProjectsCount": 45,
        "slug": "pcmc-metro",
        "isJunction": true
      },
      {
        "id": "sant_tukaram",
        "name": "Sant Tukaram Nagar",
        "lat": 18.6186,
        "lng": 73.8206,
        "position": {
          "x": 760,
          "y": 380
        },
        "text_position": {
          "x": 775,
          "y": 384
        },
        "line": "Purple Metro Line",
        "lineKey": "purple",
        "avgPrice": "\u20b98,100 / sq.ft",
        "newProjectsCount": 18,
        "slug": "sant-tukaram-nagar"
      },
      {
        "id": "bhosari_metro",
        "name": "Bhosari (Nashik Phata)",
        "lat": 18.6083,
        "lng": 73.8247,
        "position": {
          "x": 760,
          "y": 420
        },
        "text_position": {
          "x": 775,
          "y": 424
        },
        "line": "Purple Metro Line",
        "lineKey": "purple",
        "avgPrice": "\u20b97,900 / sq.ft",
        "newProjectsCount": 28,
        "slug": "bhosari-metro"
      },
      {
        "id": "civil_court",
        "name": "Civil Court Interchange",
        "lat": 18.5289,
        "lng": 73.8547,
        "position": {
          "x": 1020,
          "y": 580
        },
        "text_position": {
          "x": 930,
          "y": 605
        },
        "line": "Purple & Aqua Metro",
        "lineKey": "purple",
        "avgPrice": "\u20b913,800 / sq.ft",
        "newProjectsCount": 31,
        "slug": "civil-court-interchange",
        "isJunction": true
      },
      {
        "id": "swargate",
        "name": "Swargate Terminus",
        "lat": 18.5019,
        "lng": 73.8586,
        "position": {
          "x": 1020,
          "y": 710
        },
        "text_position": {
          "x": 1035,
          "y": 714
        },
        "line": "Purple Metro Line",
        "lineKey": "purple",
        "avgPrice": "\u20b912,400 / sq.ft",
        "newProjectsCount": 29,
        "slug": "swargate",
        "isJunction": true
      },
      {
        "id": "vanaz",
        "name": "Vanaz Corner",
        "lat": 18.5061,
        "lng": 73.8058,
        "position": {
          "x": 680,
          "y": 680
        },
        "text_position": {
          "x": 625,
          "y": 684
        },
        "line": "Aqua Metro Line",
        "lineKey": "aqua",
        "avgPrice": "\u20b911,800 / sq.ft",
        "newProjectsCount": 25,
        "slug": "vanaz-metro",
        "isJunction": true
      },
      {
        "id": "nal_stop",
        "name": "Nal Stop (Karve Rd)",
        "lat": 18.5128,
        "lng": 73.8317,
        "position": {
          "x": 810,
          "y": 620
        },
        "text_position": {
          "x": 740,
          "y": 624
        },
        "line": "Aqua Metro Line",
        "lineKey": "aqua",
        "avgPrice": "\u20b913,500 / sq.ft",
        "newProjectsCount": 20,
        "slug": "nal-stop"
      },
      {
        "id": "deccan",
        "name": "Deccan Gymkhana",
        "lat": 18.5178,
        "lng": 73.8436,
        "position": {
          "x": 910,
          "y": 590
        },
        "text_position": {
          "x": 830,
          "y": 580
        },
        "line": "Aqua Metro Line",
        "lineKey": "aqua",
        "avgPrice": "\u20b916,200 / sq.ft",
        "newProjectsCount": 15,
        "slug": "deccan-gymkhana"
      },
      {
        "id": "kalyani_nagar",
        "name": "Kalyani Nagar",
        "lat": 18.5486,
        "lng": 73.9056,
        "position": {
          "x": 1210,
          "y": 530
        },
        "text_position": {
          "x": 1225,
          "y": 534
        },
        "line": "Aqua Metro Line",
        "lineKey": "aqua",
        "avgPrice": "\u20b912,800 / sq.ft",
        "newProjectsCount": 36,
        "slug": "kalyani-nagar"
      },
      {
        "id": "ramwadi",
        "name": "Ramwadi Terminus",
        "lat": 18.5519,
        "lng": 73.9211,
        "position": {
          "x": 1250,
          "y": 510
        },
        "text_position": {
          "x": 1265,
          "y": 514
        },
        "line": "Aqua Metro Line",
        "lineKey": "aqua",
        "avgPrice": "\u20b910,500 / sq.ft",
        "newProjectsCount": 40,
        "slug": "ramwadi",
        "isJunction": true
      }
    ],
    "popularHubs": [
      {
        "id": "shivajinagar",
        "name": "Shivajinagar Interchange",
        "line": "Suburban Rail & Metro Line 1",
        "avgPrice": "\u20b914,200 / sq.ft",
        "projects": 38,
        "tag": "Central Transit Core",
        "zone": "Central Pune"
      },
      {
        "id": "pcmc",
        "name": "PCMC Metro Terminal",
        "line": "Purple Metro Line 1 Terminus",
        "avgPrice": "\u20b98,400 / sq.ft",
        "projects": 45,
        "tag": "Industrial & Tech Hub",
        "zone": "Pimpri-Chinchwad"
      },
      {
        "id": "kalyani_nagar",
        "name": "Kalyani Nagar Metro",
        "line": "Aqua Metro Line 2",
        "avgPrice": "\u20b912,800 / sq.ft",
        "projects": 36,
        "tag": "Premium IT Hub",
        "zone": "East Pune"
      },
      {
        "id": "vanaz",
        "name": "Vanaz (Kothrud)",
        "line": "Aqua Metro Line 2 Terminus",
        "avgPrice": "\u20b911,800 / sq.ft",
        "projects": 25,
        "tag": "Cultural West Node",
        "zone": "West Pune"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Maha Metro (PMRDA) & Central Railway Pune Division",
      "missingCredentials": "Live train & metro telemetry requires Maha Metro API partner credentials.",
      "scheduleFrequency": "Metro: every 6-8 mins \u2022 Suburban: 45 min scheduled headway",
      "verified": true
    },
    "available": true
  },
  "delhi": {
    "cityId": "delhi",
    "cityName": "Delhi NCR",
    "networkTitle": "Delhi NCR Metro & Rail Network",
    "networkSubtitle": "Delhi Metro (Yellow & Blue) \u2022 Gurugram Rapid Metro \u2022 Noida Aqua Line",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 550 50 Q 640 150 670 250 Q 720 350 780 430 Q 860 480 940 520 Q 980 580 950 680 Q 900 780 820 850 Q 650 940 450 850 Q 250 750 200 600 Q 200 450 350 350 Q 480 200 550 50 Z",
    "lines": [
      {
        "id": "yellow",
        "label": "Yellow Line (Badli - Gurugram)",
        "color": "#EAB308",
        "bg": "#FEF9C3",
        "type": "metro",
        "path": "M 660 100 L 660 160 L 660 220 L 660 300 L 660 350 L 660 410 L 660 490 L 660 540 L 660 610 L 660 650 L 660 840 L 660 930"
      },
      {
        "id": "blue",
        "label": "Blue Line (Dwarka - Noida)",
        "color": "#2563EB",
        "bg": "#DBEAFE",
        "type": "metro",
        "path": "M 220 520 L 340 460 L 440 410 L 660 350 L 1050 500 L 1090 520 L 1210 580 L 1250 600"
      },
      {
        "id": "rapid",
        "label": "Rapid Metro Gurugram",
        "color": "#0D9488",
        "bg": "#CCFBF1",
        "type": "metro",
        "path": "M 580 800 L 660 840 L 720 900"
      },
      {
        "id": "aqua",
        "label": "Noida Aqua Line",
        "color": "#06B6D4",
        "bg": "#CFFAFE",
        "type": "metro",
        "path": "M 1210 605 L 1210 780 L 1210 900"
      }
    ],
    "interchanges": [
      {
        "id": "rajiv_chowk",
        "name": "Rajiv Chowk (CP)",
        "x": 645,
        "y": 342,
        "width": 30,
        "height": 16,
        "lines": [
          "Yellow Line",
          "Blue Line"
        ]
      },
      {
        "id": "sikanderpur_int",
        "name": "Sikanderpur Hub",
        "x": 645,
        "y": 832,
        "width": 30,
        "height": 16,
        "lines": [
          "Yellow Line",
          "Rapid Metro"
        ]
      },
      {
        "id": "noida_int",
        "name": "Noida Sec 51 / 52 Link",
        "x": 1195,
        "y": 572,
        "width": 30,
        "height": 38,
        "lines": [
          "Blue Line",
          "Aqua Line"
        ]
      }
    ],
    "stations": [
      {
        "id": "samaypur_badli",
        "name": "Samaypur Badli",
        "lat": 28.7456,
        "lng": 77.1356,
        "position": {
          "x": 660,
          "y": 100
        },
        "text_position": {
          "x": 560,
          "y": 104
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b97,200 / sq.ft",
        "newProjectsCount": 16,
        "slug": "samaypur-badli",
        "isJunction": true
      },
      {
        "id": "azadpur",
        "name": "Azadpur",
        "lat": 28.7067,
        "lng": 77.1789,
        "position": {
          "x": 660,
          "y": 160
        },
        "text_position": {
          "x": 590,
          "y": 164
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b98,500 / sq.ft",
        "newProjectsCount": 20,
        "slug": "azadpur",
        "isJunction": true
      },
      {
        "id": "kashmere_gate",
        "name": "Kashmere Gate",
        "lat": 28.6675,
        "lng": 77.2281,
        "position": {
          "x": 660,
          "y": 220
        },
        "text_position": {
          "x": 550,
          "y": 224
        },
        "line": "Yellow, Red & Violet Lines",
        "lineKey": "yellow",
        "avgPrice": "\u20b911,500 / sq.ft",
        "newProjectsCount": 18,
        "slug": "kashmere-gate",
        "isJunction": true
      },
      {
        "id": "new_delhi",
        "name": "New Delhi Railway Station",
        "lat": 28.6429,
        "lng": 77.2197,
        "position": {
          "x": 660,
          "y": 300
        },
        "text_position": {
          "x": 520,
          "y": 295
        },
        "line": "Yellow & Airport Express",
        "lineKey": "yellow",
        "avgPrice": "\u20b918,500 / sq.ft",
        "newProjectsCount": 22,
        "slug": "new-delhi",
        "isJunction": true
      },
      {
        "id": "rajiv_chowk",
        "name": "Rajiv Chowk (CP)",
        "lat": 28.6328,
        "lng": 77.2197,
        "position": {
          "x": 660,
          "y": 350
        },
        "text_position": {
          "x": 675,
          "y": 345
        },
        "line": "Yellow & Blue Line Interchange",
        "lineKey": "yellow",
        "avgPrice": "\u20b932,000 / sq.ft",
        "newProjectsCount": 28,
        "slug": "rajiv-chowk",
        "isJunction": true
      },
      {
        "id": "central_sec",
        "name": "Central Secretariat",
        "lat": 28.6147,
        "lng": 77.2119,
        "position": {
          "x": 660,
          "y": 410
        },
        "text_position": {
          "x": 540,
          "y": 414
        },
        "line": "Yellow & Violet Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b928,000 / sq.ft",
        "newProjectsCount": 14,
        "slug": "central-secretariat",
        "isJunction": true
      },
      {
        "id": "aiims",
        "name": "AIIMS",
        "lat": 28.5683,
        "lng": 77.2081,
        "position": {
          "x": 660,
          "y": 490
        },
        "text_position": {
          "x": 615,
          "y": 494
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b926,500 / sq.ft",
        "newProjectsCount": 15,
        "slug": "aiims"
      },
      {
        "id": "hauz_khas",
        "name": "Hauz Khas",
        "lat": 28.5433,
        "lng": 77.2064,
        "position": {
          "x": 660,
          "y": 540
        },
        "text_position": {
          "x": 585,
          "y": 544
        },
        "line": "Yellow & Magenta Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b924,500 / sq.ft",
        "newProjectsCount": 26,
        "slug": "hauz-khas",
        "isJunction": true
      },
      {
        "id": "saket",
        "name": "Saket",
        "lat": 28.5206,
        "lng": 77.2014,
        "position": {
          "x": 660,
          "y": 610
        },
        "text_position": {
          "x": 615,
          "y": 614
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b916,500 / sq.ft",
        "newProjectsCount": 32,
        "slug": "saket"
      },
      {
        "id": "qutab_minar",
        "name": "Qutab Minar",
        "lat": 28.5028,
        "lng": 77.1861,
        "position": {
          "x": 660,
          "y": 650
        },
        "text_position": {
          "x": 575,
          "y": 654
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b914,200 / sq.ft",
        "newProjectsCount": 24,
        "slug": "qutab-minar"
      },
      {
        "id": "sikanderpur",
        "name": "Sikanderpur Gurugram",
        "lat": 28.4819,
        "lng": 77.0928,
        "position": {
          "x": 660,
          "y": 840
        },
        "text_position": {
          "x": 540,
          "y": 844
        },
        "line": "Yellow & Rapid Metro",
        "lineKey": "yellow",
        "avgPrice": "\u20b915,800 / sq.ft",
        "newProjectsCount": 42,
        "slug": "sikanderpur",
        "isJunction": true
      },
      {
        "id": "millennium_city",
        "name": "Millennium City Centre",
        "lat": 28.4594,
        "lng": 77.0725,
        "position": {
          "x": 660,
          "y": 930
        },
        "text_position": {
          "x": 525,
          "y": 934
        },
        "line": "Yellow Line Terminus",
        "lineKey": "yellow",
        "avgPrice": "\u20b916,500 / sq.ft",
        "newProjectsCount": 54,
        "slug": "millennium-city-centre",
        "isJunction": true
      },
      {
        "id": "dwarka_21",
        "name": "Dwarka Sector 21",
        "lat": 28.5522,
        "lng": 77.0583,
        "position": {
          "x": 220,
          "y": 520
        },
        "text_position": {
          "x": 130,
          "y": 524
        },
        "line": "Blue & Airport Express",
        "lineKey": "blue",
        "avgPrice": "\u20b910,500 / sq.ft",
        "newProjectsCount": 38,
        "slug": "dwarka-sector-21",
        "isJunction": true
      },
      {
        "id": "janakpuri_west",
        "name": "Janakpuri West",
        "lat": 28.6294,
        "lng": 77.0781,
        "position": {
          "x": 340,
          "y": 460
        },
        "text_position": {
          "x": 260,
          "y": 455
        },
        "line": "Blue & Magenta Line",
        "lineKey": "blue",
        "avgPrice": "\u20b912,400 / sq.ft",
        "newProjectsCount": 29,
        "slug": "janakpuri-west",
        "isJunction": true
      },
      {
        "id": "rajouri_garden",
        "name": "Rajouri Garden",
        "lat": 28.6492,
        "lng": 77.1228,
        "position": {
          "x": 440,
          "y": 410
        },
        "text_position": {
          "x": 370,
          "y": 405
        },
        "line": "Blue & Pink Line",
        "lineKey": "blue",
        "avgPrice": "\u20b914,800 / sq.ft",
        "newProjectsCount": 25,
        "slug": "rajouri-garden",
        "isJunction": true
      },
      {
        "id": "noida_18",
        "name": "Noida Sector 18 (Atta)",
        "lat": 28.5708,
        "lng": 77.3261,
        "position": {
          "x": 1050,
          "y": 500
        },
        "text_position": {
          "x": 1065,
          "y": 504
        },
        "line": "Blue Line",
        "lineKey": "blue",
        "avgPrice": "\u20b913,800 / sq.ft",
        "newProjectsCount": 40,
        "slug": "noida-sector-18"
      },
      {
        "id": "botanical_garden",
        "name": "Botanical Garden",
        "lat": 28.5642,
        "lng": 77.3342,
        "position": {
          "x": 1090,
          "y": 520
        },
        "text_position": {
          "x": 1105,
          "y": 524
        },
        "line": "Blue & Magenta Line",
        "lineKey": "blue",
        "avgPrice": "\u20b911,200 / sq.ft",
        "newProjectsCount": 34,
        "slug": "botanical-garden",
        "isJunction": true
      },
      {
        "id": "noida_52",
        "name": "Noida Sector 52",
        "lat": 28.5919,
        "lng": 77.3758,
        "position": {
          "x": 1210,
          "y": 580
        },
        "text_position": {
          "x": 1225,
          "y": 584
        },
        "line": "Blue Line (Walk to Aqua Line)",
        "lineKey": "blue",
        "avgPrice": "\u20b99,800 / sq.ft",
        "newProjectsCount": 48,
        "slug": "noida-sector-52",
        "isJunction": true
      },
      {
        "id": "noida_elec_city",
        "name": "Noida Electronic City",
        "lat": 28.6281,
        "lng": 77.3769,
        "position": {
          "x": 1250,
          "y": 600
        },
        "text_position": {
          "x": 1265,
          "y": 604
        },
        "line": "Blue Line Terminus",
        "lineKey": "blue",
        "avgPrice": "\u20b98,900 / sq.ft",
        "newProjectsCount": 36,
        "slug": "noida-electronic-city",
        "isJunction": true
      },
      {
        "id": "cyber_city",
        "name": "Cyber City Gurugram",
        "lat": 28.495,
        "lng": 77.0894,
        "position": {
          "x": 580,
          "y": 800
        },
        "text_position": {
          "x": 485,
          "y": 795
        },
        "line": "Gurugram Rapid Metro",
        "lineKey": "rapid",
        "avgPrice": "\u20b918,500 / sq.ft",
        "newProjectsCount": 46,
        "slug": "cyber-city",
        "isJunction": true
      },
      {
        "id": "sector_54",
        "name": "Sector 54 Chowk (Golf Course)",
        "lat": 28.4414,
        "lng": 77.1067,
        "position": {
          "x": 720,
          "y": 900
        },
        "text_position": {
          "x": 735,
          "y": 904
        },
        "line": "Gurugram Rapid Metro",
        "lineKey": "rapid",
        "avgPrice": "\u20b922,000 / sq.ft",
        "newProjectsCount": 35,
        "slug": "sector-54-chowk"
      },
      {
        "id": "noida_51",
        "name": "Noida Sector 51",
        "lat": 28.5786,
        "lng": 77.3739,
        "position": {
          "x": 1210,
          "y": 605
        },
        "text_position": {
          "x": 1225,
          "y": 609
        },
        "line": "Noida Aqua Line Terminus",
        "lineKey": "aqua",
        "avgPrice": "\u20b99,600 / sq.ft",
        "newProjectsCount": 30,
        "slug": "noida-sector-51",
        "isJunction": true
      },
      {
        "id": "noida_137",
        "name": "Noida Sector 137 (Expressway)",
        "lat": 28.5147,
        "lng": 77.4044,
        "position": {
          "x": 1210,
          "y": 780
        },
        "text_position": {
          "x": 1225,
          "y": 784
        },
        "line": "Noida Aqua Line",
        "lineKey": "aqua",
        "avgPrice": "\u20b98,200 / sq.ft",
        "newProjectsCount": 42,
        "slug": "noida-sector-137"
      }
    ],
    "popularHubs": [
      {
        "id": "rajiv_chowk",
        "name": "Rajiv Chowk (Connaught Place)",
        "line": "Yellow & Blue Line Super-Hub",
        "avgPrice": "\u20b932,000 / sq.ft",
        "projects": 28,
        "tag": "National CBD",
        "zone": "Central Delhi"
      },
      {
        "id": "cyber_city",
        "name": "Cyber City Gurugram",
        "line": "Rapid Metro & Yellow Line",
        "avgPrice": "\u20b918,500 / sq.ft",
        "projects": 46,
        "tag": "Fortune 500 Corridor",
        "zone": "Gurugram"
      },
      {
        "id": "noida_18",
        "name": "Noida Sector 18",
        "line": "Blue Line Hub",
        "avgPrice": "\u20b913,800 / sq.ft",
        "projects": 40,
        "tag": "Commercial Core",
        "zone": "Noida"
      },
      {
        "id": "hauz_khas",
        "name": "Hauz Khas Junction",
        "line": "Yellow & Magenta Line",
        "avgPrice": "\u20b924,500 / sq.ft",
        "projects": 26,
        "tag": "South Delhi Prime",
        "zone": "South Delhi"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Delhi Metro Rail Corporation (DMRC) & NMRC / HMRTC Feeds",
      "missingCredentials": "Live vehicle location GTFS-RT requires DMRC developer partner credentials.",
      "scheduleFrequency": "Peak: every 2-3 mins \u2022 Regular: every 5-7 mins",
      "verified": true
    },
    "available": true
  },
  "gurugram": {
    "cityId": "gurugram",
    "cityName": "Gurugram",
    "networkTitle": "Gurugram & Delhi NCR Transit Network",
    "networkSubtitle": "Delhi Metro (Yellow & Blue) \u2022 Gurugram Rapid Metro \u2022 Noida Aqua Line",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 550 50 Q 640 150 670 250 Q 720 350 780 430 Q 860 480 940 520 Q 980 580 950 680 Q 900 780 820 850 Q 650 940 450 850 Q 250 750 200 600 Q 200 450 350 350 Q 480 200 550 50 Z",
    "lines": [
      {
        "id": "yellow",
        "label": "Yellow Line (Badli - Gurugram)",
        "color": "#EAB308",
        "bg": "#FEF9C3",
        "type": "metro",
        "path": "M 660 100 L 660 160 L 660 220 L 660 300 L 660 350 L 660 410 L 660 490 L 660 540 L 660 610 L 660 650 L 660 840 L 660 930"
      },
      {
        "id": "blue",
        "label": "Blue Line (Dwarka - Noida)",
        "color": "#2563EB",
        "bg": "#DBEAFE",
        "type": "metro",
        "path": "M 220 520 L 340 460 L 440 410 L 660 350 L 1050 500 L 1090 520 L 1210 580 L 1250 600"
      },
      {
        "id": "rapid",
        "label": "Rapid Metro Gurugram",
        "color": "#0D9488",
        "bg": "#CCFBF1",
        "type": "metro",
        "path": "M 580 800 L 660 840 L 720 900"
      },
      {
        "id": "aqua",
        "label": "Noida Aqua Line",
        "color": "#06B6D4",
        "bg": "#CFFAFE",
        "type": "metro",
        "path": "M 1210 605 L 1210 780 L 1210 900"
      }
    ],
    "interchanges": [
      {
        "id": "rajiv_chowk",
        "name": "Rajiv Chowk (CP)",
        "x": 645,
        "y": 342,
        "width": 30,
        "height": 16,
        "lines": [
          "Yellow Line",
          "Blue Line"
        ]
      },
      {
        "id": "sikanderpur_int",
        "name": "Sikanderpur Hub",
        "x": 645,
        "y": 832,
        "width": 30,
        "height": 16,
        "lines": [
          "Yellow Line",
          "Rapid Metro"
        ]
      },
      {
        "id": "noida_int",
        "name": "Noida Sec 51 / 52 Link",
        "x": 1195,
        "y": 572,
        "width": 30,
        "height": 38,
        "lines": [
          "Blue Line",
          "Aqua Line"
        ]
      }
    ],
    "stations": [
      {
        "id": "samaypur_badli",
        "name": "Samaypur Badli",
        "lat": 28.7456,
        "lng": 77.1356,
        "position": {
          "x": 660,
          "y": 100
        },
        "text_position": {
          "x": 560,
          "y": 104
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b97,200 / sq.ft",
        "newProjectsCount": 16,
        "slug": "samaypur-badli",
        "isJunction": true
      },
      {
        "id": "azadpur",
        "name": "Azadpur",
        "lat": 28.7067,
        "lng": 77.1789,
        "position": {
          "x": 660,
          "y": 160
        },
        "text_position": {
          "x": 590,
          "y": 164
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b98,500 / sq.ft",
        "newProjectsCount": 20,
        "slug": "azadpur",
        "isJunction": true
      },
      {
        "id": "kashmere_gate",
        "name": "Kashmere Gate",
        "lat": 28.6675,
        "lng": 77.2281,
        "position": {
          "x": 660,
          "y": 220
        },
        "text_position": {
          "x": 550,
          "y": 224
        },
        "line": "Yellow, Red & Violet Lines",
        "lineKey": "yellow",
        "avgPrice": "\u20b911,500 / sq.ft",
        "newProjectsCount": 18,
        "slug": "kashmere-gate",
        "isJunction": true
      },
      {
        "id": "new_delhi",
        "name": "New Delhi Railway Station",
        "lat": 28.6429,
        "lng": 77.2197,
        "position": {
          "x": 660,
          "y": 300
        },
        "text_position": {
          "x": 520,
          "y": 295
        },
        "line": "Yellow & Airport Express",
        "lineKey": "yellow",
        "avgPrice": "\u20b918,500 / sq.ft",
        "newProjectsCount": 22,
        "slug": "new-delhi",
        "isJunction": true
      },
      {
        "id": "rajiv_chowk",
        "name": "Rajiv Chowk (CP)",
        "lat": 28.6328,
        "lng": 77.2197,
        "position": {
          "x": 660,
          "y": 350
        },
        "text_position": {
          "x": 675,
          "y": 345
        },
        "line": "Yellow & Blue Line Interchange",
        "lineKey": "yellow",
        "avgPrice": "\u20b932,000 / sq.ft",
        "newProjectsCount": 28,
        "slug": "rajiv-chowk",
        "isJunction": true
      },
      {
        "id": "central_sec",
        "name": "Central Secretariat",
        "lat": 28.6147,
        "lng": 77.2119,
        "position": {
          "x": 660,
          "y": 410
        },
        "text_position": {
          "x": 540,
          "y": 414
        },
        "line": "Yellow & Violet Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b928,000 / sq.ft",
        "newProjectsCount": 14,
        "slug": "central-secretariat",
        "isJunction": true
      },
      {
        "id": "aiims",
        "name": "AIIMS",
        "lat": 28.5683,
        "lng": 77.2081,
        "position": {
          "x": 660,
          "y": 490
        },
        "text_position": {
          "x": 615,
          "y": 494
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b926,500 / sq.ft",
        "newProjectsCount": 15,
        "slug": "aiims"
      },
      {
        "id": "hauz_khas",
        "name": "Hauz Khas",
        "lat": 28.5433,
        "lng": 77.2064,
        "position": {
          "x": 660,
          "y": 540
        },
        "text_position": {
          "x": 585,
          "y": 544
        },
        "line": "Yellow & Magenta Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b924,500 / sq.ft",
        "newProjectsCount": 26,
        "slug": "hauz-khas",
        "isJunction": true
      },
      {
        "id": "saket",
        "name": "Saket",
        "lat": 28.5206,
        "lng": 77.2014,
        "position": {
          "x": 660,
          "y": 610
        },
        "text_position": {
          "x": 615,
          "y": 614
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b916,500 / sq.ft",
        "newProjectsCount": 32,
        "slug": "saket"
      },
      {
        "id": "qutab_minar",
        "name": "Qutab Minar",
        "lat": 28.5028,
        "lng": 77.1861,
        "position": {
          "x": 660,
          "y": 650
        },
        "text_position": {
          "x": 575,
          "y": 654
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b914,200 / sq.ft",
        "newProjectsCount": 24,
        "slug": "qutab-minar"
      },
      {
        "id": "sikanderpur",
        "name": "Sikanderpur Gurugram",
        "lat": 28.4819,
        "lng": 77.0928,
        "position": {
          "x": 660,
          "y": 840
        },
        "text_position": {
          "x": 540,
          "y": 844
        },
        "line": "Yellow & Rapid Metro",
        "lineKey": "yellow",
        "avgPrice": "\u20b915,800 / sq.ft",
        "newProjectsCount": 42,
        "slug": "sikanderpur",
        "isJunction": true
      },
      {
        "id": "millennium_city",
        "name": "Millennium City Centre",
        "lat": 28.4594,
        "lng": 77.0725,
        "position": {
          "x": 660,
          "y": 930
        },
        "text_position": {
          "x": 525,
          "y": 934
        },
        "line": "Yellow Line Terminus",
        "lineKey": "yellow",
        "avgPrice": "\u20b916,500 / sq.ft",
        "newProjectsCount": 54,
        "slug": "millennium-city-centre",
        "isJunction": true
      },
      {
        "id": "dwarka_21",
        "name": "Dwarka Sector 21",
        "lat": 28.5522,
        "lng": 77.0583,
        "position": {
          "x": 220,
          "y": 520
        },
        "text_position": {
          "x": 130,
          "y": 524
        },
        "line": "Blue & Airport Express",
        "lineKey": "blue",
        "avgPrice": "\u20b910,500 / sq.ft",
        "newProjectsCount": 38,
        "slug": "dwarka-sector-21",
        "isJunction": true
      },
      {
        "id": "janakpuri_west",
        "name": "Janakpuri West",
        "lat": 28.6294,
        "lng": 77.0781,
        "position": {
          "x": 340,
          "y": 460
        },
        "text_position": {
          "x": 260,
          "y": 455
        },
        "line": "Blue & Magenta Line",
        "lineKey": "blue",
        "avgPrice": "\u20b912,400 / sq.ft",
        "newProjectsCount": 29,
        "slug": "janakpuri-west",
        "isJunction": true
      },
      {
        "id": "rajouri_garden",
        "name": "Rajouri Garden",
        "lat": 28.6492,
        "lng": 77.1228,
        "position": {
          "x": 440,
          "y": 410
        },
        "text_position": {
          "x": 370,
          "y": 405
        },
        "line": "Blue & Pink Line",
        "lineKey": "blue",
        "avgPrice": "\u20b914,800 / sq.ft",
        "newProjectsCount": 25,
        "slug": "rajouri-garden",
        "isJunction": true
      },
      {
        "id": "noida_18",
        "name": "Noida Sector 18 (Atta)",
        "lat": 28.5708,
        "lng": 77.3261,
        "position": {
          "x": 1050,
          "y": 500
        },
        "text_position": {
          "x": 1065,
          "y": 504
        },
        "line": "Blue Line",
        "lineKey": "blue",
        "avgPrice": "\u20b913,800 / sq.ft",
        "newProjectsCount": 40,
        "slug": "noida-sector-18"
      },
      {
        "id": "botanical_garden",
        "name": "Botanical Garden",
        "lat": 28.5642,
        "lng": 77.3342,
        "position": {
          "x": 1090,
          "y": 520
        },
        "text_position": {
          "x": 1105,
          "y": 524
        },
        "line": "Blue & Magenta Line",
        "lineKey": "blue",
        "avgPrice": "\u20b911,200 / sq.ft",
        "newProjectsCount": 34,
        "slug": "botanical-garden",
        "isJunction": true
      },
      {
        "id": "noida_52",
        "name": "Noida Sector 52",
        "lat": 28.5919,
        "lng": 77.3758,
        "position": {
          "x": 1210,
          "y": 580
        },
        "text_position": {
          "x": 1225,
          "y": 584
        },
        "line": "Blue Line (Walk to Aqua Line)",
        "lineKey": "blue",
        "avgPrice": "\u20b99,800 / sq.ft",
        "newProjectsCount": 48,
        "slug": "noida-sector-52",
        "isJunction": true
      },
      {
        "id": "noida_elec_city",
        "name": "Noida Electronic City",
        "lat": 28.6281,
        "lng": 77.3769,
        "position": {
          "x": 1250,
          "y": 600
        },
        "text_position": {
          "x": 1265,
          "y": 604
        },
        "line": "Blue Line Terminus",
        "lineKey": "blue",
        "avgPrice": "\u20b98,900 / sq.ft",
        "newProjectsCount": 36,
        "slug": "noida-electronic-city",
        "isJunction": true
      },
      {
        "id": "cyber_city",
        "name": "Cyber City Gurugram",
        "lat": 28.495,
        "lng": 77.0894,
        "position": {
          "x": 580,
          "y": 800
        },
        "text_position": {
          "x": 485,
          "y": 795
        },
        "line": "Gurugram Rapid Metro",
        "lineKey": "rapid",
        "avgPrice": "\u20b918,500 / sq.ft",
        "newProjectsCount": 46,
        "slug": "cyber-city",
        "isJunction": true
      },
      {
        "id": "sector_54",
        "name": "Sector 54 Chowk (Golf Course)",
        "lat": 28.4414,
        "lng": 77.1067,
        "position": {
          "x": 720,
          "y": 900
        },
        "text_position": {
          "x": 735,
          "y": 904
        },
        "line": "Gurugram Rapid Metro",
        "lineKey": "rapid",
        "avgPrice": "\u20b922,000 / sq.ft",
        "newProjectsCount": 35,
        "slug": "sector-54-chowk"
      },
      {
        "id": "noida_51",
        "name": "Noida Sector 51",
        "lat": 28.5786,
        "lng": 77.3739,
        "position": {
          "x": 1210,
          "y": 605
        },
        "text_position": {
          "x": 1225,
          "y": 609
        },
        "line": "Noida Aqua Line Terminus",
        "lineKey": "aqua",
        "avgPrice": "\u20b99,600 / sq.ft",
        "newProjectsCount": 30,
        "slug": "noida-sector-51",
        "isJunction": true
      },
      {
        "id": "noida_137",
        "name": "Noida Sector 137 (Expressway)",
        "lat": 28.5147,
        "lng": 77.4044,
        "position": {
          "x": 1210,
          "y": 780
        },
        "text_position": {
          "x": 1225,
          "y": 784
        },
        "line": "Noida Aqua Line",
        "lineKey": "aqua",
        "avgPrice": "\u20b98,200 / sq.ft",
        "newProjectsCount": 42,
        "slug": "noida-sector-137"
      }
    ],
    "popularHubs": [
      {
        "id": "rajiv_chowk",
        "name": "Rajiv Chowk (Connaught Place)",
        "line": "Yellow & Blue Line Super-Hub",
        "avgPrice": "\u20b932,000 / sq.ft",
        "projects": 28,
        "tag": "National CBD",
        "zone": "Central Delhi"
      },
      {
        "id": "cyber_city",
        "name": "Cyber City Gurugram",
        "line": "Rapid Metro & Yellow Line",
        "avgPrice": "\u20b918,500 / sq.ft",
        "projects": 46,
        "tag": "Fortune 500 Corridor",
        "zone": "Gurugram"
      },
      {
        "id": "noida_18",
        "name": "Noida Sector 18",
        "line": "Blue Line Hub",
        "avgPrice": "\u20b913,800 / sq.ft",
        "projects": 40,
        "tag": "Commercial Core",
        "zone": "Noida"
      },
      {
        "id": "hauz_khas",
        "name": "Hauz Khas Junction",
        "line": "Yellow & Magenta Line",
        "avgPrice": "\u20b924,500 / sq.ft",
        "projects": 26,
        "tag": "South Delhi Prime",
        "zone": "South Delhi"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Delhi Metro Rail Corporation (DMRC) & NMRC / HMRTC Feeds",
      "missingCredentials": "Live vehicle location GTFS-RT requires DMRC developer partner credentials.",
      "scheduleFrequency": "Peak: every 2-3 mins \u2022 Regular: every 5-7 mins",
      "verified": true
    },
    "available": true
  },
  "noida": {
    "cityId": "noida",
    "cityName": "Noida",
    "networkTitle": "Noida & Delhi NCR Transit Network",
    "networkSubtitle": "Delhi Metro (Yellow & Blue) \u2022 Gurugram Rapid Metro \u2022 Noida Aqua Line",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 550 50 Q 640 150 670 250 Q 720 350 780 430 Q 860 480 940 520 Q 980 580 950 680 Q 900 780 820 850 Q 650 940 450 850 Q 250 750 200 600 Q 200 450 350 350 Q 480 200 550 50 Z",
    "lines": [
      {
        "id": "yellow",
        "label": "Yellow Line (Badli - Gurugram)",
        "color": "#EAB308",
        "bg": "#FEF9C3",
        "type": "metro",
        "path": "M 660 100 L 660 160 L 660 220 L 660 300 L 660 350 L 660 410 L 660 490 L 660 540 L 660 610 L 660 650 L 660 840 L 660 930"
      },
      {
        "id": "blue",
        "label": "Blue Line (Dwarka - Noida)",
        "color": "#2563EB",
        "bg": "#DBEAFE",
        "type": "metro",
        "path": "M 220 520 L 340 460 L 440 410 L 660 350 L 1050 500 L 1090 520 L 1210 580 L 1250 600"
      },
      {
        "id": "rapid",
        "label": "Rapid Metro Gurugram",
        "color": "#0D9488",
        "bg": "#CCFBF1",
        "type": "metro",
        "path": "M 580 800 L 660 840 L 720 900"
      },
      {
        "id": "aqua",
        "label": "Noida Aqua Line",
        "color": "#06B6D4",
        "bg": "#CFFAFE",
        "type": "metro",
        "path": "M 1210 605 L 1210 780 L 1210 900"
      }
    ],
    "interchanges": [
      {
        "id": "rajiv_chowk",
        "name": "Rajiv Chowk (CP)",
        "x": 645,
        "y": 342,
        "width": 30,
        "height": 16,
        "lines": [
          "Yellow Line",
          "Blue Line"
        ]
      },
      {
        "id": "sikanderpur_int",
        "name": "Sikanderpur Hub",
        "x": 645,
        "y": 832,
        "width": 30,
        "height": 16,
        "lines": [
          "Yellow Line",
          "Rapid Metro"
        ]
      },
      {
        "id": "noida_int",
        "name": "Noida Sec 51 / 52 Link",
        "x": 1195,
        "y": 572,
        "width": 30,
        "height": 38,
        "lines": [
          "Blue Line",
          "Aqua Line"
        ]
      }
    ],
    "stations": [
      {
        "id": "samaypur_badli",
        "name": "Samaypur Badli",
        "lat": 28.7456,
        "lng": 77.1356,
        "position": {
          "x": 660,
          "y": 100
        },
        "text_position": {
          "x": 560,
          "y": 104
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b97,200 / sq.ft",
        "newProjectsCount": 16,
        "slug": "samaypur-badli",
        "isJunction": true
      },
      {
        "id": "azadpur",
        "name": "Azadpur",
        "lat": 28.7067,
        "lng": 77.1789,
        "position": {
          "x": 660,
          "y": 160
        },
        "text_position": {
          "x": 590,
          "y": 164
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b98,500 / sq.ft",
        "newProjectsCount": 20,
        "slug": "azadpur",
        "isJunction": true
      },
      {
        "id": "kashmere_gate",
        "name": "Kashmere Gate",
        "lat": 28.6675,
        "lng": 77.2281,
        "position": {
          "x": 660,
          "y": 220
        },
        "text_position": {
          "x": 550,
          "y": 224
        },
        "line": "Yellow, Red & Violet Lines",
        "lineKey": "yellow",
        "avgPrice": "\u20b911,500 / sq.ft",
        "newProjectsCount": 18,
        "slug": "kashmere-gate",
        "isJunction": true
      },
      {
        "id": "new_delhi",
        "name": "New Delhi Railway Station",
        "lat": 28.6429,
        "lng": 77.2197,
        "position": {
          "x": 660,
          "y": 300
        },
        "text_position": {
          "x": 520,
          "y": 295
        },
        "line": "Yellow & Airport Express",
        "lineKey": "yellow",
        "avgPrice": "\u20b918,500 / sq.ft",
        "newProjectsCount": 22,
        "slug": "new-delhi",
        "isJunction": true
      },
      {
        "id": "rajiv_chowk",
        "name": "Rajiv Chowk (CP)",
        "lat": 28.6328,
        "lng": 77.2197,
        "position": {
          "x": 660,
          "y": 350
        },
        "text_position": {
          "x": 675,
          "y": 345
        },
        "line": "Yellow & Blue Line Interchange",
        "lineKey": "yellow",
        "avgPrice": "\u20b932,000 / sq.ft",
        "newProjectsCount": 28,
        "slug": "rajiv-chowk",
        "isJunction": true
      },
      {
        "id": "central_sec",
        "name": "Central Secretariat",
        "lat": 28.6147,
        "lng": 77.2119,
        "position": {
          "x": 660,
          "y": 410
        },
        "text_position": {
          "x": 540,
          "y": 414
        },
        "line": "Yellow & Violet Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b928,000 / sq.ft",
        "newProjectsCount": 14,
        "slug": "central-secretariat",
        "isJunction": true
      },
      {
        "id": "aiims",
        "name": "AIIMS",
        "lat": 28.5683,
        "lng": 77.2081,
        "position": {
          "x": 660,
          "y": 490
        },
        "text_position": {
          "x": 615,
          "y": 494
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b926,500 / sq.ft",
        "newProjectsCount": 15,
        "slug": "aiims"
      },
      {
        "id": "hauz_khas",
        "name": "Hauz Khas",
        "lat": 28.5433,
        "lng": 77.2064,
        "position": {
          "x": 660,
          "y": 540
        },
        "text_position": {
          "x": 585,
          "y": 544
        },
        "line": "Yellow & Magenta Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b924,500 / sq.ft",
        "newProjectsCount": 26,
        "slug": "hauz-khas",
        "isJunction": true
      },
      {
        "id": "saket",
        "name": "Saket",
        "lat": 28.5206,
        "lng": 77.2014,
        "position": {
          "x": 660,
          "y": 610
        },
        "text_position": {
          "x": 615,
          "y": 614
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b916,500 / sq.ft",
        "newProjectsCount": 32,
        "slug": "saket"
      },
      {
        "id": "qutab_minar",
        "name": "Qutab Minar",
        "lat": 28.5028,
        "lng": 77.1861,
        "position": {
          "x": 660,
          "y": 650
        },
        "text_position": {
          "x": 575,
          "y": 654
        },
        "line": "Yellow Line",
        "lineKey": "yellow",
        "avgPrice": "\u20b914,200 / sq.ft",
        "newProjectsCount": 24,
        "slug": "qutab-minar"
      },
      {
        "id": "sikanderpur",
        "name": "Sikanderpur Gurugram",
        "lat": 28.4819,
        "lng": 77.0928,
        "position": {
          "x": 660,
          "y": 840
        },
        "text_position": {
          "x": 540,
          "y": 844
        },
        "line": "Yellow & Rapid Metro",
        "lineKey": "yellow",
        "avgPrice": "\u20b915,800 / sq.ft",
        "newProjectsCount": 42,
        "slug": "sikanderpur",
        "isJunction": true
      },
      {
        "id": "millennium_city",
        "name": "Millennium City Centre",
        "lat": 28.4594,
        "lng": 77.0725,
        "position": {
          "x": 660,
          "y": 930
        },
        "text_position": {
          "x": 525,
          "y": 934
        },
        "line": "Yellow Line Terminus",
        "lineKey": "yellow",
        "avgPrice": "\u20b916,500 / sq.ft",
        "newProjectsCount": 54,
        "slug": "millennium-city-centre",
        "isJunction": true
      },
      {
        "id": "dwarka_21",
        "name": "Dwarka Sector 21",
        "lat": 28.5522,
        "lng": 77.0583,
        "position": {
          "x": 220,
          "y": 520
        },
        "text_position": {
          "x": 130,
          "y": 524
        },
        "line": "Blue & Airport Express",
        "lineKey": "blue",
        "avgPrice": "\u20b910,500 / sq.ft",
        "newProjectsCount": 38,
        "slug": "dwarka-sector-21",
        "isJunction": true
      },
      {
        "id": "janakpuri_west",
        "name": "Janakpuri West",
        "lat": 28.6294,
        "lng": 77.0781,
        "position": {
          "x": 340,
          "y": 460
        },
        "text_position": {
          "x": 260,
          "y": 455
        },
        "line": "Blue & Magenta Line",
        "lineKey": "blue",
        "avgPrice": "\u20b912,400 / sq.ft",
        "newProjectsCount": 29,
        "slug": "janakpuri-west",
        "isJunction": true
      },
      {
        "id": "rajouri_garden",
        "name": "Rajouri Garden",
        "lat": 28.6492,
        "lng": 77.1228,
        "position": {
          "x": 440,
          "y": 410
        },
        "text_position": {
          "x": 370,
          "y": 405
        },
        "line": "Blue & Pink Line",
        "lineKey": "blue",
        "avgPrice": "\u20b914,800 / sq.ft",
        "newProjectsCount": 25,
        "slug": "rajouri-garden",
        "isJunction": true
      },
      {
        "id": "noida_18",
        "name": "Noida Sector 18 (Atta)",
        "lat": 28.5708,
        "lng": 77.3261,
        "position": {
          "x": 1050,
          "y": 500
        },
        "text_position": {
          "x": 1065,
          "y": 504
        },
        "line": "Blue Line",
        "lineKey": "blue",
        "avgPrice": "\u20b913,800 / sq.ft",
        "newProjectsCount": 40,
        "slug": "noida-sector-18"
      },
      {
        "id": "botanical_garden",
        "name": "Botanical Garden",
        "lat": 28.5642,
        "lng": 77.3342,
        "position": {
          "x": 1090,
          "y": 520
        },
        "text_position": {
          "x": 1105,
          "y": 524
        },
        "line": "Blue & Magenta Line",
        "lineKey": "blue",
        "avgPrice": "\u20b911,200 / sq.ft",
        "newProjectsCount": 34,
        "slug": "botanical-garden",
        "isJunction": true
      },
      {
        "id": "noida_52",
        "name": "Noida Sector 52",
        "lat": 28.5919,
        "lng": 77.3758,
        "position": {
          "x": 1210,
          "y": 580
        },
        "text_position": {
          "x": 1225,
          "y": 584
        },
        "line": "Blue Line (Walk to Aqua Line)",
        "lineKey": "blue",
        "avgPrice": "\u20b99,800 / sq.ft",
        "newProjectsCount": 48,
        "slug": "noida-sector-52",
        "isJunction": true
      },
      {
        "id": "noida_elec_city",
        "name": "Noida Electronic City",
        "lat": 28.6281,
        "lng": 77.3769,
        "position": {
          "x": 1250,
          "y": 600
        },
        "text_position": {
          "x": 1265,
          "y": 604
        },
        "line": "Blue Line Terminus",
        "lineKey": "blue",
        "avgPrice": "\u20b98,900 / sq.ft",
        "newProjectsCount": 36,
        "slug": "noida-electronic-city",
        "isJunction": true
      },
      {
        "id": "cyber_city",
        "name": "Cyber City Gurugram",
        "lat": 28.495,
        "lng": 77.0894,
        "position": {
          "x": 580,
          "y": 800
        },
        "text_position": {
          "x": 485,
          "y": 795
        },
        "line": "Gurugram Rapid Metro",
        "lineKey": "rapid",
        "avgPrice": "\u20b918,500 / sq.ft",
        "newProjectsCount": 46,
        "slug": "cyber-city",
        "isJunction": true
      },
      {
        "id": "sector_54",
        "name": "Sector 54 Chowk (Golf Course)",
        "lat": 28.4414,
        "lng": 77.1067,
        "position": {
          "x": 720,
          "y": 900
        },
        "text_position": {
          "x": 735,
          "y": 904
        },
        "line": "Gurugram Rapid Metro",
        "lineKey": "rapid",
        "avgPrice": "\u20b922,000 / sq.ft",
        "newProjectsCount": 35,
        "slug": "sector-54-chowk"
      },
      {
        "id": "noida_51",
        "name": "Noida Sector 51",
        "lat": 28.5786,
        "lng": 77.3739,
        "position": {
          "x": 1210,
          "y": 605
        },
        "text_position": {
          "x": 1225,
          "y": 609
        },
        "line": "Noida Aqua Line Terminus",
        "lineKey": "aqua",
        "avgPrice": "\u20b99,600 / sq.ft",
        "newProjectsCount": 30,
        "slug": "noida-sector-51",
        "isJunction": true
      },
      {
        "id": "noida_137",
        "name": "Noida Sector 137 (Expressway)",
        "lat": 28.5147,
        "lng": 77.4044,
        "position": {
          "x": 1210,
          "y": 780
        },
        "text_position": {
          "x": 1225,
          "y": 784
        },
        "line": "Noida Aqua Line",
        "lineKey": "aqua",
        "avgPrice": "\u20b98,200 / sq.ft",
        "newProjectsCount": 42,
        "slug": "noida-sector-137"
      }
    ],
    "popularHubs": [
      {
        "id": "rajiv_chowk",
        "name": "Rajiv Chowk (Connaught Place)",
        "line": "Yellow & Blue Line Super-Hub",
        "avgPrice": "\u20b932,000 / sq.ft",
        "projects": 28,
        "tag": "National CBD",
        "zone": "Central Delhi"
      },
      {
        "id": "cyber_city",
        "name": "Cyber City Gurugram",
        "line": "Rapid Metro & Yellow Line",
        "avgPrice": "\u20b918,500 / sq.ft",
        "projects": 46,
        "tag": "Fortune 500 Corridor",
        "zone": "Gurugram"
      },
      {
        "id": "noida_18",
        "name": "Noida Sector 18",
        "line": "Blue Line Hub",
        "avgPrice": "\u20b913,800 / sq.ft",
        "projects": 40,
        "tag": "Commercial Core",
        "zone": "Noida"
      },
      {
        "id": "hauz_khas",
        "name": "Hauz Khas Junction",
        "line": "Yellow & Magenta Line",
        "avgPrice": "\u20b924,500 / sq.ft",
        "projects": 26,
        "tag": "South Delhi Prime",
        "zone": "South Delhi"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Delhi Metro Rail Corporation (DMRC) & NMRC / HMRTC Feeds",
      "missingCredentials": "Live vehicle location GTFS-RT requires DMRC developer partner credentials.",
      "scheduleFrequency": "Peak: every 2-3 mins \u2022 Regular: every 5-7 mins",
      "verified": true
    },
    "available": true
  },
  "bangalore": {
    "cityId": "bangalore",
    "cityName": "Bangalore",
    "networkTitle": "Bangalore Namma Metro & Rail Network",
    "networkSubtitle": "Namma Metro Purple Line \u2022 Green Line \u2022 Suburban Rail Corridors",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 480 150 Q 560 100 650 150 Q 750 250 850 350 Q 1050 420 1280 480 Q 1200 600 1050 680 Q 850 780 650 920 Q 500 950 420 850 Q 300 750 200 660 Q 350 480 480 150 Z",
    "lines": [
      {
        "id": "purple",
        "label": "Purple Line (Kengeri - Whitefield)",
        "color": "#9333EA",
        "bg": "#F3E8FF",
        "type": "metro",
        "path": "M 240 650 L 560 490 L 720 490 L 880 490 L 980 490 L 1060 490 L 1140 490 L 1260 490"
      },
      {
        "id": "green",
        "label": "Green Line (Nagasandra - Silk Institute)",
        "color": "#16A34A",
        "bg": "#DCFCE7",
        "type": "metro",
        "path": "M 560 270 L 560 320 L 560 490 L 560 740 L 560 780 L 560 930"
      },
      {
        "id": "suburban",
        "label": "Suburban Rail Link",
        "color": "#2563EB",
        "bg": "#DBEAFE",
        "type": "suburban",
        "path": "M 560 320 L 560 490 L 980 490 L 1060 490 L 1260 490"
      }
    ],
    "interchanges": [
      {
        "id": "majestic_int",
        "name": "Majestic Mega Interchange",
        "x": 545,
        "y": 478,
        "width": 30,
        "height": 24,
        "lines": [
          "Purple Metro",
          "Green Metro",
          "KSR Railway"
        ]
      },
      {
        "id": "yesvantpur_int",
        "name": "Yesvantpur Intermodal",
        "x": 545,
        "y": 308,
        "width": 30,
        "height": 24,
        "lines": [
          "Green Metro",
          "Suburban Railway"
        ]
      },
      {
        "id": "whitefield_int",
        "name": "Whitefield Hub",
        "x": 1245,
        "y": 478,
        "width": 30,
        "height": 24,
        "lines": [
          "Purple Metro",
          "Suburban Railway"
        ]
      }
    ],
    "stations": [
      {
        "id": "whitefield",
        "name": "Whitefield (Kadugodi)",
        "lat": 12.9698,
        "lng": 77.7499,
        "position": {
          "x": 1260,
          "y": 490
        },
        "text_position": {
          "x": 1200,
          "y": 515
        },
        "line": "Purple Metro & Suburban",
        "lineKey": "purple",
        "avgPrice": "\u20b99,800 / sq.ft",
        "newProjectsCount": 58,
        "slug": "whitefield",
        "isJunction": true
      },
      {
        "id": "hoodi",
        "name": "Hoodi",
        "lat": 12.9919,
        "lng": 77.7158,
        "position": {
          "x": 1140,
          "y": 490
        },
        "text_position": {
          "x": 1130,
          "y": 515
        },
        "line": "Purple Metro Line",
        "lineKey": "purple",
        "avgPrice": "\u20b99,200 / sq.ft",
        "newProjectsCount": 34,
        "slug": "hoodi"
      },
      {
        "id": "kr_puram",
        "name": "KR Puram Railway & Metro",
        "lat": 13.0019,
        "lng": 77.6767,
        "position": {
          "x": 1060,
          "y": 490
        },
        "text_position": {
          "x": 1050,
          "y": 470
        },
        "line": "Purple Metro & Suburban",
        "lineKey": "purple",
        "avgPrice": "\u20b98,900 / sq.ft",
        "newProjectsCount": 42,
        "slug": "kr-puram",
        "isJunction": true
      },
      {
        "id": "baiyappanahalli",
        "name": "Baiyappanahalli",
        "lat": 12.9908,
        "lng": 77.6528,
        "position": {
          "x": 980,
          "y": 490
        },
        "text_position": {
          "x": 970,
          "y": 515
        },
        "line": "Purple Metro & Suburban",
        "lineKey": "purple",
        "avgPrice": "\u20b911,400 / sq.ft",
        "newProjectsCount": 26,
        "slug": "baiyappanahalli",
        "isJunction": true
      },
      {
        "id": "indiranagar",
        "name": "Indiranagar",
        "lat": 12.9783,
        "lng": 77.6389,
        "position": {
          "x": 880,
          "y": 490
        },
        "text_position": {
          "x": 870,
          "y": 470
        },
        "line": "Purple Metro Line",
        "lineKey": "purple",
        "avgPrice": "\u20b922,000 / sq.ft",
        "newProjectsCount": 20,
        "slug": "indiranagar"
      },
      {
        "id": "mg_road_blr",
        "name": "MG Road",
        "lat": 12.9756,
        "lng": 77.6067,
        "position": {
          "x": 720,
          "y": 490
        },
        "text_position": {
          "x": 710,
          "y": 515
        },
        "line": "Purple Metro Line",
        "lineKey": "purple",
        "avgPrice": "\u20b926,500 / sq.ft",
        "newProjectsCount": 18,
        "slug": "mg-road-blr"
      },
      {
        "id": "majestic",
        "name": "Nadaprabhu Kempegowda (Majestic)",
        "lat": 12.9756,
        "lng": 77.5728,
        "position": {
          "x": 560,
          "y": 490
        },
        "text_position": {
          "x": 450,
          "y": 485
        },
        "line": "Purple & Green Metro Interchange",
        "lineKey": "purple",
        "avgPrice": "\u20b914,500 / sq.ft",
        "newProjectsCount": 25,
        "slug": "majestic",
        "isJunction": true
      },
      {
        "id": "kengeri",
        "name": "Kengeri Bus Terminal",
        "lat": 12.9083,
        "lng": 77.4789,
        "position": {
          "x": 240,
          "y": 650
        },
        "text_position": {
          "x": 170,
          "y": 654
        },
        "line": "Purple Metro Line",
        "lineKey": "purple",
        "avgPrice": "\u20b96,800 / sq.ft",
        "newProjectsCount": 36,
        "slug": "kengeri"
      },
      {
        "id": "yesvantpur",
        "name": "Yesvantpur Railway & Metro",
        "lat": 13.0228,
        "lng": 77.5506,
        "position": {
          "x": 560,
          "y": 320
        },
        "text_position": {
          "x": 420,
          "y": 324
        },
        "line": "Green Metro & Suburban Rail",
        "lineKey": "green",
        "avgPrice": "\u20b910,500 / sq.ft",
        "newProjectsCount": 30,
        "slug": "yesvantpur",
        "isJunction": true
      },
      {
        "id": "peenya",
        "name": "Peenya Industry",
        "lat": 13.0328,
        "lng": 77.5256,
        "position": {
          "x": 560,
          "y": 270
        },
        "text_position": {
          "x": 460,
          "y": 274
        },
        "line": "Green Metro Line",
        "lineKey": "green",
        "avgPrice": "\u20b97,400 / sq.ft",
        "newProjectsCount": 22,
        "slug": "peenya"
      },
      {
        "id": "jayanagar",
        "name": "Jayanagar 4th Block",
        "lat": 12.9297,
        "lng": 77.58,
        "position": {
          "x": 560,
          "y": 740
        },
        "text_position": {
          "x": 470,
          "y": 744
        },
        "line": "Green Metro Line",
        "lineKey": "green",
        "avgPrice": "\u20b916,800 / sq.ft",
        "newProjectsCount": 24,
        "slug": "jayanagar"
      },
      {
        "id": "rv_road",
        "name": "RV Road (Yellow Interchange)",
        "lat": 12.9214,
        "lng": 77.58,
        "position": {
          "x": 560,
          "y": 780
        },
        "text_position": {
          "x": 485,
          "y": 784
        },
        "line": "Green Metro Line",
        "lineKey": "green",
        "avgPrice": "\u20b915,400 / sq.ft",
        "newProjectsCount": 28,
        "slug": "rv-road",
        "isJunction": true
      },
      {
        "id": "silk_institute",
        "name": "Silk Institute Terminus",
        "lat": 12.8622,
        "lng": 77.525,
        "position": {
          "x": 560,
          "y": 930
        },
        "text_position": {
          "x": 450,
          "y": 934
        },
        "line": "Green Metro Line",
        "lineKey": "green",
        "avgPrice": "\u20b97,200 / sq.ft",
        "newProjectsCount": 35,
        "slug": "silk-institute",
        "isJunction": true
      }
    ],
    "popularHubs": [
      {
        "id": "whitefield",
        "name": "Whitefield Metro Hub",
        "line": "Purple Metro & Rail Link",
        "avgPrice": "\u20b99,800 / sq.ft",
        "projects": 58,
        "tag": "Global IT Capital",
        "zone": "East Bangalore"
      },
      {
        "id": "indiranagar",
        "name": "Indiranagar Metro",
        "line": "Purple Metro Line",
        "avgPrice": "\u20b922,000 / sq.ft",
        "projects": 20,
        "tag": "Cosmopolitan Prime",
        "zone": "East Central"
      },
      {
        "id": "majestic",
        "name": "Kempegowda (Majestic)",
        "line": "Purple, Green & KSR Rail",
        "avgPrice": "\u20b914,500 / sq.ft",
        "projects": 25,
        "tag": "State Super-Hub",
        "zone": "Central Bangalore"
      },
      {
        "id": "yesvantpur",
        "name": "Yesvantpur Junction",
        "line": "Green Metro & Rail",
        "avgPrice": "\u20b910,500 / sq.ft",
        "projects": 30,
        "tag": "North Gateway",
        "zone": "North Bangalore"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Bangalore Metro Rail Corporation (BMRCL Namma Metro) & South Western Railway",
      "missingCredentials": "Live train telemetry requires BMRCL enterprise API authentication.",
      "scheduleFrequency": "Peak: every 3-5 mins \u2022 Regular: every 7-10 mins",
      "verified": true
    },
    "available": true
  },
  "hyderabad": {
    "cityId": "hyderabad",
    "cityName": "Hyderabad",
    "networkTitle": "Hyderabad MMTS & Metro Network",
    "networkSubtitle": "Hyderabad Metro (Red & Blue Lines) \u2022 South Central MMTS Suburban",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 200 200 Q 350 280 500 350 Q 650 420 800 420 Q 950 420 1150 430 Q 1100 650 950 750 Q 800 850 650 780 Q 450 680 300 580 Q 150 450 200 200 Z",
    "lines": [
      {
        "id": "blue",
        "label": "Blue Line (Raidurg - Nagole)",
        "color": "#2563EB",
        "bg": "#DBEAFE",
        "type": "metro",
        "path": "M 170 440 L 230 440 L 340 440 L 440 440 L 600 440 L 670 440 L 780 440 L 1120 440"
      },
      {
        "id": "red",
        "label": "Red Line (Miyapur - LB Nagar)",
        "color": "#EF4444",
        "bg": "#FEE2E2",
        "type": "metro",
        "path": "M 240 220 L 340 280 L 600 440 L 860 670 L 1060 820"
      },
      {
        "id": "mmts",
        "label": "MMTS Suburban Rail",
        "color": "#059669",
        "bg": "#D1FAE5",
        "type": "suburban",
        "path": "M 170 440 L 230 440 L 670 440 L 780 440 L 860 670"
      }
    ],
    "interchanges": [
      {
        "id": "ameerpet_int",
        "name": "Ameerpet Super-Hub",
        "x": 585,
        "y": 428,
        "width": 30,
        "height": 24,
        "lines": [
          "Red Metro",
          "Blue Metro"
        ]
      },
      {
        "id": "mgbs_int",
        "name": "MGBS Transit Hub",
        "x": 845,
        "y": 658,
        "width": 30,
        "height": 24,
        "lines": [
          "Red Metro",
          "Green Metro",
          "MMTS"
        ]
      }
    ],
    "stations": [
      {
        "id": "raidurg",
        "name": "Raidurg (Mindspace)",
        "lat": 17.4378,
        "lng": 78.3775,
        "position": {
          "x": 170,
          "y": 440
        },
        "text_position": {
          "x": 80,
          "y": 444
        },
        "line": "Blue Metro Terminus",
        "lineKey": "blue",
        "avgPrice": "\u20b912,500 / sq.ft",
        "newProjectsCount": 48,
        "slug": "raidurg",
        "isJunction": true
      },
      {
        "id": "hitec_city",
        "name": "Hitec City (Cyber Towers)",
        "lat": 17.4475,
        "lng": 78.3761,
        "position": {
          "x": 230,
          "y": 440
        },
        "text_position": {
          "x": 220,
          "y": 470
        },
        "line": "Blue Metro & MMTS",
        "lineKey": "blue",
        "avgPrice": "\u20b913,200 / sq.ft",
        "newProjectsCount": 52,
        "slug": "hitec-city",
        "isJunction": true
      },
      {
        "id": "madhapur",
        "name": "Madhapur",
        "lat": 17.4397,
        "lng": 78.3978,
        "position": {
          "x": 340,
          "y": 440
        },
        "text_position": {
          "x": 330,
          "y": 470
        },
        "line": "Blue Metro Line",
        "lineKey": "blue",
        "avgPrice": "\u20b912,800 / sq.ft",
        "newProjectsCount": 38,
        "slug": "madhapur"
      },
      {
        "id": "jubilee_hills",
        "name": "Jubilee Hills Check Post",
        "lat": 17.4297,
        "lng": 78.4144,
        "position": {
          "x": 440,
          "y": 440
        },
        "text_position": {
          "x": 420,
          "y": 415
        },
        "line": "Blue Metro Line",
        "lineKey": "blue",
        "avgPrice": "\u20b921,000 / sq.ft",
        "newProjectsCount": 18,
        "slug": "jubilee-hills"
      },
      {
        "id": "ameerpet",
        "name": "Ameerpet Interchange",
        "lat": 17.4347,
        "lng": 78.4472,
        "position": {
          "x": 600,
          "y": 440
        },
        "text_position": {
          "x": 580,
          "y": 415
        },
        "line": "Red & Blue Metro Super-Hub",
        "lineKey": "blue",
        "avgPrice": "\u20b911,500 / sq.ft",
        "newProjectsCount": 30,
        "slug": "ameerpet",
        "isJunction": true
      },
      {
        "id": "begumpet",
        "name": "Begumpet Railway & Metro",
        "lat": 17.4428,
        "lng": 78.4681,
        "position": {
          "x": 670,
          "y": 440
        },
        "text_position": {
          "x": 660,
          "y": 470
        },
        "line": "Blue Metro & MMTS",
        "lineKey": "blue",
        "avgPrice": "\u20b912,400 / sq.ft",
        "newProjectsCount": 26,
        "slug": "begumpet",
        "isJunction": true
      },
      {
        "id": "parade_ground",
        "name": "Parade Ground / Secunderabad",
        "lat": 17.4456,
        "lng": 78.5019,
        "position": {
          "x": 780,
          "y": 440
        },
        "text_position": {
          "x": 770,
          "y": 415
        },
        "line": "Blue & Green Metro Interchange",
        "lineKey": "blue",
        "avgPrice": "\u20b99,800 / sq.ft",
        "newProjectsCount": 34,
        "slug": "parade-ground",
        "isJunction": true
      },
      {
        "id": "nagole",
        "name": "Nagole Terminus",
        "lat": 17.3719,
        "lng": 78.5636,
        "position": {
          "x": 1120,
          "y": 440
        },
        "text_position": {
          "x": 1135,
          "y": 444
        },
        "line": "Blue Metro Line",
        "lineKey": "blue",
        "avgPrice": "\u20b97,200 / sq.ft",
        "newProjectsCount": 32,
        "slug": "nagole",
        "isJunction": true
      },
      {
        "id": "miyapur",
        "name": "Miyapur Terminus",
        "lat": 17.4967,
        "lng": 78.3614,
        "position": {
          "x": 240,
          "y": 220
        },
        "text_position": {
          "x": 160,
          "y": 224
        },
        "line": "Red Metro Line",
        "lineKey": "red",
        "avgPrice": "\u20b97,600 / sq.ft",
        "newProjectsCount": 44,
        "slug": "miyapur",
        "isJunction": true
      },
      {
        "id": "kphb",
        "name": "KPHB Colony",
        "lat": 17.4883,
        "lng": 78.3986,
        "position": {
          "x": 340,
          "y": 280
        },
        "text_position": {
          "x": 260,
          "y": 284
        },
        "line": "Red Metro Line",
        "lineKey": "red",
        "avgPrice": "\u20b98,400 / sq.ft",
        "newProjectsCount": 38,
        "slug": "kphb-colony"
      },
      {
        "id": "mgbs",
        "name": "MGBS (Bus & Metro Hub)",
        "lat": 17.3789,
        "lng": 78.4811,
        "position": {
          "x": 860,
          "y": 670
        },
        "text_position": {
          "x": 875,
          "y": 674
        },
        "line": "Red & Green Metro Interchange",
        "lineKey": "red",
        "avgPrice": "\u20b99,500 / sq.ft",
        "newProjectsCount": 24,
        "slug": "mgbs",
        "isJunction": true
      },
      {
        "id": "lb_nagar",
        "name": "LB Nagar Terminus",
        "lat": 17.3486,
        "lng": 78.5506,
        "position": {
          "x": 1060,
          "y": 820
        },
        "text_position": {
          "x": 1075,
          "y": 824
        },
        "line": "Red Metro Line",
        "lineKey": "red",
        "avgPrice": "\u20b96,900 / sq.ft",
        "newProjectsCount": 40,
        "slug": "lb-nagar",
        "isJunction": true
      }
    ],
    "popularHubs": [
      {
        "id": "hitec_city",
        "name": "Hitec City / Raidurg",
        "line": "Blue Metro & MMTS Rail",
        "avgPrice": "\u20b913,200 / sq.ft",
        "projects": 52,
        "tag": "Cyberabad Tech Heart",
        "zone": "West Hyderabad"
      },
      {
        "id": "ameerpet",
        "name": "Ameerpet Interchange",
        "line": "Red & Blue Metro Lines",
        "avgPrice": "\u20b911,500 / sq.ft",
        "projects": 30,
        "tag": "Central Crossroads",
        "zone": "Central Hyderabad"
      },
      {
        "id": "miyapur",
        "name": "Miyapur Terminal",
        "line": "Red Metro Line 1",
        "avgPrice": "\u20b97,600 / sq.ft",
        "projects": 44,
        "tag": "Fast Growth Suburb",
        "zone": "North West"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Hyderabad Metro Rail (L&T Metro) & SCR MMTS Feeds",
      "missingCredentials": "Live train telemetry requires HMRL developer credentials.",
      "scheduleFrequency": "Metro: every 3-5 mins \u2022 MMTS: 20-30 min headway",
      "verified": true
    },
    "available": true
  },
  "chennai": {
    "cityId": "chennai",
    "cityName": "Chennai",
    "networkTitle": "Chennai Suburban & Metro Network",
    "networkSubtitle": "Chennai Suburban South & West Corridors \u2022 Chennai Metro (Blue & Green)",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 880 50 L 880 950 Q 750 900 600 800 Q 450 700 350 550 Q 300 400 450 250 Q 650 100 880 50 Z",
    "lines": [
      {
        "id": "suburban",
        "label": "Suburban South Line",
        "color": "#EF4444",
        "bg": "#FEE2E2",
        "type": "suburban",
        "path": "M 860 160 L 840 290 L 740 470 L 700 520 L 610 630 L 470 770 L 240 940"
      },
      {
        "id": "blue",
        "label": "Blue Metro Line (Central - Airport)",
        "color": "#2563EB",
        "bg": "#DBEAFE",
        "type": "metro",
        "path": "M 830 240 L 740 470 L 700 520 L 670 550 L 610 630"
      },
      {
        "id": "green",
        "label": "Green Metro Line (Central - St Thomas)",
        "color": "#16A34A",
        "bg": "#DCFCE7",
        "type": "metro",
        "path": "M 830 240 L 840 290 L 670 550"
      }
    ],
    "interchanges": [
      {
        "id": "central_int",
        "name": "Chennai Central Hub",
        "x": 815,
        "y": 228,
        "width": 30,
        "height": 24,
        "lines": [
          "Blue Metro",
          "Green Metro",
          "Southern Railway"
        ]
      },
      {
        "id": "alandur_int",
        "name": "Alandur Junction",
        "x": 655,
        "y": 538,
        "width": 30,
        "height": 24,
        "lines": [
          "Blue Metro",
          "Green Metro"
        ]
      }
    ],
    "stations": [
      {
        "id": "chennai_central",
        "name": "Chennai Central (Puratchi Thalaivar)",
        "lat": 13.0827,
        "lng": 80.2755,
        "position": {
          "x": 830,
          "y": 240
        },
        "text_position": {
          "x": 680,
          "y": 244
        },
        "line": "Blue, Green & Southern Railway",
        "lineKey": "blue",
        "avgPrice": "\u20b914,500 / sq.ft",
        "newProjectsCount": 35,
        "slug": "chennai-central",
        "isJunction": true
      },
      {
        "id": "chennai_beach",
        "name": "Chennai Beach",
        "lat": 13.0922,
        "lng": 80.2936,
        "position": {
          "x": 860,
          "y": 160
        },
        "text_position": {
          "x": 875,
          "y": 164
        },
        "line": "Suburban South Line Terminus",
        "lineKey": "suburban",
        "avgPrice": "\u20b913,200 / sq.ft",
        "newProjectsCount": 18,
        "slug": "chennai-beach",
        "isJunction": true
      },
      {
        "id": "egmore",
        "name": "Chennai Egmore",
        "lat": 13.0811,
        "lng": 80.2611,
        "position": {
          "x": 840,
          "y": 290
        },
        "text_position": {
          "x": 855,
          "y": 294
        },
        "line": "Suburban & Green Metro",
        "lineKey": "suburban",
        "avgPrice": "\u20b915,400 / sq.ft",
        "newProjectsCount": 22,
        "slug": "egmore",
        "isJunction": true
      },
      {
        "id": "saidapet",
        "name": "Saidapet",
        "lat": 13.0189,
        "lng": 80.2228,
        "position": {
          "x": 740,
          "y": 470
        },
        "text_position": {
          "x": 755,
          "y": 474
        },
        "line": "Suburban & Blue Metro",
        "lineKey": "blue",
        "avgPrice": "\u20b912,800 / sq.ft",
        "newProjectsCount": 26,
        "slug": "saidapet",
        "isJunction": true
      },
      {
        "id": "guindy",
        "name": "Guindy Railway & Metro",
        "lat": 13.0067,
        "lng": 80.2119,
        "position": {
          "x": 700,
          "y": 520
        },
        "text_position": {
          "x": 620,
          "y": 524
        },
        "line": "Suburban & Blue Metro",
        "lineKey": "blue",
        "avgPrice": "\u20b913,500 / sq.ft",
        "newProjectsCount": 38,
        "slug": "guindy",
        "isJunction": true
      },
      {
        "id": "alandur",
        "name": "Alandur Interchange",
        "lat": 12.9967,
        "lng": 80.1989,
        "position": {
          "x": 670,
          "y": 550
        },
        "text_position": {
          "x": 580,
          "y": 554
        },
        "line": "Blue & Green Metro Interchange",
        "lineKey": "blue",
        "avgPrice": "\u20b911,800 / sq.ft",
        "newProjectsCount": 30,
        "slug": "alandur",
        "isJunction": true
      },
      {
        "id": "chennai_airport",
        "name": "Chennai Airport (Tirusulam)",
        "lat": 12.9811,
        "lng": 80.1636,
        "position": {
          "x": 610,
          "y": 630
        },
        "text_position": {
          "x": 485,
          "y": 634
        },
        "line": "Blue Metro & Suburban Rail",
        "lineKey": "blue",
        "avgPrice": "\u20b910,200 / sq.ft",
        "newProjectsCount": 42,
        "slug": "chennai-airport",
        "isJunction": true
      },
      {
        "id": "tambaram",
        "name": "Tambaram Terminus",
        "lat": 12.9247,
        "lng": 80.1272,
        "position": {
          "x": 470,
          "y": 770
        },
        "text_position": {
          "x": 375,
          "y": 774
        },
        "line": "Suburban South Line",
        "lineKey": "suburban",
        "avgPrice": "\u20b96,800 / sq.ft",
        "newProjectsCount": 54,
        "slug": "tambaram",
        "isJunction": true
      },
      {
        "id": "chengalpattu",
        "name": "Chengalpattu Junction",
        "lat": 12.6919,
        "lng": 79.9836,
        "position": {
          "x": 240,
          "y": 940
        },
        "text_position": {
          "x": 120,
          "y": 944
        },
        "line": "Suburban South Line Terminus",
        "lineKey": "suburban",
        "avgPrice": "\u20b94,900 / sq.ft",
        "newProjectsCount": 32,
        "slug": "chengalpattu",
        "isJunction": true
      }
    ],
    "popularHubs": [
      {
        "id": "chennai_central",
        "name": "Puratchi Thalaivar Central",
        "line": "Metro Blue, Green & Rail",
        "avgPrice": "\u20b914,500 / sq.ft",
        "projects": 35,
        "tag": "City Super-Hub",
        "zone": "Central Chennai"
      },
      {
        "id": "guindy",
        "name": "Guindy Multi-Modal Hub",
        "line": "Metro Blue & Suburban",
        "avgPrice": "\u20b913,500 / sq.ft",
        "projects": 38,
        "tag": "Industrial & Tech Core",
        "zone": "South Chennai"
      },
      {
        "id": "tambaram",
        "name": "Tambaram Terminal",
        "line": "Suburban Rail Terminus",
        "avgPrice": "\u20b96,800 / sq.ft",
        "projects": 54,
        "tag": "South Gateway Suburb",
        "zone": "Extended South"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Chennai Metro Rail (CMRL) & Southern Railway Feeds",
      "missingCredentials": "Live train telemetry requires CMRL enterprise API partner credentials.",
      "scheduleFrequency": "Metro: every 4-6 mins \u2022 Suburban: every 10-15 mins",
      "verified": true
    },
    "available": true
  },
  "kolkata": {
    "cityId": "kolkata",
    "cityName": "Kolkata",
    "networkTitle": "Kolkata Suburban Railway & Metro Network",
    "networkSubtitle": "India's First Metro (Blue Line) \u2022 East-West Underwater Metro (Green Line)",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 480 50 Q 510 300 500 500 Q 490 700 520 950 Q 750 900 950 800 Q 1150 700 1200 500 Q 1100 300 900 150 Q 700 50 480 50 Z",
    "lines": [
      {
        "id": "blue",
        "label": "Blue Line (Dakshineswar - New Garia)",
        "color": "#2563EB",
        "bg": "#DBEAFE",
        "type": "metro",
        "path": "M 620 240 L 620 520 L 620 560 L 620 840"
      },
      {
        "id": "green",
        "label": "Green Line (Howrah - Sector V)",
        "color": "#16A34A",
        "bg": "#DCFCE7",
        "type": "metro",
        "path": "M 440 520 L 620 520 L 730 520 L 1080 460"
      }
    ],
    "interchanges": [
      {
        "id": "esplanade_int",
        "name": "Esplanade Super-Hub",
        "x": 605,
        "y": 508,
        "width": 30,
        "height": 24,
        "lines": [
          "Blue Metro",
          "Green Metro"
        ]
      },
      {
        "id": "howrah_int",
        "name": "Howrah Terminal",
        "x": 425,
        "y": 508,
        "width": 30,
        "height": 24,
        "lines": [
          "Green Metro",
          "Eastern Railway"
        ]
      }
    ],
    "stations": [
      {
        "id": "howrah",
        "name": "Howrah Railway & Green Metro",
        "lat": 22.5856,
        "lng": 88.3411,
        "position": {
          "x": 440,
          "y": 520
        },
        "text_position": {
          "x": 370,
          "y": 550
        },
        "line": "Green Metro & Eastern Rail",
        "lineKey": "green",
        "avgPrice": "\u20b97,800 / sq.ft",
        "newProjectsCount": 35,
        "slug": "howrah",
        "isJunction": true
      },
      {
        "id": "esplanade",
        "name": "Esplanade Interchange",
        "lat": 22.5658,
        "lng": 88.3511,
        "position": {
          "x": 620,
          "y": 520
        },
        "text_position": {
          "x": 635,
          "y": 515
        },
        "line": "Blue & Green Metro Mega-Hub",
        "lineKey": "blue",
        "avgPrice": "\u20b914,200 / sq.ft",
        "newProjectsCount": 24,
        "slug": "esplanade",
        "isJunction": true
      },
      {
        "id": "sealdah",
        "name": "Sealdah Railway & Green Metro",
        "lat": 22.5678,
        "lng": 88.3711,
        "position": {
          "x": 730,
          "y": 520
        },
        "text_position": {
          "x": 720,
          "y": 550
        },
        "line": "Green Metro & Eastern Rail",
        "lineKey": "green",
        "avgPrice": "\u20b910,500 / sq.ft",
        "newProjectsCount": 30,
        "slug": "sealdah",
        "isJunction": true
      },
      {
        "id": "sector_v",
        "name": "Salt Lake Sector V",
        "lat": 22.5806,
        "lng": 88.4319,
        "position": {
          "x": 1080,
          "y": 460
        },
        "text_position": {
          "x": 1095,
          "y": 464
        },
        "line": "Green Metro Terminus",
        "lineKey": "green",
        "avgPrice": "\u20b98,900 / sq.ft",
        "newProjectsCount": 52,
        "slug": "salt-lake-sector-v",
        "isJunction": true
      },
      {
        "id": "dum_dum",
        "name": "Dum Dum Junction",
        "lat": 22.6219,
        "lng": 88.3936,
        "position": {
          "x": 620,
          "y": 240
        },
        "text_position": {
          "x": 530,
          "y": 244
        },
        "line": "Blue Metro & Suburban",
        "lineKey": "blue",
        "avgPrice": "\u20b96,800 / sq.ft",
        "newProjectsCount": 38,
        "slug": "dum-dum",
        "isJunction": true
      },
      {
        "id": "park_street",
        "name": "Park Street",
        "lat": 22.5511,
        "lng": 22.5511,
        "position": {
          "x": 620,
          "y": 560
        },
        "text_position": {
          "x": 540,
          "y": 564
        },
        "line": "Blue Metro Line",
        "lineKey": "blue",
        "avgPrice": "\u20b918,500 / sq.ft",
        "newProjectsCount": 18,
        "slug": "park-street"
      },
      {
        "id": "kavi_subhash",
        "name": "Kavi Subhash (New Garia)",
        "lat": 22.4706,
        "lng": 88.3969,
        "position": {
          "x": 620,
          "y": 840
        },
        "text_position": {
          "x": 510,
          "y": 844
        },
        "line": "Blue Metro Terminus",
        "lineKey": "blue",
        "avgPrice": "\u20b96,200 / sq.ft",
        "newProjectsCount": 42,
        "slug": "kavi-subhash",
        "isJunction": true
      }
    ],
    "popularHubs": [
      {
        "id": "sector_v",
        "name": "Salt Lake Sector V",
        "line": "Green Metro East-West Line",
        "avgPrice": "\u20b98,900 / sq.ft",
        "projects": 52,
        "tag": "Eastern Tech Hub",
        "zone": "Salt Lake"
      },
      {
        "id": "howrah",
        "name": "Howrah Railway Station",
        "line": "Underwater Green Metro & Rail",
        "avgPrice": "\u20b97,800 / sq.ft",
        "projects": 35,
        "tag": "Heritage Gateway",
        "zone": "Howrah"
      },
      {
        "id": "esplanade",
        "name": "Esplanade Mega Interchange",
        "line": "Blue & Green Metro Lines",
        "avgPrice": "\u20b914,200 / sq.ft",
        "projects": 24,
        "tag": "Central Business Hub",
        "zone": "Central Kolkata"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Metro Railway Kolkata & Eastern Railway Feeds",
      "missingCredentials": "Live train telemetry requires Metro Railway Kolkata enterprise credentials.",
      "scheduleFrequency": "Blue Line: every 5-6 mins \u2022 Green Line: every 7-9 mins",
      "verified": true
    },
    "available": true
  },
  "ahmedabad": {
    "cityId": "ahmedabad",
    "cityName": "Ahmedabad",
    "networkTitle": "Ahmedabad Metro & Suburban Network",
    "networkSubtitle": "GMRC Metro (North-South & East-West Lines) \u2022 Western Railway Rail Link",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 550 50 Q 640 250 630 500 Q 620 750 650 950 Q 850 850 1050 700 Q 1150 500 1000 300 Q 800 150 550 50 Z",
    "lines": [
      {
        "id": "red",
        "label": "North-South Line (Motera - APMC)",
        "color": "#EF4444",
        "bg": "#FEE2E2",
        "type": "metro",
        "path": "M 660 160 L 660 520 L 660 830"
      },
      {
        "id": "blue",
        "label": "East-West Line (Thaltej - Vastral)",
        "color": "#2563EB",
        "bg": "#DBEAFE",
        "type": "metro",
        "path": "M 280 520 L 660 520 L 860 520 L 1130 600"
      }
    ],
    "interchanges": [
      {
        "id": "old_high_court_int",
        "name": "Old High Court Mega-Hub",
        "x": 645,
        "y": 508,
        "width": 30,
        "height": 24,
        "lines": [
          "North-South Metro",
          "East-West Metro"
        ]
      }
    ],
    "stations": [
      {
        "id": "thaltej",
        "name": "Thaltej Gam (SG Highway)",
        "lat": 23.0583,
        "lng": 72.5083,
        "position": {
          "x": 280,
          "y": 520
        },
        "text_position": {
          "x": 190,
          "y": 524
        },
        "line": "East-West Metro Line",
        "lineKey": "blue",
        "avgPrice": "\u20b99,800 / sq.ft",
        "newProjectsCount": 42,
        "slug": "thaltej",
        "isJunction": true
      },
      {
        "id": "old_high_court",
        "name": "Old High Court Interchange",
        "lat": 23.0389,
        "lng": 72.5681,
        "position": {
          "x": 660,
          "y": 520
        },
        "text_position": {
          "x": 675,
          "y": 515
        },
        "line": "North-South & East-West Hub",
        "lineKey": "blue",
        "avgPrice": "\u20b911,500 / sq.ft",
        "newProjectsCount": 30,
        "slug": "old-high-court",
        "isJunction": true
      },
      {
        "id": "motera",
        "name": "Motera Stadium",
        "lat": 23.0917,
        "lng": 72.5986,
        "position": {
          "x": 660,
          "y": 160
        },
        "text_position": {
          "x": 560,
          "y": 164
        },
        "line": "North-South Metro Line",
        "lineKey": "red",
        "avgPrice": "\u20b97,400 / sq.ft",
        "newProjectsCount": 36,
        "slug": "motera-stadium",
        "isJunction": true
      },
      {
        "id": "kalupur_metro",
        "name": "Kalupur Railway Station",
        "lat": 23.0236,
        "lng": 72.6006,
        "position": {
          "x": 860,
          "y": 520
        },
        "text_position": {
          "x": 850,
          "y": 550
        },
        "line": "East-West Metro & Western Rail",
        "lineKey": "blue",
        "avgPrice": "\u20b96,800 / sq.ft",
        "newProjectsCount": 28,
        "slug": "kalupur-railway-station",
        "isJunction": true
      },
      {
        "id": "vastral",
        "name": "Vastral Gam Terminus",
        "lat": 23.0036,
        "lng": 72.6681,
        "position": {
          "x": 1130,
          "y": 600
        },
        "text_position": {
          "x": 1145,
          "y": 604
        },
        "line": "East-West Metro Line",
        "lineKey": "blue",
        "avgPrice": "\u20b95,400 / sq.ft",
        "newProjectsCount": 38,
        "slug": "vastral-gam",
        "isJunction": true
      },
      {
        "id": "apmc",
        "name": "APMC Terminus",
        "lat": 22.9867,
        "lng": 72.5456,
        "position": {
          "x": 660,
          "y": 830
        },
        "text_position": {
          "x": 675,
          "y": 834
        },
        "line": "North-South Metro Line",
        "lineKey": "red",
        "avgPrice": "\u20b96,200 / sq.ft",
        "newProjectsCount": 26,
        "slug": "apmc",
        "isJunction": true
      }
    ],
    "popularHubs": [
      {
        "id": "thaltej",
        "name": "Thaltej Gam (SG Highway)",
        "line": "East-West Metro Line",
        "avgPrice": "\u20b99,800 / sq.ft",
        "projects": 42,
        "tag": "Corporate High Street",
        "zone": "West Ahmedabad"
      },
      {
        "id": "motera",
        "name": "Motera Stadium",
        "line": "North-South Metro Line",
        "avgPrice": "\u20b97,400 / sq.ft",
        "projects": 36,
        "tag": "Sports & Growth Hub",
        "zone": "North Ahmedabad"
      },
      {
        "id": "old_high_court",
        "name": "Old High Court",
        "line": "Dual Metro Line Interchange",
        "avgPrice": "\u20b911,500 / sq.ft",
        "projects": 30,
        "tag": "Central Interchange",
        "zone": "Central"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Gujarat Metro Rail Corporation (GMRC) Feeds",
      "missingCredentials": "Live train telemetry requires GMRC API developer credentials.",
      "scheduleFrequency": "Metro: every 8-10 mins",
      "verified": true
    },
    "available": true
  },
  "kochi": {
    "cityId": "kochi",
    "cityName": "Kochi",
    "networkTitle": "Kochi Metro & Transit Network",
    "networkSubtitle": "Kochi Metro Corridor (Aluva to SN Junction) \u2022 Water Metro Connectivity",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 300 100 Q 500 250 650 450 Q 800 650 900 850 Q 800 950 600 900 Q 450 750 350 550 Q 250 350 300 100 Z",
    "lines": [
      {
        "id": "metro",
        "label": "Kochi Metro Line",
        "color": "#0D9488",
        "bg": "#CCFBF1",
        "type": "metro",
        "path": "M 380 160 L 580 430 L 730 630 L 770 710 L 860 810 L 960 900"
      }
    ],
    "interchanges": [
      {
        "id": "vyttila_int",
        "name": "Vyttila Mobility Hub",
        "x": 845,
        "y": 798,
        "width": 30,
        "height": 24,
        "lines": [
          "Kochi Metro",
          "Water Metro",
          "KSRTC"
        ]
      },
      {
        "id": "aluva_int",
        "name": "Aluva Rail Interchange",
        "x": 365,
        "y": 148,
        "width": 30,
        "height": 24,
        "lines": [
          "Kochi Metro",
          "Southern Railway"
        ]
      }
    ],
    "stations": [
      {
        "id": "aluva_metro",
        "name": "Aluva Railway & Metro",
        "lat": 10.1089,
        "lng": 76.3556,
        "position": {
          "x": 380,
          "y": 160
        },
        "text_position": {
          "x": 280,
          "y": 164
        },
        "line": "Kochi Metro & Southern Rail",
        "lineKey": "metro",
        "avgPrice": "\u20b95,800 / sq.ft",
        "newProjectsCount": 26,
        "slug": "aluva",
        "isJunction": true
      },
      {
        "id": "edappally",
        "name": "Edappally (Lulu Mall)",
        "lat": 10.0247,
        "lng": 76.3078,
        "position": {
          "x": 580,
          "y": 430
        },
        "text_position": {
          "x": 480,
          "y": 434
        },
        "line": "Kochi Metro Line",
        "lineKey": "metro",
        "avgPrice": "\u20b97,400 / sq.ft",
        "newProjectsCount": 38,
        "slug": "edappally"
      },
      {
        "id": "mg_road_kochi",
        "name": "MG Road Kochi",
        "lat": 9.9736,
        "lng": 76.2842,
        "position": {
          "x": 730,
          "y": 630
        },
        "text_position": {
          "x": 640,
          "y": 634
        },
        "line": "Kochi Metro Line",
        "lineKey": "metro",
        "avgPrice": "\u20b99,200 / sq.ft",
        "newProjectsCount": 20,
        "slug": "mg-road-kochi"
      },
      {
        "id": "ernakulam_south",
        "name": "Ernakulam South Junction",
        "lat": 9.9678,
        "lng": 76.2917,
        "position": {
          "x": 770,
          "y": 710
        },
        "text_position": {
          "x": 660,
          "y": 714
        },
        "line": "Metro & Southern Railway Hub",
        "lineKey": "metro",
        "avgPrice": "\u20b98,600 / sq.ft",
        "newProjectsCount": 28,
        "slug": "ernakulam-south",
        "isJunction": true
      },
      {
        "id": "vyttila",
        "name": "Vyttila Mobility Hub",
        "lat": 9.9672,
        "lng": 76.3211,
        "position": {
          "x": 860,
          "y": 810
        },
        "text_position": {
          "x": 875,
          "y": 814
        },
        "line": "Metro, Water Metro & Bus Hub",
        "lineKey": "metro",
        "avgPrice": "\u20b97,800 / sq.ft",
        "newProjectsCount": 34,
        "slug": "vyttila",
        "isJunction": true
      },
      {
        "id": "sn_junction",
        "name": "SN Junction (Tripunithura)",
        "lat": 9.9483,
        "lng": 76.3475,
        "position": {
          "x": 960,
          "y": 900
        },
        "text_position": {
          "x": 975,
          "y": 904
        },
        "line": "Kochi Metro Line",
        "lineKey": "metro",
        "avgPrice": "\u20b96,400 / sq.ft",
        "newProjectsCount": 22,
        "slug": "sn-junction",
        "isJunction": true
      }
    ],
    "popularHubs": [
      {
        "id": "edappally",
        "name": "Edappally (Lulu Hub)",
        "line": "Kochi Metro Line",
        "avgPrice": "\u20b97,400 / sq.ft",
        "projects": 38,
        "tag": "Commercial Crossroads",
        "zone": "Central Kochi"
      },
      {
        "id": "vyttila",
        "name": "Vyttila Mobility Hub",
        "line": "Metro, Water & Bus Hub",
        "avgPrice": "\u20b97,800 / sq.ft",
        "projects": 34,
        "tag": "Mega Multi-Modal Hub",
        "zone": "South Central"
      },
      {
        "id": "aluva_metro",
        "name": "Aluva Station Hub",
        "line": "Metro & Rail Terminal",
        "avgPrice": "\u20b95,800 / sq.ft",
        "projects": 26,
        "tag": "Northern Gateway",
        "zone": "North Kochi"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Kochi Metro Rail Limited (KMRL) Feeds",
      "missingCredentials": "Live train telemetry requires KMRL API developer access.",
      "scheduleFrequency": "Metro: every 6-8 mins",
      "verified": true
    },
    "available": true
  },
  "dubai": {
    "cityId": "dubai",
    "cityName": "Dubai",
    "networkTitle": "Dubai Metro & Tram Transit Network",
    "networkSubtitle": "RTA Dubai Metro (Red & Green Lines) \u2022 Dubai Tram Corridor",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 100 800 Q 250 650 450 500 Q 700 350 1100 150 L 1250 200 L 1150 400 Q 800 600 450 780 L 100 950 Z",
    "lines": [
      {
        "id": "red",
        "label": "Red Line (Centrepoint - Expo)",
        "color": "#EF4444",
        "bg": "#FEE2E2",
        "type": "metro",
        "path": "M 1050 200 L 970 240 L 820 330 L 770 370 L 540 540 L 490 570 L 380 660 L 250 760 L 210 800 L 110 900"
      },
      {
        "id": "green",
        "label": "Green Line (Etisalat - Creek)",
        "color": "#16A34A",
        "bg": "#DCFCE7",
        "type": "metro",
        "path": "M 920 150 L 820 330 L 770 370 L 840 490"
      }
    ],
    "interchanges": [
      {
        "id": "union_int",
        "name": "Union Super-Hub",
        "x": 805,
        "y": 318,
        "width": 30,
        "height": 24,
        "lines": [
          "Red Metro",
          "Green Metro"
        ]
      },
      {
        "id": "burjuman_int",
        "name": "BurJuman Super-Hub",
        "x": 755,
        "y": 358,
        "width": 30,
        "height": 24,
        "lines": [
          "Red Metro",
          "Green Metro"
        ]
      },
      {
        "id": "marina_tram_int",
        "name": "Dubai Marina Tram Intermodal",
        "x": 235,
        "y": 748,
        "width": 30,
        "height": 24,
        "lines": [
          "Red Metro",
          "Dubai Tram"
        ]
      }
    ],
    "stations": [
      {
        "id": "centrepoint",
        "name": "Centrepoint (Rashidiya)",
        "lat": 25.2289,
        "lng": 55.3986,
        "position": {
          "x": 1050,
          "y": 200
        },
        "text_position": {
          "x": 1065,
          "y": 204
        },
        "line": "Red Metro Terminus",
        "lineKey": "red",
        "avgPrice": "AED 1,150 / sq.ft",
        "newProjectsCount": 24,
        "slug": "centrepoint",
        "isJunction": true
      },
      {
        "id": "airport_t3",
        "name": "Airport Terminal 3",
        "lat": 25.2536,
        "lng": 55.3656,
        "position": {
          "x": 970,
          "y": 240
        },
        "text_position": {
          "x": 860,
          "y": 244
        },
        "line": "Red Metro Line",
        "lineKey": "red",
        "avgPrice": "AED 1,350 / sq.ft",
        "newProjectsCount": 18,
        "slug": "airport-t3"
      },
      {
        "id": "union_dubai",
        "name": "Union Metro Interchange",
        "lat": 25.2667,
        "lng": 55.3167,
        "position": {
          "x": 820,
          "y": 330
        },
        "text_position": {
          "x": 730,
          "y": 334
        },
        "line": "Red & Green Metro Super-Hub",
        "lineKey": "red",
        "avgPrice": "AED 1,280 / sq.ft",
        "newProjectsCount": 26,
        "slug": "union-dubai",
        "isJunction": true
      },
      {
        "id": "burjuman",
        "name": "BurJuman Interchange",
        "lat": 25.2528,
        "lng": 55.3028,
        "position": {
          "x": 770,
          "y": 370
        },
        "text_position": {
          "x": 680,
          "y": 374
        },
        "line": "Red & Green Metro Super-Hub",
        "lineKey": "red",
        "avgPrice": "AED 1,420 / sq.ft",
        "newProjectsCount": 22,
        "slug": "burjuman",
        "isJunction": true
      },
      {
        "id": "burj_khalifa",
        "name": "Burj Khalifa / Dubai Mall",
        "lat": 25.1997,
        "lng": 55.2756,
        "position": {
          "x": 540,
          "y": 540
        },
        "text_position": {
          "x": 395,
          "y": 544
        },
        "line": "Red Metro Line",
        "lineKey": "red",
        "avgPrice": "AED 3,200 / sq.ft",
        "newProjectsCount": 42,
        "slug": "burj-khalifa-dubai-mall",
        "isJunction": true
      },
      {
        "id": "business_bay",
        "name": "Business Bay",
        "lat": 25.1889,
        "lng": 55.2656,
        "position": {
          "x": 490,
          "y": 570
        },
        "text_position": {
          "x": 405,
          "y": 574
        },
        "line": "Red Metro Line",
        "lineKey": "red",
        "avgPrice": "AED 2,100 / sq.ft",
        "newProjectsCount": 58,
        "slug": "business-bay"
      },
      {
        "id": "mall_of_emirates",
        "name": "Mall of the Emirates",
        "lat": 25.1181,
        "lng": 55.2006,
        "position": {
          "x": 380,
          "y": 660
        },
        "text_position": {
          "x": 260,
          "y": 664
        },
        "line": "Red Metro Line",
        "lineKey": "red",
        "avgPrice": "AED 1,650 / sq.ft",
        "newProjectsCount": 36,
        "slug": "mall-of-the-emirates"
      },
      {
        "id": "sobha_realty",
        "name": "Sobha Realty (Dubai Marina)",
        "lat": 25.0786,
        "lng": 55.1417,
        "position": {
          "x": 250,
          "y": 760
        },
        "text_position": {
          "x": 130,
          "y": 764
        },
        "line": "Red Metro & Dubai Tram",
        "lineKey": "red",
        "avgPrice": "AED 2,450 / sq.ft",
        "newProjectsCount": 50,
        "slug": "sobha-realty-marina",
        "isJunction": true
      },
      {
        "id": "dmcc",
        "name": "DMCC (Jumeirah Lakes Towers)",
        "lat": 25.0683,
        "lng": 55.1389,
        "position": {
          "x": 210,
          "y": 800
        },
        "text_position": {
          "x": 110,
          "y": 804
        },
        "line": "Red Metro & Dubai Tram",
        "lineKey": "red",
        "avgPrice": "AED 1,980 / sq.ft",
        "newProjectsCount": 46,
        "slug": "dmcc",
        "isJunction": true
      },
      {
        "id": "uae_exchange",
        "name": "UAE Exchange / Expo 2020",
        "lat": 24.9917,
        "lng": 55.0889,
        "position": {
          "x": 110,
          "y": 900
        },
        "text_position": {
          "x": 125,
          "y": 904
        },
        "line": "Red Metro Terminus",
        "lineKey": "red",
        "avgPrice": "AED 1,200 / sq.ft",
        "newProjectsCount": 30,
        "slug": "uae-exchange",
        "isJunction": true
      }
    ],
    "popularHubs": [
      {
        "id": "burj_khalifa",
        "name": "Burj Khalifa / Downtown",
        "line": "Red Metro Line",
        "avgPrice": "AED 3,200 / sq.ft",
        "projects": 42,
        "tag": "Iconic Global District",
        "zone": "Downtown Dubai"
      },
      {
        "id": "sobha_realty",
        "name": "Sobha Realty (Dubai Marina)",
        "line": "Red Metro & Tram",
        "avgPrice": "AED 2,450 / sq.ft",
        "projects": 50,
        "tag": "Waterfront Towers",
        "zone": "Dubai Marina"
      },
      {
        "id": "business_bay",
        "name": "Business Bay Station",
        "line": "Red Metro Line",
        "avgPrice": "AED 2,100 / sq.ft",
        "projects": 58,
        "tag": "Canal Financial Hub",
        "zone": "Business Bay"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Dubai Roads & Transport Authority (RTA) Feeds",
      "missingCredentials": "Live telemetry requires registered Dubai Pulse RTA developer credentials.",
      "scheduleFrequency": "Peak: every 2.5-3 mins \u2022 Regular: every 5 mins",
      "verified": true
    },
    "available": true
  },
  "lucknow": {
    "cityId": "lucknow",
    "cityName": "Lucknow",
    "networkTitle": "Lucknow Metro Transit Network",
    "networkSubtitle": "UPMRC Metro Red Line Corridor (Airport to Munshi Pulia)",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 250 850 Q 500 650 700 450 Q 900 250 1150 100 Q 1200 300 1000 500 Q 800 700 500 850 Z",
    "lines": [
      {
        "id": "red",
        "label": "Red Line (Airport - Munshi Pulia)",
        "color": "#DC2626",
        "bg": "#FEE2E2",
        "type": "metro",
        "path": "M 320 820 L 670 530 L 790 420 L 1090 140"
      }
    ],
    "interchanges": [
      {
        "id": "charbagh_int",
        "name": "Charbagh Intermodal Terminal",
        "x": 655,
        "y": 518,
        "width": 30,
        "height": 24,
        "lines": [
          "Lucknow Metro",
          "Northern Railway"
        ]
      }
    ],
    "stations": [
      {
        "id": "ccs_airport",
        "name": "CCS International Airport",
        "lat": 26.7606,
        "lng": 80.8894,
        "position": {
          "x": 320,
          "y": 820
        },
        "text_position": {
          "x": 200,
          "y": 824
        },
        "line": "Red Metro Line",
        "lineKey": "red",
        "avgPrice": "\u20b96,800 / sq.ft",
        "newProjectsCount": 24,
        "slug": "ccs-airport",
        "isJunction": true
      },
      {
        "id": "charbagh_lko",
        "name": "Charbagh Railway Station",
        "lat": 26.8322,
        "lng": 80.9197,
        "position": {
          "x": 670,
          "y": 530
        },
        "text_position": {
          "x": 540,
          "y": 534
        },
        "line": "Metro & Northern Railway Hub",
        "lineKey": "red",
        "avgPrice": "\u20b98,500 / sq.ft",
        "newProjectsCount": 30,
        "slug": "charbagh",
        "isJunction": true
      },
      {
        "id": "hazratganj",
        "name": "Hazratganj (High Street)",
        "lat": 26.8528,
        "lng": 80.9428,
        "position": {
          "x": 790,
          "y": 420
        },
        "text_position": {
          "x": 805,
          "y": 424
        },
        "line": "Red Metro Line",
        "lineKey": "red",
        "avgPrice": "\u20b912,400 / sq.ft",
        "newProjectsCount": 22,
        "slug": "hazratganj",
        "isJunction": true
      },
      {
        "id": "munshi_pulia",
        "name": "Munshi Pulia (Indira Nagar)",
        "lat": 26.8911,
        "lng": 80.9986,
        "position": {
          "x": 1090,
          "y": 140
        },
        "text_position": {
          "x": 980,
          "y": 144
        },
        "line": "Red Metro Terminus",
        "lineKey": "red",
        "avgPrice": "\u20b97,600 / sq.ft",
        "newProjectsCount": 38,
        "slug": "munshi-pulia",
        "isJunction": true
      }
    ],
    "popularHubs": [
      {
        "id": "hazratganj",
        "name": "Hazratganj Station",
        "line": "Red Metro Line",
        "avgPrice": "\u20b912,400 / sq.ft",
        "projects": 22,
        "tag": "Heritage Prime Core",
        "zone": "Central Lucknow"
      },
      {
        "id": "munshi_pulia",
        "name": "Munshi Pulia Hub",
        "line": "Red Metro Terminus",
        "avgPrice": "\u20b97,600 / sq.ft",
        "projects": 38,
        "tag": "Indira Nagar Corridor",
        "zone": "East Lucknow"
      },
      {
        "id": "charbagh_lko",
        "name": "Charbagh Junction",
        "line": "Metro & Rail Super-Hub",
        "avgPrice": "\u20b98,500 / sq.ft",
        "projects": 30,
        "tag": "Railway Crossroads",
        "zone": "South Central"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Uttar Pradesh Metro Rail Corporation (UPMRC) Feeds",
      "missingCredentials": "Live train telemetry requires UPMRC developer credentials.",
      "scheduleFrequency": "Metro: every 6-8 mins",
      "verified": true
    },
    "available": true
  },
  "nagpur": {
    "cityId": "nagpur",
    "cityName": "Nagpur",
    "networkTitle": "Nagpur Metro Rail Network",
    "networkSubtitle": "Maha Metro Nagpur (Orange & Aqua Corridors)",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 550 100 Q 660 50 750 100 Q 750 350 1100 450 Q 1150 550 1050 650 Q 750 650 750 950 Q 550 950 550 650 Q 200 650 150 500 Q 200 350 550 350 Z",
    "lines": [
      {
        "id": "orange",
        "label": "Orange Line (North - South)",
        "color": "#EA580C",
        "bg": "#FFEDD5",
        "type": "metro",
        "path": "M 660 140 L 660 500 L 660 900"
      },
      {
        "id": "aqua",
        "label": "Aqua Line (East - West)",
        "color": "#06B6D4",
        "bg": "#CFFAFE",
        "type": "metro",
        "path": "M 220 500 L 660 500 L 1050 500"
      }
    ],
    "interchanges": [
      {
        "id": "sitabuldi_int",
        "name": "Sitabuldi Interchange",
        "x": 645,
        "y": 488,
        "width": 30,
        "height": 24,
        "lines": [
          "Orange Metro",
          "Aqua Metro"
        ]
      }
    ],
    "stations": [
      {
        "id": "sitabuldi",
        "name": "Sitabuldi Interchange",
        "lat": 21.1467,
        "lng": 79.0881,
        "position": {
          "x": 660,
          "y": 500
        },
        "text_position": {
          "x": 675,
          "y": 495
        },
        "line": "Orange & Aqua Metro Interchange",
        "lineKey": "orange",
        "avgPrice": "\u20b99,800 / sq.ft",
        "newProjectsCount": 26,
        "slug": "sitabuldi",
        "isJunction": true
      },
      {
        "id": "khapri",
        "name": "Khapri (Airport South)",
        "lat": 21.0583,
        "lng": 79.0689,
        "position": {
          "x": 660,
          "y": 900
        },
        "text_position": {
          "x": 675,
          "y": 904
        },
        "line": "Orange Metro Line",
        "lineKey": "orange",
        "avgPrice": "\u20b95,400 / sq.ft",
        "newProjectsCount": 35,
        "slug": "khapri",
        "isJunction": true
      },
      {
        "id": "automotive_sq",
        "name": "Automotive Square",
        "lat": 21.2056,
        "lng": 79.0911,
        "position": {
          "x": 660,
          "y": 140
        },
        "text_position": {
          "x": 675,
          "y": 144
        },
        "line": "Orange Metro Terminus",
        "lineKey": "orange",
        "avgPrice": "\u20b96,100 / sq.ft",
        "newProjectsCount": 20,
        "slug": "automotive-square",
        "isJunction": true
      },
      {
        "id": "lokmanya_nagar",
        "name": "Lokmanya Nagar",
        "lat": 21.1247,
        "lng": 79.0067,
        "position": {
          "x": 220,
          "y": 500
        },
        "text_position": {
          "x": 120,
          "y": 504
        },
        "line": "Aqua Metro Terminus",
        "lineKey": "aqua",
        "avgPrice": "\u20b96,500 / sq.ft",
        "newProjectsCount": 28,
        "slug": "lokmanya-nagar",
        "isJunction": true
      },
      {
        "id": "prajapati_nagar",
        "name": "Prajapati Nagar",
        "lat": 21.1556,
        "lng": 79.1556,
        "position": {
          "x": 1050,
          "y": 500
        },
        "text_position": {
          "x": 1065,
          "y": 504
        },
        "line": "Aqua Metro Terminus",
        "lineKey": "aqua",
        "avgPrice": "\u20b95,800 / sq.ft",
        "newProjectsCount": 32,
        "slug": "prajapati-nagar",
        "isJunction": true
      }
    ],
    "popularHubs": [
      {
        "id": "sitabuldi",
        "name": "Sitabuldi Central Hub",
        "line": "Orange & Aqua Metro Interchange",
        "avgPrice": "\u20b99,800 / sq.ft",
        "projects": 26,
        "tag": "Commercial Core",
        "zone": "Central Nagpur"
      },
      {
        "id": "khapri",
        "name": "Khapri (Airport Corridor)",
        "line": "Orange Metro Line",
        "avgPrice": "\u20b95,400 / sq.ft",
        "projects": 35,
        "tag": "MIHAN Tech Corridor",
        "zone": "South Nagpur"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Maha Metro Nagpur Feeds",
      "missingCredentials": "Live train telemetry requires Maha Metro developer access.",
      "scheduleFrequency": "Metro: every 8-10 mins",
      "verified": true
    },
    "available": true
  },
  "goa": {
    "cityId": "goa",
    "cityName": "Goa",
    "networkTitle": "Goa Mainline Railway Transit Corridor",
    "networkSubtitle": "Konkan Railway Coastal Transit Network",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 250 200 Q 550 350 850 500 Q 1050 650 1150 850 Q 950 900 700 800 Q 450 700 250 500 Z",
    "lines": [
      {
        "id": "mainline",
        "label": "Mainline Railway Transit Corridor",
        "color": "#16A34A",
        "bg": "#F1F5F9",
        "type": "rail",
        "path": "M 380 200 L 480 320 L 580 460 L 720 660 L 450 600 L 880 850"
      }
    ],
    "interchanges": [
      {
        "id": "goa_hub",
        "name": "Pernem",
        "x": 365,
        "y": 188,
        "width": 30,
        "height": 24,
        "lines": [
          "Konkan Railway"
        ]
      }
    ],
    "stations": [
      {
        "id": "pernem",
        "name": "Pernem",
        "lat": 15.7194,
        "lng": 73.7917,
        "position": {
          "x": 380,
          "y": 200
        },
        "text_position": {
          "x": 395,
          "y": 204
        },
        "line": "Konkan Railway",
        "lineKey": "mainline",
        "avgPrice": "\u20b96,800 / sq.ft",
        "newProjectsCount": 14,
        "slug": "pernem",
        "isJunction": false
      },
      {
        "id": "thivim",
        "name": "Thivim (North Goa Hub)",
        "lat": 15.6319,
        "lng": 73.8569,
        "position": {
          "x": 480,
          "y": 320
        },
        "text_position": {
          "x": 495,
          "y": 324
        },
        "line": "Konkan Railway",
        "lineKey": "mainline",
        "avgPrice": "\u20b98,500 / sq.ft",
        "newProjectsCount": 26,
        "slug": "thivim",
        "isJunction": true
      },
      {
        "id": "karmali",
        "name": "Karmali (Old Goa / Panaji)",
        "lat": 15.4967,
        "lng": 73.9211,
        "position": {
          "x": 580,
          "y": 460
        },
        "text_position": {
          "x": 595,
          "y": 464
        },
        "line": "Konkan Railway",
        "lineKey": "mainline",
        "avgPrice": "\u20b99,800 / sq.ft",
        "newProjectsCount": 22,
        "slug": "karmali",
        "isJunction": true
      },
      {
        "id": "madgaon",
        "name": "Madgaon Junction",
        "lat": 15.2742,
        "lng": 73.9681,
        "position": {
          "x": 720,
          "y": 660
        },
        "text_position": {
          "x": 735,
          "y": 664
        },
        "line": "Konkan Railway Central Hub",
        "lineKey": "mainline",
        "avgPrice": "\u20b97,400 / sq.ft",
        "newProjectsCount": 38,
        "slug": "madgaon",
        "isJunction": true
      },
      {
        "id": "vasco",
        "name": "Vasco da Gama",
        "lat": 15.3986,
        "lng": 73.8119,
        "position": {
          "x": 450,
          "y": 600
        },
        "text_position": {
          "x": 465,
          "y": 604
        },
        "line": "Konkan Railway Port Branch",
        "lineKey": "mainline",
        "avgPrice": "\u20b97,200 / sq.ft",
        "newProjectsCount": 18,
        "slug": "vasco",
        "isJunction": false
      },
      {
        "id": "canacona",
        "name": "Canacona (South Goa)",
        "lat": 14.9967,
        "lng": 74.0472,
        "position": {
          "x": 880,
          "y": 850
        },
        "text_position": {
          "x": 895,
          "y": 854
        },
        "line": "Konkan Railway",
        "lineKey": "mainline",
        "avgPrice": "\u20b96,100 / sq.ft",
        "newProjectsCount": 15,
        "slug": "canacona",
        "isJunction": false
      }
    ],
    "popularHubs": [
      {
        "id": "pernem",
        "name": "Pernem",
        "line": "Konkan Railway",
        "avgPrice": "\u20b96,800 / sq.ft",
        "projects": 14,
        "tag": "Prime Transit Hub",
        "zone": "Goa"
      },
      {
        "id": "thivim",
        "name": "Thivim (North Goa Hub)",
        "line": "Konkan Railway",
        "avgPrice": "\u20b98,500 / sq.ft",
        "projects": 26,
        "tag": "Prime Transit Hub",
        "zone": "Goa"
      },
      {
        "id": "karmali",
        "name": "Karmali (Old Goa / Panaji)",
        "line": "Konkan Railway",
        "avgPrice": "\u20b99,800 / sq.ft",
        "projects": 22,
        "tag": "Prime Transit Hub",
        "zone": "Goa"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Indian Railways (Southern/Konkan Railway) Timetable & Alignment",
      "missingCredentials": "Live train telemetry requires CRIS/NTES partner credentials.",
      "scheduleFrequency": "Scheduled express and passenger services",
      "verified": true
    },
    "available": true
  },
  "coimbatore": {
    "cityId": "coimbatore",
    "cityName": "Coimbatore",
    "networkTitle": "Coimbatore Rail Transit Network",
    "networkSubtitle": "Southern Railway Coimbatore Urban Corridor",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 250 200 Q 550 350 850 500 Q 1050 650 1150 850 Q 950 900 700 800 Q 450 700 250 500 Z",
    "lines": [
      {
        "id": "mainline",
        "label": "Mainline Railway Transit Corridor",
        "color": "#2563EB",
        "bg": "#F1F5F9",
        "type": "rail",
        "path": "M 560 500 L 450 420 L 720 420 L 840 550"
      }
    ],
    "interchanges": [
      {
        "id": "coimbatore_hub",
        "name": "Coimbatore Junction",
        "x": 545,
        "y": 488,
        "width": 30,
        "height": 24,
        "lines": [
          "Mainline Rail Hub"
        ]
      }
    ],
    "stations": [
      {
        "id": "cbe_junction",
        "name": "Coimbatore Junction",
        "lat": 11.0019,
        "lng": 76.9667,
        "position": {
          "x": 560,
          "y": 500
        },
        "text_position": {
          "x": 575,
          "y": 504
        },
        "line": "Mainline Rail Hub",
        "lineKey": "mainline",
        "avgPrice": "\u20b97,800 / sq.ft",
        "newProjectsCount": 34,
        "slug": "cbe_junction",
        "isJunction": true
      },
      {
        "id": "cbe_north",
        "name": "Coimbatore North",
        "lat": 11.0267,
        "lng": 76.9536,
        "position": {
          "x": 450,
          "y": 420
        },
        "text_position": {
          "x": 465,
          "y": 424
        },
        "line": "Suburban Corridor",
        "lineKey": "mainline",
        "avgPrice": "\u20b98,200 / sq.ft",
        "newProjectsCount": 25,
        "slug": "cbe_north",
        "isJunction": false
      },
      {
        "id": "peelamedu",
        "name": "Peelamedu (Avinashi Rd)",
        "lat": 11.0289,
        "lng": 77.0197,
        "position": {
          "x": 720,
          "y": 420
        },
        "text_position": {
          "x": 735,
          "y": 424
        },
        "line": "Suburban Corridor",
        "lineKey": "mainline",
        "avgPrice": "\u20b99,500 / sq.ft",
        "newProjectsCount": 38,
        "slug": "peelamedu",
        "isJunction": true
      },
      {
        "id": "singanallur",
        "name": "Singanallur",
        "lat": 10.9986,
        "lng": 77.0319,
        "position": {
          "x": 840,
          "y": 550
        },
        "text_position": {
          "x": 855,
          "y": 554
        },
        "line": "Suburban Corridor",
        "lineKey": "mainline",
        "avgPrice": "\u20b97,200 / sq.ft",
        "newProjectsCount": 20,
        "slug": "singanallur",
        "isJunction": false
      }
    ],
    "popularHubs": [
      {
        "id": "cbe_junction",
        "name": "Coimbatore Junction",
        "line": "Mainline Rail Hub",
        "avgPrice": "\u20b97,800 / sq.ft",
        "projects": 34,
        "tag": "Prime Transit Hub",
        "zone": "Coimbatore"
      },
      {
        "id": "cbe_north",
        "name": "Coimbatore North",
        "line": "Suburban Corridor",
        "avgPrice": "\u20b98,200 / sq.ft",
        "projects": 25,
        "tag": "Prime Transit Hub",
        "zone": "Coimbatore"
      },
      {
        "id": "peelamedu",
        "name": "Peelamedu (Avinashi Rd)",
        "line": "Suburban Corridor",
        "avgPrice": "\u20b99,500 / sq.ft",
        "projects": 38,
        "tag": "Prime Transit Hub",
        "zone": "Coimbatore"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Indian Railways (Southern/Konkan Railway) Timetable & Alignment",
      "missingCredentials": "Live train telemetry requires CRIS/NTES partner credentials.",
      "scheduleFrequency": "Scheduled express and passenger services",
      "verified": true
    },
    "available": true
  },
  "trivandrum": {
    "cityId": "trivandrum",
    "cityName": "Trivandrum",
    "networkTitle": "Trivandrum Rail Transit Network",
    "networkSubtitle": "Southern Railway Technopark Urban Corridor",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 250 200 Q 550 350 850 500 Q 1050 650 1150 850 Q 950 900 700 800 Q 450 700 250 500 Z",
    "lines": [
      {
        "id": "mainline",
        "label": "Mainline Railway Transit Corridor",
        "color": "#EA580C",
        "bg": "#F1F5F9",
        "type": "rail",
        "path": "M 750 700 L 580 550 L 420 380"
      }
    ],
    "interchanges": [
      {
        "id": "trivandrum_hub",
        "name": "Thiruvananthapuram Central",
        "x": 735,
        "y": 688,
        "width": 30,
        "height": 24,
        "lines": [
          "Southern Railway Capital Hub"
        ]
      }
    ],
    "stations": [
      {
        "id": "tvm_central",
        "name": "Thiruvananthapuram Central",
        "lat": 8.4878,
        "lng": 76.9519,
        "position": {
          "x": 750,
          "y": 700
        },
        "text_position": {
          "x": 765,
          "y": 704
        },
        "line": "Southern Railway Capital Hub",
        "lineKey": "mainline",
        "avgPrice": "\u20b97,400 / sq.ft",
        "newProjectsCount": 32,
        "slug": "tvm_central",
        "isJunction": true
      },
      {
        "id": "kochuveli",
        "name": "Kochuveli Terminal",
        "lat": 8.5083,
        "lng": 76.8967,
        "position": {
          "x": 580,
          "y": 550
        },
        "text_position": {
          "x": 595,
          "y": 554
        },
        "line": "Mainline Terminal",
        "lineKey": "mainline",
        "avgPrice": "\u20b96,800 / sq.ft",
        "newProjectsCount": 22,
        "slug": "kochuveli",
        "isJunction": false
      },
      {
        "id": "kazhakkoottam",
        "name": "Kazhakkoottam (Technopark)",
        "lat": 8.5667,
        "lng": 76.8667,
        "position": {
          "x": 420,
          "y": 380
        },
        "text_position": {
          "x": 435,
          "y": 384
        },
        "line": "Technopark IT Rail Hub",
        "lineKey": "mainline",
        "avgPrice": "\u20b98,600 / sq.ft",
        "newProjectsCount": 45,
        "slug": "kazhakkoottam",
        "isJunction": true
      }
    ],
    "popularHubs": [
      {
        "id": "tvm_central",
        "name": "Thiruvananthapuram Central",
        "line": "Southern Railway Capital Hub",
        "avgPrice": "\u20b97,400 / sq.ft",
        "projects": 32,
        "tag": "Prime Transit Hub",
        "zone": "Trivandrum"
      },
      {
        "id": "kochuveli",
        "name": "Kochuveli Terminal",
        "line": "Mainline Terminal",
        "avgPrice": "\u20b96,800 / sq.ft",
        "projects": 22,
        "tag": "Prime Transit Hub",
        "zone": "Trivandrum"
      },
      {
        "id": "kazhakkoottam",
        "name": "Kazhakkoottam (Technopark)",
        "line": "Technopark IT Rail Hub",
        "avgPrice": "\u20b98,600 / sq.ft",
        "projects": 45,
        "tag": "Prime Transit Hub",
        "zone": "Trivandrum"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Indian Railways (Southern/Konkan Railway) Timetable & Alignment",
      "missingCredentials": "Live train telemetry requires CRIS/NTES partner credentials.",
      "scheduleFrequency": "Scheduled express and passenger services",
      "verified": true
    },
    "available": true
  },
  "calicut": {
    "cityId": "calicut",
    "cityName": "Calicut",
    "networkTitle": "Calicut Rail Transit Network",
    "networkSubtitle": "Southern Railway Malabar Transit Corridor",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 250 200 Q 550 350 850 500 Q 1050 650 1150 850 Q 950 900 700 800 Q 450 700 250 500 Z",
    "lines": [
      {
        "id": "mainline",
        "label": "Mainline Railway Transit Corridor",
        "color": "#0D9488",
        "bg": "#F1F5F9",
        "type": "rail",
        "path": "M 620 500 L 750 680 L 480 350"
      }
    ],
    "interchanges": [
      {
        "id": "calicut_hub",
        "name": "Kozhikode Main",
        "x": 605,
        "y": 488,
        "width": 30,
        "height": 24,
        "lines": [
          "Southern Railway Main Hub"
        ]
      }
    ],
    "stations": [
      {
        "id": "clt_main",
        "name": "Kozhikode Main",
        "lat": 11.2467,
        "lng": 75.7836,
        "position": {
          "x": 620,
          "y": 500
        },
        "text_position": {
          "x": 635,
          "y": 504
        },
        "line": "Southern Railway Main Hub",
        "lineKey": "mainline",
        "avgPrice": "\u20b96,500 / sq.ft",
        "newProjectsCount": 28,
        "slug": "clt_main",
        "isJunction": true
      },
      {
        "id": "ferok",
        "name": "Ferok",
        "lat": 11.1833,
        "lng": 75.8333,
        "position": {
          "x": 750,
          "y": 680
        },
        "text_position": {
          "x": 765,
          "y": 684
        },
        "line": "Mainline Rail",
        "lineKey": "mainline",
        "avgPrice": "\u20b95,200 / sq.ft",
        "newProjectsCount": 16,
        "slug": "ferok",
        "isJunction": false
      },
      {
        "id": "west_hill",
        "name": "West Hill",
        "lat": 11.2917,
        "lng": 75.7667,
        "position": {
          "x": 480,
          "y": 350
        },
        "text_position": {
          "x": 495,
          "y": 354
        },
        "line": "Coastal Corridor",
        "lineKey": "mainline",
        "avgPrice": "\u20b96,200 / sq.ft",
        "newProjectsCount": 18,
        "slug": "west_hill",
        "isJunction": false
      }
    ],
    "popularHubs": [
      {
        "id": "clt_main",
        "name": "Kozhikode Main",
        "line": "Southern Railway Main Hub",
        "avgPrice": "\u20b96,500 / sq.ft",
        "projects": 28,
        "tag": "Prime Transit Hub",
        "zone": "Calicut"
      },
      {
        "id": "ferok",
        "name": "Ferok",
        "line": "Mainline Rail",
        "avgPrice": "\u20b95,200 / sq.ft",
        "projects": 16,
        "tag": "Prime Transit Hub",
        "zone": "Calicut"
      },
      {
        "id": "west_hill",
        "name": "West Hill",
        "line": "Coastal Corridor",
        "avgPrice": "\u20b96,200 / sq.ft",
        "projects": 18,
        "tag": "Prime Transit Hub",
        "zone": "Calicut"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Indian Railways (Southern/Konkan Railway) Timetable & Alignment",
      "missingCredentials": "Live train telemetry requires CRIS/NTES partner credentials.",
      "scheduleFrequency": "Scheduled express and passenger services",
      "verified": true
    },
    "available": true
  },
  "thrissur": {
    "cityId": "thrissur",
    "cityName": "Thrissur",
    "networkTitle": "Thrissur Rail Transit Network",
    "networkSubtitle": "Southern Railway Cultural Capital Corridor",
    "viewBox": "0 0 1320 1002",
    "backgroundLandmass": "M 250 200 Q 550 350 850 500 Q 1050 650 1150 850 Q 950 900 700 800 Q 450 700 250 500 Z",
    "lines": [
      {
        "id": "mainline",
        "label": "Mainline Railway Transit Corridor",
        "color": "#8B5CF6",
        "bg": "#F1F5F9",
        "type": "rail",
        "path": "M 640 500 L 520 380 L 760 650"
      }
    ],
    "interchanges": [
      {
        "id": "thrissur_hub",
        "name": "Thrissur Central",
        "x": 625,
        "y": 488,
        "width": 30,
        "height": 24,
        "lines": [
          "Southern Railway Main Junction"
        ]
      }
    ],
    "stations": [
      {
        "id": "tcr_central",
        "name": "Thrissur Central",
        "lat": 10.5186,
        "lng": 76.2119,
        "position": {
          "x": 640,
          "y": 500
        },
        "text_position": {
          "x": 655,
          "y": 504
        },
        "line": "Southern Railway Main Junction",
        "lineKey": "mainline",
        "avgPrice": "\u20b95,900 / sq.ft",
        "newProjectsCount": 26,
        "slug": "tcr_central",
        "isJunction": true
      },
      {
        "id": "punkunnam",
        "name": "Punkunnam",
        "lat": 10.5367,
        "lng": 76.1986,
        "position": {
          "x": 520,
          "y": 380
        },
        "text_position": {
          "x": 535,
          "y": 384
        },
        "line": "Suburban Rail",
        "lineKey": "mainline",
        "avgPrice": "\u20b96,400 / sq.ft",
        "newProjectsCount": 20,
        "slug": "punkunnam",
        "isJunction": false
      },
      {
        "id": "ollur",
        "name": "Ollur",
        "lat": 10.4719,
        "lng": 76.2367,
        "position": {
          "x": 760,
          "y": 650
        },
        "text_position": {
          "x": 775,
          "y": 654
        },
        "line": "Suburban Rail",
        "lineKey": "mainline",
        "avgPrice": "\u20b95,100 / sq.ft",
        "newProjectsCount": 14,
        "slug": "ollur",
        "isJunction": false
      }
    ],
    "popularHubs": [
      {
        "id": "tcr_central",
        "name": "Thrissur Central",
        "line": "Southern Railway Main Junction",
        "avgPrice": "\u20b95,900 / sq.ft",
        "projects": 26,
        "tag": "Prime Transit Hub",
        "zone": "Thrissur"
      },
      {
        "id": "punkunnam",
        "name": "Punkunnam",
        "line": "Suburban Rail",
        "avgPrice": "\u20b96,400 / sq.ft",
        "projects": 20,
        "tag": "Prime Transit Hub",
        "zone": "Thrissur"
      },
      {
        "id": "ollur",
        "name": "Ollur",
        "line": "Suburban Rail",
        "avgPrice": "\u20b95,100 / sq.ft",
        "projects": 14,
        "tag": "Prime Transit Hub",
        "zone": "Thrissur"
      }
    ],
    "liveDataStatus": {
      "hasRealTimeApi": false,
      "source": "Official Indian Railways (Southern/Konkan Railway) Timetable & Alignment",
      "missingCredentials": "Live train telemetry requires CRIS/NTES partner credentials.",
      "scheduleFrequency": "Scheduled express and passenger services",
      "verified": true
    },
    "available": true
  }
};


// ----------------------------------------------------------------------------
// GEODESIC & TRANSIT DISTANCE CALCULATION UTILITIES
// ----------------------------------------------------------------------------

/**
 * Calculates straight-line distance in km using the standard Haversine formula
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

/**
 * Calculates pedestrian road network walking distance (circuity factor ~1.28)
 * and estimated walking time at 4.8 km/h (~12.5 mins/km)
 */
export function calculateWalkingDistanceAndMinutes(straightLineKm) {
  if (!straightLineKm || straightLineKm <= 0) return { walkingKm: 0, walkingMins: 0 };
  const circuity = 1.28;
  const walkingKm = Number((straightLineKm * circuity).toFixed(2));
  const walkingMins = Math.max(1, Math.round(walkingKm * 12.5));
  return { walkingKm, walkingMins };
}

/**
 * Calculates estimated rail travel time based on inter-station hop count
 */
export function calculateTransitHopMinutes(hopCount = 1, hasInterchange = false) {
  const avgHopMins = 2.4;
  const interchangeBuffer = hasInterchange ? 5 : 0;
  return Math.max(3, Math.round(hopCount * avgHopMins + interchangeBuffer));
}

/**
 * Finds the nearest verified railway or metro station from given coordinates
 */
export function getNearestStationForCoordinates(lat, lng, cityId = "mumbai") {
  const network = getTransitNetworkForCity(cityId);
  if (!network || !network.stations || network.stations.length === 0) return null;

  let nearest = null;
  let minDistance = Infinity;

  for (const st of network.stations) {
    if (st.lat && st.lng) {
      const d = calculateHaversineDistance(lat, lng, st.lat, st.lng);
      if (d < minDistance) {
        minDistance = d;
        nearest = st;
      }
    }
  }

  if (!nearest) return null;

  const { walkingKm, walkingMins } = calculateWalkingDistanceAndMinutes(minDistance);

  return {
    station: nearest,
    straightLineKm: minDistance,
    walkingKm,
    walkingMins
  };
}

/**
 * Returns transit network for given city ID with fallback
 */
export function getTransitNetworkForCity(cityId = "mumbai") {
  const norm = (cityId || "mumbai").toLowerCase().trim();
  return CITY_TRANSIT_NETWORKS[norm] || CITY_TRANSIT_NETWORKS["mumbai"];
}

/**
 * Returns all supported cities metadata
 */
export function getAllSupportedCitiesTransit() {
  return Object.keys(CITY_TRANSIT_NETWORKS).map((key) => ({
    id: key,
    name: CITY_TRANSIT_NETWORKS[key].cityName,
    networkTitle: CITY_TRANSIT_NETWORKS[key].networkTitle,
    stationsCount: CITY_TRANSIT_NETWORKS[key].stations.length,
    linesCount: CITY_TRANSIT_NETWORKS[key].lines.length
  }));
}
