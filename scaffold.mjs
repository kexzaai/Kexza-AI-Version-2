import fs from 'fs';
import path from 'path';

const routes = [
  '/', '/pricing', '/contact', '/login', '/signup', '/terms', '/privacy',
  '/forgot-password', '/reset-password', '/verify-email',
  '/welcome', '/onboarding/firm', '/onboarding/team', '/onboarding/client', '/onboarding/import-data', '/onboarding/tour',
  '/dashboard', '/planner', '/notifications',
  '/clients', '/clients/add', '/clients/edit/[id]', '/clients/[id]', '/clients/documents', '/clients/compliance', '/clients/history',
  '/tasks', '/tasks/create', '/tasks/[id]', '/tasks/board', '/tasks/calendar',
  '/compliance', '/compliance/calendar', '/compliance/tracker', '/compliance/alerts',
  '/documents', '/documents/upload', '/documents/[id]', '/documents/folders',
  '/ai', '/ai/chat', '/ai/task-generator', '/ai/client-insights', '/ai/compliance-suggestions', '/ai/workflow-automation', '/ai/daily-briefing', '/ai/risk-alerts',
  '/reports', '/reports/clients', '/reports/tasks', '/reports/compliance', '/reports/revenue',
  '/performance/team', '/performance/firm',
  '/billing', '/billing/subscription', '/billing/history', '/billing/invoices',
  '/revenue', '/revenue/clients', '/revenue/outstanding',
  '/settings/profile', '/settings/firm', '/settings/preferences', '/settings/team', '/settings/roles', '/settings/permissions',
  '/activity', '/notes', '/notes/[id]', '/communication', '/communication/email', '/communication/whatsapp',
  '/help', '/help/docs', '/help/tickets', '/help/chat',
  '/day-end-summary', '/planner/tomorrow',
  '/404', '/unauthorized', '/coming-soon'
];

const appDir = path.join(process.cwd(), 'src', 'app');

routes.forEach((route) => {
  if (route === '/') return; // Will skip Root page overwrite for now
  
  // Format the name
  let title = route.split('/').filter(Boolean).map(s => s.replace(/[^a-zA-Z0-9]/g, ' ')).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' - ');
  if (!title) title = "Page";
  if (title.includes('Id')) title = title.replace('Id', 'Details');

  const routePath = path.join(appDir, ...route.split('/').filter(Boolean));
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
  }

  const pageComponent = `import { ComingSoon } from "@/components/global/coming-soon";

export default function Page() {
  return <ComingSoon title="${title}" />;
}
`;

  const pageFilePath = path.join(routePath, 'page.tsx');
  if (!fs.existsSync(pageFilePath)) {
    fs.writeFileSync(pageFilePath, pageComponent);
    console.log(`Created route: ${route}`);
  }
});
console.log("All routes scaffolded.");
