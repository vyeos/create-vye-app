#!/usr/bin/env node

import fs from "fs";
import path from "path";
import chalk from "chalk";
import prompts from "prompts";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  let projectName = process.argv[2];

  if (!projectName) {
    const response = await prompts({
      type: "text",
      name: "name",
      message: "Enter your project name:",
      initial: "my-app",
    });

    projectName = response.name;
  }

  if (!projectName) {
    console.log(chalk.red("Project name is required."));
    process.exit(1);
  }

  const targetPath = path.join(process.cwd(), projectName);
  const templatePath = path.join(__dirname, "template");

  if (fs.existsSync(targetPath)) {
    console.log(chalk.red(`Folder ${projectName} already exists.`));
    process.exit(1);
  }

  console.log(chalk.blue("Creating project..."));
  copyDir(templatePath, targetPath);

  console.log(chalk.blue("Installing dependencies..."));
  execSync("pnpm install", { cwd: targetPath, stdio: "inherit" });

  console.log(chalk.blue("Configuring shadcn..."));
  execSync("pnpm dlx shadcn@latest add button card input badge", {
    cwd: targetPath,
    stdio: "inherit",
  });

  console.log(chalk.blue("Setting up Biome..."));
  execSync("pnpm add -D @biomejs/biome", {
    cwd: targetPath,
    stdio: "inherit",
  });
  execSync("pnpm exec biome init", { cwd: targetPath, stdio: "inherit" });

  console.log(chalk.blue("Install Drizzle..."));
  execSync("pnpm add drizzle-orm postgres dotenv", {
    cwd: targetPath,
    stdio: "inherit",
  });
  execSync("pnpm add -D drizzle-kit tsx", {
    cwd: targetPath,
    stdio: "inherit",
  });

  console.log(chalk.blue("Install Better-Auth..."));
  execSync("pnpm i better-auth", { cwd: targetPath, stdio: "inherit" });

  console.log(chalk.blue("Initializing Git..."));
  execSync("git init", { cwd: targetPath, stdio: "inherit" });

  console.log(chalk.green("\nYour custom Next.js app is ready!\n"));
  console.log(`👉 cd ${projectName}`);
  console.log("👉 pnpm dev\n");
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}

main();
