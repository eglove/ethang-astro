export class CoverLetter extends HTMLElement {
  connectedCallback() {
    this.setCurrentDate();
    this.handleSubmit();
  }

  handleSubmit() {
    const button = this.querySelector("button");

    /** @type HTMLDivElement | null */
    const formElement = this.querySelector("#form");
    /** @type HTMLInputElement | null */
    const isContractElement = this.querySelector('input[name="isContract"]');
    /** @type HTMLInputElement | null */
    const positionElement = this.querySelector('input[name="position"]');
    /** @type HTMLInputElement | null */
    const companyNameElement = this.querySelector('input[name="companyName"]');
    /** @type HTMLInputElement | null */
    const customElement = this.querySelector('textarea[name="custom"]');

    button?.addEventListener("click", (event) => {
      this.isContract = isContractElement?.checked;
      this.posiition = positionElement?.value;
      this.companyName = companyNameElement?.value;
      this.custom = customElement?.value;
      this.updateContent();
      formElement?.remove();
    });
  }

  updateContent() {
    this.removeContractOnly();
    this.removeFullTimeItemsForContracts();
    this.yoe();
    this.positionAtCompany();
    this.addCompanyName();
    this.addCustom();
  }

  setCurrentDate() {
    const element = this.querySelector("[data-current-date]");

    if (element) {
      element.removeAttribute("[data-current-date]");
      element.innerHTML = new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }

  yoe() {
    const now = new Date();
    const startDate = new Date("2018-11-01");
    const differenceInMilliseconds = now.getTime() - startDate.getTime();
    const years = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    const yoeElements = this.querySelectorAll("[data-yoe]");

    for (const element of yoeElements) {
      element.replaceWith(String(Math.floor(years)));
    }
  }

  removeContractOnly() {
    if (this.isContract !== true) {
      const removeOnFullTimeElements = document.querySelectorAll(
        "[data-contract-only]",
      );
      for (const element of removeOnFullTimeElements) {
        element.remove();
      }
    }
  }

  removeFullTimeItemsForContracts() {
    if (this.isContract === true) {
      const removeOnFullTimeElements = document.querySelectorAll(
        "[data-remove-on-contract]",
      );
      for (const element of removeOnFullTimeElements) {
        element.remove();
      }
    }
  }

  positionAtCompany() {
    const positionAtCompanyElements = this.querySelectorAll(
      "[data-positionAtCompany]",
    );

    for (const element of positionAtCompanyElements) {
      if (!this.companyName || this.companyName === "") {
        element.replaceWith(this.posiition ?? "");
      } else {
        element.replaceWith(`${this.posiition} at ${this.companyName}`);
      }
    }
  }

  addCompanyName() {
    const companyNameElements = this.querySelectorAll("[data-companyName]");

    for (const element of companyNameElements) {
      const defaultValue = element.getAttribute("data-default") ?? "";
      const isPlural = element.getAttribute("data-plural") === "true";
      const prepend = element.getAttribute("data-prepend-companyName");

      let name = this.companyName ?? defaultValue;

      if (isPlural) {
        name += "'s";
      }

      if (prepend) {
        name = `${prepend}${name}`;
      }

      element.replaceWith(name);
    }
  }

  addCustom() {
    const customElement = document.querySelector("[data-custom]");

    if (this.custom && customElement) {
      customElement.textContent = this.custom;
    } else {
      customElement?.remove();
    }
  }
}

customElements.define("cover-letter", CoverLetter);
