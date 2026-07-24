import { fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { BuildFFmpegCommand } from "../utils/BuildFFmpeg.tsx";
import { use, useState } from "react";
export async function CodecConversion(
  ffmpeg: FFmpeg,
  input: string,
  file: File,
  newtype: string,
  output: string,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) 
{
    await ffmpeg.writeFile(input, await fetchFile(file));
    ffmpeg.on("progress", ({ progress }) => {
    setProgress(Math.round(progress * 100));
    });
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