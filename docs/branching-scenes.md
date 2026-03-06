# Filial sahnalar (har tanlov alohida sahna ga boradi)

Oxirida shu sahnalarga olib boradigan tanlovlar uchun kerakli yangi sahnalarni alohida qo‘shamiz.

---

## 1. `name_confirmed`
| Tanlov | Keyingi sahna |
|--------|----------------|
| "Yes, that's me." | `audition_talent` |
| "No, let me correct that." | `director_park_name_2` |

---

## 2. `weigh_in_humiliation`
| Tanlov | Keyingi sahna |
|--------|----------------|
| I decide to starve myself... (EATING DISORDER) | `eating_disorder_trait` |
| I dissociate... | `chapter1_start` |
| I clench my fists... | `chapter1_start` |

*Eslatma:* 2 va 3-chi tanlov hozircha `chapter1_start` — kerak bo‘lsa alohida sahnalar qo‘shiladi.

---

## 3. `month12_night_off`
| Tanlov | Keyingi sahna |
|--------|----------------|
| Coco invited me to sneak out... | `month12_convenience_coco` |
| I saw Haneul heading to the roof... | `chapter1_start` |
| I've heard rumors of a secret studio... | `chapter1_start` |
| I stay in the practice room... | `chapter1_start` |

*Eslatma:* 2, 3, 4-chi tanlovlar `chapter1_start` — alohida sahnalar kerak bo‘lsa qo‘shiladi.

---

## 4. `month12_convenience_coco`
| Tanlov | Keyingi sahna |
|--------|----------------|
| "I have to. I'm not a natural genius like..." | `month12_coco_genius` |
| "I'm fine. Just thinking about the evaluation." | `chapter1_start` |
| "I was hoping to run into you, actually." | `chapter1_start` |

*Eslatma:* 2 va 3-chi tanlovlar `chapter1_start` — alohida sahnalar kerak bo‘lsa qo‘shiladi.

---

## 5. `year1_prepare`
| Tanlov | Keyingi sahna |
|--------|----------------|
| I challenge Coco to a dance-off... | `year1_danceoff_respect` |
| I focus on my weaknesses... | `chapter1_start` |
| I play politics... | `chapter1_start` |

*Eslatma:* 2 va 3-chi tanlovlar `chapter1_start` — alohida sahnalar kerak bo‘lsa qo‘shiladi.

---

## 6. `white_room_noa_interview`
| Tanlov | Keyingi sahna |
|--------|----------------|
| Hungry. | `chapter1_start` (sahna darajasidagi nextScene) |
| **I am done with this interview.** | `noa_edgy_freestyle` |
| Artist. | `chapter1_start` |
| Icon. | `chapter1_start` |

*Eslatma:* "I am done with this interview." uchun `noa_edgy_freestyle` allaqachon qo‘shilgan. Boshqa uchta tanlov uchun bitta yoki alohida sahnalar kerak bo‘lsa oxirida qo‘shiladi.

---

## 7. `freestyle_what_you_show`
Qora marmar, "What do you show them?" — 3 ta tanlov. Hozircha hammasi sahna darajasidagi `nextScene` → `chapter1_start`. Oxirida har biri alohida sahna ga borishi mumkin:

| Tanlov | Hozircha / Keyin |
|--------|-------------------|
| I Dance. Explosive energy. | chapter1_start → (masalan `freestyle_dance_result`) |
| I Sing. An emotional ballad. | chapter1_start → (masalan `freestyle_sing_result`) |
| I Rest. I save my energy for the long game. | chapter1_start → (masalan `freestyle_rest_result`) |

---

## 8. `room_choice`
Koridor, uchta eshik, “where to sleep” — 3 ta xona tanlovi. Hozircha hammasi sahna darajasidagi `nextScene` → `chapter1_start`. Oxirida har bir xona alohida sahna ga borishi mumkin:

| Tanlov | Hozircha / Keyin |
|--------|-------------------|
| The 'Playful' Room (Roommates: Rio & Coco). | chapter1_start → (masalan `room_playful_rio_coco`) |
| The 'Serious' Room (Roommates: Jiwon & Kang). | chapter1_start → (masalan `room_serious_jiwon_kang`) |
| The 'Peaceful' Room (Roommates: Haneul & Yuri). | chapter1_start → (masalan `room_peaceful_haneul_yuri`) |

---

## 9. `villa_night1_explore`
Villa birinchi kecha, traineelar yolg‘iz; 6 ta tanlov (kimga borish / kechani tugatish). Kang/Jiwon/Rio/Yuri/Eden tanlovlari alohida sahnalarga boradi; "end the night" sahna darajasidagi `nextScene` → `chapter1_start`.

| Tanlov | Keyin |
|--------|--------|
| Kang is by the pool table... | `villa_night1_kang` ✓ |
| Jiwon is standing in front of the Smart Fridge... | `villa_night1_jiwon` ✓ |
| Rio is behind the DJ booth... | `villa_night1_rio` ✓ |
| Yuri is in the lounge... | `villa_night1_yuri` ✓ |
| Eden (The Mentor)... check the balcony | `villa_night1_eden` ✓ |
| The excitement is draining me. I need to end the night. | sahna darajasidagi nextScene → `chapter1_start` |

**`villa_night1_eden`:** Balkon sahna (Eden, sigaret, "Are you ready for the gauntlet?"). 4 ta tanlov (I'm not sure yet... / Are you Halbae? / I'm always ready. / Depends on who will be cheering...). Hozircha sahna darajasidagi `nextScene` → `chapter1_start`; oxirida har bir javob uchun alohida sahna qo‘shilishi mumkin.

---

## Qisqacha: `chapter1_start` placeholder ishlatiladigan joylar

Quyidagi tanlovlar hozircha `chapter1_start` ga yo‘naltirilgan; oxirida ular uchun alohida sahnalar yozilsa, shu ro‘yxat bo‘yicha ulash mumkin:

- **weigh_in_humiliation:** dissociate, clench fists
- **month12_night_off:** Haneul roof, secret studio, practice room
- **month12_convenience_coco:** "I'm fine", "hoping to run into you"
- **year1_prepare:** focus on weaknesses, play politics
- **white_room_noa_interview:** Hungry, Artist, Icon
