import { generateHtmlNodesFromString, NodeType } from './generate-html-nodes-from-string';

describe('generateHtmlNodesFromString', () => {
    it('should return null for empty string', () => {
        expect(generateHtmlNodesFromString('')).toBeNull();
    });

    it('should parse nested tags correctly', () => {
        const html = '<div><span>Test</span></div>';
        const result = generateHtmlNodesFromString(html);
        expect(result).not.toBeNull();
        const [divNode] = result!.children;
        expect(divNode.value).toBe('div');
        expect(divNode.children.length).toBe(1);
        const spanNode = divNode.children[0];
        expect(spanNode.value).toBe('span');
        expect(spanNode.children[0].value).toBe('Test');
    });

    it('should handle sibling tags properly', () => {
        const html = '<div>Hello</div><p>World</p>';
        const result = generateHtmlNodesFromString(html);
        expect(result).not.toBeNull();
        expect(result!.children.length).toBe(2);
        
        const [nodeA, nodeB] = result!.children;
        expect(nodeA.type).toBe(NodeType.TAG);
        expect(nodeA.value).toBe('div');
        expect(nodeA.children[0].type).toBe(NodeType.TEXT);
        expect(nodeA.children[0].value).toBe('Hello');
        
        expect(nodeB.type).toBe(NodeType.TAG);
        expect(nodeB.value).toBe('p');
        expect(nodeB.children[0].type).toBe(NodeType.TEXT);
        expect(nodeB.children[0].value).toBe('World');
    });

    it('should return null for invalid HTML', () => {
        const html = '<div><span>Test</div>';
        const result = generateHtmlNodesFromString(html);
        expect(result).toBeNull();
    });

    it('should handle tags with attributes properly', () => {
        const html = '<a href="https://example.com">Link</a>';
        const result = generateHtmlNodesFromString(html);
        expect(result).not.toBeNull();
        expect(result!.children.length).toBe(1);
        const nodeA = result!.children[0];
        expect(nodeA.type).toBe(NodeType.TAG);
        expect(nodeA.value).toBe('a href="https://example.com"');
        expect(nodeA.tagValue).toBe('a');
        expect(nodeA.children.length).toBe(1);
        expect(nodeA.children[0].type).toBe(NodeType.TEXT);
        expect(nodeA.children[0].value).toBe('Link');
    });
});