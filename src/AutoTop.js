import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

//解决路由跳转滚动条的问题
const AutoScorllTop = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

export default AutoScorllTop;
