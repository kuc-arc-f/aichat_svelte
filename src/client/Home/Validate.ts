import { z } from 'zod';
//
const FormData = z.object({
  input_text: z
    .string().min(5),
});
//
const Validate = {
  /**
   * 
   * @param
   *
   * @return
   */
  formValidate: function(input){
    let errors = {};
    try {
      FormData.parse(input);
//console.log(input);
      return errors;
    } catch (e) {
      console.error(e.flatten().fieldErrors);
      return e.flatten().fieldErrors;
    }
  },
}
export default Validate;
