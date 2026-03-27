fetch("https://seller.digikala.com/api/v2/categories/tree", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    priority: "u=1, i",
    "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-web-optimize-response": "1",
    cookie:
      "tracker_glob_new=cUc9MH0; TS018d011a=0102310591a1594da8997455f573997b010b3133c6657201a9a7231eea49e5a60ec969952b44348689d1e08109ce1f910181708faa; tracker_glob_new=cUc9MH0; PHPSESSID=336cv5vga9tl8u1edgjvjgsbuj; tracker_session=2XSGpZA; _sp_ses.13cb=*; seller_api_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MzI2ODc1NTAsInNlbGxlcl9pZCI6MTM5MzI3LCJwYXlsb2FkIjp7InVzZXJuYW1lIjoiOTg5MTA1MTI0MjA0IiwicmVnaXN0ZXJfcGhvbmUiOiI5ODkxMDUxMjQyMDQiLCJlbWFpbCI6ImRvb3ppYmFAZ21haWwuY29tIiwiYnVzaW5lc3NfbmFtZSI6Ilx1MDYyZlx1MDY0OFx1MDYzMlx1MDZjY1x1MDYyOFx1MDYyNyIsImZpcnN0X25hbWUiOiJcdTA2NDhcdTA2MmRcdTA2NGFcdTA2MmYiLCJsYXN0X25hbWUiOiJcdTA2MzVcdTA2MjdcdTA2MjhcdTA2MzFcdTA2NGEiLCJjb21wYW55X25hbWUiOm51bGwsInZlcmlmaWVkX2J5X290cCI6WyI5ODkxMDUxMjQyMDQiXX0sImV4cCI6MTc3NzA1OTg3MH0.cWt9QzXmPn7_BmWV2mRFqmvAk7_C7by8Yi1ElwEzpIMlL5BaO4k227eTEdca2I3h; seller_api_otp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0eXBlIjoib3RwIiwidG9rZW5faWQiOjMyNjg3NTQ5LCJzZWxsZXJfaWQiOm51bGwsInZlcmlmaWVkX2J5X290cCI6Ijk4OTEwNTEyNDIwNCIsImV4cCI6MTc3NzA1OTg2OX0.Zb6XUJPosK1YeCpIumM5usNjWpRwWEtj8Ze25_8CLtowNZ9oqxp7CZR27bg3zd5_; _dwid=019d2687-0194-72a4-bb3b-e61a726534e7; _sentinel_dwid=019d2687-0405-7359-8469-01eb10c645f3; _sp_id.13cb=c5fa7d90-916f-40d9-a98a-f15d95d4c6f9.1764573374.4.1774468754.1766707727.7de98137-d0fd-4e9b-8263-258b2ac30c17.3bae0d9b-5121-49e1-bcab-a00a40092336.c167a1c8-bf85-45c9-8bcc-2eb397dae419.1774467830014.53",
    Referer: "https://seller.digikala.com/pwa/product/create/1?categoryId=6946&draftProductId=6977605",
  },
  body: null,
  method: "GET",
});

var obj = {
  status: "ok",
  data: {
    sort_data: { sort_column: "id", sort_order: "asc", sort_columns: ["id"] },
    pager: { page: 1, item_per_page: 50, total_pages: 0, total_rows: 0 },
    form_data: [],
    items: [
      { id: 6741, title: "\u0645\u0627\u062f\u0631 \u0648 \u06a9\u0648\u062f\u06a9", leaf: false, theme: null },
      {
        id: 5702,
        title: "\u0633\u0644\u0627\u0645\u062a \u0648 \u067e\u0632\u0634\u06a9\u06cc",
        leaf: false,
        theme: null,
      },
      {
        id: 5968,
        title: "\u0622\u0631\u0627\u06cc\u0634\u06cc \u0648 \u0628\u0647\u062f\u0627\u0634\u062a\u06cc",
        leaf: false,
        theme: null,
      },
      { id: 6124, title: "\u0648\u0631\u0632\u0634 \u0648 \u0633\u0641\u0631", leaf: false, theme: null },
      {
        id: 8450,
        title:
          "\u0627\u0628\u0632\u0627\u0631 \u0622\u0644\u0627\u062a \u0648 \u062a\u062c\u0647\u06cc\u0632\u0627\u062a",
        leaf: false,
        theme: null,
      },
      { id: 9871, title: "\u0639\u0645\u0648\u0645\u06cc", leaf: false, theme: "no_color_no_size" },
      {
        id: 10688,
        title: "\u062e\u0648\u062f\u0631\u0648 \u0648 \u0645\u0648\u062a\u0648\u0631\u0633\u06cc\u06a9\u0644\u062a",
        leaf: false,
        theme: "no_color_no_size",
      },
      {
        id: 10170,
        title: "\u0645\u062d\u0635\u0648\u0644\u0627\u062a \u0628\u0648\u0645\u06cc \u0648 \u0645\u062d\u0644\u06cc",
        leaf: false,
        theme: "no_color_no_size",
      },
      { id: 1, title: "\u0645\u0648\u0628\u0627\u06cc\u0644", leaf: false, theme: null },
      { id: 6027, title: "\u0627\u0633\u0628\u0627\u0628 \u0628\u0627\u0632\u06cc", leaf: false, theme: null },
      {
        id: 5966,
        title: "\u06a9\u0627\u0644\u0627\u06cc \u062f\u06cc\u062c\u06cc\u062a\u0627\u0644",
        leaf: false,
        theme: null,
      },
      {
        id: 11382,
        title: "\u0637\u0644\u0627 \u0648 \u0646\u0642\u0631\u0647",
        leaf: false,
        theme: "no_color_no_size",
      },
      { id: 8749, title: "\u0645\u062f \u0648 \u067e\u0648\u0634\u0627\u06a9", leaf: false, theme: null },
      {
        id: 5967,
        title: "\u062e\u0627\u0646\u0647 \u0648 \u0622\u0634\u067e\u0632\u062e\u0627\u0646\u0647",
        leaf: false,
        theme: null,
      },
      {
        id: 8895,
        title:
          "\u06a9\u0627\u0644\u0627\u0647\u0627\u06cc \u0633\u0648\u067e\u0631\u0645\u0627\u0631\u06a9\u062a\u06cc",
        leaf: false,
        theme: null,
      },
      {
        id: 8,
        title:
          "\u06a9\u062a\u0627\u0628\u060c \u0644\u0648\u0627\u0632\u0645 \u062a\u062d\u0631\u06cc\u0631 \u0648 \u0647\u0646\u0631",
        leaf: false,
        theme: null,
      },
      { id: 8428, title: "\u067e\u062a \u0634\u0627\u067e", leaf: false, theme: null },
      {
        id: 5753,
        title: "\u0644\u0648\u0627\u0632\u0645 \u062e\u0627\u0646\u06af\u06cc \u0628\u0631\u0642\u06cc",
        leaf: false,
        theme: null,
      },
    ],
    meta_data: [],
  },
};

fetch("https://seller.digikala.com/api/v2/categories/6946?categoryId=6946", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    priority: "u=1, i",
    "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-web-optimize-response": "1",
    cookie:
      "tracker_glob_new=cUc9MH0; TS018d011a=0102310591a1594da8997455f573997b010b3133c6657201a9a7231eea49e5a60ec969952b44348689d1e08109ce1f910181708faa; tracker_glob_new=cUc9MH0; PHPSESSID=336cv5vga9tl8u1edgjvjgsbuj; tracker_session=2XSGpZA; _sp_ses.13cb=*; seller_api_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MzI2ODc1NTAsInNlbGxlcl9pZCI6MTM5MzI3LCJwYXlsb2FkIjp7InVzZXJuYW1lIjoiOTg5MTA1MTI0MjA0IiwicmVnaXN0ZXJfcGhvbmUiOiI5ODkxMDUxMjQyMDQiLCJlbWFpbCI6ImRvb3ppYmFAZ21haWwuY29tIiwiYnVzaW5lc3NfbmFtZSI6Ilx1MDYyZlx1MDY0OFx1MDYzMlx1MDZjY1x1MDYyOFx1MDYyNyIsImZpcnN0X25hbWUiOiJcdTA2NDhcdTA2MmRcdTA2NGFcdTA2MmYiLCJsYXN0X25hbWUiOiJcdTA2MzVcdTA2MjdcdTA2MjhcdTA2MzFcdTA2NGEiLCJjb21wYW55X25hbWUiOm51bGwsInZlcmlmaWVkX2J5X290cCI6WyI5ODkxMDUxMjQyMDQiXX0sImV4cCI6MTc3NzA1OTg3MH0.cWt9QzXmPn7_BmWV2mRFqmvAk7_C7by8Yi1ElwEzpIMlL5BaO4k227eTEdca2I3h; seller_api_otp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0eXBlIjoib3RwIiwidG9rZW5faWQiOjMyNjg3NTQ5LCJzZWxsZXJfaWQiOm51bGwsInZlcmlmaWVkX2J5X290cCI6Ijk4OTEwNTEyNDIwNCIsImV4cCI6MTc3NzA1OTg2OX0.Zb6XUJPosK1YeCpIumM5usNjWpRwWEtj8Ze25_8CLtowNZ9oqxp7CZR27bg3zd5_; _dwid=019d2687-0194-72a4-bb3b-e61a726534e7; _sentinel_dwid=019d2687-0405-7359-8469-01eb10c645f3; _sp_id.13cb=c5fa7d90-916f-40d9-a98a-f15d95d4c6f9.1764573374.4.1774468754.1766707727.7de98137-d0fd-4e9b-8263-258b2ac30c17.3bae0d9b-5121-49e1-bcab-a00a40092336.c167a1c8-bf85-45c9-8bcc-2eb397dae419.1774467830014.53",
    Referer: "https://seller.digikala.com/pwa/product/create/1?categoryId=6946&draftProductId=6977605",
  },
  body: null,
  method: "GET",
});
var obj = {
  status: "ok",
  data: {
    category: { id: 6946, title: "\u062a\u0627\u0628\u0644\u0648", active: true, is_leaf: true },
    parents: [
      [
        {
          id: 5967,
          title_fa: "\u062e\u0627\u0646\u0647 \u0648 \u0622\u0634\u067e\u0632\u062e\u0627\u0646\u0647",
          is_leaf: false,
          level: 1,
        },
        {
          id: 6249,
          title_fa:
            "\u062f\u06a9\u0648\u0631\u0627\u0633\u06cc\u0648\u0646 \u0648 \u062f\u06a9\u0648\u0631\u0627\u062a\u06cc\u0648",
          is_leaf: false,
          level: 2,
        },
        {
          id: 10652,
          title_fa: "\u0642\u0627\u0628 \u0639\u06a9\u0633 \u0648 \u062a\u0627\u0628\u0644\u0648",
          is_leaf: false,
          level: 3,
        },
        { id: 6946, title_fa: "\u062a\u0627\u0628\u0644\u0648", is_leaf: true, level: 4 },
      ],
    ],
  },
};

