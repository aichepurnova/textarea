import { CSSProperties, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bold, italic, undo, redo, change } from "../store/reducer";
import { RootState } from "../store/store";

function Textarea() {
  const dispatch = useDispatch();
  const bStyle = useSelector((state: RootState) => state.text.present.bold);
  const iStyle = useSelector((state: RootState) => state.text.present.italic);
  const text = useSelector((state: RootState) => state.text.present.text);
  const pastLen = useSelector((state: RootState) => state.text.past.length);
  const futureLen = useSelector((state: RootState) => state.text.future.length);

  const styles: CSSProperties = {
    fontWeight: bStyle ? "bold" : "normal",
    fontStyle: iStyle ? "italic" : "normal",
  };

  return (
    <div>
      <textarea
        value={text}
        style={styles}
        onChange={(event) => dispatch(change(event.currentTarget.value))}
      ></textarea>
      <span></span>
      <div>
        <button disabled={pastLen == 0} onClick={() => dispatch(undo())}>
          Undo
        </button>
        <button disabled={futureLen == 0} onClick={() => dispatch(redo())}>
          Redo
        </button>
        <button
          style={{ fontWeight: bStyle ? "bold" : "normal" }}
          onClick={() => dispatch(bold())}
        >
          Bold
        </button>
        <button
          style={{ fontStyle: iStyle ? "italic" : "normal" }}
          onClick={() => dispatch(italic())}
        >
          Italic
        </button>
      </div>
    </div>
  );
}
export default Textarea;
