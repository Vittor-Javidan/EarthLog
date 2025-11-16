import { Input_Declination } from "./Input_Declination";
import { Input_Measurement } from "./Input_Measurement";
import { Input_Average } from "./Input_AverageInput";
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

const Input = {
  Declination: Input_Declination,
  Measurement: Input_Measurement,
  Average: Input_Average,
}

export const LC = {
  Display: Display,
  Input: Input,
}
