import {createContext} from "react";
import { UiStore } from "./uiStore.ts";
import { ActivityStore } from "./activityStore.ts";
import CounterStore from "./counterStores.ts";


interface Store {
    counterStore: CounterStore
    uiStore: UiStore
    activityStore: ActivityStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore(),
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);