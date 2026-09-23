// Theme definition for FraudSafe QR
export const COLORS = {
  primary: "#1E3A8A",       // Deep Royal Blue
  primaryDark: "#0F172A",   // Midnight Slate
  primaryLight: "#3B82F6",  // Vivid Blue
  accent: "#6366F1",        // Indigo
  accentLight: "#EEF2FF",   // Soft Indigo Tint
  
  // Risk & Fraud Indicators (Strictly aligned with project specification)
  safeGreen: "#10B981",
  safeGreenDark: "#047857",
  safeGreenBg: "#ECFDF5",
  safeGreenBorder: "#A7F3D0",
  
  fraudRed: "#EF4444",
  fraudRedDark: "#B91C1C",
  fraudRedBg: "#FEF2F2",
  fraudRedBorder: "#FECACA",
  
  warningAmber: "#F59E0B",
  warningAmberDark: "#B45309",
  warningAmberBg: "#FFFBEB",
  warningAmberBorder: "#FDE68A",

  // Base Neutrals
  background: "#F8FAFC",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  border: "#E2E8F0",
  borderDark: "#CBD5E1",
  
  text: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  textLight: "#FFFFFF",
  
  // Interactive Elements
  activeTab: "#2563EB",
  inactiveTab: "#94A3B8",
};

export const FONTS = {
  regular: { fontWeight: "400" },
  medium: { fontWeight: "500" },
  semiBold: { fontWeight: "600" },
  bold: { fontWeight: "700" },
  heavy: { fontWeight: "800" },
};

export const SHADOWS = {
  sm: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  glowGreen: {
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  glowRed: {
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
};
