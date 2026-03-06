import { create } from 'zustand';

const getInitialState = () => ({
  // Basic meta
  chapter: 1,
  followers: 0,
  stats_unlocked: false,
  scandal_mult: 1,

  // Core stats (0–100)
  vocals: 0,
  dance: 0,
  visual: 0,
  charisma: 0,
  physical: 0,
  stress: 0,
  the_mask: 0,
  scandal_risk: 0,

  // Personality sliders
  per_bold: 0,
  per_gentle: 0,
  rebellion: 0,

  // Relationships (0–100)
  rel_rival: 0,
  rel_jun: 0,
  rel_haneul: 0,
  rel_kang: 0,
  rel_rio: 0,
  rel_jiwon: 0,
  rel_yuri: 0,
  rel_minjae: 0,
  rel_noa: 0,
  rel_manager: 0,
  rel_eden: 0,
});

const clamp01 = (value) => {
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
};

export const useGameStore = create((set, get) => ({
  ...getInitialState(),

  /**
   * Generic variable setter used by input scenes.
   */
  setVariable: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),

  /**
   * Apply a batch of ChoiceScript-style *set effects from startup.json.
   * This implementation intentionally supports the common simple patterns:
   * - *set stat %+5
   * - *set stat %-5
   * - *set stat +5 / -5
   * - *set stat 10
   * - *set some_var "string"
   * - *set some_flag true / false
   * Any more complex lines (e.g. *if, or formulas) are safely ignored.
   */
  updateStatsBatch: (effects = []) =>
    set((state) => {
      const next = { ...state };

      for (const raw of effects) {
        if (typeof raw !== 'string') continue;
        const line = raw.trim();
        if (!line.toLowerCase().startsWith('*set ')) continue;

        const rest = line.slice(5).trim(); // after "*set "
        const [key, ...rhsParts] = rest.split(/\s+/);
        if (!key || rhsParts.length === 0) continue;
        let rhs = rhsParts.join(' ').trim();

        // Percent adjustment: %+5 / %-5
        const percentMatch = rhs.match(/^%([+-])(\d+(\.\d+)?)$/);
        if (percentMatch) {
          const sign = percentMatch[1];
          const amount = parseFloat(percentMatch[2]);
          const current = Number(next[key] ?? 0);
          const factor = 1 + (sign === '+' ? amount : -amount) / 100;
          next[key] = Math.round(current * factor);
          continue;
        }

        // Simple numeric delta: +5 / -5
        const deltaMatch = rhs.match(/^([+-])(\d+(\.\d+)?)$/);
        if (deltaMatch) {
          const sign = deltaMatch[1];
          const amount = parseFloat(deltaMatch[2]);
          const current = Number(next[key] ?? 0);
          next[key] = current + (sign === '+' ? amount : -amount);
          continue;
        }

        // Plain number assignment: 10
        const asNumber = Number(rhs);
        if (!Number.isNaN(asNumber)) {
          next[key] = asNumber;
          continue;
        }

        // Quoted string: "text value"
        const stringMatch = rhs.match(/^"(.*)"$/);
        if (stringMatch) {
          next[key] = stringMatch[1];
          continue;
        }

        // Booleans
        if (/^true$/i.test(rhs)) {
          next[key] = true;
          continue;
        }
        if (/^false$/i.test(rhs)) {
          next[key] = false;
          continue;
        }

        // Any other complex expressions are ignored for now
      }

      return next;
    }),

  /**
   * Clamp numeric stats into a safe 0–100 range.
   * Followers / chapter and similar meta values are left as-is.
   */
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

      for (const key of keysToClamp) {
        if (key in next) {
          next[key] = clamp01(next[key]);
        }
      }

      return next;
    }),

  /**
   * Optional helper to reset everything.
   */
  resetStore: () => set(getInitialState()),
}));

