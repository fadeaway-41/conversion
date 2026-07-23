export const CODECS: Record<string, string[]> = {
  mp4: ["-c:v", "libx264", "-preset", "ultrafast", "-crf", "23", "-c:a", "aac"],

  avi: ["-c:v", "mpeg4", "-q:v", "5", "-c:a", "mp3"],

  mov: ["-c:v", "libx264", "-preset", "ultrafast", "-crf", "23", "-c:a", "aac"],

  mkv: ["-c:v", "libx264", "-preset", "ultrafast", "-crf", "23", "-c:a", "aac"],

  webm: ["-c:v", "libvpx", "-deadline", "realtime", "-cpu-used", "8", "-c:a", "libopus"],

  mp3: ["-c:a", "libmp3lame", "-q:a", "4"],
  
  url: ["-c:v", "libx264", "-preset", "ultrafast", "-crf", "23"]
} as const;

export type CODEC = keyof typeof CODECS;