fetch("https://seller.digikala.com/api/v2/product-creation/category/6946/validation", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    priority: "u=1, i",
    "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-web-optimize-response": "1",
    cookie:
      "tracker_glob_new=cUc9MH0; TS018d011a=0102310591a1594da8997455f573997b010b3133c6657201a9a7231eea49e5a60ec969952b44348689d1e08109ce1f910181708faa; tracker_glob_new=cUc9MH0; PHPSESSID=336cv5vga9tl8u1edgjvjgsbuj; tracker_session=2XSGpZA; _sp_ses.13cb=*; seller_api_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MzI2ODc1NTAsInNlbGxlcl9pZCI6MTM5MzI3LCJwYXlsb2FkIjp7InVzZXJuYW1lIjoiOTg5MTA1MTI0MjA0IiwicmVnaXN0ZXJfcGhvbmUiOiI5ODkxMDUxMjQyMDQiLCJlbWFpbCI6ImRvb3ppYmFAZ21haWwuY29tIiwiYnVzaW5lc3NfbmFtZSI6Ilx1MDYyZlx1MDY0OFx1MDYzMlx1MDZjY1x1MDYyOFx1MDYyNyIsImZpcnN0X25hbWUiOiJcdTA2NDhcdTA2MmRcdTA2NGFcdTA2MmYiLCJsYXN0X25hbWUiOiJcdTA2MzVcdTA2MjdcdTA2MjhcdTA2MzFcdTA2NGEiLCJjb21wYW55X25hbWUiOm51bGwsInZlcmlmaWVkX2J5X290cCI6WyI5ODkxMDUxMjQyMDQiXX0sImV4cCI6MTc3NzA1OTg3MH0.cWt9QzXmPn7_BmWV2mRFqmvAk7_C7by8Yi1ElwEzpIMlL5BaO4k227eTEdca2I3h; seller_api_otp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0eXBlIjoib3RwIiwidG9rZW5faWQiOjMyNjg3NTQ5LCJzZWxsZXJfaWQiOm51bGwsInZlcmlmaWVkX2J5X290cCI6Ijk4OTEwNTEyNDIwNCIsImV4cCI6MTc3NzA1OTg2OX0.Zb6XUJPosK1YeCpIumM5usNjWpRwWEtj8Ze25_8CLtowNZ9oqxp7CZR27bg3zd5_; _dwid=019d2687-0194-72a4-bb3b-e61a726534e7; _sentinel_dwid=019d2687-0405-7359-8469-01eb10c645f3; _sp_id.13cb=c5fa7d90-916f-40d9-a98a-f15d95d4c6f9.1764573374.4.1774468754.1766707727.7de98137-d0fd-4e9b-8263-258b2ac30c17.3bae0d9b-5121-49e1-bcab-a00a40092336.c167a1c8-bf85-45c9-8bcc-2eb397dae419.1774467830014.53",
    Referer: "https://seller.digikala.com/pwa/product/create/1?categoryId=6946&draftProductId=6977605",
  },
  body: null,
  method: "GET",
});
var obj = {
  status: "ok",
  data: {
    isValid: true,
    errors: null,
    bind: {
      brands: [
        {
          id: "9",
          text: "\u062a\u0648\u0634\u06cc\u0628\u0627 Toshiba",
          title_fa: "\u062a\u0648\u0634\u06cc\u0628\u0627",
          title_en: "Toshiba",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3495.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "28",
          text: "\u0633\u06cc\u06af\u06cc\u062a Seagate",
          title_fa: "\u0633\u06cc\u06af\u06cc\u062a",
          title_en: "Seagate",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3958.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "719",
          text: "\u0645\u062a\u0641\u0631\u0642\u0647 Miscellaneous",
          title_fa: "\u0645\u062a\u0641\u0631\u0642\u0647",
          title_en: "Miscellaneous",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/d37a7e939b804659cfc1e6d88092a1b8ea8132d4_1603699076.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "1076",
          text: "\u0644\u0648\u062a\u0648\u0633 Lotus",
          title_fa: "\u0644\u0648\u062a\u0648\u0633",
          title_en: "Lotus",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/5828.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "1231",
          text: "4\u0627\u0645 4M",
          title_fa: "4\u0627\u0645",
          title_en: "4M",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/6009.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "1239",
          text: "\u0631\u0627\u0648\u0646\u0632\u0628\u0631\u06af\u0631 Ravensburger",
          title_fa: "\u0631\u0627\u0648\u0646\u0632\u0628\u0631\u06af\u0631",
          title_en: "Ravensburger",
          logo_id: "",
        },
        {
          id: "1256",
          text: "\u062a\u0631\u0641\u0644 Trefl",
          title_fa: "\u062a\u0631\u0641\u0644",
          title_en: "Trefl",
          logo_id: "",
        },
        {
          id: "1545",
          text: "\u067e\u0627\u0644\u06cc\u0632 Paliz",
          title_fa: "\u067e\u0627\u0644\u06cc\u0632",
          title_en: "Paliz",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/8579fcaf9a254178b2e3517b9879a4d6de0721b4_1597817721.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "1574",
          text: "\u06cc\u0646\u06a9\u06cc \u06a9\u0646\u062f\u0644 Yankee Candle",
          title_fa: "\u06cc\u0646\u06a9\u06cc \u06a9\u0646\u062f\u0644",
          title_en: "Yankee Candle",
          logo_id: "",
        },
        {
          id: "1576",
          text: "\u0644\u06cc\u0648\u0646\u0627\u0631\u062f\u0648 Leonardo",
          title_fa: "\u0644\u06cc\u0648\u0646\u0627\u0631\u062f\u0648",
          title_en: "Leonardo",
          logo_id: "",
        },
        {
          id: "1617",
          text: "\u06cc\u0648\u0631\u0648\u0633\u0646\u062f Euro Sand",
          title_fa: "\u06cc\u0648\u0631\u0648\u0633\u0646\u062f",
          title_en: "Euro Sand",
          logo_id: "",
        },
        { id: "1629", text: "\u0632\u06a9 Zak", title_fa: "\u0632\u06a9", title_en: "Zak", logo_id: "" },
        {
          id: "1704",
          text: "\u0648\u0627\u0646 \u0648\u0627\u0644 1Wall",
          title_fa: "\u0648\u0627\u0646 \u0648\u0627\u0644",
          title_en: "1Wall",
          logo_id: "",
        },
        {
          id: "1707",
          text: "\u0633\u0627\u062a\u06af\u06cc\u0646 Satgin",
          title_fa: "\u0633\u0627\u062a\u06af\u06cc\u0646",
          title_en: "Satgin",
          logo_id: "",
        },
        {
          id: "1718",
          text: "\u067e\u0627\u0631\u0627\u0633\u062a\u0648\u0646 Parastone",
          title_fa: "\u067e\u0627\u0631\u0627\u0633\u062a\u0648\u0646",
          title_en: "Parastone",
          logo_id: "",
        },
        {
          id: "1720",
          text: "\u0646\u0627\u062f\u0627\u0644 Nadal",
          title_fa: "\u0646\u0627\u062f\u0627\u0644",
          title_en: "Nadal",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/6179.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "1732",
          text: "\u0645\u062b\u0627\u0644\u06cc\u0646 Mesaleen",
          title_fa: "\u0645\u062b\u0627\u0644\u06cc\u0646",
          title_en: "Mesaleen",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/6189.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "1751",
          text: "\u0633\u06cc\u0644\u0648\u06cc\u0627 Silvia",
          title_fa: "\u0633\u06cc\u0644\u0648\u06cc\u0627",
          title_en: "Silvia",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3f60c45f46bd7d85875b645252ce5faf8a683c74_1617715540.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "1792",
          text: "\u062a\u0646\u062f\u06cc\u0633 \u0648 \u067e\u06cc\u06a9\u0631\u0647 \u0634\u0647\u0631\u06cc\u0627\u0631 Tandis Shahriar",
          title_fa:
            "\u062a\u0646\u062f\u06cc\u0633 \u0648 \u067e\u06cc\u06a9\u0631\u0647 \u0634\u0647\u0631\u06cc\u0627\u0631",
          title_en: "Tandis Shahriar",
          logo_id: "",
        },
        {
          id: "1889",
          text: "\u0647\u06cc\u0633\u062a\u0648\u0631\u06cc \u0627\u0646\u062f \u0647\u0631\u0627\u0644\u062f\u0631\u06cc History and Heraldry",
          title_fa:
            "\u0647\u06cc\u0633\u062a\u0648\u0631\u06cc \u0627\u0646\u062f \u0647\u0631\u0627\u0644\u062f\u0631\u06cc",
          title_en: "History and Heraldry",
          logo_id: "",
        },
        {
          id: "1904",
          text: "\u0628\u0646\u06cc\u06a9\u0648 Benico",
          title_fa: "\u0628\u0646\u06cc\u06a9\u0648",
          title_en: "Benico",
          logo_id: "",
        },
        {
          id: "1971",
          text: "\u0627\u06cc\u0631\u0627\u0646 \u067e\u062a\u06a9 Iran Potk",
          title_fa: "\u0627\u06cc\u0631\u0627\u0646 \u067e\u062a\u06a9",
          title_en: "Iran Potk",
          logo_id: "",
        },
        {
          id: "2042",
          text: "\u0635\u062f\u0627\u06af\u0631\u0627\u0641\u06cc Sedagraphy",
          title_fa: "\u0635\u062f\u0627\u06af\u0631\u0627\u0641\u06cc",
          title_en: "Sedagraphy",
          logo_id: "",
        },
        { id: "2065", text: "\u0631\u0627\u062f Raad", title_fa: "\u0631\u0627\u062f", title_en: "Raad", logo_id: "" },
        {
          id: "2099",
          text: "\u0647\u0627\u0631\u0645\u0648\u0646\u06cc Harmony",
          title_fa: "\u0647\u0627\u0631\u0645\u0648\u0646\u06cc",
          title_en: "Harmony",
          logo_id: "",
        },
        {
          id: "2179",
          text: "\u062a\u0631\u0646\u062c Toranj",
          title_fa: "\u062a\u0631\u0646\u062c",
          title_en: "Toranj",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3441.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "2309",
          text: "\u0631\u0648\u0632\u06cc\u0646\u06cc Rosiny",
          title_fa: "\u0631\u0648\u0632\u06cc\u0646\u06cc",
          title_en: "Rosiny",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100013869.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "2326",
          text: "\u0622\u0631\u0648\u0634\u0627 Arosha",
          title_fa: "\u0622\u0631\u0648\u0634\u0627",
          title_en: "Arosha",
          logo_id: "",
        },
        {
          id: "2386",
          text: "\u0627\u06cc\u06a9\u06cc\u0627 Ikea",
          title_fa: "\u0627\u06cc\u06a9\u06cc\u0627",
          title_en: "Ikea",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2385.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "2477",
          text: "\u0648\u06cc\u0648\u0644\u062a \u062f\u06a9\u0648\u0631 Violet Decor",
          title_fa: "\u0648\u06cc\u0648\u0644\u062a \u062f\u06a9\u0648\u0631",
          title_en: "Violet Decor",
          logo_id: "",
        },
        {
          id: "2812",
          text: "\u0627\u062f\u0648\u06a9\u0627 Educa",
          title_fa: "\u0627\u062f\u0648\u06a9\u0627",
          title_en: "Educa",
          logo_id: "",
        },
        {
          id: "2813",
          text: "\u062a\u0631\u06cc\u0641\u0644 Trefl",
          title_fa: "\u062a\u0631\u06cc\u0641\u0644",
          title_en: "Trefl",
          logo_id: "",
        },
        {
          id: "2820",
          text: "\u06a9\u0644\u0645\u0646\u062a\u0648\u0646\u06cc Clementoni",
          title_fa: "\u06a9\u0644\u0645\u0646\u062a\u0648\u0646\u06cc",
          title_en: "Clementoni",
          logo_id: "",
        },
        {
          id: "2839",
          text: "\u0622\u0645\u0628\u0631\u0627 Umbra",
          title_fa: "\u0622\u0645\u0628\u0631\u0627",
          title_en: "Umbra",
          logo_id: "",
        },
        {
          id: "2885",
          text: "\u0648\u0633\u067e\u0627 Vespa",
          title_fa: "\u0648\u0633\u067e\u0627",
          title_en: "Vespa",
          logo_id: "",
        },
        {
          id: "2985",
          text: "\u0632\u0631\u0633\u0627\u0645 Zarsam",
          title_fa: "\u0632\u0631\u0633\u0627\u0645",
          title_en: "Zarsam",
          logo_id: "",
        },
        {
          id: "3168",
          text: "\u0631\u0627\u062f \u0633\u06cc\u0633\u062a\u0645 Rad System",
          title_fa: "\u0631\u0627\u062f \u0633\u06cc\u0633\u062a\u0645",
          title_en: "Rad System",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3868.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3171",
          text: "\u062f\u06cc \u0627\u0646 \u062f\u06cc DND",
          title_fa: "\u062f\u06cc \u0627\u0646 \u062f\u06cc",
          title_en: "DND",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1731.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3212",
          text: "\u0646\u0642\u0634 \u0642\u0644\u0645 Naghshe Ghalam",
          title_fa: "\u0646\u0642\u0634 \u0642\u0644\u0645",
          title_en: "Naghshe Ghalam",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2972.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3213",
          text: "\u0628\u0627\u062a\u06cc\u06a9 Batik",
          title_fa: "\u0628\u0627\u062a\u06cc\u06a9",
          title_en: "Batik",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3405.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3296",
          text: "\u0627\u0646\u062a\u0634\u0627\u0631\u0627\u062a \u0627\u0633\u062a\u0627\u0646\u062f\u0627\u0631\u062f Standard Pub",
          title_fa:
            "\u0627\u0646\u062a\u0634\u0627\u0631\u0627\u062a \u0627\u0633\u062a\u0627\u0646\u062f\u0627\u0631\u062f",
          title_en: "Standard Pub",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2290.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3432",
          text: "\u067e\u0627\u0631\u0633 Pars",
          title_fa: "\u067e\u0627\u0631\u0633",
          title_en: "Pars",
          logo_id: "",
        },
        {
          id: "3439",
          text: "\u062f\u06a9\u0648 \u0648\u0633\u0646\u0627 Deco Vasna",
          title_fa: "\u062f\u06a9\u0648 \u0648\u0633\u0646\u0627",
          title_en: "Deco Vasna",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3336.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3775",
          text: "\u0646\u0642\u0634 \u0646\u06af\u0627\u0631 \u0631\u0636\u0648\u06cc Naghsh Negar Razavi",
          title_fa: "\u0646\u0642\u0634 \u0646\u06af\u0627\u0631 \u0631\u0636\u0648\u06cc",
          title_en: "Naghsh Negar Razavi",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3808.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3791",
          text: "\u062f\u06a9\u0648\u0631\u06cc\u0645\u0627 Decorima",
          title_fa: "\u062f\u06a9\u0648\u0631\u06cc\u0645\u0627",
          title_en: "Decorima",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/4728.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3816",
          text: "\u0631\u0646\u06af\u0627\u0631\u0634\u0627\u067e Rangarshop",
          title_fa: "\u0631\u0646\u06af\u0627\u0631\u0634\u0627\u067e",
          title_en: "Rangarshop",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2151.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3873",
          text: "\u06af\u0631\u0648\u0647 \u0633\u0631\u0627\u0646\u06cc Sarani Group",
          title_fa: "\u06af\u0631\u0648\u0647 \u0633\u0631\u0627\u0646\u06cc",
          title_en: "Sarani Group",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2915.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3886",
          text: "\u0627\u0634\u0645\u06cc\u062a Schmidt",
          title_fa: "\u0627\u0634\u0645\u06cc\u062a",
          title_en: "Schmidt",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2121.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3941",
          text: "\u062f\u06cc\u0644\u0627\u06cc\u062a Delight",
          title_fa: "\u062f\u06cc\u0644\u0627\u06cc\u062a",
          title_en: "Delight",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1556.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3965",
          text: "\u0627\u0633\u062a\u0627\u0631 Star",
          title_fa: "\u0627\u0633\u062a\u0627\u0631",
          title_en: "Star",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3777.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "3975",
          text: "\u0686\u06a9\u0627\u0645\u0647 Chakaame",
          title_fa: "\u0686\u06a9\u0627\u0645\u0647",
          title_en: "Chakaame",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3775.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "4199",
          text: "\u0627\u0646\u0632\u0648 Enzo",
          title_fa: "\u0627\u0646\u0632\u0648",
          title_en: "Enzo",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2796.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "4437",
          text: "\u0631\u06cc\u062a\u0648\u0646 Ritoon",
          title_fa: "\u0631\u06cc\u062a\u0648\u0646",
          title_en: "Ritoon",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3123.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "4483",
          text: "\u0622\u0631\u06cc\u06a9\u0627\u0646 Arikan",
          title_fa: "\u0622\u0631\u06cc\u06a9\u0627\u0646",
          title_en: "Arikan",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2736.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "4491",
          text: "\u062a\u06cc\u0627\u0646\u0627 Tyana",
          title_fa: "\u062a\u06cc\u0627\u0646\u0627",
          title_en: "Tyana",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1308.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "4532",
          text: "\u0646\u06af\u0627\u0631 \u0627\u06cc\u0631\u0627\u0646\u06cc Negar Irani",
          title_fa: "\u0646\u06af\u0627\u0631 \u0627\u06cc\u0631\u0627\u0646\u06cc",
          title_en: "Negar Irani",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2680.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "4566",
          text: "\u06af\u0631\u0627\u0633\u06cc\u067e\u0627 Grasipa",
          title_fa: "\u06af\u0631\u0627\u0633\u06cc\u067e\u0627",
          title_en: "Grasipa",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1304.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "4572",
          text: "\u0627\u0644\u0648\u0646 Alone",
          title_fa: "\u0627\u0644\u0648\u0646",
          title_en: "Alone",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100014744.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "4603",
          text: "\u0648\u06cc\u0646\u0627 Vina",
          title_fa: "\u0648\u06cc\u0646\u0627",
          title_en: "Vina",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2681.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "4634",
          text: "\u0647\u0648\u0646\u06cc\u0627 Hoonya",
          title_fa: "\u0647\u0648\u0646\u06cc\u0627",
          title_en: "Hoonya",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2652.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "4696",
          text: "\u0644\u0648\u062d \u0647\u0646\u0631 Lohehonar",
          title_fa: "\u0644\u0648\u062d \u0647\u0646\u0631",
          title_en: "Lohehonar",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1205.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "4929",
          text: "\u0645\u0648\u062a\u06cc MOTI",
          title_fa: "\u0645\u0648\u062a\u06cc",
          title_en: "MOTI",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2451.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5044",
          text: "\u0631\u0646\u0633 Rence",
          title_fa: "\u0631\u0646\u0633",
          title_en: "Rence",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2468.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5095",
          text: "\u06a9\u0627\u0631\u0627 \u062f\u06cc\u0632\u0627\u06cc\u0646 Kara Design",
          title_fa: "\u06a9\u0627\u0631\u0627 \u062f\u06cc\u0632\u0627\u06cc\u0646",
          title_en: "Kara Design",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2436.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5122",
          text: "\u0628\u0627\u0631\u0645\u0627\u0646 Barman",
          title_fa: "\u0628\u0627\u0631\u0645\u0627\u0646",
          title_en: "Barman",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1814.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5130",
          text: "\u0627\u0644\u0648\u0627\u0646 ALVAN",
          title_fa: "\u0627\u0644\u0648\u0627\u0646",
          title_en: "ALVAN",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2860.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5134",
          text: "\u0633\u0641\u0627\u0644\u0646\u062f sofaland",
          title_fa: "\u0633\u0641\u0627\u0644\u0646\u062f",
          title_en: "sofaland",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2387.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5192",
          text: "\u062f\u06cc\u0632\u0645 DZom",
          title_fa: "\u062f\u06cc\u0632\u0645",
          title_en: "DZom",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/586647192aea9361893ab8843e1dc48de2107f2d_1639485849.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5279",
          text: "\u0622\u0641\u062a\u0627\u0628 aftab",
          title_fa: "\u0622\u0641\u062a\u0627\u0628",
          title_en: "aftab",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2247.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5418",
          text: "\u0634\u06cc\u0627\u0646\u0686\u06cc Shianchi",
          title_fa: "\u0634\u06cc\u0627\u0646\u0686\u06cc",
          title_en: "Shianchi",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2198.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5466",
          text: "\u062a\u06a9\u0633\u0627\u0645 techsam",
          title_fa: "\u062a\u06a9\u0633\u0627\u0645",
          title_en: "techsam",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/881.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5475",
          text: "\u0622\u0631\u06cc\u0646\u0627 Arina",
          title_fa: "\u0622\u0631\u06cc\u0646\u0627",
          title_en: "Arina",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2223.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5485",
          text: "\u0622\u0641\u062a\u0627\u0628 Aftab",
          title_fa: "\u0622\u0641\u062a\u0627\u0628",
          title_en: "Aftab",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2219.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5558",
          text: "\u0686\u0627\u0631\u06af\u0648\u0634 Chargosh",
          title_fa: "\u0686\u0627\u0631\u06af\u0648\u0634",
          title_en: "Chargosh",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2124.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5559",
          text: "\u06af\u0627\u0644\u0631\u06cc \u0648\u0627\u0648 Vaav Gallery",
          title_fa: "\u06af\u0627\u0644\u0631\u06cc \u0648\u0627\u0648",
          title_en: "Vaav Gallery",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2117.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5701",
          text: "\u062e\u0627\u0646\u0647 \u0633\u0641\u06cc\u062f khane sefid",
          title_fa: "\u062e\u0627\u0646\u0647 \u0633\u0641\u06cc\u062f",
          title_en: "khane sefid",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/823.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "5858",
          text: "\u0633\u06cc\u0645\u06cc\u0646 simin",
          title_fa: "\u0633\u06cc\u0645\u06cc\u0646",
          title_en: "simin",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1986.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6000",
          text: "\u0633\u0644\u0627\u0645 salam",
          title_fa: "\u0633\u0644\u0627\u0645",
          title_en: "salam",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1834.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6069",
          text: "\u0645\u06cc\u0646 \u0622\u0631\u062a MinArt",
          title_fa: "\u0645\u06cc\u0646 \u0622\u0631\u062a",
          title_en: "MinArt",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1907.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6096",
          text: "\u0631\u0648\u0645\u0627\u062f\u0648\u0646 Romadon",
          title_fa: "\u0631\u0648\u0645\u0627\u062f\u0648\u0646",
          title_en: "Romadon",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/766.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6130",
          text: "\u0628\u0627\u0646\u0648\u0645\u062f Banoomod",
          title_fa: "\u0628\u0627\u0646\u0648\u0645\u062f",
          title_en: "Banoomod",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1808.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6413",
          text: "\u0622\u0631\u062a \u067e\u0627\u0632\u0644 Art Puzzle",
          title_fa: "\u0622\u0631\u062a \u067e\u0627\u0632\u0644",
          title_en: "Art Puzzle",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/3db173a321d3b42b4713d1ca2e17b4fad207bb53_1734947671.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6456",
          text: "\u06a9\u0627\u0633\u062a\u0648\u0631\u0644\u0646\u062f Castorland",
          title_fa: "\u06a9\u0627\u0633\u062a\u0648\u0631\u0644\u0646\u062f",
          title_en: "Castorland",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/676.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6524",
          text: "\u0647\u0648\u0645 \u0622\u0631\u062a HOME ART",
          title_fa: "\u0647\u0648\u0645 \u0622\u0631\u062a",
          title_en: "HOME ART",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1127.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6739",
          text: "\u0648\u06cc\u0627\u0646\u0627 VIANA",
          title_fa: "\u0648\u06cc\u0627\u0646\u0627",
          title_en: "VIANA",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/428.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6822",
          text: "\u0631\u0627\u06cc\u06a9\u0627 RAIKA",
          title_fa: "\u0631\u0627\u06cc\u06a9\u0627",
          title_en: "RAIKA",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/436.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6847",
          text: "\u06af\u0627\u0644\u0631\u06cc \u0627\u0646\u0627\u0631 Anaar gallery",
          title_fa: "\u06af\u0627\u0644\u0631\u06cc \u0627\u0646\u0627\u0631",
          title_en: "Anaar gallery",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/336.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6853",
          text: "\u0628\u0627\u0646\u06cc\u0628\u0648 Banibo",
          title_fa: "\u0628\u0627\u0646\u06cc\u0628\u0648",
          title_en: "Banibo",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/326.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "6957",
          text: "\u0631\u0648\u06cc\u0627\u0645\u062f Royamode",
          title_fa: "\u0631\u0648\u06cc\u0627\u0645\u062f",
          title_en: "Royamode",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/255.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "7246",
          text: "\u062f\u0628\u0644\u06cc\u0648 \u0627\u0646\u062f \u0628\u06cc \u0647\u0648\u0645 W and B Home",
          title_fa: "\u062f\u0628\u0644\u06cc\u0648 \u0627\u0646\u062f \u0628\u06cc \u0647\u0648\u0645",
          title_en: "W and B Home",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/11.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "7408",
          text: "\u0645\u0627\u0631\u06a9 \u06af\u0644\u062f Mark Gold",
          title_fa: "\u0645\u0627\u0631\u06a9 \u06af\u0644\u062f",
          title_en: "Mark Gold",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/4303.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "7699",
          text: "\u06a9\u0627\u0641\u06cc \u0686\u0627\u067e Coffee Printing",
          title_fa: "\u06a9\u0627\u0641\u06cc \u0686\u0627\u067e",
          title_en: "Coffee Printing",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/7006.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "8178",
          text: "\u0633\u0627\u0631\u0627 \u0628\u0627\u0642\u0631\u067e\u0648\u0631 Sara Bagherpour",
          title_fa: "\u0633\u0627\u0631\u0627 \u0628\u0627\u0642\u0631\u067e\u0648\u0631",
          title_en: "Sara Bagherpour",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/5016.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "8480",
          text: "\u0622\u0646\u0627\u062a\u0648\u0644\u06cc\u0646 Anatolian",
          title_fa: "\u0622\u0646\u0627\u062a\u0648\u0644\u06cc\u0646",
          title_en: "Anatolian",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/5326.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "8711",
          text: "\u0647\u0648\u0645 \u06a9\u0627\u0644\u06a9\u0634\u0646 Home Collection",
          title_fa: "\u0647\u0648\u0645 \u06a9\u0627\u0644\u06a9\u0634\u0646",
          title_en: "Home Collection",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/5717.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "8737",
          text: "\u0622\u06af\u0627\u067e\u0647 Agape",
          title_fa: "\u0622\u06af\u0627\u067e\u0647",
          title_en: "Agape",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/5775.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "8929",
          text: "\u0622\u062a\u06cc\u0646\u0648 Atino",
          title_fa: "\u0622\u062a\u06cc\u0646\u0648",
          title_en: "Atino",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/6097.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "8935",
          text: "\u0627\u0631\u0698\u0646\u06af Arzhang",
          title_fa: "\u0627\u0631\u0698\u0646\u06af",
          title_en: "Arzhang",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/6103.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "9450",
          text: "\u062c\u0639\u0628\u0647 \u0647\u0627\u06cc \u0631\u0646\u06af\u06cc \u0631\u0646\u06af\u06cc \u062a\u0648\u067e\u06a9 jaabehaye rangi rangi topack",
          title_fa:
            "\u062c\u0639\u0628\u0647 \u0647\u0627\u06cc \u0631\u0646\u06af\u06cc \u0631\u0646\u06af\u06cc \u062a\u0648\u067e\u06a9",
          title_en: "jaabehaye rangi rangi topack",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/6664.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "9453",
          text: "\u0622\u0631\u062a \u0645\u0627\u0631\u06a9\u062a\u06cc\u0646\u06af Art Marketing",
          title_fa: "\u0622\u0631\u062a \u0645\u0627\u0631\u06a9\u062a\u06cc\u0646\u06af",
          title_en: "Art Marketing",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/6667.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "10612",
          text: "\u0686\u0627\u067e \u0633\u06cc Chop30",
          title_fa: "\u0686\u0627\u067e \u0633\u06cc",
          title_en: "Chop30",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/7917.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "10629",
          text: "\u0627\u0631\u06a9\u0633\u062a\u0631\u0627 Orchestra",
          title_fa: "\u0627\u0631\u06a9\u0633\u062a\u0631\u0627",
          title_en: "Orchestra",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100008088.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "10852",
          text: "\u0645\u06a9\u062a\u0628 \u0648\u062d\u06cc maktabevahy",
          title_fa: "\u0645\u06a9\u062a\u0628 \u0648\u062d\u06cc",
          title_en: "maktabevahy",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1735377900_100007903.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "11305",
          text: "\u062f\u0633\u062a\u062c\u0631\u062f\u06cc Dastjerdi",
          title_fa: "\u062f\u0633\u062a\u062c\u0631\u062f\u06cc",
          title_en: "Dastjerdi",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1735377919_100008398.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "11837",
          text: "\u0647\u064f\u0645 \u0622\u062f\u06cc\u0633 Homadis",
          title_fa: "\u0647\u064f\u0645 \u0622\u062f\u06cc\u0633",
          title_en: "Homadis",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1735377935_100008829.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "12021",
          text: "\u06a9\u06cc\u0648 \u0628\u0633\u062a \u06af\u0644\u062f q best gold",
          title_fa: "\u06a9\u06cc\u0648 \u0628\u0633\u062a \u06af\u0644\u062f",
          title_en: "q best gold",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100009022.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "12084",
          text: "\u0646\u0627\u0631\u0648\u06cc\u0646 \u062a\u0627\u0634 Narwin tash",
          title_fa: "\u0646\u0627\u0631\u0648\u06cc\u0646 \u062a\u0627\u0634",
          title_en: "Narwin tash",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1735377945_100009091.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "12085",
          text: "\u0645\u0633\u062a\u0631 \u0631\u0627\u062f Mr Rad",
          title_fa: "\u0645\u0633\u062a\u0631 \u0631\u0627\u062f",
          title_en: "Mr Rad",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/603474de8d5ddfa5933e42a8d065f500dc6bcf0a_1726413382.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "12550",
          text: "\u0686\u0648\u0628\u06cc\u062a Choobit",
          title_fa: "\u0686\u0648\u0628\u06cc\u062a",
          title_en: "Choobit",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100009553.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "12651",
          text: "\u0633\u0627\u0645 \u0646\u0648\u0631\u0632\u0627\u062f\u0647 Sam Norzadeh",
          title_fa: "\u0633\u0627\u0645 \u0646\u0648\u0631\u0632\u0627\u062f\u0647",
          title_en: "Sam Norzadeh",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100009657.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "13412",
          text: "\u062e\u0627\u0646\u0647 \u0633\u06a9\u0647 \u0627\u06cc\u0631\u0627\u0646 Iran Coin House",
          title_fa: "\u062e\u0627\u0646\u0647 \u0633\u06a9\u0647 \u0627\u06cc\u0631\u0627\u0646",
          title_en: "Iran Coin House",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100010456.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "13747",
          text: "\u062a\u0631\u0645\u0647 \u0637\u0631\u0627\u062d\u0627\u0646 \u0627\u06cc\u062f\u0647 Terme Tarrahan Ide",
          title_fa: "\u062a\u0631\u0645\u0647 \u0637\u0631\u0627\u062d\u0627\u0646 \u0627\u06cc\u062f\u0647",
          title_en: "Terme Tarrahan Ide",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100010800.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "14055",
          text: "\u0646\u0648\u06cc\u0646 \u062f\u06a9\u0648\u0631 \u0633\u06cc\u0627\u0646\u0627\u0648 Novin Decor Sianav",
          title_fa: "\u0646\u0648\u06cc\u0646 \u062f\u06a9\u0648\u0631 \u0633\u06cc\u0627\u0646\u0627\u0648",
          title_en: "Novin Decor Sianav",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100011129.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "14362",
          text: "\u0634\u0645\u0633\u0647 \u0646\u06af\u0627\u0631 Shamseh Negar",
          title_fa: "\u0634\u0645\u0633\u0647 \u0646\u06af\u0627\u0631",
          title_en: "Shamseh Negar",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100011439.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "14582",
          text: "\u0645\u0627\u0632\u0648\u0648 Mazoo",
          title_fa: "\u0645\u0627\u0632\u0648\u0648",
          title_en: "Mazoo",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100011668.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "14592",
          text: "\u0628\u0631\u06af \u0635\u062f\u0642 Bargesedgh",
          title_fa: "\u0628\u0631\u06af \u0635\u062f\u0642",
          title_en: "Bargesedgh",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100011677.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "15524",
          text: "\u0635\u0628\u0627 \u0686\u0648\u0628 sabachoob",
          title_fa: "\u0635\u0628\u0627 \u0686\u0648\u0628",
          title_en: "sabachoob",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100012732.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "15702",
          text: "\u0622\u0631\u062a \u0633\u0648\u0646 Art Seven",
          title_fa: "\u0622\u0631\u062a \u0633\u0648\u0646",
          title_en: "Art Seven",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100012916.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "16067",
          text: "\u0645\u0648\u0646\u062f\u0631\u06cc\u0627\u0646 Mondrian",
          title_fa: "\u0645\u0648\u0646\u062f\u0631\u06cc\u0627\u0646",
          title_en: "Mondrian",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100013283.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "16865",
          text: "\u06a9\u06cc\u0648\u0622\u0631\u06af\u0631\u0627\u0641\u06cc QRGraphy",
          title_fa: "\u06a9\u06cc\u0648\u0622\u0631\u06af\u0631\u0627\u0641\u06cc",
          title_en: "QRGraphy",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100014155.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "16906",
          text: "\u062f\u0627\u0646\u0698\u0647 Danje",
          title_fa: "\u062f\u0627\u0646\u0698\u0647",
          title_en: "Danje",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100014198.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "16911",
          text: "\u0633\u0627\u0644\u06cc \u0648\u0648\u062f Saliwood",
          title_fa: "\u0633\u0627\u0644\u06cc \u0648\u0648\u062f",
          title_en: "Saliwood",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100014203.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "17580",
          text: "\u067e\u0648\u06cc\u0627\u0646 \u06a9\u0627\u0644\u06a9\u0634\u0646 Pouyan Collection",
          title_fa: "\u067e\u0648\u06cc\u0627\u0646 \u06a9\u0627\u0644\u06a9\u0634\u0646",
          title_en: "Pouyan Collection",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/100014881.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "18371",
          text: "\u0628\u062a\u0627\u0628\u06cc Batabi",
          title_fa: "\u0628\u062a\u0627\u0628\u06cc",
          title_en: "Batabi",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/9cb35bdf4623ab241d4651d9ae8a776a88db70fe_1595254696.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "18838",
          text: "\u0631\u06cc\u0633\u0645\u0648\u0646\u0627 rismouna",
          title_fa: "\u0631\u06cc\u0633\u0645\u0648\u0646\u0627",
          title_en: "rismouna",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/07ff60d070cb75cfeb944d7d125380a74b79d2cf_1598078629.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "18944",
          text: "\u0622\u06cc\u0627\u0632 Ayaz",
          title_fa: "\u0622\u06cc\u0627\u0632",
          title_en: "Ayaz",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/e19c235c9aa920120c885a22a5523040c98ebb78_1598448532.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "19021",
          text: "\u0627\u0637\u0631\u0627\u0641 atraf",
          title_fa: "\u0627\u0637\u0631\u0627\u0641",
          title_en: "atraf",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/6f60f1dea5b0e5e7a145266ab8de23ad67ca1f2d_1599031287.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "20052",
          text: "\u0622\u0644\u0628\u0627\u062a\u0631\u0648\u0633 Albatross",
          title_fa: "\u0622\u0644\u0628\u0627\u062a\u0631\u0648\u0633",
          title_en: "Albatross",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/640827a5211bffdecf73b9e71aa8891cffa03ee9_1604743965.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "20449",
          text: "\u0627\u06cc\u062f\u0644\u06cc\u06a9 edelik",
          title_fa: "\u0627\u06cc\u062f\u0644\u06cc\u06a9",
          title_en: "edelik",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/f8098d4e061666655d3cd296b0f17632788040f8_1606203679.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "20536",
          text: "\u0627\u0650\u0644\u0650\u0646\u0633\u06cc Elenci",
          title_fa: "\u0627\u0650\u0644\u0650\u0646\u0633\u06cc",
          title_en: "Elenci",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/9925c7f0b113e5d6a0921fc6c995dff7174edbe4_1606719710.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "21234",
          text: "\u0644\u06cc\u062a lit",
          title_fa: "\u0644\u06cc\u062a",
          title_en: "lit",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/b573d8bcd810198128fa7f17516474664aaefb74_1609578340.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "21381",
          text: "\u062e\u0627\u0646\u0647 \u0634\u0646 SAND HOUSE",
          title_fa: "\u062e\u0627\u0646\u0647 \u0634\u0646",
          title_en: "SAND HOUSE",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/4d386aa6d953f50c61eb679f90654e0e5b4fa796_1610187341.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "21469",
          text: "\u0622\u0644\u062a\u06cc\u0646 \u0622\u06cc Altin Ay",
          title_fa: "\u0622\u0644\u062a\u06cc\u0646 \u0622\u06cc",
          title_en: "Altin Ay",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/a6c86c8f8041c53139af9f6be249b87f9b861b5e_1610453173.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "21885",
          text: "\u0633\u0631\u067e\u0648\u0633\u062a\u0631 sirposter",
          title_fa: "\u0633\u0631\u067e\u0648\u0633\u062a\u0631",
          title_en: "sirposter",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/172d7bb5f4280e0b652c71e14b70723ca7e5b0ac_1612346219.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "22439",
          text: "\u0628\u06cc\u0648\u0646\u062f \u0641\u0631\u06cc\u0645 Beyond Frame",
          title_fa: "\u0628\u06cc\u0648\u0646\u062f \u0641\u0631\u06cc\u0645",
          title_en: "Beyond Frame",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/652770b09763d78f91af520dabac6cfae17851c8_1615024833.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "22852",
          text: "\u0627\u0646 \u0627\u0633 \u062a\u06cc Nst",
          title_fa: "\u0627\u0646 \u0627\u0633 \u062a\u06cc",
          title_en: "Nst",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/c38cb5d15524c0bc7c48dfe2ab9d46c17873db2d_1618063230.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "23072",
          text: "\u067e\u0627\u0631\u0633\u0645\u0646 Parsman",
          title_fa: "\u067e\u0627\u0631\u0633\u0645\u0646",
          title_en: "Parsman",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/e3c6bdbadb2f6e714e6a6eb7d8b8d6718b0023e4_1618991866.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "23362",
          text: "\u0627\u0648\u0631\u06a9\u06cc\u062f orkid",
          title_fa: "\u0627\u0648\u0631\u06a9\u06cc\u062f",
          title_en: "orkid",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/e538ff9052cbc103880d2afad45e307b9d99eadd_1620206041.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "28869",
          text: "\u0631\u0627\u0648\u06cc\u062a\u0627 Ravita",
          title_fa: "\u0631\u0627\u0648\u06cc\u062a\u0627",
          title_en: "Ravita",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1205e4366f8378cc217c7928ea8224df8dac7001_1626172065.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "30130",
          text: "\u062f\u06a9\u0648\u0645\u0627\u062a\u0648\u0633 decomatus",
          title_fa: "\u062f\u06a9\u0648\u0645\u0627\u062a\u0648\u0633",
          title_en: "decomatus",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/8f219f883342595acf78dad6f2141e7140ed78f6_1733042620.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "30353",
          text: "\u062e\u0646\u062f\u0627\u0644\u0648 Khandaloo",
          title_fa: "\u062e\u0646\u062f\u0627\u0644\u0648",
          title_en: "Khandaloo",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/5d9b5578308c549562788cc984a35793605449cc_1633354803.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "30692",
          text: "\u0622\u0645\u0627\u062a\u06cc\u0633 Amatis",
          title_fa: "\u0622\u0645\u0627\u062a\u06cc\u0633",
          title_en: "Amatis",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/ae76e9ba5974318cbb8f7269f2b7f88150105185_1635258351.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "30858",
          text: "\u0647\u0641\u062a \u06af\u0631\u062f\u0648\u0646 \u062e\u06cc\u0627\u0644 haft gardun khial",
          title_fa: "\u0647\u0641\u062a \u06af\u0631\u062f\u0648\u0646 \u062e\u06cc\u0627\u0644",
          title_en: "haft gardun khial",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/aad46ad6d56dbc7c42b96adb448af12a5baca672_1636190604.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "31217",
          text: "\u062e\u0627\u0646 khan",
          title_fa: "\u062e\u0627\u0646",
          title_en: "khan",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/f0a0f00f14d26bd9230dd265b2c92f99a14339e4_1637741282.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "31435",
          text: "\u0644\u0648\u062d \u0645\u0633\u0631\u0648\u0631 Lohe Masrour",
          title_fa: "\u0644\u0648\u062d \u0645\u0633\u0631\u0648\u0631",
          title_en: "Lohe Masrour",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/4c0be35c286f4ae441ae7b98ba2af9eb1b27a0f2_1638968775.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "31924",
          text: "\u0628\u06a9\u0644\u06cc\u062a backlit",
          title_fa: "\u0628\u06a9\u0644\u06cc\u062a",
          title_en: "backlit",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/ae9d43eb9b867782ac96ae6c106af6ad6d52e82d_1641290506.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "31994",
          text: "\u0622\u062a\u0631\u06cc\u0633\u0627 atrisa",
          title_fa: "\u0622\u062a\u0631\u06cc\u0633\u0627",
          title_en: "atrisa",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/5d535310f9de472757fc8ba24ec3d696971782eb_1641716355.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "32013",
          text: "\u0633\u0627\u0646\u0627\u0632 \u0645\u0644\u06a9\u06cc sanaz maleki",
          title_fa: "\u0633\u0627\u0646\u0627\u0632 \u0645\u0644\u06a9\u06cc",
          title_en: "sanaz maleki",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/b8770c96a3dc496460d19c27120635e319cb1fa2_1641738775.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "32442",
          text: "\u0622\u0647\u0648\u0646 Ahoon",
          title_fa: "\u0622\u0647\u0648\u0646",
          title_en: "Ahoon",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/a1aef8fab6b50babc5637f3303712570ff017af7_1643611426.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "32525",
          text: "\u067e\u0627\u0631\u0644\u0627 \u06af\u0648\u0647\u0631 Parla Gohar",
          title_fa: "\u067e\u0627\u0631\u0644\u0627 \u06af\u0648\u0647\u0631",
          title_en: "Parla Gohar",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/50ffce0067582a4ee5e4ee04d78e2f3ddf6cbdb7_1644059418.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "32578",
          text: "\u0627\u0641\u0631\u0646\u062f afrand",
          title_fa: "\u0627\u0641\u0631\u0646\u062f",
          title_en: "afrand",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/54b8ffcd142fa47d72313994bbeacbe03c45aa92_1644154316.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "34672",
          text: "\u0633\u0627\u0646 \u0647\u0648\u0645 sunhome",
          title_fa: "\u0633\u0627\u0646 \u0647\u0648\u0645",
          title_en: "sunhome",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/38bca5591fde365d3c2e0c0cc528e88f143a627f_1658672199.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "34735",
          text: "\u0633\u062a\u0627\u0631\u0647 \u0645\u0646 my setare",
          title_fa: "\u0633\u062a\u0627\u0631\u0647 \u0645\u0646",
          title_en: "my setare",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/1df22ee0be2769bf17c0d43d0eed362bb80d4766_1659253701.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "34789",
          text: "\u0635\u0646\u0627\u06cc\u0639 \u0642\u0627\u0628 \u062a\u0648\u0633\u06a9\u0627 Tooska frame",
          title_fa: "\u0635\u0646\u0627\u06cc\u0639 \u0642\u0627\u0628 \u062a\u0648\u0633\u06a9\u0627",
          title_en: "Tooska frame",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/22a063f5448e2dacfc0ddbc375768f4fca44c744_1659548292.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "34805",
          text: "\u0645\u0627\u0646\u0627 \u0645\u0627\u06cc \u0645\u0631\u0632 MANA MY MARS",
          title_fa: "\u0645\u0627\u0646\u0627 \u0645\u0627\u06cc \u0645\u0631\u0632",
          title_en: "MANA MY MARS",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/102687c1b4834fe090ca35a640bf3e397f488b71_1659549616.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "35360",
          text: "\u0622\u0631\u062a\u06cc \u0641\u0631\u06cc\u0645 Arty FRAME",
          title_fa: "\u0622\u0631\u062a\u06cc \u0641\u0631\u06cc\u0645",
          title_en: "Arty FRAME",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/c510a1a64b7e5290726ed46cda2fcaf032285e88_1662991674.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "36616",
          text: "\u0686\u0627\u067e \u0628\u0647\u0627\u0631 chape bahar",
          title_fa: "\u0686\u0627\u067e \u0628\u0647\u0627\u0631",
          title_en: "chape bahar",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/85f5b8a981177c4cbd75347b363b1edf90d34611_1668869403.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "37478",
          text: "\u0632\u0631\u0645\u0627\u0646 ZARMAN",
          title_fa: "\u0632\u0631\u0645\u0627\u0646",
          title_en: "ZARMAN",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/727bc3fbddf0d5d54f14e0eb3c617f9c887a7a1a_1676213950.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "38093",
          text: "\u0633\u0644\u0646 \u0633\u0627\u06cc\u0646 Selen Sign",
          title_fa: "\u0633\u0644\u0646 \u0633\u0627\u06cc\u0646",
          title_en: "Selen Sign",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/7b8e5c252dacd4fb964823fd43f5d8bedaa80330_1682422993.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "38401",
          text: "\u0686 \u0646\u06cc\u06a9 chenik",
          title_fa: "\u0686 \u0646\u06cc\u06a9",
          title_en: "chenik",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/e75e76cbf0cc8256b83442e69cbd2168b869eca7_1684927285.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "38971",
          text: "\u0645\u0633\u06cc\u0646\u0648 8219 Mesino 8219",
          title_fa: "\u0645\u0633\u06cc\u0646\u0648 8219",
          title_en: "Mesino 8219",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/b6514cd27cadf58082149521de57fe1d65dc3a2f_1690015058.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "42947",
          text: "\u0628\u0648\u0631\u0628\u0648\u0631 Bourbour",
          title_fa: "\u0628\u0648\u0631\u0628\u0648\u0631",
          title_en: "Bourbour",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/6be64763738a25204ec67edf085033457046de87_1705228298.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "43113",
          text: "\u0627\u0648\u06cc\u06a9\u0646\u06cc\u0646\u06af \u0622\u0631\u062a awakening art",
          title_fa: "\u0627\u0648\u06cc\u06a9\u0646\u06cc\u0646\u06af \u0622\u0631\u062a",
          title_en: "awakening art",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/ab5e081b2eacc21e19bddfc7550b3785fd4de75c_1706372805.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "44044",
          text: "\u0633\u06cc\u0646\u0647 \u0633\u0631\u062e sine sorkh",
          title_fa: "\u0633\u06cc\u0646\u0647 \u0633\u0631\u062e",
          title_en: "sine sorkh",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/d7b7e622978d7299a58aeaf47046fe7843979847_1712479416.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "44238",
          text: "\u0646\u0648\u0631\u0648 \u0627\u0633\u062a\u0648\u0631 Noro Store",
          title_fa: "\u0646\u0648\u0631\u0648 \u0627\u0633\u062a\u0648\u0631",
          title_en: "Noro Store",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/d37a7e939b804659cfc1e6d88092a1b8ea8132d4_1713337811.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "44888",
          text: "\u0646\u0648\u0622\u0648\u0631\u0627\u0646 \u0642\u0627\u0628\u06cc\u0631\u0627\u0646 Noavarane Ghabiran",
          title_fa: "\u0646\u0648\u0622\u0648\u0631\u0627\u0646 \u0642\u0627\u0628\u06cc\u0631\u0627\u0646",
          title_en: "Noavarane Ghabiran",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/487401ce8c45955cf382810ac5072ba643ce6e41_1717333205.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "45571",
          text: "\u067e\u06cc\u0634\u062a\u0627\u0632 \u0646\u0648 \u0627\u0646\u062f\u06cc\u0634\u0627\u0646 \u0647\u0648\u0634\u0645\u0646\u062f \u0627\u0633\u067e\u0631\u0644\u0648\u0633 The pioneer of intelligent innovators of Sperlos",
          title_fa:
            "\u067e\u06cc\u0634\u062a\u0627\u0632 \u0646\u0648 \u0627\u0646\u062f\u06cc\u0634\u0627\u0646 \u0647\u0648\u0634\u0645\u0646\u062f \u0627\u0633\u067e\u0631\u0644\u0648\u0633",
          title_en: "The pioneer of intelligent innovators of Sperlos",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/ab983de8718119e10dc0af85c81bfec57adf1639_1719914549.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "45651",
          text: "\u0631\u0646\u0647\u0648\u0627 Renhua",
          title_fa: "\u0631\u0646\u0647\u0648\u0627",
          title_en: "Renhua",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/c254d4a188edd9bc5bf95618e58f15e0b062bedf_1720426841.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "46110",
          text: "\u0633\u0648\u0686 sooch",
          title_fa: "\u0633\u0648\u0686",
          title_en: "sooch",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/d6a901e789fbe953911300ac54cba40fe4e8c8fc_1722957456.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "48922",
          text: "\u0627\u0646\u062c\u0648\u06cc \u0648\u0648\u062f enjoythewood",
          title_fa: "\u0627\u0646\u062c\u0648\u06cc \u0648\u0648\u062f",
          title_en: "enjoythewood",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/b9a5232a157dc7adff16814fee02872343071e0b_1734527607.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "50733",
          text: "\u0644\u06cc\u0644\u06cc\u0627\u0646 Lilyan",
          title_fa: "\u0644\u06cc\u0644\u06cc\u0627\u0646",
          title_en: "Lilyan",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/bbc750ff2e085ff5f582abfe6f6937eafe2cc55b_1745229760.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "51271",
          text: "\u0646\u06cc\u067e \u0622\u0631\u062a nipart",
          title_fa: "\u0646\u06cc\u067e \u0622\u0631\u062a",
          title_en: "nipart",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/b4c1095124a0e18a1d1b4013a22c411a1aed6fb7_1749304199.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "52390",
          text: "\u063a\u0646\u0686\u0647 ghonche",
          title_fa: "\u063a\u0646\u0686\u0647",
          title_en: "ghonche",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/7da95370a16e363a275cc97fc6fc618111226e95_1758981130.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "52709",
          text: "\u0646\u0627\u0632 \u0637\u0644\u0627 \u0622\u0631\u0627 Naz tala ara",
          title_fa: "\u0646\u0627\u0632 \u0637\u0644\u0627 \u0622\u0631\u0627",
          title_en: "Naz tala ara",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/2a5099ab34d92a64fd36a7b2209da22ac85db1dc_1760523428.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "53534",
          text: "\u0622\u0631\u062a\u0644\u0646\u062f \u06af\u0631\u0648\u067e Artland Group",
          title_fa: "\u0622\u0631\u062a\u0644\u0646\u062f \u06af\u0631\u0648\u067e",
          title_en: "Artland Group",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/f7fbe583e0ba8b561690118f1239f745db0342c5_1765888944.jpg?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
        {
          id: "53661",
          text: "\u0627\u062f\u062f\u06cc \u0627\u0633\u062a\u0648\u062f\u06cc\u0648 EDDY STUDIO",
          title_fa: "\u0627\u062f\u062f\u06cc \u0627\u0633\u062a\u0648\u062f\u06cc\u0648",
          title_en: "EDDY STUDIO",
          logo_id:
            "https:\/\/dkstatics-public.digikala.com\/digikala-brands\/7f01849710771b9a20dbe6781eae40a7f20cfed1_1766495612.png?x-oss-process=image\/resize,m_lfit,h_80,w_80",
        },
      ],
      category_product_types: [
        { value: "24054", text: "\u0633\u0627\u062f\u0647" },
        { value: "24055", text: "\u0646\u0648\u0631\u06cc" },
      ],
      product_classes: [
        { value: "19", text: "\u0622\u0631\u062c\u06cc\u200c\u0628\u06cc RGB" },
        { value: "7", text: "\u0627\u0631\u06af\u0627\u0646\u06cc\u06a9 Organic" },
        { value: "21", text: "\u0628\u0627 \u0627\u0646\u0631\u0698\u06cc \u200cBA ENERGY" },
        { value: "2", text: "\u0628\u0627\u062f\u0648\u0627\u0645 Durable" },
        {
          value: "15",
          text: "\u0628\u062f\u0648\u0646 \u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 Aluminum Free",
        },
        { value: "16", text: "\u0628\u062f\u0648\u0646 \u0622\u0645\u0648\u0646\u06cc\u0627\u06a9 ammonia free" },
        { value: "17", text: "\u0628\u062f\u0648\u0646 \u0633\u0648\u0644\u0641\u0627\u062a sulfate free" },
        { value: "32", text: "\u062a\u062d\u0648\u06cc\u0644 \u06f4 \u0631\u0648\u0632\u0647 Delivery in 4 Days" },
        {
          value: "14",
          text: "\u062a\u0633\u06a9\u06cc\u0646\u200c\u062f\u0647\u0646\u062f\u0647 \u062f\u0631\u062f painkiller",
        },
        { value: "10", text: "\u062a\u0648\u0644\u06cc\u062f \u0645\u062d\u062f\u0648\u062f Limited Edition" },
        {
          value: "33",
          text: "\u062e\u0631\u06cc\u062f \u0641\u0642\u0637 \u0627\u0642\u0633\u0627\u0637\u06cc Just Credit",
        },
        {
          value: "25",
          text: "\u062f\u0631\u062c\u0647 \u0633\u062e\u062a\u06cc: \u0622\u0633\u0627\u0646 Difficulty: Easy",
        },
        { value: "23", text: "\u062f\u0631\u062c\u0647 \u0633\u062e\u062a\u06cc: \u0633\u062e\u062a Difficulty: Hard" },
        {
          value: "24",
          text: "\u062f\u0631\u062c\u0647 \u0633\u062e\u062a\u06cc: \u0645\u062a\u0648\u0633\u0637 Difficulty: Medium",
        },
        { value: "31", text: "\u062f\u0631\u0645\u0627\u0646 \u0631\u06cc\u0632\u0634 \u0645\u0648 Anti Hair Loss" },
        { value: "27", text: "\u0631\u0698\u06cc\u0645\u06cc Diet" },
        { value: "28", text: "\u0633\u0627\u0644 \u062a\u0648\u0644\u06cc\u062f P-Year" },
        { value: "11", text: "\u0633\u0627\u06cc\u0632 \u0628\u0632\u0631\u06af Plus Size" },
        { value: "4", text: "\u0633\u0631\u0648\u06cc\u0633 Service" },
        { value: "26", text: "\u063a\u0646\u06cc \u0634\u062f\u0647 Enriched" },
        { value: "30", text: "\u0641\u0627\u0642\u062f \u0686\u0631\u0628\u06cc Oil Free" },
        { value: "13", text: "\u0641\u0631\u0634 \u062f\u06cc\u062c\u06cc \u06a9\u0627\u0644\u0627 Fresh By Digikala" },
        { value: "6", text: "\u0641\u0644\u0647 Bunch" },
        { value: "1", text: "\u0645\u0627\u06cc\u0639\u0627\u062a Liquids" },
        {
          value: "20",
          text: "\u0645\u0628\u0644\u063a \u0642\u0627\u0628\u0644\u200c\u062a\u063a\u06cc\u06cc\u0631 \u0627\u0633\u062a eGift",
        },
        { value: "3", text: "\u0645\u0635\u0631\u0641\u06cc Consumable" },
        { value: "5", text: "\u0645\u0635\u0631\u0641\u06cc \u0628\u0627\u062f\u0648\u0627\u0645 Durable Consumable" },
        { value: "12", text: "\u0645\u0646\u0627\u0633\u0628 \u0644\u0627\u063a\u0631\u06cc weight loss" },
        { value: "8", text: "\u0645\u0646\u062c\u0645\u062f Frozen" },
        { value: "22", text: "\u0646\u0635\u0628 \u062f\u0631 \u0645\u062d\u0644 On-Site Installation" },
        { value: "9", text: "\u0647\u0627\u06cc \u06a9\u067e\u06cc high copy" },
        { value: "29", text: "\u06a9\u0627\u0631\u06a9\u0631\u062f\u0647 Used" },
        { value: "42", text: "\u06af\u0627\u0644\u0631\u06cc    \u0631\u0633\u0645\u06cc Verified    Gallery" },
        { value: "41", text: "\u06af\u0627\u0644\u0631\u06cc  \u0631\u0633\u0645\u06cc Verified  Gallery" },
        { value: "43", text: "\u06af\u0627\u0644\u0631\u06cc \u0631\u0633\u0645\u06cc Verified Gallery" },
        { value: "34", text: "\u06af\u0627\u0644\u0631\u06cc\u200c   \u0631\u0633\u0645\u06cc Verified   Gallery" },
        { value: "18", text: "\u06af\u06cc\u0645\u06cc\u0646\u06af Gaming" },
      ],
      divisions: [
        { value: "4928", text: "\u062a\u0627\u0628\u0644\u0648" },
        { value: "9657", text: "\u062a\u0627\u0628\u0644\u0648 \u0646\u0648\u0631\u06cc" },
        { value: "9655", text: "\u062a\u0627\u0628\u0644\u0648 \u067e\u0627\u0632\u0644" },
      ],
      guideline: {
        category_selection: {
          video: null,
          short_description:
            "\u0628\u0631\u0627\u06cc \u0627\u0646\u062a\u062e\u0627\u0628 \u06af\u0631\u0648\u0647\u060c \u0644\u0637\u0641\u0627 \u0646\u0645\u0648\u0646\u0647 \u0645\u0634\u0627\u0628\u0647 \u06a9\u0627\u0644\u0627\u06cc \u062e\u0648\u062f \u0631\u0627 \u062f\u0631 \u0633\u0627\u06cc\u062a \u062f\u06cc\u062c\u06cc\u06a9\u0627\u0644\u0627 \u062c\u0633\u062a \u0648 \u062c\u0648 \u06a9\u0646\u06cc\u062f \u0648 \u0686\u0646\u0627\u0646\u0686\u0647 \u06a9\u0627\u0644\u0627\u06cc \u06cc\u0627\u0641\u062a \u0634\u062f\u0647 \u0628\u0627 \u06a9\u0627\u0644\u0627\u06cc\u06cc \u06a9\u0647 \u0642\u0635\u062f \u062f\u0631\u062c \u0622\u0646 \u0631\u0627 \u062f\u0627\u0631\u06cc\u062f \u06cc\u06a9\u0633\u0627\u0646 \u0628\u0648\u062f\u060c \u0647\u0645\u0627\u0646 \u06af\u0631\u0648\u0647 \u0631\u0627 \u0628\u0631\u0627\u06cc \u062f\u0631\u062c \u06a9\u0627\u0644\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f.",
        },
        product_info: {
          video: null,
          short_description: "",
          items: [
            {
              title: "\u0646\u0634\u0627\u0646 \u063a\u06cc\u0631\u0627\u0635\u0644",
              content:
                "\u003Cp\u003E\u0627\u0635\u0627\u0644\u062a \u06a9\u0627\u0644\u0627 (\u0646\u0634\u0627\u0646 \u063a\u06cc\u0631 \u0627\u0635\u0644): \u0627\u06af\u0631 \u0631\u0648\u06cc \u06a9\u0627\u0644\u0627 \u0628\u0631\u0646\u062f\u06cc \u0648\u062c\u0648\u062f \u062f\u0627\u0631\u062f \u06a9\u0647 \u0622\u0646 \u0645\u062d\u0635\u0648\u0644 \u062a\u0648\u0633\u0637 \u0622\u0646 \u0628\u0631\u0646\u062f \u062a\u0648\u0644\u06cc\u062f \u0646\u0634\u062f\u0647 \u0627\u0633\u062a\u060c \u0628\u0627\u06cc\u062f \u0627\u0632 \u0646\u0634\u0627\u0646 \u063a\u06cc\u0631 \u0627\u0635\u0644 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0646\u06cc\u062f. \u0627\u06af\u0631\u0631\u0648\u06cc \u06a9\u0627\u0644\u0627 \u0647\u06cc\u0686 \u0628\u0631\u0646\u062f\u06cc \u0648\u062c\u0648\u062f \u0646\u062f\u0627\u0631\u062f\u060c \u0646\u0628\u0627\u06cc\u062f \u0627\u0632 \u0646\u0634\u0627\u0646 \u063a\u06cc\u0631 \u0627\u0635\u0644 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0631\u062f \u0648 \u0645\u062d\u0635\u0648\u0644 \u0631\u0627 \u0628\u0627 \u0628\u0631\u0646\u062f \u0645\u062a\u0641\u0631\u0642\u0647 \u062f\u0631\u062c \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n1- \u0627\u06af\u0631 \u0645\u062d\u0635\u0648\u0644 \u063a\u06cc\u0631\u0627\u0635\u0644 \u0627\u0633\u062a \u0648 \u0627\u0632 \u0646\u0634\u0627\u0646 \u063a\u06cc\u0631 \u0627\u0635\u0644 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0645\u06cc\u0026zwnj;\u06a9\u0646\u06cc\u062f\u060c \u0646\u0628\u0627\u06cc\u062f \u0647\u06cc\u0686 \u0628\u0631\u0646\u062f\u06cc \u062f\u0631 \u0639\u0646\u0648\u0627\u0646 \u06a9\u0627\u0644\u0627 \u0630\u06a9\u0631 \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n2- \u0627\u06af\u0631 \u06a9\u0627\u0644\u0627\u06cc\u06cc \u0646\u0634\u0627\u0646 \u063a\u06cc\u0631 \u0627\u0635\u0644 \u0646\u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f \u0628\u0647 \u0645\u0639\u0646\u0627\u06cc \u0627\u06cc\u0646 \u0627\u0633\u062a \u06a9\u0647 \u0622\u0646 \u06a9\u0627\u0644\u0627 \u0627\u0635\u0644 \u0648 \u062a\u0648\u0644\u06cc\u062f \u0634\u062f\u0647 \u062a\u0648\u0633\u0637 \u0622\u0646 \u0628\u0631\u0646\u062f \u0627\u0633\u062a. \u0627\u06af\u0631 \u0631\u0648\u06cc \u0627\u06cc\u0646 \u06a9\u0627\u0644\u0627\u060c \u06a9\u0627\u0644\u0627\u06cc \u0641\u06cc\u06a9 \u0628\u0641\u0631\u0648\u0634\u06cc\u062f\u060c \u0645\u0634\u0645\u0648\u0644 \u062c\u0631\u06cc\u0645\u0647 \u062e\u0648\u0627\u0647\u06cc\u062f \u0634\u062f. \u0628\u0631\u0627\u06cc \u0627\u0637\u0644\u0627\u0639 \u0628\u06cc\u0634\u062a\u0631 \u0628\u0647 \u0627\u06cc\u0646 \u003Ca href=\u0022https:\/\/selleracademy.digikala.com\/%D9%81%D8%B1%D9%88%D8%B4-%DA%A9%D8%A7%D9%84%D8%A7%DB%8C-%D8%BA%DB%8C%D8%B1%D8%A7%D8%B5%D9%84-%D8%AF%D8%B1-%D8%AF%DB%8C%D8%AC%DB%8C%e2%80%8c%DA%A9%D8%A7%D9%84%D8%A7\/\u0022 target=\u0022_blank\u0022\u003E\u0644\u06cc\u0646\u06a9\u003C\/a\u003E \u0645\u0631\u0627\u062c\u0639\u0647 \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n\u0026nbsp;\u003C\/p\u003E",
            },
            {
              title: "\u0628\u0631\u0646\u062f \u06a9\u0627\u0644\u0627",
              content:
                "\u003Cp\u003E\u0627\u0637\u0645\u06cc\u0646\u0627\u0646 \u062d\u0627\u0635\u0644 \u06a9\u0646\u06cc\u062f \u06a9\u0647 \u0628\u0631\u0646\u062f \u0627\u0646\u062a\u062e\u0627\u0628 \u0634\u062f\u0647 \u062f\u0631 \u0641\u06cc\u0644\u062f \u0628\u0631\u0646\u062f\u060c \u062f\u0642\u06cc\u0642\u0627 \u0628\u0631\u0646\u062f \u06a9\u0627\u0644\u0627\u06cc\u06cc \u0627\u0633\u062a \u06a9\u0647 \u0642\u0635\u062f \u0641\u0631\u0648\u0634 \u0622\u0646 \u0631\u0627 \u062f\u0627\u0631\u06cc\u062f. \u0628\u0631\u0646\u062f \u0645\u0648\u0631\u062f \u0646\u0638\u0631 \u0634\u0645\u0627 \u0628\u0627\u06cc\u062f \u062f\u0631 \u0647\u0645\u0627\u0646 \u06af\u0631\u0648\u0647 \u06a9\u0627\u0644\u0627\u06cc\u06cc \u06a9\u0647 \u0642\u0635\u062f \u062f\u0631\u062c \u06a9\u0627\u0644\u0627 \u0631\u0627 \u062f\u0627\u0631\u06cc\u062f\u060c \u062b\u0628\u062a \u0634\u062f\u0647 \u0628\u0627\u0634\u062f.\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n\u0627\u06af\u0631 \u0628\u0631\u0646\u062f\u06cc \u0628\u0631\u0627\u06cc \u06a9\u0627\u0644\u0627\u06cc \u062e\u0648\u062f \u0627\u0646\u062a\u062e\u0627\u0628 \u0645\u06cc \u06a9\u0646\u06cc\u062f\u060c \u0622\u0646 \u0628\u0631\u0646\u062f \u0628\u0627\u06cc\u062f \u0631\u0648\u06cc \u062d\u062f\u0627\u0642\u0644 \u06cc\u06a9\u06cc \u0627\u0632 \u062a\u0635\u0627\u0648\u06cc\u0631 \u06a9\u0627\u0644\u0627 \u062f\u0631\u062a\u0635\u0627\u0648\u06cc\u0631\u0622\u0644\u0628\u0648\u0645 \u0648\u062c\u0648\u062f \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f\u060c \u0686\u0646\u0627\u0646\u0686\u0647 \u062f\u0631 \u062a\u0635\u0627\u0648\u06cc\u0631 \u06a9\u0627\u0644\u0627 \u0628\u0631\u0646\u062f \u062f\u06cc\u062f\u0647 \u0646\u0634\u0648\u062f \u0648 \u0634\u0645\u0627 \u062f\u0631 \u0641\u06cc\u0644\u062f \u0628\u0631\u0646\u062f\u060c \u0628\u0631\u0646\u062f\u06cc \u0628\u0631\u0627\u06cc \u06a9\u0627\u0644\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0631\u062f\u0647 \u0628\u0627\u0634\u06cc\u062f\u060c \u06a9\u0627\u0644\u0627 \u0631\u062f \u0645\u06cc \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n\u0627\u06af\u0631 \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u062a\u0648\u0644\u06cc\u062f \u0634\u062f\u0647 \u062a\u0648\u0633\u0637 \u0628\u0631\u0646\u062f \u0627\u0635\u0644\u06cc \u0627\u0633\u062a\u060c \u0628\u0627\u06cc\u062f \u0628\u0631\u0646\u062f \u0645\u062d\u0635\u0648\u0644 \u0631\u0627 \u062f\u0631 \u0641\u06cc\u0644\u062f \u0628\u0631\u0646\u062f \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f \u0627\u06af\u0631 \u0628\u0631\u0646\u062f \u0634\u0645\u0627 \u062f\u0631 \u0644\u06cc\u0633\u062a \u0628\u0631\u0646\u062f\u0647\u0627\u06cc \u0645\u0648\u062c\u0648\u062f \u0646\u0628\u0648\u062f \u06af\u0632\u06cc\u0646\u0647 \u062f\u0631\u062e\u0648\u0627\u0633\u062a \u0627\u06cc\u062c\u0627\u062f \u0628\u0631\u0646\u062f \u062c\u062f\u06cc\u062f \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f \u0648 \u0627\u0642\u062f\u0627\u0645 \u0628\u0647 \u062b\u0628\u062a \u0628\u0631\u0646\u062f \u062e\u0648\u062f \u06a9\u0646\u06cc\u062f. \u0622\u0645\u0648\u0632\u0634 \u062f\u0631\u062e\u0648\u0627\u0633\u062a \u0628\u0631\u0646\u062f \u062c\u062f\u06cc\u062f \u062f\u0631 \u0627\u06cc\u0646 \u003Ca href=\u0022https:\/\/selleracademy.digikala.com\/%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%D8%A7%DB%8C%D8%AC%D8%A7%D8%AF-%D8%A8%D8%B1%D9%86%D8%AF\/\u0022 target=\u0022_blank\u0022\u003E\u0644\u06cc\u0646\u06a9\u003C\/a\u003E \u0645\u0648\u062c\u0648\u062f \u0627\u0633\u062a.\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n\u0627\u06af\u0631 \u0631\u0648\u06cc \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u0647\u06cc\u0686 \u0628\u0631\u0646\u062f\u06cc \u0648\u062c\u0648\u062f \u0646\u062f\u0627\u0631\u062f\u060c \u0628\u0627\u06cc\u062f \u0628\u0631\u0646\u062f \u0026quot;\u0645\u062a\u0641\u0631\u0642\u0647\u0026quot; \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f.\u003C\/p\u003E",
            },
            {
              title: "\u0646\u0648\u0639 \u06a9\u0627\u0644\u0627",
              content:
                "\u003Cp\u003E\u062f\u0631 \u0647\u0646\u06af\u0627\u0645 \u0627\u0646\u062a\u062e\u0627\u0628 \u0646\u0648\u0639 \u06a9\u0627\u0644\u0627 \u062a\u0646\u0647\u0627 \u0645\u0648\u0627\u0631\u062f\u06cc \u0631\u0648 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f \u06a9\u0647 \u0628\u0647 \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u0645\u0631\u0628\u0648\u0637 \u0627\u0633\u062a. \u0627\u06af\u0631 \u0645\u0648\u0627\u0631\u062f \u0628\u06cc \u0631\u0628\u0637 \u0628\u0647 \u06a9\u0627\u0644\u0627 \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f \u06a9\u0627\u0644\u0627 \u0631\u062f \u0645\u06cc \u0634\u0648\u062f.\u003C\/p\u003E",
            },
            {
              title: "\u0645\u062f\u0644 \u06a9\u0627\u0644\u0627",
              content:
                "\u003Cp\u003E\u0627\u0632 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a \u062f\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0646\u0627\u0645\u06af\u0630\u0627\u0631\u06cc \u062e\u0648\u062f\u06a9\u0627\u0631 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0645\u06cc \u0634\u0648\u062f.\u062d\u062a\u0645\u0627 \u062f\u0642\u062a \u06a9\u0646\u06cc\u062f \u0627\u06af\u0631 \u0631\u0648\u06cc \u06a9\u0627\u0644\u0627 \u06cc\u0627 \u0628\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u0645\u062f\u0644\u06cc \u0648\u062c\u0648\u062f \u062f\u0627\u0631\u062f\u060c \u0628\u0627\u06cc\u062f \u062f\u0642\u06cc\u0642\u0627 \u0647\u0645\u0627\u0646 \u0645\u062f\u0644 \u062f\u0631 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a \u0648 \u0639\u0646\u0648\u0627\u0646 \u06a9\u0627\u0644\u0627 \u0646\u0648\u0634\u062a\u0647 \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n\u0644\u0637\u0641\u0627 \u062a\u0648\u062c\u0647 \u06a9\u0646\u06cc\u062f \u0627\u06af\u0631 \u0645\u0648\u0627\u0631\u062f \u0632\u06cc\u0631 \u0631\u0627 \u062f\u0631 \u0642\u0633\u0645\u062a \u0645\u062f\u0644 \u06a9\u0627\u0644\u0627 \u0631\u0639\u0627\u06cc\u062a \u0646\u06a9\u0646\u06cc\u062f \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u0631\u062f \u0645\u06cc \u0634\u0648\u062f:\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n1- \u062f\u0631 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a \u0628\u0647 \u0647\u06cc\u0686 \u0639\u0646\u0648\u0627\u0646 \u06a9\u0644\u0645\u0647 \u0026quot;\u0645\u062f\u0644\u0026quot; \u0631\u0627 \u0646\u0646\u0648\u06cc\u0633\u06cc\u062f. (\u06a9\u0644\u0645\u0647 \u0645\u062f\u0644 \u062f\u0631 \u0639\u0646\u0648\u0627\u0646 \u067e\u06cc\u0634\u0646\u0647\u0627\u062f\u06cc \u0628\u0647 \u0635\u0648\u0631\u062a \u062e\u0648\u062f\u06a9\u0627\u0631 \u0627\u0636\u0627\u0641\u0647 \u062e\u0648\u0627\u0647\u062f \u0634\u062f)\u003Cbr \/\u003E\r\n2- \u0627\u06af\u0631 \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u062f\u0627\u0631\u0627\u06cc \u0645\u062f\u0644\u060c \u06a9\u062f \u0648 \u0633\u0631\u06cc \u0628\u0648\u062f \u0627\u0628\u062a\u062f\u0627 \u062a\u0646\u0647\u0627 \u0645\u062f\u0644 \u06a9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0646\u0648\u06cc\u0633\u06cc\u062f \u0648 \u0633\u067e\u0633 \u0628\u0627 \u0630\u06a9\u0631 \u06a9\u0644\u0645\u0627\u062a \u06a9\u062f \u0648 \u0633\u0631\u06cc\u060c \u06a9\u062f \u0648 \u0633\u0631\u06cc \u06a9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0646\u0648\u06cc\u0633\u06cc\u062f.\u003Cbr \/\u003E\r\n\u0645\u062b\u0627\u0644:\u003Cbr \/\u003E\r\n\u0639\u0646\u0648\u0627\u0646 \u06a9\u0627\u0644\u0627:\u003Cbr \/\u003E\r\n\u0639\u06cc\u0646\u06a9 \u0622\u0641\u062a\u0627\u0628\u06cc \u0631\u06cc \u0628\u0646 \u0645\u062f\u0644 01 \u06a9\u062f 02 \u0633\u0631\u06cc 03\u003Cbr \/\u003E\r\n\u0686\u06cc\u0632\u06cc \u06a9\u0647 \u0628\u0627\u06cc\u062f \u062f\u0631 \u0642\u0633\u0645\u062a \u0645\u062f\u0644 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f:\u003Cbr \/\u003E\r\n01 \u06a9\u062f 02 \u0633\u0631\u06cc 03\u003Cbr \/\u003E\r\n\u0026nbsp;\u003C\/p\u003E",
            },
            {
              title: "\u062f\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u06a9\u0627\u0644\u0627",
              content:
                "\u003Cp\u003E\u062f\u0631 \u06af\u0627\u0645 \u062f\u0648\u0645 \u062f\u0631\u062c \u06a9\u0627\u0644\u0627\u060c \u0642\u0633\u0645\u062a \u062f\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u0645\u0631\u0628\u0648\u0637 \u0628\u0647 \u0645\u0627\u0647\u06cc\u062a \u06a9\u0627\u0644\u0627 \u062f\u0631 \u0639\u0646\u0648\u0627\u0646 \u06a9\u0627\u0644\u0627 \u0627\u0633\u062a.\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n\u0627\u06af\u0631 \u062f\u0631 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a \u0645\u0627\u0647\u06cc\u062a \u06a9\u0627\u0644\u0627\u06cc \u062e\u0648\u062f \u0631\u0627 \u067e\u06cc\u062f\u0627 \u0646\u06a9\u0631\u062f\u06cc\u062f\u060c \u062f\u0631\u062e\u0648\u0627\u0633\u062a \u0627\u0636\u0627\u0641\u0647 \u0634\u062f\u0646 \u0627\u06cc\u0646 \u062f\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u0631\u0627 \u0628\u0627 \u062b\u0628\u062a \u062a\u06cc\u06a9\u062a \u0627\u0632 \u0637\u0631\u06cc\u0642 \u0641\u0631\u0645 \u0026quot;\u062a\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627\u0026quot; \u0628\u0631\u0627\u06cc \u0648\u0627\u062d\u062f LQA \u0627\u0631\u0633\u0627\u0644 \u06a9\u0646\u06cc\u062f.\u003C\/p\u003E",
            },
            {
              title:
                "\u0627\u0628\u0639\u0627\u062f \u0648 \u0648\u0632\u0646 \u0628\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc",
              content:
                "\u003Cp\u003E\u062f\u0631 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a \u0634\u0645\u0627 \u0628\u0627\u06cc\u062f \u0627\u0628\u0639\u0627\u062f \u0628\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u06a9\u0627\u0644\u0627 \u0631\u0627 \u06a9\u0647 \u0642\u0631\u0627\u0631 \u0627\u0633\u062a \u0628\u0647 \u0627\u0646\u0628\u0627\u0631 \u0627\u0631\u0633\u0627\u0644 \u0634\u0648\u062f\u060c \u0628\u0647 \u0633\u0627\u0646\u062a\u06cc \u0645\u062a\u0631 \u0648 \u0647\u0645\u0686\u0646\u06cc\u0646 \u0648\u0632\u0646 \u06a9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0627\u06cc\u062f \u0628\u0647 \u06af\u0631\u0645 \u0628\u0646\u0648\u06cc\u0633\u06cc\u062f.\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n\u0627\u0628\u0639\u0627\u062f \u0648 \u0648\u0632\u0646 \u062f\u0631 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a\u060c \u0631\u0648\u06cc \u0633\u0627\u06cc\u062a \u0646\u0645\u0627\u06cc\u0634 \u062f\u0627\u062f\u0647 \u0646\u0645\u06cc \u0634\u0648\u062f \u0648 \u062a\u0646\u0647\u0627 \u0628\u0631\u0627\u06cc \u0627\u0646\u0628\u0627\u0631 \u0642\u0627\u0628\u0644 \u0645\u0634\u0627\u0647\u062f\u0647 \u0627\u0633\u062a.\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n\u062d\u062a\u0645\u0627 \u062f\u0642\u062a \u06a9\u0646\u06cc\u062f \u06a9\u0647 \u0627\u0628\u0639\u0627\u062f \u0648 \u0648\u0632\u0646 \u0628\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u0631\u0627 \u0628\u0647 \u062f\u0631\u0633\u062a\u06cc \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n\u0026nbsp;\u003C\/p\u003E",
            },
            {
              title: "\u0634\u0631\u062d \u06a9\u0627\u0644\u0627",
              content:
                "\u003Cp\u003E\u0627\u06af\u0631 \u062a\u0645\u0627\u06cc\u0644\u06cc \u0646\u062f\u0627\u0631\u06cc\u062f \u0628\u0631\u0627\u06cc \u06a9\u0627\u0644\u0627\u06cc \u062e\u0648\u062f \u0634\u0631\u062d \u0628\u0646\u0648\u06cc\u0633\u06cc\u062f \u062f\u0631 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a \u0627\u0635\u0644\u0627 \u0686\u06cc\u0632\u06cc \u0646\u0646\u0648\u06cc\u0633\u06cc\u062f. \u0627\u0645\u0627 \u0627\u06af\u0631 \u0642\u0635\u062f \u062f\u0627\u0631\u06cc\u062f \u0628\u0631\u0627\u06cc \u06a9\u0627\u0644\u0627 \u0634\u0631\u062d \u0628\u0646\u0648\u06cc\u0633\u06cc\u062f \u0628\u0627\u06cc\u062f \u0646\u06a9\u0627\u062a \u0632\u06cc\u0631 \u0631\u0627 \u0631\u0639\u0627\u06cc\u062a \u06a9\u0646\u06cc\u062f\u060c \u062f\u0631 \u063a\u06cc\u0631 \u0627\u06cc\u0646 \u0635\u0648\u0631\u062a \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u0631\u062f \u062e\u0648\u0627\u0647\u062f \u0634\u062f.\u003Cbr \/\u003E\r\n\u0644\u0637\u0641\u0627 \u062a\u0648\u062c\u0647 \u06a9\u0646\u06cc\u062f \u0627\u06af\u0631 \u0645\u0648\u0627\u0631\u062f \u0632\u06cc\u0631 \u0631\u0627 \u062f\u0631\u0634\u0631\u062d \u06a9\u0627\u0644\u0627 \u0631\u0639\u0627\u06cc\u062a \u0646\u06a9\u0646\u06cc\u062f \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u0631\u062f \u0645\u06cc \u0634\u0648\u062f:\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n1- \u062f\u0631 \u0634\u0631\u062d \u06a9\u0627\u0644\u0627 \u0646\u0628\u0627\u06cc\u062f \u0646\u0627\u0645 \u0641\u0631\u0648\u0634\u06af\u0627\u0647\u060c \u0642\u06cc\u0645\u062a\u060c \u06af\u0627\u0631\u0627\u0646\u062a\u06cc\u060c \u0636\u0645\u0627\u0646\u062a \u0646\u0627\u0645\u0647 \u0648 \u0646\u0627\u0645 \u0628\u0631\u0646\u062f \u0646\u0627\u0645\u0631\u062a\u0628\u0637 \u0628\u0647 \u06a9\u0627\u0644\u0627\u06cc \u062e\u0648\u062f \u0631\u0627 \u0628\u0646\u0648\u06cc\u0633\u06cc\u062f.\u003Cbr \/\u003E\r\n2- \u0627\u0645\u0644\u0627 \u0648 \u0646\u06af\u0627\u0631\u0634 \u06a9\u0644\u0645\u0627\u062a \u0628\u0627\u06cc\u062f \u0635\u062d\u06cc\u062d \u0628\u0627\u0634\u062f \u0648 \u0647\u06cc\u0686 \u063a\u0644\u0637 \u0627\u0645\u0644\u0627\u06cc\u06cc \u062f\u0631 \u0622\u0646 \u0648\u062c\u0648\u062f \u0646\u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f.\u003Cbr \/\u003E\r\n3- \u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0645\u0648\u062c\u0648\u062f \u062f\u0631 \u0634\u0631\u062d \u06a9\u0627\u0644\u0627 \u0646\u0628\u0627\u06cc\u062f \u0628\u0627 \u0645\u0634\u062e\u0635\u0627\u062a \u0648 \u0648\u06cc\u0698\u06af\u06cc\u0026zwnj;\u0647\u0627\u06cc \u06a9\u0627\u0644\u0627 \u0645\u063a\u0627\u06cc\u0631\u062a \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f.\u003Cbr \/\u003E\r\n4- \u062f\u0631 \u0634\u0631\u062d \u0646\u0648\u06cc\u0633\u06cc \u0628\u0627\u06cc\u062f \u0627\u0632 \u062c\u0645\u0644\u0627\u062a \u067e\u06cc\u0648\u0633\u062a\u0647 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0646\u06cc\u062f \u0648 \u0627\u06af\u0631 \u0627\u0632 \u0639\u0628\u0627\u0631\u062a \u0647\u0627\u06cc \u06a9\u0648\u062a\u0627\u0647 \u062f\u0631 \u0647\u0631 \u0633\u0637\u0631 \u0628\u0627 \u0639\u0644\u0627\u0645\u062a \u06af\u0630\u0627\u0631\u06cc (\u0634\u0645\u0627\u0631\u0647\u060c \u0646\u0642\u0637\u0647\u060c\u062e\u0637 \u0641\u0627\u0635\u0644\u0647) \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0646\u06cc\u062f \u06a9\u0627\u0644\u0627 \u0628\u0647 \u062f\u0644\u06cc\u0644 \u0634\u0631\u062d \u0646\u0627\u0645\u0646\u0627\u0633\u0628 \u0631\u062f \u062e\u0648\u0627\u0647\u062f \u0634\u062f.\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n\u0628\u0631\u0627\u06cc \u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0628\u06cc\u0634\u062a\u0631 \u062f\u0631 \u0628\u0627\u0631\u0647\u0026zwnj;\u06cc \u0646\u062d\u0648\u0647\u0026zwnj;\u06cc \u062f\u0631\u0633\u062a \u0646\u06af\u0627\u0631\u0634 \u0634\u0631\u062d \u06a9\u0627\u0644\u0627 \u0628\u0647 \u0644\u06cc\u0646\u06a9 \u0632\u06cc\u0631 \u0645\u0631\u0627\u062c\u0639\u0647 \u06a9\u0646\u06cc\u062f:\u003Cbr \/\u003E\r\n\u003Ca href=\u0022https:\/\/selleracademy.digikala.com\/%DA%86%DA%AF%D9%88%D9%86%D9%87-%D8%B4%D8%B1%D8%AD-%DA%A9%D8%A7%D9%84%D8%A7-%D8%A8%D9%86%D9%88%DB%8C%D8%B3%DB%8C%D9%85\/\u0022 target=\u0022_blank\u0022\u003E\u0631\u0627\u0628\u0637\u0647\u0026zwnj;\u06cc \u06cc\u06a9 \u0634\u0631\u062d \u062e\u0648\u0628 \u0628\u0627 \u0641\u0631\u0648\u0634 \u06a9\u0627\u0644\u0627 (\u0686\u06af\u0648\u0646\u0647 \u0634\u0631\u062d \u0628\u0646\u0648\u06cc\u0633\u06cc\u0645\u061f\u003C\/a\u003E)\u003C\/p\u003E",
            },
            {
              title: "\u0646\u0642\u0627\u0637 \u0636\u0639\u0641 \u0648 \u0642\u0648\u062a \u06a9\u0627\u0644\u0627",
              content:
                "\u003Cp\u003E\u0627\u06af\u0631 \u062a\u0645\u0627\u06cc\u0644\u06cc \u0646\u062f\u0627\u0631\u06cc\u062f \u0628\u0631\u0627\u06cc \u06a9\u0627\u0644\u0627\u06cc \u062e\u0648\u062f \u0646\u0642\u0627\u0637 \u0636\u0639\u0641 \u0648 \u0642\u0648\u062a \u0628\u0646\u0648\u06cc\u0633\u06cc\u062f \u062f\u0631 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a \u0627\u0635\u0644\u0627 \u0686\u06cc\u0632\u06cc \u0646\u0646\u0648\u06cc\u0633\u06cc\u062f. \u0627\u0645\u0627 \u0627\u06af\u0631 \u0642\u0635\u062f \u062f\u0627\u0631\u06cc\u062f \u0628\u0631\u0627\u06cc \u06a9\u0627\u0644\u0627 \u0646\u0642\u0627\u0637 \u0636\u0639\u0641 \u0648 \u0642\u0648\u062a \u0628\u0646\u0648\u06cc\u0633\u06cc\u062f \u0628\u0627\u06cc\u062f \u0646\u06a9\u0627\u062a \u0632\u06cc\u0631 \u0631\u0627 \u0631\u0639\u0627\u06cc\u062a \u06a9\u0646\u06cc\u062f\u060c \u062f\u0631 \u063a\u06cc\u0631 \u0627\u06cc\u0646 \u0635\u0648\u0631\u062a \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u0631\u062f \u062e\u0648\u0627\u0647\u062f \u0634\u062f:\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n1- \u062f\u0631 \u0646\u0642\u0627\u0637 \u0642\u0648\u062a \u0648 \u0646\u0642\u0627\u0637 \u0636\u0639\u0641 \u0628\u0627\u06cc\u062f \u0627\u0632 \u0639\u0628\u0627\u0631\u062a\u0026zwnj;\u0647\u0627\u06cc \u0628\u062f\u0648\u0646 \u0641\u0639\u0644 \u0648 \u06a9\u0648\u062a\u0627\u0647 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0646\u06cc\u062f. (\u0645\u0627\u0646\u0646\u062f: \u0648\u0632\u0646 \u06a9\u0645\u060c \u0641\u0644\u0632\u06cc\u060c \u0637\u0648\u0644 \u0639\u0645\u0631 \u0628\u0627\u0644\u0627\u06cc \u0628\u0627\u062a\u0631\u06cc \u0648 \u0026hellip;)\u003Cbr \/\u003E\r\n2- \u0642\u0628\u0644 \u0648 \u0628\u0639\u062f \u0627\u0632 \u062c\u0645\u0644\u0647 \u0646\u0628\u0627\u06cc\u062f \u0627\u0632 \u0639\u0644\u0627\u0645\u062a (\u0646\u0642\u0637\u0647 \u060c \u062e\u0637 \u0641\u0627\u0635\u0644\u0647 \u0648\u0026hellip;) \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n3- \u062f\u0631 \u0646\u0642\u0627\u0637 \u0642\u0648\u062a \u0648 \u0646\u0642\u0627\u0637 \u0636\u0639\u0641 \u0646\u0628\u0627\u06cc\u062f \u0627\u0632 \u0646\u0648\u0639 \u06af\u0627\u0631\u0627\u0646\u062a\u06cc \u0648 \u0642\u06cc\u0645\u062a \u06a9\u0627\u0644\u0627 \u0635\u062d\u0628\u062a \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n4- \u0646\u0642\u0627\u0637 \u0642\u0648\u062a \u0648 \u0646\u0642\u0627\u0637 \u0636\u0639\u0641 \u0646\u0628\u0627\u06cc\u062f \u0633\u0644\u06cc\u0642\u0647\u0026zwnj;\u0627\u06cc \u0628\u0627\u0634\u062f\u060c \u0628\u0647\u0026zwnj; \u0639\u0646\u0648\u0627\u0646 \u0645\u062b\u0627\u0644 \u0026ldquo;\u0637\u0631\u0627\u062d\u06cc \u0632\u06cc\u0628\u0627\u0026rdquo; \u06cc\u0627 \u0026quot;\u0628\u0647 \u0635\u0631\u0641\u0647\u0026quot; \u060c \u062c\u0632 \u0646\u0642\u0627\u0637 \u0642\u0648\u062a \u0645\u062d\u0635\u0648\u0644 \u0646\u06cc\u0633\u062a.\u003Cbr \/\u003E\r\n5- \u062f\u0631 \u0646\u0642\u0627\u0637 \u0642\u0648\u062a \u0648 \u0646\u0642\u0627\u0637 \u0636\u0639\u0641 \u0648\u06cc\u0698\u06af\u06cc \u06cc\u0627 \u062a\u06a9\u0646\u0648\u0644\u0648\u0698\u06cc\u0026zwnj;\u0647\u0627\u06cc \u0628\u0631\u062a\u0631 \u0646\u0633\u0628\u062a \u0628\u0647 \u06a9\u0627\u0644\u0627\u0647\u0627\u06cc \u0645\u0634\u0627\u0628\u0647 \u0631\u0627 \u062b\u0628\u062a \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n\u0026nbsp;\u003C\/p\u003E",
            },
          ],
        },
        attributes: {
          video: null,
          short_description: "",
          items: [
            {
              title:
                "\u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u0646\u0648\u0634\u062a\u0627\u0631\u06cc",
              content:
                "\u003Cp\u003E\u0644\u0637\u0641\u0627 \u062f\u0631 \u0647\u0646\u06af\u0627\u0645 \u0646\u0648\u0634\u062a\u0646 \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc\u060c \u0628\u0647 \u0646\u06a9\u0627\u062a \u0632\u06cc\u0631 \u062f\u0642\u062a \u06a9\u0646\u06cc\u062f:\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n1- \u062a\u0645\u0627\u0645 \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u0630\u06a9\u0631 \u0634\u062f\u0647 \u062f\u0631 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a \u0628\u0627\u06cc\u062f \u0628\u0627 \u0645\u0634\u062e\u0635\u0627\u062a \u06a9\u0627\u0644\u0627 \u062f\u0631 \u062a\u0635\u0627\u0648\u06cc\u0631\u060c \u0639\u0646\u0648\u0627\u0646 \u0648 \u0634\u0631\u062d \u06a9\u0627\u0644\u0627 \u06cc\u06a9\u0633\u0627\u0646 \u0628\u0627\u0634\u062f \u062f\u0631 \u0635\u0648\u0631\u062a \u0645\u063a\u0627\u06cc\u0631\u062a \u0627\u06cc\u0646 \u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0628\u0627 \u0647\u0645\u060c \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u062f\u0631 \u0632\u0645\u0627\u0646 \u0628\u0631\u0631\u0633\u06cc \u0631\u062f \u0645\u06cc \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n2- \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u0648\u0627\u0631\u062f \u0634\u062f\u0647 \u0628\u0627\u06cc\u062f \u062f\u0642\u06cc\u0642\u0627 \u0645\u0637\u0627\u0628\u0642 \u0628\u0627 \u06a9\u0627\u0644\u0627\u06cc\u06cc \u0628\u0627\u0634\u062f \u06a9\u0647 \u0628\u0641\u0631\u0648\u0634 \u0645\u06cc\u0631\u0633\u0627\u0646\u06cc\u062f \u0648 \u062f\u0631 \u0635\u0648\u0631\u062a \u0647\u0631 \u06af\u0648\u0646\u0647 \u0645\u063a\u0627\u06cc\u0631\u062a\u060c \u06a9\u0627\u0644\u0627 \u0628\u0647 \u0627\u06cc\u0646 \u062f\u0644\u06cc\u0644 \u0645\u0631\u062c\u0648\u0639 \u0648 \u0641\u0631\u0648\u0634\u0646\u062f\u0647 \u062c\u0631\u06cc\u0645\u0647 \u0645\u06cc \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n3- \u0627\u0645\u0644\u0627 \u0648 \u0646\u06af\u0627\u0631\u0634 \u06a9\u0644\u0645\u0627\u062a \u0628\u0627\u06cc\u062f \u0635\u062d\u06cc\u062d \u0628\u0627\u0634\u062f \u0648 \u0647\u06cc\u0686 \u063a\u0644\u0637 \u0627\u0645\u0644\u0627\u06cc\u06cc \u062f\u0631 \u0622\u0646 \u0648\u062c\u0648\u062f \u0646\u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f.\u003Cbr \/\u003E\r\n4- \u062f\u0631 \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u0646\u0628\u0627\u06cc\u062f \u0646\u0627\u0645 \u0641\u0631\u0648\u0634\u06af\u0627\u0647\u060c \u0642\u06cc\u0645\u062a \u0648 \u06af\u0627\u0631\u0627\u0646\u062a\u06cc \u06a9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0646\u0648\u06cc\u0633\u06cc\u062f.\u003Cbr \/\u003E\r\n5- \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc\u060c \u0645\u0634\u062e\u0635\u0627\u062a \u062f\u0642\u06cc\u0642\u06cc \u0647\u0633\u062a\u0646\u062f\u060c \u0628\u0646\u0627\u0628\u0631\u0627\u06cc\u0646 \u0646\u0628\u0627\u06cc\u062f \u0627\u0632 \u0639\u0628\u0627\u0631\u0627\u062a \u062a\u0628\u0644\u06cc\u063a\u0627\u062a\u06cc \u0648 \u0633\u0644\u06cc\u0642\u0647 \u0627\u06cc \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n\u0645\u062b\u0627\u0644: \u0639\u0645\u0631 \u0645\u0641\u06cc\u062f \u0632\u06cc\u0627\u062f\u060c \u0638\u0627\u0647\u0631 \u0632\u06cc\u0628\u0627 \u0648...\u003Cbr \/\u003E\r\n6- \u0627\u06af\u0631 \u0645\u0634\u062e\u0635\u0647 \u06cc \u0641\u0646\u06cc \u062f\u0627\u0631\u0627\u06cc \u0648\u0627\u062d\u062f \u0627\u0646\u062f\u0627\u0632\u0647 \u06af\u06cc\u0631\u06cc \u0627\u0633\u062a\u060c \u062d\u062a\u0645\u0627 \u0627\u0632 \u0645\u0637\u0627\u0628\u0642\u062a \u0627\u06cc\u0646 \u0639\u062f\u062f \u0628\u0627 \u0648\u0627\u062d\u062f \u0627\u0646\u062f\u0627\u0632\u0647 \u06af\u06cc\u0631\u06cc \u0627\u0637\u0645\u06cc\u0646\u0627\u0646 \u062d\u0627\u0635\u0644 \u06a9\u0646\u06cc\u062f. \u062f\u0631 \u0635\u0648\u0631\u062a \u0645\u063a\u0627\u06cc\u0631\u062a\u060c \u0627\u062d\u062a\u0645\u0627\u0644 \u0645\u0631\u062c\u0648\u0639 \u0634\u062f\u0646 \u06a9\u0627\u0644\u0627 \u0632\u06cc\u0627\u062f \u0627\u0633\u062a.\u003Cbr \/\u003E\r\n7- \u0686\u0646\u0627\u0646\u0686\u0647 \u06a9\u0627\u0644\u0627\u06cc \u062f\u0631\u062c \u0634\u062f\u0647\u060c \u0686\u0646\u062f \u067e\u0627\u0631\u0686\u0647 \u06cc\u0627 \u0686\u0646\u062f \u062a\u06a9\u0647 \u0627\u0633\u062a \u0628\u0627\u06cc\u062f \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u062a\u0645\u0627\u0645 \u0627\u062c\u0632\u0627 \u0631\u0627 \u062f\u0631 \u0645\u0634\u062e\u0635\u0627\u062a \u06a9\u0627\u0644\u0627 \u0630\u06a9\u0631 \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n\u003Cstrong\u003E\u0646\u06a9\u062a\u0647: \u0627\u06af\u0631 \u062a\u0627\u0628\u0644\u0648 \u0686\u0646\u062f \u062a\u06a9\u0647 \u0627\u0633\u062a \u0648 \u0627\u0628\u0639\u0627\u062f \u062a\u06a9\u0647 \u0647\u0627 \u0645\u062a\u0641\u0627\u0648\u062a \u0647\u0633\u062a\u0646\u062f\u060c \u0628\u0627\u06cc\u062f \u0627\u0628\u0639\u0627\u062f \u0647\u0631 \u062a\u06a9\u0647\u060c \u062f\u0631 \u0633\u0627\u06cc\u0631 \u062a\u0648\u0636\u06cc\u062d\u0627\u062a \u0646\u0648\u0634\u062a\u0647 \u0634\u0648\u062f.\u003C\/strong\u003E\u003C\/p\u003E",
            },
            {
              title:
                "\u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u0627\u0646\u062a\u062e\u0627\u0628\u06cc",
              content:
                "\u003Cp\u003E\u062f\u0631 \u0642\u0633\u0645\u062a \u0647\u0627\u06cc\u06cc \u0627\u0632 \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u06a9\u0647 \u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0631\u0627 \u0628\u0627\u06cc\u062f \u062f\u0631 \u0622\u0646 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0631\u062f\u060c \u0628\u0647 \u0645\u0648\u0627\u0631\u062f \u0632\u06cc\u0631 \u062f\u0642\u062a \u06a9\u0646\u06cc\u062f:\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n1- \u0627\u0637\u0645\u06cc\u0646\u0627\u0646 \u062d\u0627\u0635\u0644 \u06a9\u0646\u06cc\u062f \u06a9\u0647 \u062a\u0645\u0627\u0645 \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u0630\u06a9\u0631 \u0634\u062f\u0647 \u062f\u0631 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a \u0628\u0627 \u0645\u0634\u062e\u0635\u0627\u062a \u06a9\u0627\u0644\u0627 \u062f\u0631 \u062a\u0635\u0627\u0648\u06cc\u0631\u060c \u0639\u0646\u0648\u0627\u0646 \u0648 \u0634\u0631\u062d \u06a9\u0627\u0644\u0627 \u06cc\u06a9\u0633\u0627\u0646 \u0628\u0627\u0634\u062f \u062f\u0631 \u063a\u06cc\u0631 \u0627\u06cc\u0646 \u0635\u0648\u0631\u062a\u060c \u06a9\u0627\u0644\u0627 \u062f\u0631 \u0632\u0645\u0627\u0646 \u0628\u0631\u0631\u0633\u06cc \u0631\u062f \u0645\u06cc \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n2- \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u0648\u0627\u0631\u062f \u0634\u062f\u0647 \u0628\u0627\u06cc\u062f \u062f\u0642\u06cc\u0642\u0627 \u0645\u0637\u0627\u0628\u0642 \u0628\u0627 \u06a9\u0627\u0644\u0627\u06cc\u06cc \u0628\u0627\u0634\u062f \u06a9\u0647 \u0628\u0641\u0631\u0648\u0634 \u0645\u06cc\u0631\u0633\u0627\u0646\u06cc\u062f \u0648 \u062f\u0631 \u0635\u0648\u0631\u062a \u0647\u0631 \u06af\u0648\u0646\u0647 \u0645\u063a\u0627\u06cc\u0631\u062a\u060c \u06a9\u0627\u0644\u0627 \u0628\u0647 \u0627\u06cc\u0646 \u062f\u0644\u06cc\u0644 \u0645\u0631\u062c\u0648\u0639 \u0648 \u0641\u0631\u0648\u0634\u0646\u062f\u0647 \u062c\u0631\u06cc\u0645\u0647 \u0645\u06cc \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n3- \u0627\u06af\u0631 \u062f\u0631 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a \u0647\u0627\u060c \u06af\u0632\u06cc\u0646\u0647 \u0627\u06cc \u0645\u0631\u0628\u0648\u0637 \u0628\u0647 \u0645\u0634\u062e\u0635\u0627\u062a \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u0648\u062c\u0648\u062f \u0646\u062f\u0627\u0634\u062a\u060c \u0627\u0632 \u0637\u0631\u06cc\u0642 \u0641\u0631\u0645 \u0026quot;\u062a\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627\u0026quot; \u0628\u0647 \u0648\u0627\u062d\u062f LQA \u0627\u0637\u0644\u0627\u0639 \u062f\u0647\u06cc\u062f \u062a\u0627 \u0627\u06cc\u0646 \u06af\u0632\u06cc\u0646\u0647 \u0628\u0647 \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u06af\u0631\u0648\u0647 \u0645\u0648\u0631\u062f \u0646\u0638\u0631 \u0627\u0636\u0627\u0641\u0647 \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n\u062a\u0648\u062c\u0647 \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u06cc\u062f\u060c \u062a\u0627 \u0632\u0645\u0627\u0646\u06cc \u06a9\u0647 \u0627\u06cc\u0646 \u06af\u0632\u06cc\u0646\u0647 \u0628\u0647 \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u0627\u0636\u0627\u0641\u0647 \u0646\u0634\u062f\u0647\u060c \u06a9\u0627\u0644\u0627 \u0631\u0627 \u062f\u0631\u062c \u0646\u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n\u0026nbsp;\u003C\/p\u003E",
            },
          ],
        },
        media: {
          video: null,
          short_description: "",
          items: [
            {
              title: "\u062a\u0635\u0648\u06cc\u0631 \u0627\u0635\u0644\u06cc",
              content:
                "\u003Cp\u003E\u0632\u0645\u0627\u0646\u06cc \u06a9\u0647 \u062a\u0635\u0627\u0648\u06cc\u0631 \u062e\u0648\u062f \u0631\u0627 \u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u06a9\u0631\u062f\u06cc\u062f\u060c \u0628\u0627 \u06a9\u0644\u06cc\u06a9 \u0631\u0648\u06cc \u0639\u0644\u0627\u0645\u062a \u0026quot;\u067e\u0631\u0686\u0645\u0026quot; \u0639\u06a9\u0633 \u0627\u0635\u0644\u06cc \u06a9\u0627\u0644\u0627 \u0631\u0627 \u0627\u0632 \u0628\u06cc\u0646 \u062a\u0635\u0627\u0648\u06cc\u0631 \u0645\u0634\u062e\u0635 \u06a9\u0646\u06cc\u062f. \u0628\u0631\u0627\u06cc \u0627\u0646\u062a\u062e\u0627\u0628 \u0639\u06a9\u0633 \u0627\u0635\u0644\u06cc \u06a9\u0627\u0644\u0627 \u0628\u0627\u06cc\u062f \u0628\u0647 \u0646\u06a9\u0627\u062a \u0632\u06cc\u0631 \u062a\u0648\u062c\u0647 \u06a9\u0646\u06cc\u062f:\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n1- \u0628\u0647 \u0637\u0648\u0631\u06cc \u0639\u0645\u0648\u0645\u06cc \u0628\u0647\u062a\u0631 \u0627\u0633\u062a \u062a\u0635\u0627\u0648\u06cc\u0631 \u0627\u0635\u0644\u06cc \u0628\u0627 \u067e\u0633 \u0632\u0645\u06cc\u0646\u0647 \u0633\u0641\u06cc\u062f \u0628\u0627\u0634\u062f.\u0645\u06cc \u062a\u0648\u0627\u0646\u06cc\u062f \u0628\u0631\u0627\u06cc \u0622\u0645\u0648\u0632\u0634 \u0633\u0641\u06cc\u062f \u06a9\u0631\u062f\u0646 \u067e\u0633 \u0632\u0645\u06cc\u0646\u0647 \u062a\u0635\u0648\u06cc\u0631 \u003Ca href=\u0022https:\/\/selleracademy.digikala.com\/%D9%88%DB%8C%D8%B1%D8%A7%DB%8C%D8%B4-%D8%B9%DA%A9%D8%B3-%D8%AC%D8%AF%D8%A7-%DA%A9%D8%B1%D8%AF%D9%86-%DA%A9%D8%A7%D9%84%D8%A7-%D8%A7%D8%B2-%D9%BE%D8%B3-%D8%B2%D9%85%DB%8C%D9%86%D9%87\/\u0022 target=\u0022_blank\u0022\u003E\u0627\u06cc\u0646\u062c\u0627\u003C\/a\u003E \u0648 \u0622\u0645\u0648\u0632\u0634 \u062d\u0630\u0641 \u0633\u0627\u06cc\u0647 \u0627\u0632\u0639\u06a9\u0633 \u0627\u0635\u0644\u06cc \u003Ca href=\u0022https:\/\/selleracademy.digikala.com\/%D9%88%DB%8C%D8%B1%D8%A7%DB%8C%D8%B4-%D8%B9%DA%A9%D8%B3-%D8%A7%D8%B2-%D8%A8%DB%8C%D9%86-%D8%A8%D8%B1%D8%AF%D9%86-%D8%B3%D8%A7%DB%8C%D9%87%e2%80%8c%DB%8C-%DA%A9%D8%A7%D9%84%D8%A7\/\u0022 target=\u0022_blank\u0022\u003E\u0627\u06cc\u0646\u062c\u0627 \u003C\/a\u003E\u06a9\u0644\u06cc\u06a9 \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n2- \u0639\u06a9\u0633 \u0627\u0635\u0644\u06cc \u0628\u0627\u06cc\u062f \u06a9\u06cc\u0641\u06cc\u062a \u0628\u0627\u0644\u0627\u06cc\u06cc \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f \u0648 \u0646\u0628\u0627\u06cc\u062f \u0647\u06cc\u0686 \u0644\u0648\u06af\u0648 \u06cc\u0627 \u0648\u0627\u062a\u0631\u0645\u0627\u0631\u06a9\u06cc \u0628\u0631 \u0631\u0648\u06cc \u0639\u06a9\u0633 \u0648\u062c\u0648\u062f \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f.\u003Cbr \/\u003E\r\n3- \u06a9\u0627\u0644\u0627 \u0628\u0627\u06cc\u062f \u062f\u0631 \u0639\u06a9\u0633 \u0627\u0635\u0644\u06cc \u0628\u0632\u0631\u06af \u0648 \u062f\u0631 \u0645\u0631\u06a9\u0632 \u062a\u0635\u0648\u06cc\u0631 \u0628\u0627\u0634\u062f.\u003Cbr \/\u003E\r\n4- \u0632\u0627\u0648\u06cc\u0647 \u0635\u062d\u06cc\u062d \u06a9\u0627\u0644\u0627 \u0648 \u0646\u062d\u0648\u0647 \u0686\u06cc\u062f\u0645\u0627\u0646 \u06a9\u0627\u0644\u0627\u0647\u0627\u06cc \u0686\u0646\u062f \u062a\u06a9\u0647 \u062f\u0631 \u0639\u06a9\u0633 \u0627\u0635\u0644\u06cc \u0627\u0647\u0645\u06cc\u062a \u0632\u06cc\u0627\u062f\u06cc \u062f\u0627\u0631\u062f\u060c \u0644\u0637\u0641\u0627 \u0628\u0627 \u062a\u0648\u062c\u0647 \u0628\u0647 \u062c\u062f\u06cc\u062f \u062a\u0631\u06cc\u0646 \u06a9\u0627\u0644\u0627\u0647\u0627\u06cc \u0645\u0634\u0627\u0628\u0647 \u0631\u0648\u06cc \u0633\u0627\u06cc\u062a\u060c \u06a9\u0627\u0644\u0627 \u0631\u0627 \u0639\u06a9\u0627\u0633\u06cc \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n5- \u062f\u0631 \u0639\u06a9\u0633 \u0627\u0635\u0644\u06cc \u062a\u0646\u0647\u0627 \u0628\u0627\u06cc\u062f \u062a\u0635\u0648\u06cc\u0631 \u06a9\u0627\u0644\u0627\u06cc\u06cc \u06a9\u0647 \u0645\u06cc\u0641\u0631\u0648\u0634\u06cc\u062f \u0648\u062c\u0648\u062f \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f \u0648 \u0648\u062c\u0648\u062f \u0627\u0634\u06cc\u0627 \u062f\u06cc\u06af\u0631 \u062f\u0631 \u062a\u0635\u0648\u06cc\u0631 \u0627\u0635\u0644\u06cc \u0628\u0627\u0639\u062b \u0631\u062f \u0634\u062f\u0646 \u0639\u06a9\u0633 \u0645\u06cc\u0634\u0648\u062f.\u003Cbr \/\u003E\r\n6- \u0627\u06af\u0631 \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u0686\u0646\u062f \u062a\u06a9\u0647 \u0627\u0633\u062a\u060c \u0628\u0627\u06cc\u062f \u062a\u0635\u0648\u06cc\u0631 \u062a\u0645\u0627\u0645 \u062a\u06a9\u0647 \u0647\u0627 \u062f\u0631 \u0639\u06a9\u0633 \u0627\u0635\u0644\u06cc \u062f\u06cc\u062f\u0647 \u0634\u0648\u062f\u060c \u062f\u0631 \u063a\u06cc\u0631 \u0627\u06cc\u0646 \u0635\u0648\u0631\u062a \u06a9\u0627\u0644\u0627 \u0631\u062f \u0645\u06cc \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n7- \u062a\u0635\u0627\u0648\u06cc\u0631 \u06a9\u0627\u0644\u0627 \u0628\u0627\u06cc\u062f \u062f\u0642\u06cc\u0642\u0627 \u0645\u0637\u0627\u0628\u0642 \u0628\u0627 \u06a9\u0627\u0644\u0627\u06cc\u06cc \u0628\u0627\u0634\u062f \u06a9\u0647 \u0628\u0641\u0631\u0648\u0634 \u0645\u06cc\u0631\u0633\u0627\u0646\u06cc\u062f \u0648 \u062f\u0631 \u0635\u0648\u0631\u062a \u0647\u0631 \u06af\u0648\u0646\u0647 \u0645\u063a\u0627\u06cc\u0631\u062a\u060c \u06a9\u0627\u0644\u0627 \u0628\u0647 \u0627\u06cc\u0646 \u062f\u0644\u06cc\u0644 \u0645\u0631\u062c\u0648\u0639 \u0648 \u0641\u0631\u0648\u0634\u0646\u062f\u0647 \u062c\u0631\u06cc\u0645\u0647 \u0645\u06cc \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n\u003Cstrong\u003E\u0646\u06a9\u062a\u0647:\u003C\/strong\u003E\u003C\/p\u003E\r\n\r\n\u003Cp\u003E\u003Cstrong\u003E\u06cc\u06a9\u06cc \u0627\u0632 \u0628\u06cc\u0634\u062a\u0631\u06cc\u0646 \u062f\u0644\u0627\u06cc\u0644 \u0631\u062f \u0634\u062f\u0646 \u06a9\u0627\u0644\u0627 \u062f\u0631 \u0627\u06cc\u0646 \u06af\u0631\u0648\u0647\u060c \u062a\u0635\u0648\u06cc\u0631 \u0627\u0635\u0644\u06cc \u0627\u0633\u062a. \u0644\u0637\u0641\u0627 \u0628\u0647 \u0646\u06a9\u0627\u062a \u0632\u06cc\u0631 \u062a\u0648\u062c\u0647 \u06a9\u0646\u06cc\u062f:\u003C\/strong\u003E\u003C\/p\u003E\r\n\r\n\u003Cp\u003E*\u0026nbsp;\u003Cstrong\u003E\u0627\u06af\u0631 \u062a\u0627\u0628\u0644\u0648 \u0628\u0647 \u0635\u0648\u0631\u062a \u0686\u0646\u062f \u0639\u062f\u062f\u06cc \u06cc\u0627 \u0686\u0646\u062f \u062a\u06a9\u0647 \u0627\u0633\u062a\u060c \u0628\u0627\u06cc\u062f \u062f\u0631 \u062a\u0635\u0648\u06cc\u0631 \u0627\u0635\u0644\u06cc \u062a\u0635\u0648\u06cc\u0631 \u062a\u0645\u0627\u0645 \u062a\u06a9\u0647 \u0647\u0627 \u0647\u0627 \u0648\u062c\u0648\u062f \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f.\u003C\/strong\u003E\u003C\/p\u003E\r\n\r\n\u003Cp\u003E*\u0026nbsp;\u003Cstrong\u003E\u062f\u0631 \u0627\u06cc\u0646 \u06af\u0631\u0648\u0647\u060c \u0645\u06cc \u062a\u0648\u0627\u0646\u06cc\u062f \u0627\u0632 \u0639\u06a9\u0633 \u0644\u0627\u06cc\u0641 \u0627\u0633\u062a\u0627\u06cc\u0644 \u0628\u0631\u0627\u06cc \u062a\u0635\u0648\u06cc\u0631 \u0627\u0635\u0644\u06cc \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0646\u06cc\u062f.\u003C\/strong\u003E\u003C\/p\u003E\r\n\r\n\u003Cp\u003E* \u0627\u003Cstrong\u003E\u06af\u0631 \u0627\u0632 \u062a\u0635\u0648\u06cc\u0631 \u062e\u0648\u062f \u06a9\u0627\u0644\u0627 (\u0628\u062f\u0648\u0646 \u0644\u0627\u06cc\u0641 \u0627\u0633\u062a\u0627\u06cc\u0644) \u0628\u0631\u0627\u06cc \u0639\u06a9\u0633 \u0627\u0635\u0644\u06cc \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0645\u06cc \u06a9\u0646\u06cc\u062f\u060c \u067e\u0633 \u0632\u0645\u06cc\u0646\u0647 \u0628\u0627\u06cc\u062f \u06cc\u06a9 \u062f\u0633\u062a \u0633\u0641\u06cc\u062f \u0628\u0627\u0634\u062f.\u003C\/strong\u003E\u003C\/p\u003E\r\n\r\n\u003Cp style=\u0022text-align: center;\u0022\u003E\u003Cstrong\u003E\u062a\u0635\u0648\u06cc\u0631 \u062f\u0631\u0633\u062a:\u003C\/strong\u003E\u003C\/p\u003E\r\n\r\n\u003Cp style=\u0022text-align: center;\u0022\u003E\u003Cstrong\u003E\u003Cimg alt=\u0022\u0022 src=\u0022https:\/\/dkstatics-public.digikala.com\/digikala-reviews\/8cd53e5c09a41bd2314685e88ff2f24a2fc846b8_1629126750.jpg\u0022 style=\u0022height:150px; width:150px\u0022 \/\u003E\u0026nbsp; \u0026nbsp;\u003Cimg alt=\u0022\u0022 src=\u0022https:\/\/dkstatics-public.digikala.com\/digikala-reviews\/3ab419a6ff535ff4d254a59a2e12c78f83bc2b00_1629126776.jpg\u0022 style=\u0022height:150px; width:150px\u0022 \/\u003E\u003C\/strong\u003E\u003C\/p\u003E\r\n\r\n\u003Cp style=\u0022text-align: center;\u0022\u003E\u003Cstrong\u003E\u062a\u0635\u0648\u06cc\u0631 \u0646\u0627\u062f\u0631\u0633\u062a:\u003C\/strong\u003E\u003C\/p\u003E\r\n\r\n\u003Cp style=\u0022text-align: center;\u0022\u003E\u003Cstrong\u003E\u003Cimg alt=\u0022\u0022 src=\u0022https:\/\/dkstatics-public.digikala.com\/digikala-reviews\/631e124a4e1afebbf081df0be14c059b56e11b15_1629126873.jpg\u0022 style=\u0022height:150px; width:150px\u0022 \/\u003E\u003Cimg alt=\u0022\u0022 src=\u0022https:\/\/dkstatics-public.digikala.com\/digikala-reviews\/de87e46f9ae8e45abfb1aafc7e6b96a0d1d26141_1629126841.jpg\u0022 style=\u0022height:150px; width:150px\u0022 \/\u003E\u0026nbsp;\u0026nbsp;\u003C\/strong\u003E\u003C\/p\u003E",
            },
            {
              title: "\u062a\u0635\u0648\u06cc\u0631 \u0622\u0644\u0628\u0648\u0645",
              content:
                "\u003Cp\u003E\u062a\u0635\u0627\u0648\u06cc\u0631 \u0622\u0644\u0628\u0648\u0645 \u0628\u0631\u0627\u06cc \u0646\u0645\u0627\u06cc\u0634 \u0632\u0648\u0627\u06cc\u0627 \u0648 \u06a9\u0627\u0631\u0628\u0631\u062f \u06a9\u0627\u0644\u0627 \u0628\u0647 \u0645\u0634\u062a\u0631\u06cc \u0627\u0633\u062a.\u003Cbr \/\u003E\r\n1- \u062f\u0631 \u0647\u06cc\u0686 \u06a9\u062f\u0627\u0645 \u0627\u0632 \u062a\u0635\u0627\u0648\u06cc\u0631 \u0622\u0644\u0628\u0648\u0645 \u0646\u0628\u0627\u06cc\u062f \u0647\u06cc\u0686 \u0644\u0648\u06af\u0648 \u0648 \u0648\u0627\u062a\u0631\u0645\u0627\u0631\u06a9\u06cc \u0648\u062c\u0648\u062f \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f.\u003Cbr \/\u003E\r\n2- \u062f\u0631 \u062a\u0635\u0627\u0648\u06cc\u0631 \u0622\u0644\u0628\u0648\u0645 \u0646\u0628\u0627\u06cc\u062f \u0647\u06cc\u0686 \u0622\u062f\u0631\u0633 \u0633\u0627\u06cc\u062a\u060c \u0634\u0645\u0627\u0631\u0647 \u062a\u0644\u0641\u0646 \u0648 \u0646\u0634\u0627\u0646\u06cc \u0634\u0628\u06a9\u0647 \u0647\u0627 \u0627\u062c\u062a\u0645\u0627\u0639\u06cc \u0648\u062c\u0648\u062f \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f. (\u0644\u0637\u0641\u0627 \u0627\u06af\u0631 \u0627\u06cc\u0646 \u0645\u0648\u0627\u0631\u062f \u0631\u0648\u06cc \u06a9\u0627\u0644\u0627 \u06cc\u0627 \u0628\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u0648\u062c\u0648\u062f \u062f\u0627\u0631\u062f \u0637\u0648\u0631\u06cc \u0639\u06a9\u0627\u0633\u06cc \u06a9\u0646\u06cc\u062f \u062a\u0627 \u0627\u06cc\u0646 \u0645\u0648\u0627\u0631\u062f \u062f\u0631 \u062a\u0635\u0627\u0648\u06cc\u0631 \u062f\u06cc\u062f\u0647 \u0646\u0634\u0648\u062f.)\u003Cbr \/\u003E\r\n3- \u062f\u0631 \u062a\u0635\u0627\u0648\u06cc\u0631 \u0622\u0644\u0628\u0648\u0645\u060c \u0637\u0631\u062d \u0647\u0627\u06cc \u0645\u062e\u062a\u0644\u0641 \u06cc\u06a9 \u06a9\u0627\u0644\u0627 \u0631\u0627 \u0642\u0631\u0627\u0631 \u0646\u062f\u0647\u06cc\u062f\u060c \u0628\u0631\u0627\u06cc \u0647\u0631 \u0637\u0631\u062d \u0628\u0627\u06cc\u062f \u06cc\u06a9 \u06a9\u0627\u0644\u0627\u06cc \u062c\u062f\u0627\u06af\u0627\u0646\u0647 \u062f\u0631\u062c \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n4- \u062f\u0642\u062a \u06a9\u0646\u06cc\u062f \u06a9\u0647 \u0628\u06cc\u0646 \u0647\u06cc\u0686 \u06a9\u062f\u0627\u0645 \u0627\u0632 \u062a\u0635\u0627\u0648\u06cc\u0631 \u0646\u0628\u0627\u06cc\u062f \u0645\u063a\u0627\u06cc\u0631\u062a\u06cc \u0648\u062c\u0648\u062f \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f.\u003C\/p\u003E\r\n\r\n\u003Cp\u003E\u062a\u0635\u0627\u0648\u06cc\u0631 \u067e\u06cc\u0634\u0646\u0647\u0627\u062f\u06cc \u0628\u0631\u0627\u06cc \u062c\u0630\u0628 \u0628\u06cc\u0634\u062a\u0631 \u0645\u0634\u062a\u0631\u06cc\u0627\u0646:\u003C\/p\u003E\r\n\r\n\u003Cp\u003E\u003Cstrong\u003E\u0627\u0636\u0627\u0641\u0647 \u0634\u062f\u0646 \u062a\u0635\u0648\u06cc\u0631 \u0627\u06cc\u0646\u0641\u0648\u06af\u0631\u0627\u0641\u06cc \u06a9\u0627\u0644\u0627.\u003C\/strong\u003E\u003C\/p\u003E\r\n\r\n\u003Cp\u003E\u003Cstrong\u003E\u003Cimg src=\u0022https:\/\/lh7-rt.googleusercontent.com\/docsz\/AD_4nXf_vmuxseGDseAthv6TWY-2zrx4sI6NsweJ3381BkwqIIutpIRxA6mYKEAqXMa7VRbr1kTqbNZ6OC2t0icJ65Cg_oGmMZLuWNhkJuFB-kj4Rf3FY3KNWJeCOb2oPbR4K8-b6TIWLYRw2AsFBAlMSJpY6QM?key=Z1gcft6pOZyOxlTcVhluLQ\u0022 style=\u0022height:250px; width:250px\u0022 \/\u003E\u003C\/strong\u003E\u003C\/p\u003E\r\n\r\n\u003Cp\u003E\u0026nbsp;\u003C\/p\u003E\r\n\r\n\u003Cp\u003E\u003Cstrong\u003E\u0627\u0636\u0627\u0641\u0647 \u0634\u062f\u0646 \u062a\u0635\u0648\u06cc\u0631 \u062a\u0641\u06a9\u06cc\u06a9 \u0633\u0627\u0632\u06cc \u0627\u062c\u0632\u0627\u06cc \u0633\u0627\u0632\u0646\u062f\u0647 \u06a9\u0627\u0644\u0627 \u0628\u0627 \u062a\u0648\u0636\u06cc\u062d\u0627\u062a.\u003C\/strong\u003E\u003C\/p\u003E\r\n\r\n\u003Cp\u003E\u003Cstrong\u003E\u003Cimg src=\u0022https:\/\/lh7-rt.googleusercontent.com\/docsz\/AD_4nXeGHdqCDKVvDzd33dkIGQRYCyKzUyA7767mIK3OtsSFijsiZ4webJsyR9Gmg3KyTQ5B-lLmy_S6LZMihz3L9VVYRw4sNaYIBtTOMWgLO-CLB0DhbAE8SQTv9BFCy_5Jv3OH9w0tZESao2T1ix6vYvqCj-U2?key=Z1gcft6pOZyOxlTcVhluLQ\u0022 style=\u0022height:340px; width:250px\u0022 \/\u003E\u003C\/strong\u003E\u003C\/p\u003E",
            },
          ],
        },
        auto_title: {
          video: null,
          short_description: "",
          items: [
            {
              title: "\u0646\u0627\u0645\u06af\u0630\u0627\u0631\u06cc \u062e\u0648\u062f\u06a9\u0627\u0631",
              content:
                "\u003Cp\u003E\u067e\u0633 \u0627\u0632 \u067e\u0631 \u06a9\u0631\u062f\u0646 \u0642\u0633\u0645\u062a \u0647\u0627\u06cc \u0628\u0631\u0646\u062f\u060c \u0645\u062f\u0644\u060c \u062f\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u062f\u0631 \u06af\u0627\u0645 \u062f\u0648\u0645 \u062f\u0631\u062c \u0648 \u0645\u0634\u062e\u0635\u0627\u062a \u0641\u0646\u06cc \u062f\u0631 \u06af\u0627\u0645 \u0633\u0648\u0645 \u062f\u0631\u062c\u060c \u0639\u0646\u0648\u0627\u0646 \u0635\u062d\u06cc\u062d \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u0628\u0627 \u062a\u0648\u062c\u0647 \u0628\u0647 \u0645\u0634\u062e\u0635\u0627\u062a\u06cc \u06a9\u0647 \u0634\u0645\u0627 \u067e\u0631 \u06a9\u0631\u062f\u0647 \u0627\u06cc\u062f \u062f\u0631 \u06af\u0627\u0645 \u0686\u0647\u0627\u0631\u0645 \u0628\u0647 \u0634\u0645\u0627 \u0646\u0645\u0627\u06cc\u0634 \u062f\u0627\u062f\u0647 \u062e\u0648\u0627\u0647\u062f \u0634\u062f.\u003Cbr \/\u003E\r\n\u0639\u0646\u0648\u0627\u0646 \u067e\u06cc\u0634\u0646\u0647\u0627\u062f\u06cc \u0628\u0631\u0627\u06cc \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u0628\u0647\u062a\u0631\u06cc\u0646 \u0639\u0646\u0648\u0627\u0646 \u0627\u0633\u062a \u0648 \u0628\u0627 \u0648\u06cc\u0631\u0627\u06cc\u0634 \u0622\u0646 \u0627\u0645\u06a9\u0627\u0646 \u0631\u062f \u0634\u062f\u0646 \u06a9\u0627\u0644\u0627 \u0648\u062c\u0648\u062f \u062f\u0627\u0631\u062f.\u003Cbr \/\u003E\r\n\u0644\u0637\u0641\u0627 \u0639\u0646\u0648\u0627\u0646 \u06a9\u0627\u0644\u0627\u06cc \u062e\u0648\u062f \u0631\u0627 \u0628\u0631\u0631\u0633\u06cc \u06a9\u0646\u06cc\u062f \u0648 \u062f\u0631 \u0635\u0648\u0631\u062a \u0635\u062d\u06cc\u062d \u0628\u0648\u062f\u0646 \u0639\u0646\u0648\u0627\u0646 \u0631\u0648\u06cc \u0026quot;\u062a\u0627\u06cc\u06cc\u062f \u0648 \u0627\u062f\u0627\u0645\u0647\u0026quot; \u06a9\u0644\u06cc\u06a9 \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n\u062d\u062a\u0645\u0627 \u062f\u0642\u062a \u06a9\u0646\u06cc\u062f\u060c \u062f\u0631 \u0635\u0648\u0631\u062a\u06cc \u06a9\u0647 \u0646\u0627\u0645\u06af\u0630\u0627\u0631\u06cc \u062e\u0648\u062f\u06a9\u0627\u0631 \u062f\u0631 \u0627\u06cc\u0646 \u06af\u0631\u0648\u0647 \u0627\u062c\u0628\u0627\u0631\u06cc \u0634\u062f\u0647 \u0628\u0627\u0634\u062f \u062f\u06a9\u0645\u0647 \u0026quot;\u0648\u06cc\u0631\u0627\u06cc\u0634\u0026quot; \u062d\u0630\u0641 \u0634\u062f\u0647 \u0627\u0633\u062a \u0648 \u0628\u0631\u0627\u06cc \u062a\u063a\u06cc\u06cc\u0631 \u0639\u0646\u0648\u0627\u0646 \u06a9\u0627\u0644\u0627 \u0628\u0627\u06cc\u062f \u062a\u063a\u06cc\u06cc\u0631\u0627\u062a \u0631\u0627 \u062f\u0631 \u0642\u0633\u0645\u062a \u0647\u0627\u06cc \u0628\u0631\u0646\u062f\u060c \u0645\u062f\u0644 \u0648 \u062f\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u0627\u06cc\u062c\u0627\u062f \u06a9\u0646\u06cc\u062f \u062a\u0627 \u0639\u0646\u0648\u0627\u0646 \u06a9\u0627\u0644\u0627 \u0627\u0635\u0644\u0627\u062d \u0634\u0648\u062f.\u003Cbr \/\u003E\r\n\u003Cbr \/\u003E\r\n\u0647\u0645\u0686\u0646\u06cc\u0646 \u062f\u0631 \u0635\u0648\u0631\u062a \u0627\u062c\u0628\u0627\u0631\u06cc \u0628\u0648\u062f\u0646 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0627\u0632 \u0646\u0627\u0645 \u06af\u0630\u0627\u0631\u06cc \u062e\u0648\u062f\u06a9\u0627\u0631\u060c \u0627\u06af\u0631 \u06a9\u0627\u0644\u0627\u06cc \u0634\u0645\u0627 \u0628\u0631\u0646\u062f \u062b\u0628\u062a \u0634\u062f\u0647 \u062f\u0631 \u062f\u06cc\u062c\u06cc \u06a9\u0627\u0644\u0627 \u062f\u0627\u0631\u062f \u0645\u06cc \u062a\u0648\u0627\u0646\u06cc\u062f \u0628\u0631\u0646\u062f \u062e\u0648\u062f \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f \u0648 \u0627\u06cc\u0646 \u0628\u0631\u0646\u062f \u062f\u0631 \u0639\u0646\u0648\u0627\u0646 \u06a9\u0627\u0644\u0627 \u0647\u0645 \u0646\u0645\u0627\u06cc\u0634 \u062f\u0627\u062f\u0647 \u0645\u06cc \u0634\u0648\u062f \u0627\u0645\u0627 \u0627\u06af\u0631 \u0628\u0631\u0646\u062f \u0634\u0645\u0627 \u062f\u0631 \u062f\u06cc\u062c\u06cc \u06a9\u0627\u0644\u0627 \u062b\u0628\u062a \u0646\u0634\u062f\u0647 \u0628\u0627\u0634\u062f \u0628\u0627\u06cc\u062f \u062f\u0631 \u0641\u06cc\u0644\u062f \u0628\u0631\u0646\u062f\u060c \u062f\u0631 \u06af\u0627\u0645 \u062f\u0648\u0645\u060c \u0628\u0631\u0646\u062f \u0026quot;\u0645\u062a\u0641\u0631\u0642\u0647\u0026quot; \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f \u0648 \u062f\u0631\u0639\u0646\u0648\u0627\u0646 \u06a9\u0627\u0644\u0627 \u0647\u0645 \u0628\u0631\u0646\u062f \u0646\u0645\u0627\u06cc\u0634 \u062f\u0627\u062f\u0647 \u0646\u0645\u06cc \u0634\u0648\u062f. \u0628\u0631\u0627\u06cc \u0646\u0645\u0627\u06cc\u0634 \u0628\u0631\u0646\u062f \u062f\u0631 \u0639\u0646\u0648\u0627\u0646 \u06a9\u0627\u0644\u0627 \u062d\u062a\u0645\u0627 \u0628\u0627\u06cc\u062f \u0628\u0631\u0646\u062f \u062e\u0648\u062f \u0631\u0627 \u062f\u0631 \u062f\u06cc\u062c\u06cc \u06a9\u0627\u0644\u0627 \u062b\u0628\u062a \u06a9\u0646\u06cc\u062f.\u003Cbr \/\u003E\r\n\u0026nbsp;\u003C\/p\u003E",
            },
          ],
        },
      },
      category_data: {
        categoryTheme: "sized",
        categoryThemeTranslated: "\u0633\u0627\u06cc\u0632",
        categoryTitle: "\u062a\u0627\u0628\u0644\u0648",
        themes: [{ id: 1, label: "\u0633\u0627\u06cc\u0632", active: true, themeType: "sized" }],
      },
      allow_fake: true,
      brand_other_id: 719,
      show_colors: true,
      colors: [
        { color_palette_id: 1, color_palette_name: "\u0635\u0648\u0631\u062a\u06cc", color_palette_code: "#ff69b4" },
        { color_palette_id: 2, color_palette_name: "\u0628\u0646\u0641\u0634", color_palette_code: "#810cc4" },
        { color_palette_id: 3, color_palette_name: "\u0632\u0631\u062f", color_palette_code: "#e6ce15" },
        {
          color_palette_id: 4,
          color_palette_name: "\u0646\u0627\u0631\u0646\u062c\u06cc",
          color_palette_code: "#e87109",
        },
        { color_palette_id: 5, color_palette_name: "\u0633\u0641\u06cc\u062f", color_palette_code: "#ffffff" },
        {
          color_palette_id: 6,
          color_palette_name: "\u0646\u0642\u0631\u0647\u200c\u0627\u06cc",
          color_palette_code: "#e6e7e8",
        },
        { color_palette_id: 7, color_palette_name: "\u0637\u0648\u0633\u06cc", color_palette_code: "#D3D3D3" },
        { color_palette_id: 8, color_palette_name: "\u0645\u0634\u06a9\u06cc", color_palette_code: "#2b2b2b" },
        { color_palette_id: 9, color_palette_name: "\u0642\u0631\u0645\u0632", color_palette_code: "#c70e0e" },
        {
          color_palette_id: 10,
          color_palette_name: "\u0642\u0647\u0648\u0647\u200c\u200c\u0627\u06cc",
          color_palette_code: "#8b4513",
        },
        { color_palette_id: 11, color_palette_name: "\u0633\u0628\u0632", color_palette_code: "#12b844" },
        { color_palette_id: 12, color_palette_name: "\u0622\u0628\u06cc", color_palette_code: "#1c75d4" },
      ],
      dimension_level: "item",
      dimension_config: {
        length: { min: 1, max: 3300 },
        width: { min: 1, max: 3300 },
        height: { min: 1, max: 250 },
        weight: { min: 1, max: 70000 },
      },
      general_mefa: {
        893: {
          value: 893,
          text: "2720000007028(\u062a\u0627\u0628\u0644\u0648 \u062a\u0632\u06cc\u06cc\u0646\u06cc - \u0634\u0646\u0627\u0633\u0647 \u0639\u0645\u0648\u0645\u06cc \u062a\u0648\u0644\u06cc\u062f \u062f\u0627\u062e\u0644)",
          general_id: "2720000007028",
        },
        894: {
          value: 894,
          text: "2710000007029(\u062a\u0627\u0628\u0644\u0648 \u062a\u0632\u06cc\u06cc\u0646\u06cc - \u0634\u0646\u0627\u0633\u0647 \u0639\u0645\u0648\u0645\u06cc \u0648\u0627\u0631\u062f\u0627\u062a\u06cc)",
          general_id: "2710000007029",
        },
        28865: {
          value: 28865,
          text: "2720000187836(\u062a\u0627\u0628\u0644\u0648 \u0645\u0648\u0644\u062a\u06cc \u0645\u062f\u06cc\u0627 \u062a\u062c\u0647\u06cc\u0632\u0627\u062a \u062c\u0627\u0646\u0628\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0647\u0627\u06cc \u0635\u0648\u062a\u06cc \u0648 \u062a\u0635\u0648\u06cc\u0631\u06cc - \u0634\u0646\u0627\u0633\u0647 \u0639\u0645\u0648\u0645\u06cc \u062a\u0648\u0644\u06cc\u062f \u062f\u0627\u062e\u0644)",
          general_id: "2720000187836",
        },
        28866: {
          value: 28866,
          text: "2710000187837(\u062a\u0627\u0628\u0644\u0648 \u0645\u0648\u0644\u062a\u06cc \u0645\u062f\u06cc\u0627 \u062a\u062c\u0647\u06cc\u0632\u0627\u062a \u062c\u0627\u0646\u0628\u06cc \u0633\u06cc\u0633\u062a\u0645 \u0647\u0627\u06cc \u0635\u0648\u062a\u06cc \u0648 \u062a\u0635\u0648\u06cc\u0631\u06cc - \u0634\u0646\u0627\u0633\u0647 \u0639\u0645\u0648\u0645\u06cc \u0648\u0627\u0631\u062f\u0627\u062a\u06cc)",
          general_id: "2710000187837",
        },
      },
      category_mefa_type: "general",
      statuses: [
        { value: "marketable", text: "\u0642\u0627\u0628\u0644 \u0641\u0631\u0648\u0634", selected: true },
        { value: "coming_soon", text: "\u0628\u0647 \u0632\u0648\u062f\u06cc", selected: false },
        { value: "stop_production", text: "\u062a\u0648\u0642\u0641 \u062a\u0648\u0644\u06cc\u062f", selected: false },
      ],
      fake_reasons: [
        {
          value:
            "\u0627\u06cc\u0646 \u0645\u062d\u0635\u0648\u0644 \u062f\u0631 \u0633\u0627\u06cc\u062a \u0633\u0627\u0632\u0646\u062f\u0647 \u06cc\u0627\u0641\u062a \u0646\u0634\u062f",
          text: 1,
        },
        {
          value:
            "\u0628\u0631\u0646\u062f \u062f\u0631 \u0639\u06a9\u0633 \u0647\u0627 \u0648 \u0645\u0634\u062e\u0635\u0627\u062a \u062f\u06cc\u06af\u0631 \u0622\u0648\u0631\u062f\u0647 \u0646\u0634\u062f\u0647",
          text: 6,
        },
        {
          value:
            "\u0628\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u06a9\u0627\u0644\u0627 \u0628\u0627 \u0628\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u0627\u0635\u0644\u06cc \u062a\u0641\u0627\u0648\u062a \u062f\u0627\u0631\u062f",
          text: 2,
        },
        { value: "\u062a\u063a\u06cc\u06cc\u0631\u0627\u062a LQA", text: 22 },
        {
          value:
            "\u062a\u0641\u0627\u0648\u062a \u062f\u0631 \u0628\u0631\u0646\u062f \u06a9\u0627\u0644\u0627 \u0628\u0627 \u06a9\u0627\u0644\u0627\u06cc \u0627\u0635\u0644\u06cc",
          text: 5,
        },
        {
          value:
            "\u0638\u0627\u0647\u0631 \u06a9\u0627\u0644\u0627 \u0628\u0627 \u06a9\u0627\u0644\u0627\u06cc \u0627\u0635\u0644\u06cc \u062a\u0641\u0627\u0648\u062a \u062f\u0627\u0631\u062f",
          text: 3,
        },
        {
          value:
            "\u06a9\u0634\u0648\u0631 \u0633\u0627\u0632\u0646\u062f\u0647 \u0645\u0639\u062a\u0628\u0631 \u0646\u06cc\u0633\u062a",
          text: 7,
        },
        {
          value:
            "\u06a9\u06cc\u0641\u06cc\u062a \u06a9\u0627\u0644\u0627 \u06cc\u0627 \u0628\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc \u0622\u0646 \u067e\u0627\u06cc\u06cc\u0646 \u0627\u0633\u062a",
          text: 4,
        },
      ],
      platforms: [
        { value: "digikala", text: "\u062f\u06cc\u062c\u06cc\u06a9\u0627\u0644\u0627", selected: true },
        { value: "fresh", text: "\u0641\u0650\u0631\u0650\u0634", selected: false },
      ],
    },
  },
};

fetch("https://seller.digikala.com/api/v2/product-creation/draft-product/6977605?draftProductId=6977605", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    priority: "u=1, i",
    "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-web-optimize-response": "1",
    cookie:
      "tracker_glob_new=cUc9MH0; TS018d011a=0102310591a1594da8997455f573997b010b3133c6657201a9a7231eea49e5a60ec969952b44348689d1e08109ce1f910181708faa; tracker_glob_new=cUc9MH0; PHPSESSID=336cv5vga9tl8u1edgjvjgsbuj; tracker_session=2XSGpZA; _sp_ses.13cb=*; seller_api_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MzI2ODc1NTAsInNlbGxlcl9pZCI6MTM5MzI3LCJwYXlsb2FkIjp7InVzZXJuYW1lIjoiOTg5MTA1MTI0MjA0IiwicmVnaXN0ZXJfcGhvbmUiOiI5ODkxMDUxMjQyMDQiLCJlbWFpbCI6ImRvb3ppYmFAZ21haWwuY29tIiwiYnVzaW5lc3NfbmFtZSI6Ilx1MDYyZlx1MDY0OFx1MDYzMlx1MDZjY1x1MDYyOFx1MDYyNyIsImZpcnN0X25hbWUiOiJcdTA2NDhcdTA2MmRcdTA2NGFcdTA2MmYiLCJsYXN0X25hbWUiOiJcdTA2MzVcdTA2MjdcdTA2MjhcdTA2MzFcdTA2NGEiLCJjb21wYW55X25hbWUiOm51bGwsInZlcmlmaWVkX2J5X290cCI6WyI5ODkxMDUxMjQyMDQiXX0sImV4cCI6MTc3NzA1OTg3MH0.cWt9QzXmPn7_BmWV2mRFqmvAk7_C7by8Yi1ElwEzpIMlL5BaO4k227eTEdca2I3h; seller_api_otp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0eXBlIjoib3RwIiwidG9rZW5faWQiOjMyNjg3NTQ5LCJzZWxsZXJfaWQiOm51bGwsInZlcmlmaWVkX2J5X290cCI6Ijk4OTEwNTEyNDIwNCIsImV4cCI6MTc3NzA1OTg2OX0.Zb6XUJPosK1YeCpIumM5usNjWpRwWEtj8Ze25_8CLtowNZ9oqxp7CZR27bg3zd5_; _dwid=019d2687-0194-72a4-bb3b-e61a726534e7; _sentinel_dwid=019d2687-0405-7359-8469-01eb10c645f3; _sp_id.13cb=c5fa7d90-916f-40d9-a98a-f15d95d4c6f9.1764573374.4.1774468797.1766707727.7de98137-d0fd-4e9b-8263-258b2ac30c17.3bae0d9b-5121-49e1-bcab-a00a40092336.c167a1c8-bf85-45c9-8bcc-2eb397dae419.1774467830014.55",
    Referer: "https://seller.digikala.com/pwa/product/create/2?categoryId=6946&draftProductId=6977605",
  },
  body: null,
  method: "GET",
});
var obj = {
  status: "ok",
  data: {
    id: 6977605,
    category_id: 6946,
    category_name: "\u062a\u0627\u0628\u0644\u0648",
    division_id: 4928,
    model: "\u062a\u0627\u0628\u0644\u0648 \u0641\u0631\u0636",
    brand_id: 719,
    brand_name: "\u0645\u062a\u0641\u0631\u0642\u0647",
    product_type_ids: [24054],
    is_iranian: true,
    product_classes: ["2"],
    fake: false,
    general_mefa_id: 893,
    exclusive_mefa_id: "",
    package_width: null,
    package_height: null,
    package_length: null,
    package_weight: null,
    platforms: null,
    advantages: ["\u0631\u0646\u06af \u062e\u0648\u0628"],
    disadvantages: ["\u06af\u0631\u062f \u0648 \u062a\u06cc\u0632"],
    title_en: null,
    title_fa: null,
    attributes: {
      6946: {
        4931: [21209, 21210],
        5127: [15907],
        5218: [14500],
        6597: "\u0632\u06cc\u0628\u0627",
        8482: [52502],
        10043: [51393],
        10129: "\u0627\u0628\u06cc",
        10132: [52453],
        119: "\u062a\u0648\u0636\u06cc\u062d\u0627\u062a",
        5065: [19139],
        5080: [19150],
        7830: [35285],
        10130: "12",
        10131: [52450],
      },
    },
    width: 0,
    height: 0,
    length: 0,
    weight: 0,
    remaining_day: 29,
    marketplace_seller_id: 139327,
    next_step: [],
    step: "step_attribute",
    score: {
      score_details: {
        category: { max: 1, current: 1 },
        brand: { max: 1, current: 1 },
        type: { max: 1, current: 1 },
        model: { max: 1, current: 1 },
        originality: { max: 1, current: 1 },
        division: { max: 1, current: 1 },
        mefa: { max: 1, current: 1 },
        description: { max: 2, current: 0 },
        advantage: { max: 2, current: 2 },
        disadvantage: { max: 2, current: 2 },
        attribute_6597: { max: 1, current: 1 },
        attribute_8482: { max: 1, current: 1 },
        attribute_10043: { max: 1, current: 1 },
        attribute_10129: { max: 1, current: 1 },
        attribute_10130: { max: 2, current: 2 },
        attribute_10131: { max: 2, current: 2 },
        attribute_10132: { max: 1, current: 1 },
        attribute_7830: { max: 2, current: 2 },
        attribute_5127: { max: 1, current: 1 },
        attribute_4931: { max: 1, current: 1 },
        attribute_5065: { max: 2, current: 2 },
        attribute_5080: { max: 2, current: 2 },
        attribute_5218: { max: 1, current: 1 },
        attribute_119: { max: 2, current: 2 },
        title_fa: { max: 1, current: 0 },
        title_en: { max: 2, current: 0 },
        photo: { max: 6, current: 0 },
      },
      total: 31,
      max: 42,
      percent: 73,
    },
  },
};

