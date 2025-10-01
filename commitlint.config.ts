import type { UserConfig } from "@commitlint/types";
import { readdirSync } from "fs";
import { join } from "path";

const getPackages = (): string[] => {
  try {
    const packagesDir = join(__dirname, "packages");
    return readdirSync(packagesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch {
    return [];
  }
};

// https://www.conventionalcommits.org/en/v1.0.0/
const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", [...getPackages()]],
  },
  ignores: [(commit) => commit === "Version Packages"],
};

export default Configuration;
