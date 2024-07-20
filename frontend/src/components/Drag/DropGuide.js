import React, { useContext } from "react";

// context
import { DragContext } from "./Drag";

// indicates where the drop will go when dragging over a dropzone
function DropGuide({ as, dropId, ...props }) {
  const { drop } = useContext(DragContext);
  let Component = as || "div";
  return drop === dropId ? <Component {...props} /> : null;
}

export default DropGuide;
