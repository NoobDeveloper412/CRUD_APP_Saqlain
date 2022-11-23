import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import Grid from "@material-ui/core/Grid";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { addVehicle, listVehicles } from "../../methods/vehicle/vehicle";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function DataTable() {
  var columns = [
    { title: "id", field: "id", hidden: true },
    // {
    //   title: "Avatar",
    //   render: (rowData) => (
    //     <Avatar
    //       maxInitials={1}
    //       size={40}
    //       round={true}
    //       name={rowData === undefined ? " " : rowData.username}
    //     />
    //   ),
    // },
    { title: "Company", field: "company" },
    { title: "Model", field: "model" },
    { title: "Color", field: "color" },
    { title: "Make", field: "make" },
    { title: "Registration No.", field: "registrationNo" },
    { title: "Category", field: "category" },
  ];
  const [data, setData] = useState([]); //Table data

  const userData = window.localStorage.getItem("userData");
  useEffect(() => {
    if (userData) {
      const vehicles = listVehicles(JSON.parse(userData));
      console.log(vehicles);
      // setData(vehicles);
    }
  }, [userData]);

  // For error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(userData).token}`,
    },
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    // Validation
    let errorList = [];
    if (newData.company === "") {
      errorList.push("This field can not be empty!");
    }
    if (newData.category === "") {
      errorList.push("This field can not be empty!");
    }
    if (newData.make === "") {
      errorList.push("This field can not be empty!");
    }
    if (newData.model === "") {
      errorList.push("This field can not be empty!");
    }
    if (newData.registrationNo === "") {
      errorList.push("This field can not be empty!");
    }
    if (newData.color === "") {
      errorList.push("This field can not be empty!");
    }

    if (errorList.length < 1) {
      axios
        .patch(
          "http://localhost:8800/api/cars/update/" + newData.id,
          config,
          newData
        )
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
          console.log(res);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
          console.log(error);
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.company === "") {
      errorList.push("This field can not be empty!");
    }
    if (newData.category === "") {
      errorList.push("This field can not be empty!");
    }
    if (newData.make === "") {
      errorList.push("This field can not be empty!");
    }
    if (newData.model === "") {
      errorList.push("This field can not be empty!");
    }
    if (newData.registrationNo === "") {
      errorList.push("This field can not be empty!");
    }
    if (newData.color === "") {
      errorList.push("This field can not be empty!");
    }

    if (errorList.length < 1) {
      // no error
      addVehicle(JSON.parse(userData), newData)
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
          console.log(res);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    axios
      .delete("http://localhost:8800/api/cars/delete/" + oldData.id, config)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
        console.log(res);
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>
          <MaterialTable
            title="User data from remote source"
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                }),
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}

export default DataTable;
