
import dayjs from "dayjs";
import { ADDNEWITEMS, TIMEOUT, weekDifferenceDate } from "../Helper";
import { Base } from "./Base";

const basePage = new Base();


export class HabitClass {
    
    addNewButton = 'div.customDropdown > button';
    addHabitText = '//div[normalize-space()="Add Habit"]';
    adddNewDropdownOption = 'div.dropdown > div > a.dropdown-item';

    areaLabel = '//label[contains(@for,"area")]';
    areaInput = '//label[contains(@for,"area")]/following-sibling::div/div';
    areaPlaceholder = '//label[contains(@for,"area")]/following-sibling::div/div/div/div/div[normalize-space()="Select area"]';
    areaPlaceholderText = 'Select area';
    categoryLabel = '//label[contains(@for,"category")]';
    catWeightLabel = '//label[contains(@for,"categoryWeight")]';
    categoryPlaceholder = '//label[contains(@for,"category")]/following-sibling::div/div/div/div/div[normalize-space()="Select or create your own category"]';
    catWeightText  = '//label[contains(@for,"categoryWeight")]/following-sibling::div/div/div/div/div';
    categoryPlaceholderText = 'Select or create your own category';
    categoryInput = '//label[contains(@for,"category")]/following-sibling::div/div';
    subcategoryLabel = '//label[contains(@for,"subcategory")]';
    subcatWeightLabel = '//label[contains(@for,"categoryWeight")]';
    subcategoryDisabledInput = '//label[contains(@for,"subcategory")]/following-sibling::div/div';
    subcatWeightText = '//label[contains(@for,"categoryWeight")]/following-sibling::div/div/div/div/div';
    subcatInput = '#subcategory';
    subCatInput1 = '//label[contains(@for,"subcategory")]/following-sibling::div/div';
    habitNameInput = '//label[contains(@for,"location")]/following-sibling::div/div';
    privateHabitToggle = '#private_habits_switch';
    keystoneHabitToggle = '#keystone_habits_switch';
    descriptionInput =    '#note';
    purposeInput = '[name="motivation"]';
    beliefInput = '[name="belief"]';
    triggerInput = '[name="triggers"]';
    obstacleInput = '[name="obstacles"]';

    modifyViewButton = '#modify-view-btn';
    expandAllButton = '//button/span[normalize-space()="Expand all"]';
    collapseAllButton = '//button/span[normalize-space()="Collapse all"]'; 

    closeHabitFormButton = '//div[normalize-space()="Add Habit"]/following-sibling::img';
    addButton = '//button[normalize-space()="Add"]';
    habitNameErrorElem = '[data-testid="add-new-habit"] > p';
    habitNameError = 'Habit with this name already exist.';

    weekDateButton = '//button[contains(@id ,"analytics_toggle")]/preceding-sibling::div/div/button';
    dateOpenerDiv = '//button[contains(@id ,"analytics_toggle")]/preceding-sibling::div/div/div';
    datePickerDiv = '.DayPicker > .DayPicker-wrapper > .DayPicker-Months';
    
    
    clickOnAddNew(){
       basePage.elementVisibility(cy.get(this.addNewButton));
       basePage.clickOnElement(cy.get(this.addNewButton));
    }

    selectFromAddNewDropdown(itemName = ADDNEWITEMS.habit){
        let item = cy.xpath('//div[contains(@class, "dropdown")]/div/a[normalize-space()="'+itemName+'"]');
        basePage.elementVisibility(item); 
        basePage.clickOnElement(item);
    }

    fillAreaInput(areaName){
        basePage.elementTextExist(cy.xpath(this.areaPlaceholder),this.areaPlaceholderText);
        basePage.typeElementWithoutClear(cy.xpath(this.areaInput),areaName + '{enter}' )
        cy.wait(TIMEOUT.shortTimeout);
        // verify if element is selected from dropdown
        basePage.elementExist(cy.xpath('//label[contains(@for,"area")]/following-sibling::div/div/div/div/div[normalize-space()="'+areaName+'"]'))
    }

