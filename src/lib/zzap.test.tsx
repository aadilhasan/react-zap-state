import { describe, expect, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { ZPropsType, zzap } from "./zzap";

const componentState = {
  count: 0,
  name: "test",
};
const mockCallback = vi.fn();
type ComponentProps = ZPropsType<typeof componentState> & {
  initialCount?: number;
};
const Component = ({ state, initialCount = 0 }: ComponentProps) => {
  const updateCount = () => {
    state.set({ count: state.count + 1 }, mockCallback);
  };
  return (
    <div>
      <div data-testid="count"> count:{state.count}</div>
      <div data-testid="initialCount"> initialCount:{initialCount}</div>
      <button onClick={updateCount}> increment count </button>
    </div>
  );
};

const renderApp = (state: typeof componentState = componentState) => {
  const App = zzap<ComponentProps>(Component, state);
  render(<App />);
};

describe("Zzap State", () => {
  beforeEach(() => {
    mockCallback.mockClear();
  });

  it("passes the state to the component", async () => {
    renderApp();
    expect(
      await screen.findByText(`count:${componentState.count}`)
    ).toBeInTheDocument();
    expect(await screen.findByText("initialCount:0")).toBeInTheDocument();
  });

  it("updates the state on call of state.set", async () => {
    renderApp({ ...componentState, count: 5 });
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText("count:6")).toBeInTheDocument();
  });

  it("calls the state.set callback after the state is updated", async () => {
    renderApp({ ...componentState, count: 2 });
    userEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(mockCallback).toBeCalledWith({ count: 3, name: "test" })
    );
  });

  it("can derive initial state from props", async () => {
    const initialCount = 7;
    const App = zzap<ComponentProps>(Component, ({ initialCount }) => ({
      ...componentState,
      count: (initialCount || 0) + 10,
    }));
    render(<App initialCount={initialCount} />);

    expect(
      await screen.findByText("count:" + (initialCount + 10))
    ).toBeInTheDocument();

    expect(
      await screen.findByText("initialCount:" + initialCount)
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(mockCallback).toBeCalledWith({
        count: initialCount + 10 + 1,
        name: "test",
      })
    );
  });
});
