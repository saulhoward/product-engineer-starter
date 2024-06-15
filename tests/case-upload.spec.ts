import { test, expect } from '@playwright/test';

test.setTimeout(120000);

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Anterior/);
});

test('submit files and open case', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', { name: /Medical Record Upload/i }).click();
  await page.getByRole('button', { name: /Guidelines Upload/i }).click();
  await page.getByRole('button', { name: /Open case report/i }).click();
  
  await expect(page.getByText('Anterior has received your case...')).toBeVisible();
  await expect(page.getByText('Florence is processing your case...')).toBeVisible({timeout: 30000});
  await expect(page.getByText('Mickey Mouse')).toBeVisible({timeout: 60000});
  await expect(page.getByText('Case is not met')).toBeVisible();

  await page.getByRole('button', { name: /Choose one of the following/i }).click();
  await expect(page.getByText('Suggest trying Medial Branch Block')).toBeVisible();
});
