import * as React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { Navbar, Nav, NavItem } from "reactstrap";
interface ILayoutContext {}

export const LayoutContext = React.createContext({} as ILayoutContext);

export default function(props: any) {
  // const [listUser, setListUser] = React.useState<IResponseListUser[]>([]);

  // React.useEffect(() => {
  //   getListBorrower().then(res => setListUser(res.data));
  // }, []);

  return (
    <LayoutContext.Provider value={{}}>
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
        <Nav className="" navbar>
          {page.map(i => {
            return (
              <NavItem key={i.id}>
                <NavLink exact to={i.link} className="nav-link" activeClassName="active">
                  {i.name}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
    </div>
  );
};

const page = [
  { id: 1, name: "Sổ ngày", link: "/" },
  { id: 2, name: "danh sách người mượn", link: "/list-user" }
];
