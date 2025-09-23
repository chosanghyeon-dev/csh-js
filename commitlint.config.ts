import type { UserConfig } from "@commitlint/types";

// https://www.conventionalcommits.org/en/v1.0.0/
const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
};

export default Configuration;
