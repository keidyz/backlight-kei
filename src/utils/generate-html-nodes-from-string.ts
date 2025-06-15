export enum NodeType {
  ROOT = "root",
  TAG = "tag",
  TEXT = "text",
}

export interface GeneratedNode {
  type: NodeType;
  value: string;
  children: GeneratedNode[];
  closedByIndex: number | null;
  lineNumber: number | null;
  tagValue: string | null;
}

export const generateHtmlNodesFromString = (htmlBody: string) => {
  if (!htmlBody) {
    return null;
  }

  // TBH I'm regretting the shape of this object.. A LOT.
  // It grew as I kept working on the app and now I feel like I should re-write it
  // but idk really if this is within scope enough to pour more time into it.
  const rootNode = {
    type: "root",
    children: [],
    value: "",
    closedByIndex: null,
    lineNumber: null,
    tagValue: null,
  } as GeneratedNode;

  const splitByTags = htmlBody
    .split(/(<\/?[^>]+(?<!\/)>)/g)
    .filter((x) => x.trim());
  
  let currentLineNumber = 0;
  const recursivelyGenerateNodes = (
    htmlSplitByTags = splitByTags,
    currentNode: GeneratedNode = rootNode,
    index = 0
  ): GeneratedNode => {
    if (index >= htmlSplitByTags.length) {
      if (currentNode.type !== "root" && currentNode.closedByIndex === null) {
        return null;
      }
      return rootNode;
    }
    if(htmlSplitByTags[index].includes("!DOCTYPE")) {
      currentNode.children.push({
        type: NodeType.TEXT,
        value: htmlSplitByTags[index],
        children: [],
        closedByIndex: null,
        lineNumber: ++currentLineNumber,
        tagValue: null,
      });

      return recursivelyGenerateNodes(
        htmlSplitByTags,
        currentNode,
        index + 1
      );
    }
    const currentValue = htmlSplitByTags[index];
    const isClosingTag = currentValue.startsWith("</");
    const isOpeningTag = !isClosingTag && currentValue[0] === "<";
    const preProcessedTagValue = isClosingTag
      ? currentValue.slice(2, currentValue.length - 1)
      : isOpeningTag
      ? currentValue.slice(1, currentValue.length - 1)
      : null;
    const tagValue = preProcessedTagValue && preProcessedTagValue.split(" ")[0].trim();

    if (!tagValue) {
      currentNode.children.push({
        type: NodeType.TEXT,
        value: currentValue.trim(),
        children: [],
        closedByIndex: null,
        lineNumber: ++currentLineNumber,
        tagValue: null,
      });
      return recursivelyGenerateNodes(htmlSplitByTags, currentNode, index + 1);
    }

    if (isOpeningTag) {
      const newNode: GeneratedNode = {
        type: NodeType.TAG,
        value: preProcessedTagValue,
        children: [],
        closedByIndex: null,
        lineNumber: ++currentLineNumber,
        tagValue: tagValue,
      };
      currentNode.children.push(newNode);
      const result = recursivelyGenerateNodes(
        htmlSplitByTags,
        newNode,
        index + 1
      );

      if (!result) {
        return null;
      }

      return recursivelyGenerateNodes(
        htmlSplitByTags,
        currentNode,
        (result as GeneratedNode).closedByIndex
      );
    }

    if (isClosingTag) {
      if (currentNode.tagValue !== tagValue) {
        return null;
      }
      currentNode.closedByIndex = index+1;
      ++currentLineNumber;
      return currentNode;
    }

    return null;
  };

  return recursivelyGenerateNodes();
};
