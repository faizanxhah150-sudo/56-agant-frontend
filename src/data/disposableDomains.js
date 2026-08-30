// A curated (non-exhaustive) list of widely known disposable/temporary
// email domains. Good enough to catch the vast majority of throwaway
// signups without needing a server round-trip.
export const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "10minutemail.com", "10minutemail.net", "guerrillamail.com",
  "guerrillamail.net", "guerrillamail.org", "guerrillamail.biz", "temp-mail.org",
  "tempmail.com", "tempmail.net", "throwawaymail.com", "yopmail.com", "yopmail.net",
  "getnada.com", "trashmail.com", "trashmail.net", "fakeinbox.com", "sharklasers.com",
  "grr.la", "spam4.me", "maildrop.cc", "mailnesia.com", "mintemail.com",
  "mytemp.email", "dispostable.com", "moakt.com", "emailondeck.com", "tempinbox.com",
  "mohmal.com", "mailcatch.com", "20minutemail.com", "33mail.com", "anonbox.net",
  "burnermail.io", "crazymailing.com", "deadaddress.com", "emailsensei.com",
  "fakemailgenerator.com", "harakirimail.com", "instant-mail.de", "jetable.org",
  "koszmail.pl", "mail-temporaire.fr", "meltmail.com", "mytrashmail.com",
  "nobulk.com", "nospam4.us", "objectmail.com", "pookmail.com", "sneakemail.com",
  "spamgourmet.com", "spamhole.com", "spaml.com", "tempemail.net", "tempymail.com",
  "trbvm.com", "tyldd.com", "wegwerfmail.de", "wh4f.org", "zoemail.org",
  "mailtemp.info", "mailforspam.com", "inboxbear.com", "luxusmail.org",
  "correotemporal.org", "discardmail.com", "discardmail.de", "e4ward.com",
  "einrot.com", "fastacura.com", "filzmail.com", "fixmail.tk", "hidemail.de",
  "jourrapide.com", "kasmail.com", "klzlk.com", "kurzepost.de", "lifebyfood.com",
  "loadby.us", "monumentmail.com", "netzidiot.de", "no-spam.ws", "noref.in",
]);

export function isDisposableEmail(email) {
  const parts = email.toLowerCase().trim().split("@");
  if (parts.length !== 2) return { valid: false, disposable: false, domain: null };
  const domain = parts[1];
  return { valid: true, disposable: DISPOSABLE_DOMAINS.has(domain), domain };
}
