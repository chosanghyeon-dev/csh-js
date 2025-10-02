import type { UserConfig } from "@commitlint/types";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const getPackages = (): string[] => {
  const packagesDir = join(__dirname, "packages");

  const packages = readdirSync(packagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      try {
        const pkgPath = join(packagesDir, dirent.name, "package.json");
        const pkgJson = JSON.parse(readFileSync(pkgPath, "utf-8"));

        return pkgJson.name;
      } catch {
        return dirent.name;
      }
    });

  return packages;
};

// https://www.conventionalcommits.org/en/v1.0.0/
const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", getPackages()],
    "footer-empty": [2, "always"],
    "references-empty": [2, "always"],
    "body-empty": [2, "always"],
  },
  ignores: [(message) => message.trim() === "Version Packages"],
};

export default Configuration;
