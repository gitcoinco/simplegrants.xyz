"use client";
import { useLocalStorage } from "react-use";

type Cart = Record<string, number>;

export function useCart() {
  const [state = {}, store] = useLocalStorage<Cart>("cart", {});

  return {
    state,
    set: (id: string, amount = 0) => store({ ...state, [id]: amount }),
    remove: (id: string) => {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const { [id]: exists, ...rest } = state ?? {};
      store(rest);
    },
    reset: () => store({}),
    inCart: (id: string) => Number.isSafeInteger(state[id]),
  };
}
