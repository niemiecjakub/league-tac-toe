import React from "react";
import FieldMark from "./FieldMark";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { mockStore } from "../redux/mockStore";
import "@testing-library/jest-dom/extend-expect";

describe("YourComponent", () => {
  it("renders correctly with Redux state", () => {
    const initialState = {
      yourReducer: {
        fields: {
          1: {
            name: "Ahri",
            key: "ahri",
            player: "player1",
            history: ["sejuani, Ahri"],
          },
          2: {
            name: "Lulu",
            key: "lulu",
            player: "player2",
            history: ["Lulu"],
          },
        },
      },
    };

    const store = mockStore(initialState);
    const championName = "Example Champion";

    const { getByTestId } = render(
      <Provider store={store}>
        <FieldMark championName={championName} mark="X" />
        <FieldMark championName={championName} mark="O" />
      </Provider>
    );

    // Your assertions here, e.g., check if the component renders correctly
    expect(getByTestId("o-icon")).toBeInTheDocument();
    expect(getByTestId("x-icon")).toBeInTheDocument();
  });
});
