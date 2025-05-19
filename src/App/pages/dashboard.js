import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/dataSlice";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";

ModuleRegistry.registerModules([AllCommunityModule]);

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const onExport = () => {
    if (!filteredData.length) return;
    const csvRows = [];
    // Add header
    csvRows.push(columns.map((col) => col.headerName).join(","));
    // Add rows
    filteredData.forEach((row) => {
      csvRows.push(
        columns
          .map((col) => {
            const val = row[col.field];
            return typeof val === "string"
              ? `"${val.replace(/"/g, '""')}"`
              : val;
          })
          .join(",")
      );
    });
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "filtered_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const columns = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "PS ID", field: "ps_id", sortable: true, filter: true },
    { headerName: "Name", field: "ps_name", sortable: true, filter: true },
    { headerName: "Grade", field: "grade", sortable: true, filter: true },
    // { headerName: 'Action Dates', field: 'action_dates', sortable: true, filter: true },
    {
      headerName: "Actioned By",
      field: "actioned_by",
      sortable: true,
      filter: true,
    },
    { headerName: "Updates", field: "updates", sortable: true, filter: true },
    //   { headerName: 'Creation Date', field: 'creation_date', sortable: true, filter: true },
  ];

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data by PS ID
  const filteredData = data.filter(
    (row) =>
      row.ps_id.toString().includes(searchQuery) ||
      row.ps_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-screen min-h-screen bg-gray-100 p-0">
      <div className="w-full bg-white rounded-lg shadow-lg p-8">
        <div className="w-full p-0 mb-4 flex items-center justify-between gap-4">
          <InputBox
            placeholder={"Search by PS ID and Name"}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <CustomButton
            icon={"fa-solid fa-cloud-arrow-down"}
            onClick={onExport}
          >
            Export
          </CustomButton>
        </div>

        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
          <AgGridReact rowData={filteredData} columnDefs={columns} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
