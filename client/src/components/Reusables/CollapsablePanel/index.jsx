import { Collapse } from "react-collapse";
import "./style.css"
const CollapsablePanel = ({children, isOpened }) => {
  return (
    <div>
      <Collapse isOpened={isOpened}>
        {children}
      </Collapse>
    </div>
  );
};

export default CollapsablePanel;
