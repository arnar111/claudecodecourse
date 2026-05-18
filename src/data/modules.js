import { m1 } from "./modules/m1.js";
import { m2 } from "./modules/m2.js";
import { m3 } from "./modules/m3.js";
import { m4 } from "./modules/m4.js";
import { m5 } from "./modules/m5.js";
import { m6 } from "./modules/m6.js";
import { m7 } from "./modules/m7.js";
import { m8 } from "./modules/m8.js";
import { m9 } from "./modules/m9.js";
import { m10 } from "./modules/m10.js";
import { m11 } from "./modules/m11.js";
import { m12 } from "./modules/m12.js";

export const MODULES = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12];

export const TOTAL_XP = MODULES.reduce(
  (s, m) => s + m.lessons.reduce((a, l) => a + l.xp, 0),
  0
);
export const TOTAL_LESSONS = MODULES.reduce((s, m) => s + m.lessons.length, 0);
