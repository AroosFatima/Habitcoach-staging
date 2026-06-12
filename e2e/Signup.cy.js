
import {Authentication} from '../pages/Authentication';

const authenticationPage = new Authentication()

 
  it("Signup", () => {
    authenticationPage.signup();
  })
