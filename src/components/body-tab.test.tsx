import { render, screen, fireEvent } from '@testing-library/react'
import { BodyTab } from './body-tab'
import { Theme } from "@radix-ui/themes";

jest.mock('@uiw/react-markdown-preview', () => ({
    default: () => <div data-testid="markdown-preview" />,
}))

jest.mock('./collapsible-node-renderer', () => ({
    CollapsibleNodeRenderer: () => <div data-testid="collapsible-renderer" />
}))

beforeEach(() => {
    render(<Theme><BodyTab body={'<div>ugabuga</div>'} /></Theme>)
});

afterEach(() => {
    jest.clearAllMocks()
});

describe('BodyTab', () => {
    it('should render raw content when selected', () => {
        fireEvent.click(screen.getByRole('combobox'))
        fireEvent.click(screen.getByText('Raw'))
        expect(screen.getByText('<div>ugabuga</div>')).toBeVisible()
    })

    it('should render HTML content when selected', () => {
        fireEvent.click(screen.getByRole('combobox'))
        fireEvent.click(screen.getByText('HTML'))
        expect(screen.getByTestId('collapsible-renderer')).toBeVisible()
    });

    it('should render markdown preview when enabled', () => {
        fireEvent.click(screen.getByLabelText('Preview'))
        expect(screen.getByTestId('markdown-preview')).toBeVisible()
    })
})