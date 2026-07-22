import { fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { BuildFFmpegCommand } from "./BuildFFmpeg.tsx";
export async function UrlConversion 
(
    ffmpeg: FFmpeg,
    input:string,
    output:string
)
{
    await ffmpeg.writeFile(input , await fetchFile(input))
    await ffmpeg.exec(
        BuildFFmpegCommand(input , "url" , output)
    );

    const data = await ffmpeg.readFile(output);
    const blob = new Blob([new Uint8Array(data as any)], {type: `video/mp4`,});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = output;
    a.click();

    URL.revokeObjectURL(url);
}
// ffmpeg -i "YOUR URL TO DOWNLOAD VIDEO FROM" -c:v libx264 -preset slow -crf 22 "saveas.mp4"