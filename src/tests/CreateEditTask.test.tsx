import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CreateEditTask from "../components/CreateEditTask";

const mockStore = configureStore([]);

describe("CreateEditTask Component", () => {
    let store : any;
    let onCloseMock : any;

    beforeEach(() => {
        store = mockStore({
            app: { task: null },
        });
        store.dispatch = jest.fn();
        onCloseMock = jest.fn();
    });

    test("renders the create task form", () => {
        render(
            <Provider store={store}>
                <CreateEditTask isOpen={true} onClose={onCloseMock} />
            </Provider>
        );

        expect(screen.getByText("Create task")).toBeInTheDocument();
        expect(screen.getByLabelText("Task Name")).toBeInTheDocument();
    });

    test("validates required fields", async () => {
        render(
            <Provider store={store}>
                <CreateEditTask isOpen={true} onClose={onCloseMock} />
            </Provider>
        );

        fireEvent.click(screen.getByText(/Create/i)); // Simulate form submit

        expect(await screen.findByText("Task Name is required")).toBeInTheDocument();
    });
});
