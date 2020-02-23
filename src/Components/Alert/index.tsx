import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import "./index.css";

interface IContext {
  showToast: Function;
}

const ToastContext = React.createContext({} as IContext);

export const ToastProvider: React.FC<{}> = ({ children }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const [infomation, setinfomation] = React.useState({
    status: "",
    title: "",
    body: ""
  });

  const showToast = (
    visible = true,
    status = "success",
    body = "Lưu thành công",
    title = "Thông Báo"
  ) => {
    setShow(visible);
    setinfomation({ body, status, title });
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      showToast(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [show]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {show && (
        <div className={`toast-container`}>
          <Toast
            isOpen={show}
            transition={{
              baseClass: "zoomIn animated",
              transitionappeartimeout: 1000
            }}
            className="bg-primary text-white"
          >
            <ToastHeader>{infomation.title}</ToastHeader>
            <ToastBody>{infomation.body}</ToastBody>
          </Toast>
        </div>
      )}
      {children}
    </ToastContext.Provider>
  );
};

export const useToasts = () => React.useContext(ToastContext);
