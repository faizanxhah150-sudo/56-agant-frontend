// Curated spam-trigger phrase list (subset — expandable). Each entry has a
// weight reflecting roughly how strongly it correlates with spam filtering.
export const SPAM_WORDS = [
  ["100% free", 3], ["act now", 3], ["all natural", 1], ["amazing", 1],
  ["apply now", 2], ["as seen on", 2], ["bargain", 1], ["best price", 2],
  ["big bucks", 2], ["buy direct", 2], ["buy now", 3], ["cancel at any time", 2],
  ["cash bonus", 3], ["cash out", 2], ["cheap", 2], ["claim now", 3],
  ["click below", 2], ["click here", 3], ["compare rates", 1], ["congratulations", 2],
  ["credit card offers", 3], ["deal", 1], ["dear friend", 2], ["discount", 1],
  ["double your", 3], ["earn extra cash", 3], ["earn money", 3], ["exclusive deal", 2],
  ["expire", 1], ["extra cash", 2], ["fast cash", 3], ["free access", 2],
  ["free consultation", 1], ["free gift", 2], ["free installation", 1],
  ["free money", 3], ["free trial", 1], ["get paid", 2], ["get rich", 3],
  ["giveaway", 1], ["great offer", 2], ["guarantee", 2], ["hidden charges", 3],
  ["increase sales", 1], ["incredible deal", 2], ["instant", 1], ["investment", 1],
  ["limited time", 2], ["lose weight", 2], ["lowest price", 2], ["make money", 3],
  ["million dollars", 2], ["miracle", 2], ["money back", 1], ["no catch", 2],
  ["no cost", 2], ["no credit check", 3], ["no fees", 1], ["no hidden costs", 2],
  ["no investment", 2], ["no obligation", 2], ["no purchase necessary", 2],
  ["no strings attached", 2], ["not spam", 3], ["obligation", 1], ["once in a lifetime", 2],
  ["one time", 1], ["order now", 3], ["password", 1], ["prize", 2],
  ["pure profit", 2], ["risk free", 2], ["satisfaction guaranteed", 1],
  ["save big money", 3], ["save up to", 2], ["special promotion", 2],
  ["subscribe", 1], ["supplies are limited", 2], ["this isn't spam", 3],
  ["unlimited", 1], ["urgent", 2], ["what are you waiting for", 2], ["while supplies last", 2],
  ["win", 1], ["winner", 2], ["you have been selected", 3], ["your income", 2],
];

export function scoreSubjectLine(subject) {
  const text = subject.toLowerCase();
  const matches = [];
  let score = 0;
  for (const [phrase, weight] of SPAM_WORDS) {
    if (text.includes(phrase)) {
      matches.push({ phrase, weight });
      score += weight;
    }
  }
  const capsRatio = subject.replace(/[^A-Za-z]/g, "").length
    ? (subject.replace(/[^A-Z]/g, "").length / subject.replace(/[^A-Za-z]/g, "").length)
    : 0;
  if (capsRatio > 0.5 && subject.replace(/[^A-Za-z]/g, "").length > 4) {
    score += 3;
    matches.push({ phrase: "excessive capitalization", weight: 3 });
  }
  const exclaims = (subject.match(/!/g) || []).length;
  if (exclaims > 1) {
    score += exclaims;
    matches.push({ phrase: `${exclaims} exclamation marks`, weight: exclaims });
  }
  return { score, matches };
}