fetch("https://seller.digikala.com/api/v2/commission/6946/719", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    priority: "u=1, i",
    "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-web-optimize-response": "1",
    cookie:
      "tracker_glob_new=cUc9MH0; TS018d011a=0102310591a1594da8997455f573997b010b3133c6657201a9a7231eea49e5a60ec969952b44348689d1e08109ce1f910181708faa; tracker_glob_new=cUc9MH0; PHPSESSID=336cv5vga9tl8u1edgjvjgsbuj; tracker_session=2XSGpZA; _sp_ses.13cb=*; seller_api_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MzI2ODc1NTAsInNlbGxlcl9pZCI6MTM5MzI3LCJwYXlsb2FkIjp7InVzZXJuYW1lIjoiOTg5MTA1MTI0MjA0IiwicmVnaXN0ZXJfcGhvbmUiOiI5ODkxMDUxMjQyMDQiLCJlbWFpbCI6ImRvb3ppYmFAZ21haWwuY29tIiwiYnVzaW5lc3NfbmFtZSI6Ilx1MDYyZlx1MDY0OFx1MDYzMlx1MDZjY1x1MDYyOFx1MDYyNyIsImZpcnN0X25hbWUiOiJcdTA2NDhcdTA2MmRcdTA2NGFcdTA2MmYiLCJsYXN0X25hbWUiOiJcdTA2MzVcdTA2MjdcdTA2MjhcdTA2MzFcdTA2NGEiLCJjb21wYW55X25hbWUiOm51bGwsInZlcmlmaWVkX2J5X290cCI6WyI5ODkxMDUxMjQyMDQiXX0sImV4cCI6MTc3NzA1OTg3MH0.cWt9QzXmPn7_BmWV2mRFqmvAk7_C7by8Yi1ElwEzpIMlL5BaO4k227eTEdca2I3h; seller_api_otp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0eXBlIjoib3RwIiwidG9rZW5faWQiOjMyNjg3NTQ5LCJzZWxsZXJfaWQiOm51bGwsInZlcmlmaWVkX2J5X290cCI6Ijk4OTEwNTEyNDIwNCIsImV4cCI6MTc3NzA1OTg2OX0.Zb6XUJPosK1YeCpIumM5usNjWpRwWEtj8Ze25_8CLtowNZ9oqxp7CZR27bg3zd5_; _dwid=019d2687-0194-72a4-bb3b-e61a726534e7; _sentinel_dwid=019d2687-0405-7359-8469-01eb10c645f3; _sp_id.13cb=c5fa7d90-916f-40d9-a98a-f15d95d4c6f9.1764573374.4.1774468797.1766707727.7de98137-d0fd-4e9b-8263-258b2ac30c17.3bae0d9b-5121-49e1-bcab-a00a40092336.c167a1c8-bf85-45c9-8bcc-2eb397dae419.1774467830014.55",
    Referer: "https://seller.digikala.com/pwa/product/create/2?categoryId=6946&draftProductId=6977605",
  },
  body: null,
  method: "GET",
});
var obj = { status: "ok", data: { commission: "15%" } };

