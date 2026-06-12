import { TIMEOUT } from "../Helper";


export class Base {
    
    skipButton =  "div > div > div > div > div > button";
    loaderButton = '[data-testid="oval-loading"]';
    closeToastButton = ".Toastify__close-button > svg";
    addMoreButton = '//button[normalize-space()="Add More"]';
    continueButton = "//button[normalize-space()='Continue']";
    saveChangesButton = "//button[normalize-space()='Save Changes']";
    deleteRowButton = '//ul/li/span/div/button[normalize-space()="Delete Row"]';
    dropdownTrigger =   'button.ant-dropdown-trigger';
    dropdownUl = 'ul.ant-dropdown-menu';
    dropdownItemSpan = 'li.ant-dropdown-menu-item > span.ant-dropdown-menu-title-content';
    saveButton = '//button[normalize-space()="Add"]';
    cancelButton = '//button[normalize-space()="Cancel"]';
    forgetPasswordUrl = "/forgot-password";
    signInUrl = "/login"; 
    signUpUrl = "/register?type=1&step=2";
    dashboardUrl = "/dashboard";
    sidebarMenuIcon = '//img[contains(@alt, "Habit Coach")]/parent::div/preceding-sibling::button';


    

    clickOnElement(selector, index , option){
        selector.eq(index || 0).click(option);
    }

    typeElementText(selector, text,  index , option){
        selector.eq(index || 0).clear().type(text, option || option );
    }

    typeElementWithoutClear(selector, text,  index , option){
        selector.eq(index || 0).type(text, option || option );
    }

    loaderNotExist(){
        cy.get(this.loaderButton, {timeout:TIMEOUT.longTimeout}).should('not.exist')
    }

    elementVisibility(selector,  index){
        selector.eq(index || 0).should('be.visible');
    }

    elementNotVisible(selector,  index){
        selector.eq(index || 0).should('not.be.visible');
    }

    elementNotExist(selector){
        selector.should('not.exist');
    }
    elementExist(selector){
        selector.should('exist');
    }

    elementDisabled(selector,  index){
       selector.eq(index || 0).should('be.disabled');
    }

    elementNotDisabled(selector,  index){
        selector.eq(index || 0).should('not.be.disabled')
    }

    elementLengthExist(selector, length){
        selector.should('have.length', length);
    }

    elementHaveClass(selector, name, index){
        selector.eq(index || 0).should('have.class',name);
    }

    elementNotHaveClass(selector, name, index){
        selector.eq(index || 0).should('not.have.class',name);
    }

    elementTextExist(selector, name, index){
        selector.eq(index || 0).should('have.text',name);
    }

    elementTextNotExist(selector, name, index){
        selector.eq(index || 0).should('not.have.text',name);
    }

    elementHaveValue(selector, name, index){
        selector.eq(index || 0).should('have.value',name); 
    }

    elementPlaceholderMatch(selector, name, index){
        selector.eq(index || 0).invoke('attr', 'placeholder').should('contain', name);
    }

    elementMouseOver(selector, index){
        selector.eq(index || 0).trigger('mouseover');
    }

    selectElementFromDropdown(title, index , option){
        cy.get('[title="'+title+'"] > .ant-select-item-option-content', {
            timeout: TIMEOUT.dropdownTimeout,
          }).eq(index || 0).click(option || option);
    }
    
    goToForgetPasswordPage(){
        cy.visit(this.forgetPasswordUrl, {failOnStatusCode:false});
    }

    goToSigninPage(){
        cy.visit(this.signInUrl, {failOnStatusCode:false});
    }

    goToSignupPage(){
        cy.visit(this.signUpUrl, {failOnStatusCode:false});
    }

    goToDashboardPage(){
        cy.visit(this.dashboardUrl, {failOnStatusCode:false});
    }

    verifyUrl(url){
        const baseUrl = Cypress.config('baseUrl');
        cy.url({timeout:TIMEOUT.mediumTimeout}).should('eq', baseUrl+url)
    }

    skipUpdateSecurityAccountCheck() {
        cy.wait(TIMEOUT.shortTimeout);
        cy.get("body")
        .then(($body) => {
          if ($body.find(this.skipButton).length) {
            this.clickOnElement(cy.get(this.skipButton))
          }
        })
    }
    
    verifyToast(toastMessage) {
        cy.get("div")
          .contains(toastMessage, { matchCase: false, timeout: TIMEOUT.longTimeout })
          .should("exist");
        cy.get(this.closeToastButton).click({
          multiple: true,
          force: true,
        });
      }
}    
