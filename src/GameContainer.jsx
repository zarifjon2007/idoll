import { useEffect, useMemo, useState } from 'react';
import { useGameStore } from './gameStore';
import startupData from './data/startup.json';
import Navbar from './components/Navbar';
import SaveSidebar from './components/SaveSidebar';
import StatsModal from './components/StatsModal';
import ScenePanel from './components/ScenePanel';

// ${var} ni store-dagi qiymatlar bilan almashtirish
function applyVars(text, state) {
  if (typeof text !== 'string') return '';
  return text.replace(/\$\{(\w+)\}/g, (_, key) => {
    let v = state[key];
    if ((v === undefined || v === null || v === '') && key === 'surname' && state.full_name) {
      const parts = String(state.full_name).trim().split(/\s+/);
      v = parts[0] ?? '';
    }
    if (
      (v === undefined || v === null || v === '') &&
      (key === 'name' || key === 'given_name') &&
      state.full_name
    ) {
      const parts = String(state.full_name).trim().split(/\s+/);
      v = parts.slice(1).join(' ') ?? '';
    }
    return v != null ? String(v) : '';
  });
}

// [b]/[i] ni olib tashlash
function stripMarkup(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/\[\/?(b|i)\]/gi, '');
}

const clamp100 = (value) => {
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
};

