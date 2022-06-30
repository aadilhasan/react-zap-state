import "./App.css";
import { zzap, ZPropsType } from "./lib/zzap";

const state = {
  count: 0,
};
type Props = ZPropsType<typeof state>;

function App({ state }: Props) {
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

export default zzap(App, state);
