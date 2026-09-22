# VecoSoft Order Track

A modern, mobile-first **Order Tracking** screen for an e-commerce app built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and Chart.js.

![VecoSoft Order Track](public/logo.svg)

## Features

- **Mobile-first layout** optimized for 360–430px widths
- **Four delivery scenarios**: In Transit, Delayed, Delivered (Not Received), Tracking Unavailable
- **Live preview controls** — adjust progress, status, product info, and ETAs; charts update instantly
- **Chart.js visualizations** — doughnut progress ring + horizontal step bar chart
- **Framer Motion animations** — staggered timeline, state transitions, banner pulse
- **shadcn/ui components** — Card, Badge, Dialog, Sheet, Skeleton, Tabs, and more
- **Global states** — loading skeleton, error with retry
- **Functional dialogs** — Contact Support sheet, Report Missing Package form, Order Details

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui | UI components |
| Framer Motion | Animations |
| Chart.js + react-chartjs-2 | Progress charts |
| lucide-react | Icons |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Preview States

Use the **Preview States** tabs at the top of the screen, or URL query params:

| Scenario | URL |
|----------|-----|
| In Transit | `/?scenario=in_transit` |
| Delayed | `/?scenario=delayed` |
| Delivered (Not Received) | `/?scenario=delivered_not_received` |
| Tracking Unavailable | `/?scenario=tracking_unavailable` |
| Loading | `/?view=loading` |
| Error | `/?view=error` |

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Logo.tsx
│   ├── order-tracker/
│   │   ├── OrderTracker.tsx          # Main orchestrator
│   │   ├── OrderTrackerPage.tsx      # Page wrapper + URL state
│   │   ├── ProductSummaryCard.tsx
│   │   ├── DeliveryProgressChart.tsx # Chart.js visualizations
│   │   ├── DeliveryTimeline.tsx
│   │   ├── StatusBanner.tsx
│   │   ├── SupportSheet.tsx
│   │   ├── ReportIssueDialog.tsx
│   │   ├── DynamicInputPanel.tsx     # Live preview controls
│   │   └── ...
│   └── ui/                           # shadcn/ui primitives
├── data/
│   └── orderData.ts                  # Mock JSON scenarios
└── types/
    └── order.ts
```

## Live Preview Controls

The **Live Preview Controls** panel lets you dynamically update:

- Delivery progress (0–100% slider)
- Current status step
- Product name, quantity, price
- Estimated delivery and delay ETAs

All changes reflect immediately in the doughnut chart, bar chart, timeline, and product summary.

## Deploy on Vercel

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Deploy — no extra configuration needed

## License

MIT
