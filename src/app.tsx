import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { BodyTab, HeadersTab } from './components'
import { Button, Tabs, Heading, TextArea } from '@radix-ui/themes'
import { bytesToHumanReadableSize } from './utils/data-converters'
import { getReasonPhrase } from 'http-status-codes'
import { getRandomMockHttpResponse } from './utils/get-mock-http-response'

interface ParsedHttpResponse {
    headers: {
        'content-type'?: string
        date?: string
        'content-length'?: string
        connection?: string
        [key: string]: string
    }
    statusCode: string | null
    body: string
}

const statusCodePrefixToColor: Record<
    string,
    { backgroundColor: string; textColor: string }
> = {
    '1': { backgroundColor: 'lightblue', textColor: 'darkBlue' },
    '2': { backgroundColor: 'lightgreen', textColor: 'darkgreen' },
    '3': { backgroundColor: 'lightsalmon', textColor: 'darkslategray' },
    '4': { backgroundColor: 'lightcoral', textColor: 'darkred' },
    '5': { backgroundColor: 'lightcoral', textColor: 'darkred' },
    default: { backgroundColor: 'white', textColor: 'black' },
}

const ResultsBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: whitesmoke;
    border: 1px solid lightgray;
    margin: 10px 0;
    border-radius: 5px;
`

const InformationArea = styled.div<{ statusCode: string }>`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    font-size: 14px;

    span:hover {
        cursor: default;
    }
`

const StatusCode = styled.span<{ statusCode: string }>`
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    background-color: ${(props) => {
        const backgroundColor =
            statusCodePrefixToColor[props.statusCode.substring(0, 1)] ||
            statusCodePrefixToColor['default']
        return backgroundColor.backgroundColor
    }};
    color: ${(props) => {
        const textColor =
            statusCodePrefixToColor[props.statusCode.substring(0, 1)] ||
            statusCodePrefixToColor['default']
        return textColor.textColor
    }};
`

const StyledTextArea = styled(TextArea)`
    min-height: 200px;
    border-radius: 5px;
`

const Title = styled(Heading)`
    font-size: 24px;
    font-weight: bold;
    color: darkslategray;
    text-align: center;
    padding: 10px;
`

const dateTimeFormatter = new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
})

export function App() {
    const [{ body, headers, statusCode }, setParsedHttpResponse] =
        useState<ParsedHttpResponse>({
            headers: {},
            statusCode: null,
            body: '',
        })
    const [rawResponse, setRawResponse] = useState<string>('')
    const [currentTab, setCurrentTab] = useState<'body' | 'headers'>('body')

    const tabs = {
        body: <BodyTab body={body} />,
        headers: <HeadersTab headers={headers} />,
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: rawResponse } = e.target
        const [statusLine, ...splitResponse] = rawResponse.split('\n')
        const statusCode = statusLine.split(' ')[1] || null
        const bodyStartIndex = splitResponse.findIndex(
            (line: string) => line.trim() === ''
        )
        const headers = splitResponse.slice(0, bodyStartIndex).reduce(
            (accumulator: Record<string, string>, line: string) => {
                // trimming because of https://datatracker.ietf.org/doc/html/rfc7230#section-3.2.4
                const headerName = line.substring(0, line.indexOf(':')).trim()
                const headerValue = line.substring(line.indexOf(':') + 1).trim()
                // I also thought of doing it a bit simpler like this but felt that
                // the above would be more optimized for performance
                // const [headerName, ...headerValueParts] = line.split(':');
                return {
                    ...accumulator,
                    [headerName.toLowerCase()]: headerValue,
                }
            },
            {} as Record<string, string>
        )

        setParsedHttpResponse({
            headers,
            statusCode,
            body: splitResponse
                .slice(bodyStartIndex + 1)
                .join('\n')
                .trim(),
        })
    }

    const formatDateAndTime = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return dateTimeFormatter.format(date)
        } catch (error) {
            console.error('Invalid date string:', dateString, error)
            return ''
        }
    }

    const getStatusCodeDescription = (statusCode: number | string) => {
        try {
            // @NOTE: getReasonPhrase throws if status code is invalid
            const description = getReasonPhrase(statusCode)
            return description
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return ''
        }
    }

    useEffect(() => {
        handleTextAreaChange({
            target: { value: rawResponse },
        } as React.ChangeEvent<HTMLInputElement>)
    }, [rawResponse])

    return (
        <div>
            <Title>HTTP Response Parser 👓</Title>
            <StyledTextArea
                placeholder="Enter http text response"
                resize="vertical"
                // @ts-expect-error untyped event
                onChange={(e) => {
                    setRawResponse(e.target.value)
                }}
                value={rawResponse}
            />

            <div>
                <Button
                    onClick={() => {
                        let mockResponse = getRandomMockHttpResponse()
                        // I SWEAR I DO NOT CODE LIKE THIS
                        // just a quick bandaid to ensure you get new
                        // responses on click
                        while(mockResponse === rawResponse) {
                            mockResponse = getRandomMockHttpResponse()
                        }

                        setRawResponse(mockResponse)
                    }}
                    variant="soft"
                    size="2"
                    style={{ margin: '10px 0' }}
                >
                    Try a mock response
                </Button>
                <ResultsBar>
                    <Tabs.Root defaultValue="body">
                        <Tabs.List>
                            <Tabs.Trigger
                                value="body"
                                onClick={() => setCurrentTab('body')}
                            >
                                Body
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="headers"
                                onClick={() => setCurrentTab('headers')}
                            >
                                Headers
                            </Tabs.Trigger>
                        </Tabs.List>
                    </Tabs.Root>
                    <InformationArea statusCode={statusCode || ''}>
                        {statusCode && (
                            <StatusCode
                                statusCode={statusCode}
                                aria-label="HTTP Status Code"
                                title="HTTP Status Code"
                            >
                                {statusCode}{' '}
                                {getStatusCodeDescription(statusCode)}
                            </StatusCode>
                        )}
                        <span aria-label="Content Type" title="Content Type">
                            {headers['date']
                                ? formatDateAndTime(headers['date'])
                                : ''}
                        </span>
                        <span aria-label="Content Type" title="Content Type">
                            {headers['content-type']
                                ? headers['content-type'].split(';')[0].trim()
                                : ''}
                        </span>
                        <span aria-label="Content Type" title="Content Type">
                            {headers['content-length']
                                ? bytesToHumanReadableSize(
                                      parseInt(headers['content-length'])
                                  )
                                : ''}
                        </span>
                    </InformationArea>
                </ResultsBar>
                <div>{tabs[currentTab]}</div>
            </div>
        </div>
    )
}
