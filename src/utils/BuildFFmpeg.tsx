import { CODECS } from "./codes.tsx"
export function BuildFFmpegCommand
(
    input: string,
    newtype: string,
    output: string
)
{
    const args = CODECS[newtype];
    if(!args)
    {
        throw new Error(`Unsupported Video Format , ${newtype}`)
    }
    return [
        "-i",
        input,
        ...args,
        output
    ];
    // ffmpeg -i input.mp4 -c:v mpeg4 -c:a mp3 output.avi
}