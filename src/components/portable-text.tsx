import { PortableText as SanityPortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-4">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt ?? ""}
          width={800}
          height={600}
          className="rounded-lg border border-border max-w-full h-auto"
        />
      </div>
    ),
  },
  block: {
    normal: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
    h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-3">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
  },
};

export function PortableText({ value }: { value: unknown[] }) {
  return (
    <div className="prose-sm max-w-none">
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
