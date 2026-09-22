const PALETTE = [
  { bg: "#baff29", fg: "#0a0a0a" },
  { bg: "#6366f1", fg: "#ffffff" },
  { bg: "#f97316", fg: "#0a0a0a" },
  { bg: "#06b6d4", fg: "#0a0a0a" },
  { bg: "#ec4899", fg: "#ffffff" },
  { bg: "#84cc16", fg: "#0a0a0a" },
  { bg: "#a855f7", fg: "#ffffff" },
  { bg: "#14b8a6", fg: "#0a0a0a" },
  { bg: "#eab308", fg: "#0a0a0a" },
  { bg: "#3b82f6", fg: "#ffffff" },
];

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const num = Math.max(1, parseInt(id, 10) || 1);
  const { bg, fg } = PALETTE[(num - 1) % PALETTE.length];
  const label = String(num);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="64" fill="${bg}"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="${fg}" font-family="system-ui,sans-serif" font-size="48" font-weight="700">${label}</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
