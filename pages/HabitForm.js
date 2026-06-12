
import { ADDNEWITEMS, TIMEOUT } from "../Helper";
import { Base } from "./Base";
import { HabitClass } from "./Habit";
import { CategoryClass } from "./Category";
import { SubcategoryClass } from "./Subcategory";

const basePage = new Base();
const habitPage = new HabitClass();
const categoryPage = new CategoryClass();
const subCategoryPage = new SubcategoryClass();

export class HabitFormClass {

 habitFormNotExist(){
    cy.wait(TIMEOUT.shortTimeout);
    basePage.elementNotExist(cy.xpath(habitPage.areaLabel));
 }   
 addHabitWithManadatoryField(areaName , categoryName ,subCatName, habitName){
     habitPage.fillAreaInput(areaName);
     categoryPage.fillCategory(categoryName);
     subCategoryPage.selectSubCatFromDropdown(subCatName);
     basePage.typeElementWithoutClear( cy.xpath(habitPage.habitNameInput), habitName + '{enter}');
     basePage.clickOnElement(cy.xpath(habitPage.addButton));
     
 }


 addingSameHabitNotAllowed(){
    cy.fixture('userData.json').then((user)=>{    
      basePage.goToDashboardPage();
      //   add habit 
      habitPage.clickOnAddNew();
      cy.wait(TIMEOUT.veryShortTimeout);
      habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
      this.addHabitWithManadatoryField(user.areaDropdownData[0], user.categoryDropdownData[0], user.categoryDropdownData[0], 'Jogging');
      this.habitFormNotExist();
      // add habit again
      habitPage.clickOnAddNew();
      cy.wait(TIMEOUT.veryShortTimeout);
      habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
      this.addHabitWithManadatoryField(user.areaDropdownData[0], user.categoryDropdownData[0], user.categoryDropdownData[0], 'Jogging');
      //   verify error message 
      basePage.elementTextExist(cy.get(habitPage.habitNameErrorElem),habitPage.habitNameError );
     })
   }

}