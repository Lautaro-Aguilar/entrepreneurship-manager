import { Outlet } from "react-router-dom";
import Drawer from "../components/Drawer";
import { CssBaseline} from "@mui/material";
const Root = () => {
  return (
    <>
      <CssBaseline />
      <div className='root'>
      <Drawer />
        <main className='content'>
            <Outlet />
        </main>
      </div>
    </>
  );
};

export default Root;
