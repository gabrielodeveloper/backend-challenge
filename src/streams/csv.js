import { parse } from "csv-parse";
import fs from 'node:fs';

const csvPath = new URL('./tasks.cvs', import.meta.url);

const streams = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ',',
  skip_empty_lines: true,
  fromLine: 2
});

async function importTasks() {
  const linesParse = streams.pipe(csvParse);

  for await (const line of linesParse) {
    const [title, description] = line;

    await fetch('http://localhost:333/tasks/import', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description
      })
    })
  } 
}

importTasks();