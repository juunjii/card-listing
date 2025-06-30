"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css");
function sortGridItems(gridItems, isAscending, nameToNum) {
    gridItems.sort(function (a, b) {
        var cardA = a.querySelector("img").alt;
        var cardB = b.querySelector("img").alt;
        var numA = nameToNum.get(cardA);
        var numB = nameToNum.get(cardB);
        return (numA - numB) * isAscending;
    });
}
function startup() {
    var gridContainer = document.querySelector(".card-catalog");
    // Create array of grid items
    var gridItems = Array.from(gridContainer.children);
    var sortButton = document.getElementById("sort-button");
    var sortOrder = sortButton.value;
    var isAscending = sortOrder === "ascending" ? 1 : -1;
    var nameToNum = new Map([
        ["Ainok Bond-Kin", 5],
        ["Wrenn and Six", 553],
        ["Force of Negation", 50],
        ["Mana Drain", 57],
    ]);
    sortGridItems(gridItems, isAscending, nameToNum);
    gridItems.forEach(function (item) {
        gridContainer === null || gridContainer === void 0 ? void 0 : gridContainer.appendChild(item);
    });
}
function sortCollectorNum() {
    var gridContainer = document.querySelector(".card-catalog");
    // Create array of grid items
    var gridItems = Array.from(gridContainer.children);
    var sortButton = document.getElementById("sort-button");
    // Mapping of card name to collector number
    var nameToNum = new Map([
        ["Ainok Bond-Kin", 5],
        ["Wrenn and Six", 553],
        ["Force of Negation", 50],
        ["Mana Drain", 57],
    ]);
    // Get each image in grid item
    sortButton.addEventListener("change", function () {
        var sortOrder = sortButton.value;
        var isAscending = sortOrder === "ascending" ? 1 : -1;
        sortGridItems(gridItems, isAscending, nameToNum);
        // Add the arranged grid items back to parent grid
        gridItems.forEach(function (item) {
            gridContainer === null || gridContainer === void 0 ? void 0 : gridContainer.appendChild(item);
        });
    });
}
