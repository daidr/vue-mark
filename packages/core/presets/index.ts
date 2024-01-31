import type {
  Component,
  FunctionalComponent,
  ComponentPublicInstance,
} from "vue";

export type InnerElement =
  | "paragraph"
  | "image"
  | "link"
  | "list"
  | "listItem"
  | "heading"
  | "blockquote"
  | "code"
  | "inlineCode"
  | "table"
  | "tableRow"
  | "tableCell"
  | "thematicBreak"
  | "break"
  | "delete"
  | "strong"
  | "emphasis"
  | "root"
  | "text"
  | "footnote"
  | "footnoteDefinition"
  | "definition"
  | "footnoteReference"
  | "linkReference"
  | "imageReference";

export type ConfigItemValue =
  | string
  | {
      type: "tag";
      value: ((item: any) => string) | string;
    }
  | {
      type: "component";
      value: Component;
    };

export type PresetConfig = Record<string, ConfigItemValue>;

export const PRESETS: PresetConfig = {
  paragraph: "p",
  heading: {
    type: "tag",
    value: (item: any) => `h${item.depth}`,
  },
  blockquote: "blockquote",
  thematicBreak: "hr",
  delete: "del",
  strong: "strong",
  emphasis: "em",
};
