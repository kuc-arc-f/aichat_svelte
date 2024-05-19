<script lang="ts">
export let message: string= "";
//
const closeButton = function(){
  const dlg = document.getElementById('errorModalDialog');
  if(dlg) {
    //@ts-ignore
    dlg.close();
  }
}
</script>

<dialog id="errorModalDialog" class="dialog">
  <div class="bg-white px-8 pt-3 pb-3 dialog_body_wrap">
    <p class="text-3xl font-bold text-red-400">{message}</p>
    <hr class="my-3" />
    <button 
    class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-8 rounded"
    type="submit" on:click={() => closeButton()}>Ok</button>
  </div>
</dialog>

<!--
-->