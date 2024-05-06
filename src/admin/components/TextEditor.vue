<template>
  <div :class="isError ? 'error-border ckborder' : ''">
    <ckeditor
      :editor="editor"
      :model-value="props.editorData"
      :config="editorConfig"
      @update:model-value="dataUpdate"
    ></ckeditor>
  </div>
</template>
<script setup>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ref } from "vue";
const emit = defineEmits(["dataChanged"]);
const props = defineProps({
  editorData: String,
  isError: Boolean,
});
let editor = ClassicEditor;

const dataUpdate = (content) => {
  emit("dataChanged", content);
};
const editorConfig = ref({
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "link",
      "insertTable",
      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
    ],
  },
});
</script>
<style>
.form-group .ck.ck-voice-label,
.ck .ck-powered-by {
  display: none;
}

.ck a {
  color: #1b3af2;
  text-decoration: none;
}

.ck a:hover {
  text-decoration: underline;
}
.ck .ck-content {
  padding: 0 25px;
}
.ckborder {
  border: 2px solid;
}
</style>
