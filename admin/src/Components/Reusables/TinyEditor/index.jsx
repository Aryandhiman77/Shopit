import { Editor } from "@tinymce/tinymce-react";

// TinyMCE core + theme + icons
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver/theme";
import "tinymce/models/dom";

// Optional: plugins you want
import "tinymce/plugins/code";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";
import "tinymce/plugins/image";
import "tinymce/plugins/preview";
import "tinymce/plugins/wordcount";

// Optional: skin (UI CSS)
import "tinymce/skins/ui/oxide/skin.css";

const TinyEditor = ({ value, setValue }) => {
  return (
    <Editor
      value={value}
      onEditorChange={(content) => setValue(content)}
      init={{
        license_key: "gpl",
        height: 400,
        menubar: true,
        plugins: "code link lists table image preview wordcount",
        toolbar:
          "undo redo | blocks | bold italic underline | " +
          "alignleft aligncenter alignright | bullist numlist outdent indent | " +
          "link image | code preview",
      }}
    />
  );
};
export default TinyEditor;
