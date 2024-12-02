import 'dotenv/config';

import os from 'os';
import fs from 'fs/promises';
import { confirm, checkbox, select } from '@inquirer/prompts';
import { clipboard } from './utils/clipboard';

const main = async () => {
  const homeDir = os.homedir();
  const yalcPackages = await fs.readdir(
    `${homeDir}/.yalc/packages/@immediate_media`,
  );

  const selectedPackages = await checkbox<string>({
    message: 'Which packages would you like to link?',
    choices: yalcPackages.filter((pkg) => !pkg.startsWith('.')),
  });

  const selectedFullPackageNames = selectedPackages.map(
    (pkg) => `@immediate_media/${pkg}`,
  );

  const fesDirectory = process.env.FES_DIRECTORY;
  const services = await fs.readdir(`${fesDirectory}/services`);

  const servicesToRun = await checkbox({
    message: 'Which services would you like to run?',
    choices: services.filter(
      (service) => !['dev', 'guineapig'].includes(service),
    ),
  });

  const envToRun = await select({
    message: 'Which environment would you like to run?',
    choices: ['staging', 'preproduction'],
  });

  const withLogs = await confirm({
    message: 'Would you like to see logs?',
  });

  const commands = [
    'rm -rf **/.next || rm -rf **/node_modules',
    'yalc remove --all',
    ...selectedFullPackageNames.map((pkg) => `yalc add ${pkg} --pure`),
    'yarn install',
    `yarn dev ${servicesToRun.join(' ')}${envToRun === 'preproduction' ? ` --env=${envToRun}` : ''}`,
    withLogs ? 'yarn pm logs' : '',
  ].filter(Boolean);

  const output = commands.join(' && ');

  clipboard.copy(output);

  console.log(
    'Run this command sequence at the root of your FES directory. It has been copied to the clipboard for your convenience.',
  );
  console.log(output);
};

main().catch(() => {});
