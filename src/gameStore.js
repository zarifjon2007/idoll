import { create } from 'zustand';

const getInitialState = () => ({
  // Meta / chapter
  chapter: 1,
  stats_unlocked: false,
  followers: 0,
  rank_title: 'Trainee',
  entry_method: 'merit',
  cut_reason: 'none',
  victory: false,
  collapse_count: 0,
  passed_eval: false,
  noa_name_known: false,
  intro_style: 'none',
  room_vibe: 'none',
  role_pool_party: 'none',

  // Core stats (ChoiceScript defaults)
  vocals: 5,
  dance: 5,
  visual: 5,
  charisma: 5,
  physical: 100,
  stress: 15,
  self_belief: 10,
  the_mask: 0,

  // Personality & psychology
  ruthless: 0,
  per_bold: 50,
  per_gentle: 50,
  rebellion: 50,
  obedience: 50,
  imposter_syndrome: false,
  trauma_points: 0,
  mental_state: 'Stable',

  // Social / scandal
  social_feed_content: 'No new notifications.',
  scandal_risk: 0,
  scandal_mult: 1,
  social_special_moment: false,

  // Health flags
  eating_disorder_flag: false,
  hidden_injury: false,
  zen_mode: false,

  // Relationships (0–100)
  rel_father: 50,
  rel_mother: 50,
  rel_jun: 30,
  rel_haneul: 30,
  rel_kang: 30,
  rel_rio: 30,
  rel_jiwon: 30,
  rel_yuri: 30,
  rel_manager: 50,
  rel_eden: 30,
  rel_minjae: 30,
  rel_noa: 15,
  rel_rival: 25,

  romance_status: 'single',
  romance_commitment: 'none',
  romance_coco: false,
  romance_haneul: false,
  romance_noa: false,
  romance_minjae: false,

  // Character identity
  full_name: 'Unknown',
  name: 'Unknown',
  surname: 'Unknown',
  treasure: 'Unknown',
  performance_type: 'none',
  gender: 'female',
  he_she: 'she',
  him_her: 'her',
  his_her: 'her',
  boy_girl: 'girl',
  man_woman: 'woman',
  son_daughter: 'daughter',
  honorific_older_male: 'Sunbae',
  p_body_type: 'unknown',
  p_height: 'average',
  skin_tone: 'fair',
  eye_color: 'brown',
  hair_color: 'black',
  hair_style: 'natural',
  heterochromia: false,
  tattoos: false,
  piercings: false,
  hobby: 'None',
  origin: 'Local',
  archetype: 'None',
  motivation: 'None',

  // Secondary characters pronouns (simplified, from script)
  haneul_gender: 'male',
  h_he: 'he',
  h_him: 'him',
  h_his: 'his',
  jun_nickname: 'Jun',
  j_he: 'he',
  j_him: 'him',
  j_his: 'his',
  j_boy: 'boy',
  rival_nickname: ' ',
  rival_name: 'Coco',
  rival_gender: 'unknown',
  r_he: 'he',
  r_him: 'him',
  r_his: 'his',
  kang_he: 'he',
  kang_him: 'him',
  kang_his: 'his',
  rio_he: 'he',
  rio_him: 'him',
  rio_his: 'his',
  jiwon_he: 'she',
  jiwon_him: 'her',
  jiwon_his: 'her',
  yuri_he: 'she',
  yuri_him: 'her',
  yuri_his: 'her',
});

const clamp01 = (value) => {
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
};

const evalExpression = (expr, scope) => {
  try {
    const jsExpr = expr
      .replace(/\band\b/gi, '&&')
      .replace(/\bor\b/gi, '||');
    // eslint-disable-next-line no-new-func
    const fn = new Function('s', `with (s) { return (${jsExpr}); }`);
    return fn(scope);
  } catch {
    return Number.NaN;
  }
};

