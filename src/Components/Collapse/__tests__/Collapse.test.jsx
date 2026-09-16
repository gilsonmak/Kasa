import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Collapse from "../Collapse";

describe("Collapse", () => {
  it("est fermé au départ et annonce son état", () => {
    render(<Collapse collapseTitle="Description" collapseDescription="Un texte." />);
    const bouton = screen.getByRole("button", { name: /description/i });
    expect(bouton).toHaveAttribute("aria-expanded", "false");
  });

  it("s'ouvre et se referme au clic", async () => {
    const user = userEvent.setup();
    render(<Collapse collapseTitle="Équipements" collapseDescription="Wifi" />);
    const bouton = screen.getByRole("button", { name: /équipements/i });

    await user.click(bouton);
    expect(bouton).toHaveAttribute("aria-expanded", "true");

    await user.click(bouton);
    expect(bouton).toHaveAttribute("aria-expanded", "false");
  });

  it("s'ouvre à la touche Entrée, comme tout bouton", async () => {
    const user = userEvent.setup();
    render(<Collapse collapseTitle="Description" collapseDescription="Un texte." />);
    await user.tab();
    await user.keyboard("{Enter}");
    // Un <div onClick> ne réagissait ni à Entrée ni à Espace.
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("relie le bouton au panneau qu'il contrôle", () => {
    render(<Collapse collapseTitle="Description" collapseDescription="Un texte." />);
    const bouton = screen.getByRole("button");
    const cible = document.getElementById(bouton.getAttribute("aria-controls"));
    expect(cible).not.toBeNull();
    expect(cible).toHaveTextContent("Un texte.");
  });
});
