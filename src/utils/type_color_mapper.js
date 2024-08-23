const type_color = {
    "Grass": "#8ddb8a",
    "Poison": "#ae7cfd",
    "Fire": "#ffad76",
    "Water": "#92b8f7",
    "Electric": "#ffd757",
    "Rock": "#dbc27e",
    "Fairy": "#ff9aff",
    default: "#a2a3a0"
}

export default function type_colors(type) {
    const types = type?.split("/") ?? ["default"];

    return types.map(elem => { return { type: elem, color: type_color[elem] ?? type_color.default, is_default: !type_color[elem] } });
} 