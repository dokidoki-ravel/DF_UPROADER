"use strict";

document.documentElement.classList.add("js");

// =========================
// 設定・共通関数
// =========================
const config = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};

const LINK_CONFIG = {
  youtube: config.youtubeUrl,
  x: config.xUrl,
  makuake: config.makuakeUrl,
  official: config.officialSiteUrl
};

function isUsableUrl(value) {
  if (!value || typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch (_error) {
    return false;
  }
}

// =========================
// config.js のリンク反映
// =========================
document.querySelectorAll("[data-link]").forEach((link) => {
  const linkType = link.dataset.link;
  const url = LINK_CONFIG[linkType];

  if (isUsableUrl(url)) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.removeAttribute("aria-disabled");
    return;
  }

  if (link.dataset.linkBehavior === "hide") {
    link.hidden = true;
    return;
  }

  link.removeAttribute("href");
  link.removeAttribute("target");
  link.removeAttribute("rel");
  link.classList.add("is-disabled");
  link.setAttribute("aria-disabled", "true");
  link.setAttribute("tabindex", "-1");

  const pendingLabel = link.dataset.pendingLabel;
  if (pendingLabel) {
    const textElement = link.matches(".button")
      ? link.querySelector("span:not(.button-icon)")
      : null;
    if (textElement) {
      textElement.textContent = pendingLabel;
    } else {
      link.textContent = pendingLabel;
    }
  }
});

document.querySelectorAll("[data-config-section]").forEach((section) => {
  const linkType = section.dataset.configSection;
  if (!isUsableUrl(LINK_CONFIG[linkType])) section.hidden = true;
});

// =========================
// YouTube埋め込みプレイヤー
// =========================
function getYouTubeVideoId(urlValue) {
  if (!isUsableUrl(urlValue)) return "";

  try {
    const url = new URL(urlValue);
    const host = url.hostname.replace(/^www\./, "");
    let videoId = "";

    if (host === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] || "";
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v") || "";
      } else {
        const pathParts = url.pathname.split("/").filter(Boolean);
        if (["embed", "live", "shorts"].includes(pathParts[0])) {
          videoId = pathParts[1] || "";
        }
      }
    }

    return /^[A-Za-z0-9_-]{6,}$/.test(videoId) ? videoId : "";
  } catch (_error) {
    return "";
  }
}

const player = document.querySelector("[data-youtube-player]");
const youtubeVideoId = getYouTubeVideoId(config.youtubeUrl);

if (player && youtubeVideoId) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeVideoId)}`;
  iframe.title = "ミラドキランド24時間生放送 YouTubeプレイヤー";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;
  player.replaceChildren(iframe);
  player.classList.add("has-video");
}

// =========================
// 画像プレースホルダー
// =========================
document.querySelectorAll("[data-replaceable-image]").forEach((image) => {
  const shell = image.closest("[data-image-shell]");
  if (!shell) return;

  const showImage = () => shell.classList.add("is-loaded");
  const showPlaceholder = () => shell.classList.add("is-missing");

  if (image.complete) {
    if (image.naturalWidth > 0) showImage();
    else showPlaceholder();
  } else {
    image.addEventListener("load", showImage, { once: true });
    image.addEventListener("error", showPlaceholder, { once: true });
  }
});

// =========================
// Xシェア
// =========================
document.querySelectorAll("[data-share-x]").forEach((shareLink) => {
  const shareUrl = new URL("https://twitter.com/intent/tweet");
  shareUrl.searchParams.set("text", config.shareText || document.title);
  shareUrl.searchParams.set("hashtags", (config.shareHashtag || "ミラドキランド").replace(/^#/, ""));
  shareUrl.searchParams.set("url", window.location.href.split("#")[0]);
  shareLink.href = shareUrl.toString();
  shareLink.target = "_blank";
  shareLink.rel = "noopener noreferrer";
});

// =========================
// モバイルメニュー
// =========================
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

function setMenu(open) {
  if (!menuToggle || !nav) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

menuToggle?.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) setMenu(false);
});

// =========================
// スクロール表示アニメーション
// =========================
const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// =========================
// ヘッダー表示
// =========================
const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