fetch("https://seller.digikala.com/api/v2/product-creation/product/detail/validation", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    "content-type": "application/json",
    priority: "u=1, i",
    "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-web-optimize-response": "1",
    cookie:
      "tracker_glob_new=cUc9MH0; TS018d011a=0102310591a1594da8997455f573997b010b3133c6657201a9a7231eea49e5a60ec969952b44348689d1e08109ce1f910181708faa; tracker_glob_new=cUc9MH0; PHPSESSID=336cv5vga9tl8u1edgjvjgsbuj; tracker_session=2XSGpZA; _sp_ses.13cb=*; seller_api_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MzI2ODc1NTAsInNlbGxlcl9pZCI6MTM5MzI3LCJwYXlsb2FkIjp7InVzZXJuYW1lIjoiOTg5MTA1MTI0MjA0IiwicmVnaXN0ZXJfcGhvbmUiOiI5ODkxMDUxMjQyMDQiLCJlbWFpbCI6ImRvb3ppYmFAZ21haWwuY29tIiwiYnVzaW5lc3NfbmFtZSI6Ilx1MDYyZlx1MDY0OFx1MDYzMlx1MDZjY1x1MDYyOFx1MDYyNyIsImZpcnN0X25hbWUiOiJcdTA2NDhcdTA2MmRcdTA2NGFcdTA2MmYiLCJsYXN0X25hbWUiOiJcdTA2MzVcdTA2MjdcdTA2MjhcdTA2MzFcdTA2NGEiLCJjb21wYW55X25hbWUiOm51bGwsInZlcmlmaWVkX2J5X290cCI6WyI5ODkxMDUxMjQyMDQiXX0sImV4cCI6MTc3NzA1OTg3MH0.cWt9QzXmPn7_BmWV2mRFqmvAk7_C7by8Yi1ElwEzpIMlL5BaO4k227eTEdca2I3h; seller_api_otp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0eXBlIjoib3RwIiwidG9rZW5faWQiOjMyNjg3NTQ5LCJzZWxsZXJfaWQiOm51bGwsInZlcmlmaWVkX2J5X290cCI6Ijk4OTEwNTEyNDIwNCIsImV4cCI6MTc3NzA1OTg2OX0.Zb6XUJPosK1YeCpIumM5usNjWpRwWEtj8Ze25_8CLtowNZ9oqxp7CZR27bg3zd5_; _dwid=019d2687-0194-72a4-bb3b-e61a726534e7; _sentinel_dwid=019d2687-0405-7359-8469-01eb10c645f3; _sp_id.13cb=c5fa7d90-916f-40d9-a98a-f15d95d4c6f9.1764573374.4.1774468797.1766707727.7de98137-d0fd-4e9b-8263-258b2ac30c17.3bae0d9b-5121-49e1-bcab-a00a40092336.c167a1c8-bf85-45c9-8bcc-2eb397dae419.1774467830014.55",
    Referer: "https://seller.digikala.com/pwa/product/create/2?categoryId=6946&draftProductId=6977605",
  },
  body: '{"division_id":4928,"model":"تابلو فرض","brand_id":719,"product_type_ids":[24054],"is_iranian":true,"product_classes":["2"],"fake":true,"general_mefa_id":894,"exclusive_mefa_id":null,"package_width":0,"package_height":0,"package_length":0,"package_weight":0,"advantages":["رنگ خوب"],"disadvantages":["گرد و تیز"],"category_id":6946,"fake_reasons":[],"only_cf_fields":{"status":"marketable","platforms":["digikala"],"other_titles":[]},"draft_product_id":6977605}',
  method: "POST",
});
var obj = {
  status: "ok",
  data: {
    force_url: null,
    is_valid: true,
    errors: [],
    bind: {
      category_id: 6946,
      division_id: 4928,
      model: "\u062a\u0627\u0628\u0644\u0648 \u0641\u0631\u0636",
      brand_id: 719,
      product_type_ids: [24054],
      is_iranian: true,
      product_classes: ["2"],
      fake: true,
      general_mefa_id: 894,
      exclusive_mefa_id: "",
      package_width: 0,
      package_height: 0,
      package_length: 0,
      package_weight: 0,
      advantages: ["\u0631\u0646\u06af \u062e\u0648\u0628"],
      disadvantages: ["\u06af\u0631\u062f \u0648 \u062a\u06cc\u0632"],
      product_nature: "non_fmcg",
      sensitivity: "normal",
      status: "marketable",
      active: true,
      active_digistyle: false,
      product_type: "product",
      site: "digikala",
      platforms: ["digikala"],
      fake_reasons: [],
      vat: 9,
      is_created_by_cf: false,
    },
    draft_product_id: 6977605,
  },
};

