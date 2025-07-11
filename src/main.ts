import "./style.css";

function sortGridItems(
  gridItems: Element[],
  isAscending: number,
  nameToNum: Map<string, number>
) {
  gridItems.sort((a, b) => {
    const imgA = a.querySelector("img");
    const imgB = b.querySelector("img");

    if (!imgA || !imgB) return 0;

    const cardA = imgA.alt;
    const cardB = imgB.alt;

    const numA = nameToNum.get(cardA);
    const numB = nameToNum.get(cardB);

    if (numA === undefined || numB === undefined) return 0;

    return (numA - numB) * isAscending;
  });
}

function startup(): void {
  const gridContainer = document.querySelector(".card-catalog");
  const sortButton = document.getElementById(
    "sort-button"
  ) as HTMLSelectElement;

  if (
    !(gridContainer instanceof HTMLElement) ||
    !(sortButton instanceof HTMLSelectElement)
  ) {
    console.error("Required DOM elements not found or have incorrect types.");
    return;
  }
  // Create array of grid items
  const gridItems = Array.from(gridContainer.children);

  let sortOrder: string = sortButton.value;
  const isAscending: number = sortOrder === "ascending" ? 1 : -1;

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

function sortCollectorNum(): void {
  const gridContainer = document.querySelector(".card-catalog");

  const sortButton = document.getElementById(
    "sort-button"
  ) as HTMLSelectElement;

  if (
    !(gridContainer instanceof HTMLElement) ||
    !(sortButton instanceof HTMLSelectElement)
  ) {
    console.error("Required DOM elements not found or have incorrect types.");
    return;
  }

  // Create array of grid items
  const gridItems = Array.from(gridContainer.children);

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
