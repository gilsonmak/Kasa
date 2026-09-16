import React from "react";
import { render, screen } from "@testing-library/react";
import Stars from "../index";

describe("Stars", () => {
  it("annonce la note une seule fois, de façon compréhensible", () => {
    render(<Stars rating={3} />);
    // Auparavant : cinq images portant toutes alt="rating".
    expect(screen.getByRole("img", { name: "Note : 3 sur 5" })).toBeInTheDocument();
  });

  it("affiche toujours cinq étoiles", () => {
    const { container } = render(<Stars rating={2} />);
    expect(container.querySelectorAll("img.rating-star")).toHaveLength(5);
  });

  it("accepte une note fournie sous forme de chaîne", () => {
    render(<Stars rating="4" />);
    expect(screen.getByRole("img", { name: "Note : 4 sur 5" })).toBeInTheDocument();
  });

  it.each([
    [0, "Note : 0 sur 5"],
    [5, "Note : 5 sur 5"],
    [9, "Note : 5 sur 5"],
    [-2, "Note : 0 sur 5"],
  ])("borne une note hors plage (%s)", (valeur, attendu) => {
    render(<Stars rating={valeur} />);
    expect(screen.getByRole("img", { name: attendu })).toBeInTheDocument();
  });
});