fetch("https://seller.digikala.com/api/v2/product-creation/auto-title/save", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    "content-type": "application/json",
    priority: "u=1, i",
    "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-web-optimize-response": "1",
    cookie:
      "tracker_glob_new=cUc9MH0; TS018d011a=0102310591a1594da8997455f573997b010b3133c6657201a9a7231eea49e5a60ec969952b44348689d1e08109ce1f910181708faa; tracker_glob_new=cUc9MH0; PHPSESSID=336cv5vga9tl8u1edgjvjgsbuj; tracker_session=2XSGpZA; _sp_ses.13cb=*; seller_api_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MzI2ODc1NTAsInNlbGxlcl9pZCI6MTM5MzI3LCJwYXlsb2FkIjp7InVzZXJuYW1lIjoiOTg5MTA1MTI0MjA0IiwicmVnaXN0ZXJfcGhvbmUiOiI5ODkxMDUxMjQyMDQiLCJlbWFpbCI6ImRvb3ppYmFAZ21haWwuY29tIiwiYnVzaW5lc3NfbmFtZSI6Ilx1MDYyZlx1MDY0OFx1MDYzMlx1MDZjY1x1MDYyOFx1MDYyNyIsImZpcnN0X25hbWUiOiJcdTA2NDhcdTA2MmRcdTA2NGFcdTA2MmYiLCJsYXN0X25hbWUiOiJcdTA2MzVcdTA2MjdcdTA2MjhcdTA2MzFcdTA2NGEiLCJjb21wYW55X25hbWUiOm51bGwsInZlcmlmaWVkX2J5X290cCI6WyI5ODkxMDUxMjQyMDQiXX0sImV4cCI6MTc3NzA1OTg3MH0.cWt9QzXmPn7_BmWV2mRFqmvAk7_C7by8Yi1ElwEzpIMlL5BaO4k227eTEdca2I3h; seller_api_otp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0eXBlIjoib3RwIiwidG9rZW5faWQiOjMyNjg3NTQ5LCJzZWxsZXJfaWQiOm51bGwsInZlcmlmaWVkX2J5X290cCI6Ijk4OTEwNTEyNDIwNCIsImV4cCI6MTc3NzA1OTg2OX0.Zb6XUJPosK1YeCpIumM5usNjWpRwWEtj8Ze25_8CLtowNZ9oqxp7CZR27bg3zd5_; _dwid=019d2687-0194-72a4-bb3b-e61a726534e7; _sentinel_dwid=019d2687-0405-7359-8469-01eb10c645f3; _sp_id.13cb=c5fa7d90-916f-40d9-a98a-f15d95d4c6f9.1764573374.4.1774468834.1766707727.7de98137-d0fd-4e9b-8263-258b2ac30c17.3bae0d9b-5121-49e1-bcab-a00a40092336.c167a1c8-bf85-45c9-8bcc-2eb397dae419.1774467830014.57",
    Referer: "https://seller.digikala.com/pwa/product/create/4?categoryId=6946&draftProductId=6977605",
  },
  body: '{"draft_product_id":6977605,"title_fa":"تابلو طرح زیبا مدل تابلو فرض فریم ابی","title_en":""}',
  method: "POST",
});
var obj = {
  status: "ok",
  data: {
    isValid: true,
    data: {
      title_fa:
        "\u062a\u0627\u0628\u0644\u0648 \u0637\u0631\u062d \u0632\u06cc\u0628\u0627 \u0645\u062f\u0644 \u062a\u0627\u0628\u0644\u0648 \u0641\u0631\u0636 \u0641\u0631\u06cc\u0645 \u0627\u0628\u06cc",
      title_en: "",
      suggested_title_fa:
        "\u062a\u0627\u0628\u0644\u0648 \u0637\u0631\u062d \u0632\u06cc\u0628\u0627 \u0645\u062f\u0644 \u062a\u0627\u0628\u0644\u0648 \u0641\u0631\u0636 \u0641\u0631\u06cc\u0645 \u0627\u0628\u06cc",
      suggested_title_en: "",
      url_code:
        "\u062a\u0627\u0628\u0644\u0648-\u0637\u0631\u062d-\u0632\u06cc\u0628\u0627-\u0645\u062f\u0644-\u062a\u0627\u0628\u0644\u0648-\u0641\u0631\u0636-\u0641\u0631\u06cc\u0645-\u0627\u0628\u06cc",
    },
  },
};

