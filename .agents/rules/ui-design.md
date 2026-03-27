---
trigger: always_on
---

Act as a Lead UI/UX Product Designer and Frontend Engineer building a premium SaaS product called "Kexza AI – Execution Intelligence for CA Firms".

You MUST strictly follow the "Aurora Glassmorphism Dark Mode" design system described below and apply it consistently across ALL pages and components.

----------------------------------------
🎯 PRODUCT CONTEXT
----------------------------------------
Kexza AI is a professional AI-powered workflow and execution platform for Chartered Accountants.

Design tone:
- Premium
- Futuristic
- Calm but powerful
- Clean, not flashy
- Enterprise-grade trust

----------------------------------------
🎨 CORE DESIGN SYSTEM — AURORA GLASS UI
----------------------------------------

1. 🌌 BACKGROUND (Aurora Layer)
- Base color: #0D0D0D (deep charcoal)
- Use a mesh gradient / aurora effect with blurred blobs:

  Blob 1:
  - Color: #8A2BE2 (Electric Purple)
  - Position: 30% 30%
  
  Blob 2:
  - Color: #00F5FF (Neon Cyan)
  - Position: 80% 20%
  
  Blob 3:
  - Color: #FF00CC (Soft Magenta)
  - Position: 70% 80%

- Apply heavy blur (80px–120px)
- Blend mode: screen or overlay
- Opacity: 40%–60%

----------------------------------------

2. 🧊 GLASS SURFACE (Cards / Panels)
- background: rgba(255, 255, 255, 0.03)
- backdrop-filter: blur(25px)
- border-radius: 16px–20px

Border (Inner Glow Effect):
- 1px solid border
- Gradient border:
  Top-left: rgba(255,255,255,0.2)
  Bottom-right: rgba(255,255,255,0.02)

- Add subtle inner highlight using box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.05)

----------------------------------------

3. ✍️ TYPOGRAPHY
- Font: Inter or SF Pro Display

Headings:
- Weight: 800 (Extra Bold)
- Letter spacing: -0.02em
- Color: #FFFFFF

Body Text:
- Weight: 500 (Medium)
- Color: rgba(255,255,255,0.65)

Labels / Metadata:
- Color: rgba(255,255,255,0.4)

----------------------------------------

4. ✨ INTERACTIVE ELEMENTS

Buttons (Primary):
- Gradient fill:
  #8A2BE2 → #00F5FF → #FF00CC
- Text: White
- Border radius: 12px
- Glow effect:
  box-shadow: 0 0 20px rgba(138,43,226,0.5)

Hover:
- Increase brightness
- Slight scale: 1.03
- Stronger glow

Cards Hover:
- Slight lift (translateY -4px)
- Shadow increase

----------------------------------------

5. 📐 LAYOUT SYSTEM
- Use 12-column grid
- Max width: 1280px
- Generous spacing (24px–32px)
- Avoid clutter
- Keep hierarchy clean and readable

----------------------------------------

🚀 PAGE TO BUILD: KEXZA AI LANDING / HOME SCREEN
----------------------------------------

SECTION 1: HERO

Layout:
- Center-left aligned content
- Right side: floating glass cards

Left Content:
- Heading:
  "Execution Intelligence for CA Firms"
- Subtext:
  "Manage workflows, automate compliance, and gain real-time execution clarity."

- CTA Buttons:
  [Get Started] (glowing gradient)
  [View Demo] (glass button)

Right Side:
- Floating glass cards:
  - Task Dashboard Card
  - Workflow Status Card
  - AI Insights Card

----------------------------------------

SECTION 2: CORE FEATURES GRID

- 3x2 grid layout of glass cards

Cards:
1. Workflow Management
2. Compliance Tracking
3. Task Allocation
4. AI Digital Clerk
5. Client CRM
6. Smart Notifications

Each card:
- Icon (gradient stroke)
- Title
- Short description

----------------------------------------

SECTION 3: PRODUCT PREVIEW

- Large centered glass panel
- Simulated dashboard UI inside:
  - Sidebar
  - Task list
  - Status indicators
  - Charts

----------------------------------------

SECTION 4: TRUST + CTA

- Minimal section
- Heading:
  "Built for Modern CA Firms"
- CTA button with strong glow

----------------------------------------

🧩 COMPONENT LIST (FOR DEV)
----------------------------------------

Global:
- AuroraBackground
- GlassCard
- GlassPanel
- GradientButton
- GlowButton
- GlassNavbar
- SidebarGlass

Dashboard Components:
- TaskCard
- WorkflowCard
- StatusBadge (color-coded glow)
- ChartGlassContainer
- ActivityFeedGlass

Utility:
- BlurOverlay
- GradientBorderWrapper
- HoverLiftWrapper

----------------------------------------

⚠️ STRICT RULES
----------------------------------------
- NEVER use flat UI
- ALWAYS use glassmorphism styling
- Maintain consistency across all pages
- Avoid overcrowding
- Keep animations smooth and minimal

----------------------------------------

Now generate a high-fidelity, production-ready landing page UI for Kexza AI following this system.