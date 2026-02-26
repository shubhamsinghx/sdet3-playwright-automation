import { test, expect } from '../../framework/fixtures/test-fixtures';
import SidebarSearchComponent from '../../framework/pages/PIMPage';
import Logger from '../../framework/utils/Logger';

test.describe('Search — Dashboard Sidebar Search', () => {
  let sidebar: SidebarSearchComponent;

  test.beforeEach(async ({ authenticatedPage }) => {
    sidebar = new SidebarSearchComponent(authenticatedPage);
    await expect(sidebar.isPageLoaded()).resolves.toBe(true);
  });

  test('TC_SEARCH_001 — Search for "Dashboard" returns matching menu item', async () => {
    Logger.step(1, 'Type "Dash" in the sidebar search box');
    await sidebar.search('Dash');

    Logger.step(2, 'Verify results appear and contain "Dashboard"');
    const hasResults = await sidebar.hasResults();
    expect(hasResults).toBe(true);

    const items = await sidebar.getVisibleMenuItems();
    Logger.info(`Visible menu items: ${JSON.stringify(items)}`);
    expect(items.some(item => item.includes('Dashboard'))).toBe(true);
  });

  test('TC_SEARCH_002 — Search for non-existent term shows no results', async () => {
    Logger.step(1, 'Type a term that matches no menu item');
    await sidebar.search('ZZZNOTEXIST');

    Logger.step(2, 'Verify no menu items are visible');
    const count = await sidebar.getVisibleMenuItemCount();
    expect(count).toBe(0);
  });

  test('TC_SEARCH_003 — Search with partial term filters menu items correctly', async () => {
    Logger.step(1, 'Type "Le" to match Leave-related items');
    await sidebar.search('Le');

    Logger.step(2, 'Verify filtered results contain matching items');
    const items = await sidebar.getVisibleMenuItems();
    Logger.info(`Filtered items: ${JSON.stringify(items)}`);
    expect(items.length).toBeGreaterThan(0);
    expect(items.every(item => item.toLowerCase().includes('le'))).toBe(true);
  });
});
