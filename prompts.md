# Design Prompts

## Mobile Order Tracking Screen Prompt

Build a modern, professional mobile Order Tracking screen for an e‑commerce app using React (Next.js + TypeScript), Tailwind CSS, shadcn/ui components, Framer Motion for animations, and Chart.js (or a progress‑ring/segmented style visualization) for the delivery progress visual.

### Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui (Button, Card, Badge, Dialog/Sheet, Skeleton, Separator, Avatar, Tabs)
- Framer Motion (for transitions, state changes, micro‑interactions — NOT GSAP)
- Chart.js + react-chartjs-2 (for the delivery progress/timeline visualization, e.g. a horizontal progress bar chart or radial/doughnut chart showing % of journey complete)
- lucide-react for icons
- Mock/static JSON data (no backend)

### Core Screen: Order Tracking

#### Layout (mobile‑first, 360–430px width, responsive)
1. Header: back button, "Order Tracking" title, order ID
2. Order/product summary card: product image, name, quantity, price, order date
3. Delivery status hero section:
   - Current status as a large, clear label (e.g. "Out for Delivery")
   - Estimated delivery date/time prominently displayed
   - Visual timeline/progress component showing steps: Processing → Shipped → Out for Delivery → Delivered
   - Use Chart.js to render a horizontal progress/step chart or radial percentage indicator representing delivery progress, animated on load
4. Timeline detail list: each status with timestamp, using shadcn Card + Separator, animate items in with Framer Motion (staggered fade/slide)
5. Support section: "Contact Support" button (opens shadcn Sheet/Dialog with chat/call/email options), "Report an issue" button
6. Sticky bottom action bar (View Order Details / Contact Support)

#### States to implement (use tabs/toggle in the UI or query param to preview each, since this is mock data)

**1. Delayed Order**
- Show a warning‑colored banner/badge ("Delivery Delayed") above the timeline
- Display original ETA (struck through) and new estimated ETA
- Include a clear next step: "Track Latest Update" / "Contact Support" CTA
- Use Framer Motion to animate the banner in with a subtle pulse/attention animation

**2. Delivered but Not Received**
- Status shows "Delivered" (with delivered timestamp/location) but include a distinct callout: "Didn't receive your order?"
- Primary CTA: "Report Missing Package" → opens a shadcn Dialog/Sheet form (reason dropdown, description textarea, submit button)
- Secondary CTA: "Contact Support"

**3. Tracking Not Available Yet**
- Do NOT show a blank/broken screen — show a friendly empty state (shadcn Card with icon, message like "Tracking info will appear here once your order ships", estimated update time if available)
- Include a skeleton/loading state variant using shadcn Skeleton to simulate data still loading
- CTA: "Notify Me" or "Contact Support"

#### Additional requirements
- Add a global loading state (skeleton screens using shadcn Skeleton) simulating initial fetch
- Add an error state (e.g., "Couldn't load order" with Retry button)
- Use consistent spacing scale, type hierarchy (Tailwind typography), and a cohesive color system (status colors: blue = in progress, green = success/delivered, amber = delayed/warning, red = issue)
- All interactive elements (view details, contact support, report issue) should open functional shadcn Dialog/Sheet components with mock content — not dead buttons
- Animate screen/state transitions with Framer Motion (AnimatePresence for switching between the 3 states/screens)
- Fully responsive for widths 360px–430px, test at both extremes
- Use mock/static JSON data structured cleanly (e.g. `orderData.ts`) so states can be swapped easily via a dev toggle or prop

## Dark‑Theme Admin Dashboard Prompt (Trackora)

Build a modern dark‑themed Order Tracking dashboard called "Trackora" for an e‑commerce logistics admin panel using Next.js (App Router) + TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and Chart.js (react-chartjs-2).

### Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (dark theme, near‑black background #0a0a0a / #0d0d0d, lime/neon‑green accent #baff29 or similar)
- shadcn/ui: Card, Badge, Button, Tabs, Avatar, Input, Separator, DropdownMenu, Tooltip
- Framer Motion for hover states, tab transitions, row selection animation, progress bar fill animation
- Chart.js + react-chartjs-2 for the "Orders in transit" mini bar/sparkline chart across Sep–Dec
- lucide-react for icons
- Use the mock data file provided below — no backend required

### Layout Structure

#### 1. Top Navbar
- Logo "trackora" (small cube/box icon + wordmark) on left
- Center pill‑style nav: Dashboard, Orders (active, pill highlighted in lime green), Customers, Shipments, Returns
- Right side: search icon, notification bell icon, settings icon, user avatar (circular)
- Dark rounded container (like a floating navbar), fully rounded corners

