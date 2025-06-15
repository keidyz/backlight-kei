import { useEffect, useState } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { ReaderIcon } from '@radix-ui/react-icons'
import { Switch, Select, Flex } from '@radix-ui/themes'
import styled from '@emotion/styled'
import {
    generateHtmlNodesFromString,
    GeneratedNode,
} from '../utils/generate-html-nodes-from-string'

import { CollapsibleNodeRenderer } from './collapsible-node-renderer'

const StyledPreviewLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
`

const ContentWrapper = styled.div`
    padding: 5px 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
`

const StyledFlexRow = styled(Flex)`
    justify-content: space-between;
`

const RawContentWrapper = styled.pre``

export function BodyTab({ body }: { body: string }) {
    const [htmlNodes, setHtmlNodes] = useState<GeneratedNode | null>(null)
    const [selectedRenderingType, setSelectedRenderingType] = useState<
        'raw' | 'html'
    >('html')
    const [isPreview, setIsPreview] = useState(false)

    const renderMapping = {
        raw: (
            <RawContentWrapper className="body-text-content">
                {body ? body.trim() : 'No body content available'}
            </RawContentWrapper>
        ),
        html: htmlNodes ? (
            <CollapsibleNodeRenderer node={htmlNodes} indent={1} />
        ) : (
            <div>Invalid HTML content</div>
        ),
    }

    useEffect(() => {
        const root = generateHtmlNodesFromString(body)
        setHtmlNodes(root)
    }, [body])

    return (
        <div>
            <StyledFlexRow>
                <Select.Root
                    defaultValue="html"
                    onValueChange={(value) => {
                        setSelectedRenderingType(value as 'raw' | 'html')
                    }}
                >
                    <Select.Trigger>
                        <Flex align="center" gap="2">
                            <ReaderIcon />
                            {selectedRenderingType}
                        </Flex>
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="raw">Raw</Select.Item>
                            <Select.Item value="html">HTML</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Root>

                <Flex align="center" gap="2">
                    <StyledPreviewLabel>
                        Preview
                        <Switch
                            radius="none"
                            onCheckedChange={() => {
                                setIsPreview(!isPreview)
                            }}
                        />
                    </StyledPreviewLabel>
                </Flex>
            </StyledFlexRow>
            <ContentWrapper>
                {isPreview && htmlNodes && (
                    <MarkdownPreview source={body} style={{ padding: 16 }} />
                )}
                {!isPreview && renderMapping[selectedRenderingType]}
            </ContentWrapper>
        </div>
    )
}
