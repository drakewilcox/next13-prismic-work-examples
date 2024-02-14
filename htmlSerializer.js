import Link from "next/link";
import { PrismicLink } from "@prismicio/react";
import classNames from "classnames";

export const htmlSerializer = {
  // heading1: ({ children }) => <h1>{children}</h1>,
  // heading2: ({ children }) => <h2>{children}</h2>,
  // heading3: ({ children }) => <h3>{children}</h3>,
  // heading4: ({ children }) => <h4>{children}</h4>,
  // heading5: ({ children }) => <h5>{children}</h5>,
  // heading6: ({ children }) => <h6>{children}</h6>,
  // paragraph: ({ children }) => {
  //   return <p>{children}</p>;
  // },
  // preformatted: ({ node }) => <pre>{JSON.stringify(node.text)}</pre>,
  // strong: ({ children }) => <strong>{children}</strong>,
  // em: ({ children }) => <em>{children}</em>,
  // listItem: ({ children }) => <li>{children}</li>,
  // oListItem: ({ children }) => <li>{children}</li>,
  // list: ({ children }) => <ul>{children}</ul>,
  // oList: ({ children }) => <ol>{children}</ol>,
  // image: ({ node }) => {
  //   const linkUrl = node.linkTo ? linkResolver(node.linkTo) : null;
  //   const linkTarget =
  //     node.linkTo && node.linkTo.target
  //       ? `target="${node.linkTo.target}" rel="noopener"`
  //       : "";
  //   const wrapperClassList = [node.label || "", "block-img"];
  //   const img = `<img src="${node.url}" alt="${
  //     node.alt ? node.alt : ""
  //   }" copyright="${node.copyright ? node.copyright : ""}" />`;
  //   return `
  //       <p class="${wrapperClassList.join(" ")}">
  //         ${linkUrl ? `<a ${linkTarget} href="${linkUrl}">${img}</a>` : img}
  //       </p>
  //     `;
  // },
  // embed: ({ node }) => `
  //       <div data-oembed="${node.oembed.embed_url}"
  //         data-oembed-type="${node.oembed.type}"
  //         data-oembed-provider="${node.oembed.provider_name}"
  //         ${label(node)}>
  //         ${node.oembed.html}
  //       </div>
  //     `,
  hyperlink: ({ node, children }) => {
    const isButton = node.start === 0 && node.end <= 30;
    const text = children[0]?.props?.children[0]?.props?.children;
    return (
      <PrismicLink
        field={node.data}
        className={classNames([isButton && "button"])}
        {...(isButton && text.length > 0 ? { "data-label": text } : false)}
        internalComponent={Link}
      >
        <span>{children}</span>
      </PrismicLink>
    );
  },
  // label: ({ node, children }) => {
  //   return <span class={node.data.label}>{children}</span>;
  // },
  // span: ({ children }) => <span>{children}</span>,
};
