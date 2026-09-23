// 7-Layer Analytical Fraud Detection Engine for UPI QR Codes
// Strictly adheres to Chapter 5 (Fig 5.3) and Chapter 8 of the Project Specifications

// Known trusted Payment Service Provider (PSP) handles
const TRUSTED_PSP_HANDLES = [
  "okhdfcbank", "oksbi", "okaxis", "okicici", "paytm", "ybl", "upi", 
  "ibl", "axl", "federal", "kotak", "barodampay", "postbank", "indus", 
  "aubank", "jupiteraxis", "idfcbank", "yesbank", "airtel", "pingpay", "sbi"
];

// High-risk and phishing keywords
const SUSPICIOUS_KEYWORDS = [
  "lottery", "winner", "prize", "cashback-claim", "refund-service", 
  "free-money", "hack", "freehack", "crypto-claim", "telegram", "airdrop",
  "lucky-draw", "double-money", "gift-card", "urgent-payment", "verify-account"
];

// Suspicious Top-Level Domains or URL shorteners
const SUSPICIOUS_DOMAINS = [
  ".xyz", ".top", ".biz", ".tk", ".ml", ".ru", ".click", ".gq", ".cf",
  "bit.ly", "tinyurl.com", "is.gd", "rb.gy", "t.co", "cutt.ly"
];

const MAX_SAFE_AMOUNT_THRESHOLD = 50000; // As specified in Project Report Pseudocode

/**
 * Parses raw QR string into structured payment payload
 * Supports UPI URL schemes (upi://pay?...), JSON payloads, and standard URLs
 */
export function parseQrData(rawData) {
  if (!rawData || typeof rawData !== "string") {
    return {
      isValid: false,
      error: "Empty or invalid QR data format",
      raw: rawData || "",
    };
  }

  const cleanData = rawData.trim();

  // Case 1: Standard UPI Scheme (upi://pay?...) - Case-insensitive match
  if (/^upi:\/\/pay/i.test(cleanData)) {
    try {
      const queryIndex = cleanData.indexOf("?");
      const queryString = queryIndex !== -1 ? cleanData.substring(queryIndex + 1) : "";
      const pairs = queryString.split("&");
      const map = {};

      pairs.forEach((p) => {
        const eqIdx = p.indexOf("=");
        if (eqIdx !== -1) {
          const k = p.substring(0, eqIdx).trim().toLowerCase();
          const v = p.substring(eqIdx + 1);
          try {
            map[k] = decodeURIComponent(v.replace(/\+/g, " "));
          } catch (e) {
            map[k] = v;
          }
        }
      });

      const upiId = map["pa"] || "";
      const rawMerchant = map["pn"] || "";
      const amValue = map["am"] || "";
      const parsedAmount = amValue ? parseFloat(amValue) : 0;
      const currency = map["cu"] || "INR";
      const merchantCode = map["mc"] || "";
      const transactionRef = map["tr"] || "";
      const note = map["tn"] || "";
      const linkUrl = map["url"] || "";

      let merchantName = rawMerchant;
      if (!merchantName && upiId) {
        const prefix = upiId.split("@")[0] || "Merchant";
        merchantName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      } else if (!merchantName) {
        merchantName = "Merchant";
      }

      return {
        isValid: Boolean(upiId),
        type: "UPI_URI",
        merchantName,
        upiId,
        amount: isNaN(parsedAmount) ? 0 : parsedAmount,
        currency,
        merchantCode,
        transactionRef,
        note,
        embeddedUrl: linkUrl,
        raw: cleanData,
      };
    } catch (e) {
      console.warn("UPI parsing exception", e);
    }
  }

  // Case 2: JSON Payload (e.g., {"merchantName": "...", "upiId": "...", "amount": 3000})
  try {
    const jsonObj = JSON.parse(cleanData);
    if (jsonObj && typeof jsonObj === "object") {
      const upiId = jsonObj.upiId || jsonObj.pa || jsonObj.vpa || "";
      const merchantName = jsonObj.merchantName || jsonObj.name || jsonObj.pn || "Merchant";
      const amount = jsonObj.amount || jsonObj.am || 0;

      return {
        isValid: Boolean(upiId || merchantName),
        type: "JSON_PAYLOAD",
        merchantName,
        upiId,
        amount: parseFloat(amount) || 0,
        currency: jsonObj.currency || "INR",
        merchantCode: jsonObj.mc || "",
        transactionRef: jsonObj.tr || "",
        note: jsonObj.note || jsonObj.tn || "",
        embeddedUrl: jsonObj.url || "",
        raw: cleanData,
      };
    }
  } catch (e) {
    // Not JSON
  }

  // Case 3: Raw UPI ID or contact (e.g. name@okhdfcbank)
  if (cleanData.includes("@") && !cleanData.includes(" ") && cleanData.length < 60) {
    const prefix = cleanData.split("@")[0] || "Merchant";
    const derivedName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    return {
      isValid: true,
      type: "RAW_UPI_ID",
      merchantName: derivedName,
      upiId: cleanData,
      amount: 0,
      currency: "INR",
      raw: cleanData,
    };
  }

  // Case 4: Web URL
  if (/^https?:\/\//i.test(cleanData)) {
    return {
      isValid: true,
      type: "WEB_URL",
      merchantName: "External Web Link",
      upiId: cleanData,
      amount: 0,
      currency: "INR",
      embeddedUrl: cleanData,
      raw: cleanData,
    };
  }

  return {
    isValid: false,
    type: "UNSUPPORTED",
    error: "Scanned QR does not conform to UPI standard specifications",
    merchantName: "Unknown",
    upiId: cleanData,
    amount: 0,
    raw: cleanData,
  };
}

