import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Carrousel from "../index";

const troisImages = ["/a.jpg", "/b.jpg", "/c.jpg"];

describe("Carrousel", () => {
  it("affiche la première image et le compteur", () => {
    render(<Carrousel pictures={troisImages} />);
    expect(screen.getByRole("img", { name: /vue 1 sur 3/i })).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("avance à l'image suivante au clic", async () => {
    const user = userEvent.setup();
    render(<Carrousel pictures={troisImages} />);
    await user.click(screen.getByRole("button", { name: /image suivante/i }));
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("boucle de la dernière image vers la première", async () => {
    const user = userEvent.setup();
    render(<Carrousel pictures={troisImages} />);
    const suivant = screen.getByRole("button", { name: /image suivante/i });
    await user.click(suivant);
    await user.click(suivant);
    await user.click(suivant); // dernière -> première
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("boucle de la première image vers la dernière", async () => {
    const user = userEvent.setup();
    render(<Carrousel pictures={troisImages} />);
    await user.click(screen.getByRole("button", { name: /image précédente/i }));
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("se pilote au clavier avec les flèches", async () => {
    const user = userEvent.setup();
    render(<Carrousel pictures={troisImages} />);
    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("les flèches sont de vrais boutons, atteignables au clavier", async () => {
    const user = userEvent.setup();
    render(<Carrousel pictures={troisImages} />);
    await user.tab();
    // Un <img onClick> n'aurait jamais reçu le focus : c'est le défaut que
    // ce test verrouille.
    expect(screen.getByRole("button", { name: /image précédente/i })).toHaveFocus();
  });

  // Cas limites explicitement cités comme non couverts dans la revue.
  it("masque la navigation et le compteur avec une seule image", () => {
    render(<Carrousel pictures={["/seule.jpg"]} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByText("1 / 1")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: /vue 1 sur 1/i })).toBeInTheDocument();
  });

  it("ne rend rien si la liste d'images est vide", () => {
    const { container } = render(<Carrousel pictures={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("ne laisse aucun écouteur clavier après démontage", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Carrousel pictures={troisImages} />);
    unmount();
    // Ne doit lever aucune erreur : si l'écouteur survivait au démontage,
    // il appellerait setState sur un composant disparu.
    await user.keyboard("{ArrowRight}");
  });
});
