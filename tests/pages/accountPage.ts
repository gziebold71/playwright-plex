import { type Locator, type Page } from '@playwright/test';

export class AccountPage {
	readonly page: Page;
	readonly profileImageButton: Locator;
    readonly chooseProfilePhotoButton: Locator;
    readonly saveChangesButton: Locator;
    readonly deleteProfilePhoto: Locator;
    readonly dialogBox: Locator;
    readonly confirmDeleteButton: Locator;
    readonly userNameButton: Locator;
    readonly userName: Locator;

	constructor(page: Page) {
		this.page = page;
        this.profileImageButton = page.locator('.SettingsFormSection-sectionWrapper-DuWwYc').filter({hasText: 'Profile Image'})
        this.chooseProfilePhotoButton = page.getByRole('button', {name: 'Choose Photo'})
        this.saveChangesButton = page.getByRole('button', {name: 'Save Changes'})
        this.deleteProfilePhoto = page.getByText('delete your profile image')
        this.dialogBox = page.getByRole('dialog')
        this.confirmDeleteButton = this.dialogBox.getByRole('button', { name: 'Delete' })
        this.userNameButton = page.locator('.SettingsFormSection-sectionWrapper-DuWwYc').filter({hasText: 'Username'})
        this.userName = page.locator('#username')
    }

    async clickEditProfileImage() {
        await this.profileImageButton.click()
    }

    async clickSaveChangesButton() {
        await this.saveChangesButton.click();
    }

    async clickDeleteProfilePhoto(){
        await this.deleteProfilePhoto.click();
    }

    async clickConfirmDeleteButton(){
        await this.confirmDeleteButton.click();
    }

    async enterUserName(newUserName){
        await this.userName.click();
        await this.userName.fill(newUserName)
    }

    async clickUpdateUserNameButton(){
        await this.userNameButton.click()
    }

    async getUserName(){
        return await this.userNameButton.textContent()
    }

    async saveChangesButtonHidden() {
        let isSaveButtonPresent;
        for (let x=0; x < 10; x++){
            isSaveButtonPresent = await this.saveChangesButton.isHidden()
            if (isSaveButtonPresent){
                break;
            }
            else {
                await this.page.waitForTimeout(1000);
            }
        }
        return isSaveButtonPresent
    }

    async dialogBogClosed() {
        let isDialogBoxPresent;
        for (let x=0; x < 10; x++){
            isDialogBoxPresent = await this.dialogBox.isHidden()
            if (isDialogBoxPresent){
                break;
            }
            else {
                console.log(x)
                await this.page.waitForTimeout(1000);
            }
        }
        return isDialogBoxPresent
    }
}