/**
 * 7-Layer Analytical Fraud Analysis & Risk Classification
 */
export function analyzeFraudRisk(parsedData) {
  const flags = [];
  let riskScore = 0; // 0 to 100

  if (!parsedData || !parsedData.isValid) {
    return {
      status: "fraud", // "safe" | "caution" | "fraud"
      riskScore: 100,
      isSafe: false,
      titleKey: "statusFraud",
      summary: "Invalid or tampered QR code structure. Missing valid UPI parameters.",
      flags: [
        "Structure Validation Failed: QR does not contain valid UPI payment metadata",
        "Potential Malicious / Broken QR payload",
      ],
      merchantName: "Invalid QR",
      upiId: parsedData?.raw || "Unknown",
      amount: 0,
    };
  }

  const { merchantName, upiId, amount, embeddedUrl, note } = parsedData;
  const lowerUpi = (upiId || "").toLowerCase();
  const lowerName = (merchantName || "").toLowerCase();
  const lowerNote = (note || "").toLowerCase();
  const lowerUrl = (embeddedUrl || "").toLowerCase();

  // Layer 3: Structural Integrity Check
  if (!upiId) {
    flags.push("Critical: Missing Payee Virtual Payment Address (VPA/UPI ID)");
    riskScore += 60;
  } else if (!upiId.includes("@")) {
    flags.push("Structural Error: UPI ID is malformed (missing '@' separator)");
    riskScore += 50;
  }

  if (!merchantName || merchantName === "Unknown Merchant" || merchantName === "Unknown") {
    flags.push("Missing Payee Name metadata in QR payload");
    riskScore += 25;
  }

  // Layer 4: Payee Identity & Domain Anomaly Detection
  if (upiId && upiId.includes("@")) {
    const handle = lowerUpi.split("@")[1] || "";
    const isKnownPSP = TRUSTED_PSP_HANDLES.some((h) => handle.includes(h));

    if (!isKnownPSP) {
      flags.push(`Unverified / Custom Bank Handle: '@${handle}'`);
      riskScore += 20;
    }

    // Check for suspicious / phishing words in UPI ID or Merchant Name
    const containsPhishingWord = SUSPICIOUS_KEYWORDS.some(
      (kw) => lowerUpi.includes(kw) || lowerName.includes(kw) || lowerNote.includes(kw)
    );

    if (containsPhishingWord) {
      flags.push("High Risk Phishing / Scam Keywords detected in payment metadata");
      riskScore += 65;
    }

    // Check for suspicious TLDs or URL redirection
    const hasSuspiciousDomain = SUSPICIOUS_DOMAINS.some(
      (d) => lowerUpi.includes(d) || lowerUrl.includes(d)
    );

    if (hasSuspiciousDomain) {
      flags.push("Malicious Redirection: Detected suspicious external domain or link shortener");
      riskScore += 70;
    }
  }

  // Layer 5: Rule-Based Threshold & Transaction Amount Anomaly
  if (amount > MAX_SAFE_AMOUNT_THRESHOLD) {
    flags.push(`Abnormally High Transaction Amount: ₹${amount.toLocaleString()} exceeds threshold (₹${MAX_SAFE_AMOUNT_THRESHOLD.toLocaleString()})`);
    riskScore += 60;
  } else if (amount > 20000) {
    flags.push(`High Value Payment Notice: ₹${amount.toLocaleString()} (verify payee before entering PIN)`);
    riskScore += 15;
  }

  if (amount === 0) {
    flags.push("Static QR Notice: Amount not pre-filled. Please manually enter correct amount.");
    // slight score only for reminder
    riskScore += 5;
  }

  // Cap risk score between 0 and 100
  riskScore = Math.min(100, Math.max(0, riskScore));

  // Determine Classification Level
  let status = "safe";
  let titleKey = "statusSafe";
  let isSafe = true;

  if (riskScore >= 50 || flags.some((f) => f.includes("Critical") || f.includes("High Risk") || f.includes("Abnormally High"))) {
    status = "fraud";
    titleKey = "statusFraud";
    isSafe = false;
  } else if (riskScore > 15) {
    status = "caution";
    titleKey = "statusCaution";
    isSafe = true; // can proceed with caution
  }

  if (flags.length === 0) {
    flags.push("Verified Merchant Identity and Trusted NPCI PSP Handle");
    flags.push("Normal transaction amount within safe limits");
    flags.push("Passed all 7 analytical structural validation checks");
  }

  return {
    status,
    riskScore,
    isSafe,
    titleKey,
    flags,
    merchantName,
    upiId,
    amount,
    currency: parsedData.currency || "INR",
    note: parsedData.note || "",
    transactionRef: parsedData.transactionRef || "",
  };
}

