import "./style.css";

function sortGridItems(
  gridItems: Element[],
  isAscending: number,
  nameToNum: Map<string, number>
) {
  gridItems.sort((a, b) => {
    const cardA = a.querySelector("img")!.alt;
    const cardB = b.querySelector("img")!.alt;
    const numA = nameToNum.get(cardA);
    const numB = nameToNum.get(cardB);
    return (numA! - numB!) * isAscending;
  });
}

function startup() {
  console.log("im in startup");
  const gridContainer = document.querySelector(".card-catalog");
  // Create array of grid items
  const gridItems = Array.from(gridContainer!.children);
  const sortButton = document.getElementById(
    "sort-button"
  ) as HTMLSelectElement;
  let sortOrder: string = sortButton.value;
  const isAscending: number = sortOrder === "ascending" ? 1 : -1;
  console.log(isAscending);
  let nameToNum: Map<string, number> = new Map([
    ["Ainok Bond-Kin", 5],
    ["Wrenn and Six", 553],
    ["Force of Negation", 50],
    ["Mana Drain", 57],
  ]);

  sortGridItems(gridItems, isAscending, nameToNum);

  gridItems.forEach((item) => {
    gridContainer?.appendChild(item);
  });
}

function sortCollectorNum() {
  console.log("in sortCollectorNum()");
  const gridContainer = document.querySelector(".card-catalog");
  // Create array of grid items
  const gridItems = Array.from(gridContainer!.children);
  const sortButton = document.getElementById(
    "sort-button"
  ) as HTMLSelectElement;
  console.log(sortButton.value);

  // Mapping of card name to collector number
  let nameToNum: Map<string, number> = new Map([
    ["Ainok Bond-Kin", 5],
    ["Wrenn and Six", 553],
    ["Force of Negation", 50],
    ["Mana Drain", 57],
  ]);

  // Get each image in grid item
  sortButton!.addEventListener("change", () => {
    let sortOrder: string = sortButton.value;
    const isAscending: number = sortOrder === "ascending" ? 1 : -1;

    sortGridItems(gridItems, isAscending, nameToNum);

    // Add the arranged grid items back to parent grid
    gridItems.forEach((item) => {
      gridContainer?.appendChild(item);
    });
  });
}