#### 2. Page Header
- Back arrow icon + "Order Tracking" large heading (left)
- "Export report" button with download icon (right, outlined pill button)

#### 3. Stats Row (4 cards, dark cards, rounded‑2xl, subtle border)
- **Card 1 — Orders in transit**: big number (148), small mini bar chart below (Chart.js bar chart, Sep/Oct/Nov/Dec) rendered in lime green with rounded bar caps, with small overlapping avatar stacks under each month's bar
- **Card 2 — Due for delivery today**: big number (32), simple, minimal
- **Card 3 — Average delivery time**: big number + unit ("2.4 days")
- **Card 4 — On‑time delivery rate**: big number (96.8%) + "Excellent" badge in lime green, below it 3 small pill stats (Below target 92.1%, On target 96.8% — highlighted lime, Above target 99.3%), plus a "View details" button with external‑link icon
- Animate each card's number counting up on mount using Framer Motion + a simple count‑up effect.

#### 4. Active Filters Row
- "Active filters" label with info icon tooltip
- Filter pill dropdowns: "All statuses", "All couriers", date pickers ("November 2026", "December 2026" with calendar icon), search input "Find order" with search icon
- Use shadcn DropdownMenu/Select styled as dark rounded pills

#### 5. Main Content — Two Panel Layout (split ~40/60)

**Left Panel — Recent Orders List (dark card)**
- Header: "Recent Orders" + tabs: "All orders", "Processing (3)", "In transit (8)" (active tab pill lime green), plus grid/list view toggle icons and a kebab menu
- Order rows: avatar, order ID (bold), status label with colored dot (green=in transit, gray=delivered, yellow=processing), amount right‑aligned
- Selected row (e.g. #TR-4272) has a distinct dark highlighted background with rounded corners
- Animate row selection with Framer Motion (smooth background transition)
- Clicking a row updates the right panel detail view

**Right Panel — Order Detail Card (light/white card, contrasts with dark theme — rounded‑3xl, elevated)**
- Header: Order ID (large, bold) + status badge ("In transit", lime green pill)
- Three‑column info row: Customer (avatar + name), Destination (pin icon + city), each in small bordered pill/box
- Three‑column stat boxes: Order value ($), Courier (truck icon + name), ETA (calendar icon + date)
- **Shipment tracker**: horizontal stepper with 4 steps (Order placed → Packed → Shipped → Out for delivery), each step as a circle node connected by a line; completed steps filled lime green with checkmark, current step animated/pulsing with a truck or dot icon, connecting line animates filling in with Framer Motion on load
- Below tracker: date labels under each step
- Bottom row: Subtotal, Shipping, Total (right‑aligned, Total bold/larger)
- Full‑width "View live tracking" button (lime green, pill‑shaped, arrow icon) at bottom

### Styling Details
- Dark background: #0a0a0a or #0d0d0f
- Card background: #161616 / #1a1a1a with subtle 1px border (#2a2a2a)
- Accent/primary: lime‑green (#baff29 or #c6ff3a) used for active states, progress, primary buttons, success badges
- White card (order detail panel) with dark text for contrast against the dark dashboard
- Rounded corners throughout: rounded‑2xl to rounded‑3xl
- Typography: bold large numbers for stats (text‑3xl/4xl font‑bold), smaller uppercase‑ish gray labels above
- Consistent 16–24px padding inside cards, consistent gap spacing in grid

### Interactions (Framer Motion)
- Stat cards: subtle scale/lift on hover
- Tab switching: animated underline/pill slide (layoutId shared transition)
- Order row selection: animated background highlight
- Shipment tracker: steps and connecting line animate in sequence on order selection (staggered)
- Numbers count up on initial load

### Data
Use this mock data file exactly as structured — implement TypeScript interfaces for Order, ShipmentStep, and SummaryStats as given:

```
// mockData.ts (excerpt)
export const summaryStats = { /* ... */ };
export const orders = [ /* ... */ ];
export const filterOptions = { /* ... */ };
export const defaultSelectedOrderId = "#TR-4272";
```

## Deliverables
- Component structure: `Navbar.tsx`, `StatsCards.tsx`, `OrdersInTransitChart.tsx`, `FiltersBar.tsx`, `OrdersList.tsx`, `OrderDetailPanel.tsx`, `ShipmentTracker.tsx`
- Fully responsive (primary target: desktop/tablet dashboard view, ~1440px and ~1024px breakpoints)
- README with setup/run instructions
- Deployable to Vercel
