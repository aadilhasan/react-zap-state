import { ZPropsType } from "./zzap";

export type CallbackType<S> = (state: S) => void;

export type SetStateParamsType<S> = Partial<S> | ((state: S) => Partial<S>);

export type SetStateType<S> = (
  newState: SetStateParamsType<S>,
  callback?: CallbackType<S>
) => void;

export type PropsType<P extends ZPropsType<any>> = Omit<P, "state">;

export type InitialStateType<P extends ZPropsType<any>> =
  | Omit<P["state"], "set">
  | ((props: PropsType<P>) => Omit<P["state"], "set">);
