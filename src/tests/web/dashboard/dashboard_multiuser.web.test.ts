import {test, expect} from '@fixtures/base.fixture.js'

test.describe('Multi Browser Caps Check', () => {
    test('', async({ page, accountUrl, createPage}) => {
        console.log('Using account:', accountUrl);
        await page.goto(accountUrl);

        const user1 = await createPage();
        const user2 = await createPage();

        await user1.goto('https://youtube.com/');
        await user2.goto('https://figma.com/');

        await expect(user1).toHaveURL(/youtube/);
        await expect(user2).toHaveURL(/figma/);
    });
});