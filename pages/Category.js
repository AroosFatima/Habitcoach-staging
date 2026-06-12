
import { ADDNEWITEMS, TIMEOUT } from "../Helper";
import { HabitClass } from "./Habit";
import { Base } from "./Base";

const habitPage = new HabitClass();
const basePage = new Base();

export class CategoryClass {

    deleteCategoryDropdown = '//a[normalize-space()="Delete Category"]';
    deleteCategoryButton = '//button[normalize-space()="Delete category"]';



    fillCategory(catName){
       cy.wait(TIMEOUT.shortTimeout);
       basePage.clickOnElement(cy.xpath(habitPage.categoryInput));
       basePage.typeElementWithoutClear(cy.xpath(habitPage.categoryInput),catName +'{enter}' )
       cy.wait(TIMEOUT.veryShortTimeout);
       // verify if element is selected from dropdown
       basePage.elementExist(cy.xpath('//label[contains(@for,"category")]/following-sibling::div/div/div/div/div[normalize-space()="'+catName+'"]')) 
    }

    fillWithNewCategory(catName){
        cy.wait(TIMEOUT.shortTimeout);
        basePage.clickOnElement(cy.xpath(habitPage.categoryInput));
        basePage.typeElementWithoutClear(cy.xpath(habitPage.categoryInput) ,catName );
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath("//div/div[normalize-space()='Add Category \""+catName+"\"']"));
        // verify if element is selected from dropdown
        basePage.elementExist(cy.xpath('//label[contains(@for,"category")]/following-sibling::div/div/div/div/div[normalize-space()="'+catName+'"]')) 
    }

    verifyCategorySelectedFromDropdown(){
     cy.fixture('userData.json').then((user)=>{  
       basePage.goToDashboardPage();
       habitPage.clickOnAddNew();
       cy.wait(TIMEOUT.veryShortTimeout);
       habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
       habitPage.fillAreaInput(user.areaDropdownData[0]);
       this.fillCategory(user.categoryDropdownData[0]);
     }) 
    }

    verifyCategoryDiscard(){
      cy.fixture('userData.json').then((user)=>{  
        basePage.goToDashboardPage();
        habitPage.clickOnAddNew();
        cy.wait(TIMEOUT.veryShortTimeout);
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
        habitPage.closeHabitForm();
        habitPage.clickOnAddNew();
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.category);
        habitPage.fillAreaInput(user.areaDropdownData[0]);
        this.fillWithNewCategory('Walker');
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.cancelButton));
        habitPage.clickOnAddNew();
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.category);
         // verify if form is empty 
        basePage.elementTextExist(cy.xpath(habitPage.areaPlaceholder),habitPage.areaPlaceholderText);
        basePage.elementTextExist(cy.xpath(habitPage.categoryPlaceholder),habitPage.categoryPlaceholderText);
      })
    }

    verifyAddOwnCategory(){
     cy.fixture('userData.json').then((user)=>{  
       basePage.goToDashboardPage();
       habitPage.clickOnAddNew();
       cy.wait(TIMEOUT.veryShortTimeout);
       habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
       habitPage.fillAreaInput(user.areaDropdownData[0]);
       this.fillWithNewCategory('Walker');
     }) 
    }

    verifyCloseHabitForm(){
       habitPage.closeHabitForm();
       cy.wait(TIMEOUT.veryShortTimeout);
       habitPage.clickOnAddNew();
       cy.wait(TIMEOUT.veryShortTimeout);
       habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
       // verify if form is empty 
       basePage.elementTextExist(cy.xpath(habitPage.areaPlaceholder),habitPage.areaPlaceholderText);     
    }

    deleteSpecificCategory(areaName , categoryName){
      basePage.goToDashboardPage();
      let area = cy.xpath('//div[normalize-space()="Area"]/preceding-sibling::span[normalize-space()="'+areaName+'"]');
      // check if area is visible 
      basePage.elementVisibility(area);
      cy.wait(TIMEOUT.veryShortTimeout);
      // expand everything first 
      basePage.clickOnElement(cy.get(habitPage.modifyViewButton));
      basePage.clickOnElement(cy.xpath(habitPage.expandAllButton));
      cy.wait(TIMEOUT.shortTimeout);
      let category = cy.xpath('count(//div[normalize-space()="Category"]/preceding-sibling::span[normalize-space()="'+categoryName+'"])');
      // if specific category exit then delete it 
      category.then((count)=>{
        if(count){
          let menuDot = cy.xpath('//div[normalize-space()="Category"]/preceding-sibling::span[normalize-space()="'+categoryName+'"]/parent::div/following-sibling::div/div');
          basePage.clickOnElement(menuDot);
          // click on delete category menu
          basePage.clickOnElement(cy.xpath(this.deleteCategoryDropdown));
          basePage.clickOnElement(cy.xpath(this.deleteCategoryButton));
          // check category not exist
          basePage.elementNotExist(category);
        }
      })
     
    }

    verifyAddedNewCategory(){
      cy.fixture('userData.json').then((user)=>{  
        basePage.goToDashboardPage();
        habitPage.clickOnAddNew();
        cy.wait(TIMEOUT.veryShortTimeout);
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
        habitPage.closeHabitForm();
        habitPage.clickOnAddNew();
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.category);
        habitPage.fillAreaInput(user.areaDropdownData[0]);
        this.fillWithNewCategory(user.newCategoryData[0]);
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(basePage.saveButton));
        // verify if category created 
        let category = cy.xpath('//div[normalize-space()="Category"]/preceding-sibling::span[normalize-space()="'+user.newCategoryData[0]+'"]');
        basePage.elementExist(category);
      }) 
    }

    verifycatWeight(){
      cy.fixture('userData.json').then((user)=>{  
        basePage.goToDashboardPage();
        habitPage.clickOnAddNew();
        cy.wait(TIMEOUT.veryShortTimeout);
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
        habitPage.closeHabitForm();
        habitPage.clickOnAddNew();
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.category);
        habitPage.fillAreaInput(user.areaDropdownData[0]);
        this.fillWithNewCategory('Walker');
        cy.wait(TIMEOUT.veryShortTimeout);
        cy.xpath(habitPage.catWeightText).should('not.be.empty');
      })
    }

    verifyCategoryLabel(){
      cy.fixture('userData.json').then((user)=>{  
        basePage.goToDashboardPage();
        habitPage.clickOnAddNew();
        cy.wait(TIMEOUT.veryShortTimeout);
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
        habitPage.closeHabitForm();
        habitPage.clickOnAddNew();
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.category);
        cy.wait(TIMEOUT.veryShortTimeout);
         // verify the label 
        basePage.elementExist(cy.xpath(habitPage.areaLabel));
        basePage.elementExist(cy.xpath(habitPage.categoryLabel));
        basePage.elementExist(cy.xpath(habitPage.catWeightLabel));
      })
    }

}