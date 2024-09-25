import { isLgScreen } from "@/utils";
import type { StateCreator } from "zustand";
import {
  type BOTTOM_PANEL_NAMES,
  type UISlice,
  validBottomPanelNames,
} from "./types";

export const uiSlice: StateCreator<
  UISlice,
  [["zustand/immer", never], ["zustand/devtools", never]]
> = (set) => {
  return {
    sidePanel: isLgScreen() ? "open" : "closed",
    bottomPanels: validBottomPanelNames,
    bottomPanelIndex: undefined,
    togglePanel: (panelName: "sidePanel" | BOTTOM_PANEL_NAMES) =>
      set((state) => {
        if (!isBottomPanelName(panelName)) {
          state[panelName] = state[panelName] === "open" ? "closed" : "open";
          console.log("state[panelName]", state[panelName]);
          return;
        }

        const index = state.bottomPanels.indexOf(panelName);
        if (index !== -1) {
          if (state.bottomPanelIndex === index) {
            state.bottomPanelIndex = undefined;
          } else {
            state.bottomPanelIndex = index;
          }
        }
      }),
    setBottomPanelIndex(index: number | undefined) {
      set((state) => {
        if (state.bottomPanels.length === 0) {
          state.bottomPanelIndex = undefined;
          return;
        }
        if (index === undefined) {
          state.bottomPanelIndex = undefined;
          return;
        }

        state.bottomPanelIndex =
          index < state.bottomPanels.length ? index : undefined;
      });
    },
  };
};

function isBottomPanelName(element: unknown): element is BOTTOM_PANEL_NAMES {
  return (
    typeof element === "string" &&
    validBottomPanelNames.includes(element as BOTTOM_PANEL_NAMES)
  );
}