const applySetLine = (rawLine, next) => {
  if (typeof rawLine !== 'string') return;
  const trimmed = rawLine.trim();
  if (!trimmed.toLowerCase().startsWith('*set ')) return;

  const rest = trimmed.slice(5).trim();
  const [key, ...rhsParts] = rest.split(/\s+/);
  if (!key || rhsParts.length === 0) return;
  let rhs = rhsParts.join(' ').trim();

  // Percent adjustment with expression: %+ (10 * scandal_mult)
  const percentExprMatch = rhs.match(/^%([+-])\s*\((.+)\)$/);
  if (percentExprMatch) {
    const sign = percentExprMatch[1];
    const amountExpr = percentExprMatch[2];
    const amountVal = evalExpression(amountExpr, next);
    if (!Number.isNaN(amountVal)) {
      const current = Number(next[key] ?? 0);
      const signedAmount = sign === '+' ? amountVal : -amountVal;
      const factor = 1 + signedAmount / 100;
      next[key] = Math.round(current * factor);
    }
    return;
  }

  // Simple percent adjustment: %+5 / %-5
  const percentMatch = rhs.match(/^%([+-])(\d+(\.\d+)?)$/);
  if (percentMatch) {
    const sign = percentMatch[1];
    const amount = parseFloat(percentMatch[2]);
    const current = Number(next[key] ?? 0);
    const factor = 1 + (sign === '+' ? amount : -amount) / 100;
    next[key] = Math.round(current * factor);
    return;
  }

  // Simple numeric delta: +5 / -5
  const deltaMatch = rhs.match(/^([+-])(\d+(\.\d+)?)$/);
  if (deltaMatch) {
    const sign = deltaMatch[1];
    const amount = parseFloat(deltaMatch[2]);
    const current = Number(next[key] ?? 0);
    next[key] = current + (sign === '+' ? amount : -amount);
    return;
  }

  // Arithmetic expression (e.g. 10 * scandal_mult)
  if (!/^".*"$/.test(rhs) && /[+\-*/()]/.test(rhs)) {
    const exprVal = evalExpression(rhs, next);
    if (!Number.isNaN(exprVal)) {
      next[key] = exprVal;
      return;
    }
  }

  // Plain number assignment: 10
  const asNumber = Number(rhs);
  if (!Number.isNaN(asNumber)) {
    next[key] = asNumber;
    return;
  }

  // Quoted string: "text value"
  const stringMatch = rhs.match(/^"(.*)"$/);
  if (stringMatch) {
    next[key] = stringMatch[1];
    return;
  }

  // Booleans
  if (/^true$/i.test(rhs)) {
    next[key] = true;
    return;
  }
  if (/^false$/i.test(rhs)) {
    next[key] = false;
  }
};

const runEffects = (effects = [], state) => {
  const lines = effects.filter((l) => typeof l === 'string');
  const next = { ...state };

  const countIndent = (s) => {
    const match = s.match(/^\s*/);
    return match ? match[0].length : 0;
  };

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    if (typeof raw !== 'string') continue;
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const lower = trimmed.toLowerCase();

    // Handle simple *if ... [*set ...] [*else ...]
    if (lower.startsWith('*if ')) {
      const indentIf = countIndent(raw);
      const conditionExpr = trimmed.slice(3).trim().replace(/^\((.*)\)$/, '$1');
      const condValRaw = evalExpression(conditionExpr, next);
      const condition =
        typeof condValRaw === 'boolean'
          ? condValRaw
          : typeof condValRaw === 'number'
          ? condValRaw !== 0
          : !!condValRaw;

      const thenLines = [];
      const elseLines = [];
      let branch = 'then';

      let j = i + 1;
      for (; j < lines.length; j += 1) {
        const raw2 = lines[j];
        if (typeof raw2 !== 'string') continue;
        const indent2 = countIndent(raw2);
        const t2 = raw2.trim();
        if (!t2) continue;
        const lower2 = t2.toLowerCase();

        // Switch to else branch
        if (indent2 <= indentIf && lower2.startsWith('*else')) {
          branch = 'else';
          // do not include the *else line itself
          continue;
        }

        // New top-level command: end of this if-block
        if (indent2 <= indentIf && (lower2.startsWith('*if ') || lower2.startsWith('*set '))) {
          break;
        }

        // Collect block lines (we only care about *set inside)
        if (branch === 'then') {
          thenLines.push(raw2);
        } else {
          elseLines.push(raw2);
        }
      }

      const blockLines = condition ? thenLines : elseLines;
      blockLines.forEach((ln) => applySetLine(ln, next));

      // Skip lines we have already processed
      i = j - 1;
      continue;
    }

    // Plain *set outside condition
    if (lower.startsWith('*set ')) {
      applySetLine(raw, next);
    }
  }

  return next;
};

export const useGameStore = create((set, get) => ({
  ...getInitialState(),

  // Generic variable setter used by input scenes.
  setVariable: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),

  // Apply a batch of ChoiceScript-style effects (with basic *if/*else support).
  updateStatsBatch: (effects = []) =>
    set((state) => runEffects(effects, state)),

  // Clamp numeric stats into a safe 0–100 range (similar to safe_stat_clamp).
  clampStats: () =>
    set((state) => {
      const next = { ...state };
      const keysToClamp = [
        'vocals',
        'dance',
        'visual',
        'charisma',
        'physical',
        'stress',
        'the_mask',
        'scandal_risk',
        'self_belief',
        'per_bold',
        'per_gentle',
        'rebellion',
        'rel_rival',
        'rel_jun',
        'rel_haneul',
        'rel_kang',
        'rel_rio',
        'rel_jiwon',
        'rel_yuri',
        'rel_minjae',
        'rel_noa',
        'rel_manager',
        'rel_eden',
      ];

      keysToClamp.forEach((key) => {
        if (key in next) {
          next[key] = clamp01(next[key]);
        }
      });

      return next;
    }),

  // Optional helper to reset everything.
  resetStore: () => set(getInitialState()),
}));

