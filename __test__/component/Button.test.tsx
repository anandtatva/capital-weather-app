import { render, waitFor, cleanup, fireEvent, act } from "@testing-library/react-native";
import Button, { ButtonProps } from "../../components/Button";

describe("Screen: Capital Weather", () => {

    it("renders correctly", () => {
        const props: ButtonProps = {
            onButtonPress: jest.fn(),
            name: "submit"
        }
        const tree = render(<Button {...props} />).toJSON()
        expect(tree).toMatchSnapshot();
    })

    it("Button should be call", () => {
        const props: ButtonProps = {
            onButtonPress: jest.fn(),
            testId: "Submit-Button",
            name: "submit"
        }
        const { getByTestId } = render(
            <Button {...props} />
        );
        const submitButton = getByTestId("Submit-Button")
        fireEvent.press(submitButton);
        expect(props.onButtonPress).toHaveBeenCalled();
    })
})