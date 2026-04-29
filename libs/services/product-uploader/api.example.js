fetch("https://seller.digikala.com/api/v2/product-edit/21602021/publish", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    priority: "u=1, i",
    "sec-ch-ua": '"Brave";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-web-optimize-response": "1",
  },
  referrer: "https://seller.digikala.com/pwa/product-management?page=2",
  body: null,
  method: "POST",
  mode: "cors",
  credentials: "include",
});
const result = { status: "ok", data: { isValid: true } };
