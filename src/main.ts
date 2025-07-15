import "./style.css";
// Declare XLSX as global variable
declare const XLSX: any;

interface Cards {
  "Card ID": string;
  "Collector Number": number;
  Description: string;
  Image: string;
  Name: string;
  Set: string;
}

async function parseExcel(): Promise<Array<Cards>> {
  try {
    const response = await fetch("cards.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    // Read the Excel workbook
    const workbook = XLSX.read(data, { type: "array" });

    // Get the first sheet name
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON
    const jsonData: Array<Cards> = XLSX.utils.sheet_to_json(worksheet);
    // console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching or reading Excel file:", error);
    throw error;
  }
}

function startup(): void {
  parseExcel()
    .then((data) => {
      data.sort((a, b) => {
        // return a.Name.localeCompare(b.Name);
        return a["Collector Number"] - b["Collector Number"] * 1;
      });

      const gridContainer = document.querySelector(".card-catalog");

      if (!(gridContainer instanceof HTMLElement)) {
        console.error(
          'DOM element - "card-catalog" not found or have incorrect type'
        );
      }

      data.forEach((item) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("card-container");
        gridItem.innerHTML = `
        <img class="card"
                    src=${item.Image}
                    alt=${item.Name}>
                <p class="set-collector"> ${item.Set} | ${(
          "00" + item["Collector Number"]
        ).slice(-3)}<br><span class="card-name">${item.Name}</span></p>
                <p class="card-description">${item.Description}
                </p>
        `;

        if (gridContainer) {
          gridContainer.appendChild(gridItem);
        }
      });
    })
    .catch((error) => {
      console.error("Failed to process Excel file:", error);
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

  sortButton.addEventListener("click", () => {
    const sortOrder = sortButton.value;
    const isAscending = sortOrder === "ascending" ? 1 : -1;

    const gridItems = Array.from(gridContainer.children) as HTMLElement[];

    gridItems.sort((a, b) => {
      const aText = a.querySelector(".set-collector")?.textContent || "";
      const bText = b.querySelector(".set-collector")?.textContent || "";

      // Split by "|", get num, remove whitespace, defaults to 0, conver to int
      const aNum = parseInt(aText.split("|")[1]?.trim() || "0", 10);
      const bNum = parseInt(bText.split("|")[1]?.trim() || "0", 10);

      return (aNum - bNum) * isAscending;
    });

    // Re-append sorted items
    gridItems.forEach((item) => {
      gridContainer.appendChild(item); // Moves element, doesn't duplicate
    });
  });
}
