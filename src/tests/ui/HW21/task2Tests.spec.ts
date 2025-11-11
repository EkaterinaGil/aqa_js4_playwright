import test, { expect } from "@playwright/test";
import testData, { TableRow } from "./testDataForTask2.spec";


const url = "https://anatoly-karpovich.github.io/test-automation-sandbox";

async function getTableRow(page: any, email: string): Promise<TableRow | undefined> {
    await page.goto(url);
    await page.locator('[href="/test-automation-sandbox/sortable-table"]').click();

    const table = page.locator(".MuiTable-root");
    const rows = await table.locator("tbody tr").all();
    const columnHeaders = await table.locator("thead span").allInnerTexts();

    for (const row of rows) {
        const rowData: TableRow = {};
        const cells = await row.locator("td").all();
        for (let i = 0; i < cells.length - 1; i++) {
            const headerValue = columnHeaders[i];
            const cellValue = await cells[i]!.innerText();
            if (headerValue) { rowData[headerValue] = cellValue }
        }
        if (rowData.Email === email) {
            return rowData;
        }
    }
    return undefined;
};

test.describe("GetTableRow tests", () => {
    for (const obj of testData) {
        test(`${obj.Email}`, async ({ page }) => {
            const getRow = await getTableRow(page, obj.Email!);
            expect(getRow).toStrictEqual(obj);
        });
    };
});