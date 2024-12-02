import { spawn } from 'child_process';

const copy = (text: string) => {
  const proc = spawn('pbcopy');
  proc.stdin.write(text);
  proc.stdin.end();
};

export const clipboard = {
  copy,
};