export default function GameContainer() {
  const state = useGameStore();
  const updateStatsBatch = useGameStore((s) => s.updateStatsBatch);
  const clampStats = useGameStore((s) => s.clampStats);
  const setVariable = useGameStore((s) => s.setVariable);

  const [sceneId, setSceneId] = useState('intro_warnings');
  const [inputValue, setInputValue] = useState('');
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [statsOpen, setStatsOpen] = useState(false);
  const [statsTab, setStatsTab] = useState('profile');
  const [savesOpen, setSavesOpen] = useState(false);
  const [saveSlots, setSaveSlots] = useState(() => Array(8).fill(null));
  const [importedSlots, setImportedSlots] = useState(() => Array(8).fill(null));

  const scene = startupData[sceneId] ?? null;

  const followers = Number(state.followers) || 0;

  // Name – .txt dagidek surname + name, lekin 'Unknown' bo'lsa tashlaymiz,
  // va agar full_name formulali matn bo'lsa uni ishlatmaymiz.
  const rawFullName = state.full_name;
  const isFormulaFullName =
    typeof rawFullName === 'string' &&
    rawFullName.includes('(""&surname') &&
    rawFullName.includes('" "&name');

  let cleanFullName = '';
  if (!isFormulaFullName && rawFullName && rawFullName !== 'Unknown') {
    cleanFullName = String(rawFullName).trim();
  }

  const surnameClean =
    state.surname && state.surname !== 'Unknown' ? String(state.surname).trim() : '';
  const givenClean =
    state.name && state.name !== 'Unknown' ? String(state.name).trim() : '';

  const nameFromParts = [surnameClean, givenClean].filter(Boolean).join(' ').trim();

  // ChoiceScript dagi group_type va warning_text mantiqi
  let groupType = 'Co-ed Group';
  let warningText = '';
  if (state.gender === 'male') {
    groupType = 'Boy Group';
  } else if (state.gender === 'female') {
    groupType = 'Girl Group';
  } else {
    groupType = 'Co-ed Group';
    warningText = '⚠ SYSTEM NOTE: High Risk Project.';
  }

  // ChoiceScript dagi rank_title va trend_icon mantiqi
  let rankTitle = 'Unknown';
  if (followers < 1000) {
    rankTitle = 'Nugu (Who?)';
  } else if (followers < 10000) {
    rankTitle = 'Hidden Gem';
  } else if (followers < 19000) {
    rankTitle = 'Trending Trainee';
  } else if (followers < 50000) {
    rankTitle = 'Viral Sensation';
  } else if (followers < 500000) {
    rankTitle = 'Rising Star';
  } else if (followers < 1000000) {
    rankTitle = 'National Idol';
  } else {
    rankTitle = 'Global Icon';
  }

  const trendIcon = followers > 15000 ? '📈' : '➖';

  // Header – chapter ga qarab
  const headerTitle =
    (state.chapter ?? 1) < 3 ? '🏢 TITAN ENTERTAINMENT' : '🌟 PROJECT: SUPERNOVA';
  const headerSubtitle =
    (state.chapter ?? 1) < 3 ? 'Trainee Management Portal' : 'Survivor Interface: Active';

  const profileData = {
    name: cleanFullName || nameFromParts || 'Unknown',
    hiddenTalent: state.hobby || 'None',
    origin: state.origin || 'Unknown',
    role: groupType,
    height: state.p_height || 'unknown',
    build: state.p_body_type || 'unknown',
    appearance: `You have ${state.skin_tone || 'pale'} skin and ${state.hair_style || 'natural'} ${state.hair_color || 'black'} hair.`,
    warningText,
  };

  const visualBoldness = clamp100(
    50 + (Number(state.per_bold) || 0) - (Number(state.per_gentle) || 0),
  );
  const visualRebellion = clamp100(state.rebellion);

  const skillsData = {
    vocals: clamp100(state.vocals),
    dance: clamp100(state.dance),
    visual: clamp100(state.visual),
    charisma: clamp100(state.charisma),
    hp: clamp100(state.physical),
    stress: clamp100(state.stress),
    mask: clamp100(state.the_mask),
    netizenHeat: clamp100(state.scandal_risk),
    scandalRisk: clamp100(state.scandal_risk),
    bold: visualBoldness,
    gentle: 100 - visualBoldness,
    rebellious: visualRebellion,
    obedient: 100 - visualRebellion,
  };

  const socialData = {
    handle: `@${(state.name || 'h').toLowerCase()}_official`,
    followers,
    status: rankTitle,
    trendIcon,
    latest: state.social_feed_content || 'No new notifications.',
  };

  const relationshipsData = {
    coco: clamp100(state.rel_rival),
    jun: clamp100(state.rel_jun),
    haneul: clamp100(state.rel_haneul),
    kang: clamp100(state.rel_kang),
    rio: clamp100(state.rel_rio),
    jiwon: clamp100(state.rel_jiwon),
    yuri: clamp100(state.rel_yuri),
    minjae: clamp100(state.rel_minjae),
    noa: clamp100(state.rel_noa),
    manager: clamp100(state.rel_manager),
    eden: clamp100(state.rel_eden),
  };

  const textParagraphs = useMemo(() => {
    if (!scene) return [];
    const base = stripMarkup(applyVars(scene.text || '', state));
    return base.split(/\n\n+/).filter(Boolean);
  }, [scene, state]);

  const choices = useMemo(() => {
    if (!scene || !Array.isArray(scene.choices)) return [];
    return scene.choices.map((c) => ({
      ...c,
      _labelForRender: stripMarkup(applyVars(c.text || 'Next', state)),
    }));
  }, [scene, state]);

  const hasInput = !!scene?.input && (scene.input.key != null || scene.input.fields);
  const hasChoices = !hasInput && choices.length > 0;
  const showNextButton =
    !hasInput && !hasChoices && !!scene?.nextScene && !scene?.noNextButton;

  const goToLabel = (label) => {
    if (!label) return;
    if (Object.prototype.hasOwnProperty.call(startupData, label)) {
      setSceneId(label);
    }
  };

  const handleInputSubmit = () => {
    if (!scene?.input) return;
    const cfg = scene.input;
    const raw = String(inputValue ?? '').trim();

    if (cfg.key) {
      const val = raw || state[cfg.key] || '';
      setVariable(cfg.key, val);

      if (cfg.key === 'full_name' && val) {
        const parts = String(val).trim().split(/\s+/);
        const surname = parts[0] ?? '';
        const given = parts.slice(1).join(' ') ?? '';
        if (surname) setVariable('surname', surname);
        if (given) {
          setVariable('given_name', given);
          setVariable('name', given);
        }
      }
    }

    setInputValue('');
    const target = cfg.nextScene || scene.nextScene;
    if (target) goToLabel(target);
  };

  const handleConfirmChoice = () => {
    if (!scene || !selectedChoice) return;
    const choice = selectedChoice;

    if (Array.isArray(choice.effects) && choice.effects.length > 0) {
      updateStatsBatch(choice.effects);
      clampStats();
    }

    setSelectedChoice(null);
    const target = choice.nextScene || scene.nextScene;
    if (target) goToLabel(target);
  };

  const handleNext = () => {
    if (scene?.nextScene) {
      goToLabel(scene.nextScene);
    }
  };

  // Save / load slots from localStorage once
  useEffect(() => {
    // Normal save slots
    try {
      const raw = window.localStorage.getItem('idoll_saves_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const normalized = Array(8)
            .fill(null)
            .map((_, i) => parsed[i] ?? null);
          setSaveSlots(normalized);
        }
      }
    } catch {
      // ignore parse errors
    }

    // Imported slots
    try {
      const rawImported = window.localStorage.getItem('idoll_imported_saves_v1');
      if (rawImported) {
        const parsedImp = JSON.parse(rawImported);
        if (Array.isArray(parsedImp)) {
          const normalizedImp = Array(8)
            .fill(null)
            .map((_, i) => parsedImp[i] ?? null);
          setImportedSlots(normalizedImp);
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const saveCurrentState = () => {
    const storeState = useGameStore.getState();
    const plain = {};
    Object.entries(storeState).forEach(([key, value]) => {
      if (typeof value !== 'function') {
        plain[key] = value;
      }
    });
    return {
      sceneId,
      store: plain,
      savedAt: new Date().toISOString(),
    };
  };

  const handleSaveSlot = (index) => {
    try {
      const snapshot = saveCurrentState();
      const next = [...saveSlots];
      next[index] = snapshot;
      setSaveSlots(next);
      window.localStorage.setItem('idoll_saves_v1', JSON.stringify(next));
    } catch (e) {
      console.error('[SaveSlot] Failed to save', e);
    }
  };

  const applyLoadedState = (slot) => {
    if (!slot || !slot.store) return;
    try {
      useGameStore.setState(slot.store, false);
      if (slot.sceneId && startupData[slot.sceneId]) {
        setSceneId(slot.sceneId);
      }
    } catch (e) {
      console.error('[LoadSlot] Failed to apply state', e);
    }
  };

  const handleLoadSlot = (index) => {
    const slot = saveSlots[index];
    if (!slot) return;
    applyLoadedState(slot);
  };

  const handleDeleteSlot = (index) => {
    try {
      const next = [...saveSlots];
      next[index] = null;
      setSaveSlots(next);
      window.localStorage.setItem('idoll_saves_v1', JSON.stringify(next));
    } catch (e) {
      console.error('[DeleteSlot] Failed', e);
    }
  };

  const handleExportCurrent = () => {
    try {
      const payload = {
        version: 1,
        save: saveCurrentState(),
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `idoll-save-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('[Export] Failed', e);
    }
  };

  const handleImportFile = (file) => {
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = String(event.target?.result || '');
          const data = JSON.parse(text);
          if (data?.save && typeof data.save === 'object' && data.save.store) {
            // Bitta save (export qilingan hozirgi holat) – imported slots ga tushadi
            const slots = [data.save, ...Array(7).fill(null)];
            setImportedSlots(slots);
            window.localStorage.setItem('idoll_imported_saves_v1', JSON.stringify(slots));
            applyLoadedState(data.save);
          } else {
            const incomingSlots = Array.isArray(data?.slots)
              ? data.slots
              : Array.isArray(data)
              ? data
              : [];
            const slots = Array(8)
              .fill(null)
              .map((_, i) => incomingSlots[i] ?? null);
            setImportedSlots(slots);
            window.localStorage.setItem('idoll_imported_saves_v1', JSON.stringify(slots));
            const firstNonNull = slots.find((s) => s && s.store);
            if (firstNonNull) {
              applyLoadedState(firstNonNull);
            }
          }
        } catch (err) {
          console.error('[Import] Failed to parse JSON', err);
        }
      };
      reader.readAsText(file);
    } catch (e) {
      console.error('[Import] Failed to read file', e);
    }
  };

  const handleLoadImportedSlot = (index) => {
    const slot = importedSlots[index];
    if (!slot) return;
    applyLoadedState(slot);
  };

  const handleDeleteImportedSlot = (index) => {
    try {
      const next = [...importedSlots];
      next[index] = null;
      setImportedSlots(next);
      window.localStorage.setItem('idoll_imported_saves_v1', JSON.stringify(next));
    } catch (e) {
      console.error('[DeleteImportedSlot] Failed', e);
    }
  };

  if (!scene) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-cyan-400/80 font-mono">Loading…</div>
      </div>
    );
  }

  const statsTabs = [
    { id: 'profile', label: 'PROFILE' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'social', label: 'SOCIAL' },
    { id: 'relationships', label: 'RELATIONSHIPS' },
    { id: 'dossiers', label: 'DOSSIERS' },
    { id: 'glossary', label: 'GLOSSARY' },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans antialiased">
      <Navbar
        onShowStats={() => setStatsOpen(true)}
        onToggleSaves={() => setSavesOpen((v) => !v)}
      />

      {savesOpen && (
        <SaveSidebar
          slots={saveSlots}
          importedSlots={importedSlots}
          onSaveSlot={handleSaveSlot}
          onLoadSlot={handleLoadSlot}
          onDeleteSlot={handleDeleteSlot}
          onLoadImportedSlot={handleLoadImportedSlot}
          onDeleteImportedSlot={handleDeleteImportedSlot}
          onExportCurrent={handleExportCurrent}
          onImportFile={handleImportFile}
          onClose={() => setSavesOpen(false)}
        />
      )}

      <div className="flex pt-12 md:pt-14">
        <ScenePanel
          sceneId={sceneId}
          scene={scene}
          textParagraphs={textParagraphs}
          hasInput={hasInput}
          hasChoices={hasChoices}
          showNextButton={showNextButton}
          choices={choices}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onInputSubmit={handleInputSubmit}
          selectedChoice={selectedChoice}
          onSelectChoice={setSelectedChoice}
          onConfirmChoice={handleConfirmChoice}
          onNext={handleNext}
        />
      </div>

      <p className="fixed bottom-3 right-4 text-xs text-zinc-500 font-mono">
        by Mfein
      </p>

      <StatsModal
        open={statsOpen}
        tabs={statsTabs}
        activeTab={statsTab}
        onChangeTab={setStatsTab}
        onClose={() => setStatsOpen(false)}
        statsUnlocked={!!state.stats_unlocked}
        headerTitle={headerTitle}
        headerSubtitle={headerSubtitle}
        profileData={profileData}
        skillsData={skillsData}
        socialData={socialData}
        relationshipsData={relationshipsData}
        chapter={state.chapter}
        noaNameKnown={!!state.noa_name_known}
      />
    </div>
  );
}

