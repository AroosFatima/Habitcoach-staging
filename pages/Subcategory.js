
import { Base } from "./Base";
import { HabitClass } from "./Habit";
import { CategoryClass } from "./Category";
import { ADDNEWITEMS, TIMEOUT } from "../Helper";

const basePage = new Base();
const habitPage = new HabitClass();
const categoryPage = new CategoryClass();


export class SubcategoryClass {
      
    editSubCatOption = '//div[contains(@class, dropdown)]/div/a[normalize-space()="Edit Subcategory"]';
    deleteSubcatOption = '//div[contains(@class, dropdown)]/div/a[normalize-space()="Delete Subcategory"]';

    typeNewSubcat(text){
       cy.wait(TIMEOUT.veryShortTimeout);
       basePage.typeElementText(cy.get(habitPage.subcatInput),text );
    }

    selectSubCatFromDropdown(name){
      basePage.typeElementWithoutClear(cy.xpath(habitPage.subCatInput1),name + '{enter}' )
    }

    verifySubcatWeight(){
      cy.fixture('userData.json').then((user)=>{  
        basePage.goToDashboardPage();
        habitPage.clickOnAddNew();
        cy.wait(TIMEOUT.veryShortTimeout);
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
        habitPage.closeHabitForm();
        habitPage.clickOnAddNew();
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.subcategory);
        habitPage.fillAreaInput(user.areaDropdownData[0]);
        categoryPage.fillCategory(user.newCategoryData[0]);
        //  type new subcategory 
        this.typeNewSubcat(user.newSubcategoryData[0]);
        cy.wait(TIMEOUT.veryShortTimeout);
        cy.xpath(habitPage.subcatWeightText).should('not.be.empty');
      })
    }
   
    verifySubcategoryDiscard(){
        cy.fixture('userData.json').then((user)=>{  
          basePage.goToDashboardPage();
          habitPage.clickOnAddNew();
          cy.wait(TIMEOUT.veryShortTimeout);
          habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
          habitPage.closeHabitForm();
          habitPage.clickOnAddNew();
          habitPage.selectFromAddNewDropdown(ADDNEWITEMS.subcategory);
          habitPage.fillAreaInput(user.areaDropdownData[0]);
          categoryPage.fillCategory(user.newCategoryData[0]);
          //  type new subcategory 
          this.typeNewSubcat(user.newSubcategoryData[0]);
          cy.wait(TIMEOUT.veryShortTimeout);
          basePage.clickOnElement(cy.xpath(basePage.cancelButton));
          habitPage.clickOnAddNew();
          habitPage.selectFromAddNewDropdown(ADDNEWITEMS.subcategory);
           // verify if form is empty 
          basePage.elementTextExist(cy.xpath(habitPage.areaPlaceholder),habitPage.areaPlaceholderText);
          cy.get(habitPage.subcatInput).should('have.value','' );
        })
    }

    verifySubcatLabel(){
      cy.fixture('userData.json').then((user)=>{  
        basePage.goToDashboardPage();
        habitPage.clickOnAddNew();
        cy.wait(TIMEOUT.veryShortTimeout);
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
        habitPage.closeHabitForm();
        habitPage.clickOnAddNew();
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.subcategory);
        cy.wait(TIMEOUT.veryShortTimeout);
         // verify the label 
        basePage.elementExist(cy.xpath(habitPage.areaLabel));
        basePage.elementExist(cy.xpath(habitPage.categoryLabel));
        basePage.elementExist(cy.xpath(habitPage.subcatWeightLabel));
        basePage.elementExist(cy.xpath(habitPage.subcategoryLabel));
      })
    }

    verifyEditAndDeleteSubCat(areaName , subCatName){
      basePage.goToDashboardPage();
      let area = cy.xpath('//div[normalize-space()="Area"]/preceding-sibling::span[normalize-space()="'+areaName+'"]');
      // check if area is visible 
      basePage.elementVisibility(area);
      cy.wait(TIMEOUT.veryShortTimeout);
      // expand everything first 
      basePage.clickOnElement(cy.get(habitPage.modifyViewButton));
      basePage.clickOnElement(cy.xpath(habitPage.expandAllButton));
      cy.wait(TIMEOUT.shortTimeout);
      let menuDot = cy.xpath('//div[normalize-space()="Sub"]/parent::div/preceding-sibling::span[normalize-space()="'+subCatName+'"]/parent::div/parent::div/following-sibling::div/div');
      basePage.clickOnElement(menuDot);
      // verify edit and delete subcategory 
      basePage.elementVisibility(cy.xpath(this.editSubCatOption));
      basePage.elementVisibility(cy.xpath(this.deleteSubcatOption));
    }

    verifyScoreRatingItem(){
      //verify score item rating 1 - 10 and  skip 
      cy.get('div.dropdown-menu.show > a.dropdown-item').each(($elem,index )=>{
          if(index === 11){
            expect($elem.text()).to.be.eq('Skip');
          }else {
            expect($elem.text()).to.be.eq(index.toString());
          } 
      })
    }

    fillScoreFromDropdown(subcatName, ratingNumber){
      // click on first score box input 
      basePage.clickOnElement(cy.xpath('//span[normalize-space()="'+subcatName+'"]/parent::div/parent::div/following-sibling::div/div/div/div/div/div/div/div/input'));
      cy.wait(TIMEOUT.veryShortTimeout);
      
      // add rating
      basePage.clickOnElement(cy.xpath('//div[contains(@class, "dropdown-menu show")]/a[normalize-space()="'+ratingNumber+'"]'));
      cy.wait(TIMEOUT.veryShortTimeout);
      // verify rating 
      basePage.elementHaveValue(cy.xpath('//span[normalize-space()="'+subcatName+'"]/parent::div/parent::div/following-sibling::div/div/div/div/div/div/div/div/input'), ratingNumber);
    }

    fillScoreManually(subcatName){
      basePage.typeElementText(cy.xpath('//span[normalize-space()="'+subcatName+'"]/parent::div/parent::div/following-sibling::div/div/div/div/div/div/div/div/input'),'7' + '{enter}');
      cy.wait(TIMEOUT.veryShortTimeout);
       // verify rating 
       basePage.elementHaveValue(cy.xpath('//span[normalize-space()="'+subcatName+'"]/parent::div/parent::div/following-sibling::div/div/div/div/div/div/div/div/input'), '7');
      
    }


    
}
