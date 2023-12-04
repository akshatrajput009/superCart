import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // Install redux-mock-store if not installed

import { Cart } from "../Cart";

// Mock the redux store
const mockStore = configureStore([]);

describe("Cart Component", () => {
  let store;

  beforeEach(() => {
    // Mock the store state
    const initialState = {
      cart: {
        open: true,
        items: [
          {
            id: 1,
            title: "Product 1",
            price: 10,
            quantity: 2,
            images: ["image1.jpg"],
          },
          // Add more mock items as needed
        ],
        subTotal: 20,
      },
      auth: {
        user: {
          id: 123,
          // Add other user details as needed
        },
      },
    };

    store = mockStore(initialState);
  });

  test("renders cart component correctly", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Check if the cart component renders correctly
    expect(screen.getByText("Shopping cart")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$20")).toBeInTheDocument();
    // Add more assertions based on your component's UI
  });

  test("handles quantity change correctly", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Example: simulate changing the quantity
    const quantityInput = screen.getByLabelText("Qty");
    fireEvent.change(quantityInput, { target: { value: "5" } });

    // Check if the state or UI updates accordingly
    // You may need to adjust this based on your actual implementation
    expect(quantityInput.value).toBe("5");
    // Add more assertions as needed
  });

  // Add more test cases as needed, for example, testing the remove button click, checkout button, etc.
});
