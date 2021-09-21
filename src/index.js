import path from 'path';
import Editor, { customFactory } from './usecases';

try {
  if (process.argv.length <= 2) {
    const cmd = path.basename(process.argv[1]);
    console.log(`usage: ${cmd} [[CommandNames...] file]\n`);
    Editor.description();
  } else {
    let p;
    if (process.argv.length === 3) {
      p = Editor.edit(process.argv[2]);
    } else {
      const names = process.argv.slice(2, process.argv.length - 1);
      const editor = customFactory(names);
      p = editor.edit(process.argv[process.argv.length - 1]);
    }
    p.catch((e) => {
      console.log(e);
      process.exit(2);
    });
  }
} catch (e) {
  console.log(e);
  process.exit(1);
}
