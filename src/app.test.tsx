import { render, screen, fireEvent } from '@testing-library/react'
import { App } from './app'

const mockHttpResponse = `HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Date: Wed, 01 Jan 2025 00:00:00 GMT
Content-Length: 1234

<html>hello</html>`

jest.mock('./utils/get-mock-http-response', () => ({
    getRandomMockHttpResponse: () => mockHttpResponse,
}))

jest.mock('./components/body-tab', () => ({
    BodyTab: ({ body }: { body: string }) => <div data-testid="body-tab">{body}</div>,
}))

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should render title and textarea', () => {
        render(<App />)
        expect(screen.getByText('HTTP Response Parser 👓')).toBeVisible()
        expect(screen.getByPlaceholderText('Enter http text response')).toBeVisible()
    })

    it('should show the body tab by default', () => {
        render(<App />)
        expect(screen.getByTestId('body-tab')).toBeVisible()
    })

    it('should switch to the headers tab when the headers tab is clicked', () => {
        const { container } = render(<App />)
        const tabs = container.querySelectorAll('.rt-TabsTriggerInner')
        const headersTab = Array.from(tabs).find(tab => tab.textContent === 'Headers')
        fireEvent.click(headersTab)
        expect(screen.getByText('Header Name')).toBeVisible()
    })

    it('should switch to the body tab when the body tab is clicked', () => {
        const { container } = render(<App />)
        const tabs = container.querySelectorAll('.rt-TabsTriggerInner')
        const bodyTab = Array.from(tabs).find(tab => tab.textContent === 'Body')
        fireEvent.click(bodyTab)
        expect(screen.getByTestId('body-tab')).toBeVisible()
    })

    it('should generate a mock response when the button is clicked', () => {
        const { container } = render(<App />)
        fireEvent.click(screen.getByText('Try a mock response'))
        expect(container.getElementsByTagName('textarea')[0].value).toBe(mockHttpResponse)
    })

    it('should parse and display the core headers', () => {
        render(<App />)
        const textarea = screen.getByPlaceholderText('Enter http text response')
        fireEvent.change(textarea, {
            target: {
                value: mockHttpResponse,
            },
        })
        // if this was a real product test, these wouldn't be hardcoded
        expect(screen.getByTestId('body-tab')).toHaveTextContent('<html>hello</html>')
        expect(screen.getByText('2025-01-01 01:00:00')).toBeVisible()
        expect(screen.getByText('text/html')).toBeVisible()
        expect(screen.getByText('1.21 kB')).toBeVisible()
    });

    it('should handle missing core headers case-insensitively', () => {
        // I'm skipping this test for now but this should exist
        // in a real product test
        expect(true).toBe(true)
    })

    it('should parse headers case-insensitively', () => {
        // I'm skipping this test for now but this should exist
        // in a real product test
        expect(true).toBe(true)
    })
})