import path from 'path';
import Editor from './usecases';

if (process.argv.length <= 2) {
  const cmd = path.basename(process.argv[1]);
  console.log(`usage: ${cmd} [file]`);
  Editor.description();
} else {
  Editor.edit(process.argv[2]);
}
