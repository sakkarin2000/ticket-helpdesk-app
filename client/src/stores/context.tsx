import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export interface PageComponent {
  components: "homepage" | "viewticket";
}

class CoreContext {
  page: PageComponent["components"] = "homepage";
  modal: string = "";

  constructor() {
    makeAutoObservable(this);
  }
  setPage = (newPage: PageComponent["components"]) => {
    this.page = newPage;
  };
  setModal = (newModal: string) => {
    this.modal = newModal;
  };
}

export const coreContext = createContext(new CoreContext());
