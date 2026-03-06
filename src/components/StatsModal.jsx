import { useState } from 'react';

export default function StatsModal({
  open,
  tabs,
  activeTab,
  onChangeTab,
  onClose,
  statsUnlocked,
  headerTitle,
  headerSubtitle,
  profileData,
  skillsData,
  socialData,
  relationshipsData,
  chapter,
  noaNameKnown,
}) {
  const [dossierTarget, setDossierTarget] = useState('mother_father');
  const [sideTarget, setSideTarget] = useState('rio_kang');
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-3xl mx-4 rounded-2xl border border-cyan-500/60 bg-zinc-900/95 p-5 md:p-7">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xs md:text-sm font-mono text-cyan-300">
              {headerTitle || 'PLAYER STATS'}
            </h2>
            {headerSubtitle && (
              <p className="text-[10px] md:text-xs font-mono text-zinc-400">
                {headerSubtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 text-sm border border-zinc-600 px-3 py-1.5 rounded"
          >
            Close
          </button>
        </div>

        {!statsUnlocked && (
          <div className="mt-6 text-sm text-zinc-200 font-mono space-y-2">
            <p className="font-semibold text-amber-300">⚠ SYSTEM ERROR 404</p>
            <p className="italic">Identity Not Found.</p>
            <p>Please return to Chapter 1 and finish your registration.</p>
          </div>
        )}

        {statsUnlocked && (
        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:w-1/3 space-y-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeTab(tab.id)}
                className={
                  'w-full text-left px-4 py-2.5 rounded-lg text-sm font-mono ' +
                  (activeTab === tab.id
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-100'
                    : 'bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-cyan-500/60')
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="md:w-2/3 rounded-xl border border-zinc-700 bg-zinc-950/80 p-4 text-sm text-zinc-200 font-mono space-y-4 max-h-[70vh] overflow-y-auto pr-3">
            {activeTab === 'profile' && profileData && (
              <div className="space-y-3">
                <p className="text-[11px] font-semibold tracking-[0.25em] text-purple-300">
                  TRAINEE DATA
                </p>
                <div className="space-y-1.5">
                  <p>Name: {profileData.name}</p>
                  <p>Hidden Talent: {profileData.hiddenTalent}</p>
                  <p>Origin: {profileData.origin}</p>
                  <p>Role: {profileData.role}</p>
                </div>
                <div className="space-y-1.5 pt-2">
                  <p className="font-semibold">
                    ✨ APPEARANCE{' '}
                    <span className="font-normal">{profileData.appearance}</span>
                  </p>
                  <p>Height: {profileData.height}</p>
                  <p>Build: {profileData.build}</p>
                </div>
                {profileData.warningText && (
                  <p className="text-[11px] text-amber-300 italic">
                    {profileData.warningText}
                  </p>
                )}
              </div>
            )}
            {activeTab === 'skills' && skillsData && (
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-pink-300 mb-2">
                    SKILL SET
                  </p>
                  <div className="space-y-1.5">
                    {[
                      ['Vocals', skillsData.vocals],
                      ['Dance', skillsData.dance],
                      ['Visual', skillsData.visual],
                      ['Charisma', skillsData.charisma],
                    ].map(([label, value]) => (
                      <div key={label} className="space-y-0.5">
                        <p>{label}: {value}%</p>
                        <div className="h-4 bg-zinc-700 rounded">
                          <div
                            className="h-4 bg-rose-500 rounded"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-rose-300 mb-2">
                    MENTAL STATE
                  </p>
                  <div className="space-y-1.5">
                    {[
                      ['HP (Health)', skillsData.hp],
                      ['Stress', skillsData.stress],
                      ['The Mask', skillsData.mask],
                      ['Netizen Heat', skillsData.netizenHeat],
                    ].map(([label, value]) => (
                      <div key={label} className="space-y-0.5">
                        <p>{label}: {value}%</p>
                        <div className="h-4 bg-zinc-700 rounded">
                          <div
                            className="h-4 bg-red-500 rounded"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-yellow-200 mb-2">
                    PERSONALITY
                  </p>
                  <div className="space-y-1.5">
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-xs">
                        <span>Bold: {skillsData.bold}%</span>
                        <span>Gentle: {skillsData.gentle}%</span>
                      </div>
                      <div className="h-4 flex rounded overflow-hidden">
                        <div
                          className="h-4 bg-rose-500"
                          style={{ width: `${skillsData.bold}%` }}
                        />
                        <div
                          className="h-4 bg-indigo-500"
                          style={{ width: `${skillsData.gentle}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-xs">
                        <span>Rebellious: {skillsData.rebellious}%</span>
                        <span>Obedient: {skillsData.obedient}%</span>
                      </div>
                      <div className="h-4 flex rounded overflow-hidden">
                        <div
                          className="h-4 bg-rose-500"
                          style={{ width: `${skillsData.rebellious}%` }}
                        />
                        <div
                          className="h-4 bg-indigo-500"
                          style={{ width: `${skillsData.obedient}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'social' && socialData && (
              <div className="space-y-3">
                <p className="text-[11px] font-semibold tracking-[0.25em] text-fuchsia-300">
                  SOCIAL FEED {socialData.handle}
                </p>
                <p>
                  {socialData.followers} Followers |{' '}
                  <span className="font-semibold">Status:</span>{' '}
                  {socialData.status} {socialData.trendIcon}
                </p>
                <p className="pt-1.5">
                  🔔 <span className="font-semibold">LATEST NOTIFICATION</span>{' '}
                  {socialData.latest}
                </p>
              </div>
            )}
            {activeTab === 'relationships' && relationshipsData && (
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-purple-300 mb-2">
                    RELATIONSHIP CHART
                  </p>
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-orange-300 mb-1.5">
                    SQUAD
                  </p>
                  <div className="space-y-1.5">
                    {[
                      ['Coco', relationshipsData.coco],
                      ['Jun', relationshipsData.jun],
                      ['Haneul', relationshipsData.haneul],
                      ['Kang', relationshipsData.kang],
                      ['Rio', relationshipsData.rio],
                      ['Ji-won', relationshipsData.jiwon],
                      ['Yuri', relationshipsData.yuri],
                    ].map(([label, value]) => (
                      <div key={label} className="space-y-0.5">
                        <p>{label}: {value}%</p>
                        <div className="h-4 bg-zinc-700 rounded">
                          <div
                            className="h-4 bg-rose-500 rounded"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-yellow-200 mb-1.5">
                    THE STARS
                  </p>
                  <div className="space-y-1.5">
                    {[
                      ['Min-jae', relationshipsData.minjae],
                      ['Noa', relationshipsData.noa],
                    ].map(([label, value]) => (
                      <div key={label} className="space-y-0.5">
                        <p>{label}: {value}%</p>
                        <div className="h-4 bg-zinc-700 rounded">
                          <div
                            className="h-4 bg-rose-500 rounded"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-sky-300 mb-1.5">
                    THE SUITS
                  </p>
                  <div className="space-y-1.5">
                    {[
                      ['Manager', relationshipsData.manager],
                      ['Eden', relationshipsData.eden],
                    ].map(([label, value]) => (
                      <div key={label} className="space-y-0.5">
                        <p>{label}: {value}%</p>
                        <div className="h-4 bg-zinc-700 rounded">
                          <div
                            className="h-4 bg-rose-500 rounded"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'dossiers' && (
              <div className="space-y-3">
                <p className="font-semibold">Who do you want to stalk?</p>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden">
                  {[
                    { id: 'mother_father', label: 'Mother & Father' },
                    { id: 'jun', label: 'Jun (The Roommate)' },
                    { id: 'coco', label: 'Coco (The Ace)' },
                    { id: 'haneul', label: 'Haneul (The Royal)' },
                    { id: 'noa', label: 'Noa' },
                    { id: 'minjae', label: 'Minjae (The Actor)' },
                    { id: 'side_chars', label: 'Side Characters (Rio, Kang, Jiwon, Yuri, Eden)' },
                  ].map((item, idx) => (
                    <label
                      key={item.id}
                      className={
                        'flex items-center gap-3 px-4 py-2.5 border-b border-zinc-800 cursor-pointer ' +
                        (dossierTarget === item.id
                          ? 'bg-zinc-800/70'
                          : 'bg-zinc-900/80 hover:bg-zinc-800/60')
                      }
                    >
                      <input
                        type="radio"
                        name="dossier-target"
                        checked={dossierTarget === item.id}
                        onChange={() => setDossierTarget(item.id)}
                        className="h-4 w-4"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>

                {dossierTarget === 'mother_father' && (
                  <p className="pt-2 text-xs md:text-sm">
                    <span className="font-semibold">MOTHER:</span> Sharp elegance. Her love
                    language is criticism.{' '}
                    <span className="font-semibold">FATHER:</span> Quiet confidence. Worn down by
                    capitalism. Professional distance.
                  </p>
                )}

                {dossierTarget === 'jun' && (
                  <p className="pt-2 text-xs md:text-sm">
                    <span className="font-semibold">JUN (16)</span> Sleepy eyes, sharp jawline.
                    Looks cool, is actually a soft marshmallow. Likely to be found eating ramen in
                    a closet.
                  </p>
                )}

                {dossierTarget === 'coco' && (
                  <p className="pt-2 text-xs md:text-sm">
                    <span className="font-semibold">COCO (17)</span> Lethal dancer. Cat eyes.
                    Expensive aura. Or maybe they're just better than you.
                  </p>
                )}

                {dossierTarget === 'haneul' && (
                  <p className="pt-2 text-xs md:text-sm">
                    <span className="font-semibold">HANEUL (17)</span> Dewy skin, tea-colored eyes.
                    Looks like they were born in a castle, but secretly hates the spotlight.
                  </p>
                )}

                {dossierTarget === 'noa' && (
                  <div className="pt-2 text-xs md:text-sm space-y-1.5">
                    {(chapter ?? 1) < 3 && <p>Locked until Chapter 3.</p>}
                    {(chapter ?? 1) >= 3 && !noaNameKnown && (
                      <>
                        <p>
                          <span className="font-semibold">MENTOR NOA (17)</span>
                        </p>
                        <p>
                          A famous solo artist and judge on Project: Supernova. Known for her harsh
                          critiques and incredible stage presence, her soulful, deep brown eyes
                          radiate a warmth that provides a subtle contrast to the cold efficiency of
                          the survival show.
                        </p>
                      </>
                    )}
                    {(chapter ?? 1) >= 3 && noaNameKnown && (
                      <>
                        <p>
                          <span className="font-semibold">YOON NA-RI (17)</span>
                        </p>
                        <p>
                          Now known by her real name, Yoon Na-ri is a teenage prodigy who debuted at
                          13. Her tall, feminine frame and sun-kissed tan skin remain striking, but
                          her soulful brown eyes now carry the weight of her legacy. Underneath the
                          \"Perfect Idol\" mask, she is rebellious and treats you as an equal.
                        </p>
                      </>
                    )}
                  </div>
                )}

                {dossierTarget === 'minjae' && (
                  <p className="pt-2 text-xs md:text-sm">
                    <span className="font-semibold">HAN MIN-JAE (19)</span> Wolf cut, green eyes.
                    Warned you to run away. You didn't listen.
                  </p>
                )}

                {dossierTarget === 'side_chars' && (
                  <div className="pt-2 space-y-2">
                    <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden">
                      {[
                        { id: 'rio_kang', label: 'Rio & Kang' },
                        { id: 'jiwon_yuri', label: 'Jiwon & Yuri' },
                        { id: 'eden', label: 'Eden' },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={
                            'flex items-center gap-3 px-4 py-2.5 border-b border-zinc-800 cursor-pointer ' +
                            (sideTarget === item.id
                              ? 'bg-zinc-800/70'
                              : 'bg-zinc-900/80 hover:bg-zinc-800/60')
                          }
                        >
                          <input
                            type="radio"
                            name="side-target"
                            checked={sideTarget === item.id}
                            onChange={() => setSideTarget(item.id)}
                            className="h-4 w-4"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>

                    {sideTarget === 'rio_kang' && (
                      <p className="text-xs md:text-sm">
                        <span className="font-semibold">RIO (17):</span> Short, explosive energy. A
                        walking vitamin shot.
                        <br />
                        <span className="font-semibold">KANG (18):</span> Built like a tank. Stoic.
                        Practices dance moves in their sleep.
                      </p>
                    )}

                    {sideTarget === 'jiwon_yuri' && (
                      <p className="text-xs md:text-sm">
                        <span className="font-semibold">JI-WON (17):</span> Analytical eyes.
                        Calculates debut probability while eating salad.
                        <br />
                        <span className="font-semibold">YURI (15):</span> Fairy visual. The
                        sharpest 'Golden Maknae' in the business.
                      </p>
                    )}

                    {sideTarget === 'eden' && (
                      <p className="text-xs md:text-sm">
                        <span className="font-semibold">EDEN (28):</span> Genius producer. Looks
                        like a vampire who lives in the studio.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'glossary' && (
              <div className="space-y-4 text-xs md:text-sm">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-amber-200 mb-1">
                    📖 THE DICTIONARY OF SUFFERING
                  </p>
                  <p className="italic text-zinc-300">
                    A guide to K-Pop terminology used in the game
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="font-semibold text-purple-200">
                    HONORIFICS (FAMILY &amp; RESPECT)
                  </p>
                  <p>
                    <span className="font-semibold">Sunbae / Hoobae (선배 / 후배):</span> Senior /
                    Junior. The hierarchy is absolute. If they debuted one day before you, they are
                    your Sunbae. Bow 90 degrees or die socially.
                  </p>
                  <p>
                    <span className="font-semibold">Hyung / Oppa (형 / 오빠):</span> "Older Brother".
                    Used by males (Hyung) or females (Oppa) to address an older male. Can be
                    affectionate or just polite.
                  </p>
                  <p>
                    <span className="font-semibold">Noona / Unnie (누나 / 언니):</span> "Older Sister".
                    Used by males (Noona) or females (Unnie) to address an older female.
                  </p>
                  <p>
                    <span className="font-semibold">-Nim (님):</span> A suffix of high respect (e.g.,
                    "Sunbae-nim", "Teacher-nim"). Adding it shows you know your place.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="font-semibold text-sky-200">🗣️ DAILY LIFE &amp; SLANG</p>
                  <p>
                    <span className="font-semibold">Daebak (대박):</span> "Awesome" or "Huge
                    Success". Used when something goes viral or when you are genuinely shocked.
                  </p>
                  <p>
                    <span className="font-semibold">Hwaiting (화이팅):</span> "Fighting!" A phrase
                    used to cheer someone on or wish them luck before a performance.
                  </p>
                  <p>
                    <span className="font-semibold">Pali-pali (빨리빨리):</span> "Hurry, hurry!" The
                    unspoken motto of Korean society. If you aren't running, you're late.
                  </p>
                  <p>
                    <span className="font-semibold">Aegyo (애교):</span> Acting overly cute and
                    childlike to charm fans. Required even if you are a 25-year-old rapper with a
                    deep voice.
                  </p>
                  <p>
                    <span className="font-semibold">Skinship (스킨십):</span> Physical intimacy
                    between friends (holding hands, hugging). Fans obsess over analyzing these
                    moments.
                  </p>
                  <p>
                    <span className="font-semibold">Nugu (누구):</span> Literally "Who?". A
                    derogatory term for unpopular groups or idols that nobody knows.
                  </p>
                  <p>
                    <span className="font-semibold">T-Time / Ment:</span> The "Talking Time" during
                    a concert or show where idols stop singing to talk to the audience. Usually
                    scripted.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="font-semibold text-pink-200">🎭 INDUSTRY TERMS</p>
                  <p>
                    <span className="font-semibold">Maknae (막내):</span> The youngest member.
                    Responsible for being cute (Aegyo) and doing the chores, but often secretly runs
                    the group ("Maknae on Top").
                  </p>
                  <p>
                    <span className="font-semibold">All-Rounder:</span> An idol who has no weakness—
                    good at Vocals, Dance, and Rap. The rarest type of trainee.
                  </p>
                  <p>
                    <span className="font-semibold">Visual / Face Genius:</span> A member so
                    undeniably good-looking that their face alone is considered a talent.
                  </p>
                  <p>
                    <span className="font-semibold">Ending Fairy:</span> The member who gets the
                    final close-up shot. You must stare into the camera and pant heavily (even if
                    you aren't tired).
                  </p>
                  <p>
                    <span className="font-semibold">Kkondae (꼰대):</span> An older person who is
                    condescending, rigid, and demands respect just because of their age. A "Boomer".
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="font-semibold text-emerald-200">🧠 CONCEPTS &amp; EMOTIONS</p>
                  <p>
                    <span className="font-semibold">Han (한):</span> A deep sorrow, resentment, and
                    injustice that builds up over time. It is the fuel for great art.
                  </p>
                  <p>
                    <span className="font-semibold">Jeong (정):</span> A deep connection. It goes
                    beyond love—it is loyalty and shared attachment, even towards people you might
                    hate.
                  </p>
                  <p>
                    <span className="font-semibold">Nunchi (눈치):</span> The art of "reading the
                    room". The ability to gauge the mood instantly. Essential for survival.
                  </p>
                  <p>
                    <span className="font-semibold">Kki (끼):</span> The "X-Factor" or star quality.
                    You can't learn it in a classroom; you have to be born with it.
                  </p>
                  <p>
                    <span className="font-semibold">Eumsaek (음색):</span> "Vocal Tone" or "Voice
                    Color". Having a unique vocal texture that is instantly recognizable.
                  </p>
                  <p>
                    <span className="font-semibold">4D Personality:</span> Someone eccentric and
                    quirky (thinking in the 4th Dimension). Fans love them because they are
                    unpredictable.
                  </p>
                  <p>
                    <span className="font-semibold">Sasaeng (사생):</span> Obsessive "fans" who stalk
                    idols, invade privacy, and commit crimes to get attention.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}


