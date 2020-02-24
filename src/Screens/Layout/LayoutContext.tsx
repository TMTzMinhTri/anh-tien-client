import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import './index.css'
interface ILayoutContext {

}

export const LayoutContext = React.createContext({} as ILayoutContext);

export default function(props: any) {
  // const [listUser, setListUser] = React.useState<IResponseListUser[]>([]);

  // React.useEffect(() => {
  //   getListBorrower().then(res => setListUser(res.data));
  // }, []);

  return (
    <LayoutContext.Provider value={{ }}>
      <div className="home-screen">
        {renderSideBar()}
        <div className="side-contain">{props.children}</div>
      </div>
    </LayoutContext.Provider>
  );
}

const renderSideBar = () => {
  return (
    <div className="side-bar">
      <ul>
        <li>
          <NavLink to="/"> Sổ ngày</NavLink>
        </li>
        <li>
          <Link to="/list-user"> danh sách người mượn</Link>
        </li>
      </ul>
    </div>
  );
};
