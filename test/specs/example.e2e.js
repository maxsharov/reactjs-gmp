describe('Movie App', () => {
  it('should redirect to URL /search', async () => {
    await browser.url(`/`)

    const url = await browser.getUrl()
    await expect(url).toMatch(/\/search/)

    const searchValue = await $('input').getValue()
    await expect(searchValue).toBeEmpty()
  });

  it('should find movies by searching query', async () => {
    await browser.url(`/`)

    await $('input').setValue('matrix')
    await $('button[type="submit"]').click()

    await expect($('div=The Matrix')).toBeExisting()
  });
});