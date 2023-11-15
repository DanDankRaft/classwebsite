import fs from "fs/promises";
import path from "path";
import { Marked } from "marked";
import { MyCarousel, sample } from "./exhibitcontents";

function getPageJson(name) {
  //Get the path of the json file
  const filePath = path.join(process.cwd(), `exhibits/${name}/info.json`);
  return fs
    .readFile(filePath)
    .then(res => JSON.parse(res))
    .catch(res => {
      throw new Error("no such exhibit: " + filePath.toString());
    });
}

const marked = new Marked();

function getPageMarkdown(name) {
  const filePath = path.join(process.cwd(), `exhibits/${name}/content.md`);
  return fs
    .readFile(filePath)
    .then(res => res.toString())
    .then(res => marked.parse(res, {silent: true, gfm: true}))
    .catch(res => 
      "no such exhibit"
    );
}

export default async function Page({ params }) {
  const pageJson = await getPageJson(params.slug);
  const pageMarkdown = await getPageMarkdown(params.slug);
  return (
    <main>
      <div className="flex flex-col p-2 md:px-5 w-screen md:max-w-[1200px]">
        <MyCarousel items={pageJson.carousel} exhibitname={pageJson.address} />
        <div className="max-w-full">
          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center my-2">
            {pageJson.name}
          </p>
          <p className="text-center text-xl">
            {pageJson.contents}
          </p>
          <hr className="my-1 border-y-2 rounded-full" />
          {pageMarkdown == "no such exhibit" ?
            <div className="innerBody">{pageJson.contents}</div> : 
            <div className="innerBody" dangerouslySetInnerHTML={{__html: pageMarkdown}}/>
          }
        </div>
      </div>
    </main>
  );
}
