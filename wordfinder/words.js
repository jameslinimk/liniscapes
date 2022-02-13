"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
/*
'2': 103,
'3': 1077,
'4': 4410,
'5': 9984,
'6': 17670,
'7': 26842,
'8': 33022,
'9': 31246,
'10': 25954,
'11': 19997,
'12': 14564,
'13': 9966,
'14': 6483,
'15': 4058,
'16': 1943,
'17': 1127,
'18': 594,
'19': 329,
'20': 160,
'21': 62,
'22': 30,
'23': 13,
'24': 9,
'25': 2,
'27': 2,
'28': 1
*/
fs_1.default.readFile("./words.txt", "utf8", (error, _words) => {
    if (error)
        return console.error(error);
    const words = _words.split(",");
    for (let i = 4; i <= 7; i++) {
        const content = `const words${i} = ["${words.filter(word => word.length === i).join("\", \"")}"]

export default words${i}`;
        fs_1.default.writeFile(`../src/words/words${i}.ts`, content, (error) => {
            if (error)
                console.error(error);
        });
    }
});
//# sourceMappingURL=words.js.map