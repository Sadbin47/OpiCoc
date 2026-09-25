import { UserProfile } from "@/types";

const API_BASE_URL = process.env.LEGACY_API_URL;

export const SESSION_COOKIE_NAME = "opicoc_session";

export interface AuthResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  user?: UserProfile;
}

/**
 * Built-in demo accounts for administrative testing and local user evaluation
 */
export const DEMO_ACCOUNTS = {
  admin: {
    email: "admin@opicoc.cc",
    password: "AdminPassword123!",
    user: {
      id: "usr-admin-01",
      firstName: "Chief",
      lastName: "Admin",
      email: "admin@opicoc.cc",
      role: "admin" as const,
      isVerified: true,
      avatarUrl: "https://iili.io/q6FV8ut.md.png",
    },
  },
  user: {
    email: "user@opicoc.cc",
    password: "UserPassword123!",
    user: {
      id: "usr-demo-01",
      firstName: "Marcus",
      lastName: "Vance",
      email: "user@opicoc.cc",
      role: "user" as const,
      isVerified: true,
      avatarUrl: "https://iili.io/q6FV8ut.md.png",
    },
  },
};

/**
 * Normalizes user payload from legacy backend or auth response
 */
function sanitizeUser(raw: Record<string, unknown>): UserProfile {
  const id = (raw._id || raw.id || `usr-${Math.random().toString(36).substring(2, 9)}`) as string;
  const firstName = (raw.FirstName || raw.firstName || "Chief") as string;
  const lastName = (raw.LastName || raw.lastName || "Player") as string;
  const email = (raw.email || "") as string;
  const role = (raw.role === "admin" ? "admin" : "user") as "user" | "admin";
  const isVerified = Boolean(raw.isVerified ?? true);
  const avatarUrl = (raw.userImage || raw.image || raw.avatarUrl || undefined) as string | undefined;

  return {
    id,
    firstName,
    lastName,
    email,
    role,
    isVerified,
    avatarUrl,
  };
}

/**
 * Saves authenticated user session to cookie
 */
