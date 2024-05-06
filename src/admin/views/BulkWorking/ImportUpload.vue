<template>
  <div class="admin-otr">
    <Sidebar />
    <div class="admin-right">
      <h2 class="heading">
        <span><img src="@/assets/icons/import.svg" alt="" /></span>{{ $t("bulk.import.header") }}
      </h2>
      <div class="cm-bck">
        <h3>{{ $t("bulk.import.uploadList") }}</h3>
        <div class="frm-innr w-100">
          <div class="row-3">
            <div class="form-group">
              <label>{{ $t("bulk.import.uploadFile") }}</label>
              <div class="input-upload-otr">
                <div class="input-upload">
                  <input type="text" :placeholder="$t('bulk.import.chooseFile')" class="form-control" :value="fileName"
                    :class="fileError ? 'error-border' : ''" />
                  <span v-if="fileError" class="error-txt">{{ fileError }}
                  </span>
                </div>
                <div class="upload-btn">
                  <input id="file" @change="chooseFile" type="file" ref="uploadFile" />
                  <label for="file" class="btn org-btn">{{
                    $t("bulk.import.chooseFile")
                  }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-group justify-btwn">
          <div class="btn-group-innr">
            <button type="submit" class="btn org-btn" :disabled="fileName == '' || isUploadOnceClick"
              @click="uploadFile(), (isUploadOnceClick = true)">
              {{ $t("bulk.import.upload") }}
            </button>
            <button type="button" class="btn outline blk-btn" @click="reset">
              {{ $t("button.cancel") }}
            </button>
          </div>
          <button type="button" class="btn outline blk-btn" @click="$router.push('/admin/import-list')">
            {{ $t("button.back") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/admin/components/Sidebar.vue";
import BulkWorkingService from "@/admin/services/BulkWorkingService";
import Toast from "@/alert/alert.js";

export default {
  name: "ImportUpload",
  components: { Sidebar },
  data() {
    return {
      file: "",
      fileURL: "",
      fileName: "",
      fileType: "",
      fileError: "",
      isUploadOnceClick: false,
    };
  },
  created() {
    this.BulkWorkingService = new BulkWorkingService();
  },
  methods: {
    // choose file
    chooseFile(e) {
      this.fileError = "";
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      let allowedExtensions = /(\.json|\.xls|\.xlsx)$/i;
      if (!allowedExtensions.exec(this.file.name)) {
        this.fileError = this.$t("Error.filesAllowed");
        this.file = "";
        this.fileURL = "";
        this.fileName = "";
        return false;
      } else if (allowedExtensions.exec(this.file.name)) {
        this.fileURL = URL.createObjectURL(e.target.files[0]);
        this.fileType = this.file.type;
        this.fileName = this.file.name;
        this.$refs.uploadFile.value = "";
      }
    },
    reset() {
      this.fileURL = "";
      this.file = "";
      this.fileName = "";
      this.fileError = "";
    },

    //upload file
    uploadFile() {
      let formData = new FormData();
      formData.append("importfile", this.file);
      if (this.fileType == "application/json") {
        this.BulkWorkingService.bulkWorkingUploadFileJson(formData)
          .then((res) => {
            if (res.status == 200) {
              this.fileURL = "";
              this.file = "";
              this.fileName = "";
              this.fileError = "";
              this.isUploadOnceClick = false;
              this.$router.push("/admin/import-list");
              Toast.fire({ title: this.$t("Error.success") });
            } else if ((res.response.status = 500)) {
              Toast.fire({
                title: res.response.data.error,
              });
            }
          })
          .catch((err) => {
            return;
          });
      } else {
        this.BulkWorkingService.bulkWorkingUploadFileXls(formData)
          .then((res) => {
            if (res.status == 200) {
              this.fileURL = "";
              this.file = "";
              this.fileName = "";
              this.fileError = "";
              this.isUploadOnceClick = false;
              this.$router.push("/admin/import-list");
              Toast.fire({ title: this.$t("Error.success") });
            } else if ((res.response.status = 500)) {
              Toast.fire({
                title: res.response.data.error,
              });
            }
          })
          .catch((err) => {
            return;
          });
      }
    },
  },
};
</script>
