import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  SetStateType,
  InitialStateType,
  CallbackType,
  SetStateParamsType,
  PropsType,
} from "./types";

export type ZPropsType<State extends Record<string, any>> = {
  state: State & { set: SetStateType<State> };
};

export function zzap<T extends ZPropsType<any>>(
  Component: React.FC<any>,
  initialState: InitialStateType<T>
): React.FC<Omit<T, "state">> {
  type State = typeof initialState;
  const ZzapComponent = memo((props: PropsType<T>) => {
    const callbackRefs = useRef<CallbackType<State>[]>([]);
    const [state, setState] = useState<any>(
      typeof initialState === "function"
        ? () => initialState(props)
        : initialState
    );

    const onStateUpdate = useCallback(
      (newState: SetStateParamsType<State>, cb?: CallbackType<State>) => {
        setState((recentState: State) => {
          let partialState = {};
          if (typeof newState === "function") {
            partialState = newState(recentState);
          } else {
            partialState = newState;
          }
          return { ...recentState, ...partialState };
        });
        if (cb) {
          callbackRefs.current.push(cb);
        }
      },
      []
    );

    useEffect(() => {
      callbackRefs.current.forEach((cb) => cb(state));
      callbackRefs.current = [];
    }, [state]);

    return <Component {...props} state={{ ...state, set: onStateUpdate }} />;
  });

  // @ts-ignore
  return ZzapComponent as React.FC<Omit<T, "state">>;
}
