import Papa from "papaparse";

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Convert Electric Range and Base MSRP to numbers
        const data = results.data.map((item) => ({
          ...item,
          "Electric Range": parseFloat(item["Electric Range"]) || 0,
          "Base MSRP": parseFloat(item["Base MSRP"]) || 0,
        }));
        resolve(data);
      },
      error: (error) => reject(error),
    });
  });
};
