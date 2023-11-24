import Link from "next/link";
import fs from "fs/promises";
import path from "path";

function GetAllExhibits() {
  const exhibitsPath = path.join(process.cwd(), "exhibits");
  return fs
    .readdir(exhibitsPath, {withFileTypes: true})
    //filter to subdirectories only
    .then(res => res.filter(file => file.isDirectory()))
    //get info.json from each subdirectory
    .then(res => res.map(x => fs.readFile(path.join(x.path, x.name, "info.json"))))
    .then(arr => Promise.all(arr))
    .then((jsons) => jsons.map((x) => JSON.parse(x)));
}

const colors = ["#F32C2C", "#F7823A", "#F7D93A", "#62DA67", "#62D3DA", "#333D95", "#682878"];

function ExhibitCard(props) {
  //TODO: refactor CSS
  return (
      <Link href={`/exhibits/${props.address}`} className="group flex flex-col justify-center gap-2 max-h-none md:flex-row md:max-h-[230px] my-5">
        <img
          src={`/assets/${props.address}/${props.thumbnail}`}
          className="max-w-[450px] w-full max-h-fit mx-auto md:mx-0 group-hover:scale-[1.02] md:group-hover:scale-105 md:group-focus:scale-105 md:group-active:scale-110 transition-transform"
          alt={props.name}
        />
        <div className="flex flex-col break-inside-avoid basis-1/2 md:group-hover:translate-x-2 md:group-focus:translate-x-2 md:group-active:translate-x-7 transition-transform">
          <h2 className="text-3xl"> <span style={{backgroundColor: colors[props.i % colors.length]}} className={"rounded-full h-[20px] w-[20px] inline-block"}></span> {props.name}</h2>
          <hr className="my-1 border-y-2" />
          <p className="overflow-hidden max-h-20 md:max-h-[100%]">
            {props.contents}
          </p>
        </div>
      </Link>
  );
}

export default async function Home() {
  return (
    <main className="w-full">
      {((await GetAllExhibits()).map((x, i) => (
        <ExhibitCard
          key={i}
          i={i}
          name={x.name}
          thumbnail={x.thumbnail}
          contents={x.subheading}
          address={x.address}
        />
      )))
        
      }
    </main>
  );
}