    closeHabitForm(){
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(this.closeHabitFormButton));
    }

    verifyHabitFormField(){
        basePage.goToDashboardPage();
        this.clickOnAddNew();
        cy.wait(TIMEOUT.veryShortTimeout);
        this.selectFromAddNewDropdown(ADDNEWITEMS.habit);
        // verify fields 
        basePage.elementExist(cy.xpath(this.categoryInput));
        basePage.elementExist(cy.xpath(this.areaInput));
        basePage.elementExist(cy.xpath(this.subcategoryDisabledInput));
        basePage.elementExist(cy.xpath(this.habitNameInput));
        basePage.elementExist(cy.get(this.privateHabitToggle));
        basePage.elementExist(cy.get(this.keystoneHabitToggle));
        basePage.elementExist(cy.get(this.descriptionInput));
        basePage.elementExist(cy.get(this.purposeInput));
        basePage.elementExist(cy.get(this.beliefInput));
        basePage.elementExist(cy.get(this.obstacleInput));
    }

    verifyAddNewDropdownOption(){
        basePage.goToDashboardPage();
        this.clickOnAddNew();
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.elementTextExist(cy.get(this.adddNewDropdownOption), ADDNEWITEMS.category,0 );
        basePage.elementTextExist(cy.get(this.adddNewDropdownOption), ADDNEWITEMS.subcategory,1);
        basePage.elementTextExist(cy.get(this.adddNewDropdownOption), ADDNEWITEMS.habit,2 );
    }

    verifyAddNewDropdownOptionSelection(){
        basePage.goToDashboardPage();
        this.clickOnAddNew();
        cy.wait(TIMEOUT.veryShortTimeout);
        this.selectFromAddNewDropdown(ADDNEWITEMS.habit);
        basePage.elementNotVisible(cy.xpath('//div[contains(@class, "dropdown")]/div/a[normalize-space()="'+ADDNEWITEMS.habit+'"]')); 
        basePage.elementNotVisible(cy.xpath('//div[contains(@class, "dropdown")]/div/a[normalize-space()="'+ADDNEWITEMS.category+'"]')); 
        basePage.elementNotVisible(cy.xpath('//div[contains(@class, "dropdown")]/div/a[normalize-space()="'+ADDNEWITEMS.subcategory+'"]')); 
    }

    verifyExpandHabit(catName){
      basePage.clickOnElement(cy.get(this.modifyViewButton));
      basePage.clickOnElement(cy.xpath(this.collapseAllButton)); 
      cy.wait(TIMEOUT.shortTimeout);
      let category = cy.xpath('//div[normalize-space()="Category"]/preceding-sibling::span[normalize-space()="'+catName+'"]');
      //  first check if element is not visible while collapse mode 
      basePage.elementNotVisible(category);
      cy.wait(TIMEOUT.veryShortTimeout);
      // expand everything first 
      basePage.clickOnElement(cy.get(this.modifyViewButton));
      basePage.clickOnElement(cy.xpath(this.expandAllButton));
      cy.wait(TIMEOUT.shortTimeout);
      category = cy.xpath('//div[normalize-space()="Category"]/preceding-sibling::span[normalize-space()="'+catName+'"]');
      category.eq(0).scrollIntoView();
      // check if element is  visible while expand mode 
      basePage.elementVisibility(category);
    }

    verifyModifyViewOptions(){
     basePage.goToDashboardPage();
     cy.wait(TIMEOUT.veryShortTimeout); 
     basePage.clickOnElement(cy.get(this.modifyViewButton));
     cy.wait(TIMEOUT.shortTimeout); 
     //  verify options 
     basePage.elementExist(cy.xpath(this.expandAllButton));
     basePage.elementExist(cy.xpath(this.collapseAllButton));
    }

    verifyPrevAndNextWeekDate(){
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(this.weekDateButton));
        let prevDate = weekDifferenceDate(dayjs().subtract(7, "day").format("M-D-YYYY"))
        basePage.elementVisibility(cy.xpath('//div[normalize-space()="'+prevDate+'"]'));
        basePage.clickOnElement(cy.xpath(this.weekDateButton), 1);
        let currentDate = weekDifferenceDate(dayjs().format("M-D-YYYY"));
        basePage.elementVisibility(cy.xpath('//div[normalize-space()="'+currentDate+'"]')); 
    }

    verifyWeekDateOpened(){
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);
        basePage.clickOnElement(cy.xpath(this.dateOpenerDiv));
        basePage.elementVisibility(cy.get(this.datePickerDiv))
        let currentDate = weekDifferenceDate(dayjs().format("M-D-YYYY"));
        basePage.elementVisibility(cy.xpath('//div[normalize-space()="'+currentDate+'"]'));   
    }

}