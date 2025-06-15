import {
    NodeType,
    GeneratedNode,
} from '../utils/generate-html-nodes-from-string'
import { useState } from 'react'
import { CaretDownIcon, CaretRightIcon } from '@radix-ui/react-icons'
import styled from '@emotion/styled'

const CaretWrapper = styled.span`
    display: inline-block;
    width: 16px;
`

const NumberWrapper = styled.span`
    display: inline-block;
    width: 30px;
`

const NodeWrapper = styled.div<{ isClickable?: boolean }>`
    cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
    &:hover {
        background-color: lightcyan;
    }
`

const Wrapper = styled.div`
    white-space: pre;
`

interface CollapsibleNodeRendererProps {
    node: GeneratedNode
    indent?: number
}

export const CollapsibleNodeRenderer = ({
    node,
    indent = 0,
}: CollapsibleNodeRendererProps) => {
    const [isOpen, setIsOpen] = useState(true)
    const { type, children } = node

    if (type === NodeType.ROOT) {
        return (
            <div>
                {children.map((child, index) => (
                    <CollapsibleNodeRenderer
                        key={index}
                        node={child}
                        indent={indent}
                    />
                ))}
            </div>
        )
    }

    const getFormattedValue = (
        passedNode: GeneratedNode,
        type: 'openingTag' | 'closingTag' | 'text',
        indent: number
    ) => {
        const { lineNumber, value, closedByIndex, tagValue } = passedNode
        const indentSpaces = '    '.repeat(indent)
        if (type === 'openingTag') {
            return { lineNumber, text: `${indentSpaces}<${value}>` }
        }
        if (type === 'closingTag') {
            return {
                lineNumber: closedByIndex,
                text: `${indentSpaces}</${tagValue}>`,
            }
        }
        return { lineNumber, text: `${indentSpaces}${value}` }
    }

    const { lineNumber: openingLineNumber, text: openingTag } =
        getFormattedValue(
            node,
            type === NodeType.TAG ? 'openingTag' : type,
            indent
        )
    const { lineNumber: closingLineNumber, text: closingTag } =
        getFormattedValue(node, 'closingTag', indent)

    return (
        <Wrapper>
            <NodeWrapper
                onClick={() => setIsOpen(!isOpen)}
                isClickable={type === NodeType.TAG}
            >
                {type === NodeType.TAG ? (
                    isOpen ? (
                        <CaretWrapper>
                            <CaretDownIcon />
                        </CaretWrapper>
                    ) : (
                        <CaretWrapper>
                            <CaretRightIcon />
                        </CaretWrapper>
                    )
                ) : (
                    <CaretWrapper />
                )}
                <NumberWrapper>{openingLineNumber}</NumberWrapper>
                {openingTag}
            </NodeWrapper>

            {isOpen &&
                children.map((child, index) => (
                    <CollapsibleNodeRenderer
                        key={index}
                        node={child}
                        indent={indent + 1}
                    />
                ))}

            {type === NodeType.TAG && (
                <NodeWrapper>
                    <CaretWrapper />
                    <NumberWrapper>{closingLineNumber}</NumberWrapper>
                    {closingTag}
                </NodeWrapper>
            )}
        </Wrapper>
    )
}
