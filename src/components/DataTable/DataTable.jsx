import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const columns = [
  { header: "VIN", accessorKey: "VIN (1-10)" },
  { header: "County", accessorKey: "County" },
  { header: "City", accessorKey: "City" },
  { header: "State", accessorKey: "State" },
  { header: "Postal Code", accessorKey: "Postal Code" },
  { header: "Model Year", accessorKey: "Model Year" },
  { header: "Make", accessorKey: "Make" },
  { header: "Model", accessorKey: "Model" },
  { header: "EV Type", accessorKey: "Electric Vehicle Type" },
  {
    header: "CAFV Eligibility",
    accessorKey: "Clean Alternative Fuel Vehicle (CAFV) Eligibility",
  },
  { header: "Electric Range", accessorKey: "Electric Range" },
  { header: "Base MSRP", accessorKey: "Base MSRP" },
  { header: "Legislative District", accessorKey: "Legislative District" },
  { header: "DOL Vehicle ID", accessorKey: "DOL Vehicle ID" },
  { header: "Vehicle Location", accessorKey: "Vehicle Location" },
  { header: "Electric Utility", accessorKey: "Electric Utility" },
  { header: "2020 Census Tract", accessorKey: "2020 Census Tract" },
];

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#e0f7fa",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "#e0f7fa",
        },
      },
    },
  },
});

const DataTable = ({ data }) => {
  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
    doc.save("Electric_Vehicle_Population.pdf");
  };

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableBodyCellProps: {
      sx: { backgroundColor: "#E0FFFF" },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#BBFFFF",
      },
    },
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return (
    <ThemeProvider theme={customTheme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
};

export default DataTable;
