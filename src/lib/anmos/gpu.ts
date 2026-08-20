function env(name: string) {
  const bag = typeof process !== "undefined" ? process.env : {};
  return (bag[name] ?? "").trim();
}

export function gpuStatus() {
  const runpodKey = env("RUNPOD_API_KEY") || env("RUNPOD_KEY");
  const modalUrl = env("MODAL_MUSIC_URL") || env("MODAL_ENDPOINT");
  const modalTok = env("MODAL_TOKEN_ID") && env("MODAL_TOKEN_SECRET");
  return {
    alwaysOn: true,
    localAgentBlack: false,
    runpod: { wired: true, role: "video", live: runpodKey.length > 8, backup: "modal" },
    modal: { wired: true, role: "music", live: Boolean(modalUrl.startsWith("https://") && modalTok), backup: "runpod" },
    failover: "runpod ↔ modal",
  };
}
