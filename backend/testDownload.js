import { downloadAudio } from "./src/services/youtubeService.js";

const test = async () => {
  const result = await downloadAudio(
    "https://www.youtube.com/watch?v=jNQXAC9IVRw"
  );

  console.log(result);
};

test();