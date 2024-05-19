<script lang="ts">
//console.log("#home");
import { marked } from 'marked';
import CrudIndex from './Home/CrudIndex';
import Crud from './Home/Crud';
import Validate from './Home/Validate';
import LoadBox from '../components/LoadBox.svelte'
import ErrorDialogBox from '../components/ErrorDialogBox.svelte'
//
export let answer: string = "";
let initDisplay = false;
let errors = {};
/**
*
* @param
*
* @return
*/
async function sendText(){
  try {
    initDisplay = true;
    answer = "";
    const input = Crud.getInputValues();
    errors = Validate.formValidate(input);
console.log(errors);
    if (Object.keys(errors).length > 0) {
      initDisplay = false;
      const dlg = document.getElementById('errorModalDialog');
      if(dlg) {
        //@ts-ignore
        dlg.showModal();
      }
      return;
    }
    const result = await CrudIndex.addItem();
    //console.log(result);
    initDisplay = false;
    if(result) { 
      const s = marked.parse(result);      
console.log(s); 
      answer = s 
    } 
  } catch (error) {
    initDisplay = false;
    console.error(error);
  }    
}
/**
*
* @param
*
* @return
*/
async function clearText(){
  try {
    const input_text = (<HTMLInputElement>document.querySelector("#input_text"));
    if(input_text){
      input_text.value = "";
    }
  } catch (error) {
      console.error(error);
  }    
}

</script>

<!-- -->
<main>
  {#if initDisplay}
    <LoadBox />
  {/if}
  <div class="home_main_wrap container mx-auto my-2 px-8 bg-white">
    <h1 class="text-4xl font-bold">AI-Chat!</h1>
    <hr class="my-2">
    <div class="flex flex-row">
      <div class="flex-1 text-center p-1">
        <textarea
         class="border border-gray-400 rounded-md px-3 py-2 w-full resize-none focus:outline-none focus:border-blue-500"
         name="input_text" id="input_text" rows="3" />
         {#if errors?.input_text}
           <em class="error_message">{errors?.input_text}</em>
         {/if}
      </div>
      <div class="text-center pt-1">
        <button 
        class="bg-blue-600 text-white font-bold ms-2 py-2 px-4 rounded"
        on:click={sendText}
        >Send</button>
        <br />
        <button 
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ms-2 mt-2 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        on:click={clearText}
        >Clear</button>
      </div>
    </div>
    <hr class="my-2">
    answer :<br />
    {#if answer} 
    <div class="bg-sky-100 p-2 rounded answer_box_wrap">
      {@html answer}
    </div>
    {/if}
  </div>
  <!-- dialog -->
  <ErrorDialogBox message={`NG! Check Input text`} />
</main>

<style>
</style>
