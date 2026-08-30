// Per-tool "instructions modal" persistence.
// Two independent facts are tracked per tool slug, in localStorage:
//   1. hasBeenSeen   -> the modal has auto-opened at least once for this tool
//   2. dismissedForGood -> the user checked "Don't show again"
//
// Auto-open rule: open automatically iff hasBeenSeen is false OR
// dismissedForGood is false. In other words, it keeps auto-opening on
// every visit until the user explicitly opts out with the checkbox.

const STORAGE_PREFIX = "utilitystack:modal:";

function readState(slug) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + slug);
    if (!raw) return { hasBeenSeen: false, dismissedForGood: false };
    const parsed = JSON.parse(raw);
    return {
      hasBeenSeen: Boolean(parsed.hasBeenSeen),
      dismissedForGood: Boolean(parsed.dismissedForGood),
    };
  } catch {
    return { hasBeenSeen: false, dismissedForGood: false };
  }
}

function writeState(slug, state) {
  try {
    localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — fail silently,
    // the modal will simply auto-open every time for this session.
  }
}

/** Should the modal auto-open right now for this tool? */
export function shouldAutoOpen(slug) {
  const state = readState(slug);
  return !state.dismissedForGood;
}

/** Call once, the first time the modal is shown for this tool in this session. */
export function markSeen(slug) {
  const state = readState(slug);
  if (!state.hasBeenSeen) {
    writeState(slug, { ...state, hasBeenSeen: true });
  }
}

/** Call when the user closes the modal. `dontShowAgain` reflects the checkbox. */
export function recordDismissal(slug, dontShowAgain) {
  const state = readState(slug);
  writeState(slug, {
    hasBeenSeen: true,
    dismissedForGood: dontShowAgain || state.dismissedForGood,
  });
}