fetch("https://seller.digikala.com/api/v2/product-creation/images/upload", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundarywRWSD9HPWgzYw6hc",
    priority: "u=1, i",
    "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-web-optimize-response": "1",
    cookie:
      "tracker_glob_new=cUc9MH0; TS018d011a=0102310591a1594da8997455f573997b010b3133c6657201a9a7231eea49e5a60ec969952b44348689d1e08109ce1f910181708faa; tracker_glob_new=cUc9MH0; PHPSESSID=336cv5vga9tl8u1edgjvjgsbuj; tracker_session=2XSGpZA; _sp_ses.13cb=*; seller_api_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MzI2ODc1NTAsInNlbGxlcl9pZCI6MTM5MzI3LCJwYXlsb2FkIjp7InVzZXJuYW1lIjoiOTg5MTA1MTI0MjA0IiwicmVnaXN0ZXJfcGhvbmUiOiI5ODkxMDUxMjQyMDQiLCJlbWFpbCI6ImRvb3ppYmFAZ21haWwuY29tIiwiYnVzaW5lc3NfbmFtZSI6Ilx1MDYyZlx1MDY0OFx1MDYzMlx1MDZjY1x1MDYyOFx1MDYyNyIsImZpcnN0X25hbWUiOiJcdTA2NDhcdTA2MmRcdTA2NGFcdTA2MmYiLCJsYXN0X25hbWUiOiJcdTA2MzVcdTA2MjdcdTA2MjhcdTA2MzFcdTA2NGEiLCJjb21wYW55X25hbWUiOm51bGwsInZlcmlmaWVkX2J5X290cCI6WyI5ODkxMDUxMjQyMDQiXX0sImV4cCI6MTc3NzA1OTg3MH0.cWt9QzXmPn7_BmWV2mRFqmvAk7_C7by8Yi1ElwEzpIMlL5BaO4k227eTEdca2I3h; seller_api_otp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0eXBlIjoib3RwIiwidG9rZW5faWQiOjMyNjg3NTQ5LCJzZWxsZXJfaWQiOm51bGwsInZlcmlmaWVkX2J5X290cCI6Ijk4OTEwNTEyNDIwNCIsImV4cCI6MTc3NzA1OTg2OX0.Zb6XUJPosK1YeCpIumM5usNjWpRwWEtj8Ze25_8CLtowNZ9oqxp7CZR27bg3zd5_; _dwid=019d2687-0194-72a4-bb3b-e61a726534e7; _sentinel_dwid=019d2687-0405-7359-8469-01eb10c645f3; _sp_id.13cb=c5fa7d90-916f-40d9-a98a-f15d95d4c6f9.1764573374.4.1774468869.1766707727.7de98137-d0fd-4e9b-8263-258b2ac30c17.3bae0d9b-5121-49e1-bcab-a00a40092336.c167a1c8-bf85-45c9-8bcc-2eb397dae419.1774467830014.60",
    Referer: "https://seller.digikala.com/pwa/product/create/5?categoryId=6946&draftProductId=6977605",
  },
  body: '------WebKitFormBoundarywRWSD9HPWgzYw6hc\r\nContent-Disposition: form-data; name="file"; filename="IAS_Logo.jpeg"\r\nContent-Type: image/jpeg\r\n\r\n\r\n------WebKitFormBoundarywRWSD9HPWgzYw6hc\r\nContent-Disposition: form-data; name="slot"\r\n\r\n1\r\n------WebKitFormBoundarywRWSD9HPWgzYw6hc--\r\n',
  method: "POST",
});
var obj = {
  status: "ok",
  data: {
    isValid: true,
    data: {
      id: "7RyIf",
      url: "https:\/\/dkstatics-public.digikala.com\/digikala-products\/3e37fee53a36abc8ee66d743df3a564a043b5c63_1774468879.jpg?x-oss-process=image\/resize,m_fill,h_90,w_90",
      tempFile: true,
    },
  },
};

