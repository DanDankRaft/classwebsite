import fs from "fs/promises";
import path from "path";
import { Marked } from "marked";

function getPageJson(name) {
  //Get the path of the json file
  const filePath = path.join(process.cwd(), `json/${name}.json`);
  return fs
    .readFile(filePath)
    .then(res => JSON.parse(res))
    .catch(res => {
      throw new Error("no such exhibit");
    });
}

const marked = new Marked();

function getPageMarkdown(name) {
  const filePath = path.join(process.cwd(), `md/${name}.md`);
  return fs
    .readFile(filePath)
    .then(res => res.toString())
    .then(res => marked.parse(res, {silent: true, gfm: true}))
    .catch(res => {
      throw new Error("no such exhibit");
    });
}

export default async function Page({ params }) {
  const pageJson = await getPageJson(params.slug);
  const pageMarkdown = await getPageMarkdown(params.slug);
  return (
    <main>
      <div className="flex flex-col p-2 md:px-5 max-w-[1200px]">
        <img src={pageJson.image} className="mx-auto w-full h-fit" />
        <div className="min-w-full">
          <h1 className="text-6xl md:text-7xl lg:text-8xl text-center my-2">
            {pageJson.name}
          </h1>
          <hr className="my-1 border-y-2 rounded-full" />
          <div className="innerBody" dangerouslySetInnerHTML={{__html: pageMarkdown}} />
        </div>
      </div>
    </main>
  );
}
