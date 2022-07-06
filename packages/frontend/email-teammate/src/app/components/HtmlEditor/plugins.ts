import hiliteColor from 'suneditor/src/plugins/submenu/hiliteColor';
import fontColor from 'suneditor/src/plugins/submenu/fontColor';

// @ts-ignore
hiliteColor.setSubmenu = function (core: any) {
  const colorArea = core.context.colorPicker.colorListHTML;
  const listDiv = core.util.createElement('DIV');

  listDiv.className = 'se-submenu se-list-layer se-layer-highlight-color';
  listDiv.innerHTML = colorArea;

  return listDiv;
};

// @ts-ignore
fontColor.setSubmenu = function (core: any) {
  const colorArea = core.context.colorPicker.colorListHTML;
  const listDiv = core.util.createElement('DIV');

  listDiv.className = 'se-submenu se-list-layer se-layer-font-color';
  listDiv.innerHTML = colorArea;

  return listDiv;
};

const customImageUpload = (instanceId: string) => {
  const uploadId = `files_upload_${instanceId}`;
  return {
    name: 'customImageUpload',
    display: 'customImageUpload',
    title: 'Image',
    innerHTML: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.75 15.77">
      <g>
        <path d="M8.77,8.72a.88.88,0,0,1-.61-.27.82.82,0,0,1-.25-.61.89.89,0,0,1,.25-.62A.82.82,0,0,1,8.77,7a.81.81,0,0,1,.61.25.83.83,0,0,1,.27.62.81.81,0,0,1-.25.61.91.91,0,0,1-.63.27Zm9.62-5a1.74,1.74,0,0,1,1.76,1.76V17.76a1.74,1.74,0,0,1-1.76,1.76H6.16A1.74,1.74,0,0,1,4.4,17.76V5.51A1.74,1.74,0,0,1,6.16,3.75H18.39Zm0,1.75H6.16v8L8.53,11.8a.94.94,0,0,1,.54-.17.86.86,0,0,1,.54.2L11.09,13l3.64-4.55a.78.78,0,0,1,.34-.25.85.85,0,0,1,.42-.07.89.89,0,0,1,.39.12.78.78,0,0,1,.28.29l2.24,3.67V5.51Zm0,12.24V15.6L15.3,10.53,11.89,14.8a.89.89,0,0,1-.59.32.82.82,0,0,1-.64-.18L9,13.62,6.16,15.74v2Z" transform="translate(-4.4 -3.75)"></path>
      </g>
    </svg>
    <input type="file" id="${uploadId}" accept="image/*" multiple="multiple" class="files-text files-input" />`,
    add: (core: any, targetElement: any) => {
      const { context } = core;
      if (context.fileUpload) {
        return;
      }
      context.fileUpload = document.getElementById(uploadId);
      if (context.fileUpload) {
        context.fileUpload.addEventListener('change', (e: any) => {
          if (e.target.files) {
            core.plugins.image.submitAction.call(core, e.target.files);
          }
        });
        targetElement.addEventListener('click', () => context.fileUpload.click());
      }
    },
    active: () => {
      return false;
    },
  };
};

export { fontColor, hiliteColor, customImageUpload };
