import experienceLevels from "../../config/experienceLevels";

export default class Experience {
    static getLevel(experience: number) {
        let level = 0;
        experienceLevels.every((levelExperience, i) => {
            if (experience.between(levelExperience, experienceLevels[i + 1])) {
                level = i;
                return false;
            }
            return true;
        })
        return level ? level : 1;
    }

    static getExperience(level: number) {
        return experienceLevels[level];
    }
}