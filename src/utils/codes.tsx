export const CODECS: Record<string, string[]> = {
  mp4: ["-c:v", "libx264", "-c:a", "aac"],

  avi: ["-c:v", "mpeg4", "-c:a", "mp3"],

  mov: ["-c:v", "libx264", "-c:a", "aac"],

  mkv: ["-c:v", "libx264", "-c:a", "aac"],

  webm: ["-c:v", "libvpx-vp9", "-c:a", "libopus"],
};