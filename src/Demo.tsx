import "./App.css";
import { zap, ZapProps } from "./lib/zap";

const state = {
  count: 0,
};
type Props = ZapProps<typeof state>;

function DemoAppp({ state }: Props) {
  return (
    <div className="App">
      {state.count}
      <br />
      <button
        onClick={() =>
          state.set(
            ({ count }) => {
              return {
                count: count + 1,
              };
            },
            ({ count }) => {
              console.log(" updated ", count);
            }
          )
        }
      >
        {" "}
        Increement count
      </button>
    </div>
  );
}

export default zap(DemoAppp, state);
