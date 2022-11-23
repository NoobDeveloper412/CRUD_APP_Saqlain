import axios from "axios";

export const listVehicles = async (userData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8800/api/cars/list`,
      config
    );
  } catch (error) {
    console.log(error);
  }
};
export const addVehicle = async (userData, vehicleData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:8800/api/cars/create`,
      vehicleData,
      config
    );
    console.timeLog(data);
  } catch (error) {
    console.log(error);
  }
};
