import {Authentication} from '../../pages/Authentication';
import {Base} from '../../pages/Base';
import {CategoryClass} from '../../pages/Category';
import {SubcategoryClass} from '../../pages/Subcategory';
import {HabitClass} from '../../pages/Habit';
import {HabitFormClass} from '../../pages/HabitForm';
import { ADDNEWITEMS, TIMEOUT } from '../../Helper';

const authenticationPage = new Authentication();
const basePage = new Base();
const categoryPage = new CategoryClass();
const subcategoryPage = new SubcategoryClass();
const habitPage = new HabitClass();
const habitFormPage = new HabitFormClass();


describe('Positive and negative testcases of Habit',  ()=>{
   
  beforeEach(()=>{
    cy.fixture('loginCredential.json').then((user)=>{
      authenticationPage.login(user);
    })
  })

  describe('Habit',  ()=>{

    it("Verify if the Week Picker opens when clicked on the From - To Date Field", () => {
      habitPage.verifyWeekDateOpened();
    });

    it("Verify if the Habit Form has various Fields to create a New Habit", () => {
      habitPage.verifyPrevAndNextWeekDate();
    });

    it("Verify if the Habit Form has various Fields to create a New Habit", () => {
      habitPage.verifyHabitFormField();
    });

     it("Proper Form Window opens for the respective options from the Add New DropDown", () => {
      habitPage.verifyAddNewDropdownOption();
    });

     it("Verify if only one of the items can be selected", () => {
       habitPage.verifyAddNewDropdownOptionSelection();
     });

    it("Verify the Displayed Data DropDown is clickable", () => {
         habitPage.verifyModifyViewOptions();
    });

    it("Verify the functionality of the Expand and collapse Button", () => {
       cy.fixture('userData.json').then((user)=>{
          categoryPage.deleteSpecificCategory(user.areaDropdownData[0], user.newCategoryData[0] );
          categoryPage.verifyAddedNewCategory();
          habitPage.verifyExpandHabit(user.newCategoryData[0] );
        })
     });

    it("Verify that it’s not possible to add two habits with same name", () => {
        cy.fixture('userData.json').then((user)=>{
            categoryPage.deleteSpecificCategory(user.areaDropdownData[0], user.categoryDropdownData[0] );
            habitFormPage.addingSameHabitNotAllowed();
        })
    });

  })

 describe('Category',  ()=>{

    it("Category Form has various Fields to create a New category", () => {
      categoryPage.verifyCategoryLabel();
    });

    it("Verify if the user is able to select a Category from the Category Dropdown", () => {
      categoryPage.verifyCategorySelectedFromDropdown();
      categoryPage.verifyCloseHabitForm();
    });

    it("Verify if the user can add own Category", () => {
      categoryPage.verifyAddOwnCategory();
    });

    it("Verify the Add Button if we add category", () => {
      cy.fixture('userData.json').then((user)=>{
        categoryPage.deleteSpecificCategory(user.areaDropdownData[0], user.newCategoryData[0] );
        categoryPage.verifyAddedNewCategory();
      })
    });

    it("Verify the Category Weight Field", () => {
      cy.fixture('userData.json').then((user)=>{ 
        categoryPage.deleteSpecificCategory(user.areaDropdownData[0], user.newCategoryData[0] );
        categoryPage.verifycatWeight();
      })  
    });

    it("Verify the Close Form Button", () => {
      categoryPage.verifyCategoryDiscard();
    });

 })

 describe('Subcategory',  ()=>{

    it("Add category and Edit and delete subcategory", () => {
      cy.fixture('userData.json').then((user)=>{
        categoryPage.deleteSpecificCategory(user.areaDropdownData[0], user.newCategoryData[0] );
        habitPage.clickOnAddNew();
        cy.wait(TIMEOUT.veryShortTimeout);
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
        habitFormPage.addHabitWithManadatoryField(user.areaDropdownData[0], user.newCategoryData[0],user.newCategoryData[0],  'Jogging');
        habitFormPage.habitFormNotExist();
        subcategoryPage.verifyEditAndDeleteSubCat(user.areaDropdownData[0] ,user.newCategoryData[0] );
      })
    });

    it("Verify add and update score on the activates", () => {
      cy.fixture('userData.json').then((user)=>{
        categoryPage.deleteSpecificCategory(user.areaDropdownData[0], user.newCategoryData[0] );
        habitPage.clickOnAddNew();
        cy.wait(TIMEOUT.veryShortTimeout);
        habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
        habitFormPage.addHabitWithManadatoryField(user.areaDropdownData[0], user.newCategoryData[0],user.newCategoryData[0],  'Medication');
        habitFormPage.habitFormNotExist();
        // fill score manually 
        subcategoryPage.fillScoreManually(user.newCategoryData[0]);
        // fill score automatically 
        subcategoryPage.fillScoreFromDropdown(user.newCategoryData[0],"2");
        cy.wait(TIMEOUT.shortTimeout);
        subcategoryPage.fillScoreFromDropdown(user.newCategoryData[0],"5");
        // checking score 1 - 10 and skip 
        subcategoryPage.verifyScoreRatingItem();
      })
    });
  
    it("Sub-Category Form has various Fields to create a New sub-category", () => {
      subcategoryPage.verifySubcatLabel();
    });

    it("Verify the Cancel Button", () => {
      subcategoryPage.verifySubcategoryDiscard();
    });

    it("Verify the Subcategory Weight Field", () => {
       subcategoryPage.verifySubcatWeight();
    });

 })

})
 

