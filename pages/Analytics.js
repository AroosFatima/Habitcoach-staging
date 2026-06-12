
import { Base } from "./Base";
import { HabitClass } from "./Habit";
import {  TIMEOUT, getDay, getFullMonthWithYear, getMonth, getMonthWithDay } from "../Helper";
import dayjs from "dayjs";

const basePage = new Base();
const habitPage = new HabitClass();


export class AnalyticsClass {

    analyticsLink = 'a[href="/analytics"]';
    netWorthLink = 'a[href="/analytics/networth"]';
    calenderInput = 'input[placeholder="YYYY-M-D"]';
    incomeSpan = '//span[normalize-space()="Income"]/following-sibling::div/div/span';

    goToAnalyticsPage(){
        basePage.clickOnElement(cy.get(this.analyticsLink),1);
    }

    goToNetWorthPage(){
        basePage.clickOnElement(cy.get(this.netWorthLink));
    }

    verifySubcatExpandOnNetWorthPage(subCatName1, subCatName2 ){
      basePage.clickOnElement(cy.xpath(basePage.sidebarMenuIcon));
      this.goToAnalyticsPage();
      basePage.elementVisibility(cy.get(this.netWorthLink));
      cy.wait(TIMEOUT.veryShortTimeout);
      this.goToNetWorthPage();
      basePage.elementVisibility(cy.get(habitPage.modifyViewButton));
      basePage.clickOnElement(cy.get(habitPage.modifyViewButton));
      cy.wait(TIMEOUT.veryShortTimeout);
      basePage.clickOnElement(cy.xpath(habitPage.expandAllButton));
      let subCat1 = cy.xpath('//div[normalize-space()="Subcategory"]/parent::div/preceding-sibling::span[normalize-space()="'+subCatName1+'"]');
      subCat1.scrollIntoView();
      basePage.elementVisibility(subCat1);
      let subCat2 = cy.xpath('//div[normalize-space()="Subcategory"]/parent::div/preceding-sibling::span[normalize-space()="'+subCatName2+'"]');
      subCat2.scrollIntoView();
      basePage.elementVisibility(subCat2);
    }
    
    verifyCalenderCurrentDate(){
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.xpath(basePage.sidebarMenuIcon));
        this.goToAnalyticsPage();
        basePage.elementVisibility(cy.get(this.netWorthLink));
        cy.wait(TIMEOUT.veryShortTimeout);
        this.goToNetWorthPage(); 
        basePage.elementExist(cy.get(this.calenderInput));
        // get default calender date 
        cy.get(this.calenderInput).invoke('val').then(defaultDate =>{
          
            let monthWithYear = getFullMonthWithYear(dayjs().add(1,'day').format("M-D-YYYY"));
            let monthName = getMonth(dayjs().add(1,'day').format("M-D-YYYY"));
            let fromDate = getDay(dayjs().add(1, "day").format("M-D-YYYY"));
            let toDate = getDay(dayjs().add(3, "day").format("M-D-YYYY")); 
            // click on calender input to open the calender 
            basePage.clickOnElement(cy.get(this.calenderInput));  
            let fromDateSelector = cy.xpath('//div[normalize-space()="'+monthWithYear+'"]/parent::div[contains(@class,  "DayPicker-Caption")]/following-sibling::div[contains(@class,  "DayPicker-Body")]/div/div[normalize-space()="'+fromDate+'"]');
            // select from date 
            basePage.clickOnElement(fromDateSelector);
            let toDateSelector = cy.xpath('//div[normalize-space()="'+monthWithYear+'"]/parent::div[contains(@class,  "DayPicker-Caption")]/following-sibling::div[contains(@class,  "DayPicker-Body")]/div/div[normalize-space()="'+toDate+'"]');
            // select to date 
            basePage.clickOnElement(toDateSelector);
            cy.wait(TIMEOUT.shortTimeout);
            // verify calender has that values we entered 
            basePage.elementHaveValue(cy.get(this.calenderInput), monthName + " "+ fromDate + " - " +monthName+" "+ toDate );
            cy.wait(TIMEOUT.veryShortTimeout);
            cy.reload();
            basePage.elementExist(cy.get(this.calenderInput));
            cy.wait(TIMEOUT.veryShortTimeout);
            // verify calender has default date 
            basePage.elementHaveValue(cy.get(this.calenderInput), defaultDate);
      })
    }

    verifyTotalIncome(){
        basePage.goToDashboardPage();
        cy.wait(TIMEOUT.veryShortTimeout);  
        basePage.clickOnElement(cy.xpath(basePage.sidebarMenuIcon));
        this.goToAnalyticsPage();
        basePage.elementVisibility(cy.get(this.netWorthLink));
        cy.wait(TIMEOUT.veryShortTimeout);
        this.goToNetWorthPage(); 
        basePage.elementExist(cy.get(this.calenderInput));
        cy.wait(TIMEOUT.veryShortTimeout);
        cy.xpath(this.incomeSpan).eq(0).then((elem)=>{
            expect(elem.text()).to.be.eq(elem.text())
        })     
    }
}