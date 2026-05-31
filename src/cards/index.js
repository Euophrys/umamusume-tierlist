import jpCards from "./jp"
import glCards from "./gl"

export const CARDS_BY_SERVER = {
    jp: jpCards,
    gl: glCards,
}

export function getCards(server) {
    return CARDS_BY_SERVER[server] || jpCards
}
