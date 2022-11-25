import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import axios from "../../../../api/axios";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MyAccount() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [users, setUsers] = React.useState([
    { _id: "", username: "", roles: [] },
  ]);

  React.useEffect(() => {
    load();
  }, []);

  const userId = useSelector((state) => state.auth.userId);

  const load = async () => {
    const result = await axios.get(`/user/one/${userId}`);
    // console.log(result.data);
    setUsers(result.data);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          default
          aria-label="basic tabs example"
        >
          <Tab label="Account Info" {...a11yProps(0)} />
          {/* <Tab label="Orders" {...a11yProps(1)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Account Info
        <Stack>
          <Stack>
            <Typography>ID: {users._id}</Typography>
            <Typography>Username: {users.username}</Typography>
            <Typography>Username: {users.roles && users.roles[0]}</Typography>
          </Stack>
        </Stack>
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        Orders
      </TabPanel> */}
    </Box>
  );
}
