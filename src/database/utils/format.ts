// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function formatResultData(data: { columns: any; rows: any; }) {
    const { columns, rows } = data;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return rows.map((row: { [x: string]: any; }) => {
        const formattedData = {};
        columns.forEach((col: string | number, index: string | number) => {
            // @ts-expect-error - this is a hack to get around the fact that the types are wrong
            formattedData[col] = row[index];
        });
        return formattedData;
    });
}
