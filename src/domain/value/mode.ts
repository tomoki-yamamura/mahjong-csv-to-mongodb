class PlayMode {
  mode: "3player" | "4player";
  constructor(mode: string) {
    if (mode !== "3player" && mode !== "4player") {
      throw new Error(`Invalid mode: ${mode}. Mode must be "3player" or "4player".`);
    }
    this.mode = mode;
  }

  getMode(): string {
    return this.mode
  }
}

export default PlayMode