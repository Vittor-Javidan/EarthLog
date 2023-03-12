import { useState } from "react";
import ProjectsScreen from "./Projects";

export default function Home() {

    const [language, setLanguage] = useState<"eng" | "pt-br">("eng")

    return (
        <ProjectsScreen />
    );
}
