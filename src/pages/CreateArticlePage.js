import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(
      'What\'s this article about?')
    this.articleBodyField = page.getByPlaceholder('Write your article (in');
    this.articleTagField = page.getByPlaceholder('Enter tags');
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async fillTitle(title) {
    await test.step(`Fill title field`, async () => {
      await this.articleTitle.fill(title);
    });
  }
  
  async fillDescription(description) {
    await test.step(`Fill description field`, async () => {
      await this.articleDescriptionField.fill(description);
    });
  }

  async fillBody(body) {
    await test.step(`Fill body field`, async () => {
      await this.articleBodyField.fill(body);
    });
  }

  async fillTag(tag) {
    await test.step(`Fill tag field`, async () => {
      await this.articleTagField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async assertArticleCreated() {
    await test.step('Assert article was created', async () => {
      await expect(this.page).toHaveURL(/article/);
    });
  }


}

