import {Authentication} from '../../pages/Authentication';
import {CategoryClass} from '../../pages/Category';
import {HabitClass} from '../../pages/Habit';
import {HabitFormClass} from '../../pages/HabitForm';
import {AnalyticsClass} from '../../pages/Analytics';
import { ADDNEWITEMS, TIMEOUT } from '../../Helper';

const authenticationPage = new Authentication();
const categoryPage = new CategoryClass();
const habitPage = new HabitClass();
const habitFormPage = new HabitFormClass();
const analyticsPage = new AnalyticsClass();

describe('Analytics',  ()=>{

    beforeEach(()=>{
        cy.fixture('loginCredential.json').then((user)=>{
          authenticationPage.login(user);
        })
    })

    it("Verify that its possible to see the subcategories when user clicks on the “Expand” button", () => {
        cy.fixture('userData.json').then((user)=>{
          categoryPage.deleteSpecificCategory(user.areaDropdownData[0], user.newCategoryData[0] );
          habitPage.clickOnAddNew();
          cy.wait(TIMEOUT.veryShortTimeout);
          habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
          habitFormPage.addHabitWithManadatoryField(user.areaDropdownData[0], user.newCategoryData[0],user.newSubcategoryData[0],  'Jogging');
          habitFormPage.habitFormNotExist();
          habitPage.clickOnAddNew();
          cy.wait(TIMEOUT.veryShortTimeout);
          habitPage.selectFromAddNewDropdown(ADDNEWITEMS.habit);
          habitFormPage.addHabitWithManadatoryField(user.areaDropdownData[0], user.newCategoryData[0],user.newSubcategoryData[1],  'Wheelie');
          habitFormPage.habitFormNotExist();

          analyticsPage.verifySubcatExpandOnNetWorthPage(user.newSubcategoryData[0],user.newSubcategoryData[1]);
         
        })
    });

    it("Verify that the TO calendar displays the current day by default", () => {
        analyticsPage.verifyCalenderCurrentDate();
    })

    it("Total income", () => {
        analyticsPage.verifyTotalIncome();
    })
})