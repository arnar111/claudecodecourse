import netlifyIdentity from "netlify-identity-widget";

let initialized = false;

export function initAuth() {
  if (initialized) return;
  const siteUrl = import.meta.env.VITE_NETLIFY_SITE_URL;
  netlifyIdentity.init(
    siteUrl ? { APIUrl: `${siteUrl.replace(/\/$/, "")}/.netlify/identity` } : {}
  );
  initialized = true;
}

export function getUser() {
  return netlifyIdentity.currentUser();
}

export function openLogin() {
  netlifyIdentity.open("login");
}

export function openSignup() {
  netlifyIdentity.open("signup");
}

export function logout() {
  return netlifyIdentity.logout();
}

export function onAuthChange({ onLogin, onLogout, onInit }) {
  if (onLogin) netlifyIdentity.on("login", onLogin);
  if (onLogout) netlifyIdentity.on("logout", onLogout);
  if (onInit) netlifyIdentity.on("init", onInit);
  return () => {
    if (onLogin) netlifyIdentity.off("login", onLogin);
    if (onLogout) netlifyIdentity.off("logout", onLogout);
    if (onInit) netlifyIdentity.off("init", onInit);
  };
}

export function loadUserData() {
  const user = netlifyIdentity.currentUser();
  return user?.user_metadata?.cc_progress || null;
}

let saveTimer = null;
let pendingData = null;

export function saveUserData(data) {
  pendingData = data;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    const user = netlifyIdentity.currentUser();
    if (!user) return;
    const payload = pendingData;
    pendingData = null;
    saveTimer = null;
    try {
      await user.update({
        data: { ...user.user_metadata, cc_progress: payload },
      });
    } catch (e) {
      console.warn("Tókst ekki að vista framvindu á server:", e);
    }
  }, 1500);
}

export function flushUserData() {
  if (!saveTimer || !pendingData) return Promise.resolve();
  clearTimeout(saveTimer);
  const user = netlifyIdentity.currentUser();
  const payload = pendingData;
  saveTimer = null;
  pendingData = null;
  if (!user) return Promise.resolve();
  return user
    .update({ data: { ...user.user_metadata, cc_progress: payload } })
    .catch(() => {});
}
