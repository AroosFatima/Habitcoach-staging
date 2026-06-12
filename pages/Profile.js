
import { base, faker } from "@faker-js/faker";
import { TIMEOUT } from "../Helper";
import { Base } from "./Base";

const basePage = new Base();


export class ProfileClass {

    profileLink = 'a[href="/profile"]';
    phoneInput = '//div[normalize-space()="Phone"]/following-sibling::input';
    oldPasswordInput = 'input[name="oldPassword"]';
    newPasswordInput = 'input[name="newPassword"]';
    confirmPasswordInput = 'input[name="confirmPassword"]';
    passwordErrorDiv = 'div[type="invalid"]';
    passwordErrorMsg1 = 'New password cannot be the same as your old password.';
    passwordErrorMsg2 = 'Password must have a minimum of 8 characters and at least one of each: uppercase, special character, and number.';
    firstNameInput =  'input[name="first_name"]';
    lastNameInput =  'input[name="last_name"]';

    goToProfilePage(){
      basePage.clickOnElement(cy.get(this.profileLink),1);
    }

    verifyProfilePhoneNumber(){
      let phone = '+1 '+'(213) ' + faker.string.numeric(3) + '-' + faker.string.numeric(4);
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.veryShortTimeout);  
      basePage.clickOnElement(cy.xpath(basePage.sidebarMenuIcon));
      this.goToProfilePage();
      cy.wait(TIMEOUT.shortTimeout);
      basePage.typeElementText(cy.xpath(this.phoneInput) , phone);
      basePage.clickOnElement(cy.xpath(basePage.saveChangesButton));
      basePage.verifyToast('Saved successfully');
      cy.reload();
      cy.wait(TIMEOUT.shortTimeout);
      cy.xpath(this.phoneInput).eq(0).should('have.value' , phone);
    }

    errorMsgForInvalidPassword(){
      cy.fixture('loginCredential.json').then((user)=>{   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.xpath(basePage.sidebarMenuIcon));
        this.goToProfilePage();
        cy.wait(TIMEOUT.shortTimeout);
        basePage.typeElementText(cy.get(this.oldPasswordInput),user.password);
        basePage.typeElementText(cy.get(this.newPasswordInput),'KINZA$$$$');
        basePage.typeElementText(cy.get(this.confirmPasswordInput),'KINZA$$$$');
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.saveChangesButton),1);
        basePage.elementVisibility(cy.get(this.passwordErrorDiv).contains(this.passwordErrorMsg2));

      })  
    }

    errorMsgForSamePassword(){
      cy.fixture('loginCredential.json').then((user)=>{   
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.xpath(basePage.sidebarMenuIcon));
        this.goToProfilePage();
        cy.wait(TIMEOUT.shortTimeout);
        basePage.typeElementText(cy.get(this.oldPasswordInput),user.password);
        basePage.typeElementText(cy.get(this.newPasswordInput),user.password);
        basePage.typeElementText(cy.get(this.confirmPasswordInput),user.password);
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.saveChangesButton),1);
        basePage.elementVisibility(cy.get(this.passwordErrorDiv).contains(this.passwordErrorMsg1));
      })  
    }

    verifyFirstAndLastField(){
      basePage.goToDashboardPage();
      cy.wait(TIMEOUT.veryShortTimeout);  
      basePage.clickOnElement(cy.xpath(basePage.sidebarMenuIcon));
      this.goToProfilePage();
      cy.wait(TIMEOUT.shortTimeout);
      basePage.elementExist(cy.get(this.firstNameInput));
      basePage.elementExist(cy.get(this.lastNameInput));
    }

    changePassword(){
      cy.fixture('loginCredential.json').then((user)=>{   
        let pass = faker.string.alpha(5) + '@' + faker.string.numeric(5);
        console.log(pass)
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.xpath(basePage.sidebarMenuIcon));
        this.goToProfilePage();
        cy.wait(TIMEOUT.shortTimeout);
        // change password 
        basePage.typeElementText(cy.get(this.oldPasswordInput),user.password);
        basePage.typeElementText(cy.get(this.newPasswordInput),pass);
        basePage.typeElementText(cy.get(this.confirmPasswordInput),pass);
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.saveChangesButton),1);
        basePage.verifyToast('Password changed successfully');
        // verify if fields are empty after password changed successfully 
        basePage.elementHaveValue(cy.get(this.oldPasswordInput), '' );
        basePage.elementHaveValue(cy.get(this.newPasswordInput), '' );
        basePage.elementHaveValue(cy.get(this.confirmPasswordInput), '' );
        // now change password to previous one 
        basePage.typeElementText(cy.get(this.oldPasswordInput),pass);
        basePage.typeElementText(cy.get(this.newPasswordInput),user.password);
        basePage.typeElementText(cy.get(this.confirmPasswordInput),user.password);
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.saveChangesButton),1);
        basePage.verifyToast('Password changed successfully');
      })        
    }

}