import { render, screen } from '@testing-library/react'
import { HeadersTab } from './headers-tab'

describe('HeadersTab', () => {
    it('should render rows properly', () => {
        const headers = {
            'Content-Type': 'text/html',
            'X-Custom-Header': 'foobar',
            'Date': 'Thu, 01 Jan 1970 00:00:00 GMT',
        }
        render(<HeadersTab headers={headers} />)
        expect(screen.getByText('Header Name')).toBeVisible()
        expect(screen.getByText('Header Value')).toBeVisible()
        Object.entries(headers).forEach(([name, value]) => {
            expect(screen.getByText(name)).toBeVisible()
            expect(screen.getByText(value)).toBeVisible()
        })
    })
})