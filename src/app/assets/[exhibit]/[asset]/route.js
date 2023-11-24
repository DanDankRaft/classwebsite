import fs from 'fs/promises';
import path from 'path';

function loadFile(exhibit, filename) {
    const filePath = path.join(process.cwd(), `exhibits/${exhibit}/${filename}`);
    return fs.readFile(filePath);
}

export async function GET(request, {params}) {

    return new Response(await loadFile(params.exhibit, params.asset), {
        status: 200,
    })
}