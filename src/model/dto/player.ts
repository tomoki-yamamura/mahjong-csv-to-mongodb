import { Player } from "../player";

class PlayerDTO {
  readonly name: string;
  constructor(player: Player) {
    this.name = player.name
  }
}
