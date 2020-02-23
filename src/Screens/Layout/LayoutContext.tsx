import * as React from "react";
import { IResponseListUser } from "../../modal/response/listUser";
import { getListBorrower } from "../../Api/Service/borrower";
import { NavLink, Link } from "react-router-dom";
import './index.css'
interface ILayoutContext {
  listUser: IResponseListUser[];
}

export const LayoutContext = React.createContext({} as ILayoutContext);

export default function(props: any) {
  const [page, setPage] = React.useState<number>(1);
  const [listUser, setListUser] = React.useState<IResponseListUser[]>([]);

  React.useEffect(() => {
    getListBorrower().then(res => setListUser(res.data));
  }, []);

  return (
    <LayoutContext.Provider value={{ listUser }}>
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
