import { useState } from "react";

import ErrorMessage from "../components/ErrorMessage";

/*HOC withErrorApi рендерит страницу с ошибкой если она произошла или
страницу UsersPage  */
export const withErrorApi = View => {
   return props => {
      const [errorApi, setErrorApi] = useState(false);
      return (
         <>
            {
               errorApi
                  ? <ErrorMessage />
                  : <View
                     setErrorApi={setErrorApi}
                     {...props} />
            }
         </>
      )
   }
}