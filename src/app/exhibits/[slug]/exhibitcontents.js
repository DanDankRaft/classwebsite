'use client';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./contents.css";
import { Carousel } from "react-responsive-carousel";

export const sample = [
    {type: "iframe", src: "<iframe src=\"https://www.google.com/maps/d/u/0/embed?mid=1vTuD0CGhjFvakoFK59aBE3ZPb168coQ&ehbc=2E312F&noprof=1\" width=\"640\" height=\"480\"></iframe>"},
    {type: "image", src: "prideflag.jpg"},
    {type: "image", src: "progressflag.png"},
    {type: "youtube", src: "https://www.youtube.com/embed/spGBcbFB79k?si=n4q15WqrK_eWVB5M"},
    {type: "ms-stream", src: "https://cometmail-my.sharepoint.com/personal/wxs160630_utdallas_edu/_layouts/15/embed.aspx?UniqueId=7a4f8fec-fd6b-5d2d-b206-0a54bef60f00&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create"}
];



export function MyCarousel(props) {
    return (
        <Carousel dynamicHeight={true} showThumbs={false}>
            {props.items.map((e, i) => {
                let contents;
                switch (e.type) {
                    case "youtube":
                        contents = (<iframe className="h-[200px] md:h-[1000px]" src={e.src} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>);
                        break;
                    case "image":
                        contents = (<img src={`/assets/${props.exhibitname}/${e.src}`} />);
                        break;
                    case "ms-stream":
                        contents = (<iframe src={e.src} width="1280" height="720" allowFullScreen></iframe>);
                        break;
                    case "iframe":
                        contents = ( <div dangerouslySetInnerHTML={{ __html: e.src }} />);
                        break;
                    default:
                        contents = (<p>{'Error! invalid content type! supported types are "image", "youtube"'}</p>);
                        break;
                }

                return (
                    <div key={i}>
                        {contents}
                    </div>
                );
            })}
        </Carousel>
    );
}