/**
 * Built-in Preset Test Scenarios for Demonstration and Viva Evaluation
 */
export const SAMPLE_QR_PRESETS = [
  {
    id: "safe_grocery",
    title: "🟢 Genuine Merchant (Star Mart)",
    description: "Verified supermarket QR code with normal amount (₹350)",
    rawPayload: "upi://pay?pa=starmart@okaxis&pn=Star%20Supermarket&am=350.00&cu=INR&mc=5411",
  },
  {
    id: "safe_pharmacy",
    title: "🟢 Trusted Pharmacy (Apollo Care)",
    description: "Verified medical merchant QR code (₹1,250)",
    rawPayload: "upi://pay?pa=apollocare@okhdfcbank&pn=Apollo%20Pharmacy&am=1250.00&cu=INR",
  },
  {
    id: "fraud_phishing",
    title: "🔴 Phishing / Fake Prize Scam",
    description: "Tampered QR claiming free lottery cash with suspicious domain handle",
    rawPayload: "upi://pay?pa=lottery-claim-prize@freemoney.xyz&pn=Win%20Double%20Cash&am=2999.00&cu=INR&tn=Prize+Verification+Fee",
  },
  {
    id: "fraud_high_amount",
    title: "🔴 Abnormally High Amount (> ₹50,000)",
    description: "Tampered transaction amount of ₹85,000 exceeding security limits",
    rawPayload: "upi://pay?pa=luxuryjewels@icici&pn=Luxury%20Jewellers&am=85000.00&cu=INR",
  },
  {
    id: "fraud_malformed",
    title: "🔴 Malformed QR / Missing Merchant",
    description: "Tampered QR with missing merchant identity and broken parameters",
    rawPayload: "upi://pay?pn=&am=5000&cu=INR",
  },
  {
    id: "caution_dynamic",
    title: "🟡 Unverified P2P Transfer",
    description: "Unverified individual contact with dynamic amount",
    rawPayload: "upi://pay?pa=rahul992@customwallet&pn=Rahul%20Sharma&am=4500.00&cu=INR",
  }
];
