import {Authentication} from '../../pages/Authentication';
import {ProfileClass} from '../../pages/Profile';


const authenticationPage = new Authentication();
const profileClass = new ProfileClass();



describe('Profile',  ()=>{
   
    beforeEach(()=>{
        cy.fixture('loginCredential.json').then((user)=>{
          authenticationPage.login(user);
        })
    })

    it("Verify that user is able to see first and last name field", () => {
        profileClass.verifyFirstAndLastField();
    });
    it("Verify that the error message is displayed for invalid password", () => {
        profileClass.errorMsgForInvalidPassword();
    });

    it("Verify that the user cant set the same password as the new one ", () => {
        profileClass.errorMsgForSamePassword();
    });

    it("Verify that the coach is able to see the linked profile’s phone number", () => {
        profileClass.verifyProfilePhoneNumber();
    });

    it("Verify that the password fields become empty after user saves changes", () => {
        profileClass.changePassword();
    });
})
