import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`)

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
        await expect($('#flash')).toMatchElementSnapshot('flashAlert')
    })

    it('should not login with invalid credentials', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`)

        await $('#username').setValue(' ')
        await $('#password').setValue(' ')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('Your username is invalid!'))
    })

    it('should not login with invalid password', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`)

        await $('#username').setValue('tomsmith')
        await $('#password').setValue(' ')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('Your password is invalid!'))
    })

     it('should login with valid credentials and log out', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`)

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
        await expect($('#flash')).toMatchElementSnapshot('flashAlert')
        await $('a[href="/logout"]').click();
        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged out of the secure area!'))
    })
})
