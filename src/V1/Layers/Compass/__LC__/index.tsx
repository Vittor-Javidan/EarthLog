import { DeclinationInput } from "./DeclinationInput";
import { Display_BubbleLevel } from "./Display_BubbleLevel";
import { Display_Compass } from "./Display_Compass";
import { MiniDisplay_Compass } from "./MiniDisplay_Compass";
import { MiniDisplay_BubbleLevel } from "./MiniDisplay_BubbleLevel";

const Display = {
  Compass: Display_Compass,
  BubbleLevel: Display_BubbleLevel,
  MiniCompass: MiniDisplay_Compass,
  MiniBubbleLevel: MiniDisplay_BubbleLevel,
}

export const LC = {
  DeclinationInput: DeclinationInput,
  Display: Display,
}