fetch("https://seller.digikala.com/api/v2/product-creation/images/upload", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryA00BzpBpG79Eleq1",
    priority: "u=1, i",
    "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-web-optimize-response": "1",
    cookie:
      "tracker_glob_new=cUc9MH0; TS018d011a=0102310591a1594da8997455f573997b010b3133c6657201a9a7231eea49e5a60ec969952b44348689d1e08109ce1f910181708faa; tracker_glob_new=cUc9MH0; PHPSESSID=336cv5vga9tl8u1edgjvjgsbuj; tracker_session=2XSGpZA; _sp_ses.13cb=*; seller_api_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MzI2ODc1NTAsInNlbGxlcl9pZCI6MTM5MzI3LCJwYXlsb2FkIjp7InVzZXJuYW1lIjoiOTg5MTA1MTI0MjA0IiwicmVnaXN0ZXJfcGhvbmUiOiI5ODkxMDUxMjQyMDQiLCJlbWFpbCI6ImRvb3ppYmFAZ21haWwuY29tIiwiYnVzaW5lc3NfbmFtZSI6Ilx1MDYyZlx1MDY0OFx1MDYzMlx1MDZjY1x1MDYyOFx1MDYyNyIsImZpcnN0X25hbWUiOiJcdTA2NDhcdTA2MmRcdTA2NGFcdTA2MmYiLCJsYXN0X25hbWUiOiJcdTA2MzVcdTA2MjdcdTA2MjhcdTA2MzFcdTA2NGEiLCJjb21wYW55X25hbWUiOm51bGwsInZlcmlmaWVkX2J5X290cCI6WyI5ODkxMDUxMjQyMDQiXX0sImV4cCI6MTc3NzA1OTg3MH0.cWt9QzXmPn7_BmWV2mRFqmvAk7_C7by8Yi1ElwEzpIMlL5BaO4k227eTEdca2I3h; seller_api_otp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0eXBlIjoib3RwIiwidG9rZW5faWQiOjMyNjg3NTQ5LCJzZWxsZXJfaWQiOm51bGwsInZlcmlmaWVkX2J5X290cCI6Ijk4OTEwNTEyNDIwNCIsImV4cCI6MTc3NzA1OTg2OX0.Zb6XUJPosK1YeCpIumM5usNjWpRwWEtj8Ze25_8CLtowNZ9oqxp7CZR27bg3zd5_; _dwid=019d2687-0194-72a4-bb3b-e61a726534e7; _sentinel_dwid=019d2687-0405-7359-8469-01eb10c645f3; _sp_id.13cb=c5fa7d90-916f-40d9-a98a-f15d95d4c6f9.1764573374.4.1774468928.1766707727.7de98137-d0fd-4e9b-8263-258b2ac30c17.3bae0d9b-5121-49e1-bcab-a00a40092336.c167a1c8-bf85-45c9-8bcc-2eb397dae419.1774467830014.66",
    Referer: "https://seller.digikala.com/pwa/product/create/5?categoryId=6946&draftProductId=6977605",
  },
  body: '------WebKitFormBoundaryA00BzpBpG79Eleq1\r\nContent-Disposition: form-data; name="file"; filename="20230112.jpg"\r\nContent-Type: image/jpeg\r\n\r\n\r\n------WebKitFormBoundaryA00BzpBpG79Eleq1\r\nContent-Disposition: form-data; name="slot"\r\n\r\n1\r\n------WebKitFormBoundaryA00BzpBpG79Eleq1--\r\n',
  method: "POST",
});
var obj = {
  status: "ok",
  data: {
    isValid: true,
    data: {
      id: "7RyIi",
      url: "https:\/\/dkstatics-public.digikala.com\/digikala-products\/a68f8578b8fc6ee13b7090b9264217779112c181_1774468939.jpg?x-oss-process=image\/resize,m_fill,h_90,w_90",
      tempFile: true,
    },
  },
};