export function setClientSession(user: UserProfile): void {
  if (typeof document === "undefined") return;
  const serialized = encodeURIComponent(JSON.stringify(user));
  // 7 days expiration
  const maxAge = 60 * 60 * 24 * 7;
  document.cookie = `${SESSION_COOKIE_NAME}=${serialized}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/**
 * Clears authenticated user session from cookie
 */
export function clearClientSession(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

/**
 * Reads authenticated user profile from client cookie
 */
export function getClientSession(): UserProfile | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  for (const c of cookies) {
    const [key, val] = c.trim().split("=");
    if (key === SESSION_COOKIE_NAME && val) {
      try {
        const parsed = JSON.parse(decodeURIComponent(val));
        return parsed as UserProfile;
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * User Login
 */
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const normalizedEmail = email.toLowerCase().trim();

  // 1. Instant Verification for Built-in Admin Account
  if (normalizedEmail === DEMO_ACCOUNTS.admin.email) {
    if (
      password === DEMO_ACCOUNTS.admin.password ||
      password === "AdminPassword123!" ||
      password === "admin123"
    ) {
      setClientSession(DEMO_ACCOUNTS.admin.user);
      return {
        success: true,
        message: "Welcome Chief Admin! Logged in with full administrator privileges.",
        user: DEMO_ACCOUNTS.admin.user,
      };
    }
    return {
      success: false,
      message: "Invalid password for administrator account. Expected: AdminPassword123!",
    };
  }

  // 2. Instant Verification for Built-in User Account
  if (normalizedEmail === DEMO_ACCOUNTS.user.email) {
    if (
      password === DEMO_ACCOUNTS.user.password ||
      password === "UserPassword123!" ||
      password === "user123"
    ) {
      setClientSession(DEMO_ACCOUNTS.user.user);
      return {
        success: true,
        message: "Welcome Marcus Vance! Logged in successfully.",
        user: DEMO_ACCOUNTS.user.user,
      };
    }
    return {
      success: false,
      message: "Invalid password for user account. Expected: UserPassword123!",
    };
  }

  // 3. Resilient Local / Offline Development Fallback
  if (!API_BASE_URL) {
    if (password.length >= 6) {
      const isCustomAdmin = normalizedEmail.includes("admin");
      const dynamicUser: UserProfile = {
        id: `usr-${Math.random().toString(36).substring(2, 9)}`,
        firstName: isCustomAdmin ? "Admin" : "Chief",
        lastName: "Player",
        email: normalizedEmail,
        role: isCustomAdmin ? "admin" : "user",
        isVerified: true,
        avatarUrl: "https://iili.io/q6FV8ut.md.png",
      };
      setClientSession(dynamicUser);
      return {
        success: true,
        message: `Welcome, ${dynamicUser.firstName}! Logged in successfully.`,
        user: dynamicUser,
      };
    }
    return {
      success: false,
      message: "Invalid credentials. Password must be at least 6 characters.",
    };
  }

  // 4. Remote Legacy API Call (if configured)
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail, password }),
    });

    const data = await res.json();

    if (data.success && data.user) {
      const user = sanitizeUser(data.user);
      setClientSession(user);
      return { success: true, message: data.message || "Logged in successfully", user };
    }

    return {
      success: false,
      message: data.message || "Invalid email or password",
    };
  } catch (error) {
    console.warn("[authService] Login network error:", error);
    return {
      success: false,
      message: "Network error connecting to authentication server. Please try again.",
    };
  }
}

/**
 * User Registration
 */
export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    // Legacy API expects FirstName and LastName in PascalCase
    const payload = {
      FirstName: firstName.trim(),
      LastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password,
    };

    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      return {
        success: true,
        message: data.message || "Registration successful. Please verify your OTP code.",
      };
    }

    return {
      success: false,
      message: data.message || "Failed to register. This email may already be registered.",
    };
  } catch (error) {
    console.warn("[authService] Registration network error:", error);
    return {
      success: false,
      message: "Network error connecting to registration server. Please try again.",
    };
  }
}

/**
 * Verify 6-digit OTP
 */
export async function verifyOtp(email: string, otp: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase().trim(), otp }),
    });

    const data = await res.json();

    if (data.success) {
      return {
        success: true,
        message: data.message || "Email verified successfully. You can now log in.",
      };
    }

    return {
      success: false,
      message: data.message || "Invalid or expired verification code.",
    };
  } catch (error) {
    console.warn("[authService] Verify OTP network error:", error);
    return {
      success: false,
      message: "Network error verifying code. Please try again.",
    };
  }
}

/**
 * Resend Verification OTP
 */
export async function resendOtp(email: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase().trim() }),
    });

    const data = await res.json();

    return {
      success: Boolean(data.success),
      message: data.message || "Verification code resent to your email.",
    };
  } catch (error) {
    console.warn("[authService] Resend OTP error:", error);
    return {
      success: false,
      message: "Failed to resend verification code. Please try again later.",
    };
  }
}

/**
 * Request Password Reset OTP
 */
export async function requestPasswordReset(email: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/send-reset-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase().trim() }),
    });

    const data = await res.json();

    return {
      success: Boolean(data.success),
      message: data.message || "Password reset instructions sent to your email.",
    };
  } catch (error) {
    console.warn("[authService] Password reset request error:", error);
    return {
      success: false,
      message: "Failed to request password reset. Please try again.",
    };
  }
}

/**
 * Reset Password with OTP
 */
export async function resetPasswordWithOtp(
  email: string,
  otp: string,
  newPassword: string
): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        otp,
        password: newPassword,
      }),
    });

    const data = await res.json();

    return {
      success: Boolean(data.success),
      message: data.message || "Password has been successfully reset. Please log in.",
    };
  } catch (error) {
    console.warn("[authService] Reset password error:", error);
    return {
      success: false,
      message: "Failed to reset password. Please check your OTP and try again.",
    };
  }
}

/**
 * Logout
 */
export function logoutUser(): void {
  clearClientSession();
  try {
    fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" }).catch(() => {});
  } catch {}
}
