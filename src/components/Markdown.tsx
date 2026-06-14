import { Fragment, type ReactNode } from "react";

function inline(text: string, keyBase: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyBase}-${i}`} className="font-semibold text-navy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyBase}-${i}`}>{part}</Fragment>;
  });
}

export function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={k++} className="mt-8 text-xl font-semibold text-navy">
          {inline(line.slice(4), `h3-${k}`)}
        </h3>,
      );
      i++;
    } else if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={k++} className="mt-10 text-2xl sm:text-[1.7rem]">
          {inline(line.slice(3), `h2-${k}`)}
        </h2>,
      );
      i++;
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul key={k++} className="mt-4 space-y-2.5">
          {items.map((it, j) => (
            <li key={j} className="flex gap-3 text-steel">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" />
              <span>{inline(it, `li-${k}-${j}`)}</span>
            </li>
          ))}
        </ul>,
      );
    } else if (line.trimStart().startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        rows.push(lines[i].trim());
        i++;
      }
      const parse = (r: string) =>
        r.slice(1, -1).split("|").map((c) => c.trim());
      const header = parse(rows[0]);
      const body = rows.slice(2).map(parse);
      blocks.push(
        <div key={k++} className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[520px] overflow-hidden rounded-xl border border-line text-sm">
            <thead>
              <tr className="bg-navy text-white">
                {header.map((h, j) => (
                  <th key={j} scope="col" className="px-4 py-3 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={r} className={r % 2 ? "bg-mist/50" : "bg-white"}>
                  {row.map((c, j) => (
                    <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "font-medium text-slate" : "text-steel"}`}>
                      {inline(c, `td-${k}-${r}-${j}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    } else {
      blocks.push(
        <p key={k++} className="mt-4 leading-relaxed text-steel">
          {inline(line, `p-${k}`)}
        </p>,
      );
      i++;
    }
  }

  return <div className="text-[16px]">{blocks}</div>;
}
