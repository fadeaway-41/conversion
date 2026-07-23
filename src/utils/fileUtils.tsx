import { fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { BuildFFmpegCommand } from "../utils/BuildFFmpeg.tsx";
import axios from 'axios';

export async function CodecConversion(
  ffmpeg: FFmpeg,
  input: string,
  file: File,
  newtype: string,
  output: string
) 
{
    await ffmpeg.writeFile(input, await fetchFile(file));

    // progress bar

    ffmpeg.on("progress", ({ progress }) => {
    console.log(`${Math.round(progress * 100)}%`);
    });

    // executing downloading
    await ffmpeg.exec(
        BuildFFmpegCommand(input, newtype, output)
    );
    
    const data = await ffmpeg.readFile(output);
    const blob = new Blob([new Uint8Array(data as any)], {type: `video/${newtype}`,});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = output;
    a.click();

    URL.revokeObjectURL(url);
}