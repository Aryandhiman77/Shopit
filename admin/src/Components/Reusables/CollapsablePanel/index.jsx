import { Collapse } from "react-collapse";
import "./style.css"
const CollapsablePanel = ({children, isOpened,className }) => {
  return (
    <div className={className}>
      <Collapse isOpened={isOpened}>
        {children}
      </Collapse>
    </div>
  );
};

export default CollapsablePanel;
