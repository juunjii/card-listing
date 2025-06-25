// import "./style.css";
// function sortGridItems(
//   gridItems: Element[],
//   isAscending: number,
//   nameToNum: Map<string, number>
// ) {
//   gridItems.sort((a, b) => {
//     const cardA = a.querySelector("img")!.alt;
//     const cardB = b.querySelector("img")!.alt;
//     const numA = nameToNum.get(cardA);
//     const numB = nameToNum.get(cardB);
//     return (numA! - numB!) * isAscending;
//   });
// }
// function startup() {
//   const gridContainer = document.querySelector(".card-catalog");
//   // Create array of grid items
//   const gridItems = Array.from(gridContainer!.children);
//   const sortButton = document.getElementById(
//     "sort-button"
//   ) as HTMLSelectElement;
//   let sortOrder: string = sortButton.value;
//   const isAscending: number = sortOrder === "ascending" ? 1 : -1;
//   let nameToNum: Map<string, number> = new Map([
//     ["Ainok Bond-Kin", 5],
//     ["Wrenn and Six", 553],
//     ["Force of Negation", 50],
//     ["Mana Drain", 57],
//   ]);
//   sortGridItems(gridItems, isAscending, nameToNum);
//   gridItems.forEach((item) => {
//     gridContainer?.appendChild(item);
//   });
// }
// function sortCollectorNum() {
//   const gridContainer = document.querySelector(".card-catalog");
//   // Create array of grid items
//   const gridItems = Array.from(gridContainer!.children);
//   const sortButton = document.getElementById(
//     "sort-button"
//   ) as HTMLSelectElement;
//   // Mapping of card name to collector number
//   let nameToNum: Map<string, number> = new Map([
//     ["Ainok Bond-Kin", 5],
//     ["Wrenn and Six", 553],
//     ["Force of Negation", 50],
//     ["Mana Drain", 57],
//   ]);
//   // Get each image in grid item
//   sortButton!.addEventListener("change", () => {
//     let sortOrder: string = sortButton.value;
//     const isAscending: number = sortOrder === "ascending" ? 1 : -1;
//     sortGridItems(gridItems, isAscending, nameToNum);
//     // Add the arranged grid items back to parent grid
//     gridItems.forEach((item) => {
//       gridContainer?.appendChild(item);
//     });
//   });
// }
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css");
var CARD_NUMBERS = new Map([
    ["Ainok Bond-Kin", 5],
    ["Wrenn and Six", 553],
    ["Force of Negation", 50],
    ["Mana Drain", 57],
]);
function getGridItems() {
    var container = document.querySelector(".card-catalog");
    return container ? Array.from(container.children) : [];
}
function getSortOrder() {
    var sortButton = document.getElementById("sort-button");
    return (sortButton === null || sortButton === void 0 ? void 0 : sortButton.value) === "ascending" ? 1 : -1;
}
function renderGridItems(container, items) {
    if (!container)
        return;
    items.forEach(function (item) { return container.appendChild(item); });
}
function sortGridItems(gridItems, isAscending, nameToNum) {
    gridItems.sort(function (a, b) {
        var _a, _b, _c, _d, _e, _f;
        var cardA = (_b = (_a = a.querySelector("img")) === null || _a === void 0 ? void 0 : _a.alt) !== null && _b !== void 0 ? _b : "";
        var cardB = (_d = (_c = b.querySelector("img")) === null || _c === void 0 ? void 0 : _c.alt) !== null && _d !== void 0 ? _d : "";
        var numA = (_e = nameToNum.get(cardA)) !== null && _e !== void 0 ? _e : 0;
        var numB = (_f = nameToNum.get(cardB)) !== null && _f !== void 0 ? _f : 0;
        return (numA - numB) * isAscending;
    });
}
function applySorting() {
    var container = document.querySelector(".card-catalog");
    var gridItems = getGridItems();
    var isAscending = getSortOrder();
    sortGridItems(gridItems, isAscending, CARD_NUMBERS);
    renderGridItems(container, gridItems);
}
function setupSortListener() {
    var sortButton = document.getElementById("sort-button");
    if (sortButton) {
        sortButton.addEventListener("change", applySorting);
    }
}
function startup() {
    applySorting(); // Initial sort on load
    setupSortListener(); // Set up dropdown listener
}
// Run on page load
window.addEventListener("DOMContentLoaded", startup);