fetch("https://seller.digikala.com/api/v2/product-creation/save", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    "content-type": "application/json",
    priority: "u=1, i",
    "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-web-optimize-response": "1",
    cookie:
      "tracker_glob_new=cUc9MH0; TS018d011a=0102310591a1594da8997455f573997b010b3133c6657201a9a7231eea49e5a60ec969952b44348689d1e08109ce1f910181708faa; tracker_glob_new=cUc9MH0; PHPSESSID=336cv5vga9tl8u1edgjvjgsbuj; tracker_session=2XSGpZA; _sp_ses.13cb=*; seller_api_access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl9pZCI6MzI2ODc1NTAsInNlbGxlcl9pZCI6MTM5MzI3LCJwYXlsb2FkIjp7InVzZXJuYW1lIjoiOTg5MTA1MTI0MjA0IiwicmVnaXN0ZXJfcGhvbmUiOiI5ODkxMDUxMjQyMDQiLCJlbWFpbCI6ImRvb3ppYmFAZ21haWwuY29tIiwiYnVzaW5lc3NfbmFtZSI6Ilx1MDYyZlx1MDY0OFx1MDYzMlx1MDZjY1x1MDYyOFx1MDYyNyIsImZpcnN0X25hbWUiOiJcdTA2NDhcdTA2MmRcdTA2NGFcdTA2MmYiLCJsYXN0X25hbWUiOiJcdTA2MzVcdTA2MjdcdTA2MjhcdTA2MzFcdTA2NGEiLCJjb21wYW55X25hbWUiOm51bGwsInZlcmlmaWVkX2J5X290cCI6WyI5ODkxMDUxMjQyMDQiXX0sImV4cCI6MTc3NzA1OTg3MH0.cWt9QzXmPn7_BmWV2mRFqmvAk7_C7by8Yi1ElwEzpIMlL5BaO4k227eTEdca2I3h; seller_api_otp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ0eXBlIjoib3RwIiwidG9rZW5faWQiOjMyNjg3NTQ5LCJzZWxsZXJfaWQiOm51bGwsInZlcmlmaWVkX2J5X290cCI6Ijk4OTEwNTEyNDIwNCIsImV4cCI6MTc3NzA1OTg2OX0.Zb6XUJPosK1YeCpIumM5usNjWpRwWEtj8Ze25_8CLtowNZ9oqxp7CZR27bg3zd5_; _dwid=019d2687-0194-72a4-bb3b-e61a726534e7; _sentinel_dwid=019d2687-0405-7359-8469-01eb10c645f3; _sp_id.13cb=c5fa7d90-916f-40d9-a98a-f15d95d4c6f9.1764573374.4.1774468938.1766707727.7de98137-d0fd-4e9b-8263-258b2ac30c17.3bae0d9b-5121-49e1-bcab-a00a40092336.c167a1c8-bf85-45c9-8bcc-2eb397dae419.1774467830014.67",
    Referer: "https://seller.digikala.com/pwa/product/create/5?categoryId=6946&draftProductId=6977605",
  },
  body: '{"category_id":6946,"draft_product_id":6977605,"only_b2b":false,"photos_detail":{"main_image":"7RyIf","order":"7RyIf,7RyIi","images":[{"encrypted_id":"7RyIf","active":true},{"encrypted_id":"7RyIi"}]}}',
  method: "POST",
});
var obj = { status: "ok", data: { data: { product_id: 21599970 } } };
