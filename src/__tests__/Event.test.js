import { render } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";

describe('<Event /> component', () => {
    let EventComponent;
    let allEvents;
    beforeEach(async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event event={allEvents[0]} />)
    });

    test('renders event title', () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument;
    });

    test('renders event start time', () => {
        expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument;
    });

    test('renders event by location', () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument;
    });

    test('renders events detail button with the title (show details)', () => {
        expect(EventComponent.queryByText('show details')).toBeInTheDocument;
    });

    test('event details are hidden by default', () => {
        const eventDetails = EventComponent.container.querySelector('.details');
        expect(eventDetails).not.toBeInTheDocument;
    });

    test('renders event details when user clicks on show details button', async () => {
        const user = userEvent.setup();
        const button = EventComponent.queryByText('Show Details');
        await user.click(button);
        const details = EventComponent.container.querySelector('.details');
        expect(details).toBeInTheDocument;
    });

    test('hides event details when user clicks on hide details button', async () => {
        const user = userEvent.setup();
        let button = EventComponent.queryByText('Show Details');
        await user.click(button);
        let details = EventComponent.container.querySelector('.details');
        expect(details).toBeInTheDocument;

        button = EventComponent.queryByText('Hide Details');
        await user.click(button);
        details = EventComponent.container.querySelector('.details');
        expect(details).not.toBeInTheDocument;
    });
})